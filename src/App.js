import { useState, useEffect } from 'react';
import './App.css';

export const App = () => {
  // Variables
  const [loading, setLoading] = useState(true);
  const [puzzle, setPuzzle] = useState();
  const size = 5;

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
      <div className="App">
        <div className='App-body flex justify-center items-center h-screen'>
          <div className='bg-white shadow-xl rounded-xl'>
            <div className="flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="overflow-hidden grid grid-cols-5 grid-rows-5 border border-black">
                    {Array.from({ length: size * size }).map((_, index) => {
                        const row = Math.floor(index / size);
                        const col = index % size;
                        const curLetter = puzzle[row][col]
                        
                        if (curLetter == "." ){
                          return (
                            <div 
                              key={`${row}-${col}`} 
                              className="p-6 px-8 text-2xl flex justify-center items-center border bg-black border-black" key={`${row}-${col}`}>
                            </div>
                          )
                        } else {
                          return (
                            <div 
                              key={`${row}-${col}`}>
                              <div 
                                className='items-center border border-black bg-white'> 
                                <input 
                                  className="p-6 text-center text-2xl uppercase" 
                                  size="1" 
                                  maxLength="1" 
                                  name="myInput" 
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
