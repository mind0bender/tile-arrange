import {
  MouseEvent,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  getNeighbourGridIdxs,
  getRandomGrid,
  GridIdx,
  swappedTiles,
  Tile,
} from "./helper/grid";
import checkWin from "./helper/check";
import FrontCard from "./components/frontcard";
import BackCard from "./components/backcard";
import { CopyBoard } from "./helper/misc";

function App(): JSX.Element {
  const [time, setTime] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const startTime: MutableRefObject<number> = useRef<number>(0);
  const timerIntervalId: MutableRefObject<number | null> = useRef<
    number | null
  >(null);
  const initialBoard: MutableRefObject<Tile[][]> = useRef(getRandomGrid());
  const [tileGrid, setTileGrid] = useState<Tile[][]>(
    CopyBoard(initialBoard.current)
  );

  const [winStatus, setWinStatus] = useState<boolean>(false);

  const resetGame: () => void = useCallback((): void => {
    initialBoard.current = getRandomGrid();
    setTileGrid(CopyBoard(initialBoard.current));
    setWinStatus(false);
    if (timerIntervalId.current) {
      clearInterval(timerIntervalId.current);
      startTime.current = 0;
      setTime(0);
      setMoveCount(0);
    }
  }, []);

  useEffect((): (() => void) => {
    if (winStatus && timerIntervalId.current) {
      clearInterval(timerIntervalId.current);
      timerIntervalId.current = null;
    }

    return (): void => {};
  }, [winStatus]);

  const handleTileSwap: (
    e: MouseEvent<HTMLButtonElement>,
    pos: GridIdx
  ) => void = useCallback(
    (_e: MouseEvent<HTMLButtonElement>, pos: GridIdx): void => {
      setMoveCount((pMC: number): number => pMC + 1);
      if (!startTime.current) {
        startTime.current = Date.now();
        timerIntervalId.current = setInterval((): void => {
          setTime(Date.now());
        }, 1000);
      }
      const neighbourIdxs: GridIdx[] = getNeighbourGridIdxs([pos[0], pos[1]]);
      const blankNeighbourIdx: GridIdx | null =
        neighbourIdxs.filter(
          (neighbourIdx: GridIdx): boolean =>
            !tileGrid[neighbourIdx[0]][neighbourIdx[1]].occupied
        )[0] || null;
      if (blankNeighbourIdx) {
        setTileGrid((pTG: Tile[][]): Tile[][] => {
          const updatedBoard: Tile[][] = swappedTiles(
            pTG,
            pos,
            blankNeighbourIdx
          );
          const matchWon: boolean = checkWin({ board: tileGrid });
          if (matchWon) {
            setWinStatus(true);
          }
          return updatedBoard;
        });
      }
    },
    [tileGrid]
  );

  return (
    <main
      className={`min-h-screen w-full bg-primary-100 font-mono flex justify-center items-center text-primary-950`}>
      <div
        style={{
          transform: `rotateY(${winStatus ? 180 : 0}deg)`,
        }}
        className={`flex flex-col gap-4 p-2 border border-b-2 border-l-2 border-primary-700 shadow-2xl shadow-primary-200 rounded-md text-lg bg-primary-50 duration-300`}>
        {winStatus ? (
          <div
            style={{
              transform: `rotateY(${winStatus ? -180 : 0}deg)`,
            }}
            className={`flex flex-col gap-4`}>
            <BackCard
              time={time}
              startTime={startTime.current}
              board={initialBoard.current}
              resetGame={resetGame}
            />
          </div>
        ) : (
          <FrontCard
            time={time}
            tileGrid={tileGrid}
            startTime={startTime.current}
            handleTileSwap={handleTileSwap}
            moveCount={moveCount}
            resetGame={resetGame}
          />
        )}
      </div>
    </main>
  );
}

export default App;
