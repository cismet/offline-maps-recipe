import { useEffect } from "react";
import {
  customOfflineFetch,
  loadAndCacheOfflineMapData,
} from "react-cismap/tools/offlineMapsHelper";
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
  rules: [
    {
      origin: "https://omt.map-hosting.de/fonts/Klokantech Noto",
      cachePath: "fonts/Open",
      realServerFallback: true,
    },
    {
      origin: "https://omt.map-hosting.de/fonts",
      cachePath: "fonts",
      realServerFallback: true,
    },
    {
      origin: "https://omt.map-hosting.de/styles",
      cachePath: "styles",
      realServerFallback: true,
    },
    {
      origin: "https://omt.map-hosting.de/data/v3.json",
      cachePath: "v3.json",
      realServerFallback: true,
    },
    {
      origin: "https://omt.map-hosting.de/data/v3",
      cachePath: "tiles",
      realServerFallback: true,
    },
  ],
};

// type ResponseCallback<T> = (
//   error?: Error | null,
//   data?: T | null,
//   cacheControl?: string | null,
//   expires?: string | null
// ) => void;

export default function Step7() {
  const position = [51.2720151, 7.2000203134];

  useEffect(() => {
    loadAndCacheOfflineMapData(offlineConfig, (key, info) => {
      console.log("loadAndCacheOfflineMapData", key, info);
    });

    maplibreGl.addProtocol("indexedDB", (params, callback) => {
      let url = params.url.replace("indexedDB://", "");
      console.log("indexeddb protocol interception", url);
      customOfflineFetch(url, offlineConfig).then((buffer) => {
        if (buffer) {
          callback(null, buffer, null, null);
        } else {
          callback(null, new ArrayBuffer(), null, null);
        }
      });
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
      <Control position="bottomright">
        <Card
          size="small"
          title="Intercepting Traffic and get Everything from IndexedDB "
          hoverable
          style={{ width: "440px", margin: 20 }}
          actions={[
            <a href={process.env.PUBLIC_URL + "/#/step6"}>
              <FontAwesomeIcon icon={faArrowAltCircleLeft} />
            </a>,
            <a href={process.env.PUBLIC_URL + "/#/step7"}>
              <FontAwesomeIcon icon={faArrowAltCircleRight} />
            </a>,
          ]}
        >
          <ul>
            <li>
              Open network tab and filter for <code>omt.map-hosting.de</code>
            </li>
            <li>
              Using <code>customOfflineFetch</code> with a ruleset in offline
              config
            </li>
            <li>online fallback switched on again</li>
          </ul>
        </Card>
      </Control>
    </Map>
  );
}
