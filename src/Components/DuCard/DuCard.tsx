import React, { Component } from "react";

import {
  buildChart,
  buildBarChart,
} from "./d3Util";

import style from "./card.scss";

const randomize = (max = 100) => Math.round(Math.random() * max);

export class DuCard extends Component<any, any> {
  state = {
    key: "",
  };

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
      onHover: (key) => {
        this.setState({ key });
        buildBarChart({
          selector: "#bar-chart",
        });
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
        <div className={style["chart-info"]}>
          <h2> {this.state.key} </h2>
          <h3> {this.state.key ? "Most Used Technologies" : null }  </h3>
          <div id="bar-chart" />
        </div>
      </div>
    );
  }
}
