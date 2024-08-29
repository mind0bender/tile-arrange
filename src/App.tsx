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
  useEffect((): (() => void) => {
    setTileGrid(getRandomGrid());
    if (timerIntervalId.current) {
      clearInterval(timerIntervalId.current);
      startTime.current = 0;
      setTime(0);
    }
    return (): void => {};
  }, []);

  const handleTileSwap: (
    e: MouseEvent<HTMLButtonElement>,
    pos: GridIdx
  ) => void = useCallback(
    (e: MouseEvent<HTMLButtonElement>, pos: GridIdx): void => {
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
      <div className={`flex flex-col gap-1 p-2 ring rounded-md text-lg`}>
        <div className={`flex justify-between items-center`}>
          <div>
            {((): ReactNode => {
              const timeDiff: number = Math.floor(
                ((time || 0) - (startTime.current || 0)) / 1000
              );
              return timeDiff < 0 ? 0 : timeDiff;
            })()}
            s
          </div>
          <div>{moveCount ?? moveCount} moves</div>
        </div>
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
                        : "bg-primary-100 border-none cursor-not-allowed"
                    } h-20 flex justify-center items-center rounded-md border-primary-300 active:scale-95 duration-100`}>
                    {tile.occupied && tile.value}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default App;
