function grd_downloadButtonClicked() {
    browser.tabs.executeScript(
        {file: "/activity_downloader.js"}
    ).then(
        success => console.log("Garmin run downloader run has finished."),
        error => console.log("Garmin run downloader has encountered an error!")
    )
}

browser.browserAction.onClicked.addListener( grd_downloadButtonClicked );

