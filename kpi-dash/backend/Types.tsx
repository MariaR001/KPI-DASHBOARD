type Tile = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  representation: string;
  dataset: string;
};

type Config = {
  tiles: Tile[];
};

export type { Tile, Config };
