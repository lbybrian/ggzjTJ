<!-- 盒须图 -->
<template>
  <div style="padding: 20px 40px">
    <el-collapse v-model="activeNames" :accordion="true" @change="dealChangeEvent" style="width: 1000px">
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
          <ExampleBoxPlot ref="exampleItem" class="exampleItem" />
          <el-radio-group v-model="exampleSelect" @change="dealSelectExample"
            style="padding: 20px 0px;float: right;width: 150px;display: inline-block;">
          <slot v-for="d in exampleName">
            <el-radio style="width: 100%; margin: 0px; margin-bottom: 5px"
              :label="d.callbackName" border>{{ d.name }}</el-radio>
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
import ExampleBoxPlot  from '../../../static/example/boxPlot/1';

export default {
//import引入的组件需要注入到对象中才能使用
components: {
    DataTable,
    ExampleViewer,
    DialogItem,
    CodeViewer,
    ExampleBoxPlot
},
data() {
//这里存放数据
return {
  activeNames:"1",
  basicData: {},
  componentPath: "/static/example/boxPlot/1.vue",
  exampleSelect:'2',
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
  exampleName: [
    {
      name: "基础盒须图",
      callbackName: "exampleCallback1",
    },
    {
      name: "垂直方向盒须图",
      callbackName: "exampleCallback2",
    },
    {
      name: "多系列盒须图",
      callbackName: "exampleCallback3",
    },
  ],
  dataObj:{
            title: [{
                        text: 'Michelson-Morley Experiment',
                        left: 'center',
                        top: 50
                    }, 
                    {
                        text: 'upper: Q3 + 1.5 * IQR \nlower: Q1 - 1.5 * IQR',
                        borderColor: '#999',
                        borderWidth: 1,
                        textStyle: {
                            fontWeight: 'normal',
                            fontSize: 14,
                            lineHeight: 20
                    },
                        left: '10%',
                        top: '90%'
                    }],
            dataset: [{
                source: [
                    [850, 740, 900, 1070, 930, 850, 950, 980, 980, 880, 1000, 980, 930, 650, 760, 810, 1000, 1000, 960, 960],
                    [960, 940, 960, 940, 880, 800, 850, 880, 900, 840, 830, 790, 810, 880, 880, 830, 800, 790, 760, 800],
                    [880, 880, 880, 860, 720, 720, 620, 860, 970, 950, 880, 910, 850, 870, 840, 840, 850, 840, 840, 840],
                    [890, 810, 810, 820, 800, 770, 760, 740, 750, 760, 910, 920, 890, 860, 880, 720, 840, 850, 850, 780],
                    [890, 840, 780, 810, 760, 810, 790, 810, 820, 850, 870, 870, 810, 740, 810, 940, 950, 800, 810, 870]
                ]
            }, 
            {
                transform: {
                    type: 'boxplot',
                    config: { itemNameFormatter: 'expr {value}' }
                }
            }, 
            {
                fromDatasetIndex: 1,
                fromTransformResult: 1
            }
            ],
            tooltip: {
                trigger: 'item',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                top:'20%',
                left: '10%',
                right: '10%',
                bottom: '15%'
            },
            xAxis: {
                type: 'category',
                boundaryGap: true,
                nameGap: 30,
                splitArea: {
                    show: true
                },
                splitLine: {
                    show: false
                }
            },
            yAxis: {
                type: 'value',
                name: 'km/s minus 299,000',
                splitArea: {
                    show: false
                }
            },
            series: [
                {
                    name: 'boxplot',
                    type: 'boxplot',
                    datasetIndex: 1,
                },
                {
                    name: 'outlier',
                    type: 'scatter',
                    datasetIndex: 2,
                }
            ]
    },
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {

},
//方法集合
methods: {
    updateExampleData (data) {
      if (this.$refs.exampleItem && this.$refs.exampleItem.updateData) {
        this.$refs.exampleItem.updateData(data);
      }
    },
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
      } else if (name === "exampleCodeDialog") {
        this.$refs.exampleCodeDialog.code = beautify(
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
    exampleCallback1(){
        let tData = { ...this.basicData };
        // this.updateExampleData(this.dataObj);
        this.updateExampleData(tData);
    },
    exampleCallback2() {
      let tData = { ...this.basicData };
      var tempAxis = tData.xAxis
      tData.xAxis = null
      tData.xAxis = tData.yAxis
      tData.yAxis = null
      tData.yAxis = tempAxis
      this.updateExampleData(tData);
    },
    exampleCallback3() {
      let tData = JSON.parse(JSON.stringify(this.basicData));
      // Generate data.
      function makeData() {
          var data = [];
          for (var i = 0; i < 18; i++) {
              var cate = [];
              for (var j = 0; j < 100; j++) {
                  cate.push(Math.random() * 200);
              }
              data.push(cate);
          }
          return data;
      }
      var data0 = makeData();
      var data1 = makeData();
      var data2 = makeData();
      tData.title = {text:'Multiple Categories',left:'center'}
      tData.legend = {top:'10%'}
      tData.dataZoom = [{type:'inside',start:0,end:20},{show:true,type:'slider',top:'90%',xAxisIndex:[0],start:0,end:10}]
      tData.dataset[0] = {source : data0}
      tData.dataset[3] = {fromDatasetIndex : 0,transform : {type:'boxplot'}}
      tData.dataset[1] = {source : data1}
      tData.dataset[4] = {fromDatasetIndex : 1,transform : {type:'boxplot'}}
      tData.dataset[2] = {source : data2}
      tData.dataset[5] = {fromDatasetIndex : 2,transform : {type:'boxplot'}}
      tData.series[0] = {name: 'category0',type: 'boxplot',datasetIndex: 3}
      tData.series[1] = {name: 'category1',type: 'boxplot',datasetIndex: 4}
      tData.series[2] = {name: 'category2',type: 'boxplot',datasetIndex: 5}
      tData.xAxis = { type: 'category',boundaryGap: true,nameGap: 30,splitArea: {show: true},splitLine: {show: false}}
      tData.yAxis = { type: 'value',name: 'Value',min: -400,max: 600,spliteArae: {show: false}}
      this.updateExampleData(tData);
    },
    dealChangeEvent(v) {
       var tData = { ...this.basicData };
        if (v === "1") {
          this.$refs.exampleItem.updateData(tData);
        }
    },
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
<style>
.exampleItem {
  padding: 10px 0;
}
</style>