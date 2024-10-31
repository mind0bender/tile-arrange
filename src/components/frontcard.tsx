import { MouseEvent } from "react";
import { GridIdx, Tile } from "../helper/grid";
import { getTimeDiff } from "../helper/misc";
import Board from "./board";

interface FrontCardProps {
  time: number;
  startTime: number;
  moveCount: number;
  tileGrid: Tile[][];
  handleTileSwap: (e: MouseEvent<HTMLButtonElement>, pos: GridIdx) => void;
  resetGame: () => void;
}

function FrontCard({
  time,
  tileGrid,
  startTime,
  moveCount,
  handleTileSwap,
  resetGame,
}: FrontCardProps): JSX.Element {
  return (
    <>
      <div className={`relative flex justify-between items-center px-4`}>
        <div>
          {getTimeDiff(startTime, time) > 0
            ? getTimeDiff(startTime, time)
            : "0"}
          s
        </div>
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-2 rounded-full border border-t-2 border-r-2 border-primary-700 shadow-inner shadow-primary-200 bg-primary-100`}
        />
        <div>{moveCount ?? moveCount} moves</div>
      </div>
      <Board board={tileGrid} handleTileSwap={handleTileSwap} />
      <div>
        <button
          className={`rounded-md border border-primary-700 border-l-[3px] border-b-[3px] active:scale-95 active:-translate-x-0.5 active:translate-y-0.-translate-x-0.5 active:border-l active:border-b duration-200`}
          onClick={resetGame}
          type={"reset"}>
          <div
            className={`rounded-md bg-primary-950 px-4 py-2 text-primary-300 text-base hover:bg-primary-200 hover:text-primary-950 duration-200 border-l border-b border-primary-300`}>
            reset
          </div>
        </button>
      </div>
    </>
  );
}

export default FrontCard;
