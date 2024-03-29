# MMM-mvgmunich [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/wiesty/MMM-MVGWiesty/raw/master/LICENSE)
MagicMirror² Module to display public transport from Munich  in Germany.


# NEW VERSION: [MMM-MVVWiesty](https://github.com/wiesty/MMM-MVVWiesty)
## Important Note: 
The previous API used in this project has been deprecated and is no longer available. As a result, we have migrated to the new "mvv-muenchen" API to ensure continued support and improved performance.




# (OLD) Project info:

![example view](https://i.imgur.com/p5oYKuf.jpg)

![Wiesty MVG Api Helper](https://i.imgur.com/fpXC1Bd.png)

## Dependencies
* instance of [MagicMirror²](https://github.com/MichMich/MagicMirror)
* Node Fetch (linux: npm install node-fetch)

## Installation
1. Clone this repository in your MagicMirror installation into the folder modules.
```git clone https://github.com/wiesty/MMM-MVGWiesty.git```
2. Install dependencies in main MagicMirror folder
3. Head over to [Wiesty's MVG Api Helper](https://wiesty.de/mvghelper/) (Its a basic html tool to get the station id for the config.)
4. Add configuration to your config.js

## Config


```
		{
			module: "MMM-MVGWiesty",
			position: "bottom_left",
			config: {
			  updateInterval: 60 * 5000,          // evey 5 min
			  maxEntries: 7,                     // 7 items on screen
			  station: "de:09162:6",          // the ID from your station you want to display
			  footway: 0,                       // add minutes for footway
			  productfilters: "ALL",            // Filters [ALL (for all), UBAHN, BUS, SBAHN, TRAM, BAHN, REGIONAL_BUS, RUFTAXI]
			  lines: "ALL",                     //Filter for lines (ALL (for all) S7, 13, 180, U7, U3)
			  destinations: "ALL"               //Filter for destinations (ALL (for all) Flughafen München, Freising)
			}
 		},
```

Note:
❌ If the line is canceled, the emoji will be displayed. (See the example picture)

**Filters**: Filters are comma-seperated. 
