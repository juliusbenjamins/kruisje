import { useState, useEffect, useRef } from 'react';
import './App.css';
import { act } from 'react-dom/test-utils';


const HORIZONTAL = 0;
const VERTICAL = 1;
const size = 5;

export const App = () => {
  // Variables
  const [loading, setLoading] = useState(true);
  const [puzzle, setPuzzle] = useState();
  const [direction, setDirection] = useState(HORIZONTAL); //0 = horizontal, 1=vertical
  const [activeCell, setActiveCell] = useState({
    row: null,
    col: null,
  });
  // const inputsRef = useRef([]); // om refs naar alle inputs op te slaan

  const handleFocus = (row, col) => {
    // alleen active cel bijwerken, direction blijft zoals hij is
    setActiveCell({row, col });
    setDirection(!direction)
  };

  const handleClick = (row, col) => {
    // console.log(e)
    if (activeCell.row === row && activeCell.col === col) {
      setDirection(!direction)
    }
  }

  // logs new cells
  // useEffect(() => {
  // console.log("Nieuwe actieve cel:", activeCell);
  // }, [activeCell]);

  // const handleKeyDown = (e, row, col) => {
  //   let newRow = row;
  //   let newCol = col;

  //   if (e.key === "ArrowUp") newRow = row - 1;
  //   if (e.key === "ArrowDown") newRow = row + 1;
  //   if (e.key === "ArrowLeft") newCol = col - 1;
  //   if (e.key === "ArrowRight") newCol = col + 1;

  //   console.log("Next:", newRow, newCol);
  //   setActiveCell({newRow, newCol});

  //   // if (newRow !== row || newCol !== col) {
  //   //   e.preventDefault(); // standaard cursor beweging voorkomen
  //   //   const nextInput = inputsRef.current[`${newRow}-${newCol}`];
  //   //   if (nextInput) nextInput.focus();
  //   // }
  // };

  useEffect(() => {
    async function fetchData() {
      var puzzleDatabase = require('./db/puzzles.json');
      setPuzzle(puzzleDatabase.puzzles[0].data)
      setLoading(false);
    }
    fetchData()
  }, []);

  if (loading) {
    return (
      <div className="flex items-center flex-col shadow text-xs bg-white rounded-md">
        <div className="px-6 py-8 items-center">
          Laden....
        </div>
      </div>
    )
  } else {
    return (
      <div className="App font-mono h-screen">
        <div className='App-body flex justify-center items-center'>
          <div className='text-4xl my-20 font-mono'>
            kruisje.
          </div>
          <div className='bg-white shadow-xl rounded-xl'>
            <div className="flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="overflow-hidden grid grid-cols-5 grid-rows-5 border border-black">
                    {Array.from({ length: size * size }).map((_, index) => {
                      const row = Math.floor(index / size);
                      const col = index % size;
                      const curLetter = puzzle[row][col]

                      if (curLetter == ".") {
                        return (
                          <div
                            key={`${row}-${col}`}
                            className="p-6 px-8 text-2xl flex justify-center items-center border bg-black border-black">
                          </div>
                        )
                      } else {
                        return (
                          <div
                            key={`div-${row}-${col}`}>
                            <div
                              className='items-center border border-black bg-white'>
                              <input
                                id={`input-${row}-${col}`}
                                className={`p-4 sm:p-6 md:px-8 text-center text-3xl uppercase focus:outline-none focus:ring-0                                 
                                  ${activeCell.row == row && activeCell.col == col
                                    ? "bg-green-400 "
                                    : "bg-white "
                                  /* Sets the active cell to green */
                                  }
                                  ${(direction == HORIZONTAL && activeCell.row == row && activeCell.col != col) ||
                                    direction == VERTICAL && activeCell.col == col && activeCell.row != row
                                    ? "bg-green-100 "
                                    : "bg-white "
                                  /* Set active row or column to soft green */
                                  }`}
                                size="1"
                                type="text"
                                maxLength="1"
                                name="inputCell"
                                onFocus={() => handleFocus(row, col)}
                                onClick={() => handleClick(row, col)}
                              // onBlur={() => console.log("Previous:", row, col)}
                              //  onKeyDown={(e) => handleKeyDown(e, row, col)}
                              />
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
