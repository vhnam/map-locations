import { Box } from '@mantine/core';

import useMarkerStore from '../../stores/marker';
import useModalStore from '../../stores/modal';

import AddMarkerModal from './components/AddMarkerModal';
import InformationBar from './components/InformationBar';
import LocationMap from './components/LocationMap';

const LocationPicker = () => {
  const { setMarker } = useMarkerStore();
  const { showModal } = useModalStore();

  const handleClick = (lat: number, lng: number) => {
    showModal(AddMarkerModal, {
      lat,
      lng,
      onSubmit: handlAddMarker,
    });
  };

  const handlAddMarker = (formData: any, callback: () => void) => {
    setMarker({
      ...formData,
      id: Date.now(),
    });

    callback();
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <InformationBar />
      <LocationMap onClick={handleClick} />
    </Box>
  );
};

export default LocationPicker;
