var keys = require("./key.js");
var args = process.argv;

function runCommand(command, parameter) {
    switch (command) {
        case "my-tweets":

            callTwitter();
            break;

        case "spotify-this-song":

            callSpotify(parameter);
            break;

        case "movie-this":


            callMovie(parameter);
            break;

        case "do-what-it-says":
            var fs = require("fs");
            fs.readFile("./random.txt", "utf-8", function(error, data) {
                if (error) {
                    return console.log(error);
                }

                var dataArr = data.split(",");
                runCommand(dataArr[0], dataArr[1]);
            });
            break;
    }
}

runCommand(args[2], args[3]);

function callTwitter() {
    var Twitter = require("twitter");
    var Twit = new Twitter(keys);
    var params = {
        screen_name: 'john dev'

    };

    Twit.get('statuses/user_timeline', params, function(err, tweets, response) {
        if (!err && response.statusCode === 200) {} else {
            console.log(err);

        }
           console.log("Your last 20 tweets are: ");
        for (var i = 0; i < tweets.length && i < 20; i++) {
          console.log(tweets[i].text);

        }

    });
}
//the second api code starts here
function callSpotify(song) {
    var song = typeof(song) == 'undefined' || song == '' ? 'ace of base' : song;
    var Spotify = require('node-spotify-api');

    var spotify = new Spotify({
        id: 'ab420633a63b4c788f1a99a2713639b9',
        secret: 'a557d49a33554b15a7eaa338f66bec40'
    });

    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var track = data.tracks.items[0];
        console.log('Artist: ' + track.artists[0].name);
        console.log('Track: ' + track.name);
        console.log('Preview link: ' + track.preview_url);
        console.log('Album: ' + track.album.name);
    });
}

function callMovie(movie) {
    var request = require("request");
    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece";
    console.log(queryUrl);
    request(queryUrl, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          var movieInfo = JSON.parse(body);
            
       console.log('Title:' + movieInfo.Title);
       console.log('Year: ' +  movieInfo.Year);
       console.log('IMDB Rating:' + movieInfo.imdbRating);
       console.log('Rotten Tomatoes Rating:' + movieInfo.Ratings[1].source);
       console.log('Country:' + movieInfo.Country);
       console.log('Language:' + movieInfo.Language);
       console.log('Plot:' + movieInfo.Plot);
       console.log('Actors:' + movieInfo.Actors);
        }

    });
}