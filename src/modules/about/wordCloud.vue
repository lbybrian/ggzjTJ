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
import Example1 from "../../../static/example/wordCloud/1.vue";
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
//    console.log('找找啊啊啊啊',this.basicData)
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
            name: "on",
            param: "chart.on('eventName', callback);",
            description: "在 Chart 和 View 上通过 on 绑定事件。",
          },
          {
            name: "off",
            param: "chart.off('eventName', callback);",
            description: "在 Chart 和 View 上通过off 移除绑定事件。",
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
            name: "data",
            description: "设置图表数据源。数据源为对象集合",
            type: "array object",
            required:true,
          },
          {
            name: "wordField",
            description: "单词内容在数据中所对应的字段名。",
            type: "string",
            required:true,
          },
          {
            name: "weightField",
            description: "单词所占权重在数据中所对应的字段名。",
            type: "string",
            required:true,
          },
          {
            name: "colorField",
            description: "根据该字段进行颜色映射。",
            type: "string",
            required:false,
          },
          {
            name: "random",
            description: "自定义所使用的随机函数，其值可以是一个 [0, 1) 区间中的值，也可以是一个返回该值的函数，当该值是一个固定的值时，每次渲染相同数据的词云图时，其对应的每个单词的布局坐标一致。",
            type: "number | function",
            required:false,
          },
          {
            name: "timeInterval",
            description: "设置绘制程序最大的执行时间，单位毫秒，如果时间设置过短可能会只绘制一部分词语。",
            type: "number",
            required:false,
            defalut:2000,
          },
          {
            name: "meta",
            description: "全局化配置图表数据元信息，以字段为单位进行配置。在 meta 上的配置将同时影响所有组件的文本信息。",
            type: "object",
            required:false,
            children:[
            	{
		            name: "alias",
		            description: " 	字段的别名。",
		            type: "string",
		          },
		          {
		            name: "formatter",
		            description: " 	callback 方法，对该字段所有值进行格式化处理。",
		            type: "function",
		          },
		          {
		            name: "values",
		            description: " 	枚举该字段下所有值。",
		            type: "string []",
		          },
		          {
		            name: "range",
		            description: " 	字段的数据映射区间，默认为[0,1]。",
		            type: "number []",
		          },
            ]
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
            name: "render()",
            param: "-",
            description: "渲染图表。",
          },
          {
          	name:'update()',
          	param: "-",
            description: "更新图表配置项，配置覆盖，不会做差异比对。。",
          }
        ],
      },
      exampleName: [
        {
          name: "三角形示例图",
          callbackName: "exampleCallback1",
        },
        {
          name: "方形示例图",
          callbackName: "exampleCallback2",
        },
        {
          name: "圆形示例图",
          callbackName: "exampleCallback3",
        },
      ],
    };
  },
  methods: {
    updateExampleData(data) {
      if (
        this.$refs.exampleItem.$refs.exampleTestItem &&
        this.$refs.exampleItem.$refs.exampleTestItem.showCloud
      ) {
        this.$refs.exampleItem.$refs.exampleTestItem.showCloud(data);
      }
    },
    exampleCallback1() {
      var tData = { ...this.basicData };
      tData.imageMask = "https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*07tdTIOmvlYAAAAAAAAAAABkARQnAQ";
//    this.$refs.exampleItem.$refs.exampleTestItem.isShow=!this.$refs.exampleItem.$refs.exampleTestItem.isShow;
//    this.$refs.exampleItem.$refs.exampleTestItem.isShow=false;
      tData.changeSign=false;
      console.log('q1q1q1q1q1q1q1',tData.imageMask,)
//    this.$refs.exampleItem.dataObj.imageMask="https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*07tdTIOmvlYAAAAAAAAAAABkARQnAQ";
      this.updateExampleData(tData);
    },
    exampleCallback2() {
      var tData = { ...this.basicData };
      tData.imageMask='https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3918304302,2876966628&fm=26&gp=0.jpg';
//    this.$refs.exampleItem.$refs.exampleTestItem.isShow=!this.$refs.exampleItem.$refs.exampleTestItem.isShow;
//    this.$refs.exampleItem.$refs.exampleTestItem.isShow=false;
      tData.changeSign=true;
      console.log('2w2w2w2w2w2w2w',tData.imageMask,)
//    this.$refs.exampleItem.dataObj.imageMask="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3918304302,2876966628&fm=26&gp=0.jpg";
      this.updateExampleData(tData);
    },
    exampleCallback3() {
      var tData = { ...this.basicData };
      tData.imageMask='https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2696112892,3612948094&fm=26&gp=0.jpg';
//    this.$refs.exampleItem.$refs.exampleTestItem.isShow=!this.$refs.exampleItem.$refs.exampleTestItem.isShow;
//    this.$refs.exampleItem.$refs.exampleTestItem.isShow=false;
      tData.changeSign=true;
      console.log('3e3e3e3e3e3e3e3e3e',tData.imageMask,)
//    this.$refs.exampleItem.dataObj.imageMask="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2696112892,3612948094&fm=26&gp=0.jpg";
      this.updateExampleData(tData);
    },
//  exampleCallback1() {
//    var tData = { ...this.basicData };
//    tData.ImageBitmap = "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3183640937,1982156122&fm=26&gp=0.jpg";
//    this.updateExampleData(tData);
//  },
//  exampleCallback2() {
////  	console.log('看看22',this.basicData)
//    var tData = { ...this.basicData };
//    tData.imageMask='https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=144259653,1738085311&fm=26&gp=0.jpg';
//    this.updateExampleData(tData[1].imageMask);
//		console.log('看看22',tData[1].imageMask)
//  },
//  exampleCallback3() {
////  	console.log('看看33',this.basicData)
//    var tData = { ...this.basicData };
//    this.updateExampleData(tData[2].imageMask);
//		console.log('看看33',tData[2].imageMask)
//  },
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
