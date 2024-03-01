type Tile = {
  i: string;
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

export type { Tile, Config };
