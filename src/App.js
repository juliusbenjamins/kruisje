import { useState, useEffect, useRef } from 'react';
import './App.css';

// Random constants
const HORIZONTAL = 0;
const VERTICAL = 1;
const GRIDSIZE = 5;

export const App = () => {
  /* ---------------- Constants ---------------- */
  const [loading, setLoading] = useState(true);
  const [puzzle, setPuzzle] = useState();
  const [direction, setDirection] = useState(HORIZONTAL); // 0 = Horizontal, 1 = Vertical
  const [activeCell, setActiveCell] = useState({
    row: null,
    col: null,
  });
  const inputs = useRef([]);

  /* ---------------- Functions ---------------- */

  /* Sets new active cell after new focus */
  const handleFocus = (e, row, col) => {
    e.target.select()
    setActiveCell({ row, col });
  };

  /* Switches direction of puzzle if clicked on current cell */
  const handleMouseDown = (row, col) => {
    if (activeCell.row === row && activeCell.col === col) {
      setDirection((direction + 1) % 2)
    }
  }

  /* Checks if the new letter is a letter, otherwise leave empty*/
  const handleChange = (e, index) => {
    const re = /^[A-Za-z]+$/;
    const value = e.target.value;

    if (!re.test(value)) {
      e.target.value = ""
    }

    // Als er een letter is ingevuld -> focus naar volgende input
    // Lelijkste en onduidelijkste logica ooit dus even mooimaken chef
    if (value.length === 1 && index < inputs.current.length - 1) {
      if (direction === 0) inputs.current[(index + 1) % 25].focus();
      if (direction === 1) {
        if (index >= 20) {
          inputs.current[(index + 6) % 25].focus();
        } else {
          inputs.current[(index + 5) % 25].focus();
        }
      }
    } else if (index === inputs.current.length - 1) {
      inputs.current[0].focus();
      setDirection((direction + 1) % 2)
    }
  }

  const handleKeyDown = (e) => {

  }

  const getCellColor = (row, col) => {
    if (activeCell.row === row && activeCell.col === col) {
      return "bg-green-400";
    } else if ((direction === HORIZONTAL && activeCell.row === row && activeCell.col !== col) ||
      (direction === VERTICAL && activeCell.col === col && activeCell.row !== row)) {
      return "bg-green-200";
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
      <div className="App font-mono h-screen flex-col flex justify-between">
        <div className='App-body flex justify-center items-center'>
          <div className='text-4xl mb-16 mt-20 font-mono'>
            kruisje.
          </div>
          <div className='bg-white shadow-xl rounded-xl'>
            <div className="flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="overflow-hidden grid grid-cols-5 grid-rows-5 border 
                                  border-black bg-black">
                    {
                      Array.from({ length: GRIDSIZE * GRIDSIZE }).map((_, index) => {
                        const row = Math.floor(index / GRIDSIZE);
                        const col = index % GRIDSIZE;
                        const curLetter = puzzle[row][col]

                        if (curLetter == ".") {
                          return (
                            <div
                              key={`${row}-${col}`}
                              ref={(el) => (inputs.current[index] = el)}
                              className="border bg-black border-black aspect-square overflow-hidden">
                            </div>
                          )
                        } else {
                          return (
                            <div
                              key={`div-${row}-${col}`}
                              className='items-center overflow-hidden'
                            >
                              <div
                                className='items-centeroverflow-hidden border border-black'>
                                <input
                                  id={`input-${row}-${col}`}
                                  className={`p-5 sm:p-6 md:px-8 appearance-none rounded-none text-center 
                                              text-2xl sm:text-3xl md:text-4xl uppercase 
                                              focus:outline-none focus:ring-0 aspect-square
                                  ${getCellColor(row, col)}`}
                                  size="1"
                                  type="text"
                                  maxLength="1"
                                  name="inputCell"
                                  ref={(el) => (inputs.current[index] = el)}
                                  onFocus={(e) => handleFocus(e, row, col)}
                                  onMouseDown={() => handleMouseDown(row, col)}
                                  onKeyDown={(e) => handleKeyDown(e, row, col)}
                                  onChange={(e) => handleChange(e, index)}
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
        <footer className='text-xs'>
          door julius benjamins
        </footer>
      </div>
    );
  }
}

export default App;

