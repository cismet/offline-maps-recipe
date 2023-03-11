import MapLibreLayer from "react-cismap/vector/MapLibreLayer";
import { Map } from "react-leaflet";
import vectorStyle from "./style";
const mapStyle = {
  height: "100vh",
  cursor: "pointer",
};
export default function Step2() {
  const position = [51.2720151, 7.2000203134];

  // const layerConf = { ...vectorStyle };
  // layerConf.glyphs = "indexedDB://" + layerConf.glyphs;
  // layerConf.sources.openmaptiles.tiles[0] =
  //   "indexedDB://" + layerConf.sources.openmaptiles.tiles[0];

  return (
    <Map style={mapStyle} center={position} zoom={18} maxZoom={25}>
      <MapLibreLayer style={vectorStyle} />
    </Map>
  );
}
