import { useState, useEffect, useRef } from 'react';
import './App.css';

/**
 * To do:
 *  - Backspace knop
 *  - Skip knop voor als je een letter als hebt ingevuld?
 *  - Cookie voor checken opgelost
 */

// Random constants
const HORIZONTAL = 0;
const VERTICAL = 1;
const GRIDSIZE = 5;

export const App = () => {
  /* ---------------- Constants ---------------- */
  const [loading, setLoading] = useState(true);
  const [puzzle, setPuzzle] = useState();
  const [direction, setDirection] = useState(HORIZONTAL); // 0 = Horizontal, 1 = Vertical
  const [verticalDesc, setVerticalDesc] = useState();
  const [horizontalDesc, setHorizontalDesc] = useState();
  const [puzzleState, setPuzzleState] = useState();
  const [isSolved, setIsSolved] = useState(false);
  const [puzzleActive, setPuzzleActive] = useState(false);
  const [fade, setFade] = useState(true);
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

  const verifyPuzzle = () => {
    if (puzzle.length !== puzzleState.length) return false;

    for (let i = 0; i < puzzle.length; i++) {
      for (let j = 0; j < puzzle.length; j++) {
        if (puzzle[i][j].toUpperCase() !== puzzleState[i][j].toUpperCase()) return false;
      }
    }

    return true
  }

  /* Checks if the new letter is a letter, otherwise leave empty*/
  const handleChange = (e, index) => {
    const re = /^[A-Za-z]+$/;
    const value = e.target.value;

    if (!re.test(value)) {
      e.target.value = ""
    }

    let newPuzzleState = puzzleState
    newPuzzleState[activeCell.row][activeCell.col] = value

    setPuzzleState(newPuzzleState)

    // Checkt eerst of de puzzel zo af is. Zo niet dan door.
    // Als er een letter is ingevuld -> focus naar volgende input
    // Lelijkste en onduidelijkste logica ooit dus even mooimaken chef
    if (verifyPuzzle()) {
      setIsSolved(true)
    } else {
      if (value.length === 1 && index < inputs.current.length - 1) {
        if (direction === 0) {
          if (inputs.current[(index + 1) % 25].id === ".") {
            inputs.current[(index + 2) % 25].focus();
          } else {
            inputs.current[(index + 1) % 25].focus();
          }
        }
        if (direction === 1) {
          if (index >= 20) {
            if (inputs.current[(index + 6) % 25].id === ".") {
              inputs.current[(index + 11) % 25].focus();
            } else {
              inputs.current[(index + 6) % 25].focus();
            }
          } else {
            if (inputs.current[(index + 5) % 25].id === ".") {
              inputs.current[(index + 10) % 25].focus();
            } else {
              inputs.current[(index + 5) % 25].focus();
            }

          }
        }
      } else if (index === inputs.current.length - 1) {
        inputs.current[0].focus();
        setDirection((direction + 1) % 2)
      }
    }
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

  const getCurrentDesc = () => {
    if (direction === VERTICAL) {
      return (verticalDesc[activeCell.col])
    } else if (direction === HORIZONTAL) {
      return (horizontalDesc[activeCell.row])
    } else {
      return ""
    }
  }

  const startPuzzle = () => {
    setFade(false)
    setPuzzleActive(true)
  }

  useEffect(() => {
    async function fetchData() {
      var puzzleDatabase = require('./db/puzzles.json');
      var puzzleGrid = puzzleDatabase.puzzles[0].data
      var emptyPuzzle = [...Array(5)].map(e => Array(5).fill("."));

      setPuzzle(puzzleGrid)
      setPuzzleState(puzzleGrid)
      setHorizontalDesc(puzzleDatabase.puzzles[0].horizontalDescriptions);
      setVerticalDesc(puzzleDatabase.puzzles[0].verticalDescriptions);
      setLoading(false);
      setPuzzleState(emptyPuzzle)

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
      <div className="App font-mono h-screen flex flex-col flex justify-between">
        <div className='App-body flex justify-center items-center'>

          {/* Title */}
          <div className='text-4xl mb-8 mt-10 sm:mt-15 md:mt-20 font-mono'>
            {/* <img className="w-60" 
                 src={require('./img/Logo.png')}/> */}
                 Kruisje
          </div>

          {/* Component that holds puzzle and letter description/solved message OR the start screen */}
          {!puzzleActive &&
            <div>
              <div className='flex h-96 justify-center items-center'>
                <div className="text-center animate-bounce">
                  <button className="p-2"
                    onClick={(e => startPuzzle())}>
                    Start!
                  </button>
                </div>
              </div>
            </div>}

          {puzzleActive &&
            <div>
              {/* Shows when puzzle is solved */}
              <div className='text-xl mb-8 font-mono px-5 py-2'>
                {!isSolved && getCurrentDesc()}
                {isSolved &&
                  <div>
                    Opgelost
                  </div>}
              </div>

              {/* Puzzle Component */}
              {/* <div className="bg-[url('../public/puzzleOutline.png')] bg-cover p-10 "> */}
              <div className="animate-[spin_1s]">
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
                                  key={`${row}${col}`}
                                  id="."
                                  ref={(el) => (inputs.current[index] = el)}
                                  className="border bg-black border-black aspect-square overflow-hidden">
                                </div>
                              )
                            } else {
                              return (
                                <div
                                  key={`div${row}${col}`}
                                  className='items-center overflow-hidden aspect-square'
                                >
                                  <div
                                    className='items-center overflow-hidden border border-black aspect-square'>
                                    <input
                                      id={`${row}${col}`}
                                      className={`p-5 sm:p-6 md:px-7 appearance-none rounded-none text-center 
                                              text-xl sm:text-2xl md:text-3xl uppercase 
                                              focus:outline-none focus:ring-0 aspect-square
                                  ${getCellColor(row, col)}`}
                                      size="1"
                                      type="text"
                                      maxLength="1"
                                      name="inputCell"
                                      ref={(el) => (inputs.current[index] = el)}
                                      onFocus={(e) => handleFocus(e, row, col)}
                                      onMouseDown={() => handleMouseDown(row, col)}
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
            </div>}

        </div>
        <footer className='text-xs'>
          door julius & niels
        </footer>
      </div>
    );
  }
}

export default App;

