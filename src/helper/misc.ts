import { Tile } from "./grid";

export function getTimeDiff(start: number, current: number): number {
  return Math.floor(((current || 0) - (start || 0)) / 1000);
}

export function CopyBoard(board: Tile[][]): Tile[][] {
  return board.map((row: Tile[]): Tile[] =>
    row.map(
      (tile: Tile): Tile => ({
        ...tile,
        pos: [tile.pos[0], tile.pos[1]],
      })
    )
  );
}
