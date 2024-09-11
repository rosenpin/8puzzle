import { useEffect, useState } from 'react';
import PuzzleBoard from './components/PuzzleBoard';
import { createInitialState, isSolvable, shufflePuzzle } from './utils/puzzleUtils';

function App() {
  const [puzzleState, setPuzzleState] = useState(() => {
    const savedState = localStorage.getItem('puzzleState');
    return savedState ? JSON.parse(savedState) : createInitialState();
  });
  const [moveCount, setMoveCount] = useState(() => {
    return parseInt(localStorage.getItem('moveCount') || '0');
  });

  useEffect(() => {
    localStorage.setItem('puzzleState', JSON.stringify(puzzleState));
    localStorage.setItem('moveCount', moveCount.toString());
  }, [puzzleState, moveCount]);

  const handleShuffle = () => {
    let newState;
    do {
      newState = shufflePuzzle(puzzleState);
    } while (!isSolvable(newState));
    setPuzzleState(newState);
    setMoveCount(0);
  };

  const handleMove = (newState: number[]) => {
    setPuzzleState(newState);
    setMoveCount(prevCount => prevCount + 1);
  };

  const handleSolve = () => {
    alert('Congratulations! You solved the puzzle!');
    handleShuffle();
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">8 Puzzle Game</h1>
      <div className="relative w-64 h-64">
        <PuzzleBoard
          puzzleState={puzzleState}
          onMove={handleMove}
          onSolve={handleSolve}
        />
      </div>
      <div className="mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={handleShuffle}
        >
          Shuffle
        </button>
        <span className="text-lg font-semibold">Moves: {moveCount}</span>
      </div>
    </div>
  );
}

export default App;
