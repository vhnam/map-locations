import createHook from 'zustand';
import { persist } from 'zustand/middleware';
import createVanilla from 'zustand/vanilla';

import { Marker } from '../types/marker';

interface MarkerStore {
  markers: Marker[];
  setMarker: (marker: Marker) => void;
  clearMarker: (markerID: number) => void;
}

export const markerStore = createVanilla(
  persist<MarkerStore>(
    (set) => ({
      markers: [],
      setMarker: (marker) => {
        set((state) => ({
          ...state,
          markers: [...state.markers, marker],
        }));
      },
      clearMarker: (markerID) => {
        set((state) => ({
          ...state,
          markers: state.markers.filter((marker) => marker.id !== markerID),
        }));
      },
    }),
    {
      name: 'map-locations',
    }
  )
);

const useMarkerStore = createHook(markerStore);

export default useMarkerStore;
