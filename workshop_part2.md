## Adding polymer to the mix
Before accessing any polymer.js elements, make sure polymer is ready. You can do that by wrapping your application in a polymer element or waiting for a polymer-ready event to fire
```javascript
window.addEventListener('polymer-ready', function(){
  // do stuff with polymer here
});
```
After you create the renderer you have to add the canvas element to the document manually:
```javascript
document.body.appendChild(renderer.domElement);
```
#### Helper functions
The following code will resize the canvas to full window size and update the camera matrix accordingly.
The render loop should use `requestAnimationFrame` method to make sure the rendering is in sync with browser's rendering cycle.
```javascript
var resize = function() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = (window.innerWidth / window.innerHeight);
  camera.updateProjectionMatrix();
};

var render = function() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
};
```
#### Adding objects to the scene
Look up source for all [geometries](https://github.com/mrdoob/three.js/tree/master/src/extras/geometries), [materials](https://github.com/mrdoob/three.js/tree/master/src/materials) and [lights](https://github.com/mrdoob/three.js/tree/master/src/lights)
```javascript
var sphere = new THREE.Mesh(
  new THREE.SphereGeometry(1,12, 12),
  new THREE.MeshBasicMaterial({color: "red"})
);
scene.add(sphere);
```

