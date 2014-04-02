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

    var material = new THREE.LineBasicMaterial({ color: "white", linewidth: 1 });
    var geometry = new THREE.BufferGeometry();

    geometry.addAttribute( 'position', Float32Array, points.length * 3 * 2, 3 );
    var position = geometry.attributes.position.array;

    var pos = new THREE.Vector3(0,0,0);
    var posOld = new THREE.Vector3(0,0,0);

    var center = new THREE.Vector3(0,0,0);
    center.count = 0;

    var distance;

    var DISTANCE_LIMIT = 3;

    for ( var i = 0; i < points.length; i ++ ) {

      pos.set(points[i][1], 0, points[i][2]);

      distance = pos.clone().sub(posOld).length() * 10;

      if (distance < DISTANCE_LIMIT){
        center.add(pos);
        center.count += 1;
        position[i * 3 * 2 + 0] =  posOld.x;
        position[i * 3 * 2 + 1] =  posOld.y;
        position[i * 3 * 2 + 2] =  posOld.z;
        position[i * 3 * 2 + 3] =  pos.x;
        position[i * 3 * 2 + 4] =  pos.y;
        position[i * 3 * 2 + 5] =  pos.z;
      }

      posOld.copy(pos);

    }

    geometry.computeBoundingSphere();
    geometry.boundingSphere.center.copy(center.multiplyScalar(1/center.count));

    var line = new THREE.Line( geometry, material, THREE.LinePieces );

    return line;

  };

};