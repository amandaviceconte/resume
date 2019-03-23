import React, { Component } from 'react';

const COLOR = 'black';
const PLAYER = {
  X: 'red',
  O: 'blue'
}

class Tictactoe extends Component {
  constructor(props) {
    super(props);
    const board = [];
    this.state = {
      boardMark: [[COLOR, COLOR, COLOR], [COLOR, COLOR, COLOR], [COLOR, COLOR, COLOR]],
      initialTurn: PLAYER.X,
      currentTurn: PLAYER.X,
      winner: null,
      canPlay: true,
      turns: 0
    };
  }

  // Checks for game win conditions and returns the winner
  getWinner = (boardMark) => {
    if (boardMark[0][0] !== COLOR) {
      if ((boardMark[0][0] === boardMark[0][1] && boardMark[0][0] === boardMark[0][2]) ||
        (boardMark[0][0] === boardMark[1][1] && boardMark[0][0] === boardMark[2][2]) ||
        (boardMark[0][0] === boardMark[1][0] && boardMark[0][0] === boardMark[2][0])) {
        return this.state.currentTurn;
      }
    }
    if (boardMark[1][1] !== COLOR) {
      if ((boardMark[1][1] === boardMark[0][0] && boardMark[1][1] === boardMark[2][2]) ||
        (boardMark[1][1] === boardMark[1][0] && boardMark[1][1] === boardMark[1][2]) ||
        (boardMark[1][1] === boardMark[0][1] && boardMark[1][1] === boardMark[2][1]) ||
        (boardMark[1][1] === boardMark[0][2] && boardMark[1][1] === boardMark[2][0])) {
        return this.state.currentTurn;
      }
    }
    if (boardMark[2][2] !== COLOR) {
      if ((boardMark[2][2] === boardMark[2][0] && boardMark[2][2] === boardMark[2][1]) ||
        (boardMark[2][2] === boardMark[0][2] && boardMark[2][2] === boardMark[1][2])) {
        return this.state.currentTurn;
      }
    }
  }

  changeSquareColor = (id, boardMark) => {
    let turns = this.state.turns;
    if (boardMark[id[0]][id[1]] === COLOR && !(this.state.winner)) {
      boardMark[id[0]][id[1]] = this.state.currentTurn;
      turns++;
      this.setState({
        turns
      });
    }
  }

  hasMovementsLeft = (boardMark) => {
    for (let row of boardMark) {
      let counter = 0;
      if (row.indexOf(COLOR) === -1) {
        counter++;
        if (counter === 3) {
          this.setState({ canPlay: false });
        }
      }
    }
  }

  // Handle Click function
  handleClick = (id) => {
    const boardMark = this.state.boardMark;
    let currentBoardMark = boardMark[id[0]][id[1]];
    let currentPlayer = this.state.currentTurn;
    let nextPlayer = currentPlayer === PLAYER.X ? PLAYER.O : PLAYER.X;

    this.changeSquareColor(id, boardMark);

    const winner = this.getWinner(boardMark);
    
    if (!winner && currentBoardMark === COLOR) {
      this.setState({
        currentTurn: nextPlayer,
      })
    } else if (winner) {
      const initialTurn = this.state.initialTurn === PLAYER.X ? PLAYER.O : PLAYER.X;
      this.setState({
        winner,
        initialTurn,
        currentTurn: initialTurn
      });
      return;
    }

    if (this.state.turns >= 9) {
      return;
    }

    if (currentBoardMark === COLOR) {
      this.setState({
        boardMark,
      })
    }
  }

  restartGame = () => {
    this.setState({
      winner: null,
      boardMark: [[COLOR, COLOR, COLOR], [COLOR, COLOR, COLOR], [COLOR, COLOR, COLOR]],
      turns: 0
    })
  }

  renderPlayerTurn = () => {
    let currentTurn = this.state.currentTurn;
    return (
      <div>Turn: <span>{currentTurn}</span></div>
    );
  }

  // Generates the board with 3 columns where each column contains 3 squares
  renderBoard = () => {
    let boardColumns = [];

    for (let i = 0; i < this.state.boardMark.length; i++) {
      let boardDivSquares = [];
      let boardRow = this.state.boardMark[i];
      for (let j = 0; j < boardRow.length; j++) {
        const id = "" + i + j;
        boardDivSquares.push(<div key={id} id={id} className="board-square" onClick={() => this.handleClick(id)} style={{ background: boardRow[j] }}></div>);
      }
      boardColumns.push(<div key={i} className="boardColumn">{boardDivSquares}</div>);
    }

    return boardColumns;
  }

  // Render function
  render() {
    if (this.state.winner) {
      return <div className="gameover-display" onClick={() => { this.restartGame() }}>
        <p style={{ color: this.state.winner, borderColor: this.state.winner }}>
          Winner: {this.state.winner.toUpperCase()}
        </p>
      </div>
    }

    if (this.state.turns >= 9) {
      return <div className="gameover-display" onClick={() => { this.restartGame() }}>
        <p style={{ color: this.state.winner }}>
          It's a draw!
        </p>
      </div>
    }

    return (
      <div className="modals-background">
        {this.renderPlayerTurn()}
        <div className="board">
          {this.renderBoard()}
        </div>
      </div>
    );
  }
}

export default Tictactoe;