import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Text, TextInput } from '@mantine/core';
import { Controller, useForm } from 'react-hook-form';

import { Coordinate } from '../../../../types/coordinate';

import nearBySchema from '../../../../validations/nearBy';

interface NearByPanelProps {
  coordinate?: Coordinate;
  onReset: () => void;
  onSubmit: (formData: any) => void;
}

const NearByPanel = ({ coordinate, onReset, onSubmit }: NearByPanelProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
    reset,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(nearBySchema),
    defaultValues: {
      radius: '',
    },
  });

  const _onSubmit = handleSubmit(onSubmit);

  const handleReset = () => {
    onReset();
    reset();
  };

  return (
    <>
      {coordinate ? (
        <form onSubmit={_onSubmit}>
          <Controller
            control={control}
            name="radius"
            render={({ field }) => (
              <TextInput
                placeholder="Enter radius as meter(s)"
                label="Radius"
                {...field}
                error={
                  errors.radius ? (
                    <Text>{(errors.radius.message as any).toString()}</Text>
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
              marginTop: '1rem',
            }}
          >
            <Button
              variant="default"
              loading={isSubmitting}
              type="reset"
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              disabled={!isDirty || !isValid}
              loading={isSubmitting}
              type="submit"
            >
              Find
            </Button>
          </Box>
        </form>
      ) : (
        <Text align="center" size="sm">
          Please select location first
        </Text>
      )}
    </>
  );
};

export default NearByPanel;
