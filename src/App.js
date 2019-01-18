import React, { Component } from "react";
import Cell from "./Cell";
import "./App.css";

class App extends Component {
  state = {
    board: {},
    size: { row: 20, col: 50 }
  };
  
  intervalID;
  
  componentDidMount() {
    // Generate board
    const board = { ...this.state.board };
    for (let row = 1; row <= this.state.size.row; row++) {
      if (!board[row]) board[row] = {};
      for (let col = 1; col <= this.state.size.col; col++) {
        
        // true is alive
        board[row][`${row}-${col}`] = (Math.random() * 10) >= 5;
      }
    }

    this.setState({ board });
  }
  
  play = () => {
    this.intervalID = setInterval(() => {
      this.tick();
    }, 1000);
  }
  
  pause = () => {
    clearInterval(this.intervalID);
  }
  
  tick = () => {
    const newState = { ...this.state.board };
    Object.keys(this.state.board).forEach(rowNum => {
      Object.keys(this.state.board[rowNum]).forEach(cellID => {
        const [row, col] = cellID.split('-');
        
        // directions
        const above = Number(row) - 1;
        const below = Number(row) + 1;
        const left = Number(col) - 1;
        const right = Number(col) + 1;
        
        // check cells above
        const UL = `${above}-${left}`;
        const UC = `${above}-${col}`;
        const UR = `${above}-${right}`;
        
        // check cells in same row
        const L = `${row}-${left}`;
        const R = `${row}-${right}`;
        
        // check cells below
        const LL = `${below}-${left}`;
        const LC = `${below}-${col}`;
        const LR = `${below}-${right}`;
        
        // Calculate isAlive state
        const adjacentCells = [UL, UC, UR, L, R, LL, LC, LR];
        const livingNeighbors = adjacentCells.reduce((sum, id) => {
          const [rowToCheck] = id.split('-');
          if (this.state.board[rowToCheck] && this.state.board[rowToCheck][id]) sum +=1;
          return sum;
        }, 0);
        
        const isAlive = this.state.board[rowNum][cellID];
        if (isAlive && (livingNeighbors < 2 || livingNeighbors > 3)) {
          newState[rowNum][cellID] = false;
        } else if (livingNeighbors === 3) newState[rowNum][cellID] = true;
      });
    });
    
    this.setState({ board: newState });
  }

  renderRow = row => {
    return (
      <div key={row}>
        {Object.keys(this.state.board[row]).map(cellID => (
          <Cell
            key={cellID}
            id={cellID}
            isAlive={this.state.board[row][cellID]}
          />
        ))}
      </div>
    );
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Game of Life</h1>
        </header>
        <div id="board">
          {Object.keys(this.state.board).map(this.renderRow)}
        </div>
        <button onClick={this.tick}>One Tick</button>
        <button onClick={this.play}>Play</button>
        <button onClick={this.pause}>Pause</button>
      </div>
    );
  }
}

export default App;
