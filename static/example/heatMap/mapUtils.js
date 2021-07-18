import { Draw } from "ol/interaction";
import { Heatmap as HeatmapLayer, Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { getVectorContext } from "ol/render";
import { easeOut } from "ol/easing";
import { unByKey } from "ol/Observable";

import {
    Circle as CircleStyle,
    Fill,
    Icon,
    Stroke,
    Style,
    Text
} from "ol/style";
import { Control } from "ol/control";
import store from "@/store";
import { LineString, MultiPolygon, Point, Polygon } from "ol/geom";
import Feature from "ol/Feature";
import smooth from "chaikin-smooth";
import Overlay from "ol/Overlay";
import { transform } from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";
import oil from "../../assets/img/oil-paly.png";
import gas from "../../assets/img/gas-play.png";
import six from "../../assets/img/six-play.png";
import sea from "../../assets/img/sea-play.png";
import port from "../../assets/img/Port.png";
import line from "../../assets/img/Line.png";
import ArmyBasepng from "@/assets/img/ArmyBasepng.png";
import NavalBasepng from "@/assets/img/NavalBasepng.png";
import AirBasepng from "@/assets/img/AirBasepng.png";
import HighTechIcon from "@/assets/img/HighTechIcon.png";
import HighTechPng from "@/assets/img/HighTechPng.png";
import Strategy from "@/assets/img/Strategy.png";
import HeatingPng from "@/assets/img/HeatingPng.png";
import Northeast from "@/assets/img/Northeast.png";
import location from "@/assets/img/location.png";

var start = "";
//为画图当前地图添加自定义控件
function addControlInMap(map, document, style, draw, type) {
    var element;
    //添加绘画控件
    var DrawControl = (function(Control) {
        function DrawControl(opt_options) {
            //设置控件button样式
            var button = document.createElement("button");
            button.className = " el-icon-edit";
            element = document.createElement("div");
            element.className = "ol-unselectable ol-control mapDrawControlDiv";
            element.appendChild(button);
            Control.call(this, {
                element: element
            });
            //绑定点击方法
            button.addEventListener(
                "click",
                this.handleDrawControl.bind(this),
                false
            );
        }
        if (Control) DrawControl.__proto__ = Control;
        DrawControl.prototype = Object.create(Control && Control.prototype);
        DrawControl.prototype.constructor = DrawControl;
        //点击画图方法
        DrawControl.prototype.handleDrawControl = function handleDrawClick() {
            //未删除原layer禁止重新绘画
            if (style && draw && !style.getSource().getFeatures()[0]) {
                drawInMap(map, draw, type);
            }
        };
        return DrawControl;
    })(Control);
    //设置删除控件
    var DelDrawControl = (function(Control) {
        function DelDrawControl(opt_options) {
            //设置控件button样式
            var button = document.createElement("button");
            button.className = "el-icon-delete ";
            element.appendChild(button);
            Control.call(this, {
                element: element
            });
            button.addEventListener(
                "click",
                this.handleRotateNorth.bind(this),
                false
            );
        }
        if (Control) DelDrawControl.__proto__ = Control;
        DelDrawControl.prototype = Object.create(Control && Control.prototype);
        DelDrawControl.prototype.constructor = DelDrawControl;
        //点击方法
        DelDrawControl.prototype.handleRotateNorth = function handleDelClick() {
            //清楚绘画layer
            if (draw && style && style.getSource().getFeatures()[0]) {
                style
                    .getSource()
                    .removeFeature(style.getSource().getFeatures()[0]);
                map.removeInteraction(draw);
            }
        };
        return DelDrawControl;
    })(Control);
    //添加控件
    map.addControl(new DrawControl());
    map.addControl(new DelDrawControl());
}
//在地图中绘画
function drawInMap(map, draw, type) {
    var coords;
    map.addInteraction(draw);
    //监听停止绘画
    draw.on("drawend", function(event) {
        var feat = event.feature;
        var geometry = feat.getGeometry();
        geometry.transform("EPSG:3857", "EPSG:4326");
        coords = geometry.getCoordinates();
        let temp = changeTransform(coords, type);
        //提交vuex           getCoordinates
        if (type == "Polygon")
            store.dispatch(
                "changeCoordinateAction",
                geometry.getLinearRing().getCoordinates()
            );
        else store.dispatch("changeCoordinateAction", temp);
        geometry.transform("EPSG:4326", "EPSG:3857");
        map.removeInteraction(draw);
    });
}
//停止绘画
function delInMap(map, draw, vector) {
    map.removeInteraction(draw);
    map.removeLayer(vector);
    store.dispatch("changeCoordinateAction", []);
}
//设置绘画样式
function setDrawStyle(map) {
    var source = new VectorSource();
    var vector = new VectorLayer({
        source: source,
        style: new Style({
            //面的颜色
            fill: new Fill({
                color: "rgba(255, 255, 255, 0.2)"
            }),
            //线的颜色
            stroke: new Stroke({
                width: 2,
                color: "#ffcc33"
            }),
            //点的颜色
            image: new Icon({
                anchor: [0.5, 0.5],
                src: require("@/assets/img/location.png")
            })
        })
    });
    map.addLayer(vector);
    return vector;
}
//设置画线的对象
function setDraw(vector, type) {
    var draw = new Draw({
        source: vector.getSource(),
        type: type
    });
    return draw;
}
//设置线的样式
function setLineStringStyle(map) {
    var source = new VectorSource();
    var styleFunction = function(feature, resolution) {
        let style = new Style({
            stroke: new Stroke({
                lineDash: [1, 2, 3, 4, 5, 6],
                width: 2,
                color: "red"
            })
        });
        return style;
    };
    const layer = new VectorLayer({
        // 高亮地区图层
        source: source,
        style: styleFunction,
        id: "lineStringId"
    });
    map.addLayer(layer);
    return layer;
}
/**
 *
 *为点的layer添加展示数据
 * @param {*} map
 * @returns
 */
function setPointStyle(map) {
    var source = new VectorSource();
    var styleFunction = function(feature, resolution) {
        const properties = feature.getProperties();
        const styleConf = {
            image: new CircleStyle({
                fill: new Fill({
                    color: "white"
                }),
                stroke: new Stroke({
                    color: "#3399CC",
                    width: 1
                }),
                radius: 3
            })
        };
        if (properties.content) {
            styleConf.text = new Text({
                text: properties.content,
                font: "bold 12px Arial,x-locale-body,sans-serif",
                fill: new Fill({
                    color: "#000"
                }),
                backgroundFill: new Fill({
                    color: "white"
                }),
                backgroundStroke: new Stroke({
                    width: 1,
                    color: "#3366ff"
                }),
                padding: [3, 3, 3, 3],
                offsetY: 20,
                rotateWithView: true
            });
        }
        return new Style(styleConf);
    };
    const layer = new VectorLayer({
        // 高亮地区图层
        source: source,
        style: styleFunction,
        id: "pointsId"
    });
    map.addLayer(layer);
    return layer;
}
//为layer添加数据
function addFeatureDrawLine(map, lineData, lineLayer, pointLayer) {
    const Coors = [];
    const features = [];
    for (let i = 0; i < lineData.length; i++) {
        let dataLine = lineData[i];
        if (dataLine.lon < 0) {
            dataLine.lon =
                i != 0 && lineData[i - 1].lon - dataLine.lon > 120
                    ? dataLine.lon * 1 + 360
                    : dataLine.lon;
        }
        const coor = [parseFloat(dataLine.lon), parseFloat(dataLine.lat)];
        Coors.push(coor);
        const content = `${dataLine.name}`;
        const feature = new Feature({
            id: dataLine.dataId,
            geometry: new Point(coor),
            name: `${dataLine.name}`,
            content: content.trim()
        });
        feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
        features.push(feature);
    }
    const lineFeature = new Feature({
        geometry: new LineString(Coors),
        id: "lineStringData"
    });
    lineFeature.getGeometry().transform("EPSG:4326", "EPSG:3857");
    map.getView().setCenter(lineFeature.getGeometry().getFirstCoordinate());
    lineLayer.getSource().addFeature(lineFeature);
    pointLayer.getSource().addFeatures(features);
}
//设置详细展示的点的样式
function setDetailsMapStyle(map) {
    var source = new VectorSource();
    var styleFunction = function(feature, resolution) {
        const properties = feature.getProperties();
        const styleConf = {
            image: new Icon({
                anchor: [0.5, 0.5],
                src: require("@/assets/img/location.png")
            })
        };
        if (properties.content) {
            styleConf.text = new Text({
                text: properties.content,
                font: "bold 12px Arial,x-locale-body,sans-serif",
                fill: new Fill({
                    color: "#000"
                }),
                backgroundFill: new Fill({
                    color: "white"
                }),
                backgroundStroke: new Stroke({
                    width: 1,
                    color: "#3366ff"
                }),
                padding: [3, 3, 3, 3],
                offsetY: 30,
                overflow: true,
                rotateWithView: true
            });
        }
        return new Style(styleConf);
    };
    var vector = new VectorLayer({
        source: source,
        style: styleFunction
    });
    map.addLayer(vector);
    return vector;
}
//为样式添加数据
function addFeatureOnePoint(map, coordinate, pointLayer, content) {
    const feature = new Feature({
        id: "popupPoint",
        geometry: new Point(coordinate),
        content: content
    });
    feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
    map.getView().setCenter(feature.getGeometry().getCoordinates());
    pointLayer.getSource().addFeature(feature);
}

//添加地图控件
function addLegendControl(map, target) {
    var element;
    //显示拼接doc
    var LegendControl = (function(Control) {
        function LegendControl(opt_options) {
            //设置控件button样式
            Control.call(this, {
                element: target
            });
        }
        if (Control) LegendControl.__proto__ = Control;
        LegendControl.prototype = Object.create(Control && Control.prototype);
        LegendControl.prototype.constructor = LegendControl;
        return LegendControl;
    })(Control);
    //添加控件
    map.addControl(new LegendControl());
    return true;
}
/**
 *
 * @param {*} coords 坐标点
 */
function changeTransform(coords, type) {
    if (type == "LineString")
        coords.map(coord => {
            if (coord[0] > 180 || coord[0] < -180) {
                coord[0] = coord[0] - Math.round(coord[0] / 360) * 360;
            }
        });
    else {
        coords[0] = coords[0] - Math.round(coords[0] / 360) * 360;
    }
    return coords;
}
//初始化地图上面的展示
function showMultiPolygon(map, multiPolygon) {
    let multiPolygonFeatures = [];
    var source = new VectorSource();
    var styleFunction = function(feature, resolution) {
        const styleConf = {
            //面的颜色
            fill: new Fill({
                color: "rgba(136, 38, 179, 0.1)"
            }),
            //线的颜色
            stroke: new Stroke({
                width: 2,
                color: "rgba(136, 38, 179, 1)"
            })
        };
        return new Style(styleConf);
    };
    multiPolygon.forEach(item => {
        for (let index = 0; index < 6; index++) {
            item[0] = smooth(item[0]);
        }
        const multiPolygonFeature = new Feature({
            geometry: new Polygon(item),
            id: "multiPolygonData"
        });
        multiPolygonFeature.getGeometry().transform("EPSG:4326", "EPSG:3857");
        multiPolygonFeatures.push(multiPolygonFeature);
    });
    var vector = new VectorLayer({
        source: source,
        style: styleFunction,
        id: "showMultiPolygon"
    });
    source.addFeatures(multiPolygonFeatures);
    map.addLayer(vector);
}

//初始化地图上展示线的 change需求变动展示航线名称改用Linestring
function showLineInMap(map, lineData) {
    //设置样式
    let layer = "";
    let pointLayer = "";
    let info = lineDataHandle(lineData);
    let features = [];
    info.multiLineString.forEach(item => {
        let feature = new Feature({
            geometry: new LineString(item.line),
            name: item.name,
            color: item.color,
            content: item.desc,
            id: Math.ceil(Math.random() * 1000)
        });
        feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
        features.push(feature);
    });
    if (getLayer(map, "MutilLineString") && getLayer(map, "MutilPoint")) {
        layer = getLayer(map, "MutilLineString");
        pointLayer = getLayer(map, "MutilPoint");
        layer.getSource().clear();
        pointLayer.getSource().clear();
    } else {
        layer = setShowLineStyle(map);
        pointLayer = setLinePointStyle(map, "MutilPoint");
        map.addLayer(layer);
        map.addLayer(pointLayer);
    }
    layer.getSource().addFeatures(features);
    pointLayer.getSource().addFeatures(info.pointFeatures);
}
//线数据处理
function lineDataHandle(lineData) {
    let multiLineString = [];
    let pointFeatures = [];
    lineData.forEach(temp => {
        let types = temp
            .map(item => {
                return item.type;
            })
            .sort();
        for (let i = types.length - 1; i > 0; i--) {
            if (types[i] == types[i - 1]) {
                types.splice(i, 1);
            }
        }
        //归类设置颜色
        types.forEach(type => {
            let linetemp = temp.filter(item => item.type === type);
            let color;
            linetemp.forEach(lineItem => {
                color = color ? color : lineItem.color;
                let Coors = [];
                for (
                    let index = 0;
                    index < lineItem.information.location.length;
                    index++
                ) {
                    const element = lineItem.information.location[index];
                    if (element.lon < 0) {
                        element.lon =
                            index != 0 &&
                            lineItem.information.location[index - 1].lon -
                                element.lon >
                                120
                                ? element.lon * 1 + 360
                                : element.lon;
                    }
                    Coors.push([
                        parseFloat(element.lon),
                        parseFloat(element.lat)
                    ]);
                    if (
                        index == 0 ||
                        index == lineItem.information.location.length - 1
                    ) {
                        const feature = new Feature({
                            id: lineItem._id,
                            geometry: new Point([
                                parseFloat(element.lon),
                                parseFloat(element.lat)
                            ]),
                            name: `${element.name}`,
                            content: `${element.name}`,
                            parentType: lineItem.type,
                            type: lineItem.information.type,
                            color: lineItem.color
                        });
                        feature
                            .getGeometry()
                            .transform("EPSG:4326", "EPSG:3857");
                        pointFeatures.push(feature);
                    }
                }
                for (let index = 0; index < 5; index++) {
                    Coors = smooth(Coors);
                }
                // line.push(Coors);
                multiLineString.push({
                    color: color,
                    line: Coors,
                    name: lineItem.name,
                    desc: lineItem.information.desc
                });
            });
        });
    });
    return {
        multiLineString: multiLineString,
        pointFeatures: pointFeatures
    };
}

function setLinePointStyle(map, id) {
    const styleFunction = function(feature, resolution) {
        const properties = feature.getProperties();
        const type = properties.type;
        const parentType = properties.parentType;
        const color = properties.color;
        let image = new CircleStyle({
            fill: new Fill({
                color: color ? color : "red"
            }),
            stroke: new Stroke({
                color: "white",
                width: 2
            }),
            radius: 4
        });
        if (map.getView().getZoom() > 4) {
            switch (type) {
                case "原油":
                    image = new Icon({
                        anchor: [0.6, 0.9],
                        src: require("@/assets/img/crudeOil.png")
                    });
                    break;
                case "天然气":
                    image = new Icon({
                        anchor: [0.6, 0.9],
                        src: require("@/assets/img/naturalGas.png")
                    });
                    break;
                default:
                    image = new Icon({
                        anchor: [0.6, 0.9],
                        src: require("@/assets/img/default.png")
                    });
            }
        }
        const styleConf = {
            image: image
        };
        let style = new Style(styleConf);
        return style;
    };
    var source = new VectorSource({});
    const layer = new VectorLayer({
        // 高亮地区图层
        source: source,
        style: styleFunction,
        id: id
    });
    layer.setZIndex(3);
    return layer;
}

function resizeArray(start, end) {
    return Array.from(new Array(end + 1).keys()).slice(start);
}

function setShowLineStyle(map) {
    let styleFunction = function(feature, resolution) {
        let properties = feature.getProperties();
        let style = {};
        let array = resizeArray(1, parseInt(60 / map.getView().getZoom()));
        style = new Style({
            stroke: new Stroke({
                //设置虚线
                lineDash: array,
                width: 3,
                color: properties.color ? properties.color : "red"
            })
        });
        return style;
    };
    var source = new VectorSource();
    let layer = new VectorLayer({
        // 高亮地区图层
        source: source,
        style: styleFunction,
        id: "MutilLineString"
    });
    return layer;
}
function showPointInMap(map, pointData) {
    let pointLayer = "";
    let features = handlerPoint(pointData);
    if (getLayer(map, "pointId")) {
        pointLayer = getLayer(map, "pointId");
        pointLayer.getSource().clear();
    } else {
        pointLayer = setShowPointStyle(map, "pointId");
        map.addLayer(pointLayer);
    }
    pointLayer.getSource().addFeatures(features);
}

function handlerPoint(pointData) {
    let features = [];
    pointData.forEach(temp => {
        temp.forEach(pointTemp => {
            if (pointTemp.information.location) {
                const feature = new Feature({
                    id: pointTemp.id,
                    geometry: new Point([
                        parseFloat(pointTemp.information.location[0].lon),
                        parseFloat(pointTemp.information.location[0].lat)
                    ]),
                    name: `${pointTemp.information.name}`,
                    parentType: pointTemp.type,
                    country: pointTemp.information.country,
                    type: pointTemp.information.baseType,
                    content: `${
                        !pointTemp.information.desc
                            ? pointTemp.name
                            : pointTemp.information.desc
                    }`
                });
                feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
                features.push(feature);
            }
        });
    });
    return features;
}

function setShowPointStyle(map, id) {
    var styleFunction = function(feature, resolution) {
        const properties = feature.getProperties();
        let image = new Icon({
            anchor: [0.5, 0.5],
            src: require("@/assets/img/location.png")
        });
        switch (properties.parentType) {
            //军事基地
            case "MilitaryBase":
                switch (properties.type) {
                    case "陆军单位或基地":
                        image =
                            properties.country && properties.country == "美国"
                                ? new Icon({
                                      anchor: [0.5, 0.5],
                                      src: require("@/assets/img/UsArmyBaseIcon.png")
                                  })
                                : new Icon({
                                      anchor: [0.5, 0.5],
                                      src: require("@/assets/img/ArmyBaseIcon.png")
                                  });
                        break;
                    case "海军单位或基地":
                        image =
                            properties.country && properties.country == "美国"
                                ? new Icon({
                                      anchor: [0.5, 0.5],
                                      src: require("@/assets/img/UsNavalBaseIcon.png")
                                  })
                                : new Icon({
                                      anchor: [0.5, 0.5],
                                      src: require("@/assets/img/NavalBaseIcon.png")
                                  });
                        break;
                    case "空军单位或基地":
                        image =
                            properties.country && properties.country == "美国"
                                ? new Icon({
                                      anchor: [0.5, 0.5],
                                      src: require("@/assets/img/UsAirBaseIcon.png")
                                  })
                                : new Icon({
                                      anchor: [0.5, 0.5],
                                      src: require("@/assets/img/AirBaseIcon.png")
                                  });
                        break;
                }
                break;
            //动员体系
            case "Mobilization":
                switch (properties.type) {
                    case "HighTech":
                        image = new Icon({
                            anchor: [0.5, 0.5],
                            src: require("@/assets/img/HighTechIcon.png")
                        });
                        break;
                    case "Military":
                        image = new Icon({
                            anchor: [0.5, 0.5],
                            src: require("@/assets/img/HighTechImg.png")
                        });
                        break;
                }
                break;
            case "Resources":
                switch (properties.type) {
                    case "Strategy":
                        image = new Icon({
                            anchor: [0.5, 0.5],
                            src: require("@/assets/img/Strategy.png")
                        });
                        break;
                    case "Heating":
                        image = new Icon({
                            anchor: [0.5, 0.5],
                            src: require("@/assets/img/Heating.png")
                        });
                        break;
                    case "Northeast":
                        image = new Icon({
                            anchor: [0.5, 0.5],
                            src: require("@/assets/img/Northeast.png")
                        });
                        break;
                }
                break;
            default:
                image = new Icon({
                    anchor: [0.5, 0.5],
                    src: require("@/assets/img/location.png")
                });
        }
        const styleConf = {
            image: image
        };
        if (map.getView().getZoom() > 4) {
            if (properties.name) {
                styleConf.text = new Text({
                    text: properties.name,
                    font: "bold 10px Arial,x-locale-body,sans-serif",
                    fill: new Fill({
                        color: "#FFFFFF"
                    }),
                    backgroundFill: new Fill({
                        color: "#123B46"
                    }),
                    backgroundStroke: new Stroke({
                        width: 1,
                        color: "#04C2C9"
                    }),
                    padding: [3, 3, 3, 3],
                    offsetY: 25,
                    overflow: true,
                    rotateWithView: true
                });
            }
        }
        return new Style(styleConf);
    };
    var source = new VectorSource();
    const layer = new VectorLayer({
        source: source,
        style: styleFunction,
        id: id
    });
    layer.setZIndex(5);
    return layer;
}
/**
 * 根据layerid查询layer
 * @param {*} map
 * @param {*} layerId
 */
function getLayer(map, layerId) {
    var layers = map.getLayers().getArray();
    for (var i = 0; i < layers.length; i++) {
        if (layers[i].getProperties().id === layerId) {
            return layers[i];
        }
    }
}
/**
 *移除layer
 * @param {*} map
 * @param {*} layer
 */
function removeLayer(map, layer) {
    map.removeLayer(layer);
}

function addOverlay(map, element) {
    var popup = new Overlay({
        element: element,
        positioning: "bottom-center",
        stopEvent: true,
        offset: [0, -20]
    });
    map.addOverlay(popup);
    return popup;
}

function transform3To4(data) {
    return transform(data, "EPSG:3857", "EPSG:4326");
}

function transform4To3(data) {
    return transform(data, "EPSG:4326", "EPSG:3857");
}

function animationPlay(map, data) {
    let vectorLayer;
    let pointLayer;
    let times = [];
    if (data && data.length > 1) {
        //设置线动画样式
        if (getLayer(map, "animationLine") && getLayer(map, "animationPoint")) {
            vectorLayer = getLayer(map, "animationLine");
            vectorLayer.getSource().clear();
            pointLayer = getLayer(map, "animationPoint");
            pointLayer.getSource().clear();
        } else {
            vectorLayer = setAnimationLineStyles();
            //设置点动画样式
            pointLayer = setAnimationPointStyles();
            vectorLayer.setZIndex(40);
            pointLayer.setZIndex(40);
            //地图上提交layer
            map.addLayer(vectorLayer);
            map.addLayer(pointLayer);
        }
        let animationData = data
            .map(item => {
                return [parseFloat(item.latitude), parseFloat(item.longitude)];
            })
            .reverse();
        //将航线平滑化
        for (let i = 10; i > 0; i--) {
            animationData = smooth(animationData);
        }
        map.getView().setCenter(transform4To3(animationData[0]));
        let pointFeature = new Feature({
            geometry: new Point(animationData[0])
        });
        pointFeature.getGeometry().transform("EPSG:4326", "EPSG:3857");
        pointLayer.getSource().addFeature(pointFeature);
        for (let index = 0; index < animationData.length; index++) {
            const listTemp = [];
            //保证最后一点的加入
            if (index == animationData.length - 1) {
                listTemp.push(animationData[index - 1]);
                listTemp.push(animationData[index]);
            } else {
                listTemp.push(animationData[index]);
                listTemp.push(animationData[index + 1]);
            }
            //定时画线
            animationPlayLine(
                listTemp,
                index,
                vectorLayer.getSource(),
                pointLayer.getSource(),
                times
            );
        }
    } else {
        if (getLayer(map, "animationLine") && getLayer(map, "animationPoint")) {
            vectorLayer = getLayer(map, "animationLine");
            map.removeLayer(vectorLayer);
            pointLayer = getLayer(map, "animationPoint");
            map.removeLayer(pointLayer);
        }
    }
}
//定时画线
function animationPlayLine(Coors, timeout, lineSource, pointSource, times) {
    let routeFeature = new Feature({
        geometry: new LineString(Coors)
    });
    //清楚点位信息
    let pointFeature = new Feature({
        geometry: new Point(routeFeature.getGeometry().getLastCoordinate())
    });
    //定时器
    pointFeature.getGeometry().transform("EPSG:4326", "EPSG:3857");
    routeFeature.getGeometry().transform("EPSG:4326", "EPSG:3857");
    let time = setTimeout(() => {
        pointSource.clear();
        pointSource.addFeature(pointFeature);
        lineSource.addFeature(routeFeature);
        clearTimeout(time);
    }, timeout);
    times.push(time);
    //重新搜索定时器清除
    store.dispatch("changeTimeAction", times);
}

//设置动画样式
function setAnimationLineStyles() {
    var vectorSource = new VectorSource({});
    return new VectorLayer({
        source: vectorSource,
        style: function(feature, resolution) {
            let style = {
                stroke: new Stroke({
                    width: 4,
                    color: "rgba(46, 130, 200, 1)" //[237, 212, 0, 0.8]
                })
            };
            return new Style(style);
        },
        id: "animationLine"
    });
}

function setAnimationPointStyles() {
    return new VectorLayer({
        source: new VectorSource({}),
        style: function(feature, resolution) {
            let style = {
                image: new Icon({
                    anchor: [0.5, 0.5],
                    src: require("@/assets/img/plan.png")
                })
            };
            return new Style(style);
        },
        id: "animationPoint"
    });
}
/**
 *  司令部展示图层
 * @param {*} map
 * @param {*} geometry 经纬度集合
 */
function showCommandInMap(map, data) {
    let multiFeatures = [];

    showCommandDataHandler(data, multiFeatures);
    if (getLayer(map, "showMultiPolygon")) {
        let layer = getLayer(map, "showMultiPolygon");
        layer.getSource().addFeatures(multiFeatures);
    } else {
        var source = new VectorSource();
        var styleFunction = commandStyleFunction;
        var vector = new VectorLayer({
            source: source,
            style: styleFunction,
            id: "showMultiPolygon"
        });
        vector.setZIndex(1);
        source.addFeatures(multiFeatures);
        map.addLayer(vector);
    }
}

function commandStyleFunction(feature, resolution) {
    let color = "rgba(136, 38, 179, 1)";
    // console.log(feature);
    switch (feature.get("type")) {
        //美军南方司令部
        case "Southern":
            color = "#569b9e";
            break;
        //美军北方司令部
        case "Northern":
            color = "#4c9fb0";
            break;
        //美军欧洲司令部
        case "European":
            color = "#62a1b3";
            break;
        //美军非洲司令部
        case "Africa":
            color = "#408f8a";
            break;
        //美军中央司令部
        case "Central":
            color = "#2f9296";
            break;
        //美军太平洋司令部
        case "Pacific":
            color = "#207a8a";
            break;
    }
    const styleConf = {
        //面的颜色
        fill: new Fill({
            color: color
        }),
        //线的颜色
        stroke: new Stroke({
            width: 3,
            color: color
        })
    };
    return new Style(styleConf);
}

function showCommandDataHandler(data, multiFeatures) {
    data.forEach(dataTemp => {
        let polygonData = dataTemp
            .filter(item => {
                return item.information.geometry.type == "Polygon";
            })
            .map(item => {
                return item.information.geometry.coordinates;
            });
        dataTemp
            .filter(item => {
                return item.information.geometry.type == "MultiPolygon";
            })
            .forEach(item => {
                item.information.geometry.coordinates.forEach(polygonTemp => {
                    polygonData.push(polygonTemp);
                });
            });
        let name = dataTemp[0].routeType;
        let parentType = dataTemp[0].route;
        let molygonFeature = new Feature({
            geometry: new MultiPolygon(polygonData),
            type: name,
            parentType: parentType
        });
        molygonFeature.getGeometry().transform("EPSG:4326", "EPSG:3857");
        multiFeatures.push(molygonFeature);
    });
}
//战区中心点图标
function showCommandCenterInMap(map, data) {
    let temp = data[0];
    let centerPointFeatures = temp[0].information.centerPoint.map(item => {
        let point = new Feature({
            geometry: new Point(item.point),
            type: item.type,
            parentType: temp[0].route,
            des: item.des
        });
        point.getGeometry().transform("EPSG:4326", "EPSG:3857");
        return point;
    });
    if (getLayer(map, "commamdCenter")) {
        let layer = getLayer(map, "commamdCenter");
        layer.getSource().addFeatures(centerPointFeatures);
    } else {
        var source = new VectorSource();
        var vector = new VectorLayer({
            source: source,
            style: centerPointStyle,
            id: "commamdCenter"
        });
        vector.setZIndex(10);
        source.addFeatures(centerPointFeatures);
        map.addLayer(vector);
    }
}

function centerPointStyle(feature, resolution) {
    let image = new Icon({
        anchor: [0.5, 0.5],
        src: require("@/assets/img/location.png")
    });
    switch (feature.get("type")) {
        //美军南方司令部
        case "SouthernCommand":
            image = new Icon({
                anchor: [0.5, 0.5],
                src: require("@/assets/img/SouthernCommand.png")
            });
            break;
        //美军北方司令部
        case "NorthernCommand":
            image = new Icon({
                anchor: [0.5, 0.5],
                src: require("@/assets/img/NorthernCommand.png")
            });
            break;
        //美军欧洲司令部
        case "EuropeanCommand":
            image = new Icon({
                anchor: [0.5, 0.5],
                src: require("@/assets/img/EuropeanCommand.png")
            });
            break;
        //美军非洲司令部
        case "AfricaCommand":
            image = new Icon({
                anchor: [0.5, 0.5],
                src: require("@/assets/img/AfricaCommand.png")
            });
            break;
        //美军中央司令部
        case "CentralCommand":
            image = new Icon({
                anchor: [0.5, 0.5],
                src: require("@/assets/img/CentralCommand.png")
            });
            break;
        //美军太平洋司令部
        case "PacificCommand":
            image = new Icon({
                anchor: [0.5, 0.5],
                src: require("@/assets/img/PacificCommand.png")
            });
            break;
    }
    const properties = feature.getProperties();
    let config = {
        image: image
    };
    if (properties.des) {
        config.text = new Text({
            text: properties.des,
            font: "bold 16px Arial,x-locale-body,sans-serif",
            fill: new Fill({
                color: "#FFFFFF"
            }),
            backgroundFill: new Fill({
                color: "#123B46"
            }),
            backgroundStroke: new Stroke({
                width: 1,
                color: "#04C2C9"
            }),
            padding: [3, 3, 3, 3],
            offsetY: 40,
            overflow: true,
            rotateWithView: true
        });
    }
    return new Style(config);
}

function showInMapTerritorialClaim(map, data) {
    let features = data.map(item => {
        let coor = item.information.location.map(temp => [temp.lon, temp.lat]);
        let feature = new Feature({
            geometry: new LineString(coor),
            name: item.name,
            type: item.information.type,
            content: item.name
        });
        feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
        return feature;
    });
    if (getLayer(map, "territorialClaim")) {
        let layer = getLayer(map, "territorialClaim");
        layer.getSource().addFeatures(features);
    } else {
        var source = new VectorSource();
        var vector = new VectorLayer({
            source: source,
            style: showInMapTerritorialClaimStyle,
            id: "territorialClaim"
        });
        source.addFeatures(features);
        map.addLayer(vector);
    }
}

function showInMapTerritorialClaimStyle(feature, resolution) {
    let color = "#ffcc33";
    switch (feature.get("type")) {
        case "Vietnam":
            color = "#ffcb06";
            break;
        case "China":
            color = "#c2080b";
            break;
        case "Philippines":
            color = "#9bc676";
            break;
    }
    let config = {
        stroke: new Stroke({
            // lineDash: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            width: 3,
            color: color
        })
    };
    return new Style(config);
}

function showInMapFleetDirection(map, data) {
    let features = data.map(item => {
        let lineString = item.information.location.map(temp => [
            temp.lon,
            temp.lat
        ]);
        let start = lineString.slice(0, 2);
        let co = lineString.slice(2, lineString.length - 2);
        let end = lineString.slice(lineString.length - 2, lineString.length);
        for (let index = 0; index < 12; index++) {
            co = smooth(co);
        }
        let poolygon = new Polygon([start.concat(co).concat(end)]);
        let feature = new Feature({
            geometry: poolygon,
            name: item.name,
            desc: item.name,
            type: item.information.type
        });
        feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
        return feature;
    });
    if (getLayer(map, "fleetDirection")) {
        getLayer(map, "fleetDirection")
            .getSource()
            .addFeatures(features);
    } else {
        var source = new VectorSource();
        var styleFunction = showInMapFleetDirectionStyle;
        var vector = new VectorLayer({
            source: source,
            style: styleFunction,
            id: "fleetDirection"
        });
        source.addFeatures(features);
        map.addLayer(vector);
    }
}

function showInMapFleetDirectionStyle(feature, resolution) {
    const properties = feature.getProperties();
    const styleConf = {
        //面的颜色
        fill: new Fill({
            color: "rgba(245, 171, 250, 0.4)"
        }),
        //线的颜色
        stroke: new Stroke({
            width: 2,
            color: "rgba(136, 38, 179, 1)"
        })
    };
    if (properties.des) {
        styleConf.text = new Text({
            text: properties.des,
            font: "bold 16px Arial,x-locale-body,sans-serif",
            fill: new Fill({
                color: "#FFFFFF"
            }),
            backgroundFill: new Fill({
                color: "#123B46"
            }),
            backgroundStroke: new Stroke({
                width: 1,
                color: "#04C2C9"
            }),
            padding: [3, 3, 3, 3],
            offsetY: 40,
            overflow: true,
            rotateWithView: true
        });
    }
    return new Style(styleConf);
}

function showFleetPointInMap(map, data) {
    let temp = data[0];
    let centerPointFeatures = temp.information.centerPoint.map(item => {
        let point = new Feature({
            geometry: new Point(item.point),
            type: item.type,
            des: item.des
        });
        point.getGeometry().transform("EPSG:4326", "EPSG:3857");
        return point;
    });
    if (getLayer(map, "fleetPoint")) {
        let layer = getLayer(map, "fleetPoint");
        layer.getSource().addFeatures(centerPointFeatures);
    } else {
        var source = new VectorSource();
        var vector = new VectorLayer({
            source: source,
            style: fleetPointStyle,
            id: "fleetPoint"
        });
        source.addFeatures(centerPointFeatures);
        map.addLayer(vector);
    }
}

function fleetPointStyle(feature, resolution) {
    const properties = feature.getProperties();
    let config = {
        //点的颜色
        image: new Icon({
            anchor: [0.5, 0.5],
            src: require("@/assets/img/Fleet.png")
        })
    };
    if (properties.des) {
        config.text = new Text({
            text: properties.des,
            font: "bold 10px Arial,x-locale-body,sans-serif",
            fill: new Fill({
                color: "#FFFFFF"
            }),
            backgroundFill: new Fill({
                color: "#123B46"
            }),
            backgroundStroke: new Stroke({
                width: 1,
                color: "#04C2C9"
            }),
            padding: [3, 3, 3, 3],
            offsetY: 15,
            overflow: true,
            rotateWithView: true
        });
    }
    return new Style(config);
}

function showTrajectory(map, data) {
    let pointFeatures = [];
    if (data) {
        let lineFeatures = showTrajectoryDataHandler(pointFeatures, data);
        if (getLayer(map, "trajectoryLine")) {
            let source = getLayer(map, "trajectoryLine").getSource();
            source.clear();
            let sourcePoint = getLayer(map, "trajectoryPoint").getSource();
            sourcePoint.clear();
            source.addFeatures(lineFeatures);
            sourcePoint.addFeatures(pointFeatures);
        } else {
            var sourcePoint = new VectorSource();
            var styleFunctionPoint = showTrajectoryPointStyle;
            var vectorPoint = new VectorLayer({
                source: sourcePoint,
                style: styleFunctionPoint,
                id: "trajectoryPoint"
            });
            var source = new VectorSource();
            var styleFunction = function showTrajectoryStyle(
                feature,
                resolution
            ) {
                var geometry = feature.getGeometry();
                var styles = [
                    new Style({
                        stroke: new Stroke({
                            color: "#58C6FE",
                            width: 2
                        })
                    })
                ];
                if (map.getView().getZoom() > 5) {
                    geometry.forEachSegment(function(start, end) {
                        var dx = end[0] - start[0];
                        var dy = end[1] - start[1];
                        var rotation = Math.atan2(dy, dx);
                        styles.push(
                            new Style({
                                geometry: new Point(end),
                                image: new Icon({
                                    src: require("@/assets/img/arrow.png"),
                                    anchor: [0.75, 0.5],
                                    rotateWithView: true,
                                    rotation: -rotation
                                })
                            })
                        );
                    });
                }
                return styles;
            };
            var vector = new VectorLayer({
                source: source,
                style: styleFunction,
                id: "trajectoryLine"
            });
            source.addFeatures(lineFeatures);
            sourcePoint.addFeatures(pointFeatures);
            map.addLayer(vector);
            map.addLayer(vectorPoint);
        }
    } else {
        if (getLayer(map, "trajectoryLine")) {
            let source = getLayer(map, "trajectoryLine").getSource();
            source.clear();
            let sourcePoint = getLayer(map, "trajectoryPoint").getSource();
            sourcePoint.clear();
        }
    }
}

function showTrajectoryPointStyle(feature, resolution) {
    let styleConf = {
        image: new CircleStyle({
            fill: new Fill({
                color: "#58C6FE"
            }),
            stroke: new Stroke({
                color: "#58C6FE",
                width: 1
            }),
            radius: 3
        })
    };
    return new Style(styleConf);
}

function showTrajectoryDataHandler(pointFeatures, data) {
    return data.map(item => {
        let lineString = [];
        let name = "";
        for (let index = 0; index < item.eventList.length; index++) {
            const element = item.eventList[index];
            name = element.name;
            if (element.lonlat.lon < 0) {
                element.lonlat.lon =
                    index != 0 &&
                    item.eventList[index - 1].lonlat.lon - element.lonlat.lon >
                        120
                        ? element.lonlat.lon * 1 + 360
                        : element.lonlat.lon;
            }
            let pointFeature;
            pointFeature = new Feature({
                geometry: new Point([element.lonlat.lon, element.lonlat.lat]),
                content: element.date,
                name: name
            });
            pointFeature.getGeometry().transform("EPSG:4326", "EPSG:3857");
            pointFeatures.push(pointFeature);
            lineString.push([element.lonlat.lon, element.lonlat.lat]);
        }
        let feature = new Feature({
            geometry: new LineString(lineString.reverse()),
            content: name,
            name: name
        });
        feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
        return feature;
    });
}

//图层展示改成多个layer id不同  初始化地图上展示线的 change需求变动展示航线名称改用Linestring
function showLineMap(map, lineData) {
    //设置样式
    let info = lineDataDispose(lineData);
    // 线填入layer
    info.multiLineString.forEach(item => {
        let linetemp = item;
        let layer = "";
        let layerId = linetemp.id;
        let lineFeature = new Feature({
            geometry: new LineString(linetemp.line),
            name: linetemp.name,
            color: linetemp.color,
            parentType: linetemp.route,
            content: linetemp.desc,
            id: Math.ceil(Math.random() * 1000)
        });
        lineFeature.getGeometry().transform("EPSG:4326", "EPSG:3857");
        if (getLayer(map, layerId)) {
            layer = getLayer(map, layerId);
            layer.getSource().addFeature(lineFeature);
        } else {
            layer = setShowLineStyleById(map, layerId);
            map.addLayer(layer);
            layer.getSource().addFeature(lineFeature);
        }
    });
    // 点填入layer
    info.pointFeatures.forEach(item => {
        let pointTemp = item;
        let pointLayer = "";
        let pointId = item.values_.id + "Point";
        if (getLayer(map, pointId)) {
            pointLayer = getLayer(map, pointId);
            pointLayer.getSource().addFeature(pointTemp);
        } else {
            pointLayer = setLinePointStyleById(map, pointId);
            map.addLayer(pointLayer);
            pointLayer.getSource().addFeature(pointTemp);
        }
    });
    if (info.pointFeatures.length > 0)
        map.getView().setCenter(
            info.pointFeatures[0].getGeometry().getFirstCoordinate()
        );

    // console.log(map.getLayers());
}
//线数据处理
function lineDataDispose(lineData) {
    let multiLineString = [];
    let pointFeatures = [];
    let types = [];
    lineData.forEach(temp => {
        types = temp
            .map(item => {
                return item.routeType;
            })
            .sort();
        for (let i = types.length - 1; i > 0; i--) {
            if (types[i] == types[i - 1]) {
                types.splice(i, 1);
            }
        }

        //归类设置颜色
        types.forEach(type => {
            let linetemp = temp.filter(item => item.routeType === type);
            let color;
            linetemp.forEach(lineItem => {
                color = color ? color : lineItem.information.color;
                let Coors = [];
                for (
                    let index = 0;
                    index < lineItem.information.location.length;
                    index++
                ) {
                    const element = lineItem.information.location[index];
                    if (element.lon < 0) {
                        element.lon =
                            index != 0 &&
                            lineItem.information.location[index - 1].lon -
                                element.lon >
                                120
                                ? element.lon * 1 + 360
                                : element.lon;
                    }
                    Coors.push([
                        parseFloat(element.lon),
                        parseFloat(element.lat)
                    ]);
                    if (
                        index == 0 ||
                        index == lineItem.information.location.length - 1
                    ) {
                        const feature = new Feature({
                            id: lineItem.routeType,
                            geometry: new Point([
                                parseFloat(element.lon),
                                parseFloat(element.lat)
                            ]),
                            name: `${element.name}`,
                            content: `${element.name}`,
                            parentType: lineItem.route,
                            type: lineItem.information.type,
                            color: lineItem.information.color
                        });
                        feature
                            .getGeometry()
                            .transform("EPSG:4326", "EPSG:3857");
                        pointFeatures.push(feature);
                    }
                }
                for (let index = 0; index < 5; index++) {
                    Coors = smooth(Coors);
                }
                // line.push(Coors);
                multiLineString.push({
                    id: lineItem.routeType,
                    route: lineItem.route,
                    color: color,
                    line: Coors,
                    name: lineItem.information.name,
                    desc: lineItem.information.desc
                });
            });
        });
    });
    return {
        multiLineString: multiLineString,
        pointFeatures: pointFeatures,
        types: types
    };
}

function setLinePointStyleById(map, pointId) {
    const styleFunction = function(feature, resolution) {
        const properties = feature.getProperties();
        const type = properties.type;
        const parentType = properties.parentType;
        const color = properties.color;
        let image = new CircleStyle({
            fill: new Fill({
                color: color ? color : "red"
            }),
            stroke: new Stroke({
                color: "white",
                width: 2
            }),
            radius: 4
        });
        if (map.getView().getZoom() > 4) {
            switch (type) {
                case "原油":
                    image = new Icon({
                        anchor: [0.6, 0.9],
                        src: require("@/assets/img/crudeOil.png")
                    });
                    break;
                case "天然气":
                    image = new Icon({
                        anchor: [0.6, 0.9],
                        src: require("@/assets/img/naturalGas.png")
                    });
                    break;
                default:
                    image = new Icon({
                        anchor: [0.6, 0.9],
                        src: require("@/assets/img/default.png")
                    });
            }
        }
        const styleConf = {
            image: image
        };
        let style = new Style(styleConf);
        return style;
    };
    var source = new VectorSource({});
    const layer = new VectorLayer({
        // 高亮地区图层
        source: source,
        style: styleFunction,
        id: pointId
    });
    layer.setZIndex(3);
    return layer;
}

function setShowLineStyleById(map, layerId) {
    let styleFunction = function(feature, resolution) {
        let properties = feature.getProperties();
        let style = {};
        let array = resizeArray(1, parseInt(60 / map.getView().getZoom()));
        style = new Style({
            stroke: new Stroke({
                //设置虚线
                lineDash: array,
                width: 3,
                color: properties.color ? properties.color : "red"
            })
        });
        return style;
    };
    var source = new VectorSource();
    let layer = new VectorLayer({
        // 高亮地区图层
        source: source,
        style: styleFunction,
        id: layerId
    });
    layer.setZIndex(3);
    return layer;
}

function showPointMap(map, pointData) {
    //处理点数据
    let features = disposePoint(pointData);
    // 点填入layer
    features.forEach(item => {
        let pointTemp = item;
        let pointLayer = "";
        let pointId = item.values_.id + "Point";
        if (getLayer(map, pointId)) {
            pointLayer = getLayer(map, pointId);
            pointLayer.getSource().addFeature(pointTemp);
        } else {
            pointLayer = setShowPointStyleById(map, pointId);
            map.addLayer(pointLayer);
            pointLayer.getSource().addFeature(pointTemp);
        }
    });
    if (features.length > 0)
        map.getView().setCenter(features[0].getGeometry().getFirstCoordinate());
}

function disposePoint(pointData) {
    let features = [];
    pointData.forEach(temp => {
        temp.forEach(pointTemp => {
            if (pointTemp.information.location) {
                const feature = new Feature({
                    id: pointTemp.routeType,
                    geometry: new Point([
                        parseFloat(pointTemp.information.location[0].lon),
                        parseFloat(pointTemp.information.location[0].lat)
                    ]),
                    name: `${pointTemp.information.name}`,
                    parentType: pointTemp.route,
                    country: pointTemp.information.country,
                    type: pointTemp.information.baseType,
                    routeType: pointTemp.routeType,
                    content: `${
                        !pointTemp.information.desc
                            ? pointTemp.name
                            : pointTemp.information.desc
                    }`
                });
                feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
                features.push(feature);
            }
        });
    });
    return features;
}

function setShowPointStyleById(map, pointId) {
    var styleFunction = function(feature, resolution) {
        const properties = feature.getProperties();
        let usColor = "#d85c5c";
        let otherColor = "#f0a6c2";
        let image = new Icon({
            anchor: [0.5, 0.5],
            src: require("@/assets/img/location.png")
        });
        if (properties.parentType == "MilitaryBase") {
            //军事基地
            switch (properties.type) {
                case "陆军单位或基地":
                    image = new Icon({
                        anchor: [0.5, 0.5],
                        src: require("@/assets/img/ArmyBasepng.png"),
                        color:
                            properties.country && properties.country == "美国"
                                ? usColor
                                : otherColor
                    });
                    break;
                case "海军单位或基地":
                    image = new Icon({
                        anchor: [0.5, 0.5],
                        src: require("@/assets/img/NavalBasepng.png"),
                        color:
                            properties.country && properties.country == "美国"
                                ? usColor
                                : otherColor
                    });
                    break;
                case "空军单位或基地":
                    image = new Icon({
                        anchor: [0.5, 0.5],
                        src: require("@/assets/img/AirBasepng.png"),
                        color:
                            properties.country && properties.country == "美国"
                                ? usColor
                                : otherColor
                    });
                    break;
            }
        } else {
            switch (properties.routeType) {
                //高科技企业
                case "HighTech":
                    image = new Icon({
                        anchor: [0.5, 0.5],
                        src: require("@/assets/img/HighTechIcon.png")
                    });
                    break;
                //军工企业
                case "Military":
                    image = new Icon({
                        anchor: [0.5, 0.5],
                        src: require("@/assets/img/HighTechPng.png"),
                        color: "#ea9651"
                    });
                    break;
                //战略石油储备
                case "Strategy":
                    image = new Icon({
                        anchor: [0.5, 0.5],
                        src: require("@/assets/img/Strategy.png")
                    });
                    break;
                //取暖油储备
                case "Heating":
                    image = new Icon({
                        anchor: [0.5, 0.5],
                        src: require("@/assets/img/HeatingPng.png"),
                        color: "#ca93db"
                    });
                    break;
                //东北汽油储备
                case "Northeast":
                    image = new Icon({
                        anchor: [0.5, 0.5],
                        src: require("@/assets/img/Northeast.png")
                    });
                    break;
            }
        }
        image.setScale(
            0.15 * map.getView().getZoom() > 1
                ? 1
                : 0.15 * map.getView().getZoom()
        );
        const styleConf = {
            image: image
        };
        if (map.getView().getZoom() > 8) {
            if (properties.name) {
                styleConf.text = new Text({
                    text: properties.name,
                    font: "bold 10px Arial,x-locale-body,sans-serif",
                    fill: new Fill({
                        color: "#FFFFFF"
                    }),
                    backgroundFill: new Fill({
                        color: "#123B46"
                    }),
                    backgroundStroke: new Stroke({
                        width: 1,
                        color: "#04C2C9"
                    }),
                    padding: [3, 3, 3, 3],
                    offsetY: 25,
                    overflow: true,
                    rotateWithView: true
                });
            }
        }
        return new Style(styleConf);
    };
    var source = new VectorSource();
    const layer = new VectorLayer({
        source: source,
        style: styleFunction,
        id: pointId
    });
    layer.setZIndex(5);
    return layer;
}
/**
 *
 *根据搜索内容显示地图数据
 * @param {*} map
 * @param {*} searchData
 */
function showSearchLineInMap(map, searchData) {
    let layer = "";
    let pointLayer = "";
    let line = [];
    let pointFeatures = [];
    if (searchData.location) {
        for (var index = 0; index < searchData.location.length; index++) {
            let item = searchData.location[index];
            let point = [parseFloat(item.lon), parseFloat(item.lat)];
            if (index == 0 || index == searchData.location.length - 1) {
                const feature = new Feature({
                    id: Math.ceil(Math.random() * 1000),
                    geometry: new Point(point),
                    name: `${item.name}`,
                    content: `${item.desc}`,
                    type: searchData.type,
                    color: searchData.color
                });
                feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
                pointFeatures.push(feature);
            }
            line.push(point);
        }
    } else {
        return;
    }
    let feature = new Feature({
        geometry: new LineString(line),
        name: searchData.name,
        color: searchData.color,
        content: searchData.desc,
        id: Math.ceil(Math.random() * 1000)
    });
    feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
    if (getLayer(map, "searchLine") && getLayer(map, "searchLinePoint")) {
        layer = getLayer(map, "searchLine");
        pointLayer = getLayer(map, "searchLinePoint");
        layer.getSource().clear();
        pointLayer.getSource().clear();
    } else {
        layer = setLineStyle(map, "searchLine");
        pointLayer = setLinePointStyle(map, "searchLinePoint");
        map.addLayer(layer);
        map.addLayer(pointLayer);
    }
    layer.getSource().addFeature(feature);
    map.getView().setCenter(feature.getGeometry().getFirstCoordinate());
    pointLayer.getSource().addFeatures(pointFeatures);
}
/**
 * 设置线的样式
 * @param {*} map 地图对象
 * @param {*} id  自定义id
 */
function setLineStyle(map, id) {
    let styleFunction = function(feature, resolution) {
        let properties = feature.getProperties();
        let style = {};
        let array = resizeArray(1, parseInt(60 / map.getView().getZoom()));
        style = new Style({
            stroke: new Stroke({
                //设置虚线
                lineDash: array,
                width: 3,
                color: properties.color ? properties.color : "red"
            })
        });
        return style;
    };
    var source = new VectorSource();
    let layer = new VectorLayer({
        // 高亮地区图层
        source: source,
        style: styleFunction,
        id: id
    });
    layer.setZIndex(3);
    return layer;
}
/**
 *通过搜索内容演示点位左边
 *
 * @param {*} map
 * @param {*} searchData
 */
function showSearchPointInMap(map, searchData) {
    let pointLayer = "";
    const feature = new Feature({
        id: searchData.id,
        geometry: new Point([
            parseFloat(searchData.information.location[0].lon),
            parseFloat(searchData.information.location[0].lat)
        ]),
        name: `${searchData.information.name}`,
        parentType: searchData.route,
        country: searchData.information.country,
        type: searchData.information.baseType
            ? searchData.information.baseType
            : searchData.routeType,
        content: `${
            !searchData.information.desc
                ? searchData.name
                : searchData.information.desc
        }`
    });
    feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
    if (getLayer(map, "searchPoint")) {
        pointLayer = getLayer(map, "searchPoint");
        pointLayer.getSource().clear();
    } else {
        pointLayer = setShowPointStyle(map, "searchPoint");
        map.addLayer(pointLayer);
    }
    map.getView().setCenter(feature.getGeometry().getCoordinates());
    pointLayer.getSource().addFeature(feature);
}

//战舰方向的面
function showFleetDirection(map, data) {
    let features = [];
    data.map(item => {
        let layer = "";
        let lineString = item.information.location.map(temp => [
            temp.lon,
            temp.lat
        ]);
        let start = lineString.slice(0, 2);
        let co = lineString.slice(2, lineString.length - 2);
        let end = lineString.slice(lineString.length - 2, lineString.length);
        for (let index = 0; index < 12; index++) {
            co = smooth(co);
        }
        let poolygon = new Polygon([start.concat(co).concat(end)]);
        let feature = new Feature({
            id: Math.ceil(Math.random() * 1000),
            geometry: poolygon,
            name: item.name,
            desc: item.name,
            type: item.routeType,
            parentType: item.route,
            color: item.information.color
        });
        let Id = item.routeType;
        feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
        features.push(feature);
        if (getLayer(map, Id)) {
            layer = getLayer(map, Id);
            layer.getSource().clear();
            layer.getSource().addFeature(feature);
        } else {
            var source = new VectorSource();
            var styleFunction = showFleetDirectionStyle;
            let layer = new VectorLayer({
                source: source,
                style: styleFunction,
                id: Id
            });
            map.addLayer(layer);
            layer.getSource().addFeature(feature);
            layer.setZIndex(10);
        }
    });
    if (features.length > 0)
        map.getView().setCenter(features[0].getGeometry().getFirstCoordinate());
}

function showFleetDirectionStyle(feature, resolution) {
    const properties = feature.getProperties();
    let styleConf = {};
    switch (feature.get("type")) {
        //3
        case "ThirdFleet":
            {
                styleConf = {
                    //面的颜色
                    fill: new Fill({
                        color: "rgba(166,157,99, 0.6)"
                    }),
                    //线的颜色
                    stroke: new Stroke({
                        width: 2,
                        color: properties.color
                            ? properties.color
                            : "rgba(136, 38, 179, 1)"
                    })
                };
            }
            break;
        //5
        case "FifthFleet":
            {
                styleConf = {
                    //面的颜色
                    fill: new Fill({
                        color: "rgba(166,99,99, 0.6)"
                    }),
                    //线的颜色
                    stroke: new Stroke({
                        width: 2,
                        color: properties.color
                            ? properties.color
                            : "rgba(136, 38, 179, 1)"
                    })
                };
            }
            break;
        //7
        case "SeventhFleet":
            {
                styleConf = {
                    //面的颜色
                    fill: new Fill({
                        color: "rgba(165,99,166, 0.6)"
                    }),
                    //线的颜色
                    stroke: new Stroke({
                        width: 2,
                        color: properties.color
                            ? properties.color
                            : "rgba(136, 38, 179, 1)"
                    })
                };
            }
            break;
    }

    if (properties.des) {
        styleConf.text = new Text({
            text: properties.des,
            font: "bold 16px Arial,x-locale-body,sans-serif",
            fill: new Fill({
                color: "#FFFFFF"
            }),
            backgroundFill: new Fill({
                color: "#123B46"
            }),
            backgroundStroke: new Stroke({
                width: 1,
                color: "#04C2C9"
            }),
            padding: [3, 3, 3, 3],
            offsetY: 40,
            overflow: true,
            rotateWithView: true
        });
    }
    return new Style(styleConf);
}

//战舰方向上的点
function showFleetPoint(map, data) {
    var Pointstyle = function(feature, resolution) {
        const properties = feature.getProperties();
        let image = new Icon({
            anchor: [0.5, 0.5],
            src: require("@/assets/img/Fleet.png"),
            color: "#4dd6e8"
        });
        if (map.getView().getZoom() <= 3) {
            image.setScale(0.8);
        }
        if (map.getView().getZoom() > 3) {
            image.setScale(0.8);
        }
        if (map.getView().getZoom() > 4) {
            image.setScale(1);
        }
        if (map.getView().getZoom() > 5) {
            image.setScale(1.2);
        }
        let config = {
            image: image
        };
        if (properties.des) {
            config.text = new Text({
                text: properties.des,
                font: "bold 10px Arial,x-locale-body,sans-serif",
                fill: new Fill({
                    color: "#FFFFFF"
                }),
                backgroundFill: new Fill({
                    color: "#123B46"
                }),
                backgroundStroke: new Stroke({
                    width: 1,
                    color: "#04C2C9"
                }),
                padding: [3, 3, 3, 3],
                offsetY: 25,
                overflow: true,
                rotateWithView: true
            });
        }
        return new Style(config);
    };
    data.map(item => {
        let layer = "";
        let point = new Feature({
            geometry: new Point([
                parseFloat(item.information.point[0]),
                parseFloat(item.information.point[1])
            ]),
            id: Math.ceil(Math.random() * 1000),
            type: item.routeType,
            parentType: item.route,
            des: item.information.des
        });
        point.getGeometry().transform("EPSG:4326", "EPSG:3857");
        let PointId = item.routeType + "Point";
        if (getLayer(map, PointId)) {
            layer = getLayer(map, PointId);
            layer.getSource().clear();
            layer.getSource().addFeature(point);
        } else {
            var source = new VectorSource();
            let layer = new VectorLayer({
                source: source,
                style: Pointstyle,
                id: PointId
            });
            map.addLayer(layer);
            layer.getSource().addFeature(point);
            layer.setZIndex(10);
        }
    });
}

//主张线
function showTerritorialClaim(map, data) {
    let features = [];
    let showTerritorialClaimStyle = function(feature, resolution) {
        let properties = feature.getProperties();
        let array = resizeArray(
            1,
            parseInt(
                30 /
                    (map.getView().getZoom() >= 6 ? 6 : map.getView().getZoom())
            )
        );
        let config = {
            stroke: new Stroke({
                lineDash: array,
                width: 3,
                color: properties.color ? properties.color : "red"
            })
        };
        return new Style(config);
    };
    data.map(item => {
        let layer = "";
        let TerritorialClaimName = "";
        if (item.routeType == "ChinaTerritory") {
            TerritorialClaimName = "中国领土主张线";
        }
        if (item.routeType == "VietnamTerritory") {
            TerritorialClaimName = "越南领土主张线";
        }
        if (item.routeType == "PhilippinesTerritory") {
            TerritorialClaimName = "菲律宾领土主张线";
        }
        let coor = item.information.location.map(temp => [temp.lon, temp.lat]);
        let feature = new Feature({
            geometry: new LineString(coor),
            name: TerritorialClaimName,
            type: item.routeType,
            parentType: item.route,
            content: item.type,
            color: item.information.color
        });
        feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
        features.push(feature);
        let Id = item.routeType;
        if (getLayer(map, Id)) {
            layer = getLayer(map, Id);
            layer.getSource().clear();
            layer.getSource().addFeature(feature);
        } else {
            var source = new VectorSource();
            let layer = new VectorLayer({
                source: source,
                style: showTerritorialClaimStyle,
                id: Id
            });
            map.addLayer(layer);
            layer.getSource().addFeature(feature);
            layer.setZIndex(20);
        }
    });
    if (features.length > 0)
        map.getView().setCenter(features[0].getGeometry().getFirstCoordinate());
}

//国界线
function addBoundary(map, data) {
    var geoJson = new GeoJSON();
    var features = geoJson.readFeatures(data);
    var featuresList = features.map(item => {
        item.getGeometry().transform("EPSG:4326", "EPSG:3857");
        return item;
    });
    var source = new VectorSource();
    let styleFunction = function(feature, resolution) {
        let properties = feature.getProperties();
        let style = {};
        style = new Style({
            stroke: new Stroke({
                width: 1,
                color: "white"
            })
        });
        return style;
    };
    let layer = new VectorLayer({
        // 高亮地区图层
        source: source,
        style: styleFunction,
        id: "boundary"
    });
    map.addLayer(layer);
    layer.getSource().addFeatures(features);
}

//轨迹筛选
function trajectoryAnalysis(map, data) {
    let pointFeatures = [];
    if (data) {
        let lineFeatures = trajectoryAnalysisData(pointFeatures, data);
        pointFeatures.forEach(item => {
            let pointId = item.values_.id + "Point";
            let PointLayer = "";
            if (getLayer(map, pointId)) {
                PointLayer = getLayer(map, pointId);
                PointLayer.getSource().addFeature(item);
            } else {
                var sourcePoint = new VectorSource();
                sourcePoint.addFeature(item);
                var styleFunctionPoint = trajectoryAnalysisPointStyle;
                PointLayer = new VectorLayer({
                    source: sourcePoint,
                    style: styleFunctionPoint,
                    id: pointId
                });
                map.addLayer(PointLayer);
            }
        });
        if (pointFeatures.length > 0)
            map.getView().setCenter(
                pointFeatures[0].getGeometry().getFirstCoordinate()
            );

        lineFeatures.forEach(item => {
            let lineId = item.values_.id + "Line";
            let lineLayer = "";
            if (getLayer(map, lineId)) {
                lineLayer = getLayer(map, lineId);
                lineLayer.getSource().addFeature(item);
            } else {
                var source = new VectorSource();
                var styleFunction = function trajectoryAnalysisStyle(
                    feature,
                    resolution
                ) {
                    var geometry = feature.getGeometry();
                    const properties = feature.getProperties();
                    var styles = [
                        new Style({
                            stroke: new Stroke({
                                color: properties.color
                                    ? properties.color
                                    : "#58C6FE",
                                width: 2
                            })
                        })
                    ];
                    if (map.getView().getZoom() > 5) {
                        geometry.forEachSegment(function(start, end) {
                            var dx = end[0] - start[0];
                            var dy = end[1] - start[1];
                            var rotation = Math.atan2(dy, dx);
                            styles.push(
                                new Style({
                                    geometry: new Point(end),
                                    image: new Icon({
                                        src: require("@/assets/img/arrow.png"),
                                        anchor: [0.75, 0.5],
                                        rotateWithView: true,
                                        rotation: -rotation
                                    })
                                })
                            );
                        });
                    }
                    return styles;
                };
                source.addFeature(item);
                lineLayer = new VectorLayer({
                    source: source,
                    style: styleFunction,
                    id: lineId
                });
                map.addLayer(lineLayer);
            }
        });
    }
}

function trajectoryAnalysisPointStyle(feature, resolution) {
    const properties = feature.getProperties();
    let styleConf = {
        image: new CircleStyle({
            fill: new Fill({
                color: properties.color ? properties.color : "#58C6FE"
            }),
            stroke: new Stroke({
                color: properties.color ? properties.color : "#58C6FE",
                width: 1
            }),
            radius: 3
        })
    };
    return new Style(styleConf);
}

function trajectoryAnalysisData(pointFeatures, data) {
    return data.map(item => {
        let lineString = [];
        let name = "";
        let Id = item.type;
        let parentType = item.parentType;
        for (let index = 0; index < item.eventList.length; index++) {
            const element = item.eventList[index];
            name = element.name;
            if (element.lonlat.lon < 0) {
                element.lonlat.lon =
                    index != 0 &&
                    item.eventList[index - 1].lonlat.lon - element.lonlat.lon >
                        120
                        ? element.lonlat.lon * 1 + 360
                        : element.lonlat.lon;
            }
            let pointFeature;
            pointFeature = new Feature({
                geometry: new Point([element.lonlat.lon, element.lonlat.lat]),
                content: element.date,
                name: name,
                id: Id,
                parentType: parentType,
                color: parentType == "1" ? "#CA86F1" : "#81A8EE"
            });
            pointFeature.getGeometry().transform("EPSG:4326", "EPSG:3857");
            pointFeatures.push(pointFeature);
            lineString.push([element.lonlat.lon, element.lonlat.lat]);
        }
        let feature = new Feature({
            geometry: new LineString(lineString.reverse()),
            content: name,
            name: name,
            id: Id,
            parentType: parentType,
            color: parentType == "1" ? "#CA86F1" : "#81A8EE"
        });
        feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
        return feature;
    });
}
/**
 * 监听航线图层数据
 * @param {*} map 地图对象
 * @param {*} layer  图层对象
 */
function layerOnMap(map, layer, pointLayer, huaquanquan) {
    map.addLayer(layer);
    map.addLayer(pointLayer);
    map.addLayer(huaquanquan);
    // let obj={};
    // var duration = 3000;
    // layer.on('postrender',event=>{
    //   var vectorContext = getVectorContext(event);
    //   var frameState = event.frameState;
    //   let features = event.target.getSource().getFeatures().filter(item=>{
    //     return item.getGeometry().getType()==="LineString";
    //   });
    //   let pointFeatures = event.target.getSource().getFeatures().filter(item=>{
    //         return item.getGeometry().getType()==="Point" && item.getProperties().score &&item.getProperties().showType=="point";
    //       });
    //   if(features.length>0){
    //   pointLayer.getSource().clear();
    //   let points=[];
    //     for(let i=0;i<features.length;i++){
    //       let feature = features[i];
    //       if(!obj[feature.ol_uid]||obj[feature.ol_uid].count==obj[feature.ol_uid].length){
    //         obj[feature.ol_uid]={};
    //         obj[feature.ol_uid].count=0;
    //         obj[feature.ol_uid].length=feature.getGeometry().getCoordinates().length-1;
    //       }

    //       let point=feature.getGeometry().getCoordinates()[obj[feature.ol_uid].count+1];
    //       points.push(new Feature({
    //         geometry:new Point(feature.getGeometry().getCoordinates()[obj[feature.ol_uid].count]),
    //         id: feature.values_.id,
    //         point:point,
    //         route:feature.values_.route,
    //         color:feature.values_.color
    //       }));
    //       obj[feature.ol_uid].count++;
    //     }
    //     pointLayer.getSource().addFeatures(points);

    // }
    // if(pointFeatures.length>0){
    //   var elapsed = frameState.time - start;
    //   var elapsedRatio = elapsed / duration;
    //   var radius = easeOut(elapsedRatio) * 15 + 5;
    //   var opacity = easeOut(1 - elapsedRatio*0.6);
    //   let features = event.target.getSource().getFeatures().filter(item=>{
    //     return item.getGeometry().getType()==="Point" && item.getProperties().score;
    //   });
    //   for(let i=0;i<features.length;i++){
    //     let feature = features[i];
    //     var flashGeom = feature.getGeometry().clone();
    //      var style = new Style({
    //     image: new CircleStyle({
    //       radius: radius,
    //       stroke: new Stroke({
    //         color: 'rgba(0, 0, 255, ' + opacity + ')',
    //         width: 0.25 + opacity,
    //       }),
    //     }),
    //   });
    //     vectorContext.setStyle(style);
    //     vectorContext.drawGeometry(flashGeom);
    //   }
    // }
    // map.render();
    // });

    // map.render();
}
/**
 * 添加航线数据到一个图层上面去啊
 * @param {*} map 地图对象
 * @param {*} lines  航线数据
 */
function showLineOnLayer(map, datas, flag) {
    //设置样式
    let layer = "";
    let features = [];
    layer = getLayer(map, "lineLayer");
    if (flag) {
        let info = showLineDataHandle(datas);
        info.multiLineString.forEach(item => {
            let feature = new Feature({
                geometry: new LineString(item.line),
                name: item.name,
                color: item.color,
                content: item.desc,
                route: item.route,
                id: item.route
            });
            feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
            features.push(feature);
        });
        layer.getSource().addFeatures(info.pointFeatures);
    } else {
        start = new Date().getTime();
        features = playPointHandle(datas);
        if (features.length > 0)
            map.getView().setCenter(
                features[0].getGeometry().getFirstCoordinate()
            );
    }
    layer.getSource().addFeatures(features);
    return features;
}
function showLineDataHandle(lines) {
    let multiLineString = [];
    let pointFeatures = [];
    lines.forEach(temp => {
        let routeTypes = temp
            .map(item => {
                return item.routeType;
            })
            .sort();
        for (let i = routeTypes.length - 1; i > 0; i--) {
            if (routeTypes[i] == routeTypes[i - 1]) {
                routeTypes.splice(i, 1);
            }
        }
        routeTypes.forEach(route => {
            let linetemp = temp.filter(
                tempLine => tempLine.routeType === route
            );
            let color;
            linetemp.forEach(lineItem => {
                color = color ? color : lineItem.information.color;
                let Coors = [];
                for (
                    let index = 0;
                    index < lineItem.information.location.length;
                    index++
                ) {
                    const element = lineItem.information.location[index];
                    if (element.lon < 0) {
                        element.lon =
                            index != 0 &&
                            lineItem.information.location[index - 1].lon -
                                element.lon >
                                120
                                ? element.lon * 1 + 360
                                : element.lon;
                    }
                    Coors.push([
                        parseFloat(element.lon),
                        parseFloat(element.lat)
                    ]);
                    if (
                        index == 0 ||
                        index == lineItem.information.location.length - 1
                    ) {
                        const feature = new Feature({
                            id: route,
                            geometry: new Point([
                                parseFloat(element.lon),
                                parseFloat(element.lat)
                            ]),
                            name: element.name
                                ? element.name
                                : lineItem.information.name,
                            content: element.name
                                ? element.name
                                : lineItem.information.name,
                            parentType: lineItem.type,
                            showPointType: lineItem.information.type,
                            type: route,
                            color: lineItem.information.color,
                            desc: lineItem.information.desc
                                ? lineItem.information.desc
                                : lineItem.information.name,
                            showType: "line"
                        });
                        feature
                            .getGeometry()
                            .transform("EPSG:4326", "EPSG:3857");
                        pointFeatures.push(feature);
                    }
                }
                let tempInt = 5;
                if (lineItem.information.type == "Line") {
                    tempInt = 15;
                }
                for (let index = 0; index < tempInt; index++) {
                    Coors = smooth(Coors);
                }
                multiLineString.push({
                    color: color,
                    route: route,
                    line: Coors,
                    name: lineItem.information.name,
                    desc: lineItem.information.desc
                });
            });
        });
    });
    return {
        multiLineString: multiLineString,
        pointFeatures: pointFeatures
    };
}

/**
 * 添加航线和端点layer
 * @param {*} map 地图对象
 * @param {*} layerId  航线layerid
 */
function setLayerStyleById(map, layerId) {
    let styleFunction = function(feature, resolution) {
        const properties = feature.getProperties();
        const type = properties.type;
        const showType = properties.showType;
        const showPointType = properties.showPointType;
        const parentType = properties.parentType;
        let color = properties.color;
        let styleConf = {};
        let style = {};
        let image = new CircleStyle({
            fill: new Fill({
                color: color ? color : "red"
            }),
            stroke: new Stroke({
                color: "white",
                width: 2
            }),
            radius: 4
        });
        if (showType == "line") {
            let array = resizeArray(1, parseInt(60 / map.getView().getZoom()));
            if (map.getView().getZoom() > 4) {
                switch (showPointType) {
                    case "原油":
                        image = new Icon({
                            anchor: [0.6, 0.9],
                            src: require("@/assets/img/crudeOil.png")
                        });
                        break;
                    case "天然气":
                        image = new Icon({
                            anchor: [0.6, 0.9],
                            src: require("@/assets/img/naturalGas.png")
                        });
                        break;
                    default:
                        if (type == "Line") {
                            image = new Icon({
                                anchor: [0.6, 0.9],
                                src: require("@/assets/img/PlanShow.png")
                            });
                        } else {
                            image = new Icon({
                                anchor: [0.6, 0.9],
                                src: require("@/assets/img/default.png")
                            });
                        }
                }
            }
        } else if (showType == "point") {
            let anchor = [0.5, 0.5];
            let usColor = "#d85c5c";
            let otherColor = "#f0a6c2";
            let src = location;
            color =
                properties.country && properties.country == "美国"
                    ? usColor
                    : otherColor;
            if (properties.parentType == "MilitaryBase") {
                //军事基地
                switch (properties.type) {
                    case "陆军单位或基地":
                        src = ArmyBasepng;
                        break;
                    case "海军单位或基地":
                        src = NavalBasepng;
                        break;
                    case "空军单位或基地":
                        src = AirBasepng;
                        break;
                }
            } else {
                switch (properties.routeType) {
                    //高科技企业
                    case "HighTech":
                        src = HighTechIcon;
                        break;
                    //军工企业
                    case "Military":
                        src = HighTechPng;
                        color = "#ea9651";
                        break;
                    //战略石油储备
                    case "Strategy":
                        src = Strategy;
                        break;
                    //取暖油储备
                    case "Heating":
                        src = HeatingPng;
                        color = "#ca93db";
                        break;
                    //东北汽油储备
                    case "Northeast":
                        src = Northeast;
                        break;
                }
            }

            if (map.getView().getZoom() > 8) {
                if (properties.name) {
                    styleConf.text = new Text({
                        text: properties.name,
                        font: "bold 10px Arial,x-locale-body,sans-serif",
                        fill: new Fill({
                            color: "#FFFFFF"
                        }),
                        backgroundFill: new Fill({
                            color: "#123B46"
                        }),
                        backgroundStroke: new Stroke({
                            width: 1,
                            color: "#04C2C9"
                        }),
                        padding: [3, 3, 3, 3],
                        offsetY: 25,
                        overflow: true,
                        rotateWithView: true
                    });
                }
            }
            image = new Icon({
                anchor: anchor,
                src: src,
                color: color
            });
            image.setScale(
                0.15 * map.getView().getZoom() > 1
                    ? 1
                    : 0.15 * map.getView().getZoom()
            );
        }
        styleConf = {
            stroke: new Stroke({
                //设置虚线
                // lineDash: array,
                width: 2,
                color: color ? color : "red"
            }),
            image: image
        };
        style = new Style(styleConf);
        return style;
    };
    var source = new VectorSource();
    let layer = new VectorLayer({
        // 高亮地区图层
        source: source,
        style: styleFunction,
        id: layerId
    });
    layer.setZIndex(3);
    return layer;
}

/**
 * 动图效果
 * @param {*} map 地图对象
 * @param {*} layerId  layerid
 */
function setLayerStylePointById(map, layerId) {
    let styleFunction = function(feature, resolution) {
        var geometry = feature.getGeometry().getCoordinates();
        const properties = feature.getProperties();
        const type = properties.route;
        let point = properties.point;
        let pointFirst = transform3To4(geometry);
        let pointNext = transform3To4(point);
        let x = pointFirst[0] - pointNext[0];
        let y = pointFirst[1] - pointNext[1];
        var rotation = Math.atan2(y, x) - Math.PI;
        let src = gas;
        switch (type) {
            case "BeltRoad":
                src = six;
                // console.log(rotation);
                rotation = rotation - Math.PI;
                break;
            case "SeaRoute":
                src = sea;
                break;
            case "MiddleEast":
                // console.log(rotation);
                rotation = rotation - Math.PI;
                src = oil;
                break;
            case "Port":
                src = port;
                break;
            case "Line":
                src = line;
                break;
        }

        let style = {};
        let image = new Icon({
            src: src,
            anchor: [0.75, 0.5],
            rotateWithView: true,
            rotation: -rotation
        });
        style = new Style({
            image: image
        });
        return style;
    };
    var source = new VectorSource();
    let layer = new VectorLayer({
        // 高亮地区图层
        source: source,
        style: styleFunction,
        id: layerId
    });
    layer.setZIndex(4);
    return layer;
}
/**
 *
 * @param {*} map 地图对象
 * @param {*} hotData  热力数据
 */
function addHotMapLayer(map, hotData) {
    let vector = "";
    let features = [];
    hotData.forEach(item => {
        let coor = [parseFloat(item.lat), parseFloat(item.lon)];
        const feature = new Feature({
            geometry: new Point(coor),
            weight: 0.5,
            hot: "hot",
            area: item.location,
            levelOne: item.level_one
        });
        feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
        features.push(feature);
    });
    if (!getLayer(map, "hotMapLayer")) {
        vector = new HeatmapLayer({
            source: new VectorSource(),
            blur: 10,
            radius: 5,
            weight: function(feature) {
                return parseFloat(feature.getProperties().weight);
            },
            id: "hotMapLayer"
        });
        vector.setZIndex(39);
        map.addLayer(vector);
    } else {
        vector = getLayer(map, "hotMapLayer");
    }
    vector.getSource().addFeatures(features);
}
/**
 * 移除热力图
 * @param {*} map 地图对象
 *
 */
function removeHotMapLayerData(map) {
    if (getLayer(map, "hotMapLayer")) {
        getLayer(map, "hotMapLayer")
            .getSource()
            .clear();
    }
}
/**
 *  给点位添加动画效果
 * @param {*} map  地图对象
 * @param {*} pointId  图层id
 */
function setPlayPointById(map, pointId) {
    var styleFunction = function(feature, resolution) {
        const properties = feature.getProperties();
        let anchor = [0.5, 0.5];
        let usColor = "#d85c5c";
        let otherColor = "#f0a6c2";
        let src = location;
        let color =
            properties.country && properties.country == "美国"
                ? usColor
                : otherColor;
        if (properties.parentType == "MilitaryBase") {
            //军事基地
            switch (properties.type) {
                case "陆军单位或基地":
                    src = ArmyBasepng;
                    break;
                case "海军单位或基地":
                    src = NavalBasepng;
                    break;
                case "空军单位或基地":
                    src = AirBasepng;
                    break;
            }
        } else {
            switch (properties.routeType) {
                //高科技企业
                case "HighTech":
                    src = HighTechIcon;
                    break;
                //军工企业
                case "Military":
                    src = HighTechPng;
                    color = "#ea9651";
                    break;
                //战略石油储备
                case "Strategy":
                    src = Strategy;
                    break;
                //取暖油储备
                case "Heating":
                    src = HeatingPng;
                    color = "#ca93db";
                    break;
                //东北汽油储备
                case "Northeast":
                    src = Northeast;
                    break;
            }
        }
        let image = new Icon({
            anchor: anchor,
            src: src,
            color: color
        });
        image.setScale(
            0.15 * map.getView().getZoom() > 1
                ? 1
                : 0.15 * map.getView().getZoom()
        );
        const styleConf = {
            image: image
        };
        if (map.getView().getZoom() > 8) {
            if (properties.name) {
                styleConf.text = new Text({
                    text: properties.name,
                    font: "bold 10px Arial,x-locale-body,sans-serif",
                    fill: new Fill({
                        color: "#FFFFFF"
                    }),
                    backgroundFill: new Fill({
                        color: "#123B46"
                    }),
                    backgroundStroke: new Stroke({
                        width: 1,
                        color: "#04C2C9"
                    }),
                    padding: [3, 3, 3, 3],
                    offsetY: 25,
                    overflow: true,
                    rotateWithView: true
                });
            }
        }
        return new Style(styleConf);
    };
    var source = new VectorSource();
    const layer = new VectorLayer({
        source: source,
        style: styleFunction,
        id: pointId
    });
    layer.setZIndex(5);
    return layer;
}
function showPlayPointMap(map, pointData) {
    //处理点数据
    start = new Date().getTime();
    let features = playPointHandle(pointData);
    let layer = getLayer(map, "PointPlayer");
    layer.getSource().addFeatures(features);
    if (features.length > 0)
        map.getView().setCenter(features[0].getGeometry().getFirstCoordinate());
}

function playPointHandle(pointData) {
    let features = [];
    pointData.forEach(temp => {
        temp.forEach(pointTemp => {
            if (pointTemp.information.location) {
                const feature = new Feature({
                    id: pointTemp.routeType,
                    geometry: new Point([
                        parseFloat(pointTemp.information.location[0].lon),
                        parseFloat(pointTemp.information.location[0].lat)
                    ]),
                    name: `${pointTemp.information.name}`,
                    parentType: pointTemp.route,
                    country: pointTemp.information.country,
                    type: pointTemp.information.baseType,
                    routeType: pointTemp.routeType,
                    score: pointTemp.information.score,
                    content: `${
                        !pointTemp.information.desc
                            ? pointTemp.name
                            : pointTemp.information.desc
                    }`,
                    showType: "point"
                });
                feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
                features.push(feature);
            }
        });
    });
    return features;
}
function timeDataHandle(feature, point, obj) {
    return new Feature({
        geometry: new Point(
            feature.getGeometry().getCoordinates()[obj[feature.ol_uid].count]
        ),
        id: feature.values_.id,
        point: point,
        route: feature.values_.route,
        color: feature.values_.color
    });
}
function setQaunQaunStyle(map, id) {
    let styleFunction = function(feature, resolution) {
        let properties = feature.getProperties();
        const radius = properties.diff;
        var score = parseInt(properties.score);
        let opacity = 1 - properties.diff / 35;
        let color = "rgba(255, 0, 0, " + opacity + ")";
        let withtest = 3.25 + opacity;
        if (score < 10) {
            color = "rgba(0,128,0, " + opacity + ")";
        } else if (score > 9) {
            color = "rgba(255,255,0, " + opacity + ")";
            if (score > 29) {
                color = "rgba(255, 0, 0, " + opacity + ")";
                opacity = opacity + 2;
            }
        }
        if (radius > 30) {
            withtest = 0;
        }
        let styleConf = {
            image: new CircleStyle({
                radius: radius,
                stroke: new Stroke({
                    color: color,
                    width: 0
                }),
                fill: new Fill({
                    color: color
                })
            })
        };
        let style = new Style(styleConf);
        return style;
    };
    var source = new VectorSource();
    let layer = new VectorLayer({
        // 高亮地区图层
        source: source,
        style: styleFunction,
        id: id
    });
    layer.setZIndex(2);
    return layer;
}
function quanquanHandle(pointFeatures, diff) {
    return pointFeatures.map(item => {
        const properties = item.getProperties();
        var flashGeom = item.getGeometry().clone();
        console.log(properties.score);
        return new Feature({
            geometry: flashGeom,
            score: properties.score,
            diff: diff
        });
    });
}
//导出函数
const util = {
    setDrawStyle: setDrawStyle,
    addControlInMap: addControlInMap,
    setDraw: setDraw,
    delInMap: delInMap,
    getLayer: getLayer,
    setLineStringStyle: setLineStringStyle,
    setPointStyle: setPointStyle,
    addFeatureDrawLine: addFeatureDrawLine,
    setDetailsMapStyle: setDetailsMapStyle,
    addFeatureOnePoint: addFeatureOnePoint,
    addLegendControl: addLegendControl,
    showMultiPolygon: showMultiPolygon,
    showLineInMap: showLineInMap,
    showPointInMap: showPointInMap,
    addOverlay: addOverlay,
    transform3To4: transform3To4,
    transform4To3: transform4To3,
    animationPlay: animationPlay,
    showCommandInMap: showCommandInMap,
    showCommandCenterInMap: showCommandCenterInMap,
    showInMapTerritorialClaim: showInMapTerritorialClaim,
    showInMapFleetDirection: showInMapFleetDirection,
    showFleetPointInMap: showFleetPointInMap,
    showTrajectory: showTrajectory,
    showLineMap: showLineMap,
    showPointMap: showPointMap,
    showSearchLineInMap: showSearchLineInMap,
    showSearchPointInMap: showSearchPointInMap,
    showFleetDirection: showFleetDirection,
    showFleetPoint: showFleetPoint,
    showTerritorialClaim: showTerritorialClaim,
    addBoundary: addBoundary,
    trajectoryAnalysis: trajectoryAnalysis,
    setLayerStyleById: setLayerStyleById,
    layerOnMap: layerOnMap,
    showLineOnLayer: showLineOnLayer,
    setLayerStylePointById: setLayerStylePointById,
    addHotMapLayer: addHotMapLayer,
    removeHotMapLayerData: removeHotMapLayerData,
    setPlayPointById: setPlayPointById,
    showPlayPointMap: showPlayPointMap,
    timeDataHandle: timeDataHandle,
    setQaunQaunStyle: setQaunQaunStyle,
    quanquanHandle: quanquanHandle
};
export default util;
