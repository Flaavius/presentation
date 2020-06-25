import React from "react";

import style from "./slider.scss";

export const Slider = ({ onClick, onHover, dus }) => {
  return (
    <div className={style["wrapper"]} >
      <ul>
        {dus.map((du) => <li onClick={() => onClick(du)} onMouseOver={() => onHover(du)} key={du.name}> {du.name} </li>)}
      </ul>
    </div>
  );
};
