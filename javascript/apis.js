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
  firebase.initializeApp(config);
  var database = firebase.database();

  //===============AJAX===========================//
  function getWeather() {
    var zipCode = $('#postal-code').val();
    console.log(zipCode)
    $.ajax({

      url: "https://api.openweathermap.org/data/2.5/forecast?zip=" + zipCode + ",us&appid=8caea81085fc66df0fb0c7d61c6772b8",
      method: 'GET',
    }).then(function (response) {
      console.log(response)

      var weatherType = response.list[0].weather[0].main;

      if (weatherType === "Clear") {
        $('body').css('background-image', 'url(images/sun.jpg)');
      }
      if (weatherType === "Cloud") {
        $('body').css('background-image', 'url(images/clouds.jpg)');
      }
      if (weatherType === "Thunder") {
        $('body').css('background-image', 'url(images/thunder.jpg)');
      }
      if (weatherType === "Rain") {
        $('body').css('background-image', 'url(images/heavy-rain.jpg)');
      }
      if (weatherType === "Drizzle") {
        $('body').css('background-image', 'url(images/heavy-rain.jpg)');
      }
      if (weatherType === "Snow") {
        $('body').css('background-image', 'url(images/heavy-rain.jpg)');
      }




      for (let i = 0; i < response.list.length; i += 3) {
        var cloud = response.list[i].clouds.all;

        console.log(cloud);

        var weatherDescription = response.list[i].weather[0].main;
        console.log(weatherDescription)

        var temperature = response.list[i].main.temp;
        console.log(temperature)

        var date = response.list[i].dt_txt;
        console.log(date);
      }
    })
  }


  //store weather data locally using firebase
  $(".btn-primary").on("click", function (event) {
    event.preventDefault();



    var zipCode = $("#postal-code").val();
    $("#postal-code").html("")
    database.ref().set({ "zipcode": zipCode });
    console.log(zipCode)
    getWeather();
  });
  //hit spotify api
  //GET user authentication
  //hit face recog

  //var video = document.querySelector("#video");

  //if (navigator.mediaDevices.getUserMedia) {
  //navigator.mediaDevices.getUserMedia({ video: true })
  // .then(function (stream) {
  //   video.srcObject = stream;
  // })
  //.catch(function (err0r) {
  //   console.log("Something went wrong!");
  // });
  //}
})

//WEBCAM TAKES A PHOTO
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