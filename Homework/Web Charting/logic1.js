// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
var boundariesUrl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json";

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {
  console.log(earthquakeData);
  
  function onEachFeature(feature, layer) {
    
      return L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
        fillOpacity: 0.75,
        color: "white",
        fillColor: style(feature.properties.mag),
        // Setting our circle's radius equal to the output of our markerSize function
        // This will make our marker's size proportionate to its population
        radius: feature.properties.mag * 6
      }).bindPopup( "<b>Magnitude:</b> " + feature.properties.mag +
    "<br><b>Location:</b> " + feature.properties.place +
    "<br><b>Date:</b> " + new Date(feature.properties.time) + 
    "<br><a href='" + feature.properties.url + "'>More info</a>");
}
 var earthquakes = L.geoJson(earthquakeData, {
    pointToLayer: onEachFeature
 });

 createMap(earthquakes);
}

function style(mag) {
  if (mag >= 5.0) {
    return "rgb(58, 23, 114)"
  }
  if (mag >= 4.0) {
    return  "rgb(20, 67, 90)"
  }
  else if (mag >= 3.0) {
    return  "rgb(71, 127, 167)"

  } else if (mag >= 2.0) {
    return "rgb(96, 81, 165)"
  
} else {
    return "rgb(213, 127, 230)"
    }
 
  }
function createMap(earthquakes) {

  // Define variables for our base layers
  let mapboxUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}';
  let accessToken = 'pk.eyJ1IjoicmluY2tkIiwiYSI6ImNpamc3ODR1aDAxMmx0c2x0Zm9lc3E1OTAifQ.pIkP7PdJMrR5TBIp93Dlbg';
  let streetMap = L.tileLayer(mapboxUrl, {id: 'mapbox.light', maxZoom: 20, accessToken: accessToken});
  let darkMap = L.tileLayer(mapboxUrl, {id: 'mapbox.dark', maxZoom: 20, accessToken: accessToken});
  let satellite = L.tileLayer(mapboxUrl, {id: 'mapbox.satellite', maxZoom: 20, accessToken: accessToken});
     
  d3.json(boundariesUrl, function(error, lines) {

    faultLines = L.geoJson(lines, {
        style: function(feature) {
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
  //  myMap.legendControl.addLegend(document.getElementById('legend').innerHTML);
  var legend = L.control({position: 'bottomright'});

  legend.onAdd = function (map) {
  
      var div = L.DomUtil.create('div', 'info legend'),
          grades = [5, 4, 3, 2],
          labels = [];
  
      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
              '<i style="background:' + style(grades[i] + 1) + '"></i> ' +
              grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      }
  
      return div;
  };
  
  legend.addTo(myMap);
  // L.timeDimension.layer.geoJson(layer).addTo(map);
  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false,
    
  }).addTo(myMap);
  
  })}