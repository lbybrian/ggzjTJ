import TileLayer from "ol/layer/Tile";
import { Vector as VectorLayer } from "ol/layer";
import { OSM, VectorSource } from "ol/source";
import GeoJSON from "ol/format/GeoJSON";
import XYZ from "ol/source/XYZ";
import Projection from "ol/proj/Projection";
import View from "ol/View";
import Map from "ol/Map";
import WMTS from "ol/source/WMTS";
import WMT from "ol/tilegrid/WMTS";
import store from "@/store";
import { defaults } from "ol/interaction";
import {
    defaults as defaultControls,
    FullScreen,
    ScaleLine,
    ZoomSlider
} from "ol/control.js";
import Zoom from "ol/control/Zoom";
export default class BaseMapInit {
    constructor(target) {
        this._target = target;
    }
    //初始化地图进行加载地图和图注
    init() {
        var center = [12199989.552772947, 2985394.460184454];
        this.map = new Map({
            target: this._target,
            // 隐藏默认的放大缩小按钮defaultControls({zoom: false})
            controls: defaultControls({
                zoom: false, //隐藏默认的放大缩小按钮
                zoomOptions: {
                    zoomInLabel: "",
                    zoomOutLabel: "",
                    zoomInTipLabel: " ",
                    zoomOutTipLabel: " "
                }
            }).extend([
                //隐藏全屏
                new FullScreen({
                    tipLabel: " ",
                    label: "",
                    labelActive: ""
                }),
                // new ZoomSlider()
                //比例尺
                new ScaleLine({ bar: true, text: true, minWidth: 90 })
            ]),
            interactions: defaults({
                doubleClickZoom: false //屏蔽双击放大事件
            }),
            view: new View({
                center: center,
                zoom: 3,
                minZoom: 3,
                maxZoom: 11
            }),
            layers: [
                new TileLayer({
                    source: new XYZ({
                        url:"http://192.168.30.225:9000/server/map/{x}/{y}/{z}"
                        // url: "http://"+location.host+"/server/map/{x}/{y}/{z}"
                    //    url:" http://10.107.20.1/googlemaps/satellite/{x}/{y}/{z}.jpg"
                     // url: 'http://www.lfmtest.site/server/map/{x}/{y}/{z}'

                        // url:"http://webst01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=6&x={x}&y={y}&z={z}"
                        // url: "http://mt2.google.cn/vt/lyrs=y&hl=zh-CN&gl=CN&src=app&x={x}&y={y}&z={z}&s=G",
                    })
                }),
                new TileLayer({
                    source: new XYZ({
                //         // url:"http://webst01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}"
                        url:  "http://192.168.30.225:9000/server/mapImage/{x}/{y}/{z}"
                        // url:  "http://"+location.host+"/server/mapImage/{x}/{y}/{z}"
                //         // url: 'http://www.lfmtest.site/server/mapImage/{x}/{y}/{z}'
                //         // url: "http://mt2.google.cn/vt/lyrs=y&hl=zh-CN&gl=CN&src=app&x={x}&y={y}&z={z}&s=G",
                    })
                })
            ]
        });
        this.map.on("movestart", function(evt) {
            evt.map.getTargetElement().style.cursor = "Move";
        });

        this.map.on("moveend", function(evt) {
            evt.map.getTargetElement().style.cursor = "Default";
        });
    }

    inita() {
        var bounds = [75, 1, 140, 55]; // 范围
        //获取地图样式
        this.tiandituSatelliteLayer = new TileLayer({
            visible: true,
            source:
                // this.constructSource()
                new XYZ({
                    // url: 'http://localhost:9000/server/map/{x}/{y}/{z}'
                    url:
                        "http://mt2.google.cn/vt/lyrs=y&hl=zh-CN&gl=CN&src=app&x={x}&y={y}&z={z}&s=G" // 谷歌卫星地图 混合
                }),
            //设置投影WGS84
            projection: "EPSG:4326"
        });
        var projection = new Projection({
            // 设置地图投影
            code: "EPSG:4326", // 投影编码
            units: "degrees",
            axisOrientation: "enu",
            global: true
        });

        var view = new View({
            // 设置地图
            // 设置投影
            projection: projection,
            zoom: 5,
            minZoom: 1,
            maxZoom: 18,
            extent: [-180, -80, 180, 85]
        });

        this.map = new Map({
            // 只添加地图全屏功能控件 及扩大缩小按钮控件
            controls: defaultControls().extend([new FullScreen()]),
            // 设置显示的容器
            target: this._target,
            // 设置图层
            layers: [
                // 添加图层
                this.tiandituSatelliteLayer
            ],
            // 设置视图
            view: view,
            interactions: defaults({
                doubleClickZoom: false //屏蔽双击放大事件
            })
        });

        this.map.on("movestart", function(evt) {
            evt.map.getTargetElement().style.cursor = "Move";
        });

        this.map.on("moveend", function(evt) {
            evt.map.getTargetElement().style.cursor = "Default";
        });

        this.map.getView().fit(bounds, this.map.getSize());
    }
    //添加layer图层
    addLayer(layer) {
        this.map.addLayer(layer);
    }
    //移除图层
    removeLayer(layer) {
        this.map.removeLayer(layer);
    }
    //通过id获取图层
    getLayer(layerId) {
        var layers = this.map.getLayers().getArray();
        for (var i = 0; i < layers.length; i++) {
            if (layers[i].getProperties().id === layerId) {
                return layers[i];
            }
        }
    }
    //获取所有图层
    getLayers() {
        var layerColls = this.map.getLayers();
        return layerColls;
    }
    //通过layerid为layer添加数据
    addFeatures(features, layerId) {
        var layer = this.getLayer(layerId);
        layer.getSource().addFeatures(features);
    }
    //通过layerid为layer添加数据
    addFeature(feature, layerId) {
        var layer = this.getLayer(layerId);
        layer.getSource().addFeature(feature);
    }

    // 添加地图交互
    addInteraction(interaction) {
        this.map.addInteraction(interaction);
    }
    // 移除地图交互
    removeInteraction(interaction) {
        this.map.removeInteraction(interaction);
    }
    //layer 下的所有feature
    getFeaturesByIds(ids, layerId) {
        var source = this.getLayer(layerId).getSource();
        var features = [];
        for (let i = 0; i < ids.length; i++) {
            const id = ids[i];
            features.push(source.getFeatureById(id));
        }
        return features;
    }

    //layer 下的所有feature
    getFeatureById(id, layerId) {
        var source = this.getLayer(layerId).getSource();
        var feature = source.getFeatureById(id);
        return feature;
    }
    //初始化本地地图数据
    constructSource() {
        var gridsetName = "EPSG:4326";
        var gridNames = [
            "EPSG:4326:0",
            "EPSG:4326:1",
            "EPSG:4326:2",
            "EPSG:4326:3",
            "EPSG:4326:4",
            "EPSG:4326:5",
            "EPSG:4326:6",
            "EPSG:4326:7",
            "EPSG:4326:8",
            "EPSG:4326:9",
            "EPSG:4326:10",
            "EPSG:4326:11",
            "EPSG:4326:12",
            "EPSG:4326:13",
            "EPSG:4326:14",
            "EPSG:4326:15",
            "EPSG:4326:16",
            "EPSG:4326:17",
            "EPSG:4326:18",
            "EPSG:4326:19",
            "EPSG:4326:20",
            "EPSG:4326:21"
        ];
        var style = "";
        var format = "image/png";
        var layerName = "gooleMap:gooleMapL0";
        var projection = new Projection({
            code: "EPSG:4326",
            units: "degrees",
            axisOrientation: "neu"
        });
        var baseUrl = store.state.mapVuex.url;
        var params = {
            VERSION: "1.0.0",
            LAYER: layerName,
            STYLE: style,
            TILEMATRIX: gridNames,
            TILEMATRIXSET: gridsetName,
            SERVICE: "WMTS",
            FORMAT: format
        };
        var baseParams = [
            "VERSION",
            "LAYER",
            "STYLE",
            "TILEMATRIX",
            "TILEMATRIXSET",
            "SERVICE",
            "FORMAT"
        ];
        var url = baseUrl + "?";
        var resolutions = [
            0.703125,
            0.3515625,
            0.17578125,
            0.087890625,
            0.0439453125,
            0.02197265625,
            0.010986328125,
            0.0054931640625,
            0.00274658203125,
            0.001373291015625,
            6.866455078125e-4,
            3.4332275390625e-4,
            1.71661376953125e-4,
            8.58306884765625e-5,
            4.291534423828125e-5,
            2.1457672119140625e-5,
            1.0728836059570312e-5,
            5.364418029785156e-6,
            2.682209014892578e-6,
            1.341104507446289e-6,
            6.705522537231445e-7,
            3.3527612686157227e-7
        ];
        for (var param in params) {
            if (baseParams.indexOf(param.toUpperCase()) < 0) {
                url = url + param + "=" + params[param] + "&";
            }
        }
        url = url.slice(0, -1);
        var source = new WMTS({
            url: url,
            layer: params["LAYER"],
            matrixSet: params["TILEMATRIXSET"],
            format: params["FORMAT"],
            projection: projection,
            tileGrid: new WMT({
                tileSize: [256, 256],
                extent: [-180.0, -90.0, 180.0, 90.0],
                origin: [-180.0, 90.0],
                resolutions: resolutions,
                matrixIds: params["TILEMATRIX"]
            }),
            style: params["STYLE"],
            wrapX: true
        });
        return source;
    }
}
