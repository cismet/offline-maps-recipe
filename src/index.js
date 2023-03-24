import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "leaflet/dist/leaflet.css";

import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";

import reportWebVitals from "./reportWebVitals";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import Step0 from "./Step0";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Slides from "./slides/Slides";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import Step7 from "./Step7";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <div className="App">
        <a
          target="_blank"
          rel="noreferrer"
          class="github-fork-ribbon right-top fixed"
          href="https://cismet.de/en/index.html#jobs"
          data-ribbon="🦸🏻‍♀️  We are hiring  🦸🏾‍♂️"
          title="We are hiring"
        >
          We are hiring
        </a>
        <span
          style={{
            position: "absolute",
            bottom: "20px",
            left: "10px",
            zIndex: 500,
          }}
        >
          <b>
            made with ❤️ by{" "}
            <a href="https://cismet.de/en/index.html">cismet.de</a>
          </b>
        </span>
        <Routes>
          <Route path="/" element={<Step0 />}></Route>
          <Route path="/step0" element={<Step0 />}></Route>
          <Route path="/step1" element={<Step1 />}></Route>
          <Route path="/step2" element={<Step2 />}></Route>
          <Route path="/step3" element={<Step3 />}></Route>
          <Route path="/step4" element={<Step4 />}></Route>
          <Route path="/step5" element={<Step5 />}></Route>
          <Route path="/step6" element={<Step6 />}></Route>
          <Route path="/step7" element={<Step7 />}></Route>
          <Route path="/slides" element={<Slides />}></Route>
        </Routes>
      </div>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
