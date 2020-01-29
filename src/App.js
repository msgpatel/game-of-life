import React, { useState, useCallback, useRef } from "react";
import produce from "immer";
import Grid from './Game';
const App = () => {

  const numRows = 30;
  const numCols = 30;

  const generateEmptyGrid = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }

    return rows;
  };

  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid();
  });
  const [running, setRunning] = useState(false);
  const runningRef = useRef(running);
  runningRef.current = running;

  const getNeighbour = (grid, row, column) => {
    const operations = [
      [0, 1],
      [0, -1],
      [1, -1],
      [-1, 1],
      [1, 1],
      [-1, -1],
      [1, 0],
      [-1, 0]
    ];
    let neighbors = 0;
    operations.forEach(([x, y]) => {
      const newRow = row + x;
      const newColumn = column + y;
      if (
        newRow >= 0 &&
        newRow < numRows &&
        newColumn >= 0 &&
        newColumn < numCols
      ) {
        neighbors += grid[newRow][newColumn];
      }
    });
    return neighbors;
  }

  const handelPlayPause = () => {
    setRunning(!running);
    if (!running) {
      runningRef.current = true;
      runSimulation();
    }
  }

  const handleRandomButtonClick = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(
        Array.from(Array(numCols), () => (Math.random() > 0.5 ? 1 : 0))
      );
    }
    setGrid(rows);
  }

  const handleNextStepClick = () => {
    setRunning(false);
    nextGridStep();
  }

  const handleClearButtonClick = () => {
    setGrid(generateEmptyGrid());
  }

  const nextGridStep = useCallback(() => {
    setGrid(grid => {
      return produce(grid, gridCopy => {
        for (let row = 0; row < numRows; row++) {
          for (let column = 0; column < numCols; column++) {
            let neighbors = getNeighbour(grid, row, column);
            if (neighbors < 2 || neighbors > 3) {
              gridCopy[row][column] = 0;
            } else if (grid[row][column] === 0 && neighbors === 3) {
              gridCopy[row][column] = 1;
            }
          }
        }
      });
    });
  }, [])

  const runSimulation = () => {
    if (!runningRef.current) {
      return;
    }
    nextGridStep();
    setTimeout(runSimulation, 500);
  }

  return (
    <Grid 
      handelPlayPause = {handelPlayPause}
      handleNextStepClick ={handleNextStepClick}
      handleRandomButtonClick ={handleRandomButtonClick}
      handleClearButtonClick ={handleClearButtonClick}
      gameRunning = {running}
      setGrid={setGrid}
      grid = {grid}
      numCols = {numCols}
    > 
    </Grid>
  );
};

export default App;
