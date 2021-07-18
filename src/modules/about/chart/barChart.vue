<template>
  <div style="padding: 20px 40px">
    <el-collapse v-model="activeNames" :accordion="true" style="width: 1000px">
      <el-collapse-item title="组件示例" name="1">
        <h2 style="position: relative; float: left; width: 100%">
          典型案例
          <el-button
            @click="openExampleStrunctDialog"
            style="float: right; margin-left: 20px"
            type="text"
            >参数数据结构</el-button
          >
          <el-button
            @click="openExampleCodeDialog"
            style="float: right"
            type="text"
            >示例代码</el-button
          >
        </h2>
        <Example1
          style="
            width: calc(100% - 180px);
            display: inline-block;
            float: left;
            margin-right: 20px;
          "
          ref="exampleItem"
          class="exampleItem"
        ></Example1>
        <el-radio-group
          v-model="exampleSelect"
          @change="dealSelectExample"
          style="
            padding: 10px 0px;
            float: left;
            width: 160px;
            display: inline-block;
          "
        >
          <slot v-for="d in exampleName">
            <el-radio
              style="width: 100%; margin: 0px; margin-bottom: 5px"
              :label="d.callbackName"
              border
              >{{ d.name }}</el-radio
            >
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
    <DialogItem
      @openDialog="dealOpenDialog('exampleStrunctDialog')"
      @confirmDialog="dealConfirmDialog"
      :config="exampleStrunctDialog"
      ref="exampleStrunctDialog"
    >
      <template>
        <CodeViewer ref="exampleStructItem"></CodeViewer>
      </template>
    </DialogItem>
    <DialogItem
      @openDialog="dealOpenDialog('exampleCodeDialog')"
      :config="exampleCodeDialog"
      ref="exampleCodeDialog"
    >
      <template>
        <ExampleViewer
          style="max-height: 800px"
          :url="componentPath"
        ></ExampleViewer>
      </template>
    </DialogItem>
  </div>
</template>

<script>
import Example1 from "../../../../static/example/barChart/1.vue";
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
    this.$nextTick(function () {
      this.basicData = { ...this.$refs.exampleItem.dataObj };
    });
  },
  data() {
    return {
      basicData: {},
      componentPath: "/static/example/barChart/1.vue",
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
            description: "当点击折线上的数据节点时触发该事件",
          },
          {
            name: "mouseover",
            param: "data",
            description: "当鼠标移到折线上的数据节点时触发该事件",
          }
        ],
      },
      paramDescription: {
        header: [
          {
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
        data: [
          {
            name: "itemStyle",
            description:
              "散点的样式和属性。请参考https://echarts.apache.org/zh/option.html#series-bar",
            type: "Object",
            option: "-",
            default: "-",
          },
          {
            name: "title",
            description: "标题字符串, 默认显示在图标的左上角。",
            type: "String",
            option: "-",
            default: "-",
          },
          {
            name: "titleStyle",
            description:
              "标题字符串样式和属性。请参考https://echarts.apache.org/zh/option.html#textStyle",
            type: "Object",
            option: "-",
            default: "-",
          },
          {
            name: "tooltip",
            description:
              "设浮层提示信息相关样式和属性。请参考https://echarts.apache.org/zh/option.html#tooltip",
            type: "Object",
            option: "-",
            default: "-",
          }
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
        ],
      },
      exampleName: [
        {
          name: "横向柱形图",
          callbackName: "exampleCallback1",
        },
        {
          name: "纵向柱形图",
          callbackName: "exampleCallback2",
        },
        {
          name: "横向多种类柱形图",
          callbackName: "exampleCallback3",
        },
         {
          name: "纵向多种类柱形图",
          callbackName: "exampleCallback4",
        },
        {
          name: "横向堆叠柱形图",
          callbackName: "exampleCallback5",
        },
        {
          name: "纵向堆叠柱形图",
          callbackName: "exampleCallback6",
        },
        {
          name: "弧形柱形图",
          callbackName: "exampleCallback7",
        }
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
      var tData = { ...this.basicData };
      tData.mode = "horizontal";
      this.updateExampleData(tData);
    },
    exampleCallback2() {
      var tData = { ...this.basicData };
      tData.mode = "vertical";
      tData.xAxisStyle = {
        splitLine:{
          show: false
        }
      }
      tData.yAxisStyle = {
        splitLine:{
          show: true,
          lineStyle:{
            color:'#EBEEF5',
            type: 'dashed' ,
          }
        }
      }
      this.updateExampleData(tData);
    },
    exampleCallback3() {
      var tData = { ...this.basicData };
      tData.name = ["销量", "库存"];
      tData.data = [
        {
          name: "AK47",
          value: [1300, 2000],
        },
        {
          name: "Mp5冲锋枪",
          value: [3400, 2100],
        },
        {
          name: "榴弹",
          value: [1000, 2000],
        },
        {
          name: "AWP狙击枪",
          value: [5000, 5000],
        },
        {
          name: "加农炮",
          value: [13000, 2000],
        },
        {
          name: "马克沁机枪",
          value: [3000, 2000],
        },
      ];
      this.updateExampleData(tData);
    },
    exampleCallback4() {
      var tData = { ...this.basicData };
      tData.name = ["销量", "库存"];
      tData.mode = "vertical";
      tData.data = [
        {
          name: "AK47",
          value: [1300, 2000],
        },
        {
          name: "Mp5冲锋枪",
          value: [3400, 2100],
        },
        {
          name: "榴弹",
          value: [1000, 2000],
        },
        {
          name: "AWP狙击枪",
          value: [5000, 5000],
        },
        {
          name: "加农炮",
          value: [13000, 2000],
        },
        {
          name: "马克沁机枪",
          value: [3000, 2000],
        },
      ];
      this.updateExampleData(tData);
    },
    exampleCallback5() {
      var tData = { ...this.basicData };
      tData.mode = "horizontal";
      tData.name = ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'];
      tData.data = [
        {
            name: '周一',
            type: 'bar',
            stack: '总量',
            value: [320, 302, 301, 334, 390, 330, 320]
        },
        {
            name: '周二',
            type: 'bar',
            stack: '总量',
            value: [120, 132, 101, 134, 90, 230, 210]
        },
        {
            name: '周三',
            type: 'bar',
            stack: '总量',
            value: [220, 182, 191, 234, 290, 330, 310]
        },
        {
            name: '周四',
            type: 'bar',
            stack: '总量',
            value: [150, 212, 201, 154, 190, 330, 410]
        },
        {
            name: '周五',
            type: 'bar',
            stack: '总量',
            value: [820, 832, 901, 934, 1290, 1330, 1320]
        }
      ];
      this.updateExampleData(tData);
    },
    exampleCallback6() {
      var tData = { ...this.basicData };
      tData.mode = "vertical";
      tData.name = ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'];
      tData.data = [
        {
            name: '周一',
            type: 'bar',
            stack: '总量',
            label: {
                show: true,
                position: 'insideRight'
            },
            value: [320, 302, 301, 334, 390, 330, 320]
        },
        {
            name: '周二',
            type: 'bar',
            stack: '总量',
            label: {
                show: true,
                position: 'insideRight'
            },
            value: [120, 132, 101, 134, 90, 230, 210]
        },
        {
            name: '周三',
            type: 'bar',
            stack: '总量',
            label: {
                show: true,
                position: 'insideRight'
            },
            value: [220, 182, 191, 234, 290, 330, 310]
        },
        {
            name: '周四',
            type: 'bar',
            stack: '总量',
            label: {
                show: true,
                position: 'insideRight'
            },
            value: [150, 212, 201, 154, 190, 330, 410]
        },
        {
            name: '周五',
            type: 'bar',
            stack: '总量',
            label: {
                show: true,
                position: 'insideRight'
            },
            value: [820, 832, 901, 934, 1290, 1330, 1320]
        }
      ];
      this.updateExampleData(tData);
    },
    exampleCallback7() {
      var tData = { ...this.basicData };
      tData.mode = "vertical";
      tData.title = {
        text:'你好',
        textStyle:{
          color:'pink'
        }
      }
     tData.yAxisStyle= {
            position: "left",
            name: "分值",
            nameTextStyle:{//y轴上方单位的颜色
              color:'#fff'  
            },
            axisLine: {
              show: true, //坐标轴轴线
              color: "#EBEEF5",
            },
            axisTick: {
              show: false, //坐标轴刻度
            },
            splitLine: {
              //网格线
              show: false,
            },
            axisLabel : {
                formatter: '{value}',
                textStyle: { //改变刻度字体样式
                    color: '#000'
                }
            }
          },
     tData.xAxisStyle= {
            axisLine: {
              show: true, //坐标轴轴线
              color: "#EBEEF5",
            },
            axisTick: {
              show: false, //坐标轴刻度
            },
            splitLine: {
              //网格线
              show: false,
            },
            axisLabel : {
                formatter: '{value}',
                textStyle: { //改变刻度字体样式
                    color: '#000'
                }
            }
          },
      tData.data = [
          {
            name: "AK47",
            value: 3000,
            //柱子上的字体
            label: {
                normal: {
                  show: true,
                  position: "top",
                  textStyle: {
                    color: "#4a99e2",
                  },
                  formatter: function (params) {
                    return params.value;
                  },
                },
            },
            itemStyle: {
                //柱形图圆角，鼠标移上去效果
                emphasis: {
                  barBorderRadius: [30, 30, 0, 0],
                },
                normal: {
                  //柱形图圆角，初始化效果
                  barBorderRadius: [30, 30, 0, 0],
                },
              },
              barWidth:35,
          },
          {
            name: "Mp5冲锋枪",
            value: 2500,
             //柱子上的字体
            label: {
                normal: {
                  show: true,
                  position: "top",
                  textStyle: {
                    color: "#4a99e2",
                  },
                  formatter: function (params) {
                    return params.value;
                  },
                },
            },
            itemStyle: {
                //柱形图圆角，鼠标移上去效果
                emphasis: {
                  barBorderRadius: [30, 30, 0, 0],
                },
                normal: {
                  //柱形图圆角，初始化效果
                  barBorderRadius: [30, 30, 0, 0],
                },
              },
              barWidth:35,
          },
          {
            name: "榴弹",
            value: 1000,
             //柱子上的字体
            label: {
                normal: {
                  show: true,
                  position: "top",
                  textStyle: {
                    color: "#4a99e2",
                  },
                  formatter: function (params) {
                    return params.value;
                  },
                },
            },
            itemStyle: {
                //柱形图圆角，鼠标移上去效果
                emphasis: {
                  barBorderRadius: [30, 30, 0, 0],
                },
                normal: {
                  //柱形图圆角，初始化效果
                  barBorderRadius: [30, 30, 0, 0],
                },
              },
              barWidth:35,
          },
          {
            name: "AWP狙击枪",
            value: 8000,
             //柱子上的字体
            label: {
                normal: {
                  show: true,
                  position: "top",
                  textStyle: {
                    color: "#4a99e2",
                  },
                  formatter: function (params) {
                    return params.value;
                  },
                },
            },
            itemStyle: {
                //柱形图圆角，鼠标移上去效果
                emphasis: {
                  barBorderRadius: [30, 30, 0, 0],
                },
                normal: {
                  //柱形图圆角，初始化效果
                  barBorderRadius: [30, 30, 0, 0],
                },
              },
              barWidth:35,
          },
          {
            name: "加农炮",
            value: 28000,
             //柱子上的字体
            label: {
                normal: {
                  show: true,
                  position: "top",
                  textStyle: {
                    color: "#4a99e2",
                  },
                  formatter: function (params) {
                    return params.value;
                  },
                },
            },
            itemStyle: {
                //柱形图圆角，鼠标移上去效果
                emphasis: {
                  barBorderRadius: [30, 30, 0, 0],
                },
                normal: {
                  //柱形图圆角，初始化效果
                  barBorderRadius: [30, 30, 0, 0],
                },
              },
              barWidth:35,
          },
          {
            name: "马克沁机枪",
            value: 12000,
             //柱子上的字体
            label: {
                normal: {
                  show: true,
                  position: "top",
                  textStyle: {
                    color: "#4a99e2",
                  },
                  formatter: function (params) {
                    return params.value;
                  },
                },
            },
            itemStyle: {
                //柱形图圆角，鼠标移上去效果
                emphasis: {
                  barBorderRadius: [30, 30, 0, 0],
                },
                normal: {
                  //柱形图圆角，初始化效果
                  barBorderRadius: [30, 30, 0, 0],
                },
              },
              barWidth:35,
          },
        ]
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
          JSON.stringify(this.$refs.exampleItem.dataObj), opts
        );
      } else if (name === "exampleStrunctDialog") {
        this.$refs.exampleStructItem.code = beautify(
          JSON.stringify(this.$refs.exampleItem.dataObj), opts
        );
      } else {
      }
    },
    dealConfirmDialog() {
      var code = this.$refs.exampleStructItem.code;
      console.log(code);
      try {
        this.updateExampleData(this.util.stringToObject(code));
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

.introduce > h2 {
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
