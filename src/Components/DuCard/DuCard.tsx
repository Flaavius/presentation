import React, { Component } from "react";

import { buildChart } from "./d3Util";

import style from "./card.scss";

const randomize = (max = 100) => Math.round(Math.random() * max);

export class DuCard extends Component<any, any> {
  componentDidMount() {
    buildChart(
      {
        selector: "#chart",
        data: {
          Banking: randomize(),
          Education: randomize(),
          Finance: randomize(),
          Healthcare: randomize(),
          Insurance: randomize(),
          Media: randomize(),
          Payments: randomize(),
        },
      });
  }

  render() {
    const { data, onClose } = this.props;
    return (
      <div className={style["wrapper"]} >
        <button className={style["close-button"]} onClick={onClose}> X </button>
        <h1> {data.name} </h1>
        <div className={style["chart"]}>
          <h2> Industry </h2>
          <div id="chart"  />
        </div>
      </div>
    );
  }
}
