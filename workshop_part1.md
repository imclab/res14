#### Setting up three.js
```javascript
renderer = new THREE.WebGLRenderer();  
camera = new THREE.PerspectiveCamera(65, 1, 0.1, 1000);  
scene = new THREE.Scene();  
```
After you create the renderer you have to add the canvas element to the document manually:
```javascript
document.body.appendChild(renderer.domElement);
```
#### Helper functions
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
