import { Box, Text } from '@mantine/core';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import useMarkerStore from '../../../../stores/marker';

import InteractiveLayer from '../InteractiveLayer';

import useStyles from './styles';

interface LocationMapProps {
  onClick: (lat: number, lng: number) => void;
}

const LocationMap = ({ onClick }: LocationMapProps) => {
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

        {markers.map((marker) => (
          <Marker key={marker.id} position={[marker.lat, marker.lng]}>
            <Popup>
              <Text weight={600}>{marker.title}</Text>
              <Text>{marker.description}</Text>
            </Popup>
          </Marker>
        ))}

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </Box>
  );
};

export default LocationMap;
