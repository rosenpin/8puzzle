import React from 'react';

interface PuzzlePieceProps {
  value: number;
  index: number;
  onClick: () => void;
}

const PuzzlePiece: React.FC<PuzzlePieceProps> = ({ value, index, onClick }) => {
  const row = Math.floor(index / 3);
  const col = index % 3;

  const style: React.CSSProperties = {
    position: 'absolute',
    top: `${row * 33.33}%`,
    left: `${col * 33.33}%`,
    width: '33.33%',
    height: '33.33%',
    transition: 'all 0.3s ease-in-out',
  };

  if (value === 8) {
    return <div style={style} className="bg-gray-300" />;
  }

  return (
    <div
      style={style}
      className="bg-blue-500 flex items-center justify-center text-white font-bold text-2xl cursor-pointer hover:bg-blue-600"
      onClick={onClick}
    >
      {value + 1}
    </div>
  );
};

export default PuzzlePiece;