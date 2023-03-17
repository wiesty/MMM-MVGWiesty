Module.register("MMM-MVGWiesty", {
    // Default module config.
    defaults: {
      updateInterval: 60 * 5000,
      maxEntries: 7,
      footway: 0,
      station: "de:09162:6",
      productfilters: "ALL",
      lines: "ALL",
      destinations: "ALL"
    },

    

    getStyles: function () {
      return ["MMM-MVGWiesty.css"];
    },
  
    start: function () {
      Log.info("Starting module: " + this.name);
      this.loaded = true;
      this.departures = [];
      
    },
  
    getDom: function () {
        var wrapper = document.createElement("div");
        
        if (!this.loaded) {
            wrapper.innerHTML = this.translate("MVG Wiesty Fetching data");
            wrapper.className = "dimmed light small";
            return wrapper;
        }

        const fetchData = () => {
            const url = 'https://www.mvg.de/api/fahrinfo/departure/' + this.config.station + '?footway=' + this.config.footway;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    const departures = data.departures
                        .filter(departure => {
                            const productfilters = this.config.productfilters.split(',').map(filter => filter.trim());
                            const lines = this.config.lines.split(',').map(line => line.trim());
                            const destinations = this.config.destinations.split(',').map(destination => destination.trim());
                            if (productfilters[0] === "ALL" || productfilters.includes(departure.product)) {
                                if (lines[0] === "ALL" || lines.includes(departure.label)) {
                                    if (destinations[0] === "ALL" || destinations.includes(departure.destination)) {
                                        return true;
                                    }
                                }
                            }
                        return false;
                        })
                        .filter(departure => !departure.cancelled)
                        .slice(0, this.config.maxEntries)
                        .map(departure => {
                            const time = new Date(departure.departureTime).toLocaleTimeString('de-DE', {hour: '2-digit', minute: '2-digit'});
                            const label = departure.label;
                            const product = departure.product;
                            const destination = departure.destination;
                            const isCancelled = departure.cancelled;
                            const cancelledEmoji = isCancelled ? '❌' : '';
                            if (product === "BUS" || product === "REGIONAL_BUS") {
                                return `<strong>${time}</strong> &nbsp;&nbsp; <img class="productsvg" src="modules/MMM-MVGWiesty/assets/bus.svg"> ${label} - ${destination} ${cancelledEmoji}</br>`;
                            } 
                            else if (product === "TRAM") {
                                return `<strong>${time} </strong>&nbsp;&nbsp; <img class="productsvg" src="modules/MMM-MVGWiesty/assets/tram.svg"> ${label} - ${destination} ${cancelledEmoji}</br>`;
                            }
                            else if (product === "RUFTAXI") {
                                return `<strong>${time} </strong>&nbsp;&nbsp; <img class="productsvg" src="modules/MMM-MVGWiesty/assets/ruftaxi.svg"> ${label} - ${destination} ${cancelledEmoji}</br>`;
                            }
                            else if (product === "UBAHN"){
                                return `<strong>${time}</strong> &nbsp;&nbsp; <img class="productsvg" src="modules/MMM-MVGWiesty/assets/ubahn.svg"> ${label} - ${destination} ${cancelledEmoji}</br>`;
                            }
                            else if (product === "SBAHN"){
                                return `<strong>${time}</strong> &nbsp;&nbsp; <img class="productsvg" src="modules/MMM-MVGWiesty/assets/sbahn.svg"> ${label} - ${destination} ${cancelledEmoji}</br>`;
                            }
                            else if (product === "BAHN"){
                                return `<strong>${time}</strong> &nbsp;&nbsp; <img class="productsvg" src="modules/MMM-MVGWiesty/assets/regio.svg"> ${label} - ${destination} ${cancelledEmoji}</br>`;
                            }
                            else {
                                return `<strong>${time}</strong> &nbsp;&nbsp; ${label} - ${destination} ${cancelledEmoji}</br>`;
                            }
                        })
                        .join('');
                    const departuresDiv = document.createElement("div");
                    departuresDiv.innerHTML = departures;
                    while (departuresDiv.firstChild) {
                    wrapper.appendChild(departuresDiv.firstChild);
                    }

                    if (departures <= 0){
                        wrapper.innerHTML = "MVG Wiesty </br>No data found :( </br> Check your config!"
                    }
                })
                .catch(error => wrapper.innerHTML = "No data by MVG. Check the station id." + console.log(error));
        }
        fetchData();

        setInterval(function () {
            fetchData();
        }, this.config.updateInterval); 

        wrapper.className = "dimmed light small";
        return wrapper;
    },
    
    
  
  });
  