<template>
  <div>
    <div ref="hotMap" id="hotMap" :style="'width:100%;height:400px;'"></div>
  </div>
</template>

<script>
  import "ol/ol.css";
  import Map from 'ol/Map';
  // import OSM from 'ol/source/OSM';
  import TileLayer from 'ol/layer/Tile';
  import View from 'ol/View';
  import XYZ from 'ol/source/XYZ';
  import {
    defaults as defaultControls,
    FullScreen,
    ScaleLine,
    ZoomSlider
  } from 'ol/control.js';
  import Projection from 'ol/proj/Projection';
  import {
    fromLonLat
  } from 'ol/proj';
  import {
    LineString,
    MultiPolygon,
    Point,
    Polygon
  } from "ol/geom";
  import Feature from "ol/Feature";
  import {
    Heatmap as HeatmapLayer,
    Vector as VectorLayer
  } from "ol/layer";
  import {
    Vector as VectorSource
  } from "ol/source";
  import Overlay from "ol/Overlay";
  import {
    Circle as CircleStyle,
    Fill,
    Icon,
    Stroke,
    Style,
    Text
  } from "ol/style";
  import {
    transform
  } from "ol/proj";
  import smooth from "chaikin-smooth";
  import {
    log
  } from '@antv/g2plot/lib/utils';
  import animationIcon from "@/assets/image/animation.png";
  import icon from "@/assets/image/icon.png";



  export default {
    name: 'olgismap',
    props: {
      dataObj: Object,
    },
    data() {
      return {
        dataInfo:{
          map: '',
          mapData: {
            center: [103.00, 36.00],
            zoom: 4,
            minZoom: 2,
            maxZoom: 19,
          },
          hotData: []
        }
      }
    },
    watch:{
      dataObj: {
          handler(newValue, oldValue) {
            // this.dataObj =  newValue;
            this.init();
          },
          deep: true
        }
    },
    mounted() {
        this.$nextTick(function () {
				this.dataInfo = this.dataObj ? this.dataObj : this.dataInfo;
        this.init();
         console.log(222222,this.dataObj)
         console.log(3333333,this.dataInfo)
				this.updateData(this.dataInfo);

            // this.updateData(this.dataInfo)
        })
    },
    methods: {
      //地图初始化
      init() {
        let that = this;
        //地图的基础配置
        this.dataInfo.map = new Map({
          target: 'hotMap',
          //新建视图
          view: new View({
            //设置中心点，将转换坐标点经度/纬度转换为其他投影，默认值为Web Mercator，即“ EPSG：3857”。
            center: fromLonLat(that.dataInfo.mapData.center),
            //设置缩放级别
            zoom: that.dataInfo.mapData.zoom || 4,
            //设置最小缩放级别
            minZoom: that.dataInfo.mapData.minZoom || 2,
            //设置最大缩放级别
            maxZoom: that.dataInfo.mapData.maxZoom || 19,
          }),
          layers: [
            // new TileLayer({
            //   source: new OSM(),
            // }),
            // 使用谷歌地图或者本地地图
            new TileLayer({
              source: new XYZ({
                // url: 'http://'+location.host+'/server/map/{x}/{y}/{z}'
                url: 'http://192.168.30.225:9000/server/map/{x}/{y}/{z}'
                // url: "http://mt2.google.cn/vt/lyrs=y&hl=zh-CN&gl=CN&src=app&x={x}&y={y}&z={z}&s=G",
              })
            }),
            new TileLayer({
              source: new XYZ({
                // url: 'http://'+location.host+'/server/mapImage/{x}/{y}/{z}'
                url: 'http://192.168.30.225:9000/server/mapImage/{x}/{y}/{z}'
                // url: "http://mt2.google.cn/vt/lyrs=y&hl=zh-CN&gl=CN&src=app&x={x}&y={y}&z={z}&s=G",
              })
            }),
          ],
        });

      },

      //数据更新
      /**
       *
       * @param {*} map 地图对象
       * @param {*} hotData  热力数据
       */
      updateData(obj) {
        let features = [];
        let that = this;
        obj.hotData.forEach(item => {
          let coor = [parseFloat(item.lat), parseFloat(item.lon)];
          const feature = new Feature({
            geometry: new Point(coor),
            weight: 5,
            hot: "hot",
            area: item.location,
            levelOne: item.level_one
          });
          feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
          features.push(feature);
        });
        // console.log('features',features)
          let vector = new HeatmapLayer({
            source: new VectorSource(),
            blur: 10,
            radius: 5,
            weight: function(feature) {
              return parseFloat(feature.getProperties().weight);
            },
            id: "hotMap2"
          });
          vector.setZIndex(39);
          obj.map.addLayer(vector);
        vector.getSource().addFeatures(features);
          // console.log('vector',vector)
      },
      /**
       * 移除热力图
       * @param {*} map 地图对象
       *
       */
      removeHotMapLayerData(map) {
        if (getLayer(map, "hotMap2")) {
          getLayer(map, "hotMap2")
            .getSource()
            .clear();
        }
      }

    },
    destroyed() {
      //清除动画的定时器
      clearInterval(this.time);
      clearInterval(this.pointTime);
    },
  }
</script>

<style scoped>

</style>
