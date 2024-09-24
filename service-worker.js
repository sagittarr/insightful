/*global chrome*/
const MSN_ORIGIN = 'https://www.msn.com';
const MSN_ORIGIN_CN = 'https://www.msn.cn';
// write a function that check if the url match the pattern of https://www.msn.com/{xx-xx}/money{any}, where xx-xx is any string like en-us, en-ca, etc. any is any string
function isMoneyPage(urlObj) {
    return urlObj.origin === MSN_ORIGIN || urlObj.origin === MSN_ORIGIN_CN;
}


// Allows users to open the side panel by clicking on the action toolbar icon
chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error));


chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
    if (!tab.url) return;
    const url = new URL(tab.url);
    // Enables the side panel on google.com
    if (isMoneyPage(url)) {
        await chrome.sidePanel.setOptions({
            tabId,
            path: 'index.html',
            enabled: true
        });
    } else {
        // Disables the side panel on all other sites
        await chrome.sidePanel.setOptions({
            tabId,
            enabled: false
        });
    }
});