import { Box, Tabs } from '@mantine/core';

import { Coordinate } from '../../../../types/coordinate';

import useMarkerStore from '../../../../stores/marker';

import MarkersPanel from '../MarkersPanel';
import NearByPanel from '../NearByPanel';

import useStyles from './styles';

interface InformationBarProps {
  coordinate?: Coordinate;
  tab: string;
  onChangeTab: (tab: string) => void;
  onDelete: (markerID: number) => void;
  onFindLocationsNearByRadius: (formData: any) => void;
}

const InformationBar = ({
  coordinate,
  tab,
  onChangeTab,
  onDelete,
  onFindLocationsNearByRadius,
}: InformationBarProps) => {
  const { classes } = useStyles();

  const { markers } = useMarkerStore();

  return (
    <Box className={classes.container}>
      <Tabs
        value={tab}
        onTabChange={(value) => onChangeTab((value as any).toString())}
      >
        <Tabs.List>
          <Tabs.Tab value="markers">Markers</Tabs.Tab>
          <Tabs.Tab value="nearBy">Find markers in radius</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="markers" pt="xs">
          <MarkersPanel markers={markers} onDelete={onDelete} />
        </Tabs.Panel>

        <Tabs.Panel value="nearBy" pt="xs">
          <NearByPanel
            coordinate={coordinate}
            onSubmit={onFindLocationsNearByRadius}
          />
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
};

export default InformationBar;
