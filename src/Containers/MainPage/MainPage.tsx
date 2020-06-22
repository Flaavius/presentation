import React, { Component } from "react";
import {
  Color,
  TextureLoader,
} from "three";
import TrackballControls from "three-trackballcontrols";
import Globe, { GlobeInstance } from "globe.gl";

import countriesURL from "../../assets/interest-countries.geojson";

import style from "./mainpage.scss";

import { data as StaticData } from "../../data";

export class MainPage extends Component<any, any> {

  node: HTMLDivElement | null;
  world: GlobeInstance | null;

  /**
   *
   */
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!this.node) return;

    const world = Globe({ animateIn: true })
    .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
    .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
    .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
    .showGraticules(true)
    .polygonCapColor(() => "#de411b")
    (this.node);

  // custom globe material
    const globeMaterial = world.globeMaterial();
    globeMaterial.bumpScale = 10;
    new TextureLoader().load('//unpkg.com/three-globe/example/img/earth-water.png', texture => {
    globeMaterial.specularMap = texture;
    globeMaterial.specular = new Color('grey');
    globeMaterial.shininess = 15;
  });

    setTimeout(() => { // wait for scene to be populated (asynchronously)
      const directionalLight = world.scene().children.find(obj3d => obj3d.type === 'DirectionalLight');
      directionalLight && directionalLight.position.set(5, 5, 1); // change light position to see the specularMap's effect
    });

    // world.controls().autoRotate = true;
    // world.controls().autoRotateSpeed = .4;
    world.pointOfView({ lat: 44.01767, lng: 22.9880, altitude: 2 }, 1500);

    this.world = world;

    (async () => {
      const data = await fetch(countriesURL);
      const { features } = await data.json();

      world
      .polygonsData(features)
      .polygonSideColor(() => "rgba(255,255,255, .4)")
      .polygonAltitude((p) => -.01)
      .polygonStrokeColor((p) => "#ffffff")
      .onPolygonClick((plg: any) => {
        console.log(plg);
        const countryCoord = plg.geometry.coordinates[0];
        console.log(countryCoord);
      });
    })();
  }

  componentWillReceiveProps({ year }) {
    this.world!.polygonAltitude((poly: any) => {
      const { postal } = poly.properties;
      const { employees } = StaticData[postal][year];
      return employees > 0 ? .01 : -.01;
    });
    // 22.98808475700008, 44.0176760870001
    this.world!.pointOfView({ lat: 44.01767, lng: 22.9880, altitude: 1.5 }, 1500);
  }

  render() {
    return (<div
      ref={(node) => this.node = node}
      id="globe"
      className={style["main-wrapper"]}
    />);
  }
}
