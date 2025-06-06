import React, { useState } from 'react';
import './App.css';

// PUBLIC_INTERFACE
function App() {
  // Initialize game state
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  
  /**
   * Calculates the winner by checking all possible winning combinations
   * @param {Array} squares - Current state of the game board
   * @returns {string|null} - Returns 'X', 'O', or null
   */
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], // top row
      [3, 4, 5], // middle row
      [6, 7, 8], // bottom row
      [0, 3, 6], // left column
      [1, 4, 7], // middle column
      [2, 5, 8], // right column
      [0, 4, 8], // diagonal
      [2, 4, 6], // diagonal
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  /**
   * Handles a player's move
   * @param {number} index - Index of the clicked square
   */
  const handleClick = (index) => {
    // If square is filled or there's a winner, return
    if (squares[index] || calculateWinner(squares)) return;

    // Create new array with the move
    const newSquares = squares.slice();
    newSquares[index] = isXNext ? 'X' : 'O';
    
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  /**
   * Resets the game to initial state
   */
  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  };

  // Calculate current game status
  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every(square => square !== null);
  const status = winner 
    ? `Winner: ${winner}` 
    : isDraw 
    ? 'Game Draw!' 
    : `Next player: ${isXNext ? 'X' : 'O'}`;

  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> TicTacToe Interactive
            </div>
          </div>
        </div>
      </nav>

      <main>
        <div className="container">
          <div className="game-container">
            <div className="game-status">
              {status.includes('X') ? (
                <span className="player-x">{status}</span>
              ) : status.includes('O') ? (
                <span className="player-o">{status}</span>
              ) : (
                <span>{status}</span>
              )}
            </div>
            
            <div className="game-board">
              {squares.map((square, index) => (
                <button
                  key={index}
                  className="game-cell"
                  onClick={() => handleClick(index)}
                  disabled={square || winner || isDraw}
                >
                  {square && (
                    <span className={square === 'X' ? 'player-x' : 'player-o'}>
                      {square}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <button 
              className="btn btn-large" 
              onClick={handleRestart}
              style={{ marginTop: '20px' }}
            >
              Restart Game
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;