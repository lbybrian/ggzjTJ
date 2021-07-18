<template>
  <div style="padding: 20px 40px">
    <div style="margin-bottom: 10px; width: 1000px">
      <el-alert type="warning" title="基于openLayers的Gis地图可视化组件,openlayers官网:https://openlayers.org/。" :closable="false">
      </el-alert>
    </div>
    <el-collapse v-model="activeNames" :accordion="true" style="width: 1000px">
      <el-collapse-item title="组件示例" name="1">
        <h2 style="position: relative; float: left; width: 100%">
          典型案例
          <el-button @click="openExampleStrunctDialog" style="float: right; margin-left: 20px" type="text">参数数据结构
          </el-button>
          <el-button @click="openExampleCodeDialog" style="float: right" type="text">示例代码</el-button>
        </h2>
        <Example1 style="
            width: calc(100% - 180px);
            display: inline-block;
            float: left;
            margin-right: 20px;
          " ref="exampleItem" class="exampleItem"></Example1>
        <el-radio-group v-model="exampleSelect" @change="dealSelectExample" style="
            padding: 10px 0px;
            float: left;
            width: 160px;
            display: inline-block;
          ">
          <slot v-for="d in exampleName">
            <el-radio style="width: 100%; margin: 0px; margin-bottom: 5px" :label="d.callbackName" border>{{ d.name }}
            </el-radio>
          </slot>
        </el-radio-group>
      </el-collapse-item>

      <el-collapse-item title="支持的事件" name="4">
        <DataTable ref="eventTable" :dataObj="eventDescription"></DataTable>
      </el-collapse-item>
      <el-collapse-item title="参数属性含义" name="5">
        <DataTable ref="paramTable" :dataObj="paramDescription"></DataTable>
      </el-collapse-item>
      <el-collapse-item title="支持的方法" name="6">
        <DataTable ref="methodTable" :dataObj="methodDescription"></DataTable>
      </el-collapse-item>
    </el-collapse>
    <DialogItem @openDialog="dealOpenDialog('exampleStrunctDialog')" @confirmDialog="dealConfirmDialog"
      :config="exampleStrunctDialog" ref="exampleStrunctDialog">
      <template>
        <CodeViewer ref="exampleStructItem"></CodeViewer>
      </template>
    </DialogItem>
    <DialogItem @openDialog="dealOpenDialog('exampleCodeDialog')" :config="exampleCodeDialog" ref="exampleCodeDialog">
      <template>
        <ExampleViewer style="max-height: 800px" :url="componentPath"></ExampleViewer>
      </template>
    </DialogItem>
  </div>
</template>

<script>
  import Example1 from "../../../static/example/olGisMap/1.vue";
  import ExampleViewer from "@/common/exampleViewer";
  import CodeViewer from "@/common/codeViewer";
  import DataTable from "@/common/dataTable";
  import DialogItem from "@/common/dialogItem";
  import {
    line
  } from "@antv/g2plot";

  export default {
    components: {
      Example1,
      ExampleViewer,
      CodeViewer,
      DataTable,
      DialogItem,
    },
    mounted() {
      this.$nextTick(function() {
        this.basicData = {
          ...this.$refs.exampleItem.mapData
        };
      });
    },
    data() {
      return {
        basicData: {},
        componentPath: "/static/example/olGisMap/1.vue",
        exampleSelect: "",
        activeNames: "1",
        exampleCodeDialog: {
          visible: false,
          title: "典型案例的示例代码",
          withFooter: false,
        },
        exampleStrunctDialog: {
          visible: false,
          title: "典型案例的参数数据结构",
          withFooter: true,
        },
        eventDescription: {
          header: [{
              prop: "name",
              label: "事件名",
              width: "180",
            },
            {
              prop: "description",
              label: "描述",
              align: "left",
            },
            {
              prop: "param",
              label: "参数",
              width: "180",
            },
          ],
          data: [{
            name: "mouseover",
            param: "-",
            description: "当鼠标放在点和线上时触发该事件",
          }, ],
        },
        paramDescription: {
          header: [{
              prop: "name",
              label: "属性名称",
              width: "180",
            },
            {
              prop: "description",
              label: "描述",
              align: "left",
            },
            {
              prop: "type",
              label: "类型",
              width: "120",
            },
            {
              prop: "option",
              label: "可选值",
              align: "center",
              width: "180",
            },
            {
              prop: "default",
              label: "默认值",
              align: "center",
              width: "120",
            },
          ],
          data: [{
              name: "cssType",
              description: "地图视图大小",
              type: "Object",
              option: "-",
              default: "width: '100%',height: '400px',",
            },
            {
              name: "mapData.geojson",
              description: "坐标，描述等集合",
              type: "Object",
              option: "-",
              default: "-",
            },
            {
              name: "mapData.geojson[].type",
              description: "地图的展示类型",
              type: "String",
              option: "point，line，animation,icon,breathe,polygon",
              default: "-",
            },
            {
              name: "mapData.geojson[].coordinates",
              description: "点的坐标",
              type: "Array",
              option: "-",
              default: "-",
            },
            {
              name: "mapData.geojson[].title",
              description: "点的标题",
              type: "String",
              option: "-",
              default: "-",
            },
            {
              name: "mapData.geojson[].description",
              description: "点的描述",
              type: "String",
              option: "-",
              default: "-",
            },
            {
              name: "mapData.geojson[].color",
              description: "点的颜色",
              type: "String",
              option: "-",
              default: "-",
            },
            {
              name: "mapData.geojson[].lineTitle",
              description: "线的标题",
              type: "String",
              option: "-",
              default: "-",
            },
            {
              name: "mapData.geojson[].lineColor",
              description: "线的颜色",
              type: "String",
              option: "-",
              default: "-",
            },
            {
              name: "mapData.center",
              description: "地图中心点",
              type: "Array",
              option: "-",
              default: "[103.00, 36.00]",
            },
            {
              name: "mapData.zoom",
              description: "缩放比",
              type: "Number",
              option: "-",
              default: "4",
            },
            {
              name: "mapData.minZoom",
              description: "最小缩放比",
              type: "Number",
              option: "-",
              default: "2",
            },
            {
              name: "mapData.maxZoom",
              description: "最大缩放比",
              type: "Number",
              option: "-",
              default: "19",
            },
          ],
        },
        methodDescription: {
          header: [{
              prop: "name",
              label: "方法名称",
              width: "180",
            },
            {
              prop: "description",
              label: "描述",
              align: "left",
            },
            {
              prop: "param",
              label: "参数",
              width: "180",
            },
          ],
          data: [{
            name: "dataUpdate",
            param: "data",
            description: "更新图上的数据和相关样式参数",
          }, ],
        },
        exampleName: [{
            name: "地图上显示点",
            callbackName: "exampleCallback1",
          },
          {
            name: "地图上显示线",
            callbackName: "exampleCallback2",
          },
          {
            name: "地图上显示轨迹",
            callbackName: "exampleCallback3",
          },
          {
            name: "地图上显示图标",
            callbackName: "exampleCallback4",
          },
          {
            name: "显示呼吸效果",
            callbackName: "exampleCallback5",
          },
          {
            name: "显示多边形",
            callbackName: "exampleCallback6",
          },
          {
            name: "显示多种类型",
            callbackName: "exampleCallback7",
          },
          {
            name: "一带一路效果",
            callbackName: "exampleCallback8",
          },
        ],
        mapData: {
          geojson: [{
            //地图的展示类型
            type: "line",
            features: [{
                //线标题
                lineTitle: "经济",
                //线颜色
                lineColor: "blue",
                lineData: [{
                    //坐标
                    coordinates: [116.382422, 39.898995],
                    //描述
                    description: "北京：中国的政治中心。",
                  },
                  {
                    coordinates: [121.496871, 31.210857],
                    description: "上海：中国经济中心。",
                  },
                  {
                    coordinates: [114.091959, 22.643352],
                    description: "深圳：中国经济特区。",
                  },
                ],
              },
              {
                lineTitle: "能源",
                lineColor: "green",
                lineData: [{
                    coordinates: [112.574182, 37.889936],
                    description: "太原",
                  },
                  {
                    coordinates: [108.931517, 34.307663],
                    description: "西安",
                  },
                  {
                    coordinates: [103.890657, 36.059674],
                    description: "兰州",
                  },
                ],
              },
            ]
          }],
          center: [103.00, 36.00],
          zoom: 4,
          minZoom: 2,
          maxZoom: 19,
        },
        mapTrackData: {
          geojson: [{
            type: "animation",
            features: [{
                lineTitle: "1",
                lineColor: "pink",
                lineData: [{
                    coordinates: [126.53773, 45.797596],
                    description: "哈尔滨",
                  },
                  {
                    coordinates: [125.360303, 43.833571],
                    description: "长春",
                  },
                  {
                    coordinates: [111.709509, 40.859246],
                    description: "呼和浩特",
                  },
                  {
                    coordinates: [106.11673, 38.49975],
                    description: "银川",
                  },
                ],
              },
              {
                lineTitle: "2",
                lineColor: "orange",
                lineData: [{
                    coordinates: [117.265492, 38.989629],
                    description: "天津",
                  },
                  {
                    coordinates: [114.542692, 37.977368],
                    description: "石家庄",
                  },
                  {
                    coordinates: [112.51899, 37.889936],
                    description: "太原",
                  },
                  {
                    coordinates: [108.986709, 34.338192],
                    description: "西安",
                  },
                ],
              },
            ]
          }],
          center: [103.00, 36.00],
          zoom: 4,
          minZoom: 2,
          maxZoom: 19,
        },
        mapIconData: {
          geojson: [{
            type: "icon",
            features: [{
                coordinates: [101.764045, 36.607894],
                description: '西宁',
              },
              {
                coordinates: [103.824542, 36.072044],
                description: '兰州',
              },
            ]
          }],
          center: [103.00, 36.00],
          zoom: 4,
          minZoom: 2,
          maxZoom: 19,
        },
        mapBreatheData: {
          geojson: [{
            type: "breathe",
            features: [{
                coordinates: [102.821889, 24.925894],
                description: '昆明',
                color: "1",
              },
              {
                coordinates: [100.255467, 26.856226],
                description: '丽江',
                color: "2",
              },
              {
                coordinates: [106.676123, 26.691085],
                description: '贵阳',
                color: "3",
              },
            ]
          }],
          center: [103.00, 36.00],
          zoom: 4,
          minZoom: 2,
          maxZoom: 19,
        },
        mapPolygonData: {
          geojson: [{
            type: "polygon",
            features: [{
                polygonDescription: "a",
                lineColor: "rgba(0,255,255, 0.6)",
                coverColor: "rgba(0, 255, 255, 1)",
                lineData: [{
                    coordinates: [87.60675, 43.857081],
                    description: "乌鲁木齐",
                  },
                  {
                    coordinates: [89.188918, 42.944897],
                    description: "吐鲁番",
                  },
                  {
                    coordinates: [93.53068, 42.867129],
                    description: "哈密",
                  },
                ],
              },
              {
                polygonDescription: "b",
                lineColor: "rgba(166,99,99, 0.6)",
                coverColor: "rgba(166, 99, 99, 1)",
                lineData: [{
                    coordinates: [94.372356, 36.803254],
                    description: "海西蒙",
                  },
                  {
                    coordinates: [94.924275, 33.710355],
                    description: "榆树",
                  },
                  {
                    coordinates: [98.76931, 34.35369],
                    description: "果洛",
                  },
                  {
                    coordinates: [99.597188, 36.00013],
                    description: "海南藏族",
                  },
                ],
              },
            ]
          }],
          center: [103.00, 36.00],
          zoom: 4,
          minZoom: 2,
          maxZoom: 19,
        },
        mapMultipleData: {
          geojson: [{
              type: 'point', //地图的展示类型
              features: [{
                  coordinates: [121.496871, 31.210857],
                  title: '经济中心上海',
                  description: '上海：中国经济中心。',
                  color: "blue",
                },
                {
                  coordinates: [114.091959, 22.643352],
                  title: '经济特区深圳',
                  description: '深圳：中国经济特区。',
                  color: "orange",
                },
              ]
            },
            {
              //地图的展示类型
              type: "line",
              features: [{
                lineTitle: "能源",
                lineColor: "green",
                lineData: [{
                    coordinates: [112.574182, 37.889936],
                    description: "太原",
                  },
                  {
                    coordinates: [108.931517, 34.307663],
                    description: "西安",
                  },
                  {
                    coordinates: [103.890657, 36.059674],
                    description: "兰州",
                  },
                ],
              }, ]
            },
            {
              type: "animation",
              features: [{
                lineTitle: "1",
                lineColor: "pink",
                lineData: [{
                    coordinates: [126.53773, 45.797596],
                    description: "哈尔滨",
                  },
                  {
                    coordinates: [125.360303, 43.833571],
                    description: "长春",
                  },
                  {
                    coordinates: [111.709509, 40.859246],
                    description: "呼和浩特",
                  },
                  {
                    coordinates: [106.11673, 38.49975],
                    description: "银川",
                  },
                ],
              }, ]
            },
            {
              type: "icon",
              features: [{
                  coordinates: [101.764045, 36.607894],
                  description: '西宁',
                },
                {
                  coordinates: [103.824542, 36.072044],
                  description: '兰州',
                },
              ]
            },
            {
              type: "polygon",
              features: [{
                  polygonDescription: "a",
                  lineColor: "rgba(0,255,255, 0.6)",
                  coverColor: "rgba(0, 255, 255, 1)",
                  lineData: [{
                      coordinates: [87.60675, 43.857081],
                      description: "乌鲁木齐",
                    },
                    {
                      coordinates: [89.188918, 42.944897],
                      description: "吐鲁番",
                    },
                    {
                      coordinates: [93.53068, 42.867129],
                      description: "哈密",
                    },
                  ],
                },
                {
                  polygonDescription: "b",
                  lineColor: "rgba(166,99,99, 0.6)",
                  coverColor: "rgba(166, 99, 99, 1)",
                  lineData: [{
                      coordinates: [94.372356, 36.803254],
                      description: "海西蒙",
                    },
                    {
                      coordinates: [94.924275, 33.710355],
                      description: "榆树",
                    },
                    {
                      coordinates: [98.76931, 34.35369],
                      description: "果洛",
                    },
                    {
                      coordinates: [99.597188, 36.00013],
                      description: "海南藏族",
                    },
                  ],
                },
              ]
            },
            {
              type: "breathe",
              features: [{
                  coordinates: [102.821889, 24.925894],
                  description: '昆明',
                  color: "1",
                },
                {
                  coordinates: [100.255467, 26.856226],
                  description: '丽江',
                  color: "2",
                },
                {
                  coordinates: [106.676123, 26.691085],
                  description: '贵阳',
                  color: "3",
                },
              ]
            },
          ],
          center: [103.00, 36.00],
          zoom: 4,
          minZoom: 2,
          maxZoom: 19,
        },
        mapDemoData: {
          geojson: [{
              type: "animation",
              features: [{
                  lineTitle: "1",
                  lineColor: "orange",
                  lineData: [{
                      coordinates: [117.238765, 31.834153],
                      description: "合肥",
                    },
                    {
                      coordinates: [108.935126, 34.34366],
                      description: "西安",
                    },
                    {
                      coordinates: [103.831966, 36.061365],
                      description: "兰州",
                    },
                    {
                      coordinates: [87.61391, 38.49975],
                      description: "乌鲁木齐",
                    },
                    {
                      coordinates: [80.408923, 44.212879],
                      description: "霍尔果斯",
                    },
                    {
                      coordinates: [76.843878, 43.221884],
                      description: "阿拉木图",
                    },
                    {
                      coordinates: [74.569363, 42.875944],
                      description: "比什凯克",
                    },
                    {
                      coordinates: [68.782258, 38.571441],
                      description: "杜尚别",
                    },
                    {
                      coordinates: [66.968564, 39.642719],
                      description: "撒马尔罕",
                    },
                    {
                      coordinates: [51.385483, 35.715445],
                      description: "德黑兰",
                    },
                    {
                      coordinates: [28.975882, 41.013506],
                      description: "伊斯坦布尔",
                    },
                    {
                      coordinates: [37.609028, 55.761505],
                      description: "莫斯科",
                    },
                    {
                      coordinates: [8.12116, 52.030408],
                      description: "杜伊斯堡",
                    },
                    {
                      coordinates: [4.893419, 52.386663],
                      description: "鹿特丹",
                    },
                    {
                      coordinates: [2.281417, 48.832031],
                      description: "",
                    },
                    {
                      coordinates: [12.209269, 45.514618],
                      description: "威尼斯",
                    }
                  ],
                },
                {
                  lineTitle: "2",
                  lineColor: "#00aaff",
                  lineData: [{
                      coordinates: [117.238765, 31.834153],
                      description: "合肥",
                    },
                    {
                      coordinates: [121.495049, 31.290423],
                      description: "上海",
                    },
                    {
                      coordinates: [119.291339, 26.07716],
                      description: "福州",
                    },
                    {
                      coordinates: [120.135498, 25.620117],
                      description: "",
                    },
                    {
                      coordinates: [119.388428, 24.598389],
                      description: "",
                    },
                    {
                      coordinates: [118.671323, 24.876798],
                      description: "泉州",
                    },
                    {
                      coordinates: [118.487549, 23.334961],
                      description: "",
                    },
                    {
                      coordinates: [114.389648, 21.445313],
                      description: "",
                    },
                    {
                      coordinates: [113.258951, 23.131971],
                      description: "广州",
                    },
                    {
                      coordinates: [113.400879, 21.500244],
                      description: "",
                    },
                    {
                      coordinates: [111.346436, 20.994873],
                      description: "",
                    },
                    {
                      coordinates: [110.354897, 21.273175],
                      description: "湛江",
                    },
                    {
                      coordinates: [110.736694, 20.967407],
                      description: "",
                    },
                    {
                      coordinates: [110.593872, 20.231323],
                      description: "",
                    },
                    {
                      coordinates: [110.196265, 20.047046],
                      description: "海口",
                    },
                    {
                      coordinates: [109.539185, 20.258789],
                      description: "",
                    },
                    {
                      coordinates: [109.193115, 20.758667],
                      description: "",
                    },
                    {
                      coordinates: [109.115951, 21.483645],
                      description: "北海",
                    },
                    {
                      coordinates: [108.078003, 21.231079],
                      description: "",
                    },
                    {
                      coordinates: [107.089233, 20.456543],
                      description: "",
                    },
                    {
                      coordinates: [105.85, 21.033333],
                      description: "河内",
                    },
                    {
                      coordinates: [108.94043, 16.962891],
                      description: "",
                    },
                    {
                      coordinates: [111.005859, 15.46875],
                      description: "",
                    },
                    {
                      coordinates: [111.708984, 12.304688],
                      description: "",
                    },
                    {
                      coordinates: [107.62207, 5.888672],
                      description: "",
                    },
                    {
                      coordinates: [109.006348, -2.746582],
                      description: "",
                    },
                    {
                      coordinates: [106.743164, -6.218262],
                      description: "雅加达",
                    },
                    {
                      coordinates: [107.29248, -2.06543],
                      description: "",
                    },
                    {
                      coordinates: [103.52417, 0.999756],
                      description: "",
                    },
                    {
                      coordinates: [101.683333, 3.133333],
                      description: "吉隆坡",
                    },
                    {
                      coordinates: [93.251953, 9.316406],
                      description: "",
                    },
                    {
                      coordinates: [81.169196, 4.70207],
                      description: "",
                    },
                    {
                      coordinates: [79.842778, 6.934444],
                      description: "科伦坡",
                    },
                    {
                      coordinates: [82.353516, 14.589844],
                      description: "",
                    },
                    {
                      coordinates: [86.879883, 17.973633],
                      description: "",
                    },
                    {
                      coordinates: [88.350472, 22.577795],
                      description: "加尔各答",
                    },
                    {
                      coordinates: [89.824219, 10.810547],
                      description: "",
                    },
                    {
                      coordinates: [89.296875, -4.394531],
                      description: "",
                    },
                    {
                      coordinates: [71.542969, -10.458984],
                      description: "",
                    },
                    {
                      coordinates: [53.085938, -6.943359],
                      description: "",
                    },
                    {
                      coordinates: [36.821119, 1.285013],
                      description: "内罗毕",
                    },
                    {
                      coordinates: [49.042969, -0.703125],
                      description: "",
                    },
                    {
                      coordinates: [56.293945, 14.370117],
                      description: "",
                    },
                    {
                      coordinates: [43.725586, 12.084961],
                      description: "",
                    },
                    {
                      coordinates: [36.079102, 24.65332],
                      description: "",
                    },
                    {
                      coordinates: [33.178711, 28.256836],
                      description: "",
                    },
                    {
                      coordinates: [32.255859, 31.025391],
                      description: "",
                    },
                    {
                      coordinates: [26.367188, 34.453125],
                      description: "",
                    },
                    {
                      coordinates: [23.736975, 37.975749],
                      description: "雅典",
                    },
                    {
                      coordinates: [23.730469, 35.112305],
                      description: "",
                    },
                    {
                      coordinates: [19.863281, 36.914063],
                      description: "",
                    },
                    {
                      coordinates: [18.94043, 40.385742],
                      description: "雅典",
                    },
                    {
                      coordinates: [16.083984, 42.714844],
                      description: "",
                    },
                    {
                      coordinates: [12.209269, 45.514618],
                      description: "威尼斯",
                    }

                  ],
                },
              ]
            },
            {
              type: 'point', //地图的展示类型
              features: [{
                  coordinates: [117.238765, 31.834153],
                  title: '合肥',
                  description: '亚洲，中国，合肥',
                  color: "red",
                },
                {
                  coordinates: [108.935126, 34.34366],
                  title: '西安',
                  description: '亚洲，中国，西安',
                  color: "blue",
                },
                {
                  coordinates: [103.831966, 36.061365],
                  title: '兰州',
                  description: '亚洲，中国，兰州',
                  color: "orange",
                },
                {
                  coordinates: [87.61391, 38.49975],
                  title: '乌鲁木齐',
                  description: '亚洲，中国，乌鲁木齐',
                  color: "red",
                },
                // {
                //   coordinates: [80.408923, 44.212879],
                //   title: '霍尔果斯',
                //   description: '亚洲，中国，霍尔果斯',
                //   color: "blue",
                // },
                {
                  coordinates: [76.843878, 43.221884],
                  title: '阿拉木图',
                  description: '亚洲，阿拉木图',
                  color: "orange",
                },
                {
                  coordinates: [74.569363, 42.875944],
                  title: '比什凯克',
                  description: '比什凯克',
                  color: "red",
                },
                {
                  coordinates: [68.782258, 38.571441],
                  title: '杜尚别',
                  description: '杜尚别',
                  color: "blue",
                },
                {
                  coordinates: [66.968564, 39.642719],
                  title: '撒马尔罕',
                  description: '撒马尔罕',
                  color: "orange",
                },
                {
                  coordinates: [51.385483, 35.715445],
                  title: '德黑兰',
                  description: '德黑兰',
                  color: "orange",
                },
                {
                  coordinates: [28.975882, 41.013506],
                  title: '伊斯坦布尔',
                  description: '土耳其，伊斯坦布尔',
                  color: "red",
                },
                {
                  coordinates: [37.609028, 55.761505],
                  title: '莫斯科',
                  description: '俄罗斯，莫斯科',
                  color: "blue",
                },
                {
                  coordinates: [8.12116, 52.030408],
                  title: '杜伊斯堡',
                  description: '杜伊斯堡',
                  color: "orange",
                },
                {
                  coordinates: [4.893419, 52.386663],
                  title: '鹿特丹',
                  description: '鹿特丹',
                  color: "red",
                },
                {
                  coordinates: [12.209269, 45.514618],
                  title: '威尼斯',
                  description: '威尼斯',
                  color: "blue",
                },


                {
                  coordinates: [113.258951, 23.131971],
                  title: '广州',
                  description: '亚洲，中国，广州',
                  color: "red",
                },
                {
                  coordinates: [105.85, 21.033333],
                  title: '河内',
                  description: '河内',
                  color: "red",
                },
                {
                  coordinates: [106.743164, -6.218262],
                  title: '雅加达',
                  description: '雅加达',
                  color: "blue",
                },
                {
                  coordinates: [101.683333, 3.133333],
                  title: '吉隆坡',
                  description: '吉隆坡',
                  color: "red",
                },
                {
                  coordinates: [79.842778, 6.934444],
                  title: '科伦坡',
                  description: '科伦坡',
                  color: "red",
                },
                {
                  coordinates: [88.350472, 22.577795],
                  title: '加尔各答',
                  description: '加尔各答',
                  color: "blue",
                },
                {
                  coordinates: [36.821119, 1.285013],
                  title: '内罗毕',
                  description: '内罗毕',
                  color: "red",
                },
                {
                  coordinates: [23.736975, 37.975749],
                  title: '雅典',
                  description: '雅典',
                  color: "blue",
                },
                {
                  coordinates: [12.209269, 45.514618],
                  title: '威尼斯',
                  description: '威尼斯',
                  color: "red",
                }
              ]
            },
            {
              type: "icon",
              features:[{
                  coordinates: [117.238765, 31.834153],
                  title: '合肥',
                  description: '亚洲，中国，合肥',
                  color: "red",
                },
                {
                  coordinates: [108.935126, 34.34366],
                  title: '西安',
                  description: '亚洲，中国，西安',
                  color: "blue",
                },
                {
                  coordinates: [103.831966, 36.061365],
                  title: '兰州',
                  description: '亚洲，中国，兰州',
                  color: "orange",
                },
                {
                  coordinates: [87.61391, 38.49975],
                  title: '乌鲁木齐',
                  description: '亚洲，中国，乌鲁木齐',
                  color: "red",
                },
                // {
                //   coordinates: [80.408923, 44.212879],
                //   title: '霍尔果斯',
                //   description: '亚洲，中国，霍尔果斯',
                //   color: "blue",
                // },
                {
                  coordinates: [76.843878, 43.221884],
                  title: '阿拉木图',
                  description: '亚洲，阿拉木图',
                  color: "orange",
                },
                {
                  coordinates: [74.569363, 42.875944],
                  title: '比什凯克',
                  description: '比什凯克',
                  color: "red",
                },
                {
                  coordinates: [68.782258, 38.571441],
                  title: '杜尚别',
                  description: '杜尚别',
                  color: "blue",
                },
                {
                  coordinates: [66.968564, 39.642719],
                  title: '撒马尔罕',
                  description: '撒马尔罕',
                  color: "orange",
                },
                {
                  coordinates: [51.385483, 35.715445],
                  title: '德黑兰',
                  description: '德黑兰',
                  color: "orange",
                },
                {
                  coordinates: [28.975882, 41.013506],
                  title: '伊斯坦布尔',
                  description: '土耳其，伊斯坦布尔',
                  color: "red",
                },
                {
                  coordinates: [37.609028, 55.761505],
                  title: '莫斯科',
                  description: '俄罗斯，莫斯科',
                  color: "blue",
                },
                {
                  coordinates: [8.12116, 52.030408],
                  title: '杜伊斯堡',
                  description: '杜伊斯堡',
                  color: "orange",
                },
                {
                  coordinates: [4.893419, 52.386663],
                  title: '鹿特丹',
                  description: '鹿特丹',
                  color: "red",
                },
                {
                  coordinates: [12.209269, 45.514618],
                  title: '威尼斯',
                  description: '威尼斯',
                  color: "blue",
                },


                {
                  coordinates: [113.258951, 23.131971],
                  title: '广州',
                  description: '亚洲，中国，广州',
                  color: "red",
                },
                {
                  coordinates: [105.85, 21.033333],
                  title: '河内',
                  description: '河内',
                  color: "red",
                },
                {
                  coordinates: [106.743164, -6.218262],
                  title: '雅加达',
                  description: '雅加达',
                  color: "blue",
                },
                {
                  coordinates: [101.683333, 3.133333],
                  title: '吉隆坡',
                  description: '吉隆坡',
                  color: "red",
                },
                {
                  coordinates: [79.842778, 6.934444],
                  title: '科伦坡',
                  description: '科伦坡',
                  color: "red",
                },
                {
                  coordinates: [88.350472, 22.577795],
                  title: '加尔各答',
                  description: '加尔各答',
                  color: "blue",
                },
                {
                  coordinates: [36.821119, 1.285013],
                  title: '内罗毕',
                  description: '内罗毕',
                  color: "red",
                },
                {
                  coordinates: [23.736975, 37.975749],
                  title: '雅典',
                  description: '雅典',
                  color: "blue",
                },
                {
                  coordinates: [12.209269, 45.514618],
                  title: '威尼斯',
                  description: '威尼斯',
                  color: "red",
                }
              ]
            }
              
          ],
          center: [66.968564, 29.642719],
          // cssType:'height:500px;',
          zoom: 3,
          minZoom: 2,
          maxZoom: 19,
        }
      };
    },
    methods: {
      updateExampleData(data) {
        if (
          this.$refs.exampleItem.$refs.exampleTestItem &&
          this.$refs.exampleItem.$refs.exampleTestItem.dataUpdate
        ) {
          this.$refs.exampleItem.$refs.exampleTestItem.dataUpdate(data);
        }
      },
      exampleCallback1() {
        var tData = {
          ...this.basicData
        };
        this.updateExampleData(tData);
      },
      exampleCallback2() {
        this.updateExampleData(this.mapData);
      },
      exampleCallback3() {
        this.updateExampleData(this.mapTrackData);
      },
      exampleCallback4() {
        this.updateExampleData(this.mapIconData);
      },
      exampleCallback5() {
        this.updateExampleData(this.mapBreatheData);
      },
      exampleCallback6() {
        this.updateExampleData(this.mapPolygonData);
      },
      exampleCallback7() {
        this.updateExampleData(this.mapMultipleData);
      },
      exampleCallback8() {
        this.updateExampleData(this.mapDemoData);
      },
      dealSelectExample(v) {
        if (v && typeof this[v] === "function") {
          this[v]();
        }
      },
      openDataStrunctDialog() {
        this.$refs.testDialog.show()
      },
      openExampleStrunctDialog() {
        this.$refs.exampleStrunctDialog.show();
      },
      openExampleCodeDialog() {
        this.$refs.exampleCodeDialog.show();
      },
      dealOpenDialog(name) {
        if (name === "testDialog") {
          this.$refs.exampleViewerItem.code = beautify(
            JSON.stringify(this.$refs.exampleItem.mapData),
            opts
          );
        } else if (name === "exampleStrunctDialog") {
          this.$refs.exampleStructItem.code = beautify(
            JSON.stringify(this.$refs.exampleItem.$refs.exampleTestItem.mapData),
            opts
          );
        } else {}
      },
      dealConfirmDialog() {
        var code = this.$refs.exampleStructItem.code;
        console.log(code);
        try {
          this.updateExampleData(JSON.parse(code));
          // this.$refs.exampleTest.$forceUpdate();
          this.exampleSelect = "";
        } catch (e) {
          console.log(e);
        }
      },
    },
  };
</script>

<style scoped>
  * {
    box-sizing: border-box;
  }

  .introduce {
    position: relative;
    float: left;
    max-width: 1200px;
    margin-bottom: 20px;
    padding-right: 20px;
    width: 100%;
  }

  .introduce>h2 {
    font-weight: 700;
    margin-bottom: 5px;
  }

  /deep/ .CodeMirror {
    border-top: solid 1px #ddd;
    border-left: solid 1px #ddd;
    box-shadow: 1px 1px 1px #ddd;
    height: 500px !important;
  }

  /deep/ .exampleItem,
  .howToImport .CodeMirror {
    height: auto !important;
  }

  .exampleItem {
    padding-bottom: 10px;
  }

  /deep/ .containerArea {
    margin-bottom: 10px;
  }

  /deep/ .el-form-item {
    margin-bottom: 5px;
  }

  /deep/ .el-collapse-item__header {
    font-weight: 700;
  }
</style>
