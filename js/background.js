chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    var config = JSON.parse(localStorage['config']);
    sendResponse(config);
  }
);
