import React, { useEffect, useState } from "react";
import ForceGraph2D from "react-force-graph-2d";

const App = () => {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });

  useEffect(() => {
    // Directly access chrome.storage.local in Vite (React)
    chrome.storage.local.get("graph", (result) => {
      if (result.graph) {
        setGraphData(result.graph);
      }
    });
  }, []);

  const openGraphInNewTab = () => {
    chrome.tabs.create({ url: "fullpage.html" });
  };

  return (
    <div
      style={{
        width: "500px",
        height: "500px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#1f1d2e",
        color: "white",
        padding: "10px",
        boxSizing: "border-box",
      }}
    >
      <h1 style={{ margin: "5px 0" }}>Browsing Graph</h1>
      <div style={{ flex: 1, width: "100%" }}>
        <ForceGraph2D
          graphData={graphData}
          height={400}
          width={480}
          backgroundColor="#1f1d2e"
          nodeAutoColorBy="id"
          linkColor={() => "pink"}
          linkDirectionalArrowColor={() => "pink"}
          linkDirectionalArrowLength={5}
          linkDirectionalArrowRelPos={1}
        />
      </div>
      <button
        style={{
          display: "block",
          marginTop: "10px",
          padding: "8px 15px",
          backgroundColor: "#ff4081",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={openGraphInNewTab}
      >
        Open Graph
      </button>
    </div>
  );
};

export default App;
