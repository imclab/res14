(function(){

  var scope;

  var renderer = new THREE.WebGLRenderer({antialias: false, devicePixelRatio: 1});
  var camera = new THREE.PerspectiveCamera(65, 1, 0.1, 1000);
  var scene = new THREE.Scene();
  
  Polymer('main-app', {
    ready: function() {

      scope = this;

      this.appendChild(renderer.domElement);

      this.addEventListener('three-attribute-changed', function(event){
        if (event.detail.attribute == 'selected') {
          if (event.detail.object && event.detail.object.selected) {
            scope.$.attributes.model = event.detail.object;
          } else {
            scope.$.attributes.model = {};
          }
        }
      });

      window.addEventListener('resize', this.resize);

      camera.position.set(3,3,3);
      camera.lookAt(new THREE.Vector3(0,0,0));

      var obj0 = new THREE.Mesh(new THREE.CubeGeometry(1,1,1));
      var obj1 = new THREE.Mesh(new THREE.CubeGeometry(1,1,1));
      var obj2 = new THREE.Mesh(new THREE.CubeGeometry(1,1,1));
      var obj3 = new THREE.Mesh(new THREE.CubeGeometry(1,1,1));
      var obj4 = new THREE.Mesh(new THREE.CubeGeometry(1,1,1));

      obj0.name = 'object_obj0';
      obj1.name = 'object_obj1';
      obj2.name = 'object_obj2';
      obj3.name = 'object_obj3';
      obj4.name = 'object_obj4';

      obj0.add(obj1);
      obj0.add(obj2);
      obj2.add(obj3);
      obj3.add(obj4);
      scene.add(obj0);

      this.$.outliner.scene = scene;

      this.$.controls.domElement = renderer.domElement;
      this.$.controls.camera = camera;
      this.$.controls.scene = scene;

      scene.add(camera);
      
      this.resize();
      this.render();
    },
    resize: function() {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = (window.innerWidth / window.innerHeight);
      camera.updateProjectionMatrix();
    },
    render: function() {
      requestAnimationFrame(scope.render);
      renderer.render(scene, camera);
    }

  });

})();