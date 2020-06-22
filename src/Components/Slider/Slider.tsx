import React from "react";

import style from "./slider.scss";

export const Slider = ({ onChange, value }) => {
  return (
    <div className={style["wrapper"]} >
      <input
        min={2007}
        max={2020}
        step={1}
        value={value}
        type="range"
        name=""
        id=""
        onChange={onChange}
      />
    </div>
  );
};
