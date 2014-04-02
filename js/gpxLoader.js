var GpxLoader = function(path) {
  
  var xhttp = new XMLHttpRequest();
  xhttp.overrideMimeType('text/xml');

  this.onTrackLoaded = function() {};

  this.loadTracks = function(path) {

    xhttp.open('GET', path, false);
    xhttp.send(null);

    var trackList = JSON.parse(xhttp.responseText);

    for (var i = 0; i < trackList.tracks.length; i++) {
      this.loadTrack(trackList.tracks[i]);
    }

  };

  this.loadTrack = function(path) {

    console.log("Loading... " + path);

    xhttp.open('GET', path, false);
    xhttp.send(null);

    var data = JSON.parse(xhttp.responseText);
    var points = data.points;
    var date = points[0][0];

    var line = this.createLine(points);
    line.name = date;

    this.onTrackLoaded(line);

  };


  this.createLine = function(points) {

  };

};