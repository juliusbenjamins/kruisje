const HORIZONTAL = 0;
const VERTICAL = 1;

export const PuzzleComponent = (size, puzzle, activeCell, direction, inputs, setActiveCell, setDirection) => {

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
    return (
		   <div className='bg-white shadow-xl border-4 border-black'>
              <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden grid grid-cols-5 grid-rows-5 border 
                                  border-black bg-black">
                      {
                        Array.from({ length: size * size }).map((_, index) => {
                          const row = Math.floor(index / size);
                          const col = index % size;
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
                                className='items-center overflow-hidden'
                              >
                                <div
                                  className='items-center overflow-hidden border border-black'>
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
	)
};