import { Box, Text } from '@mantine/core';
import L from 'leaflet';
import {
  Circle,
  MapContainer,
  Marker as MarkerEle,
  Popup,
  TileLayer,
} from 'react-leaflet';

import { Coordinate } from '../../../../types/coordinate';
import { Marker } from '../../../../types/marker';

import useMarkerStore from '../../../../stores/marker';

import InteractiveLayer from '../InteractiveLayer';

import useStyles from './styles';

const greenIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface LocationMapProps {
  coordinate?: Coordinate;
  nearByMarkers: Marker[];
  radius?: number;
  tab: string;
  onClick: (lat: number, lng: number) => void;
}

const LocationMap = ({
  coordinate,
  nearByMarkers,
  radius,
  tab,
  onClick,
}: LocationMapProps) => {
  const { classes } = useStyles();

  const { markers } = useMarkerStore();

  return (
    <Box className={classes.map}>
      <MapContainer
        center={[1.2788354, 103.8611452]}
        zoom={15}
        scrollWheelZoom={true}
        zoomControl={false}
      >
        <InteractiveLayer onClick={onClick} />

        {'markers' === tab &&
          markers.map((marker) => (
            <MarkerEle
              key={marker.id}
              position={[marker.coordinate.lat, marker.coordinate.lng]}
            >
              <Popup>
                <Text weight={600}>{marker.title}</Text>
                <Text>{marker.description}</Text>
              </Popup>
            </MarkerEle>
          ))}

        {'nearBy' === tab && (
          <>
            {coordinate && (
              <>
                <MarkerEle position={[coordinate.lat, coordinate.lng]} />

                {radius && (
                  <Circle
                    center={[coordinate.lat, coordinate.lng]}
                    radius={radius}
                  />
                )}
              </>
            )}

            {nearByMarkers.map((marker) => (
              <MarkerEle
                key={marker.id}
                position={[marker.coordinate.lat, marker.coordinate.lng]}
                icon={greenIcon}
              >
                <Popup>
                  <Text color="blue" size="md" weight={600}>{marker.title}</Text>
                  <Text>{marker.description}</Text>
                </Popup>
              </MarkerEle>
            ))}
          </>
        )}

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </Box>
  );
};

export default LocationMap;
