import { useState, useEffect } from 'react';
import './App.css';
import { act } from 'react-dom/test-utils';

export const App = () => {
  // Variables
  const [loading, setLoading] = useState(true);
  const [puzzle, setPuzzle] = useState();
  const [activeCell, setActiveCell] = useState({ row: 0, col: 0 });
  const [direction, setDirection] = useState();
  const size = 5;

  const handleLetterInput = (row, col) => {
    setActiveCell({ row, col });
    console.log("Current:", activeCell.row);
  };

  useEffect(() => {
    async function fetchData() {
      var puzzleDatabase = require('./db/puzzles.json');

      // console.log(puzzleDatabase.puzzles[0].data)

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
                            key={`${row}-${col}`}>
                            <div
                              className='items-center border border-black bg-white'>
                              <input
                                className={`p-4 sm:p-6 md:px-8 text-center text-3xl uppercase focus:outline-none focus:ring-0 
                                  ${activeCell.row == row && activeCell.col == col
                                    ? "bg-green-300"
                                    : "bg-white"
                                  }`}
                                size="1"
                                type="text"
                                maxLength="1"
                                name="myInput"
                                onFocus={() => handleLetterInput(row, col)}
                                onBlur={() => console.log("Previous:", row, col)}
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
