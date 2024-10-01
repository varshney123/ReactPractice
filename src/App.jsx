import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./components/winning-combinations";
import GameOver from "./components/GameOver";

function deriveActivePlayer(turns) {
  let currentPlayer = 'X';
  if (turns.length > 0 && turns[0].player == 'X')
    currentPlayer = 'O';

  return currentPlayer;
}

function checkForWinner(gameBoard) {
  let winner;
  for(const combination of WINNING_COMBINATIONS) {
    const winningProbab = ['XXX','OOO'];
    let squareStr = '';
    let winnerValue;

    combination.forEach((square) => {
      squareStr += gameBoard[square.row][square.column];
      winnerValue = gameBoard[square.row][square.column];
    })
    
    if(winningProbab.includes(squareStr)){
      return winnerValue;
    }
  }
  return winner;
}

function App() {
  const [turns, setUpdatedTurns] = useState([]);
  let activePlayer = deriveActivePlayer(turns);

  let gameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];

  if (turns.length > 0) {
    turns.map((turn) => {
      let { row, col } = turn.square;
      gameBoard[row][col] = turn.player;
    })
  }

  const gotWinner = checkForWinner(gameBoard);


function handleRematch(){
  setUpdatedTurns([]);
}

  function setSelectedPlayer(rowIndex, colIndex) {
    setUpdatedTurns((prevTurns) => {
      let currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns];
      return updatedTurns;
    })
  }

  return (
    <main>

      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} />
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'} />
        </ol>
        {(gotWinner || turns.length === 9) && <GameOver winner={gotWinner} onRestart={handleRematch}/>}
        <GameBoard onSelect={setSelectedPlayer} gameBoard={gameBoard} />
      </div>
      <Log turns={turns} />
    </main>
  )
}

export default App
