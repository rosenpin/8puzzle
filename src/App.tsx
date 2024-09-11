import { useEffect, useState } from "react";
import { FaShuffle } from "react-icons/fa6";
import PuzzleBoard from "./components/PuzzleBoard";
import {
  createInitialState,
  isSolvable,
  shufflePuzzle,
} from "./utils/puzzleUtils";

function App() {
  const [puzzleState, setPuzzleState] = useState(() => {
    const savedState = localStorage.getItem("puzzleState");
    return savedState ? JSON.parse(savedState) : createInitialState();
  });
  const [moveCount, setMoveCount] = useState(() => {
    return parseInt(localStorage.getItem("moveCount") || "0");
  });

  useEffect(() => {
    localStorage.setItem("puzzleState", JSON.stringify(puzzleState));
    localStorage.setItem("moveCount", moveCount.toString());
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
    setMoveCount((prevCount) => prevCount + 1);
  };

  const handleSolve = () => {
    alert("Congratulations! You solved the puzzle!");
    handleShuffle();
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-[#FBF9F9]">
      <div className="flex justify-between w-[511px] mb-4">
        <h1 className="text-[42px] font-bold text-[#472C35]">8-Puzzle</h1>
        <div className="flex items-center">
          <button
            className="w-[89px] h-[32px] bg-[#FFC4D8B2] hover:bg-opacity-80 text-[#D72A6E] font-medium rounded-lg mr-2 flex items-center justify-center"
            onClick={handleShuffle}
          >
            <FaShuffle className="w-[14px] h-[12px] mr-2" />
            <span className="text-[13px]">Shuffle</span>
          </button>
          <div className="w-[89px] h-[32px] bg-white border border-[#F2E9E9] rounded-lg flex items-center justify-center">
            <span className="font-medium text-[13px]">
              Moves: {moveCount.toString().padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
      <PuzzleBoard
        puzzleState={puzzleState}
        onMove={handleMove}
        onSolve={handleSolve}
      />
    </div>
  );
}

export default App;
