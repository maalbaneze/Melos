// Spotify Key:0bd8c45ee4a54a3284777c3388b01d7e
// URL:http://open.spotify.com















// Weather Key:8caea81085fc66df0fb0c7d61c6772b8
//                URL: api.openweathermap.org
//======================variable====================//









//=====================Setup=========================//
var queryURL = "api.openweathermap.org/data/2.5/forecast?zip=" + zipcode + "," + country + "api=8caea81085fc66df0fb0c7d61c6772b8"
$ajax({
    url: queryURL,
    method: "GET"

}).then(function (response) {
    console.log(response)
})












//=================EVent Listener======================//
$()var queryURL = "api.openweathermap.org/data/2.5/forecast?zip="+zipcode+","+country+"api=8caea81085fc66df0fb0c7d61c6772b8"
$ajax({
    url:queryURL,
method:"GET"

}).then(function(response){
    console.log(response)
})