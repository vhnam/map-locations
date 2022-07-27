import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Modal, Text, Textarea, TextInput } from '@mantine/core';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import addMarkerSchema from '../../../../validations/addMarker';

interface AddMarkerModalProps {
  isOpen: boolean;
  lat: number;
  lng: number;
  onClose: () => void;
  onSubmit: (formData: any, callback: () => void) => void;
}

const AddMarkerModal = ({
  isOpen,
  lat,
  lng,
  onClose,
  onSubmit,
}: AddMarkerModalProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
    setValue,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(addMarkerSchema),
    defaultValues: {
      lat,
      lng,
      title: '',
      description: '',
    },
  });

  const _onSubmit = handleSubmit((formData: any) => {
    onSubmit(formData, onClose);
  });

  useEffect(() => {
    setValue('lat', lat);
    setValue('lng', lng);
  }, [lat, lng, setValue]);

  return (
    <Modal
      centered
      title="Add Marker"
      withCloseButton={false}
      opened={isOpen}
      onClose={onClose}
    >
      <form onSubmit={_onSubmit}>
        <Controller
          control={control}
          name="title"
          render={({ field }) => (
            <TextInput
              placeholder="Enter title"
              label="Title"
              {...field}
              error={
                errors.title ? (
                  <Text>{(errors.title.message as any).toString()}</Text>
                ) : undefined
              }
            />
          )}
        />

        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <Textarea
              mt="md"
              placeholder="Enter description"
              label="Description"
              {...field}
              error={
                errors.description ? (
                  <Text>{(errors.description.message as any).toString()}</Text>
                ) : undefined
              }
            />
          )}
        />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '0.5rem',
            marginTop: '1.5rem',
          }}
        >
          <Button
            variant="default"
            loading={isSubmitting}
            type="button"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            disabled={!isDirty || !isValid}
            loading={isSubmitting}
            type="submit"
          >
            Add
          </Button>
        </Box>
      </form>
    </Modal>
  );
};

export default AddMarkerModal;
