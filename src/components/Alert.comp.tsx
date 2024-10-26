import React from "react";
import style from "./Alert.module.scss";
import { IAlertProps } from "../types/component.interfaces";

const AlertComp: React.FC<IAlertProps> = ({
  open,
  onClose,
  alertContents: { title, contents, button },
}) => {
  if (!open) return null;

  return (
    <div className={style.alertOverlay} onClick={onClose}>
      <div
        className={style.alertContainer}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className={style.alertHeader}>
            <h2>{title}</h2>
          </div>
        )}
        {contents && <div className={style.alertContent}>{contents}</div>}
        <button onClick={onClose} className={style.actionButton}>
          {button}
        </button>
      </div>
    </div>
  );
};

export default AlertComp;
