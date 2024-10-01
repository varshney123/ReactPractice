export default function GameBoard({ onSelect, gameBoard }) {
    function handleSelectSquare(x, y) {
        onSelect(x, y);
    }

    return (
        <ol id="game-board">
            {gameBoard.map((row, rowIndex) => {
                return (
                    <li key={rowIndex}>
                        <ol>
                            {row.map((playerSymbol, colIndex) => <li key={colIndex}><button onClick={() => handleSelectSquare(rowIndex, colIndex)} disabled={playerSymbol}>{playerSymbol}</button></li>)}
                        </ol>
                    </li>
                )
            })}
        </ol>
    )
}