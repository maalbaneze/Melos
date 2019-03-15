// Spotify Key:0bd8c45ee4a54a3284777c3388b01d7e
// URL:http://open.spotify.com















// Weather Key:8caea81085fc66df0fb0c7d61c6772b8
//                URL: api.openweathermap.org
//======================variable====================//





















//=================EVent Listener======================//




    

// Napster Key:NWU1NWM2ODEtZjU1Yi00NjI2LWFmMGUtMTA3YjJmNmY4OGIx
//        URL: api.napster.com
// Weather Key:8caea81085fc66df0fb0c7d61c6772b8
//         URL: api.openweathermap.org
// Giphy Key: i5u86hxDFgUmIDDbuFDZ6vsL4wBLI8B6
//      URL: api.giphy.com
$( document ).ready(function(){
    var config = {
        apiKey: "AIzaSyBFvIwDGuvgIoxHnmSgUzbAmzW8gvpnxKo",
        authDomain: "melos-71bca.firebaseapp.com",
        databaseURL: "https://melos-71bca.firebaseio.com",
        projectId: "melos-71bca",
        storageBucket: "melos-71bca.appspot.com",
        messagingSenderId: "197405510515"
      };
      firebase.initializeApp(config);
    

//=====================AJAX Setup=========================//

$('#submit-zip').on('click', function(){
var zipCode = $("#postal-code").val().trim();
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?zip="+ zipCode +",us&appid=8caea81085fc66df0fb0c7d61c6772b8"
$.ajax({
    url: queryURL,
    method: "GET",


}).then(function (response) {
    console.log(response)
})


    
    console.log(zipCode)
})


    
        //store weather data locally using firebase
        $(".btn-primary").on("click", function(event){


            event.preventDefault();
            var zipCode = $("#postal-code").val();
            $("#postal-code").html("")
            localStorage.clear();
            localStorage.setItem("zipcode", zipCode);
            
        });
        //hit spotify api
        //GET user authentication
        //hit face recog
        //store data locally
        //recommend music based on 3 data inputs
    })
