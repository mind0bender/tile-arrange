import { Tile } from "../helper/grid";
import { getTimeDiff } from "../helper/misc";
import Board from "./board";

interface BackCardProps {
  startTime: number;
  time: number;
  moveCount: number;
  board: Tile[][];
  resetGame: () => void;
}

function BackCard({
  time,
  moveCount,
  startTime,
  board,
  resetGame,
}: BackCardProps): JSX.Element {
  return (
    <>
      <div className={`flex justify-between items-center`}>
        <div
          title={`Elapsed time: ${
            getTimeDiff(startTime, time) > 0
              ? getTimeDiff(startTime, time)
              : "0"
          } seconds`}>
          {getTimeDiff(startTime, time) > 0
            ? getTimeDiff(startTime, time)
            : "0"}
          s
        </div>
        <div title={`Move count: ${moveCount}`}>{moveCount} moves</div>
        <div>Board Solved</div>
      </div>
      <Board title={`Initial Board`} board={board} />
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

export default BackCard;
