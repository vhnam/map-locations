import { ReactNode } from 'react';
import create from 'zustand';

import { Modal } from '../types/modal';

interface ModalStore {
  modals: Modal[];
  showModal: (modalComponent: any, props?: Record<string, any>) => void;
  hideModal: (modalID: number) => void;
}

const useModalStore = create<ModalStore>((set) => ({
  modals: [],
  showModal: (modalComponent, props = {}) => {
    set((state) => ({
      ...state,
      modals: [
        ...state.modals,
        {
          id: Date.now(),
          component: modalComponent,
          props,
          isOpen: true,
        },
      ],
    }));
  },
  hideModal: (modalID) => {
    set((state) => ({
      ...state,
      modals: state.modals.filter((modal) => modal.id !== modalID),
    }));
  },
}));

export default useModalStore;
