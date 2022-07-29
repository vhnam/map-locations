import { ActionIcon, Table, Text } from '@mantine/core';
import { BiTrashAlt } from 'react-icons/bi';

import { Marker } from '../../../../types/marker';

interface MarkersPanelProps {
  markers: Marker[];
  onDelete: (markerID: number) => void;
}

const MarkersPanel = ({ markers, onDelete }: MarkersPanelProps) => (
  <Table>
    <thead>
      <tr>
        <th>Locations</th>
        <th>&nbsp;</th>
      </tr>
    </thead>
    <tbody>
      {markers.length === 0 && (
        <tr>
          <td colSpan={2}>
            <Text color="gray" align="center">
              No marker
            </Text>
          </td>
        </tr>
      )}
      {markers.map((marker) => (
        <tr key={marker.id}>
          <td>{marker.title}</td>
          <td align="right">
            <ActionIcon onClick={onDelete.bind(null, marker.id)}>
              <BiTrashAlt />
            </ActionIcon>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default MarkersPanel;
