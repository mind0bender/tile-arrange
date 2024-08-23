import { MouseEvent, ReactNode, useCallback, useEffect, useState } from "react";
import { getRandomGrid, GridIdx, Tile } from "./helper/grid";

function App(): JSX.Element {
  const [tileGrid, setTileGrid] = useState<Tile[][]>([]);

  useEffect((): (() => void) => {
    setTileGrid(getRandomGrid());
    return (): void => {};
  }, []);

  const handleTileSwap: (
    e: MouseEvent<HTMLButtonElement>,
    pos: GridIdx
  ) => void = useCallback(
    (e: MouseEvent<HTMLButtonElement>, pos: GridIdx): void => {
      console.log(pos, tileGrid[pos[0]][pos[1]]);
    },
    [tileGrid]
  );

  return (
    <main
      className={`min-h-screen w-full bg-primary-100 font-mono flex justify-center items-center text-primary-950`}>
      <div className={`flex flex-col gap-1 p-2 ring rounded-md text-lg`}>
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
                        : "bg-primary-100 border-none"
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
