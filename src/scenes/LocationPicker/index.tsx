import { Box } from '@mantine/core';
import { useState } from 'react';
import * as turf from '@turf/turf';

import useMarkerStore from '../../stores/marker';
import useModalStore from '../../stores/modal';

import { Coordinate } from '../../types/coordinate';
import { Marker } from '../../types/marker';

import AddMarkerModal from './components/AddMarkerModal';
import InformationBar from './components/InformationBar';
import LocationMap from './components/LocationMap';

const LocationPicker = () => {
  const [tab, setTab] = useState<string>('markers');

  const [coordinate, setCoordinate] = useState<Coordinate>();
  const [nearByMarkers, setNearByMarkers] = useState<Marker[]>([]);

  const { markers, setMarker, clearMarker } = useMarkerStore();
  const { showModal } = useModalStore();

  const handleClick = (lat: number, lng: number) => {
    if ('markers' === tab) {
      showModal(AddMarkerModal, {
        lat,
        lng,
        onSubmit: handleAddMarker,
      });
    } else if ('nearBy' === tab) {
      setCoordinate({
        lat,
        lng,
      });
    }
  };

  const handleAddMarker = (formData: any, callback: () => void) => {
    setMarker({
      ...formData,
      id: Date.now(),
      coordinate: {
        lat: formData.lat,
        lng: formData.lng,
      },
    });

    callback();
  };

  const handleDeleteMarker = (markerID: number) => {
    clearMarker(markerID);
  };

  const handleFindLocationsNearByRadius = (formData: any) => {
    if (coordinate) {
      const results: Marker[] = [];

      const targetPoint = turf.point([coordinate.lat, coordinate.lng]);
      markers.forEach((marker) => {
        const currentPoint = turf.point([
          marker.coordinate.lat,
          marker.coordinate.lng,
        ]);
        const distance = turf.distance(targetPoint, currentPoint, {
          units: 'meters',
        });

        console.log(distance, formData.radius)

        if (distance <= formData.radius) {
          results.push(marker);
        }
      });

      setNearByMarkers(results);
    }
  };

  const handleChangeTab = (tabName: string) => {
    setCoordinate(undefined);
    setTab(tabName);
    setNearByMarkers([]);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <InformationBar
        tab={tab}
        coordinate={coordinate}
        onChangeTab={handleChangeTab}
        onDelete={handleDeleteMarker}
        onFindLocationsNearByRadius={handleFindLocationsNearByRadius}
      />
      <LocationMap
        coordinate={coordinate}
        nearByMarkers={nearByMarkers}
        tab={tab}
        onClick={handleClick}
      />
    </Box>
  );
};

export default LocationPicker;
