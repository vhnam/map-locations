import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  map: {
    '> div': {
      width: '100vw',
      height: 'calc(100vh - 60px)',
      zIndex: 1,
    },
  },
}));

export default useStyles;
