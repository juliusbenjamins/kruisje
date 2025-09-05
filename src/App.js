import { useState, useEffect, useRef } from 'react';
import './App.css';

// Random constants
const HORIZONTAL = 0;
const VERTICAL = 1;
const size = 5;

export const App = () => {
  /* ---------------- Constants ---------------- */
  const [loading, setLoading] = useState(true);
  const [puzzle, setPuzzle] = useState();
  const [direction, setDirection] = useState(HORIZONTAL); // 0 = Horizontal, 1 = Vertical
  const [activeCell, setActiveCell] = useState({
    row: null,
    col: null,
  });

  /* ---------------- Functions ---------------- */

  /* Sets new active cell after new focus */
  const handleFocus = (row, col) => {
    setActiveCell({ row, col });
  };

  /* Switches direction of puzzle if clicked on current cell */
  const handleMouseDown = (row, col) => {
    if (activeCell.row === row && activeCell.col === col) {
      setDirection((direction + 1) % 2)
      console.log("new dir", direction)
    }
  }

  /* Checks if the new letter is a letter, otherwise leave empty*/
  const handleChange = (e) => {
    const re = /^[A-Za-z]+$/;

    if (!re.test(e.target.value)) {
      e.target.value = ""
    }
  };

  const handleKeyDown = (e) => {

  }

// { <input id={input-${row}-${col}} 
// className={p-4 sm:p-6 md:px-8 text-center text-3xl uppercase focus:outline-none focus:ring-0 
//   ${
//     activeCell.row == row && activeCell.col == col 
//     ? "bg-purple-400 " 
//     : "bg-white " /* Sets the active cell to green */ 
//   } 
//   ${
//     (direction == HORIZONTAL && activeCell.row == row && activeCell.col != col) 
//     || direction == VERTICAL && activeCell.col == col && activeCell.row != row 
//     ? "bg-purple-200 " 
//     : "bg-white " /* Set active row or column to soft green */ 
//   }} }

  const getCellColor = (row, col) => {
    if (activeCell.row === row && activeCell.col === col) { 
      return "bg-purple-400";
    } else if ( (direction === HORIZONTAL && activeCell.row === row && activeCell.col !== col) ||
      (direction === VERTICAL && activeCell.col === col && activeCell.row !== row)) { 
      return "bg-purple-200"; 
    } else {
      return "bg-white";
    }

  };

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
      <div className="App font-mono h-screen">
        <div className='App-body flex justify-center items-center'>
          <div className='bg-white shadow-xl rounded-sm'>
            <div className="p-10">
              kruisje laden...
            </div>
          </div>
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
                    {
                    Array.from({ length: size * size }).map((_, index) => {
                      const row = Math.floor(index / size);
                      const col = index % size;
                      const curLetter = puzzle[row][col]

                      if (curLetter == ".") {
                        return (
                          <div
                            key={`${row}-${col}`}
                            className="text-2xl flex justify-center items-center border bg-black border-black">
                          </div>
                        )
                      } else {
                        return (
                          <div
                            key={`div-${row}-${col}`}>
                            <div
                              className='items-center border border-black'>
                              <input
                                id={`input-${row}-${col}`}
                                className={`p-6 sm:p-6 md:px-8 text-center text-3xl uppercase focus:outline-none focus:ring-0 
                                  ${getCellColor(row, col)}`}
                                size="1"
                                type="text"
                                maxLength="1"
                                name="inputCell"
                                onFocus={() => handleFocus(row, col)}
                                onMouseDown={() => handleMouseDown(row, col)}
                                onKeyDown={(e) => handleKeyDown(e, row, col)}
                                onChange={(e) => handleChange(e)}
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

