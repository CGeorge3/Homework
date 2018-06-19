// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
var boundariesUrl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json";

// Perform a GET request to the query URL
d3.json(queryUrl, function (data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {
  console.log(earthquakeData);

  function onEachFeature(feature, layer) {

    return L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
      fillOpacity: 0.75,
      color: "white",
      fillColor: getColor(feature.properties.mag),
      // Setting our circle's radius equal to the output of our markerSize function
      // This will make our marker's size proportionate to its population
      radius: feature.properties.mag * 5
    }).bindPopup("<b>Magnitude:</b> " + feature.properties.mag +
      "<br><b>Location:</b> " + feature.properties.place +
      "<br><b>Date:</b> " + new Date(feature.properties.time) +
      "<br><a href='" + feature.properties.url + "'>More info</a>");
  }
  var earthquakes = L.geoJson(earthquakeData, {
    pointToLayer: onEachFeature
  });

  createMap(earthquakes);
}

function getColor(mag) {
  if (mag >= 6.0) {
    return "rgb(75,0,130)"
    // dark violet
  }
  if (mag >= 5.0) {
    return "rgb(199,21,133)"
    // medium violet red
  }
  if (mag >= 4.0) {
    return "rgb(219,112,147)"
    // pale violet red
  }
  else if (mag >= 3.0) {
    return "rgb(255,182,193)"
// light pink
  } else if (mag >= 2.0) {
    return "rgb(255,228,196)"
// bisque
  } else {
    return "#ff0000"
  }

}
function createMap(earthquakes) {

  // Define variables for our base layers
  let mapboxUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}';
  let accessToken = 'pk.eyJ1IjoicmluY2tkIiwiYSI6ImNpamc3ODR1aDAxMmx0c2x0Zm9lc3E1OTAifQ.pIkP7PdJMrR5TBIp93Dlbg';
  let streetMap = L.tileLayer(mapboxUrl, { id: 'mapbox.light', maxZoom: 20, accessToken: accessToken });
  let darkMap = L.tileLayer(mapboxUrl, { id: 'mapbox.dark', maxZoom: 20, accessToken: accessToken });
  let satellite = L.tileLayer(mapboxUrl, { id: 'mapbox.satellite', maxZoom: 20, accessToken: accessToken });

  d3.json(boundariesUrl, function (error, lines) {

    faultLines = L.geoJson(lines, {
      style: function (feature) {
        return {
          color: "blue",
          fillOpacity: 0,
          weight: 1.5
        };
      },
    })
    var baseMaps = {
      "Street Map": streetMap,
      "Dark Map": darkMap,
      "Satellite": satellite
    };

    var overlayMaps = {
      "Earthquakes": earthquakes,
      "Fault Lines": faultLines

    };

    // Create our map, giving it the streetmap and earthquakes layers to display on load
    var myMap = L.map("map", {
      center: [
        37.09, -95.71
      ],
      zoom: 5,
      layers: [streetMap, faultLines, earthquakes]
    });

    var legend = L.control({ position: 'bottomright' });
    legend.onAdd = function (myMap) {
      var div = L.DomUtil.create('div', 'info legend');
      grades = [0, 1, 2, 3, 4, 5, 6];
      // colors = [getColor(1), getColor(2), getColor(3), getColor(4), getColor(5), getColor(6)];
      labels = [];
      for (var i = 1; i < grades.length; i++) {
        div.innerHTML +=
          '<p><i style="background:' + getColor(grades[i]) + '"></i> ' +
          grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '</p>' : '+ </p>');
      }

      return div;
    };
    legend.addTo(myMap);

    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false,

    }).addTo(myMap);

  })
}