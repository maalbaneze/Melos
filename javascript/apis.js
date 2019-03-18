// Napster Key:NWU1NWM2ODEtZjU1Yi00NjI2LWFmMGUtMTA3YjJmNmY4OGIx
//        URL: api.napster.com
// Weather Key:8caea81085fc66df0fb0c7d61c6772b8
//         URL: api.openweathermap.org
// Giphy Key: i5u86hxDFgUmIDDbuFDZ6vsL4wBLI8B6
//      URL: api.giphy.com

$(document).ready(function () {
  var config = {
    apiKey: "AIzaSyBFvIwDGuvgIoxHnmSgUzbAmzW8gvpnxKo",
    authDomain: "melos-71bca.firebaseapp.com",
    databaseURL: "https://melos-71bca.firebaseio.com",
    projectId: "melos-71bca",
    storageBucket: "melos-71bca.appspot.com",
    messagingSenderId: "197405510515"
};
// get user inputs
var musicPref = $("#musicP").val()
var weatherPref =  $("#weatherP").val()
var mood = $("#moodP").val()

firebase.initializeApp(config);
var database = firebase.database();
var weatherDescription;


//===============AJAX===========================//
function getWeather(){
  var zipCode= $('#postal-code').val();
console.log(zipCode)
$.ajax({
	url: "https://api.openweathermap.org/data/2.5/forecast?zip=" + zipCode + ",us&appid=8caea81085fc66df0fb0c7d61c6772b8",
	method:'GET',
}).then(function(response){
  console.log(response)
  for(let i=0; i<response.list.length; i+=3){
		var cloud = response.list[i].clouds.all;
		console.log(cloud);

		weatherDescription = response.list[i].weather[0].main;
		console.log(weatherDescription)

		var temperature = response.list[i].main.temp;
		console.log(temperature)

		var date = response.list[i].dt_txt;
    console.log(date);
    // database.ref().set({ "zipcode" : zipCode });
    database.ref().set({ "weather" : weatherDescription })
	}
})
}
$("#musicP").on("click", function (){
    database.ref().set({"Music Pref:": musicPref})
})


//corralate user info to generate playlist
$("#submit").on("click", function (event) {
  event.preventDefault();
    $("#postal-code").html("")
    getWeather();
     //recommend music based on 3 data inputs
    //  if ({
    //   weatherDescription = clear,
    //   musicPref 
      

    // });
});
//hit spotify api

//hit face recog

  const player = document.getElementById('player');
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  const captureButton = document.getElementById('capture');
  const constraints = {
      video: true,
  };
  captureButton.addEventListener('click', () => {
      // Draw the video frame to the canvas.
      context.drawImage(player, 0, 0, canvas.width, canvas.height);
  });
  // Attach the video stream to the video element and autoplay.
  navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
          player.srcObject = stream;
      });
 $.ajax({
   url : "",
   method : "GET"
 }).then(function(){})
})

