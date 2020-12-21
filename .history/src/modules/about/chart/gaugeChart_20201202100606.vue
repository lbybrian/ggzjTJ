<template>
  <div style="padding: 20px 40px">
    <el-collapse
      v-model="activeNames"
      :accordion="true"
      @change="dealChangeEvent"
      style="width: 1000px"
    >
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
import Example1 from "../../../../static/example/gaugeChart/1.vue";
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
      componentPath: "/static/example/gaugeChart/1.vue",
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
            description: "当点击仪表图块时触发该事件",
          },
          {
            name: "mouseover",
            param: "data",
            description: "当鼠标移到点击仪表图块时触发该事件",
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
              "散点的样式和属性。请参考https://echarts.apache.org/zh/option.html#series-pie",
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
          name: "仪表图",
          callbackName: "exampleCallback1",
        },
        {
          name: "调整标注文字信息",
          callbackName: "exampleCallback2",
        },
        {
          name: "调整角度",
          callbackName: "exampleCallback3",
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
      this.updateExampleData(tData);
    },
    exampleCallback2() {
      var tData = { ...this.basicData };
      tData.itemStyle = {
        detail: {formatter: '{value}%'},
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
      }
      this.updateExampleData(tData);
    },
    exampleCallback3() {
      var tData = { ...this.basicData };
       tData.itemStyle = {
        detail: {formatter: '{value}%'},
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        //  默认
        // startAngle : 225,
        // endAngle: -45
        startAngle : 245,
        endAngle: 5
      }
      this.updateExampleData(tData);
    },
    exampleCallback4() {
      var tData = { ...this.basicData };
      tData.itemStyle = {
        smooth: true,
        markArea: {
          data: [
            [
              {
                type: "min",
              },
              {
                type: "max",
              },
            ],
          ],
          silent: true,
        },
      };
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
          this.util.objectToString(this.$refs.exampleItem.dataObj), opts
        );
      } else if (name === "exampleStrunctDialog") {
        this.$refs.exampleStructItem.code = beautify(
          this.util.objectToString(this.$refs.exampleItem.dataObj), opts
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
    dealChangeEvent(v) {
      if (v === "1") {
        this.$refs.exampleItem.updateData();
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
