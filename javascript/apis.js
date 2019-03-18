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


  //The following portions of js code are for Taking still photos with WebRTC
  //We start by wrapping the whole script in an anonymous function to avoid global variables, then setting up various variables we'll be using
  (function () {
    var width = 320;    // We will scale the photo width to this
    var height = 0;     // This will be computed based on the input stream

    var streaming = false;

    var video = null;
    var canvas = null;
    var photo = null;
    var startbutton = null;

    //The startup() function is run when the page has finished loading, courtesy of window.addEventListener(). This function's job is to request access to the user's webcam, initialize the output <img> to a default state, and to establish the event listeners needed to receive each frame of video from the camera and react when the button is clicked to capture an image.
    //First, we grab references to the major elements we need to be able to access
    function startup() {
      video = document.getElementById('video');
      canvas = document.getElementById('canvas');
      photo = document.getElementById('photo');
      startbutton = document.getElementById('startbutton');

      //The next task is to get the media stream
      navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(function (stream) {
          video.srcObject = stream;
          video.play();
        })
        .catch(function (err) {
          console.log("An error occurred! " + err);
        });

      //Listen for the video to start playing
      video.addEventListener('canplay', function (ev) {
        if (!streaming) {
          height = video.videoHeight / (video.videoWidth / width);

          video.setAttribute('width', width);
          video.setAttribute('height', height);
          canvas.setAttribute('width', width);
          canvas.setAttribute('height', height);
          streaming = true;
        }
      }, false);

      //To capture a still photo each time the user clicks the startbutton, we need to add an event listener to the button
      startbutton.addEventListener('click', function (ev) {
        takepicture();
        ev.preventDefault();
      }, false);
      clearphoto();
    }

    //Clearing the photo box 
    function clearphoto() {
      var context = canvas.getContext('2d');
      context.fillStyle = "#AAA";
      context.fillRect(0, 0, canvas.width, canvas.height);

      var data = canvas.toDataURL('image/png');
      photo.setAttribute('src', data);
    }

    // capture the currently displayed video frame 
    function takepicture() {
      var context = canvas.getContext('2d');
      if (width && height) {
        canvas.width = width;
        canvas.height = height;
        context.drawImage(video, 0, 0, width, height);

        var data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);
      } else {
        clearphoto();
      }
    }
    startup();
    //store data locally
    //recommend music based on 3 data inputs
  })
})
