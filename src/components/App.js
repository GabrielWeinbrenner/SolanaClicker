import React from "react";

import { Buildings } from "./Buildings";
import { Resources } from "./Resources";
import { Clicker } from "./Clicker";

import "../index.css";

export default function App() {
  return (
    <>
      <div className="App">
        <div style={{ textAlign: "center" }}>
          <Resources />
          <Clicker />
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ flex: "1" }}>
            <Buildings />
          </div>
        </div>
      </div>
    </>
  );
}
