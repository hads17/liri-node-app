var keys = require('./keys.js');
var commandInput = process.argv

var command = commandInput[2];
var command2 = commandInput[3]

var randomArray = [];

if(command === 'my-tweets'){
    twitterFunc();
} else if(command === 'spotify-this-song'){
    spotifyFunc();
} else if(command === 'movie-this'){
    movieFunc();
} else if(command === 'do-what-it-says'){
    saysFunc();
}else{
    console.log('this is not a command');
}

// Twitter function
function twitterFunc(){
    var Twitter = require('twitter');

    var keyList = keys.twitterKeys;

    var param = {
        q: 'BradleyCoding',
        result_type: 'recent',
        count: 20,
    };

    var client = new Twitter(keyList);

    client.get('search/tweets', param, function(error, tweets, response){
        var tweetsArray = tweets.statuses;

        tweetsArray.forEach(function(output){
            console.log(output.text);
            console.log('------------------');
        });
        
        if(error){
            console.log(error);
        }
    });
};

// Spotify function
function spotifyFunc(){
    var Spotify = require('node-spotify-api');

    var keyList = keys.spotifyKeys

    var spotify = new Spotify(keyList);

    if(command2){
        spotify.search({ type: 'track', query: command2, limit: 5 }, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            var items = data.tracks.items
            items.forEach(function(output){
                console.log('Artist(s): ' + output.artists[0].name);
                console.log('Song Title: ' + output.name);
                console.log('Preview URL: ' + output.preview_url);
                console.log('Album Name: ' + output.album.name)
                console.log('------------------');
            });
            // console.log('artists property:' + JSON.stringify(items[1].artists[0].name, null, 2));
        });
    } else{
        spotify.search({ type: 'track', query: 'the sign', limit: 5 }, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            var items = data.tracks.items
            items.forEach(function(output){
                console.log('Artist(s): ' + output.artists[0].name);
                console.log('Song Title: ' + output.name);
                console.log('Preview URL: ' + output.preview_url);
                console.log('Album Name: ' + output.album.name)
                console.log('------------------');
            });
        });
    }
};

// movie function
function movieFunc(){
    var request = require('request');

    request.get("http://www.omdbapi.com/?t=" + command2 + "&y=&plot=short&apikey=40e9cece", function(error, response, body){
        // console.log(body)
        var movie = JSON.parse(body);
        console.log('Title: ' + movie.Title);
        console.log('Year: ' + movie.Year);
        console.log('IMDB Rating: ' + movie.iomdbRating);
        movie.Ratings.forEach(function(output){
            if(output.Source === 'Rotten Tomatoes'){
                console.log(output.Value);
            }
        });
        console.log('Country: ' + movie.Country);
        console.log('Language: ' + movie.Language);
        console.log('Plot: ' + movie.Plot);
        console.log('Actors: ' + movie.Actors);

    });
};

// says function
function saysFunc(){
    var fs = require('fs');
    
    fs.readFile('random.text', 'utf8', function(err, data){
        if(err){
            return console.log(err);
        }

        dataArray = data.split(',');

        dataArray.forEach(function(output){
            randomArray.push(output);
        });

        command2 = randomArray[2]

        console.log(randomArray);
        console.log(randomArray[0]);
        console.log(randomArray[1]);

        if(randomArray[0] === 'my-tweets'){
            twitterFunc();
        } else if(randomArray[0] === 'spotify-this-song'){
            spotifyFunc();
        } else if(randomArray[0] === 'movie-this'){
            movieFunc();
        } else{
            console.log('this is not a command');
        }
        
    });
};