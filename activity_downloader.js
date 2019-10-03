function grd_downloadActivity() {
    return new Promise( function(resolve, reject) {
        topLevelResolve = resolve;
        topLevelReject = reject;

        urlCheck = window.location.href.match(/^https:\/\/connect\.garmin\.com\/modern\/activity\/([0-9]*)$/);
        if(!urlCheck) {
            topLevelReject(new Error("This only works on activity detail page!\nThe URL must be in the form https://connect.garmin.com/modern/activity/{activityNumber}"));
        }

        activityNumber = urlCheck.pop();

        activityData = {};
        
        downloadFailed = false;
        function failedToGetActivityData(error) {
            if (!downloadFailed) {
                downloadFailed = true;
                topLevelReject(error);
            }
        }

        function processDownloadedData(field, value) {
            activityData[field] = value;
            if (    (!downloadFailed)
                 && ("metadata" in activityData)
                 && ("splits"   in activityData)
                 && ("details"  in activityData) ) {
                topLevelResolve(activityData);
            }
        }

        fetch(
            'https://connect.garmin.com/modern/proxy/activity-service/activity/'+activityNumber
        ).then(
            metadataResponse => metadataResponse.json(),
            failedToGetActivityData
        ).then(
            parsedMetadata => processDownloadedData("metadata", parsedMetadata),
            failedToGetActivityData
        ).catch(
            failedToGetActivityData
        )

        fetch(
            'https://connect.garmin.com/modern/proxy/activity-service/activity/'+activityNumber+'/splits'
        ).then(
            splitsResponse => splitsResponse.json(),
            failedToGetActivityData
        ).then(
            parsedSplits => processDownloadedData("splits", parsedSplits),
            failedToGetActivityData
        ).catch(
            failedToGetActivityData
        )
        
        fetch(
            'https://connect.garmin.com/modern/proxy/activity-service/activity/'+activityNumber+'/details'
        ).then(
            detailsResponse => detailsResponse.json(),
            failedToGetActivityData
        ).then(
            parsedDetails => processDownloadedData("details", parsedDetails),
            failedToGetActivityData
        ).catch(
            failedToGetActivityData
        )
    })
}

function grd_downloadAndSaveActivity() {
    grd_downloadActivity().then(
        activityData => {
            activityDataJson = JSON.stringify( activityData );
            activityDataUrl = "data:application/json;base64,"+btoa(activityDataJson);

            startTime = activityData.metadata.summaryDTO.startTimeLocal.split('T')[0]
            activityName = activityData.metadata.activityName.replace(/ /g,'_');
            activityFileName = startTime+'.'+activityName+'.json';

            activityLink = document.createElement("a");
            activityLink.download = activityFileName;
            activityLink.href = activityDataUrl;
            document.body.appendChild(activityLink);
            activityLink.click();
            document.body.removeChild(activityLink);
            delete activityLink;
        },
        error => window.alert(error)
    ).catch(
        error => window.alert(error)
    )
}

grd_downloadAndSaveActivity();

