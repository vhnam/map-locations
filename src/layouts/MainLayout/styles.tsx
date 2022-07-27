import { createStyles } from '@mantine/core';

export const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: theme.fn.variant({
      variant: 'filled',
      color: theme.primaryColor,
    }).background,
    boxShadow: theme.shadows.md,
  },
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: HEADER_HEIGHT,
  },
  mainContent: {
    margin: '-1rem',
  },
}));

export default useStyles;
