import MapLibreLayer from "react-cismap/vector/MapLibreLayer";
import { Map } from "react-leaflet";
import { Card } from "antd";
import Control from "react-leaflet-control";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
} from "@fortawesome/free-solid-svg-icons";

import vectorStyle from "./style";
const mapStyle = {
  height: "100vh",
  cursor: "pointer",
};
export default function Step1() {
  const position = [51.2720151, 7.2000203134];

  const layerConf = JSON.parse(JSON.stringify(vectorStyle));
  console.log("layerConf", layerConf);

  layerConf.layers[12].paint = {
    ...layerConf.layers[12].paint,
    "fill-color": "rgba(222, 211, 0, 1)",
  };
  console.log("layerConf", layerConf);
  return (
    <Map style={mapStyle} center={position} zoom={18} maxZoom={25}>
      <MapLibreLayer style={layerConf} />
      <Control position="bottomright">
        <Card
          size="small"
          title="Simple MapLibreLayer with a vectorStyle-Object."
          hoverable
          style={{ width: "440px", margin: 20 }}
          actions={[
            <a href={process.env.PUBLIC_URL + "/#/step0"}>
              <FontAwesomeIcon icon={faArrowAltCircleLeft} />
            </a>,
            <a href={process.env.PUBLIC_URL + "/#/step2"}>
              <FontAwesomeIcon icon={faArrowAltCircleRight} />
            </a>,
          ]}
        >
          <p>
            ... and manipulated building colors.<br></br>
            <br></br>
            Open network tab and filter for <code>omt.map-hosting.de</code>: no{" "}
            <code>style.json</code> and <code>v3.json</code> is loaded anymore.
          </p>
        </Card>
      </Control>
    </Map>
  );
}
