// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
var map;
function initMap() {
map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: 39.82, lng: -98.57},
  zoom: 4
});
}
$(document).ready(function() {
	initMap();
  // CODE IN HERE!
    function marker(coor){
		var marker = new google.maps.Marker({
			position: coor,
			map: map,
			icon: image
		})
	}
	var image = {
		url: "earthquake.png",
		scaledSize: new google.maps.Size(32, 32),
		origin: new google.maps.Point(0,0),
		anchor: new google.maps.Point(0,0)
	}

    $.ajax({
	  	url: weekly_quakes_endpoint,
	  	success: onSuccess
    })
    function onSuccess(json){
	  	json.features.map(function(item){
			var title = item.properties.title;
			var splits = title.split("-");
			var citys = splits[1].split('of');
			var city = citys.pop();
			console.log(city)
			var time = item.properties.time;
			time = Math.floor((Date.now() - time) / 1000 / 60 / 60);

			$('#info').append(`<p> ${city} / ${time} hours</p>`);
			var lati = item.geometry.coordinates[1];
			var long = item.geometry.coordinates[0];
			var coor = {
				lat: lati,
				lng: long
			}
			marker(coor);


			//console.log(json.features[i].properties.title);
		})	
    }
});
