import { createStyles } from '@mantine/styles';

const useStyles = createStyles((theme) => ({
  container: {
    position: 'absolute',
    top: '1rem',
    left: '1rem',
    padding: theme.spacing.md,
    width: '22.5rem',
    maxHeight: 'calc(100vh - 5.75rem)',
    backgroundColor: theme.white,
    borderRadius: theme.radius.sm,
    boxShadow: theme.shadows.md,
    zIndex: 100,
  },
}));

export default useStyles;
