import React from "react";
import { Excalidraw } from "@excalidraw/excalidraw";
// import "excalidraw/dist/excalidraw.min.css";

const Whiteboard = () => {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Excalidraw />
    </div>
  );
};

export default Whiteboard;
