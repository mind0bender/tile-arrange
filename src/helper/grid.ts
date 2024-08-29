export type Tile = (
  | {
      occupied: false;
    }
  | {
      occupied: true;
      value: number;
    }
) & {
  pos: GridIdx;
};

export type GridIdx = [number, number];

export function getRandomGrid(size: number = 4): Tile[][] {
  const grid: Tile[][] = [];
  const gridIdxRemaining: GridIdx[] = [];
  for (let i: number = 0; i < size; i++) {
    const row: GridIdx[] = [];
    const tileRow: Tile[] = [];
    for (let j: number = 0; j < size; j++) {
      row.push([i, j]);
      const tile: Tile = {
        occupied: false,
        pos: [i, j],
      };
      tileRow.push(tile);
    }
    grid.push(tileRow);
    gridIdxRemaining.push(...row);
  }
  for (let i: number = 0; i < size * size - 1; i++) {
    const randomGridIdxIdx: number = Math.floor(
      Math.random() * gridIdxRemaining.length
    );
    const randomGridIdx: GridIdx = gridIdxRemaining[randomGridIdxIdx];
    gridIdxRemaining.splice(randomGridIdxIdx, 1);

    grid[randomGridIdx[0]][randomGridIdx[1]] = {
      occupied: true,
      pos: grid[randomGridIdx[0]][randomGridIdx[1]].pos,
      value: i + 1,
    };
  }
  return grid;
}

export function getNeighbourGridIdxs(
  pos: GridIdx,
  gridSize: number = 4
): GridIdx[] {
  const neighbourGridIdxs: GridIdx[] = [];
  if (pos[0]) {
    neighbourGridIdxs.push([pos[0] - 1, pos[1]]);
  }
  if (pos[1]) {
    neighbourGridIdxs.push([pos[0], pos[1] - 1]);
  }
  if (pos[0] < gridSize - 1) {
    neighbourGridIdxs.push([pos[0] + 1, pos[1]]);
  }
  if (pos[1] < gridSize - 1) {
    neighbourGridIdxs.push([pos[0], pos[1] + 1]);
  }
  return neighbourGridIdxs;
}

export function swappedTiles(
  grid: Tile[][],
  activeTileIdx: GridIdx,
  blankTileIdx: GridIdx
): Tile[][] {
  const gridCopy: Tile[][] = Array(...grid);
  const blankTile: Tile = gridCopy[blankTileIdx[0]][blankTileIdx[1]];
  const activeTile: Tile = gridCopy[activeTileIdx[0]][activeTileIdx[1]];
  blankTile.occupied = true;
  if (blankTile.occupied && activeTile.occupied) {
    blankTile.value = activeTile.value;
  }
  activeTile.occupied = false;
  return gridCopy;
}
