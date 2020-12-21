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
import Example1 from "../../../static/example/topology/1.vue";
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
      componentPath: "/static/example/topology/1.vue",
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
            name: "select",
            param: "index,indexPath",
            description: "菜单激活回调",
          },
          {
            name: "open",
            param: "index,indexPath",
            description: "sub-menu 展开的回调",
          },
          {
            name: "close",
            param: "index,indexPath",
            description: "sub-menu 收起的回调",
          },
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
            name: "index",
            description: "唯一标志",
            type: "string/null",
            option: "-",
            default: "-",
          },
          {
            name: "show-timeout",
            description: "展开 sub-menu 的延时",
            type: "number",
            option: "-",
            default: "300",
          },
          {
            name: "hide-timeout",
            description: "收起 sub-menu 的延时",
            type: "number",
            option: "-",
            default: "300",
          },
          {
            name: "disabled",
            description: "是否禁用",
            type: "boolean",
            option: "true, false,",
            default: "false",
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
            name: "open",
            param: "index",
            description: "展开指定的sub-menu",
          },
          {
            name: "close",
            param: "index",
            description: "收起指定的sub-menu",
          },       
        ],
      },
      exampleName: [
        {
          name: "水平下拉菜单",
          callbackName: "exampleCallback1",
        },
        {
          name: "垂直下拉菜单",
          callbackName: "exampleCallback2",
        },
      ],
    };
  },
  methods: {
    updateExampleData(data) {
      if (
        this.$refs.exampleItem.$refs.exampleTestItem &&
        this.$refs.exampleItem.$refs.exampleTestItem.updateData
      ) {
        this.$refs.exampleItem.$refs.exampleTestItem.updateData(data);
      }
    },
    exampleCallback1() {
      // this.$refs.exampleItem.$refs.exampleTestItem.mode="horizontal"
      var tData = { ...this.basicData };
      tData.mode = "horizontal";
      this.updateExampleData(tData);
    },
    exampleCallback2() {
      // this.$refs.exampleItem.$refs.exampleTestItem.mode="vertical"
      var tData = { ...this.basicData };
      tData.mode = "vertical";
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
      } else {
      }
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
