import React from 'react';
import Board from './Board';
import '../Game.css';
import {calculateWinner} from '../helpers.js'

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      // Creating a history
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    // Calculating winner
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    // Displaying next player's turn
    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      history: history.concat([{squares}]), // Adding move to history
      xIsNext: !this.state.xIsNext, // Changing player's turn
    });
  }

  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    // Updating game status
    let status;
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = 'Next player: ' + (this.state.xIsNext? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

export default Game;