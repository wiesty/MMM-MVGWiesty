Module.register("MMM-MVGWiesty", {
    // Default module config.
    defaults: {
      updateInterval: 60 * 5000,
      maxEntries: 7,
      footway: 0,
      station: "de:09162:6",
      productfilters: "ALL",
      lines: "ALL"
    },

  
    getStyles: function () {
      return ["MMM-MVGWiesty.css"];
    },
  
    start: function () {
      Log.info("Starting module: " + this.name);
      this.loaded = true;
      this.departures = [];
    },
  
    // Override dom generator.
    getDom: function () {
        var wrapper = document.createElement("div");
    
        if (!this.loaded) {
            wrapper.innerHTML = this.translate("MVG Wiesty LOADING");
            wrapper.className = "dimmed light small";
            return wrapper;
        }
    
        wrapper.innerHTML = this.translate("MVG Wiesty LOADING");
        const url = 'https://www.mvg.de/api/fahrinfo/departure/' + this.config.station + '?footway=' + this.config.footway;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const departures = data.departures
                    .filter(departure => {
                        const productfilters = this.config.productfilters.split(',').map(filter => filter.trim());
                        const lines = this.config.lines.split(',').map(line => line.trim());
                        if (productfilters[0] === "ALL" || productfilters.includes(departure.product)) {
                            if (lines[0] === "ALL" || lines.includes(departure.label)) {
                                return true;
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
                        if (product === "BUS" || product === "TRAM") {
                            return `${time} - ${product} ${label} - ${destination} ${cancelledEmoji}</br>`;
                        } else {
                            return `${time} - ${label} - ${destination} ${cancelledEmoji}</br>`;
                        }
                    })
                    .join('');
                wrapper.innerHTML = departures;
            })
            .catch(error => console.log(error));
    
        wrapper.className = "dimmed light small";
        return wrapper;
    },
    
    
  
  });
  