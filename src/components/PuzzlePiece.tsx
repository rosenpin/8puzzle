import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

interface PuzzlePieceProps {
  value: number;
  index: number;
  onClick: () => void;
}

const PuzzlePiece: React.FC<PuzzlePieceProps> = ({ value, index, onClick }) => {
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
  const isEmptyPiece = value === 8;

  useEffect(() => {
    const cropAndSetImage = async () => {
      const imageUrl =
        "https://as1.ftcdn.net/v2/jpg/03/15/34/90/1000_F_315349043_6ohfFyx37AFusCKZtGQtJR0jqUxhb25Y.jpg";
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const size = Math.min(img.width, img.height);
        canvas.width = size;
        canvas.height = size;

        ctx?.drawImage(
          img,
          (img.width - size) / 2,
          (img.height - size) / 2,
          size,
          size,
          0,
          0,
          size,
          size
        );

        setCroppedImageUrl(canvas.toDataURL());
      };
      img.src = imageUrl;
    };

    cropAndSetImage();
  }, []);

  const style: React.CSSProperties = croppedImageUrl
    ? {
        backgroundImage: `url(${croppedImageUrl})`,
        backgroundSize: "300% 300%",
        backgroundPosition: `${(value % 3) * 50}% ${
          Math.floor(value / 3) * 50
        }%`,
      }
    : {};

  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`w-[165px] h-[165px]  flex items-center justify-center text-2xl font-bold cursor-pointer rounded-md ${
        isEmptyPiece ? "bg-white z-0" : "z-10"
      }`}
      onClick={onClick}
      style={isEmptyPiece ? {} : style}
    >
      {isEmptyPiece && ""}
    </motion.div>
  );
};

export default PuzzlePiece;
