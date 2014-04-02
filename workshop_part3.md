# Resonate 2014 Workshop

**Resources:**  
[Learning WebGL](http://learningwebgl.com/blog/?page_id=1217)  
[Three.js](http://threejs.org/)  
[Polymer Project](http://www.polymer-project.org/)

#### Setting up three.js
```javascript
renderer = new THREE.WebGLRenderer();  
camera = new THREE.PerspectiveCamera(65, 1, 0.1, 1000);  
scene = new THREE.Scene();  
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