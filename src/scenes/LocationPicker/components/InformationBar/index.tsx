import { Box, List, Text } from '@mantine/core';

import useMarkerStore from '../../../../stores/marker';

import useStyles from './styles';

const InformationBar = () => {
  const { classes } = useStyles();

  const { markers } = useMarkerStore();

  return (
    <Box className={classes.container}>
      {markers.length === 0 ? (
        <Text>No marker</Text>
      ) : (
        <List listStyleType="none">
          {markers.map((marker, index) => (
            <List.Item key={marker.id}>
              {index + 1}. {marker.title}
            </List.Item>
          ))}
        </List>
      )}
    </Box>
  );
};

export default InformationBar;
