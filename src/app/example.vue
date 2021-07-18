<!--  -->
<template>
  <div class="myArea">
    <div
      class="map3dBox cesiumContainer"
      id="cesiumContainer"
      ref="cesiumContainer"
    ></div>
    <div
      class="map3dBox threeContainer"
      id="ThreeContainer"
      ref="threeContainer"
    ></div>
  </div>
  <!-- <div class="map3dBox" ref="cesiumContainer"></div> -->
</template>

<script>
function _3DObject() {
  this.threeMesh = null;
  this.minWGS84 = [115.23, 39.55];
  this.maxWGS84 = [116.23, 41.55];
}

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      dataObj: {},
      minWGS84: [115.23, 39.55],
      maxWGS84: [116.23, 41.55],
      _3Dobjects: [],
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    initCesium(elem) {
      var cesium = {
        viewer: null,
      };
      Cesium.Ion.defaultAccessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4M2MwYWNmNi03MTEyLTQxMTQtODIwNi1hOWMwOGExZDYzMTUiLCJpZCI6MTQ1MzUsImlhdCI6MTYyMTIyMDU3MX0.bsaMILhgDzZp9G23PgL8zaAbWIcqF-NGxDcnolLOhfo";

      cesium.viewer = new Cesium.Viewer(elem, {
        useDefaultRenderLoop: false, //关闭自动渲染
        selectionIndicator: false,
        homeButton: false,
        sceneModePicker: false,
        navigationHelpButton: false,
        animate: false,
        timeline: false,
        fullscreenButton: false,
        navigationInstructionsInitiallyVisible: false,
        allowTextureFilterAnisotropic: false,
        contextOptions: {
          webgl: {
            alpha: false,
            antialias: true,
            preserveDrawingBuffer: true,
            failIfMajorPerformanceCaveat: false,
            depth: true,
            stencil: false,
            anialias: false,
          },
        },
        targetFrameRate: 60,
        resolutionScale: 0.1,
        orderIndependentTranslucency: true,
        // creditContainer:"CreditDisplay",
        // imageeryProvider: googlemap,   //谷歌地图
        baseLayerPicker: true,
        geocoder: false,
        automaticallyTrackDataSourceClocks: false,
        dataSources: null,
        clock: null,
        terrainShadows: Cesium.ShadowMode.DISABLED,
      });
      var center = Cesium.Cartesian3.fromDegrees(
        (this.minWGS84[0] + this.maxWGS84[0]) / 2,
        (this.minWGS84[1] + this.maxWGS84[1]) / 2 - 1,
        200000
      );
      cesium.viewer.camera.flyTo({
        destination: center,
        orientation: {
          heading: Cesium.Math.toRadians(0),
          pitch: Cesium.Math.toRadians(-60),
          roll: Cesium.Math.toRadians(0),
        },
        duration: 3,
      });
      this.center = center;
      return cesium;
    },
    initThree() {
      var three = {
        renderer: null,
        camera: null,
        scene: null,
      };

      let fov = 45;
      let width = window.innerWidth;
      let height = window.innerHeight;
      let aspect = width / height;
      let near = 1;
      let far = 10 * 1000 * 1000; // needs to be far to support Cesium's world-scale rendering
      three.scene = new THREE.Scene();
      three.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      three.renderer = new THREE.WebGLRenderer({
        alpha: true,
      });
      // let axis=new THREE.AxesHelper(1000*1000*1000);
      // three.scene.add(axis);
      this.threeContainer.appendChild(three.renderer.domElement);
      return three;
    },
    toVector3(pos, r) {
      var rad = r > 1 ? r : 655000;
      var lon = pos.lon;
      var lat = pos.lat;
      var phi = +(90 - lat) * 0.01745329252;
      var the = +(180 - lon) * 0.01745329252;
      var center = new THREE.Vector3();
      center.x = Math.sin(the) * Math.sin(phi) * -1;
      center.y = Math.cos(phi);
      center.z = Math.cos(the) * Math.sin(phi);
      if (r >= 1) center.multiplyScalar(rad);
      return center;
    },
    init3DObject(cesium, three) {
      this._3Dobjects = [];
      var minWGS84 = this.minWGS84;
      var maxWGS84 = this.maxWGS84;
      //Cesium entity
      let entity = {
        name: "Polygon",
        polygon: {
          hierarchy: Cesium.Cartesian3.fromDegreesArray([
            minWGS84[0],
            minWGS84[1],
            maxWGS84[0],
            minWGS84[1],
            maxWGS84[0],
            maxWGS84[1],
            minWGS84[0],
            maxWGS84[1],
          ]),
          material: Cesium.Color.RED.withAlpha(0.1),
        },
      };
      let Polypon = cesium.viewer.entities.add(entity);

      for (var key in Map3dData) {
        var vertices = Map3dData[key].vertices;
        var polygons = Map3dData[key].polygons;
        for (var i = 0, len = polygons.length; i < len; i++) {
          var polyWithHoles = polygons[i];
          var polygonOrHole = polyWithHoles[0];
          var pl = polygonOrHole.length;
          for (var j = 0, jl = pl; j < jl; j++) {
            var start = polygonOrHole[0];
            i === 0
              ? polygonOrHole.push(polygonOrHole[j] + pl)
              : (j === 0
                  ? (polygonOrHole[j] *= 2)
                  : (polygonOrHole[j] += start / 2),
                polygonOrHole.push(polygonOrHole[j] + pl));
          }
        }
        for (var i = 0, len = polygons.length; i < len; i++) {
          var control = {
            from: [0, 0, 0],
            material: "LineBasicMaterial",
            materialParam: {
              shader: {
                color: 0xffffff,
                transparent: true,
              },
            },
            geometry: "Geometry",
            geometryParam: [],
            objectType: "Line",
          };
          var polyWithHoles = polygons[i];
          var polygonOrHole = polyWithHoles[0];
          var cps;
          for (var k = 0; k < polygonOrHole.length; k += 2) {
            var d = polygonOrHole[k];
            var e = polygonOrHole[k + 1];
            var lon = vertices[d];
            var lat = vertices[e];
            var vec3 = this.toVector3({
              lon: lon,
              lat: lat,
            });
            if (k === 0) {
              cps = this.toVector3({
                lon: lon,
                lat: lat,
              });
            }
            control.geometryParam.push(vec3);
          }
          control.geometryParam.push(cps); //添加起始点，关闭路径
          this.addObject(control);
        }
      }

      // var geometry = new THREE.SphereGeometry(1, 32, 32);
      // let sphere = new THREE.Mesh(
      //   geometry,
      //   new THREE.MeshPhongMaterial({
      //     color: 0xffffff,
      //     side: THREE.DoubleSide,
      //   })
      // ); //12面体
      // // sphere.scale.set(5000,5000,5000);
      // // sphere.position.z+=15000;
      // // translate "up" in Three.js space so the "bottom" of the mesh is the handle
      // var ce = this.center;
      // sphere.scale.set(5000, 5000, 5000);
      // sphere.uuid = "sphere";
      // var sphereYup = new THREE.Group();
      // sphereYup.add(sphere);
      // three.scene.add(sphereYup); // don’t forget to add it to the Three.js scene manually
      // sphereYup.position.set(ce.x, ce.y, ce.z);
      // var _3DOB = new _3DObject();
      // _3DOB.threeMesh = sphereYup;
      // _3DOB.minWGS84 = minWGS84;
      // _3DOB.maxWGS84 = maxWGS84;
      // this._3Dobjects.push(_3DOB);
      // geometry = new THREE.DodecahedronGeometry();
      // let dodecahedronMesh = new THREE.Mesh(
      //   geometry,
      //   new THREE.MeshNormalMaterial()
      // ); //12面体
      // dodecahedronMesh.scale.set(5000, 5000, 5000);
      // dodecahedronMesh.position.z += 15000;
      // // translate "up" in Three.js space so the "bottom" of the mesh is the handle
      // dodecahedronMesh.rotation.x = Math.PI / 2; // rotate mesh for Cesium's Y-up system
      // dodecahedronMesh.uuid = "12面体";
      // var dodecahedronMeshYup = new THREE.Group();
      // dodecahedronMeshYup.add(dodecahedronMesh);
      // three.scene.add(dodecahedronMeshYup); // don’t forget to add it to the Three.js scene manually
      // dodecahedronMeshYup.position.set(ce.x, ce.y, ce.z);
      // //    Assign Three.js object mesh to our object array
      // _3DOB = new _3DObject();
      // _3DOB.threeMesh = dodecahedronMeshYup;
      // _3DOB.minWGS84 = minWGS84;
      // _3DOB.maxWGS84 = maxWGS84;
      // this._3Dobjects.push(_3DOB);

      //添加灯光
      //添加点光源
      var spotLight = new THREE.SpotLight(0xffffff);
      spotLight.position.set(0, 0, 50000);
      spotLight.castShadow = true; //设置光源投射阴影
      spotLight.intensity = 1;
      // sphereYup.add(spotLight);
      //添加环境光
      var hemiLight = new THREE.HemisphereLight(0xff0000, 0xff0000, 1);
      // sphereYup.add(hemiLight);

      var cartToVec = function (cart) {
        return new THREE.Vector3(cart.x, cart.y, cart.z);
      };
      // // Configure Three.js meshes to stand against globe center position up direction
      for (var id = 0; id < this._3Dobjects.length; id++) {
        minWGS84 = this._3Dobjects[id].minWGS84;
        maxWGS84 = this._3Dobjects[id].maxWGS84;
        // convert lat/long center position to Cartesian3
        var center = Cesium.Cartesian3.fromDegrees(
          (minWGS84[0] + maxWGS84[0]) / 2,
          (minWGS84[1] + maxWGS84[1]) / 2
        );

        // get forward direction for orienting model
        var centerHigh = Cesium.Cartesian3.fromDegrees(
          (minWGS84[0] + maxWGS84[0]) / 2,
          (minWGS84[1] + maxWGS84[1]) / 2,
          1
        );

        // use direction from bottom left to top left as up-vector
        var bottomLeft = cartToVec(
          Cesium.Cartesian3.fromDegrees(minWGS84[0], minWGS84[1])
        );
        var topLeft = cartToVec(
          Cesium.Cartesian3.fromDegrees(minWGS84[0], maxWGS84[1])
        );
        var latDir = new THREE.Vector3()
          .subVectors(bottomLeft, topLeft)
          .normalize();

        // configure entity position and orientation
        this._3Dobjects[id].threeMesh.position.copy(center);
        this._3Dobjects[id].threeMesh.lookAt(centerHigh);
        this._3Dobjects[id].threeMesh.up.copy(latDir);
      }
    },
    renderCesium() {
      this.cesium.viewer.render();
    },
    renderThreeObj() {
      var three = this.three;

      var width = this.threeContainer.clientWidth;
      var height = this.threeContainer.clientHeight;
      three.renderer.setSize(width, height);
      three.renderer.render(three.scene, three.camera);
    },
    renderCamera() {
      var three = this.three;
      var cesium = this.cesium;
      // register Three.js scene with Cesium
      three.camera.fov = Cesium.Math.toDegrees(
        cesium.viewer.camera.frustum.fovy
      ); // ThreeJS FOV is vertical
      three.camera.updateProjectionMatrix();

      // Clone Cesium Camera projection position so the
      // Three.js Object will appear to be at the same place as above the Cesium Globe

      three.camera.matrixAutoUpdate = false;
      var cvm = cesium.viewer.camera.viewMatrix;
      var civm = cesium.viewer.camera.inverseViewMatrix;
      three.camera.matrixWorld.set(
        civm[0],
        civm[4],
        civm[8],
        civm[12],
        civm[1],
        civm[5],
        civm[9],
        civm[13],
        civm[2],
        civm[6],
        civm[10],
        civm[14],
        civm[3],
        civm[7],
        civm[11],
        civm[15]
      );
      three.camera.matrixWorldInverse.set(
        cvm[0],
        cvm[4],
        cvm[8],
        cvm[12],
        cvm[1],
        cvm[5],
        cvm[9],
        cvm[13],
        cvm[2],
        cvm[6],
        cvm[10],
        cvm[14],
        cvm[3],
        cvm[7],
        cvm[11],
        cvm[15]
      );
      three.camera.lookAt(new THREE.Vector3(0, 0, 0));

      var width = this.threeContainer.clientWidth;
      var height = this.threeContainer.clientHeight;
      var aspect = width / height;
      three.camera.aspect = aspect;
      three.camera.updateProjectionMatrix();
    },
    initMap() {
      this.cesiumContainer = this.$refs.cesiumContainer;
      this.cesium = this.initCesium(this.cesiumContainer);

      this.threeContainer = this.$refs.threeContainer;
      this.three = this.initThree(this.threeContainer);

      this.init3DObject(this.cesium, this.three, this._3Dobjects);
      this.loop();
    },
    loop() {
      var _self = this;
      requestAnimationFrame(function () {
        _self.loop();
      });
      this.renderCesium();
      this.renderThreeObj();
      this.renderCamera();
    },
    addObject(d) {
      var _self = this;
      this.initObject(d, function (mesh, control) {
        _self.three.scene.add(mesh);
        // mesh.scale.multiplyScalar(2500000);
        var _3DOB = new _3DObject();
        _3DOB.threeMesh = mesh;
        // _3DOB.minWGS84 = _self.minWGS84;
        // _3DOB.maxWGS84 = _self.maxWGS84;
        _3DOB.minWGS84 = 0;
        _3DOB.maxWGS84 = 0;
        _self._3Dobjects.push(_3DOB);
        // var ce = _self.center;
        // mesh.position.set(0, 0, 0);
        // mesh.position.z = 0;
      });
    },
    updateObject(control) {},
    createObject(control, callback) {
      control.objectType = control.objectType || "Mesh";
      if (
        control.material.constructor.name === "Array" &&
        control.geometry &&
        control.material
      ) {
        control.object =
          control.object ||
          THREE.SceneUtils.createMultiMaterialObject(
            control.geometry,
            control.material
          );
      } else if (control.objectType === "Sprite" && control.material) {
        control.object = new THREE.Sprite(control.material);
      } else if (control.geometry && control.material) {
        control.object =
          control.object ||
          new THREE[control.objectType](control.geometry, control.material);
      } else {
        console.log("Some params is not complete");
      }
      if (typeof callback === "function") {
        callback(control.object, control);
      }
      control.object.userData = control.options;

      var _self = this;
      control.dismiss = function () {
        var t = this.parent || _self.scene;
        t.remove(this.object);
        if (this.object) {
          this.object.geometry && this.object.geometry.dispose();
          this.texture && this.texture.dispose && this.texture.dispose();
          this.object.material.dispose();
        }
        this.object = null;
      };
      control.options = control.options || {};
      control.options.time = new Date().getTime();
      control.options.count = 0;
      if (control.options.duration) {
        control.options.step = 1 / control.options.duration;
        control.options.t = 1 / control.options.duration;
      }
      var _self = this;
      if (!control.isStatic) {
        control.update = function () {
          if (typeof this.animate === "function") {
            this.animate();
          }
          _self.updateObject(this);
          if (this.options.scale) {
            this.object.scale.set(
              this.options.scale.x,
              this.options.scale.y,
              this.options.scale.z
            );
          }

          if (control.objectType !== "Line") {
            this.object.position.set(this.pos.x, this.pos.y, this.pos.z);
          }

          if (this.options.t && this.options.step) {
            this.options.t += this.options.step;
          }
          this.options.count++;
        };
      }
    },
    initMaterialParam(type, param, options) {
      param.shader = param.shader || {};
      if (typeof param.texture === "string") {
        if (!this.texture[param.texture]) {
          this.texture[param.texture] = new THREE.TextureLoader().load(
            param.texture
          );
        }
        param.texture = this.texture[param.texture];
      } else if (typeof param.texture === "function") {
        var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");
        param.texture(context, canvas, options);
        param.texture = new THREE.Texture(canvas);
      } else {
      }

      if (param.textureParam) {
        for (var k in param.textureParam) {
          if (k === "repeat") {
            param.texture.repeat.set(
              param.textureParam[k][0],
              param.textureParam[k][1]
            );
          } else {
            param.texture[k] = param.textureParam[k];
          }
        }
      }

      if (param.texture) {
        if (type === "ShaderMaterial") {
          param.shader.uniforms.tMatCap.value = param.texture;
        } else {
          param.shader.map = param.texture;
        }
      }

      if (THREE[type]) {
        var m = new THREE[type](param.shader);
      } else {
        var m = null;
        console.log("not support the material: " + type);
      }
      return m;
    },
    initMaterial(control) {
      if (
        control.materialParam &&
        control.materialParam.constructor.name === "Array"
      ) {
        control.material = [];
        for (var i = 0; i < control.materialParam.length; i++) {
          var type = control.materialParam[i].type || control.material;
          var m = this.initMaterialParam(
            type,
            control.materialParam[i],
            control.options
          );
          control.material.push(m);
        }
      } else if (typeof control.material === "string") {
        var type = control.material;
        control.material = this.initMaterialParam(
          type,
          control.materialParam,
          control.options
        );
      } else {
      }
    },
    initPosition(control) {
      if (
        control.from &&
        control.from.constructor.name === "Array" &&
        control.from.length === 3
      ) {
        control.base = [control.from[0], control.from[1], control.from[2]];
        control.pos = [control.from[0], control.from[1], control.from[2]];
      } else {
        control.loc = control.loc || {
          lon: control.from.lon,
          lat: control.from.lat,
        };
        control.base = this.toVector3(control.loc, 1);
        control.pos = control.pos || this.toVector3(control.loc, 1);
      }

      if (
        control.to &&
        control.from.constructor.name === "Array" &&
        control.from.length === 3
      ) {
        control.target = [control.to[0], control.to[1], control.to[2]];
      } else if (control.to) {
        control.target =
          control.target ||
          this.toVector3(
            {
              lon: control.to.lon,
              lat: control.to.lat,
            },
            1
          );
      } else {
      }
    },
    initObject(control, callback) {
      this.initMaterial(control);
      this.initPosition(control);
      if (typeof control.geometry === "string") {
        var type = control.geometry;
        if (THREE[control.geometry]) {
          if (control.geometry !== "Geometry") {
            control.geometry = new THREE[type](
              control.geometryParam[0],
              control.geometryParam[1],
              control.geometryParam[2],
              control.geometryParam[3],
              control.geometryParam[4]
            );
          } else {
            control.geometry = new THREE[type]();
            control.geometry.vertices = control.geometryParam;
          }
        } else {
          control.geometry = new window[type](
            control.geometryParam[0],
            control.geometryParam[1],
            control.geometryParam[2],
            control.geometryParam[3],
            control.geometryParam[4]
          );
        }
        this.createObject(control, callback);
      } else if (control.geometryLoader && THREE[control.geometryLoader]) {
        var _self = this;
        var callback = callback;
        var loader = new THREE[control.geometryLoader]();
        loader.load(control.geometry, function (e) {
          geometry = e;
          geometry.center();
          geometry.computeVertexNormals(
            control.geometryParam[0],
            control.geometryParam[1],
            control.geometryParam[2]
          );
          _self.createObject(control, callback);
        });
      } else {
        this.createObject(control, callback);
      }
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.initMap();
  },
};
</script>
<style scoped>
.myArea {
  height: 100%;
  width: 100%;
  margin: 0;
  overflow: hidden;
  padding: 0;
  background: #000;
}
.map3dBox {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  margin: 0;
  overflow: hidden;
  padding: 0;
  pointer-events: auto !important;
}
.threeContainer {
  pointer-events: none !important;
}
</style>
