import { useState, useEffect, useRef } from 'react';
import { PuzzleComponent } from './components/puzzle';
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
  const [activeCell, setActiveCell] = useState({
    row: null,
    col: null,
  });
  const inputs = useRef([]);

  /* ---------------- Functions ---------------- */



  const verifyPuzzle = () => {
    if (puzzle.length !== puzzleState.length) return false;

    for (let i = 0; i < puzzle.length; i++) {
      for (let j = 0; j < puzzle.length; j++) {
        if (puzzle[i][j].toUpperCase() !== puzzleState[i][j].toUpperCase()) return false;
      }
    }

    return true
  }

  const getCurrentDesc = () => {
    if (direction === VERTICAL) {
      return (verticalDesc[activeCell.col])
    } else if (direction === HORIZONTAL) {
      return (horizontalDesc[activeCell.row])
    } else {
      return ""
    }
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
      <div className="App font-mono h-screen flex-col flex justify-between">
        <div className='App-body flex justify-center items-center'>
          <div className='text-4xl mb-8 mt-10 sm:mt-15 md:mt-20 font-mono'>
            kruisje.
          </div>
          <div className='text-xl mb-8 font-mono px-5 py-2'>
            {!isSolved && getCurrentDesc()}
            {isSolved &&
              <div>
                Opgelost
              </div>}
          </div>
          <div>
              <PuzzleComponent/>
          </div>
        </div>
        <footer className='text-xs'>
          door julius & niels
        </footer>
      </div>
    );
  }
}

export default App;

