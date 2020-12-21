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
import Example1 from "../../../static/example/dataTable/1.vue";
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
      componentPath: "/static/example/dataTable/1.vue",
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
            name: "button-click",
            param: "name, row, index",
            description: "当点击按钮时触发该事件",
          },
          {
            name: "selection-change",
            param: "selection, row",
            description: "当选择项发生变化时会触发该事件",
          },
          {
            name: "cell-click",
            param: "row, column, cell, event",
            description: "当某个单元格被点击时会触发该事件",
          },
          {
            name: "sort-change",
            param: "{ column, prop, order }",
            description: "当某个单元格被点击时会触发该事件",
          },
          {
            name: "current-change",
            param: "当前页数和每页条数",
            description: "当前页改变时会触发",
          },
          {
            name: "size-change",
            param: "当前页数和每页条数",
            description: "每页条数改变时会触发",
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
            name: "header",
            description: "表格头相关参数极其所在列的相关信息",
            type: "Array",
            option: "-",
            default: "-",
          },
          {
            name: "header[].prop",
            description: "某列表头对应的数据属性，数据中该属性的值会显示在该列",
            type: "string",
            option: "-",
            default: "-",
          },
          {
            name: "header[].label",
            description: "某列表头要显示的信息",
            type: "string",
            option: "-",
            default: "-",
          },
          {
            name: "header[].sortable",
            description: "某列表头是否显示排序图标",
            type: "boolean, string",
            option: "true, false, 'custom'",
            default: "false",
          },
          {
            name: "header[].width",
            description: "某列的宽度",
            type: "string",
            option: "-",
            default: "-",
          },
          {
            name: "header[].fixed",
            description: "某列是否左侧或右侧固定",
            type: "string, boolean",
            option: "true, false, 'left', 'right'",
            default: "false",
          },
          {
            name: "header[].resizable",
            description: "某列的宽度是否可调整",
            type: "boolean",
            option: "true, false",
            default: "true",
          },
          {
            name: "header[].showOverflowTooltip",
            description: "该列的单元格是否显示Tooltip",
            type: "boolean",
            option: "true, false",
            default: "false",
          },
          {
            name: "header[].minWidth",
            description: "某列的列宽最小宽度",
            type: "string",
            option: "-",
            default: "-",
          },
          {
            name: "header[].headerAlign",
            description: "某列的表头信息对齐方式",
            type: "string",
            option: "left/center/right",
            default: "-",
          },
          {
            name: "header[].className",
            description: "给某列的单元格添加className属性",
            type: "string",
            option: "-",
            default: "-",
          },
          {
            name: "height",
            description:
              "Table 的高度，默认为自动高度。如果 height 为 number 类型，单位 px；如果 height 为 string 类型，则这个高度会设置为 Table 的 style.height 的值，Table 的高度会受控于外部样式。",
            type: "string/number",
            option: "-",
            default: "-",
          },
          {
            name: "size",
            description: "是否支持复选Checkbox列",
            type: "string",
            option: "medium / small / mini",
            default: "-",
          },
          {
            name: "withSelection",
            description: "是否支持复选Checkbox列",
            type: "boolean",
            option: "true, false",
            default: "-",
          },
          {
            name: "withIndex",
            description: "是否增加索引编号列",
            type: "boolean",
            option: "true, false",
            default: "-",
          },

          {
            name: "data",
            description: "Table要显示的数据",
            type: "Array",
            option: "-",
            default: "-",
          },
          {
            name: "page",
            description: "Table 的分页相关信息",
            type: "Object",
            option: "-",
            default: "-",
          },
          {
            name: "page.pageSize",
            description: "每页显示多少条记录",
            type: "number",
            option: "-",
            default: "10",
          },
          {
            name: "page.currentPage",
            description: "当前页编号",
            type: "Object",
            option: "-",
            default: "1",
          },
          {
            name: "page.layout",
            description: "组件布局，子组件名用逗号分隔",
            type: "String",
            option: "sizes, prev, pager, next, jumper, ->, total, slot",
            default: "'prev, pager, next, jumper, ->, total'",
          },
          {
            name: "page.background",
            description: "是否为分页按钮添加背景色",
            type: "boolean",
            option: "-",
            default: "false",
          },
          {
            name: "page.total",
            description: "总条目数",
            type: "number",
            option: "-",
            default: "-",
          },
          {
            name: "emptyText",
            description: "当表格数据为空时显示的字符串",
            type: "string",
            option: "-",
            default: "当前数据为空",
          },
          {
            name: "border",
            description: "是否添加表格边框",
            type: "boolean",
            option: "true, false",
            default: "false",
          },
          {
            name: "fit",
            description: "列的宽度是否自撑开",
            type: "boolean",
            option: "true, false",
            default: "true",
          },
          {
            name: "heightCurrentRow",
            description: "是否要高亮当前行",
            type: "boolean",
            option: "true, false",
            default: "false",
          },
          {
            name: "showHeader",
            description: "是否显示表头",
            type: "boolean",
            option: "true, false",
            default: "true",
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
            name: "clearSelection",
            param: "-",
            description: "用于多选表格，清空用户的选择",
          },
          {
            name: "toggleRowSelection",
            param: "row, selected",
            description:
              "用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中）",
          },
          {
            name: "setCurrentRow",
            param: "row",
            description:
              "用于单选表格，设定某一行为选中行，如果调用时不加参数，则会取消目前高亮行的选中状态。",
          },
          {
            name: "clearSort",
            param: "-",
            description: "用于清空排序条件，数据会恢复成未排序的状态",
          },
        ],
      },
      exampleName: [
        {
          name: "带索引和复选",
          callbackName: "exampleCallback1",
        },
        {
          name: "不带索引和复选",
          callbackName: "exampleCallback2",
        },
        {
          name: "不带分页按钮",
          callbackName: "exampleCallback3",
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
      var tData = { ...this.basicData };
      tData.withIndex = true;
      tData.withSelection = true;
      this.updateExampleData(tData);
    },
    exampleCallback2() {
      var tData = { ...this.basicData };
      tData.withIndex = false;
      tData.withSelection = false;
      this.updateExampleData(tData);
    },
    exampleCallback3() {
      var tData = { ...this.basicData };
      tData.withIndex = true;
      tData.withSelection = false;
      tData.page = null;
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
