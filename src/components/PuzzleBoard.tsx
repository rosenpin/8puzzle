import React from 'react';
import PuzzlePiece from './PuzzlePiece';

interface PuzzleBoardProps {
  puzzleState: number[];
  onMove: (newState: number[]) => void;
  onSolve: () => void;
}

const PuzzleBoard: React.FC<PuzzleBoardProps> = ({ puzzleState, onMove, onSolve }) => {
  const handlePieceClick = (index: number) => {
    const emptyIndex = puzzleState.indexOf(8);
    if (canMove(index, emptyIndex)) {
      const newState = [...puzzleState];
      [newState[index], newState[emptyIndex]] = [newState[emptyIndex], newState[index]];
      onMove(newState);
      if (isSolved(newState)) {
        onSolve();
      }
    }
  };

  return (
    <div className="grid grid-cols-3 gap-1 bg-gray-300 p-1 rounded">
      {puzzleState.map((value, index) => (
        <PuzzlePiece
          key={value}
          value={value}
          index={index}
          onClick={() => handlePieceClick(index)}
        />
      ))}
    </div>
  );
};

export default PuzzleBoard;

function canMove(index: number, emptyIndex: number): boolean {
  const row = Math.floor(index / 3);
  const col = index % 3;
  const emptyRow = Math.floor(emptyIndex / 3);
  const emptyCol = emptyIndex % 3;
  return (
    (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
    (Math.abs(col - emptyCol) === 1 && row === emptyRow)
  );
}

function isSolved(state: number[]): boolean {
  return state.every((value, index) => value === index);
}