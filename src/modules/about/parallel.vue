<!-- 平行坐标系 -->
<template>
  <div  class='parallel' style="padding: 20px 40px">
    <el-collapse v-model="activeNames" :accordion="true" style="width: 1000px">
      <el-collapse-item title="组件示例" name="1">
        <h2 style="position: relative; float: left; width: 100%">
          典型案例
          <el-button
            @click="openExampleStrunctDialog"
            style="float: right; margin-left: 20px;cursor:pointer"
            type="text"
            >参数数据结构</el-button>
          <el-button
            @click="openExampleCodeDialog"
            style="float: right;cursor:pointer"
            type="text"
            >示例代码</el-button>
        </h2>
      <div>
        <div>
          <ExampleParallel ref="exampleItem" class="exampleItem" style="float:left"/>
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
        </div>
	    </div>
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
    <!-- 参数数据结构弹出框 -->
    <DialogItem @openDialog="dealOpenDialog('exampleStrunctDialog')" @confirmDialog="dealConfirmDialog"
      :config="exampleStrunctDialog" ref="exampleStrunctDialog">
      <template>
        <CodeViewer ref="exampleStructItem"></CodeViewer>
      </template>
    </DialogItem>
    <!-- 示例代码弹出框 -->
    <DialogItem @openDialog="dealOpenDialog('exampleCodeDialog')" :config="exampleCodeDialog" ref="exampleCodeDialog">
      <template>
        <ExampleViewer style="max-height: 800px" :url="componentPath"></ExampleViewer>
      </template>
    </DialogItem>
  </div>
</template>
<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import DataTable from "@/common/dataTable";
import DialogItem from "@/common/dialogItem";
import ExampleViewer from "@/common/exampleViewer";
import CodeViewer from "@/common/codeViewer";
import ExampleParallel  from '../../../static/example/parallel/1';
export default {
//import引入的组件需要注入到对象中才能使用
components: {
    DataTable,
    ExampleViewer,
    DialogItem,
    CodeViewer,
    ExampleParallel
},
data() {
//这里存放数据
return {
    activeNames:"1",
  basicData: {},
  componentPath: "/static/example/parallel/1.vue",
  exampleSelect:'1',
  eventDescription: {
      header: [
        {
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
      data: [
         {
          name: "click",
          param: "data",
          description: "当点击时触发该事件",
        },
        {
          name: "mouseover",
          param: "data",
          description: "当鼠标移到某节点时触发该事件",
        }
      ],
  },
  paramDescription: {
    header: [
      {
        prop: "name",
        label: "参数",
        width: "180",
      },
      {
        prop: "description",
        label: "说明",
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
    data: [
      {
        name: "action. highlight",
        description: "高亮指定的数据图形。",
        type: "-",
        option: "-",
        default: "-",
      },
      {
        name: "action. downplay",
        description: "取消高亮指定的数据图形。",
        type: "-",
        option: "-",
        default: "-",
      },
      {
        name: "action. legend",
        description: "图例组件相关的行为，必须引入图例组件后才能使用。",
        type: "-",
        option: "-",
        default: "-",
      },
      {
        name: "action. tooltip",
        description: "显示提示框。",
        type: "-",
        option: "-",
        default: "-",
      },
      {
        name: "action. dataZoom",
        description: "数据区域缩放组件相关的行为，必须引入数据区域缩放组件后才能使用。",
        type: "-",
        option: "-",
        default: "-",
      },
      {
        name: "action. visualMap",
        description: "视觉映射组件相关的行为，必须引入视觉映射组件后才能使用。",
        type: "-",
        option: "-",
        default: "-",
      },
      {
        name: "action. timeline",
        description: "时间轴组件相关的行为，必须引入时间轴组件后才能使用。",
        type: "-",
        option: "-",
        default: "-",
      },
      {
        name: "action. toolbox",
        description: "工具栏组件相关的行为，必须引入工具栏组件后才能使用。",
        type: "-",
        option: "-",
        default: "-",
      },
    ],
  },
  methodDescription: {
    header: [
      {
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
    data: [
      {
        name: "updateData",
        param: "data",
        description: "更新图上的数据和相关样式参数",
      },
      {
        name: " dispatchAction",
        param: "-",
        description: "触发图表行为",
      },
      
    ],
  },
  exampleStrunctDialog: {
        visible: false,
        title: "典型案例的参数数据结构",
        withFooter: true,
  },
  exampleCodeDialog: {
        visible: false,
        title: "典型案例的示例代码",
        withFooter: true,
  },
  exampleName:[{
    name: "基础平行坐标系",
    callbackName: "exampleCallback1",
  },
  {
    name: "AQI分布（平行坐标系）",
    callbackName: "exampleCallback2",
  }]
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    openExampleStrunctDialog() {
      this.$refs.exampleStrunctDialog.show();
    },
    openExampleCodeDialog() {
      this.$refs.exampleCodeDialog.show();
    },
     // 示例代码+参数数据结构点击按钮
    dealOpenDialog (name) {
      if (name === "exampleStrunctDialog") {
        this.$refs.exampleStructItem.code = beautify(
          JSON.stringify(this.$refs.exampleItem.dataObj),
          opts
        );
      } 
    },
    // 参数数据结构确认
    dealConfirmDialog () {
      var code = this.$refs.exampleStructItem.code;
      try {
        this.updateExampleData(JSON.parse(code));
        // this.$refs.exampleTest.$forceUpdate();
        this.exampleSelect = "";
      } catch (e) {
        console.log(e);
      }
    },
    dealSelectExample(v) {
        if (v && typeof this[v] === "function") {
          this[v]();
        }
    },
    updateExampleData(data) {
        if (this.$refs.exampleItem && this.$refs.exampleItem.updateData) {
          this.$refs.exampleItem.updateData(data);
        }
      },
    exampleCallback1(){
      var tData = {
          ...this.basicData
        };
        this.updateExampleData(tData);
    },
    exampleCallback2(){
        var tData = JSON.parse(JSON.stringify(this.basicData))
        var dataBJ = [
    [1,55,9,56,0.46,18,6,"良"],
    [2,25,11,21,0.65,34,9,"优"],
    [3,56,7,63,0.3,14,5,"良"],
    [4,33,7,29,0.33,16,6,"优"],
    [5,42,24,44,0.76,40,16,"优"],
    [6,82,58,90,1.77,68,33,"良"],
    [7,74,49,77,1.46,48,27,"良"],
    [8,78,55,80,1.29,59,29,"良"],
    [9,267,216,280,4.8,108,64,"重度污染"],
    [10,185,127,216,2.52,61,27,"中度污染"],
    [11,39,19,38,0.57,31,15,"优"],
    [12,41,11,40,0.43,21,7,"优"],
    [13,64,38,74,1.04,46,22,"良"],
    [14,108,79,120,1.7,75,41,"轻度污染"],
    [15,108,63,116,1.48,44,26,"轻度污染"],
    [16,33,6,29,0.34,13,5,"优"],
    [17,94,66,110,1.54,62,31,"良"],
    [18,186,142,192,3.88,93,79,"中度污染"],
    [19,57,31,54,0.96,32,14,"良"],
    [20,22,8,17,0.48,23,10,"优"],
    [21,39,15,36,0.61,29,13,"优"],
    [22,94,69,114,2.08,73,39,"良"],
    [23,99,73,110,2.43,76,48,"良"],
    [24,31,12,30,0.5,32,16,"优"],
    [25,42,27,43,1,53,22,"优"],
    [26,154,117,157,3.05,92,58,"中度污染"],
    [27,234,185,230,4.09,123,69,"重度污染"],
    [28,160,120,186,2.77,91,50,"中度污染"],
    [29,134,96,165,2.76,83,41,"轻度污染"],
    [30,52,24,60,1.03,50,21,"良"],
    [31,46,5,49,0.28,10,6,"优"]
        ];

        var dataGZ = [
            [1,26,37,27,1.163,27,13,"优"],
            [2,85,62,71,1.195,60,8,"良"],
            [3,78,38,74,1.363,37,7,"良"],
            [4,21,21,36,0.634,40,9,"优"],
            [5,41,42,46,0.915,81,13,"优"],
            [6,56,52,69,1.067,92,16,"良"],
            [7,64,30,28,0.924,51,2,"良"],
            [8,55,48,74,1.236,75,26,"良"],
            [9,76,85,113,1.237,114,27,"良"],
            [10,91,81,104,1.041,56,40,"良"],
            [11,84,39,60,0.964,25,11,"良"],
            [12,64,51,101,0.862,58,23,"良"],
            [13,70,69,120,1.198,65,36,"良"],
            [14,77,105,178,2.549,64,16,"良"],
            [15,109,68,87,0.996,74,29,"轻度污染"],
            [16,73,68,97,0.905,51,34,"良"],
            [17,54,27,47,0.592,53,12,"良"],
            [18,51,61,97,0.811,65,19,"良"],
            [19,91,71,121,1.374,43,18,"良"],
            [20,73,102,182,2.787,44,19,"良"],
            [21,73,50,76,0.717,31,20,"良"],
            [22,84,94,140,2.238,68,18,"良"],
            [23,93,77,104,1.165,53,7,"良"],
            [24,99,130,227,3.97,55,15,"良"],
            [25,146,84,139,1.094,40,17,"轻度污染"],
            [26,113,108,137,1.481,48,15,"轻度污染"],
            [27,81,48,62,1.619,26,3,"良"],
            [28,56,48,68,1.336,37,9,"良"],
            [29,82,92,174,3.29,0,13,"良"],
            [30,106,116,188,3.628,101,16,"轻度污染"],
            [31,118,50,0,1.383,76,11,"轻度污染"]
        ];

        var dataSH = [
            [1,91,45,125,0.82,34,23,"良"],
            [2,65,27,78,0.86,45,29,"良"],
            [3,83,60,84,1.09,73,27,"良"],
            [4,109,81,121,1.28,68,51,"轻度污染"],
            [5,106,77,114,1.07,55,51,"轻度污染"],
            [6,109,81,121,1.28,68,51,"轻度污染"],
            [7,106,77,114,1.07,55,51,"轻度污染"],
            [8,89,65,78,0.86,51,26,"良"],
            [9,53,33,47,0.64,50,17,"良"],
            [10,80,55,80,1.01,75,24,"良"],
            [11,117,81,124,1.03,45,24,"轻度污染"],
            [12,99,71,142,1.1,62,42,"良"],
            [13,95,69,130,1.28,74,50,"良"],
            [14,116,87,131,1.47,84,40,"轻度污染"],
            [15,108,80,121,1.3,85,37,"轻度污染"],
            [16,134,83,167,1.16,57,43,"轻度污染"],
            [17,79,43,107,1.05,59,37,"良"],
            [18,71,46,89,0.86,64,25,"良"],
            [19,97,71,113,1.17,88,31,"良"],
            [20,84,57,91,0.85,55,31,"良"],
            [21,87,63,101,0.9,56,41,"良"],
            [22,104,77,119,1.09,73,48,"轻度污染"],
            [23,87,62,100,1,72,28,"良"],
            [24,168,128,172,1.49,97,56,"中度污染"],
            [25,65,45,51,0.74,39,17,"良"],
            [26,39,24,38,0.61,47,17,"优"],
            [27,39,24,39,0.59,50,19,"优"],
            [28,93,68,96,1.05,79,29,"良"],
            [29,188,143,197,1.66,99,51,"中度污染"],
            [30,174,131,174,1.55,108,50,"中度污染"],
            [31,187,143,201,1.39,89,53,"中度污染"]
        ];

        var schema = [
            {name: 'date', index: 0, text: '日期'},
            {name: 'AQIindex', index: 1, text: 'AQI'},
            {name: 'PM25', index: 2, text: 'PM2.5'},
            {name: 'PM10', index: 3, text: 'PM10'},
            {name: 'CO', index: 4, text: ' CO'},
            {name: 'NO2', index: 5, text: 'NO2'},
            {name: 'SO2', index: 6, text: 'SO2'},
            {name: '等级', index: 7, text: '等级'}
        ];
        var lineStyle = {
            normal: {
                width: 1,
                opacity: 0.5
            }
        };
        tData.legend = {
          bottom: 30,
          data: ['北京', '上海', '广州'],
          itemGap: 20,
          textStyle: {
              color: '#fff',
              fontSize: 14
          }
        }
        tData.parallelAxis =  [
            {dim: 0, name: schema[0].text, inverse: true, max: 31, nameLocation: 'start'},
            {dim: 1, name: schema[1].text},
            {dim: 2, name: schema[2].text},
            {dim: 3, name: schema[3].text},
            {dim: 4, name: schema[4].text},
            {dim: 5, name: schema[5].text},
            {dim: 6, name: schema[6].text},
            {dim: 7, name: schema[7].text,
            type: 'category', data: ['优', '良', '轻度污染', '中度污染', '重度污染', '严重污染']}
        ]
        tData.series =  [
        {
            name: '北京',
            type: 'parallel',
            lineStyle: lineStyle,
            data: dataBJ
        },
        {
            name: '上海',
            type: 'parallel',
            lineStyle: lineStyle,
            data: dataSH
        },
        {
            name: '广州',
            type: 'parallel',
            lineStyle: lineStyle,
            data: dataGZ
        }
        ]
        tData.backgroundColor = '#333',
        tData.tooltip = {
            padding: 10,
            borderColor: '#777',
            borderWidth: 1
        }
        tData.visualMap = {
          show: true,
          min: 0,
          max: 150,
          dimension: 2,
          inRange: {
              color: ['#d94e5d','#eac736','#50a3ba'].reverse(),
          }
        }
        this.updateExampleData(tData);
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    this.$nextTick(function () {
      this.basicData = { ...this.$refs.exampleItem.dataObj};
    });
},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style  scoped>

</style>