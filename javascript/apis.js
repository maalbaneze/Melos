// Napster Key:NWU1NWM2ODEtZjU1Yi00NjI2LWFmMGUtMTA3YjJmNmY4OGIx
//        URL: api.napster.com  --- DO NOT NEED THIS ---
// Weather Key:8caea81085fc66df0fb0c7d61c6772b8
//        URL: api.openweathermap.org
// Giphy Key: i5u86hxDFgUmIDDbuFDZ6vsL4wBLI8B6
//        URL: api.giphy.com
//Spotify key:
//        URL: 
//MS Azure key:
//        URL:  

// Access Firebase 
$(document).ready(function () {
  var config = {
    apiKey: "AIzaSyBFvIwDGuvgIoxHnmSgUzbAmzW8gvpnxKo",
    authDomain: "melos-71bca.firebaseapp.com",
    databaseURL: "https://melos-71bca.firebaseio.com",
    projectId: "melos-71bca",
    storageBucket: "melos-71bca.appspot.com",
    messagingSenderId: "197405510515"
  };

  /// Initialize Firebase with data
  firebase.initializeApp(config);
  var database = firebase.database();
  var ref = firebase.storage().ref();

  

  // //Get user input preferences on radio button select and store as variables

  //   $('input:radio').change(function () {
  //     console.log($(this).attr("name"))
  //     var selection = $(this).attr("id")
  //     console.log(selection)

  //     var musicChoice = $(selection).val("id")
  //     var weatherPref = $(selection).val("id")
  //     var mood = $(selection).val("id")
  //     database.ref().update({ musicChoice: [], weatherPref: [], mood: [] });
  //   });

// Obtain a user pic for sending to MS Azure facial recog API
const player = document.getElementById('player');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const captureButton = document.getElementById('capture');
const constraints = {
  video: true,
};
// console.log(canvas)
// console.log(context)
captureButton.addEventListener('click', (photoCapture) => {
  console.log(photoCapture)
  const canvas = document.getElementById('canvas');
  // Draw the video frame to the canvas
  context.drawImage(player, 0, 0, canvas.width, canvas.height);
  canvas.toBlob(function(blob){
    console.log(blob)
    uploadToFirebase(blob)
  });
  // convertCanvasToImage(canvas);
  player.srcObject.getVideoTracks().forEach(track => track.stop());
});
// Attach the video stream to the video element and autoplay.
navigator.mediaDevices.getUserMedia(constraints)
  .then((stream) => {
    player.srcObject = stream;
  });
function uploadToFirebase(photo){
    // this code handles watson facial recongition
    // use photo to pass into api call
    const file = photo;
    console.log(photo)
    // const name = (+new Date()) + '-' + file.name;
    // var reader = new FileReader();
    // reader.addEventListener('load', readFile);
    // console.log(reader.readAsText(file));

    const metadata = {
        contentType: file.type
    };
    const task = ref.child("image").put(photo, metadata);
    task
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then((url) => {
        console.log(url);
        // document.querySelector('#someImageTagID').src = url;
    })
    .catch(console.error);
}

function processImage() {
  // Replace <Subscription Key> with your valid subscription key.
  var subscriptionKey = "9f64fbd89816421ca1fc4e7bce4311c1";
  var uriBase =
    "https://westus.api.cognitive.microsoft.com/face/v1.0/detect";

  // Request parameters.
  var params = {
    "returnFaceId": "true",
    "returnFaceLandmarks": "false",
    "returnFaceAttributes":
        "age,gender,headPose,smile,facialHair,glasses,emotion," +
        "hair,makeup,occlusion,accessories,blur,exposure,noise"
  };

  var sourceImageUrl = "http://vms.fnal.gov/stillphotos/2018/0000/18-0090-10.jpg"
  //===============AJAX Calls===========================//
  // Perform the REST API call.
  $.ajax({
    url: uriBase + "?" + $.param(params),
    // Request headers.
    beforeSend: function (xhrObj) {
      xhrObj.setRequestHeader("Content-Type", "application/json");
      xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
    },
    type: "POST",
    // Request body.
    // processData: false,
    data: '{"url": ' + '"' + sourceImageUrl + '"}',
  }).done(function (data) {
    console.log(data)
    // Show formatted JSON on webpage.
    // $("#responseTextArea").val(JSON.stringify(data, null, 2));
   
  }).fail(function (jqXHR, textStatus, errorThrown) {
    console.log(jqXHR,textStatus,errorThrown);
    // Display error message.
    var errorString = (errorThrown === "") ?
      "Error. " : errorThrown + " (" + jqXHR.status + "): ";
    errorString += (jqXHR.responseText === "") ?
      "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
        jQuery.parseJSON(jqXHR.responseText).message :
        jQuery.parseJSON(jqXHR.responseText).error.message;
     alert(errorString);
  });
};

// Get current wx from OpenWeather API
function getWeather() {
  var zipCode = $('#postal-code').val();
  console.log(zipCode)
  $.ajax({

    url: "https://api.openweathermap.org/data/2.5/forecast?zip=" + zipCode + ",us&appid=8caea81085fc66df0fb0c7d61c6772b8",
    method: 'GET',
  }).then(function (response) {
    console.log(response)

    // Change background image based on current wx
    weatherType = response.list[0].weather[0].main;

    if (weatherType === "Clear") {
      $('body').css('background-image', 'url(images/sun.jpg)');
      // $("#header-name").css("text-shadow", "
      // -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000");
      $('#header-name').css('text-shadow', 'black -5px 5px 1px');
    }
    if (weatherType === "Clouds") {
      $('body').css('background-image', 'url(images/clouds.jpg)');
    }
    else if (weatherType === "Thunder") {
      $('body').css('background-image', 'url(images/thunder.jpg)');
    }
    else if (weatherType === "Rain") {
      $('body').css('background-image', 'url(images/heavy-rain.jpg)');
    }
    else if (weatherType === "Drizzle") {
      $('body').css('background-image', 'url(images/heavy-rain.jpg)');
    }
    else if (weatherType === "Snow") {
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
      database.ref().set("weather:", weather)
    }
  })
};
//Current weather listener as a click function
$("#submit").on("click", function (event) {
  event.preventDefault();
  $("#postal-code").html("")
  getWeather();
  processImage();
  $("#logo-wrapper").fadeOut(1000);
});

//Algorithm to correlate user info to generate playlist







//Function to create a playlist based on user inputs and the current weather

this.createPlaylist = function (playlistName, options, callback) {
  // In case someone is using a version where options parameter did not exist.
  var actualCallback;
  if (typeof options === 'function') {
    actualCallback = options;
  } else {
    actualCallback = callback;
  }

  var actualOptions = { 'name': playlistName };
  if (typeof options === 'object') {
    Object.keys(options).forEach(function (key) {
      actualOptions[key] = options[key];
    });
  }

  var request = WebApiRequest.builder()
    .withPath('/v1/users/' + encodeURI(userId) + '/playlists')
    .withHeaders({ 'Content-Type': 'application/json' })
    .withBodyParameters(actualOptions)
    .build();

  _addAccessToken(request, this.getAccessToken());

  var promise = _performRequest(HttpManager.post, request);

  if (actualCallback) {
    promise.then(function (data) {
      actualCallback(null, data);
    }, function (err) {
      actualCallback(err);
    });
  } else {
    return promise;
  }
};

$("#returnedPlaylist").actualCallback;


$("#media-row1").click(function(){
  $("#media-row").fadeOut(500);
  $("#media-row1").hide();
  $("#media-row2").show();
  $("#media-playlist2").hide();
  $("#media-playlist1").show();
  $("#logo-wrapper").fadeIn(1000);

  $("#melos-button1").show(); //MELOS1 as default will show the instructions
  $("#melos-button2").hide(); //MELOS2 as default will hide the instructions
});



$("#media-row2").click(function(){
  $("#media-row").fadeIn(1000);
  $("#play-list-container").hide(1000);
  $("#media-playlist2").hide();
  $("#media-playlist1").show();
  $("#media-row1").show();
  $("#media-row2").hide();

  $("#instructions-wrapper").fadeOut(1000);

  $("#melos-button1").show(); //MELOS1 as default will show the instructions
  $("#melos-button2").hide(); //MELOS2 as default will hide the instructions

  // $("#nav-cont").fadeOut(500);



  $("#logo-wrapper").fadeOut(500);

});


$("#media-playlist1").click(function(){
  $("#play-list-container").show(1000);
  $("#media-row").hide(1000);
  $("#media-row1").hide();
  $("#media-row2").show();
  $("#media-playlist2").show();
  $("#media-playlist1").hide();

  $("#logo-wrapper").fadeOut(500);

  $("#instructions-wrapper").fadeOut(1000);

  $("#melos-button1").show(); //MELOS1 as default will show the instructions
  $("#melos-button2").hide(); //MELOS2 as default will hide the instructions
});


$("#media-playlist2").click(function(){
  $("#play-list-container").hide(1000);
  $("#media-row2").show();
  $("#media-row1").hide();
  $("#media-playlist2").hide();
  $("#media-playlist1").show();

  $("#logo-wrapper").fadeIn(1000);

  $("#melos-button1").show(); //MELOS1 as default will show the instructions
  $("#melos-button2").hide(); //MELOS2 as default will hide the instructions
});



$("#melos-button1").click(function(){
  $("#media-row").hide();
  $("#play-list-container").hide();
  $("#instructions-wrapper").fadeIn(1000);
  $("#melos-button1").hide(); //MELOS1 as default shows the instructions
  $("#melos-button2").show(); //MELOS2 as default shows the instructions
  $("#media-row2").show();
  $("#media-row1").hide();  
  $("#media-playlist2").hide();
  $("#media-playlist1").show();
  $("#logo-wrapper").fadeOut(1000);
  
});

$("#melos-button2").click(function(){
  $("#media-row").hide();
  $("#play-list-container").hide();
  $("#instructions-wrapper").hide();
  $("#melos-button2").hide(); //MELOS2 as default shows the instructions
  $("#melos-button1").show(); //MELOS1 as default shows the instructions
  $("#media-playlist2").hide();
  $("#media-playlist1").show();
  $("#media-row2").show();
  $("#media-row1").hide(); 
  

  
});



// $("#melos-button").click(function(){
//   $("#play-list-container").hide(1000);
//   $("#media-row").hide(1000);
//   $("#media-row2").show();
//   $("#media-row1").hide();
//   $("#media-playlist2").hide();
//   $("#media-playlist1").show();
//   $("#instructions-wrapper").fadeIn(1000);
// });


// $("#togButton").click(function(){
//   $("#play-list-container").hide(1000);
//   $("#media-playlist1").show();
//   $("#media-playlist2").hide();
//   $("#media-row").fadeOut(500);
//   $("#media-row2").show();
//   $("#media-row1").hide();  
//   $("#logo-wrapper").fadeOut(1000);
// });




document.getElementById("submit").onclick=function() {

  var selectedMusic = document.forms.yourChoiceForm.musicPref.value;
  var selectedWeather = document.forms.yourChoiceForm.wxPref.value;
  var selectedMood = document.forms.yourChoiceForm.moodPref.value;
  console.log(selectedMood + selectedWeather + selectedMusic)
  function showPlayList() {
    $("#play-list-container").show(1000);
    $("#media-row").hide(1000);
    $("#media-row1").hide();
    $("#media-row2").show();
    $("#media-playlist2").show();
    $("#media-playlist1").hide();


  };
  if(selectedMusic=="rockVal" && selectedWeather=="clearVal" && selectedMood=="greatVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/sonymusicfinland/playlist/5BygwTQ3OrbiwVsQhXFHMz").toggle(2000).toggle(1000);;
  }
  
  else  if(selectedMusic=="hipHopVal" && selectedWeather=="clearVal" && selectedMood=="greatVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DXdPec7aLTmlC").toggle(2000).toggle(1000);
  }
  
  else  if(selectedMusic=="jazzVal" && selectedWeather=="clearVal" && selectedMood=="greatVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/1135059712/playlist/57CfuwaT1ERCKrJIcTPL4M").toggle(2000).toggle(1000);;
  }
  
  else  if(selectedMusic=="electronicaVal" && selectedWeather=="clearVal" && selectedMood=="greatVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/cmihran/playlist/4FW02V8r0GQxCAckzGRKl6").toggle(2000).toggle(1000);
  }
  else  if(selectedMusic=="rbval" && selectedWeather=="clearVal" && selectedMood=="greatVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DX9XIFQuFvzM4").toggle(2000).toggle(1000)
  }
  else  if(selectedMusic=="countryVal" && selectedWeather=="clearVal" && selectedMood=="greatVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/1278255944/playlist/78pbcVh3P7V3lsjsxAabUp").toggle(2000).toggle(1000)
  }
  else  if(selectedMusic=="alternativeVal" && selectedWeather=="clearVal" && selectedMood=="greatVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/12122337581/playlist/4ywC29onirHuIiCKW0tDrW").toggle(2000).toggle(1000)
  }
  else  if(selectedMusic=="randomVal" && selectedWeather=="clearVal" && selectedMood=="greatVal"){ 
    $("#playlist").attr("src","").toggle(2000).toggle(1000)
  }

    //====================ok mood===============================//
  else if(selectedMusic=="rockVal" && selectedWeather=="clearVal" && selectedMood=="okVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/12161669117/playlist/3GGq4AgCWovQf9unH4OeLA").toggle(2000).toggle(1000)
  }
  
  else  if(selectedMusic=="hipHopVal" && selectedWeather=="clearVal" && selectedMood=="okVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DWT6MhXz0jw61").toggle(2000).toggle(1000)
  }
  
  else  if(selectedMusic=="jazzVal" && selectedWeather=="clearVal" && selectedMood=="okVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DX1s9knjP51Oa").toggle(2000).toggle(1000)
  }
  
  else  if(selectedMusic=="electronicaVal" && selectedWeather=="clearVal" && selectedMood=="okVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/22d4ad36edipx6lzornmjz3ha/playlist/0OLd6eJuk2KDrbY8FC7rOz").toggle(2000).toggle(1000)
  }
  else  if(selectedMusic=="rbval" && selectedWeather=="clearVal" && selectedMood=="okVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DX6ziVCJnEm59").toggle(2000).toggle(1000)
  }
  else  if(selectedMusic=="countryVal" && selectedWeather=="clearVal" && selectedMood=="okVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/1215375922/playlist/2Ovyb3slP09vXwDEo0qofp").toggle(2000).toggle(1000)
  }
  else  if(selectedMusic=="alternativeVal" && selectedWeather=="clearVal" && selectedMood=="okVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DWUgBy0IJPlHq").toggle(2000).toggle(1000)
  }
  else  if(selectedMusic=="randomVal" && selectedWeather=="clearVal" && selectedMood=="okVal"){ 
    $("#playlist").attr("src","").toggle(2000).toggle(1000)
  }

  //================bummed mood==========================//
  else if(selectedMusic=="rockVal" && selectedWeather=="clearVal" && selectedMood=="bummedVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/bmo6xqjgu50yfujs7utbqsmsp/playlist/3jxJ5VOEudOS5iWfq27deI").toggle(2000).toggle(1000)
  }
  
  else  if(selectedMusic=="hipHopVal" && selectedWeather=="clearVal" && selectedMood=="bummedVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DWSqBruwoIXkA").toggle(2000).toggle(1000)
  }
  
  else  if(selectedMusic=="jazzVal" && selectedWeather=="clearVal" && selectedMood=="bummedVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/1233564303/playlist/0NcQtKxtJUS1tzzliuAUzE").toggle(2000).toggle(1000)
  }
  
  else  if(selectedMusic=="electronicaVal" && selectedWeather=="clearVal" && selectedMood=="bummedVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/1246052288/playlist/2Vz3YWfo3tOKqKSHIuW322").toggle(2000).toggle(1000)
  }
  else  if(selectedMusic=="rbval" && selectedWeather=="clearVal" && selectedMood=="bummedVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DX3YSRoSdA634").toggle(2000).toggle(1000)
  }
  else  if(selectedMusic=="countryVal" && selectedWeather=="clearVal" && selectedMood=="bummedVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/128394878/playlist/7kEE6TqULEqEkWETKhXscw").toggle(2000).toggle(1000)
  }
  else  if(selectedMusic=="alternativeVal" && selectedWeather=="clearVal" && selectedMood=="bummedVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/pyreflyes/playlist/4BjP3y2GOO8NygO3u55WHB").toggle(2000).toggle(1000)
  }
  else  if(selectedMusic=="randomVal" && selectedWeather=="clearVal" && selectedMood=="bummedVal"){ 
    $("#playlist").attr("src","").toggle(2000).toggle(1000)
  }
  //===============================drizzle===========================================//
  
  else if(selectedMusic=="rockVal" && selectedWeather=="drizzleVal" && selectedMood=="greatVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/sonymusicfinland/playlist/5BygwTQ3OrbiwVsQhXFHMz").toggle(2000).toggle(1000)
  }
  
  else  if(selectedMusic=="hipHopVal" && selectedWeather=="drizzleVal" && selectedMood=="greatVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DXdPec7aLTmlC").toggle(2000).toggle(1000)
  }
  
  else  if(selectedMusic=="jazzVal" && selectedWeather=="drizzleVal" && selectedMood=="greatVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/1135059712/playlist/57CfuwaT1ERCKrJIcTPL4M").toggle(2000).toggle(1000)
  }
  
  else  if(selectedMusic=="electronicaVal" && selectedWeather=="drizzleVal" && selectedMood=="greatVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/cmihran/playlist/4FW02V8r0GQxCAckzGRKl6").toggle(2000).toggle(1000)
  }
  else  if(selectedMusic=="rbval" && selectedWeather=="drizzleVal" && selectedMood=="greatVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DX9XIFQuFvzM4").toggle(2000).toggle(1000)
  }
  else  if(selectedMusic=="countryVal" && selectedWeather=="drizzleVal" && selectedMood=="greatVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/1278255944/playlist/78pbcVh3P7V3lsjsxAabUp").toggle(2000).toggle(1000)
  }
  else  if(selectedMusic=="alternativeVal" && selectedWeather=="drizzleVal" && selectedMood=="greatVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/12122337581/playlist/4ywC29onirHuIiCKW0tDrW").toggle(2000).toggle(1000)
  }
  else  if(selectedMusic=="randomVal" && selectedWeather=="drizzleVal" && selectedMood=="greatVal"){ 
    $("#playlist").attr("src","").toggle(2000).toggle(1000)
  }

    //====================ok mood===============================//
  else if(selectedMusic=="rockVal" && selectedWeather=="drizzleVal" && selectedMood=="okVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/12161669117/playlist/3GGq4AgCWovQf9unH4OeLA").toggle(2000).toggle(1000)
  }
  
  else  if(selectedMusic=="hipHopVal" && selectedWeather=="drizzleVal" && selectedMood=="okVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DWT6MhXz0jw61").toggle(2000).toggle(1000);
  }
  
  else  if(selectedMusic=="jazzVal" && selectedWeather=="drizzleVal" && selectedMood=="okVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DX1s9knjP51Oa").toggle(2000).toggle(1000);
  }
  
  else  if(selectedMusic=="electronicaVal" && selectedWeather=="drizzleVal" && selectedMood=="okVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/22d4ad36edipx6lzornmjz3ha/playlist/0OLd6eJuk2KDrbY8FC7rOz").toggle(2000).toggle(1000);
  }
  else  if(selectedMusic=="rbval" && selectedWeather=="drizzleVal" && selectedMood=="okVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DX6ziVCJnEm59").toggle(2000).toggle(1000);
  }
  else  if(selectedMusic=="countryVal" && selectedWeather=="drizzleVal" && selectedMood=="okVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/1215375922/playlist/2Ovyb3slP09vXwDEo0qofp").toggle(2000).toggle(1000);
  }
  else  if(selectedMusic=="alternativeVal" && selectedWeather=="drizzleVal" && selectedMood=="okVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DWUgBy0IJPlHq").toggle(2000).toggle(1000);
  }
  else  if(selectedMusic=="randomVal" && selectedWeather=="drizzleVal" && selectedMood=="okVal"){ 
    $("#playlist").attr("src","").toggle(2000).toggle(1000);
  }

  //================bummed mood==========================//
  else if(selectedMusic=="rockVal" && selectedWeather=="drizzleVal" && selectedMood=="bummedVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/bmo6xqjgu50yfujs7utbqsmsp/playlist/3jxJ5VOEudOS5iWfq27deI").toggle(2000).toggle(1000);
  }
  
  else  if(selectedMusic=="hipHopVal" && selectedWeather=="drizzleVal" && selectedMood=="bummedVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DWSqBruwoIXkA").toggle(2000).toggle(1000);
  }
  
  else  if(selectedMusic=="jazzVal" && selectedWeather=="drizzleVal" && selectedMood=="bummedVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/1233564303/playlist/0NcQtKxtJUS1tzzliuAUzE").toggle(2000).toggle(1000);
  }
  
  else  if(selectedMusic=="electronicaVal" && selectedWeather=="drizzleVal" && selectedMood=="bummedVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/1246052288/playlist/2Vz3YWfo3tOKqKSHIuW322").toggle(2000).toggle(1000);
  }
  else  if(selectedMusic=="rbval" && selectedWeather=="drizzleVal" && selectedMood=="bummedVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DX3YSRoSdA634").toggle(2000).toggle(1000);
  }
  else  if(selectedMusic=="countryVal" && selectedWeather=="drizzleVal" && selectedMood=="bummedVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/128394878/playlist/7kEE6TqULEqEkWETKhXscw").toggle(2000).toggle(1000);
  }
  else  if(selectedMusic=="alternativeVal" && selectedWeather=="drizzleVal" && selectedMood=="bummedVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/pyreflyes/playlist/4BjP3y2GOO8NygO3u55WHB").toggle(2000).toggle(1000);
  }
  else  if(selectedMusic=="randomVal" && selectedWeather=="drizzleVal" && selectedMood=="bummedVal"){ 
    $("#playlist").attr("src","").toggle(2000).toggle(1000);
  }


    //===============================Rain===========================================//
    else if(selectedMusic=="rockVal" && selectedWeather=="rainVal" && selectedMood=="greatVal"){ 
      $("#playlist").attr("src","https://open.spotify.com/embed/user/sonymusicfinland/playlist/5BygwTQ3OrbiwVsQhXFHMz").toggle(2000).toggle(1000);
    }
    
    else  if(selectedMusic=="hipHopVal" && selectedWeather=="rainVal" && selectedMood=="greatVal"){ 
      $("#playlist").attr("src","https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DXdPec7aLTmlC").toggle(2000).toggle(1000);
    }
    
    else  if(selectedMusic=="jazzVal" && selectedWeather=="rainVal" && selectedMood=="greatVal"){ 
      $("#playlist").attr("src","https://open.spotify.com/embed/user/1135059712/playlist/57CfuwaT1ERCKrJIcTPL4M").toggle(2000).toggle(1000);
    }
    
    else  if(selectedMusic=="electronicaVal" && selectedWeather=="rainVal" && selectedMood=="greatVal"){ 
      $("#playlist").attr("src","https://open.spotify.com/embed/user/cmihran/playlist/4FW02V8r0GQxCAckzGRKl6").toggle(2000).toggle(1000);
    }
    else  if(selectedMusic=="rbval" && selectedWeather=="rainVal" && selectedMood=="greatVal"){ 
      $("#playlist").attr("src","https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DX9XIFQuFvzM4").toggle(2000).toggle(1000);
    }
    else  if(selectedMusic=="countryVal" && selectedWeather=="rainVal" && selectedMood=="greatVal"){ 
      $("#playlist").attr("src","https://open.spotify.com/embed/user/1278255944/playlist/78pbcVh3P7V3lsjsxAabUp").toggle(2000).toggle(1000);
    }
    else  if(selectedMusic=="alternativeVal" && selectedWeather=="rainVal" && selectedMood=="greatVal"){ 
      $("#playlist").attr("src","https://open.spotify.com/embed/user/12122337581/playlist/4ywC29onirHuIiCKW0tDrW").toggle(2000).toggle(1000);
    }
    else  if(selectedMusic=="randomVal" && selectedWeather=="rainVal" && selectedMood=="greatVal"){ 
      $("#playlist").attr("src","").toggle(2000).toggle(1000);
    }
  
      //====================ok mood===============================//
    else if(selectedMusic=="rockVal" && selectedWeather=="rainVal" && selectedMood=="okVal"){ 
      $("#playlist").attr("src","https://open.spotify.com/embed/user/12161669117/playlist/3GGq4AgCWovQf9unH4OeLA").toggle(2000).toggle(1000);
    }
    
    else  if(selectedMusic=="hipHopVal" && selectedWeather=="rainVal" && selectedMood=="okVal"){ 
      $("#playlist").attr("src","https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DWT6MhXz0jw61").toggle(2000).toggle(1000);
    }
    
    else  if(selectedMusic=="jazzVal" && selectedWeather=="rainVal" && selectedMood=="okVal"){ 
      $("#playlist").attr("src","https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DX1s9knjP51Oa").toggle(2000).toggle(1000);
    }
    
    else  if(selectedMusic=="electronicaVal" && selectedWeather=="rainVal" && selectedMood=="okVal"){ 
      $("#playlist").attr("src","https://open.spotify.com/embed/user/22d4ad36edipx6lzornmjz3ha/playlist/0OLd6eJuk2KDrbY8FC7rOz").toggle(2000).toggle(1000);
    }
    else  if(selectedMusic=="rbval" && selectedWeather=="rainVal" && selectedMood=="okVal"){ 
      $("#playlist").attr("src","https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DX6ziVCJnEm59").toggle(2000).toggle(1000);
    }
    else  if(selectedMusic=="countryVal" && selectedWeather=="rainVal" && selectedMood=="okVal"){ 
      $("#playlist").attr("src","https://open.spotify.com/embed/user/1215375922/playlist/2Ovyb3slP09vXwDEo0qofp").toggle(2000).toggle(1000);
    }
    else  if(selectedMusic=="alternativeVal" && selectedWeather=="rainVal" && selectedMood=="okVal"){ 
      $("#playlist").attr("src","https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DWUgBy0IJPlHq").toggle(2000).toggle(1000);
    }
    else  if(selectedMusic=="randomVal" && selectedWeather=="rainVal" && selectedMood=="okVal"){ 
      $("#playlist").attr("src","").toggle(2000).toggle(1000);
    }
  
    //================bummed mood==========================//
    else if(selectedMusic=="rockVal" && selectedWeather=="rainVal" && selectedMood=="bummedVal"){ 
      $("#playlist").attr("src","https://open.spotify.com/embed/user/bmo6xqjgu50yfujs7utbqsmsp/playlist/3jxJ5VOEudOS5iWfq27deI").toggle(2000).toggle(1000);
    }
    
    else  if(selectedMusic=="hipHopVal" && selectedWeather=="rainVal" && selectedMood=="bummedVal"){ 
      $("#playlist").attr("src","https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DWSqBruwoIXkA").toggle(2000).toggle(1000);
    }
    
    else  if(selectedMusic=="jazzVal" && selectedWeather=="rainVal" && selectedMood=="bummedVal"){ 
      $("#playlist").attr("src","https://open.spotify.com/embed/user/1233564303/playlist/0NcQtKxtJUS1tzzliuAUzE").toggle(2000).toggle(1000);
    }
    
    else  if(selectedMusic=="electronicaVal" && selectedWeather=="rainVal" && selectedMood=="bummedVal"){ 
      $("#playlist").attr("src","https://open.spotify.com/embed/user/1246052288/playlist/2Vz3YWfo3tOKqKSHIuW322").toggle(2000).toggle(1000);
    }
    else  if(selectedMusic=="rbval" && selectedWeather=="rainVal" && selectedMood=="bummedVal"){ 
      $("#playlist").attr("src","https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DX3YSRoSdA634").toggle(2000).toggle(1000);
    }
    else  if(selectedMusic=="countryVal" && selectedWeather=="rainVal" && selectedMood=="bummedVal"){ 
      $("#playlist").attr("src","https://open.spotify.com/embed/user/128394878/playlist/7kEE6TqULEqEkWETKhXscw").toggle(2000).toggle(1000);
    }
    else  if(selectedMusic=="alternativeVal" && selectedWeather=="rainVal" && selectedMood=="bummedVal"){ 
      $("#playlist").attr("src","https://open.spotify.com/embed/user/pyreflyes/playlist/4BjP3y2GOO8NygO3u55WHB").toggle(2000).toggle(1000);
    }
    else  if(selectedMusic=="randomVal" && selectedWeather=="rainVal" && selectedMood=="bummedVal"){ 
      $("#playlist").attr("src","").toggle(2000).toggle(1000);
    }
   //===============================Thunder===========================================//
   else if(selectedMusic=="rockVal" && selectedWeather=="stormyVal" && selectedMood=="greatVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/sonymusicfinland/playlist/5BygwTQ3OrbiwVsQhXFHMz").toggle(2000).toggle(1000);
  }
  
  else  if(selectedMusic=="hipHopVal" && selectedWeather=="stormyVal" && selectedMood=="greatVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DXdPec7aLTmlC").toggle(2000).toggle(1000);
  }
  
  else  if(selectedMusic=="jazzVal" && selectedWeather=="stormyVal" && selectedMood=="greatVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/1135059712/playlist/57CfuwaT1ERCKrJIcTPL4M").toggle(2000).toggle(1000);
  }
  
  else  if(selectedMusic=="electronicaVal" && selectedWeather=="stormyVal" && selectedMood=="greatVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/cmihran/playlist/4FW02V8r0GQxCAckzGRKl6").toggle(2000).toggle(1000);
  }
  else  if(selectedMusic=="rbval" && selectedWeather=="stormyVal" && selectedMood=="greatVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DX9XIFQuFvzM4").toggle(2000).toggle(1000);
  }
  else  if(selectedMusic=="countryVal" && selectedWeather=="stormyVal" && selectedMood=="greatVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/1278255944/playlist/78pbcVh3P7V3lsjsxAabUp").toggle(2000).toggle(1000);
  }
  else  if(selectedMusic=="alternativeVal" && selectedWeather=="stormyVal" && selectedMood=="greatVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/12122337581/playlist/4ywC29onirHuIiCKW0tDrW").toggle(2000).toggle(1000);
  }
  else  if(selectedMusic=="randomVal" && selectedWeather=="stormyVal" && selectedMood=="greatVal"){ 
    $("#playlist").attr("src","").toggle(2000).toggle(1000);
  }

    //====================ok mood===============================//
  else if(selectedMusic=="rockVal" && selectedWeather=="stormyVal" && selectedMood=="okVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/12161669117/playlist/3GGq4AgCWovQf9unH4OeLA").toggle(2000).toggle(1000);
  }
  
  else  if(selectedMusic=="hipHopVal" && selectedWeather=="stormyVal" && selectedMood=="okVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DWT6MhXz0jw61").toggle(2000).toggle(1000);
  }
  
  else  if(selectedMusic=="jazzVal" && selectedWeather=="stormyVal" && selectedMood=="okVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DX1s9knjP51Oa").toggle(2000).toggle(1000);
  }
  
  else  if(selectedMusic=="electronicaVal" && selectedWeather=="stormyVal" && selectedMood=="okVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/22d4ad36edipx6lzornmjz3ha/playlist/0OLd6eJuk2KDrbY8FC7rOz").toggle(2000).toggle(1000);
  }
  else  if(selectedMusic=="rbval" && selectedWeather=="stormyVal" && selectedMood=="okVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DX6ziVCJnEm59").toggle(2000).toggle(1000);
  }
  else  if(selectedMusic=="countryVal" && selectedWeather=="stormyVal" && selectedMood=="okVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/1215375922/playlist/2Ovyb3slP09vXwDEo0qofp").toggle(2000).toggle(1000);
  }
  else  if(selectedMusic=="alternativeVal" && selectedWeather=="stormyVal" && selectedMood=="okVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DWUgBy0IJPlHq").toggle(2000).toggle(1000);
  }
  else  if(selectedMusic=="randomVal" && selectedWeather=="stormyVal" && selectedMood=="okVal"){ 
    $("#playlist").attr("src","").toggle(2000).toggle(1000);
  }

  //================bummed mood==========================//
  else if(selectedMusic=="rockVal" && selectedWeather=="stormyVal" && selectedMood=="bummedVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/bmo6xqjgu50yfujs7utbqsmsp/playlist/3jxJ5VOEudOS5iWfq27deI").toggle(2000).toggle(1000);
  }
  
  else  if(selectedMusic=="hipHopVal" && selectedWeather=="stormyVal" && selectedMood=="bummedVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DWSqBruwoIXkA").toggle(2000).toggle(1000);
  }
  
  else  if(selectedMusic=="jazzVal" && selectedWeather=="stormyVal" && selectedMood=="bummedVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/1233564303/playlist/0NcQtKxtJUS1tzzliuAUzE").toggle(2000).toggle(1000);
  }
  
  else  if(selectedMusic=="electronicaVal" && selectedWeather=="stormyVal" && selectedMood=="bummedVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/1246052288/playlist/2Vz3YWfo3tOKqKSHIuW322").toggle(2000).toggle(1000);
  }
  else  if(selectedMusic=="rbval" && selectedWeather=="stormyVal" && selectedMood=="bummedVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DX3YSRoSdA634").toggle(2000).toggle(1000);
  }
  else  if(selectedMusic=="countryVal" && selectedWeather=="stormyVal" && selectedMood=="bummedVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/128394878/playlist/7kEE6TqULEqEkWETKhXscw").toggle(2000).toggle(1000);
  }
  else  if(selectedMusic=="alternativeVal" && selectedWeather=="stormyVal" && selectedMood=="bummedVal"){ 
    $("#playlist").attr("src","https://open.spotify.com/embed/user/pyreflyes/playlist/4BjP3y2GOO8NygO3u55WHB").toggle(2000).toggle(1000);
  }
  else  if(selectedMusic=="randomVal" && selectedWeather=="stormyVal" && selectedMood=="bummedVal"){ 
    $("#playlist").attr("src","").toggle(2000).toggle(1000);
  }
     //===============================Cloud===========================================//
     else if(selectedMusic=="rockVal" && selectedWeather=="cloudsVal" && selectedMood=="greatVal"){ 
      $("#playlist").attr("src","https://open.spotify.com/embed/user/sonymusicfinland/playlist/5BygwTQ3OrbiwVsQhXFHMz").toggle(2000).toggle(1000);
    }
    
    else  if(selectedMusic=="hipHopVal" && selectedWeather=="cloudsVal" && selectedMood=="greatVal"){ 
      $("#playlist").attr("src","https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DXdPec7aLTmlC").toggle(2000).toggle(1000);
    }
    
    else  if(selectedMusic=="jazzVal" && selectedWeather=="cloudsVal" && selectedMood=="greatVal"){ 
      $("#playlist").attr("src","https://open.spotify.com/embed/user/1135059712/playlist/57CfuwaT1ERCKrJIcTPL4M").toggle(2000).toggle(1000);
    }
    
    else  if(selectedMusic=="electronicaVal" && selectedWeather=="cloudsVal" && selectedMood=="greatVal"){ 
      $("#playlist").attr("src","https://open.spotify.com/embed/user/cmihran/playlist/4FW02V8r0GQxCAckzGRKl6").toggle(2000).toggle(1000);
    }
    else  if(selectedMusic=="rbval" && selectedWeather=="cloudsVal" && selectedMood=="greatVal"){ 
      $("#playlist").attr("src","https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DX9XIFQuFvzM4").toggle(2000).toggle(1000);
    }
    else  if(selectedMusic=="countryVal" && selectedWeather=="cloudsVal" && selectedMood=="greatVal"){ 
      $("#playlist").attr("src","https://open.spotify.com/embed/user/1278255944/playlist/78pbcVh3P7V3lsjsxAabUp").toggle(2000).toggle(1000);
    }
    else  if(selectedMusic=="alternativeVal" && selectedWeather=="cloudsVal" && selectedMood=="greatVal"){ 
      $("#playlist").attr("src","https://open.spotify.com/embed/user/12122337581/playlist/4ywC29onirHuIiCKW0tDrW").toggle(2000).toggle(1000);
    }
    else  if(selectedMusic=="randomVal" && selectedWeather=="cloudsVal" && selectedMood=="greatVal"){ 
      $("#playlist").attr("src","").toggle(2000).toggle(1000);
    }
  
      //====================ok mood===============================//
    else if(selectedMusic=="rockVal" && selectedWeather=="cloudsVal" && selectedMood=="okVal"){ 
      $("#playlist").attr("src","https://open.spotify.com/embed/user/12161669117/playlist/3GGq4AgCWovQf9unH4OeLA").toggle(2000).toggle(1000);
    }
    
    else  if(selectedMusic=="hipHopVal" && selectedWeather=="cloudsVal" && selectedMood=="okVal"){ 
      $("#playlist").attr("src","https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DWT6MhXz0jw61").toggle(2000).toggle(1000);
    }
    
    else  if(selectedMusic=="jazzVal" && selectedWeather=="cloudsVal" && selectedMood=="okVal"){ 
      $("#playlist").attr("src","https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DX1s9knjP51Oa").toggle(2000).toggle(1000);
    }
    
    else  if(selectedMusic=="electronicaVal" && selectedWeather=="cloudsVal" && selectedMood=="okVal"){ 
      $("#playlist").attr("src","https://open.spotify.com/embed/user/22d4ad36edipx6lzornmjz3ha/playlist/0OLd6eJuk2KDrbY8FC7rOz").toggle(2000).toggle(1000);
    }
    else  if(selectedMusic=="rbval" && selectedWeather=="cloudsVal" && selectedMood=="okVal"){ 
      $("#playlist").attr("src","https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DX6ziVCJnEm59").toggle(2000).toggle(1000);
    }
    else  if(selectedMusic=="countryVal" && selectedWeather=="cloudsVal" && selectedMood=="okVal"){ 
      $("#playlist").attr("src","https://open.spotify.com/embed/user/1215375922/playlist/2Ovyb3slP09vXwDEo0qofp").toggle(2000).toggle(1000);
    }
    else  if(selectedMusic=="alternativeVal" && selectedWeather=="cloudsVal" && selectedMood=="okVal"){ 
      $("#playlist").attr("src","https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DWUgBy0IJPlHq").toggle(2000).toggle(1000);
    }
    else  if(selectedMusic=="randomVal" && selectedWeather=="cloudsVal" && selectedMood=="okVal"){ 
      $("#playlist").attr("src","").toggle(2000).toggle(1000);
    }
  
    //================bummed mood==========================//
    else if(selectedMusic=="rockVal" && selectedWeather=="cloudsVal" && selectedMood=="bummedVal"){ 
      $("#playlist").attr("src","https://open.spotify.com/embed/user/bmo6xqjgu50yfujs7utbqsmsp/playlist/3jxJ5VOEudOS5iWfq27deI").toggle(2000).toggle(1000);
    }
    
    else  if(selectedMusic=="hipHopVal" && selectedWeather=="cloudsVal" && selectedMood=="bummedVal"){ 
      $("#playlist").attr("src","https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DWSqBruwoIXkA").toggle(2000).toggle(1000);
    }
    
    else  if(selectedMusic=="jazzVal" && selectedWeather=="cloudsVal" && selectedMood=="bummedVal"){ 
      $("#playlist").attr("src","https://open.spotify.com/embed/user/1233564303/playlist/0NcQtKxtJUS1tzzliuAUzE").toggle(2000).toggle(1000);
    }
    
    else  if(selectedMusic=="electronicaVal" && selectedWeather=="cloudsVal" && selectedMood=="bummedVal"){ 
      $("#playlist").attr("src","https://open.spotify.com/embed/user/1246052288/playlist/2Vz3YWfo3tOKqKSHIuW322").toggle(2000).toggle(1000);
    }
    else  if(selectedMusic=="rbval" && selectedWeather=="cloudsVal" && selectedMood=="bummedVal"){ 
      $("#playlist").attr("src","https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DX3YSRoSdA634").toggle(2000).toggle(1000);
    }
    else  if(selectedMusic=="countryVal" && selectedWeather=="cloudsVal" && selectedMood=="bummedVal"){ 
      $("#playlist").attr("src","https://open.spotify.com/embed/user/128394878/playlist/7kEE6TqULEqEkWETKhXscw").toggle(2000).toggle(1000);
    }
    else  if(selectedMusic=="alternativeVal" && selectedWeather=="cloudsVal" && selectedMood=="bummedVal"){ 
      $("#playlist").attr("src","https://open.spotify.com/embed/user/pyreflyes/playlist/4BjP3y2GOO8NygO3u55WHB").toggle(2000).toggle(1000);
    }
    else  if(selectedMusic=="randomVal" && selectedWeather=="cloudsVal" && selectedMood=="bummedVal"){ 
      $("#playlist").attr("src","").toggle(2000).toggle(1000);
    }
       //===============================Snow===========================================//
       else if(selectedMusic=="rockVal" && selectedWeather=="snowVal" && selectedMood=="greatVal"){ 
        $("#playlist").attr("src","https://open.spotify.com/embed/user/sonymusicfinland/playlist/5BygwTQ3OrbiwVsQhXFHMz").toggle(2000).toggle(1000);
      }
      
      else  if(selectedMusic=="hipHopVal" && selectedWeather=="snowVal" && selectedMood=="greatVal"){ 
        $("#playlist").attr("src","https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DXdPec7aLTmlC").toggle(2000).toggle(1000);
      }
      
      else  if(selectedMusic=="jazzVal" && selectedWeather=="snowVal" && selectedMood=="greatVal"){ 
        $("#playlist").attr("src","https://open.spotify.com/embed/user/1135059712/playlist/57CfuwaT1ERCKrJIcTPL4M").toggle(2000).toggle(1000);
      }
      
      else  if(selectedMusic=="electronicaVal" && selectedWeather=="snowVal" && selectedMood=="greatVal"){ 
        $("#playlist").attr("src","https://open.spotify.com/embed/user/cmihran/playlist/4FW02V8r0GQxCAckzGRKl6").toggle(2000).toggle(1000);
      }
      else  if(selectedMusic=="rbval" && selectedWeather=="snowVal" && selectedMood=="greatVal"){ 
        $("#playlist").attr("src","https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DX9XIFQuFvzM4").toggle(2000).toggle(1000);
      }
      else  if(selectedMusic=="countryVal" && selectedWeather=="snowVal" && selectedMood=="greatVal"){ 
        $("#playlist").attr("src","https://open.spotify.com/embed/user/1278255944/playlist/78pbcVh3P7V3lsjsxAabUp").toggle(2000).toggle(1000);
      }
      else  if(selectedMusic=="alternativeVal" && selectedWeather=="snowVal" && selectedMood=="greatVal"){ 
        $("#playlist").attr("src","https://open.spotify.com/embed/user/12122337581/playlist/4ywC29onirHuIiCKW0tDrW").toggle(2000).toggle(1000);
      }
      else  if(selectedMusic=="randomVal" && selectedWeather=="snowVal" && selectedMood=="greatVal"){ 
        $("#playlist").attr("src","").toggle(2000).toggle(1000);
      }
    
        //====================ok mood===============================//
      else if(selectedMusic=="rockVal" && selectedWeather=="snowVal" && selectedMood=="okVal"){ 
        $("#playlist").attr("src","https://open.spotify.com/embed/user/12161669117/playlist/3GGq4AgCWovQf9unH4OeLA").toggle(2000).toggle(1000);
      }
      
      else  if(selectedMusic=="hipHopVal" && selectedWeather=="snowVal" && selectedMood=="okVal"){ 
        $("#playlist").attr("src","https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DWT6MhXz0jw61").toggle(2000).toggle(1000);
      }
      
      else  if(selectedMusic=="jazzVal" && selectedWeather=="snowVal" && selectedMood=="okVal"){ 
        $("#playlist").attr("src","https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DX1s9knjP51Oa").toggle(2000).toggle(1000);
      }
      
      else  if(selectedMusic=="electronicaVal" && selectedWeather=="snowVal" && selectedMood=="okVal"){ 
        $("#playlist").attr("src","https://open.spotify.com/embed/user/22d4ad36edipx6lzornmjz3ha/playlist/0OLd6eJuk2KDrbY8FC7rOz").toggle(2000).toggle(1000);
      }
      else  if(selectedMusic=="rbval" && selectedWeather=="snowVal" && selectedMood=="okVal"){ 
        $("#playlist").attr("src","https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DX6ziVCJnEm59").toggle(2000).toggle(1000);
      }
      else  if(selectedMusic=="countryVal" && selectedWeather=="snowVal" && selectedMood=="okVal"){ 
        $("#playlist").attr("src","https://open.spotify.com/embed/user/1215375922/playlist/2Ovyb3slP09vXwDEo0qofp").toggle(2000).toggle(1000);
      }
      else  if(selectedMusic=="alternativeVal" && selectedWeather=="snowVal" && selectedMood=="okVal"){ 
        $("#playlist").attr("src","https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DWUgBy0IJPlHq").toggle(2000).toggle(1000);
      }
      else  if(selectedMusic=="randomVal" && selectedWeather=="snowVal" && selectedMood=="okVal"){ 
        $("#playlist").attr("src","").toggle(2000).toggle(1000);
      }
    
      //================bummed mood==========================//
      else if(selectedMusic=="rockVal" && selectedWeather=="snowVal" && selectedMood=="bummedVal"){ 
        $("#playlist").attr("src","https://open.spotify.com/embed/user/bmo6xqjgu50yfujs7utbqsmsp/playlist/3jxJ5VOEudOS5iWfq27deI").toggle(2000).toggle(1000);
      }
      
      else  if(selectedMusic=="hipHopVal" && selectedWeather=="snowVal" && selectedMood=="bummedVal"){ 
        $("#playlist").attr("src","https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DWSqBruwoIXkA").toggle(2000).toggle(1000);
      }
      
      else  if(selectedMusic=="jazzVal" && selectedWeather=="snowVal" && selectedMood=="bummedVal"){ 
        $("#playlist").attr("src","https://open.spotify.com/embed/user/1233564303/playlist/0NcQtKxtJUS1tzzliuAUzE").toggle(2000).toggle(1000);
      }
      
      else  if(selectedMusic=="electronicaVal" && selectedWeather=="snowVal" && selectedMood=="bummedVal"){ 
        $("#playlist").attr("src","https://open.spotify.com/embed/user/1246052288/playlist/2Vz3YWfo3tOKqKSHIuW322").toggle(2000).toggle(1000);
      }
      else  if(selectedMusic=="rbval" && selectedWeather=="snowVal" && selectedMood=="bummedVal"){ 
        $("#playlist").attr("src","https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DX3YSRoSdA634").toggle(2000).toggle(1000);
      }
      else  if(selectedMusic=="countryVal" && selectedWeather=="snowVal" && selectedMood=="bummedVal"){ 
        $("#playlist").attr("src","https://open.spotify.com/embed/user/128394878/playlist/7kEE6TqULEqEkWETKhXscw").toggle(2000).toggle(1000);
      }
      else  if(selectedMusic=="alternativeVal" && selectedWeather=="snowVal" && selectedMood=="bummedVal"){ 
        $("#playlist").attr("src","https://open.spotify.com/embed/user/pyreflyes/playlist/4BjP3y2GOO8NygO3u55WHB").toggle(2000).toggle(1000);
      }
      else  if(selectedMusic=="randomVal" && selectedWeather=="snowVal" && selectedMood=="bummedVal"){ 
        $("#playlist").attr("src","").toggle(2000).toggle(1000);
      }
      showPlayList();
  //============================


};

// document.getElementById("media-row1").onclick=function(){

//   document.getElementById("media-row").style.display="none";
//   document.getElementById("media-row1").style.display="none";
//   document.getElementById("media-row2").style.display="";

// }

// document.getElementById("media-row2").onclick=function(){
//   document.getElementById("media-row").style.display="";
//   document.getElementById("media-row1").style.display="";
//   document.getElementById("media-row2").style.display="none";

// }


// createPlaylist('mymood', 'My playlist!', { public : false }).then();

//function genPlaylist() {
  //var userPlaylist = $("#returnedPlaylist");
  //musicChoice + wxPref + mood + facialMood = userPlaylist;
//};
//genPlaylist();
});

