import React, { Component } from "react";
import {
  Color,
  TextureLoader,
  Vector3,
  PerspectiveCamera,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import TrackballControls from "three-trackballcontrols";
import Globe, { GlobeInstance } from "globe.gl";

import countriesURL from "../../assets/interest-countries.geojson";

import style from "./mainpage.scss";

import { data as StaticData } from "../../data";

import { dus } from "../../data/dus";

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
    globeMaterial.bumpScale = 0;
    new TextureLoader().load('//unpkg.com/three-globe/example/img/earth-water.png', texture => {
    globeMaterial.specularMap = texture;
    globeMaterial.specular = new Color('blue');
    globeMaterial.shininess = 5;
  });

    world.pointOfView({ lat: 0, lng: 0, altitude: 5 }, 1500);

    this.createPoints(world, dus);
    this.world = world;

    (async () => {
      const data = await fetch(countriesURL);
      const { features } = await data.json();

      world
      .polygonsData(features)
      .polygonSideColor(() => "rgba(255,255,255, .4)")
      .polygonCapColor(() => "rgba(0,0,0,0)")
      .polygonAltitude((p) => .001)
      .polygonStrokeColor((p) => "#ffffff")
      .polygonLabel(({ properties: { name } }: any) => name)
      .onPolygonClick((plg: any) => {
        const countryCoord = plg.geometry.coordinates[0];
        this.fade(countryCoord);
      });
    })();
  }

  fade = (coords = [0, 0]) => {
    console.log("cleck");
    // this.world!.pointOfView({ lat: 44.0176, lng: 22.9880, altitude: 15 }, 1000);
    const camera = this.world?.camera() as PerspectiveCamera;
    camera.position.set(0, 2, 1000);
  }

  createPoints = (world, data) => {
    world!
      .pointsData(data)
      .pointAltitude(() => .001)
      .pointColor(() => "#de411b")
      .pointRadius(() => .1)
      .onPointClick(({ lat, lng }: any) => {
        world!.pointOfView({ lat, lng,  altitude: .5 }, 600);
      });
  }

  componentWillReceiveProps({ du, isOpened }) {
    // this.world!.polygonAltitude((poly: any) => {
    //   const { postal } = poly.properties;
    //   const { employees } = StaticData[postal][year];
    //   return employees > 0 ? employees / 100 : -.01;
    // });

    this.world?.pointOfView({ lat: du.lat, lng: du.lng, altitude: .5 }, 500);
  }

  render() {
    return (<div
      ref={(node) => this.node = node}
      id="globe"
      className={style["main-wrapper"]}
    />);
  }
}
