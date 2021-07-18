(function() {
    var config = {
        // css: "style.css",
        script: {
            Map3dData: "map3dData.js",
            chinaCityData: "location.js",
            My3dRender: "My3dRender.js",
            tween: "tween.js",
            Trackball: "TrackballControls.js"
        }
    }
    webCpu.regComponent("Map3D", config, function(container, data, task) {
        task.grouping = function(data) {
            if (data.groupName) {
                task.group = task.group || {};
                if (!task.group[data.groupName]) {
                    task.group[data.groupName] = [];
                }
                task.group[data.groupName].push(data.object);
            }
        }
        task.mouseDealer = function(e, objects, callback) {
            e.preventDefault();
            var x = (e.offsetX / task.container.clientWidth) * 2 - 1;
            var y = -(e.offsetY / task.container.clientHeight) * 2 + 1;

            var vector = new THREE.Vector3(x, y, 1).unproject(task.render.camera);

            var raycaster = new THREE.Raycaster(task.render.camera.position, vector.sub(task.render.camera.position).normalize());
            var intersects = raycaster.intersectObjects(objects);
            return intersects;
        }

        window.mapLoction = {};
        for (var i = 0; i < chinaCityLocation.length; i++) {
            mapLoction[chinaCityLocation[i].name] = chinaCityLocation[i].cp;
        }

        task.initData = function(data, n) {
            var data = data || this.data;
            if (data && data.constructor.name === "Array") {
                this.data = data;
            } else if (data && data.constructor.name === "Object") {
                this.data = [data];
            } else {
                this.data = [];
            }
            this.control = this.control || [];

            var _self = this;

            this.data.map(function(item) {
                if (!item.loc) {
                    if (typeof(item.from) === "string" && mapLoction[item.from]) {
                        item.from = {
                            lon: mapLoction[item.from][0],
                            lat: mapLoction[item.from][1]
                        }
                    }
                    if (typeof(item.to) === "string" && mapLoction[item.to]) {
                        item.to = {
                            lon: mapLoction[item.to][0],
                            lat: mapLoction[item.to][1]
                        }
                    }
                }
                item = _self.render.initObject(item, function(object, control) {
                    _self.render.scene.add(object);
                    // object.scale.set(15, 15, 15);
                    // object.scale.multiplyScalar(15);
                    object.position.set(control.base.x, control.base.y, control.base.z);
                });
                return item;
            });

            var control = this.control.concat(this.data);
            this.control.concat(this.data);

            var len = n || 50;
            if (control.length > len) {
                for (var m = control.length - 1; m > len - 1; m--) {
                    control[m].exit = true;
                }
            }

            return control;
        }

        var _self = task;

        task.render = new My3dRender(container, {
            bgColor: 0x666666,
            near: 1,
            far: 2000,
            viewAngle: 65
        }, {
            position: {
                x: 0,
                y: 0,
                z: 450
            },
            lookAt: {
                x: 0,
                y: 0,
                z: 0
            }
        });

        task.render.start(function(renderObj) {

            var shader = {
                "vs": [
                    'varying vec2 vN;',
                    'void main() {',
                    'vec4 p = vec4( position, 1. );',
                    'vec3 e = normalize( vec3( modelViewMatrix * p ) );',
                    'vec3 n = normalize( normalMatrix * normal );',
                    'vec3 r = reflect( e, n );',
                    'float m = 2. * length( vec3( r.xy, r.z + 1. ) );',
                    'vN = r.xy / m + .5;',
                    'gl_Position = projectionMatrix * modelViewMatrix * p;',
                    '}'
                ].join('\n'),
                "fs": [
                    'uniform sampler2D tMatCap;',
                    'varying vec2 vN;',
                    'void main() {',
                    'vec3 base = texture2D( tMatCap, vN ).rgb;',
                    'gl_FragColor = vec4( base, 1. );',
                    '}'
                ].join('\n')
            };
            renderObj.addLight({
                type: "HemisphereLight",
                color: [0x666666, 0xffffff, 1],
                position: {
                    x: 110,
                    y: 400,
                    z: -200
                }
            });

            renderObj.areas = {};
            renderObj.borders = {};
            renderObj.textItems = {};
            renderObj.glob = new THREE.Object3D();
            renderObj.glob.scale.set(250, 250, 250);
            renderObj.scene.add(renderObj.glob);

            // renderObj.scene.scale.multiplyScalar(1);
            renderObj.scene.rotation.x = Math.PI * 0.18;
            renderObj.scene.rotation.y = Math.PI * 0.4;

            //add the sphere
            var control = {
                from: [0, 0, 0],
                material: "MeshLambertMaterial",
                materialParam: {
                    shader: {
                        side: THREE.DoubleSide,
                        color: 0xFFFFFF,
                        wireframe: false,
                        transparent: true,
                        opacity: 1,
                    },
                    texture: webCpu.Map3D.getPath("pattern.png"),
                    textureParam: {
                        wrapS: THREE.RepeatWrapping,
                        wrapT: THREE.RepeatWrapping,
                        repeat: [500, 500]
                    },
                },
                geometry: "SphereGeometry",
                geometryParam: [1, 50, 50],
                options: {

                },
                animate: function() {
                    console.log(this.options);
                }
            }

            renderObj.initObject(control, function(mesh, control) {
                renderObj.glob.add(mesh);
                mesh.scale.multiplyScalar(0.9876);
            });

            //add the map
            var tData = Map3dData;
            for (var name in tData) {
                control = {
                    from: [0, 0, 0],
                    material: "ShaderMaterial",
                    materialParam: {
                        shader: {
                            uniforms: {
                                tMatCap: {
                                    type: 't',
                                    // value: texture
                                },
                                mixAmount: {
                                    type: "f",
                                    value: 0.0
                                }
                            },
                            vertexShader: shader.vs,
                            fragmentShader: shader.fs,
                            flatShading: THREE.SmoothShading
                        },
                        // texture: webCpu.Map3D.getPath("earth_fs.jpg"),
                        texture: webCpu.Map3D.getPath("earth.png"),
                        textureParam: {
                            wrapS: THREE.RepeatWrapping,
                            wrapT: THREE.RepeatWrapping
                        }

                    },
                    geometry: "Map3DGeometry",
                    geometryParam: [tData[name], 1],
                    groupName: "mapArea",
                    options: {
                        cityName: name
                    }
                }

                renderObj.initObject(control, function(mesh, control) {
                    renderObj.glob.add(mesh);
                    _self.grouping(control);
                    _self.basicMaterial = new THREE.ShaderMaterial({
                        uniforms: {
                            tMatCap: {
                                type: 't',
                                value: control.materialParam.texture
                            },
                            mixAmount: { type: "f", value: 0.0 }
                        },
                        vertexShader: shader.vs,
                        fragmentShader: shader.fs,
                        flatShading: THREE.SmoothShading
                    });
                    _self.basicMaterial.uniforms.tMatCap.value.wrapS = THREE.ClampToEdgeWrapping;
                    _self.basicMaterial.uniforms.tMatCap.value.wrapT = THREE.ClampToEdgeWrapping;

                });

                var vertices = tData[name].vertices;
                var polygons = tData[name].polygons;
                for (var i = 0, len = polygons.length; i < len; i++) {
                    var polyWithHoles = polygons[i];
                    var polygonOrHole = polyWithHoles[0];
                    var pl = polygonOrHole.length;
                    for (var j = 0, jl = pl; j < jl; j++) {
                        var start = polygonOrHole[0];
                        i === 0 ? polygonOrHole.push(polygonOrHole[j] + pl) :
                            (j === 0 ? polygonOrHole[j] *= 2 : polygonOrHole[j] += start / 2, polygonOrHole.push(polygonOrHole[j] + pl));
                    }
                }


                //display borders
                for (var i = 0, len = polygons.length; i < len; i++) {
                    control = {
                        from: [0, 0, 0],
                        material: "LineBasicMaterial",
                        materialParam: {
                            shader: {
                                color: 0xffffff,
                                transparent: true
                            }
                        },
                        geometry: "Geometry",
                        geometryParam: [],
                        objectType: "Line"
                    }
                    if (tData[name].code !== "cn") {
                        control.materialParam.shader.color = "rgb(130, 130, 130)";
                    }

                    var polyWithHoles = polygons[i];
                    var polygonOrHole = polyWithHoles[0];
                    var cps;
                    for (var k = 0; k < polygonOrHole.length; k += 2) {
                        var d = polygonOrHole[k];
                        var e = polygonOrHole[k + 1];
                        var lon = vertices[d];
                        var lat = vertices[e];
                        var vec3 = renderObj.toVector3({
                            lon: lon,
                            lat: lat
                        });
                        if (k === 0) {
                            cps = renderObj.toVector3({
                                lon: lon,
                                lat: lat
                            });
                        }
                        control.geometryParam.push(vec3);
                    }
                    control.geometryParam.push(cps); //添加起始点，关闭路径

                    renderObj.initObject(control, function(mesh, control) {
                        renderObj.glob.add(mesh);
                    });

                    if (tData[name].code === "cn" && !renderObj.textItems[name]) {
                        control = {
                            from: [0, 0, 0],
                            material: "SpriteMaterial",
                            materialParam: {
                                shader: {},
                                texture: function(context, canvas, options) {
                                    context.font = "normal 18 '微软雅黑'";
                                    var ctxHeight = 18;
                                    var textList = [];
                                    var metrics = context.measureText(options.text);
                                    canvas.width = metrics.width;
                                    canvas.height = ctxHeight + 10;
                                    context.fillStyle = "#000";
                                    context.fillText(options.text, 0, 18 * i + 18);
                                    context.setTransform(0, 0, 0.5, 0.5, 0, 0)

                                    options.width = canvas.width;
                                    options.height = canvas.height;
                                },
                                textureParam: {
                                    minFilter: THREE.NearestFilter,
                                    needsUpdate: true
                                }
                            },
                            // geometry: "Geometry",
                            // geometryParam: [],
                            objectType: "Sprite",
                            options: {
                                text: name,
                                loc: mapLoction[name]
                            }
                        }
                        renderObj.initObject(control, function(mesh, control) {
                            renderObj.scene.add(mesh);
                            mesh.scale.set(control.options.width / 4, control.options.height / 4, 1);
                            var pos = renderObj.toVector3({
                                lon: control.options.loc[0],
                                lat: control.options.loc[1]
                            }, 1);

                            renderObj.textItems[name] = mesh;
                            mesh.position.set(pos.x, pos.y, pos.z - 1);
                        });
                    }

                }

            }
            //display text 
            for (var k in task.eventPromise) {
                if (k === "mousemove" || k === "mouseleave") {
                    var elem = task.render.renderer.domElement;
                } else {
                    var elem = task.render.renderer.domElement.parentNode;
                }
                $(elem).on(k, function(e) {
                    e.preventDefault();
                    var temp = [];
                    for (var m in task.eventPromise[e.type].groups) {
                        var name = task.eventPromise[e.type].groups[m];
                        if (task.group[name] && task.group[name].length > 0) {
                            var intersects = task.mouseDealer(e, task.group[name]);
                            if (intersects.length > 0) {
                                temp = temp.concat(intersects);
                            }
                        }
                    }
                    if (temp.length > 0) {
                        if (task.eventPromise && task.eventPromise[e.type] && typeof(task.eventPromise[e.type].callback) === "function") {
                            task.eventPromise[e.type].callback(e, temp, task);
                        }
                    } else {
                        if (typeof(task.eventPromise[e.type].miss) === "function") {
                            task.eventPromise[e.type].miss(e, task);
                        }
                    }

                    return true;
                });
            }


            task.initData();

            //extraInit
            task.extraInit();

        }, function(m) {
            if (typeof(task.senceAnimate) === "function") {
                task.senceAnimate();
            }

            for (var i = 0; i < task.control.length; i++) {
                if (task.control[i].exit) {
                    task.control[i].dismiss();
                    var t = task.control.splice(i, 1);
                    t = null;
                    i -= 1;
                } else {
                    if (typeof(task.control[i].update) === "function") {
                        task.control[i].update();
                    }
                }
            }

        });

    });

})();