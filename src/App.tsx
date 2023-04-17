import { ReactNode, useEffect, useState } from 'react';
import { Button } from './component/ui/button';
import './animation.css';

const SUB_MATRIX_CALC = [-1, 0, 1];
const MATRIX_SIZE = {
  row: 40,
  col: 50,
};

interface GoLButtonType {
  value: boolean;
  GoLBoard: boolean[][];
  setGoLBoard: (board: boolean[][]) => void;
  rowIdx: number;
  columnIdx: number;
}

function App() {
  const { GoLBoard, setGoLBoard, resetGoLBoard } = useGoLState();

  const tick = () => {
    let board = structuredClone(GoLBoard);

    for (let row = 0; row < GoLBoard.length; row++) {
      for (let col = 0; col < GoLBoard.length; col++) {
        if (GoLBoard[row][col]) {
          board[row][col] = liveCellTick(GoLBoard, row, col);
        } else {
          board[row][col] = deadCellTick(GoLBoard, row, col);
        }
      }
    }

    setGoLBoard(board);
  };

  return (
    <div className="radio-gradient-bg flex h-full flex-col gap-8 overflow-auto bg-primary-color">
      <GoLHeader />
      <main className="h-[calc(100%-92px)] p-0 font-dm-sans sm:px-8">
        <section className="flex h-fit min-w-[481px] border-collapse flex-col flex-wrap items-center justify-center gap-6">
          <div className=" w-fit border-r-[1px] border-t-[1px] border-primary-border-color bg-inherit">
            {GoLBoard.map((row, rowIdx) => (
              <GoLRow key={rowIdx}>
                {row.map((_, colIdx) => {
                  return (
                    <GoLButton
                      value={GoLBoard[rowIdx][colIdx]}
                      GoLBoard={GoLBoard}
                      setGoLBoard={setGoLBoard}
                      rowIdx={rowIdx}
                      columnIdx={colIdx}
                      key={`${rowIdx}.${colIdx}`}
                    />
                  );
                })}
              </GoLRow>
            ))}
          </div>
          <div className="flex flex-row gap-4">
            <Button variant="default" size="default" onClick={resetGoLBoard}>
              Reset
            </Button>
            <Button variant="default" size="default" onClick={tick}>
              Start
            </Button>
            <Button variant="default" size="default">
              Next
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}

function useGoLState() {
  const [GoLBoard, setGoL] = useState<boolean[][]>(() => {
    const board: boolean[][] = [];
    for (let i = 0; i < MATRIX_SIZE.row; i++) {
      board.push(new Array(MATRIX_SIZE.col).fill(false));
    }

    return board;
  });

  function setGoLBoard(board: boolean[][]) {
    setGoL((prev) => board);
  }

  function resetGoLBoard() {
    const board: boolean[][] = [];
    for (let i = 0; i < MATRIX_SIZE.row; i++) {
      board.push(new Array(MATRIX_SIZE.col).fill(false));
    }
    setGoL(board);
  }

  return { GoLBoard, setGoLBoard, resetGoLBoard };
}

function GoLButton(buttonProps: GoLButtonType) {
  const { value, GoLBoard, setGoLBoard, rowIdx, columnIdx } = buttonProps;

  function onSetAlive() {
    const board = GoLBoard.slice();
    board[rowIdx][columnIdx] = !value;
    setGoLBoard(board);
  }

  return (
    <Button
      className="flex-grow border-[1px] border-r-0 border-t-0"
      variant={value ? 'plain-filled' : 'plain'}
      onClick={onSetAlive}
    ></Button>
  );
}

function GoLHeader() {
  return (
    <header className="flex justify-center pt-4">
      <h1 className="glitch-animate cursor-default text-center font-rubik-pixel text-6xl text-white">
        Game of Life
      </h1>
    </header>
  );
}

function GoLRow({ children }: { children: ReactNode }) {
  return <div className="flex flex-shrink flex-grow flex-row justify-center">{children}</div>;
}

function liveCellTick(GoLBoard: boolean[][], row: number, col: number) {
  let neightbour = 0;
  for (const subMatrixRow of SUB_MATRIX_CALC) {
    for (const subMatrixCol of SUB_MATRIX_CALC) {
      // skip curr cell
      if (subMatrixRow === 0 && subMatrixCol === 0) continue;

      const subRow = row + subMatrixRow;
      const subCol = col + subMatrixCol;
      if (subRow < 0 || subCol < 0 || subRow >= GoLBoard.length || subCol >= GoLBoard[0].length) {
        continue;
      }

      neightbour = GoLBoard[subRow][subCol] ? neightbour + 1 : neightbour;

      if (neightbour > 3) return false;
    }
  }
  return neightbour === 2 || neightbour === 3 ? true : false;
}

function deadCellTick(GoLBoard: boolean[][], row: number, col: number) {
  let neightbour = 0;
  for (const subMatrixRow of SUB_MATRIX_CALC) {
    for (const subMatrixCol of SUB_MATRIX_CALC) {
      // skip curr cell
      if (subMatrixRow === 0 && subMatrixCol === 0) continue;
      const subRow = row + subMatrixRow;
      const subCol = col + subMatrixCol;
      if (subRow < 0 || subCol < 0 || subRow >= GoLBoard.length || subCol >= GoLBoard[0].length)
        continue;

      neightbour = GoLBoard[subRow][subCol] ? neightbour + 1 : neightbour;
      if (neightbour > 3) return false;
    }
  }

  return neightbour === 3 ? true : false;
}

export default App;
