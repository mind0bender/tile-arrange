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
