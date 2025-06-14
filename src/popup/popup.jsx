import React, { useEffect, useState } from "react";
import Simple2DGraph from "../components/2d-graph"; 
import './popup.css';

const Popup = () => {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [currentNodeId, setCurrentNodeId] = useState(null);

  useEffect(() => {
    // First, get the current window
    chrome.windows.getCurrent({ populate: false }, (win) => {
      const windowId = win.id;

      // Now fetch the stored data for this window from chrome.storage
      chrome.storage.local.get("windows", (result) => {
        const windowData = result.windows?.[windowId];
        if (windowData && windowData.graph) {
          setGraphData(windowData.graph);
          if (windowData.curr?.id) {
            setCurrentNodeId(windowData.curr.id);
          }
        } else {
          console.warn(`No graph data found for window ${windowId}`);
        }
      });
    });
  }, []);

  const openGraphInNewTab = () => {
    chrome.tabs.create({ url: chrome.runtime.getURL("fullpage.html") });
  };

  return (
    <div id="main">
      <h1 style={{ margin: "5px 0" }}>Browsing Graph</h1>
      <div style={{ flex: 1, width: "100%" }}>
        <Simple2DGraph
          graphData={graphData}
          currentNodeId={currentNodeId}
          width={480}
          height={400}
        />
      </div>
      <div id="buttondiv">
        <button onClick={openGraphInNewTab}>Open Graph</button>
      </div>
    </div>
  );
};

export default Popup;
