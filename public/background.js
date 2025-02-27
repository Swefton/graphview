const graphData = {
    nodes: [],
    links: [],
};

const tabHistory = {};

async function getPageTitle(tabId) {
    try {
        const [result] = await chrome.scripting.executeScript({
            target: { tabId },
            func: () => document.title,
        });

        return (result.result) || "3141_temp_label";
    } catch (error) {
        console.error(`Failed to get title for tab ${tabId}:`, error);
        return "3141_temp_label";
    }
}

async function updateNodeLabel(tabId, url) {
    const title = await getPageTitle(tabId);
    const nodeIndex = graphData.nodes.findIndex(node => node.id === url);

    if (nodeIndex !== -1 && graphData.nodes[nodeIndex].label === "3141_temp_label") {
        graphData.nodes[nodeIndex].label = title;
    }
    console.log(graphData.nodes);
}

// nodes created from new tabs should be tagged
/// curr nod should be tagged

// on url/tab change
// if new tab: create edge from curr node to node with new url
// if tab exists: create edge from curr node to node with new url

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url) {
        const currentUrl = changeInfo.url;

        if (!graphData.nodes.find(node => node.id === currentUrl)) {
            graphData.nodes.push({ id: currentUrl, name: currentUrl, label: "3141_temp_label" });
            updateNodeLabel(tabId, currentUrl);
        }

        if (tabHistory[tabId] && tabHistory[tabId] !== currentUrl) {
            graphData.links.push({
                source: tabHistory[tabId],
                target: currentUrl,
            });
        }

        tabHistory[tabId] = currentUrl;
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "GET_GRAPH") {
        sendResponse(graphData);
    }
});