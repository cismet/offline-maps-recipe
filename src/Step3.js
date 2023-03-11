import { useEffect } from "react";
import { loadAndCacheOfflineMapData } from "react-cismap/tools/offlineMapsHelper";
import MapLibreLayer from "react-cismap/vector/MapLibreLayer";
import { Map } from "react-leaflet";
import vectorStyle from "./style";
import maplibreGl from "maplibre-gl";

const mapStyle = {
  height: "100vh",
  cursor: "pointer",
};

const offlineConfig = {
  dataStores: [
    {
      name: "Vektorkarte für Wuppertal",
      key: "wuppBasemap",
      url: "https://offline-data.cismet.de/offline-data/wupp.zip",
    },
  ],
  consoleDebug: true,
};

// type ResponseCallback<T> = (
//   error?: Error | null,
//   data?: T | null,
//   cacheControl?: string | null,
//   expires?: string | null
// ) => void;

export default function Step3() {
  const position = [51.2720151, 7.2000203134];

  useEffect(() => {
    loadAndCacheOfflineMapData(offlineConfig, (key, info) => {
      console.log("loadAndCacheOfflineMapData", key, info);
    });
    const fetchOnline = (url, callback) => {
      fetch(url)
        .then((res) => res.arrayBuffer())
        .then((buf) => {
          console.log("fetched arrayBuffer", buf);
          callback(null, buf, null, null);
        });
    };
    maplibreGl.addProtocol("indexedDB", (params, callback) => {
      console.log("indexeddb protocol interception", params.url);
      let url = params.url.replace("indexedDB://", "");
      fetchOnline(url, callback);
    });
  });
  const layerConf = JSON.parse(JSON.stringify(vectorStyle));
  layerConf.glyphs = "indexedDB://" + layerConf.glyphs;
  layerConf.sources.openmaptiles.tiles[0] =
    "indexedDB://" + layerConf.sources.openmaptiles.tiles[0];
  console.log("layerConf", layerConf);

  return (
    <Map style={mapStyle} center={position} zoom={18} maxZoom={25}>
      <MapLibreLayer style={layerConf} />
    </Map>
  );
}
