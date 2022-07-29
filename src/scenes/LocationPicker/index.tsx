import { Box } from '@mantine/core';
import * as turf from '@turf/turf';
import { useState } from 'react';

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
  const [radius, setRadius] = useState<number>();

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

      const targetPoint = turf.point([coordinate.lng, coordinate.lat]);
      markers.forEach((marker) => {
        const currentPoint = turf.point([
          marker.coordinate.lng,
          marker.coordinate.lat,
        ]);
        const distance = turf.distance(targetPoint, currentPoint, {
          units: 'meters',
        });

        if (distance <= formData.radius) {
          results.push(marker);
        }
      });

      setRadius(formData.radius);
      setNearByMarkers(results);
    }
  };

  const handleChangeTab = (tabName: string) => {
    setCoordinate(undefined);
    setTab(tabName);
    setNearByMarkers([]);
  };

  const handleResetRadius = () => {
    setRadius(undefined);
    setCoordinate(undefined);
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
        onResetRadius={handleResetRadius}
      />
      <LocationMap
        coordinate={coordinate}
        nearByMarkers={nearByMarkers}
        radius={radius}
        tab={tab}
        onClick={handleClick}
      />
    </Box>
  );
};

export default LocationPicker;
