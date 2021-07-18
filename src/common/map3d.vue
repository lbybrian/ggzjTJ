<template>
  <div ref="map3dItem" class="mapArea"></div>
</template>

<script>
webCpu.componentPath = "static/plugin/transweb/components";

export default {
  name: "",
  mounted() {
    this.$nextTick(() => {
      var elem = this.$refs.map3dItem;
      webCpu.updateView(elem, this.option);
    });
  },
  data() {
    return {
      option: {
        className: "Map3D",
        cardName: "Map3dTask",
        task: {
          count: 1,
          colors: [0xffdd00, 0xddff00, 0xdd00ff, 0x00ffdd, 0x00ddff, 0xff00dd],
          visitLine: {
            objectType: "Line",
            material: "LineBasicMaterial",
            materialParam: {
              shader: {
                color: 0xffff00,
              },
            },
            geometry: "Geometry",
            geometryParam: [],
            options: {
              duration: 20,
            },
            animate: function () {
              if (!this.options.cPos) {
                var r = Math.sqrt(
                  this.base.x * this.base.x +
                    this.base.y * this.base.y +
                    this.base.z * this.base.z
                );
                this.options.cPos = this.options.cPos || {
                  x: ((r + 20) * this.base.x) / r,
                  y: ((r + 20) * this.base.y) / r,
                  z: ((r + 20) * this.base.z) / r,
                };
              }
              if (!this.shape) {
                this.shape = [
                  new THREE.Vector3(this.base.x, this.base.y, this.base.z),
                ];
                for (
                  var t = 1 / this.options.duration;
                  t < 1.05;
                  t += 1 / (this.options.duration * 3)
                ) {
                  var x =
                    (1 - t) * (1 - t) * this.pos.x +
                    2 * t * (1 - t) * this.options.cPos.x +
                    t * t * this.target.x;
                  var y =
                    (1 - t) * (1 - t) * this.pos.y +
                    2 * t * (1 - t) * this.options.cPos.y +
                    t * t * this.target.y;
                  var z =
                    (1 - t) * (1 - t) * this.pos.z +
                    2 * t * (1 - t) * this.options.cPos.z +
                    t * t * this.target.z;
                  this.shape.push(new THREE.Vector3(x, y, z));
                }
              }
              var v = this.options.count;
              if (v < this.options.duration + 1) {
                this.geometryParam = this.shape.slice(0, v * 3);
              } else {
                this.exit = true;
              }
            },
          },
          srcObject: {
            objectType: "Sprite",
            material: "SpriteMaterial",
            materialParam: {
              shader: {
                color: 0xffff00,
              },
              texture: "view/images/spark.png",
            },
            options: {
              duration: 50,
            },
            animate: function () {
              var v = this.options.count;
              if (v < this.options.duration) {
                this.options.scale = {
                  x: (v % 10) + 5,
                  y: (v % 10) + 5,
                  z: (v % 10) + 5,
                };
              } else {
                this.exit = true;
              }
            },
          },
          dstObject: {
            objectType: "Sprite",
            material: "SpriteMaterial",
            materialParam: {
              shader: {
                color: 0xffffff,
              },
              texture: "view/images/spark.png",
            },
            options: {
              duration: 80,
            },
            animate: function () {
              var v = this.options.count;
              if (v < this.options.duration) {
                this.options.scale = {
                  x: (v % 15) + 5,
                  y: (v % 15) + 5,
                  z: (v % 15) + 5,
                };
              } else {
                this.exit = true;
              }
            },
          },
          eventObject: {
            objectType: "Sprite",
            material: "SpriteMaterial",
            materialParam: {
              shader: {
                color: 0xffffff,
              },
              texture: "view/images/spark.png",
            },
            options: {
              duration: 80,
            },
            animate: function () {
              var v = this.options.count;
              if (v < this.options.duration) {
                this.options.scale = {
                  x: (v % 15) + 5,
                  y: (v % 15) + 5,
                  z: (v % 15) + 5,
                };
              } else {
                this.exit = true;
              }
            },
          },
          eventPromise: {
            mousemove: {
              callback: function (e, objects, task) {
                if (objects[0].distance > 600) {
                  this.miss(e, task);
                  return;
                }

                if (task.currentObject !== objects[0].object) {
                  if (task.currentObject && task.currentObject.material) {
                    task.currentObject.material.needsUpdate = true;
                    task.currentObject.material = task.basicMaterial;
                  }
                  objects[0].object.material.needsUpdate = true;
                  objects[0].object.material = task.hlMaterial;
                  task.currentObject = objects[0].object;
                }
                //document.body.style.cursor = "hand";

                var props = {
                  width: objects[0].object.userData.cityName.length * 15 + 5,
                  height: 26,
                };
                props.top = e.clientY - props.height - 8;
                props.left = e.clientX - props.width / 2;

                return false;
              },
              groups: ["mapArea"],
              miss: function (e, task) {
                document.body.style.cursor = "default";
                if (task.currentObject && task.currentObject.material) {
                  task.currentObject.material.needsUpdate = true;
                  task.currentObject.material = task.basicMaterial;
                }
                // $("#tPopupDialog").hide();
                task.currentObject = null;
              },
            },
            click: {
              callback: function (e, objects, task) {},
              groups: ["masterRole", "client"],
              miss: function (e, task) {},
            },
            mouseleave: {
              callback: function (e, objects, task) {},
              groups: ["masterRole"],
              miss: function (e, task) {},
            },
          },
          addObject: function (data, color) {
            if (this.inactive === 0) {
              if (typeof this.initData === "function") {
                var data = this.transformData(data);
                this.task.control = this.initData(data, 200);
              }
            }
          },
          rtUpdateCard: function (data, color) {
            if (this.inactive === 0) {
              if (typeof this.task.initData === "function") {
                var data = this.transformData(data.data);
                this.control = this.initData(data, 50);
              }
            }
          },
          transformData: function (data) {
            var ret = [];
            var color = this.colors[this.count % this.colors.length];
            if (data.src) {
              var circle1 = WebTool.copyObject(this.srcObject);
              circle1.from =
                typeof data.src === "string"
                  ? data.src
                  : {
                      lat: data.src.geo.latitude,
                      lon: data.src.geo.longitude,
                    };
              circle1.materialParam.shader.color = color;
              ret.push(circle1);
              if (
                typeof data.dest === "string" ||
                (data.dest.geo &&
                  data.src.geo &&
                  data.dest.geo.citycode &&
                  data.dest.geo.citycode !== data.src.geo.citycode)
              ) {
                var circle2 = WebTool.copyObject(this.dstObject);
                circle2.from =
                  typeof data.dest === "string"
                    ? data.dest
                    : {
                        lat: data.dest.geo.latitude,
                        lon: data.dest.geo.longitude,
                      };
                circle2.materialParam.shader.color = color;
                ret.push(circle2);
                var line = WebTool.copyObject(this.visitLine);
                line.from =
                  typeof data.src === "string"
                    ? data.src
                    : {
                        lat: data.src.geo.latitude,
                        lon: data.src.geo.longitude,
                      };
                line.to =
                  typeof data.dest === "string"
                    ? data.dest
                    : {
                        lat: data.dest.geo.latitude,
                        lon: data.dest.geo.longitude,
                      };
                line.materialParam.shader.color = color;
                ret.push(line);
              } else {
              }
            } else {
              var circle = WebTool.copyObject(this.eventObject);
              circle.from =
                typeof data === "string"
                  ? data
                  : {
                      lat: data.latitude,
                      lon: data.longitude,
                    };
              ret = [circle];
            }
            this.count++;
            if (this.count === Number.MAX_VALUE) {
              this.count = 0;
            }

            return ret;
          },
          extraInit: function () {
            this.trackball = new THREE.TrackballControls(
              this.render.camera,
              this.render.renderer.domElement
            );
            //add the begining effects of the scene
            var controls = this.trackball;
            var camera = this.render.camera;
            var pos = {
              x: camera.position.x,
              y: camera.position.y,
              z: camera.position.z,
            };
            camera.position.z = camera.position.z + 2480;
            var t = new TWEEN.Tween(camera.position).to(pos, 2000).start();
            t.onComplete(function () {
              //controls.reset();
              //camera.position.z = camera.position.z - 480;
            });
          },
          senceAnimate: function () {
            this.trackball.update();
          },
          data: [],
          promise: {
            beforeRender: function (container, data, task) {
              task.hlMaterial = new THREE.MeshBasicMaterial({
                color: 0x475460,
              });
            },
            afterRender: function (container, data, task) {
              $(container)
                .find("canvas")
                .on("dblclick", function () {
                  var controls = task.trackball;
                  var position0 = task.trackball.position0;
                  var camera = task.render.camera;
                  controls.object.up.copy(controls.up0);
                  var t = new TWEEN.Tween(camera.position)
                    .to(position0, 1000)
                    .start();
                  t.onComplete(function () {
                    controls.reset();
                  });
                });
            },
          },
          dataType: "json",
        },
      },
      dataInfo: [],
    };
  },
  methods: {},
};
</script>

<style scoped>
.mapArea {
  width: 100%;
  height: 100%;
}
</style>
