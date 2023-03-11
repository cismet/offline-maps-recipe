import MapLibreLayer from "react-cismap/vector/MapLibreLayer";
import { Map } from "react-leaflet";
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
    </Map>
  );
}
