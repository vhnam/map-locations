import { Coordinate } from './coordinate';

export type Marker = {
  id: number;
  title: string;
  description: string;
  coordinate: Coordinate;
};
