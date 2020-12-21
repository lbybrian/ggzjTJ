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
import Example1 from "../../../static/example/relationship/1.vue";
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
  beforeMount() {},
  mounted() {
    this.$nextTick(function () {
      var tData = this.getCurrentData();
      this.basicData = { ...tData };
    });
  },
  data() {
    return {
      basicData: {},
      componentPath: "/static/example/relationship/1.vue",
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
            name: "inited",
            param: "cy, item",
            description: "当图谱初始化后，触发该事件",
          },
          {
            name: "node-click",
            param: "data, node, cy",
            description: "当节点被点击的时，触发该事件",
          },
          {
            name: "node-hover",
            param: "data, node, cy",
            description: "当鼠标移至某节点时，触发该事件",
          },
          {
            name: "edge-click",
            param: "data, node, cy",
            description: "当连线(边)点被点击的时，触发该事件",
          },
          {
            name: "edge-hover",
            param: "data, node, cy",
            description: "当鼠标移至某连线(边)时，触发该事件",
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
            name: "nodes",
            description: "包含所有节点元素的数组",
            type: "Array",
            option: "-",
            default: "-",
          },
          {
            name: "nodes[].id",
            description:
              "节点元素的id属性，具有唯一性，id相同的节点只会渲染其中的第1个，id属性是必须属性",
            type: "Object",
            option: "-",
            default: "-",
          },
          {
            name: "nodes[].label",
            description: "节点元素的label属性，非必须项",
            type: "Object",
            option: "-",
            default: "-",
          },
          {
            name: "edges",
            description: "包含所有连线(边)元素的数组",
            type: "Array",
            option: "-",
            default: "-",
          },
          {
            name: "edges[].id",
            description:
              "连线(边)元素的id属性，具有唯一性，id相同的节点只会渲染其中的第1个，id属性是必须属性",
            type: "String",
            option: "-",
            default: "-",
          },
          {
            name: "edges[].source",
            description: "连线(边)元素的source属性，值为其起始节点id属性值",
            type: "String",
            option: "-",
            default: "-",
          },
          {
            name: "edges[].target",
            description: "连线(边)元素的source属性，值为其目标节点id属性值",
            type: "String",
            option: "-",
            default: "-",
          },
          {
            name: "layout",
            description: "节点的布局方式",
            type: "Object",
            option: "-",
            default: "{name: 'grid'}",
          },
          {
            name: "layout.name",
            description: "布局方式的名称",
            type: "String",
            option: "random, grid, cola, avsdf, breadthfirst, circle, cise, concentric, cose, dagre, fcose, klay, spread, springy",
            default: "random",
          },
          {
            name: "labelSelector",
            description: "节点和边的选择器，用于设置节点和边的样式",
            type: "Object",
            option: "-",
            default: "-",
          },
          {
            name: "labelSelector.node",
            description: "所有节点的样式对象",
            type: "Object",
            option: "-",
            default: "-",
          },
          {
            name: "labelSelector.edge",
            description: "所有边(连线)的样式对象",
            type: "Object",
            option: "-",
            default: "-",
          },
          {
            name: "idSelector",
            description: "id选择器, 用于设置某些id的样式，样式属性参考https://js.cytoscape.org/#style",
            type: "Object",
            option: "-",
            default: "-",
          },
          {
            name: "style",
            description: "通用的样式设置, 格式参考https://js.cytoscape.org/#style/format",
            type: "Array",
            option: "-",
            default: "[]",
          },
          {
            name: "option",
            description: "图谱的全局配置，配置参数参考https://js.cytoscape.org/#core/initialisation",
            type: "Object",
            option: "-",
            default: "{ minZoom: 0.2,  maxZoom: 10 }",
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
            description: "用于更新图谱数据",
          },
          {
            name: "heighlightCurrentRelated",
            param: "node",
            description: "用于过滤显示当前的节点和与之有关系的节点及连线",
          },
          {
            name: "popperRemove",
            param: "-",
            description: "用于删除弹出的提示框",
          }
        ],
      },
      exampleName: [
        {
          name: "某种布局展示",
          callbackName: "exampleCallback1",
        },
        {
          name: "节点带边框",
          callbackName: "exampleCallback2",
        },
        {
          name: "线条带方向箭头",
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
      tData.layout = {
        name: "cola",
      };
      console.log(this.basicData);
      this.updateExampleData(tData);
    },
    exampleCallback2() {
      var tData = { ...this.basicData };
      tData.labelSelector.node = {
        "border-width": "2px",
        "border-color": "#ddd",
        "background-color": "rgb(106, 176, 184)",
        label: "data(label)",
      };
      tData.layout = {
        name: "random",
      };
      console.log(this.basicData);
      this.updateExampleData(tData);
    },
    exampleCallback3() {
      var tData = { ...this.basicData };
      console.log(this.basicData);
      tData.labelSelector.edge = {
        width: 1,
        "line-color": "#ccc",
        "target-arrow-color": "#ccc",
        "target-arrow-shape": "triangle",
        "curve-style": "bezier",
      };
      tData.layout = {
        name: "cola",
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
    getCurrentData() {
      return this.$refs.exampleItem.$refs.exampleTestItem.data;
    },
    dealOpenDialog(name) {
      this.$refs.exampleStructItem.code = beautify(
        JSON.stringify(this.getCurrentData()), opts
      );
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
