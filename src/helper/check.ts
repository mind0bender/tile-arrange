import { Tile } from "./grid";

interface CheckWinArgs {
  board: Tile[][]; // 2D array of tiles
}

function checkWin({ board }: CheckWinArgs): boolean {
  const flatBoard: Tile[] = board.flat();
  if (flatBoard[flatBoard.length - 1].occupied) {
    return false;
  }
  for (let i: number = 0; i < flatBoard.length - 2; i++) {
    const tile = flatBoard[i];
    if (tile.occupied && tile.value !== i + 1) {
      return false;
    }
  }
  return true;
}

export default checkWin;
