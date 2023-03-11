import MapLibreLayer from "react-cismap/vector/MapLibreLayer";
import { Map } from "react-leaflet";
import { Card } from "antd";
import Control from "react-leaflet-control";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
} from "@fortawesome/free-solid-svg-icons";
const mapStyle = {
  height: "100vh",
  cursor: "pointer",
};
export default function Step0() {
  const position = [51.2720151, 7.2000203134];
  return (
    <Map style={mapStyle} center={position} zoom={18} maxZoom={25}>
      <MapLibreLayer style="https://omt.map-hosting.de/styles/klokantech-basic/style.json" />
      {/* alternative style (with sprites) */}
      {/* <MapLibreLayer style="https://omt.map-hosting.de/styles/cismet-basic/style.json" /> */}

      <Control position="bottomright">
        <Card
          size="small"
          title="Simple MapLibreLayer"
          hoverable
          style={{ width: "440px", margin: 20 }}
          actions={[
            <a href={process.env.PUBLIC_URL + "/#/step0"}>
              <FontAwesomeIcon icon={faArrowAltCircleLeft} />
            </a>,
            <a href={process.env.PUBLIC_URL + "/#/step1"}>
              <FontAwesomeIcon icon={faArrowAltCircleRight} />
            </a>,
          ]}
        >
          <p>
            Open network tab and filter for <code>omt.map-hosting.de</code>
          </p>
        </Card>
      </Control>
    </Map>
  );
}
