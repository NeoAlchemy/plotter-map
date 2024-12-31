
function initMap() {
    const bounds = new google.maps.LatLngBounds();
    const markersArray = [];
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 55.53, lng: 9.4 },
      zoom: 10,
    });
    // initialize services
    const geocoder = new google.maps.Geocoder();
    const service = new google.maps.DistanceMatrixService();
    // build request
    const origin1 = "Des Moines, IA";
    const origin2 = "Fort Worth, TX";
    const origin3 = "Pensecola, FL";
    const destinationA = document.getElementById("dest").value;
    const request = {
      origins: [origin1, origin2, origin3],
      destinations: [destinationA],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false,
    };
  
    // put request on page
    document.getElementById("request").innerText = JSON.stringify(
      request.destinations[0],
      null,
      2,
    );
    // get distance matrix response
    service.getDistanceMatrix(request).then((response) => {
      // put response
      document.getElementById("response").innerText = 
      
      request.origins[0] + " - " + response.rows[0].elements[0].duration.text + "\n" + request.origins[1] + " - " + response.rows[1].elements[0].duration.text + 
  "\n" + request.origins[2] + " - " + response.rows[2].elements[0].duration.text;
      
      /*JSON.stringify(
        response,
        null,
        2,
      ); */
  
      // show on map
      const originList = response.originAddresses;
      const destinationList = response.destinationAddresses;
  
      deleteMarkers(markersArray);
  
      const showGeocodedAddressOnMap = (asDestination) => {
        const handler = ({ results }) => {
          map.fitBounds(bounds.extend(results[0].geometry.location));
          markersArray.push(
            new google.maps.Marker({
              map,
              position: results[0].geometry.location,
              label: asDestination ? "D" : "O",
            }),
          );
        };
        return handler;
      };
  
      for (let i = 0; i < originList.length; i++) {
        const results = response.rows[i].elements;
  
        geocoder
          .geocode({ address: originList[i] })
          .then(showGeocodedAddressOnMap(false));
  
        for (let j = 0; j < results.length; j++) {
          geocoder
            .geocode({ address: destinationList[j] })
            .then(showGeocodedAddressOnMap(true));
        }
      }
    });
  }
  
  function deleteMarkers(markersArray) {
    for (let i = 0; i < markersArray.length; i++) {
      markersArray[i].setMap(null);
    }
  
    markersArray = [];
  }
  
  document.getElementById("go").onclick = function(){
      window.initMap();
  }
  
  document.getElementById("dest"),onkeypress = function(e) {
    if (e.keyCode == 13) {
        window.initMap();
    }
  }

  document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const content = e.target.result;
            console.log(content);
            window.initMap(content)
        };
        reader.readAsText(file);
    }
});
  //window.initMap = initMap;