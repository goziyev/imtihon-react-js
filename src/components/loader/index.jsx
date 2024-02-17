import React from "react";
import { ClipLoader } from "react-spinners";
import style from "./index.module.css";

export default function Loader({ loading }) {
  return (
    <div className={style.loaderContainer}>
      <ClipLoader
        loading={loading}
        size={150}
        className={style.loader}
        color={"white"}
      />
    </div>
  );
}
