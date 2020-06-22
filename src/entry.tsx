import React, { SFC, useState } from "react";
import { render } from "react-dom";

import { HashRouter, Route } from "react-router-dom";

import { MainPage } from "./Containers/MainPage/MainPage";

import "./styles/main.scss";
import { Slider } from "./Components/Slider/Slider";

export const App: SFC<{}> = () => {
  const [ year, setYear ] = useState(2007);
  return(<div className="wrapper">
    <div className="content">
      <MainPage year={year} />
    </div>
    <Slider value={year} onChange={(ev) => setYear(ev.target.value)} />
  </div>);
};

render(<App/>, document.getElementById("app"));
