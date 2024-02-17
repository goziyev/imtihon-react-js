import React from "react";
import style from "./index.module.css";
import { useNavigate } from "react-router-dom";
export default function NoPage() {
  const Navigate = useNavigate();
  return (
    <div className={style.background}>
      <div className={style.glitchWrapper}>
        <div className={style.glitchText}>ERROR 404: Not found</div>
      </div>

      <button
        className={style.button}
        type="button"
        onClick={() => {
          Navigate("/");
        }}
      >
        Homepage
      </button>
    </div>
  );
}
