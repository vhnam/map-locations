import { useMapEvent } from 'react-leaflet';

interface InteractiveLayerProps {
  onClick: (lat: number, lng: number) => void;
}

const InteractiveLayer = ({ onClick }: InteractiveLayerProps) => {
  const map = useMapEvent('click', (e) => {
    onClick(e.latlng.lat, e.latlng.lng);
    map.flyTo(e.latlng, map.getZoom());
  });

  return null;
};

export default InteractiveLayer;
