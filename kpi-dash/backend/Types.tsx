type Tile = {
  i: string;
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  representation: string;
  dataset: string;
};

type Config = {
  tiles: Tile[];
};

type TileData = {
  id: string;
  representation: string;
  dataset: string;
  data: any;
};
export type { Tile, Config, TileData };
