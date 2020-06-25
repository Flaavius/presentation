import React, { SFC, useState } from "react";
import { render } from "react-dom";

import { MainPage } from "./Containers/MainPage/MainPage";
import { DuCard } from "./Components/DuCard/DuCard";

import { dus } from "./data/dus";

import "./styles/main.scss";
import { Slider } from "./Components/Slider/Slider";

export const App: SFC<{}> = () => {
  const [ du, setFocusedDu ] = useState({ lat: 0, lng: 0 });
  const [ duData, setDuData ] = useState({});
  const [ isOpened, setOpenedCard ] = useState(false);
  return(<div className="wrapper">
    <div className="content">
      <MainPage isOpened={isOpened} du={du} />
    </div>
    <Slider
      onClick={(data) => {
        setOpenedCard(true);
        setDuData(data);
      }}
      onHover={({ lat, lng }) => !isOpened && setFocusedDu({ lat, lng })}
      dus={dus}
    />
    {isOpened ?
    (<DuCard onClose={() => setOpenedCard(false)} data={duData} />) : null}
  </div>);
};

render(<App/>, document.getElementById("app"));
