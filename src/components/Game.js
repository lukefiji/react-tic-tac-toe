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
      xIsNext: true,
      stepNumber: 0,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
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
      stepNumber: history.length,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) ? false : true,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
      const desc = move ?
        'Move #' + move :
        'Game start';
      return (
        <li key={move}>
          <a
            className={this.state.stepNumber === move ? "current-move" : "" }
            href="#"
            onClick={() => this.jumpTo(move)}>
            {desc}
          </a>
        </li>
      );
    });

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
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;