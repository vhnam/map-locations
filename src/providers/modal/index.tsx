import { Portal } from '@mantine/core';

import useModalStore from '../../stores/modal';

const ModalProvider = () => {
  const { modals, hideModal } = useModalStore();

  return (
    <Portal>
      {modals.map((modal) => {
        const { onClose, ...props } = modal.props as any;

        return (
          <modal.component
            key={`MODAL_${modal.id}`}
            {...props}
            onClose={() => {
              hideModal(modal.id);
              onClose && onClose();
            }}
            isOpen={modal.isOpen}
          />
        );
      })}
    </Portal>
  );
};

export default ModalProvider;
