import React, { useEffect, useState, useRef } from "react";
import ForceGraph2D from 'react-force-graph-2d';

const App = () => {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const fgRef = useRef();

  useEffect(() => {
    if (chrome.runtime?.sendMessage) {
      chrome.runtime.sendMessage({ type: "GET_GRAPH" }, (response) => {
        if (response) {
          setGraphData(response);
        }
      });
    }
  }, []); 

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <h1>Browsing Graph</h1>
      <ForceGraph2D
        ref={fgRef}
        backgroundColor="#1f1d2e"
        graphData={graphData}
        width={400}
        height={400}
        nodeAutoColorBy="id"
        linkColor={() => "pink"}
        linkDirectionalArrowColor={() => "pink"}
        linkDirectionalArrowLength={5}
        linkDirectionalArrowRelPos={1}
        nodeLabel={(node) => node.name}
        nodeCanvasObject={(node, ctx) => {
          let label = node.name;
          if (node.label != "3141_temp_label") label = node.label;
          const fontSize = 8;
          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.fillStyle = "white";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(label, node.x, node.y + 10);
        }}
      />
    </div>
  );
};

export default App;
