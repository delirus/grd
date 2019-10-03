This is a quick and dirty browser plugin to download raw run data
from Garmin Connect website in JSON format.

To install this browser add-on in Firefox (the only tested browser):
1. git clone this repo
1. open Firefox browser menu and choose "Add-ons"
1. open add-ons settings (small gear button) and choose "Debug add-ons"
1. click "Load temporary Add-on..." button
1. navigate to this repo and pick the manifest file

In order to use it, you must
1. track your run and upload it to Garmin Connect
1. login to the Garmin Connect website and open the detail page of the run activity ("modern" website design)
1. click the button added to your browser by this add-on
1. pick the folder and file name and click "Save"

This will store the activity data (metadata, details and recorded metrics)
as a single JSON file.

Attached ipython notebook shows how to load and use files created by it.

