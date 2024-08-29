import {
  MouseEvent,
  MutableRefObject,
  ReactNode,
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

function App(): JSX.Element {
  const [tileGrid, setTileGrid] = useState<Tile[][]>([]);
  const [time, setTime] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const startTime: MutableRefObject<number> = useRef<number>(0);
  const timerIntervalId: MutableRefObject<number | null> = useRef<
    number | null
  >(null);

  const resetGame: () => void = useCallback((): void => {
    setTileGrid(getRandomGrid());
    if (timerIntervalId.current) {
      clearInterval(timerIntervalId.current);
      startTime.current = 0;
      setTime(0);
      setMoveCount(0);
    }
  }, []);

  useEffect((): (() => void) => {
    resetGame();
    return (): void => {};
  }, [resetGame]);

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
        setTileGrid((pTG: Tile[][]): Tile[][] =>
          swappedTiles(pTG, pos, blankNeighbourIdx)
        );
      }
    },
    [tileGrid]
  );

  return (
    <main
      className={`min-h-screen w-full bg-primary-100 font-mono flex justify-center items-center text-primary-950`}>
      <div
        className={`flex flex-col gap-4 p-2 border border-b-2 border-l-2 border-primary-700 shadow-2xl shadow-primary-200 rounded-md text-lg bg-primary-50`}>
        <div className={`relative flex justify-between items-center px-4`}>
          <div>
            {((): ReactNode => {
              const timeDiff: number = Math.floor(
                ((time || 0) - (startTime.current || 0)) / 1000
              );
              return timeDiff < 0 ? 0 : timeDiff;
            })()}
            s
          </div>
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-2 rounded-full border border-t-2 border-r-2 border-primary-700 shadow-inner shadow-primary-200 bg-primary-100`}
          />
          <div>{moveCount ?? moveCount} moves</div>
        </div>
        <div className={`flex flex-col gap-1`}>
          {tileGrid.map((tileRow: Tile[], idxI: number): ReactNode => {
            return (
              <div
                key={idxI}
                className={`flex justify-center items-center gap-1`}>
                {tileRow.map((tile: Tile, idxJ: number): ReactNode => {
                  return (
                    <button
                      key={idxJ}
                      onClick={(e: MouseEvent<HTMLButtonElement>): void => {
                        handleTileSwap(e, tile.pos);
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
      </div>
    </main>
  );
}

export default App;
