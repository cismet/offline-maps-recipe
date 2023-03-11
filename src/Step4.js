import { useEffect } from "react";
import { loadAndCacheOfflineMapData } from "react-cismap/tools/offlineMapsHelper";
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

import Dexie from "dexie";

const DBVERSION = 1;
const DBNAME = "cismap-offline-data";
const OBJECTSTORE = "cismap-offline-data-cache";
const db = new Dexie(DBNAME);

const storeDef = {};
storeDef[OBJECTSTORE] = "key";

db.version(DBVERSION).stores(storeDef);

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

export default function Step4() {
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
      let url = params.url.replace("indexedDB://", "");
      console.log("indexeddb protocol interception", url);
      //Just do the tiles for now (starting with "https://omt.map-hosting.de/data/v3/")
      if (url.startsWith("https://omt.map-hosting.de/data/v3/")) {
        const dbKey = url.replace(
          "https://omt.map-hosting.de/data/v3/",
          "tiles/"
        );
        // local anonymous async block ---
        (async () => {
          const hit = await db[OBJECTSTORE].get(dbKey);
          if (hit) {
            callback(null, hit.value.buffer, null, null);
          }
        })();
        // -------------------------------
      } else {
        fetchOnline(url, callback);
      }
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
          title="Intercepting Traffic and get Tiles from IndexedDB"
          hoverable
          style={{ width: "440px", margin: 20 }}
          actions={[
            <a href={process.env.PUBLIC_URL + "/#/step3"}>
              <FontAwesomeIcon icon={faArrowAltCircleLeft} />
            </a>,
            <a href={process.env.PUBLIC_URL + "/#/step5"}>
              <FontAwesomeIcon icon={faArrowAltCircleRight} />
            </a>,
          ]}
        >
          <ul>
            <li>
              Open network tab and filter for <code>omt.map-hosting.de</code>{" "}
              (The pbf's that you see are Font pbf's)
            </li>
            <li>
              zoom out to see that there are no tiles outside Wuppertal
              available
            </li>
          </ul>
        </Card>
      </Control>
    </Map>
  );
}
