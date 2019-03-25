# Melos
Project #1

Project Title:  Melos

Team Members: Kenus, Phi-Hai, Dennis, Michael

Project Description: An app for finding the right music based on a user’s music preferences, mood, and the weather.  

APIs: 
  Spotify for music playlists
  OpenWeatherMap for weather 
  MS Azure (facial mood recognition API as the new technology)
  Firebase for database to record data 

MVP (minimum viable product)
  Idea: web app, but mobile capable
  Target Audience: Music lovers; those who like to work to music
  Problem: Random music players have nothing to do with a person’s current music mood.  The weather can be a key factor       affecting our mood (especially our negative moods).  
  Goal: functional app with a reasonable output for any user

User Stories: New user logs on and fills in basic preference info about themselves and the music genres they prefer, and what weather inputs they have (likes/dislikes), then their info is saved.  User then inputs their current mood and location, which pulls weather from the API.  The user can also take a picture of themselves  as a way to verify mood.  This picture is ent to MA Azure API for analysis, which is then fed into process of determining correct playlist for the user.  The app hits the music server via API and returns a playlist for the user.  User can then play the playlist.

Nice-To-Haves: Add another user input and/or API input to the algorithm; link to a paid music service  

Deployed link: https://maalbaneze.github.io/Melos/
