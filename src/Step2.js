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
import { attribution } from "./Step0";
const mapStyle = {
  height: "100vh",
  cursor: "pointer",
};
export default function Step2() {
  const position = [51.2720151, 7.2000203134];

  const layerConf = JSON.parse(JSON.stringify(vectorStyle));
  layerConf.glyphs = "custom://" + layerConf.glyphs;
  layerConf.sources.openmaptiles.tiles[0] =
    "custom://" + layerConf.sources.openmaptiles.tiles[0];
  console.log("layerConf", layerConf);

  return (
    <Map style={mapStyle} center={position} zoom={18} maxZoom={25}>
      <MapLibreLayer style={layerConf} {...attribution} />
      <Control position="bottomright">
        <Card
          size="small"
          title="Adding a prefix in front of the urls"
          hoverable
          style={{ width: "440px", margin: 20 }}
          actions={[
            <a href={process.env.PUBLIC_URL + "/#/step1"}>
              <FontAwesomeIcon icon={faArrowAltCircleLeft} />
            </a>,
            <a href={process.env.PUBLIC_URL + "/#/step3"}>
              <FontAwesomeIcon icon={faArrowAltCircleRight} />
            </a>,
          ]}
        >
          <p>No Map is displayed. Watch the console for errors.</p>
        </Card>
      </Control>
    </Map>
  );
}
