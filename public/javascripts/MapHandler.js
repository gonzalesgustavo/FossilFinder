document.addEventListener("DOMContentLoaded", init);
var map;
var iconBase = "https://maps.google.com/mapfiles/kml/shapes/";
var coords = {};

var holder = [];

function init() {
  initMap();
} /*end of init*/

function initMap() {
  //center or where the map lands on start
  let center = { lat: 34.5199, lng: -105.8701 };
  //set up the map and original locaiton (New Mexico)
  map = new google.maps.Map(document.getElementById("map"), {
    center: center,
    zoom: 7
  });

  //Fill map with markers
  for (var i = 0; i < coords.lat.length; i++) {
    for (var b = 0; b < coords.plDB.length; b++) {
      var cont = '<h3 id="palNum">' + coords.plDB[b] + "</h3>"; //marker text/PaleoDB #
      var marker = new google.maps.Marker({
        position: { lat: coords.lat[i], lng: coords.lng[i] }, //loops through to get all locations from db
        map: map,
        icon: "../images/" + Math.floor(Math.random() * 14) + ".png", //selects a random icon from the images folder
        htmlContent: cont
      });
      var infowindow = new google.maps.InfoWindow({}); //sets up the info windows that pop up
      google.maps.event.addListener(marker, "click", function() {
        infowindow.setContent(this.htmlContent); //sets the content to a string containing html
        infowindow.open(map, this); //sends the info to the map
        getPNum(); //puts info into the lower div
      });
    }
  }
}

//on select match data and put into div
function getPNum() {
  var dbnum = document.getElementById("palNum").innerHTML;
  for (var b = 0; b < coords.plDB.length; b++) {
    if (dbnum === coords.plDB[b].toString()) {
      var cont =
        '<div class="holder"><div class="card"><img class="card-img-top" src="../images/dfoots.jpg" alt="Card image cap"><div class="card-body"><h4 class="card-title">' +
        coords.species[b] +
        '</h4><h6 class="card-subtitle mb-2 text-muted">PaleoDB#: ' +
        coords.plDB[b] +
        '</h6><h6 class="card-subtitle mb-2 text-muted">Fossil Type: ' +
        coords.type[b] +
        '</h6><img src="' +
        coords.img[b] +
        '" width="180px" height="180px" alt="Card image"><h3 class="card-subtitle">Location:</h3><p class="card-text">Location: ' +
        coords.found.loc[b] +
        " <br> County: " +
        coords.found.cou[b] +
        '</p><p class="card-text">' +
        coords.info[b] +
        "</p></div></div></div></div>";

      $("#infos").html(cont);
    }
  }
} //end of function getPNum

//gets data from mongo db passed in from index
function loadlatlng(lt) {
  coords = lt;
} /*end of loadData*/

//testing funciton
function seeData(da) {
  console.log(da);
} /*end of seeData*/

function loadNewDinos(data) {
  var datatran = JSON.stringify(data);
  var jso = JSON.parse(datatran);
  return jso;
}
