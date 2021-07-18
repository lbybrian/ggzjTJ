<template>
  <div style="padding: 20px 40px">
    <el-collapse v-model="activeNames" :accordion="true" style="width: 1000px">
      <el-collapse-item title="组件示例" name="1">
        <h2 style="position: relative; float: left; width: 100%">
          典型案例
          <el-button @click="openExampleStrunctDialog" style="float: right; margin-left: 20px" type="text">参数数据结构</el-button>
          <el-button @click="openExampleCodeDialog" style="float: right" type="text">示例代码</el-button>
        </h2>
        <Example1 style="
            width: calc(100% - 180px);
            display: inline-block;
            float: left;
            margin-right: 20px;
          "
          ref="exampleItem" class="exampleItem"></Example1>
        <el-radio-group v-model="exampleSelect" @change="dealSelectExample" style="
            padding: 10px 0px;
            float: left;
            width: 160px;
            display: inline-block;
          ">
          <slot v-for="d in exampleName">
            <el-radio style="width: 100%; margin: 0px; margin-bottom: 5px" :label="d.callbackName" border>{{ d.name }}</el-radio>
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
    <DialogItem @openDialog="dealOpenDialog('exampleStrunctDialog')" @confirmDialog="dealConfirmDialog" :config="exampleStrunctDialog"
      ref="exampleStrunctDialog">
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
  import Example1 from "../../../static/example/sanKey/1.vue";
  import ExampleViewer from "@/common/exampleViewer";
  import CodeViewer from "@/common/codeViewer";
  import DataTable from "@/common/dataTable";
  import DialogItem from "@/common/dialogItem";

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
        this.basicData = { ...this.$refs.exampleItem.dataObj
        };
      });
    },
    data() {
      return {
        basicData: {},
        componentPath: "/static/example/wordCloud/1.vue",
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
          data: [
            {
            name:"mouseover",
            param:"-",
            description:"当鼠标放上时触发该事件"
          }
          ],
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
            {
              prop: "protocol",
              label: "可选性",
              align: "center",
              width: "120",
            },
          ],
          data: [{
              name: "data",
              description: "设置图表数据源。数据源为对象集合",
              type: "array object",
              option: "-",
              default: "-",
              protocol: 'required',
            },
            {
              name: "sourceField",
              description: "设置桑基图的来源节点数据字段。",
              type: "string",
              option: "-",
              default: "-",
              protocol: 'required',
            },
            {
              name: "targetField",
              description: "设置桑基图的目标节点数据字段。",
              type: "string",
              option: "-",
              default: "-",
              protocol: 'required',
            },
            {
              name: "weightField",
              description: "设置节点之间关系的权重字段信息，数据越大，边越大。",
              type: "string",
              option: "-",
              default: "-",
              protocol: 'required',
            },
            {
              name: "nodeStyle",
              description: "桑基图节点样式的配置。",
              type: "StyleAttr | Function",
              option: "-",
              default: "-",
              protocol: 'optional',
            },
            {
              name: "edgeStyle",
              description: "桑基图变样式的配置。",
              type: "StyleAttr | Function",
              option: "-",
              default: "-",
              protocol: 'optional',
            },
            {
              name: "color",
              description: "配置的颜色。如果没有配置颜色域，设置一个颜色。否则可以设置一系列颜色，也可以使用回调函数。",
              type: "string | string[] | Function",
              option: "自定义",
              default: '主题的颜色板',
              protocol: 'optional',
            },
            {
              name: "nodeWidthRatio",
              description: "桑基图节点的宽度配置，0 ~ 1，参考画布的宽度。",
              type: "number",
              option: "0 ~ 1",
              default: 0.008,
              protocol: 'optional',
            },
            {
              name: "nodeWidthPadding",
              description: "桑基图节点的之间垂直方向的间距，0 ~ 1，参考画布的高度。",
              type: "number",
              option: "0 ~ 1",
              default: 0.01,
              protocol: 'optional',
            },
            {
              name: "nodeAlign",
              description: "桑基图节点的布局方向",
              type: "string",
              option: "left,right,center,justify",
              default: 'justify',
              protocol: 'optional',
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
            name: 'updateData',
            param: "-",
            description: "更新图表数据。",
          }],
        },
        exampleName: [
          {
            name: "能量关系桑基图",
            callbackName: "exampleCallback2",
          },
          {
            name: "支付宝流量桑基图",
            callbackName: "exampleCallback1",
          },
          {
            name: "样式修改示例",
            callbackName: "exampleCallback3",
          },
        ],
      };
    },
    methods: {
      updateExampleData(data) {
        if (this.$refs.exampleItem && this.$refs.exampleItem.updateData) {
          this.$refs.exampleItem.updateData(data);
        }
      },
      exampleCallback1() {
        var tData = { ...this.basicData
        }
        this.updateExampleData(tData);
      },
      exampleCallback2() {
        var tData = { ...this.basicData
        }
        tData.data = [{
            "source": "Agricultural 'waste'",
            "target": "Bio-conversion",
            "value": 124.729
          },
          {
            "source": "Bio-conversion",
            "target": "Liquid",
            "value": 0.597
          },
          {
            "source": "Bio-conversion",
            "target": "Losses",
            "value": 26.862
          },
          {
            "source": "Bio-conversion",
            "target": "Solid",
            "value": 280.322
          },
          {
            "source": "Bio-conversion",
            "target": "Gas",
            "value": 81.144
          },
          {
            "source": "Biofuel imports",
            "target": "Liquid",
            "value": 35
          },
          {
            "source": "Biomass imports",
            "target": "Solid",
            "value": 35
          },
          {
            "source": "Coal imports",
            "target": "Coal",
            "value": 11.606
          },
          {
            "source": "Coal reserves",
            "target": "Coal",
            "value": 63.965
          },
          {
            "source": "Coal",
            "target": "Solid",
            "value": 75.571
          },
          {
            "source": "District heating",
            "target": "Industry",
            "value": 10.639
          },
          {
            "source": "District heating",
            "target": "Heating and cooling - commercial",
            "value": 22.505
          },
          {
            "source": "District heating",
            "target": "Heating and cooling - homes",
            "value": 46.184
          },
          {
            "source": "Electricity grid",
            "target": "Over generation / exports",
            "value": 104.453
          },
          {
            "source": "Electricity grid",
            "target": "Heating and cooling - homes",
            "value": 113.726
          },
          {
            "source": "Electricity grid",
            "target": "H2 conversion",
            "value": 27.14
          },
          {
            "source": "Electricity grid",
            "target": "Industry",
            "value": 342.165
          },
          {
            "source": "Electricity grid",
            "target": "Road transport",
            "value": 37.797
          },
          {
            "source": "Electricity grid",
            "target": "Agriculture",
            "value": 4.412
          },
          {
            "source": "Electricity grid",
            "target": "Heating and cooling - commercial",
            "value": 40.858
          },
          {
            "source": "Electricity grid",
            "target": "Losses",
            "value": 56.691
          },
          {
            "source": "Electricity grid",
            "target": "Rail transport",
            "value": 7.863
          },
          {
            "source": "Electricity grid",
            "target": "Lighting & appliances - commercial",
            "value": 90.008
          },
          {
            "source": "Electricity grid",
            "target": "Lighting & appliances - homes",
            "value": 93.494
          },
          {
            "source": "Gas imports",
            "target": "Ngas",
            "value": 40.719
          },
          {
            "source": "Gas reserves",
            "target": "Ngas",
            "value": 82.233
          },
          {
            "source": "Gas",
            "target": "Heating and cooling - commercial",
            "value": 0.129
          },
          {
            "source": "Gas",
            "target": "Losses",
            "value": 1.401
          },
          {
            "source": "Gas",
            "target": "Thermal generation",
            "value": 151.891
          },
          {
            "source": "Gas",
            "target": "Agriculture",
            "value": 2.096
          },
          {
            "source": "Gas",
            "target": "Industry",
            "value": 48.58
          },
          {
            "source": "Geothermal",
            "target": "Electricity grid",
            "value": 7.013
          },
          {
            "source": "H2 conversion",
            "target": "H2",
            "value": 20.897
          },
          {
            "source": "H2 conversion",
            "target": "Losses",
            "value": 6.242
          },
          {
            "source": "H2",
            "target": "Road transport",
            "value": 20.897
          },
          {
            "source": "Hydro",
            "target": "Electricity grid",
            "value": 6.995
          },
          {
            "source": "Liquid",
            "target": "Industry",
            "value": 121.066
          },
          {
            "source": "Liquid",
            "target": "International shipping",
            "value": 128.69
          },
          {
            "source": "Liquid",
            "target": "Road transport",
            "value": 135.835
          },
          {
            "source": "Liquid",
            "target": "Domestic aviation",
            "value": 14.458
          },
          {
            "source": "Liquid",
            "target": "International aviation",
            "value": 206.267
          },
          {
            "source": "Liquid",
            "target": "Agriculture",
            "value": 3.64
          },
          {
            "source": "Liquid",
            "target": "National navigation",
            "value": 33.218
          },
          {
            "source": "Liquid",
            "target": "Rail transport",
            "value": 4.413
          },
          {
            "source": "Marine algae",
            "target": "Bio-conversion",
            "value": 4.375
          },
          {
            "source": "Ngas",
            "target": "Gas",
            "value": 122.952
          },
          {
            "source": "Nuclear",
            "target": "Thermal generation",
            "value": 839.978
          },
          {
            "source": "Oil imports",
            "target": "Oil",
            "value": 504.287
          },
          {
            "source": "Oil reserves",
            "target": "Oil",
            "value": 107.703
          },
          {
            "source": "Oil",
            "target": "Liquid",
            "value": 611.99
          },
          {
            "source": "Other waste",
            "target": "Solid",
            "value": 56.587
          },
          {
            "source": "Other waste",
            "target": "Bio-conversion",
            "value": 77.81
          },
          {
            "source": "Pumped heat",
            "target": "Heating and cooling - homes",
            "value": 193.026
          },
          {
            "source": "Pumped heat",
            "target": "Heating and cooling - commercial",
            "value": 70.672
          },
          {
            "source": "Solar PV",
            "target": "Electricity grid",
            "value": 59.901
          },
          {
            "source": "Solar Thermal",
            "target": "Heating and cooling - homes",
            "value": 19.263
          },
          {
            "source": "Solar",
            "target": "Solar Thermal",
            "value": 19.263
          },
          {
            "source": "Solar",
            "target": "Solar PV",
            "value": 59.901
          },
          {
            "source": "Solid",
            "target": "Agriculture",
            "value": 0.882
          },
          {
            "source": "Solid",
            "target": "Thermal generation",
            "value": 400.12
          },
          {
            "source": "Solid",
            "target": "Industry",
            "value": 46.477
          },
          {
            "source": "Thermal generation",
            "target": "Electricity grid",
            "value": 525.531
          },
          {
            "source": "Thermal generation",
            "target": "Losses",
            "value": 787.129
          },
          {
            "source": "Thermal generation",
            "target": "District heating",
            "value": 79.329
          },
          {
            "source": "Tidal",
            "target": "Electricity grid",
            "value": 9.452
          },
          {
            "source": "UK land based bioenergy",
            "target": "Bio-conversion",
            "value": 182.01
          },
          {
            "source": "Wave",
            "target": "Electricity grid",
            "value": 19.013
          },
          {
            "source": "Wind",
            "target": "Electricity grid",
            "value": 289.366
          }
        ];

        tData.sourceField = 'source'
        tData.targetField = 'target'
        tData.weightField = 'value'
        tData.color = ['red', 'green', 'yellow']
        tData.edgeStyle = {
            fill: '#ccc',
            fillOpacity: 0.4,
          },
          console.log(tData)
        this.updateExampleData(tData);
      },
      exampleCallback3() {
        var tData = { ...this.basicData}
        tData.sourceField = 'source'
        tData.targetField = 'target'
        tData.weightField = 'value'
        tData.color = ['red', 'green', 'yellow']
        tData.edgeStyle = {
            fill: '#ccc',
            fillOpacity: 0.4,
          },
        this.updateExampleData(tData);
      },
      dealSelectExample(v) {
        console.log(v);
        if (v && typeof this[v] === "function") {
          this[v]();
        }
      },
      openDataStrunctDialog() {
        this.$refs.testDialog.show();
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
            JSON.stringify(this.$refs.exampleItem.dataObj),
            opts
          );
        } else if (name === "exampleStrunctDialog") {
          this.$refs.exampleStructItem.code = beautify(
            JSON.stringify(this.$refs.exampleItem.dataObj),
            opts
          );
        } else {}
      },
      dealConfirmDialog() {
        var code = this.$refs.exampleStructItem.code;
        //    console.log(code);
        try {
          this.updateExampleData(JSON.parse(code));
          // this.$refs.exampleTest.$forceUpdate();
          this.exampleSelect = "";
        } catch (e) {
          console.log(e);
        }
      },
      dealSelectionChange(val) {},
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
