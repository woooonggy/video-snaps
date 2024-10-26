import React from "react";
import style from "./BottomSheet.module.scss";
import { IProgram } from "../types/api.types";

const BottomSheet: React.FC<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  programData: IProgram;
  episodeCount: number;
}> = ({ isOpen, setIsOpen, programData, episodeCount }) => {
  const handleClose = () => setIsOpen(false);

  return (
    <div
      className={`${style.bottomSheetOverlay} ${isOpen ? style.open : ""}`}
      onClick={handleClose}
    >
      <div
        className={`${style.bottomSheetContainer} ${isOpen ? style.open : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={style.bottomSheetHeader}>
          <h2>{programData.title}</h2>
          <button onClick={handleClose}>Close</button>
        </div>
        <div className={style.bottomSheetContent}>
          {Array.from({ length: episodeCount }, (_, i) => (
            <button key={i}>{i}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomSheet;
