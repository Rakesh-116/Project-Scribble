import { useState, useRef } from "react";
import { Excalidraw, Footer } from "@excalidraw/excalidraw";

const Whiteboard = () => {
  const appRef = useRef(null);
  const [zenModeEnabled, setZenModeEnabled] = useState(false);
  const [gridModeEnabled, setGridModeEnabled] = useState(false);
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);

  return (
    <div className="App" ref={appRef}>
      <Excalidraw
        ref={(api) => setExcalidrawAPI(api)}
        zenModeEnabled={zenModeEnabled}
        gridModeEnabled={gridModeEnabled}
        name="Custom Drawing"
      >
        {excalidrawAPI && (
          <Footer>
            <div>Custom Footer</div>
          </Footer>
        )}
      </Excalidraw>
    </div>
  );
};

export default Whiteboard;
