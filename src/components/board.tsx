import { MouseEvent, ReactNode } from "react";
import { GridIdx, Tile } from "../helper/grid";

interface BoardProps {
  board: Tile[][];
  handleTileSwap?: (e: MouseEvent<HTMLButtonElement>, pos: GridIdx) => void;
}

function Board({ board, handleTileSwap }: BoardProps): JSX.Element {
  return (
    <div className={`flex flex-col gap-1`}>
      {board.map((tileRow: Tile[], idxI: number): ReactNode => {
        return (
          <div key={idxI} className={`flex justify-center items-center gap-1`}>
            {tileRow.map((tile: Tile, idxJ: number): ReactNode => {
              return (
                <button
                  key={idxJ}
                  onClick={(e: MouseEvent<HTMLButtonElement>): void => {
                    if (handleTileSwap) handleTileSwap(e, tile.pos);
                  }}
                  className={`aspect-square ${
                    tile.occupied
                      ? "bg-primary-200 border"
                      : "bg-transparent border-none cursor-not-allowed"
                  } h-20 flex justify-center items-center rounded-md border-primary-300 active:scale-95 hover:bg-opacity-50 duration-100`}>
                  {tile.occupied && tile.value}
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Board;
