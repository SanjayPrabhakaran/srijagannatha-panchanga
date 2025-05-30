/**
 * Calculates and displays the address details of 200 S Mathilda Ave, Sunnyvale, CA
 * based on a free-form text
 *
 *
 * A full list of available request parameters can be found in the Geocoder API documentation.
 * see: https://www.here.com/docs/bundle/geocoding-and-search-api-v7-api-reference/page/index.html#/paths/~1geocode/get
 *
 * @param   {H.service.Platform} platform    A stub class to access HERE services
 */

function geocode(platform) {
  var geocoder = platform.getSearchService(),
      geocodingParameters = {
        q: 'Chennai'//'200 S Mathilda Sunnyvale CA'
      };

  geocoder.geocode(
    geocodingParameters,
    onSuccess,
    onError
  );
}
/**
 * This function will be called once the Geocoder REST API provides a response
 * @param  {Object} result A JSON object representing the location(s) found.
 * See: https://www.here.com/docs/bundle/geocoding-and-search-api-v7-api-reference/page/index.html#/paths/~1geocode/get
 */
function onSuccess(result) {
  var locations = result.items;
 /*
  * The styling of the geocoding response on the map is entirely under the developer's control.
  * A representitive styling can be found the full JS + HTML code of this example
  * in the functions below:
  */
  addLocationsToMap(locations);
  addLocationsToPanel(locations);
  // ... etc.
}

/**
 * This function will be called if a communication error occurs during the JSON-P request
 * @param  {Object} error  The error message received.
 */
function onError(error) {
  alert('Can\'t reach the remote server');
}

/**
 * Boilerplate map initialization code starts below:
 */

//Step 1: initialize communication with the platform
// In your own code, replace variable window.apikey with your own apikey
var platform = new H.service.Platform({
  apikey: 'faufZS2XOMIwlELktKbKASVY6kexKiMmH5VxPsyAwmg'//window.apikey
});
var defaultLayers = platform.createDefaultLayers();

//Step 2: initialize a map - this map is centered over California
var map = new H.Map(document.getElementById('map'),
  defaultLayers.vector.normal.map,{
  center: {lat:37.376, lng:-122.034},
  zoom: 15,
  pixelRatio: window.devicePixelRatio || 1
});
// add a resize listener to make sure that the map occupies the whole container
window.addEventListener('resize', () => map.getViewPort().resize());

var locationsContainer = document.getElementById('panel');

//Step 3: make the map interactive
// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Create the default UI components
var ui = H.ui.UI.createDefault(map, defaultLayers);

// Hold a reference to any infobubble opened
var bubble;

/**
 * Opens/Closes a infobubble
 * @param  {H.geo.Point} position     The location on the map.
 * @param  {String} text              The contents of the infobubble.
 */
function openBubble(position, text){
 if(!bubble){
    bubble =  new H.ui.InfoBubble(
      position,
      {content: text});
    ui.addBubble(bubble);
  } else {
    bubble.setPosition(position);
    bubble.setContent(text);
    bubble.open();
  }
}

function convertOffsetToDecimal(offsetString) {
  const sign = offsetString[0] === '-' ? -1 : 1;
  const [hours, minutes] = offsetString.slice(1).split(':').map(Number);
  return sign * (hours + minutes / 60);
}

/**
 * Creates a series of list items for each location found, and adds it to the panel.
 * @param {Object[]} locations An array of locations as received from the
 *                             H.service.GeocodingService
 */
function addLocationsToPanel(locations){

  var nodeOL = document.createElement('ul'),
      i;

  nodeOL.style.fontSize = 'small';
  nodeOL.style.marginLeft ='5%';
  nodeOL.style.marginRight ='5%';


   for (i = 0;  i < locations.length; i += 1) {
     let location = locations[i];
     var li = document.createElement('li'),
         divLabel = document.createElement('div'),
         address = location.address,
         position = location.position;
         content =  '<strong style="font-size: large;">' + address.label  + '</strong></br>';
      //content += '<strong>houseNumber:</strong> ' + address.houseNumber + '<br/>';
      //content += '<strong>street:</strong> '  + address.street + '<br/>';
      //content += '<strong>district:</strong> '  + address.district + '<br/>';
//      content += '<strong>city:</strong> ' + address.city + ',';
  //    content += '<strong>postalCode:</strong> ' + address.postalCode + ',';
      //content += '<strong>county:</strong> ' + address.county + '<br/>';
    //  content += '<strong>country:</strong> ' + address.countryName + ',';
      if(location.timeZone!=undefined)content += '<strong>TimeZone:</strong> ' + JSON.stringify(location.timeZone) + ' '+ location.timeZone==undefined?0:convertOffsetToDecimal(location.timeZone.utcOffset)+',';
      geopos=  Math.abs(position.lat.toFixed(4)) + ((position.lat > 0) ? 'N' : 'S') +' ' + Math.abs(position.lng.toFixed(4)) + ((position.lng > 0) ? 'E' : 'W') ;
      content += '<strong>position:</strong> ' + geopos + '<br/>';
      divLabel.innerHTML = content;
      if(i==0){
        if(location.timeZone!=undefined)document.getElementById("placename").value= geopos+ " "+location.timeZone.utcOffset;
        document.getElementById("placename").dispatchEvent(new Event('change'))
      }
      li.appendChild(divLabel);

      nodeOL.appendChild(li);
  }
  locationsContainer.innerHTML="";
  locationsContainer.appendChild(nodeOL);
}


/**
 * Creates a series of H.map.Markers for each location found, and adds it to the map.
 * @param {Object[]} locations An array of locations as received from the
 *                             H.service.GeocodingService
 */
function addLocationsToMap(locations){
  var group = new  H.map.Group(),
      position,
      i;

  // Add a marker for each location found
  for (i = 0;  i < locations.length; i += 1) {
    let location = locations[i];
    marker = new H.map.Marker(location.position);
    marker.label = location.address.label;
    group.addObject(marker);
  }

  group.addEventListener('tap', function (evt) {
    map.setCenter(evt.target.getGeometry());
    openBubble(
       evt.target.getGeometry(), evt.target.label);
  }, false);

  // Add the locations group to the map
  map.addObject(group);
  map.setCenter(group.getBoundingBox().getCenter());
}

// Now use the map as required...
geocode(platform);
function searchLocation(){
    var geocoder = platform.getSearchService();
        geocodingParameters = {
          q: document.getElementById("location").value,
          show: "tz"//'Chennai'//'200 S Mathilda Sunnyvale CA'
        };
  
    geocoder.geocode(
      geocodingParameters,
      onSuccess,
      onError
    );
  }



function OnChange(id) {
/*
<label for="myCheck">Checkbox:</label> 
<input type="checkbox" id="myCheck" onchange="OnChange('myCheck')">

<p id="text" style="display:none">Checkbox is CHECKED!</p>

*/
  var checkBox = document.getElementById(id);
  var text = document.getElementById("text");
  if (checkBox.checked == true){
    text.style.display = "block";
  } else {
     text.style.display = "none";
  }
}

