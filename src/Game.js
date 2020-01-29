import React from "react";
import Button from '@material-ui/core/Button';
import produce from "immer";
import './Game.css';

const Grid = (props) => {
    const handleGridCellClick = (curruntRow,curruntCol) => {
      const newGrid = produce(props.grid, gridCopy => {
        gridCopy[curruntRow][curruntCol] = props.grid[curruntRow][curruntCol]
          ? 0
          : 1;
      });
      props.setGrid(newGrid);
    }

    return(
    <>
      <button 
        className = "button"
        onClick={props.handelPlayPause}> {props.gameRunning ? "pause" : "play"}</button>
      <button 
        className = "button"
        onClick={props.handleNextStepClick}> next step </button>
      <button 
        className = "button"
        onClick={props.handleRandomButtonClick}> random </button>
      <button 
        className = "button"
        onClick={props.handleClearButtonClick}>clear</button>
      <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(${props.numCols}, 15px)`
      }}>
        {props.grid.map((rows, curruntRow) =>
          rows.map((col, curruntCol) => (
            <div
              key={`${curruntRow}-${curruntCol}`}
              onClick= {handleGridCellClick}
              style={{
                width: 15,
                height: 15,
                border: "solid 1px black",
                backgroundColor: props.grid[curruntRow][curruntCol] ? "red" : "white",
              }}
            />
          ))
        )}
      </div>
    </>
    ); 
};

export default Grid;