// FIREFOX VERSION

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Message received:", request);
  sendResponse({ status: "Message processed successfully" });
});

browser.browserAction.onClicked.addListener(tab => { 
  console.log("Extension icon clicked");
  browser.scripting.executeScript(
      {
          target: { tabId: tab.id },
          func: () => {
              console.log("Script executed in the active tab.");
          }
      },
      () => {
          console.log("Execution completed.");
      }
  );
});


