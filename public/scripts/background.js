//The background javascript file is nto monitor any actions done live.
//In this instance, this file will allow the plugin to pop up everytime a user goes to the common application.

chrome.webNavigation.onHistoryStateUpdated.addListener(
    async () => {
      await chrome.action.openPopup();
    },
    { url: [
      { urlMatches: 'https://apply.commonapp.org/common/*' },
    ] },
);