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
            name:"mouseover",
            param:"-",
            description:"当鼠标放上时触发该事件"
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
            width: "120",
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
        data: [
          {
            name: "data",
            description: "设置图表数据源。数据源为对象集合",
            type: "array object",
            option: "-",
            default: "-",
            protocol:'required',
          },
          {
            name: "imageMask",
            description: "设置一张图片，然后图表就可以根据该图片的形状进行渲染，可以是图片元素实例或者 url 地址和 base64。注意： 词语只渲染在图片的深色部位，浅色的部位（如白色）不渲染词语。当使用图片的 url 地址时，图片的大小不宜过大，不然图片加载时间过长。",
            type: "HTMLImageElement | string",
           option: "-",
            default: "-", protocol:'optional',
          },
          {
            name: "wordStyle",
            description: "设置每个词语的样式",
            type: "object",
           option: "-",
            default: "-", protocol:'optional',
          },
          {
            name: "wordField",
            description: "单词内容在数据中所对应的字段名。",
            type: "string",
          option: "-",
            default: "-",  protocol:'required',
          },
          {
            name: "weightField",
            description: "单词所占权重在数据中所对应的字段名。",
            type: "string",
          option: "-",
            default: "-",  protocol:'required',
          },
          {
            name: "colorField",
            description: "根据该字段进行颜色映射。",
            type: "string",
          option: "-",
            default: "-",  protocol:'optional',
          },
          {
            name: "random",
            description: "自定义所使用的随机函数，其值可以是一个 [0, 1) 区间中的值，也可以是一个返回该值的函数，当该值是一个固定的值时，每次渲染相同数据的词云图时，其对应的每个单词的布局坐标一致。",
            type: "number | function",
         option: "-",
            default: "-",   protocol:'optional',
          },
          {
            name: "timeInterval",
            description: "设置绘制程序最大的执行时间，单位毫秒，如果时间设置过短可能会只绘制一部分词语。",
            type: "number",
          option: "-",
            default: "-",  protocol:'optional',
            defalut:2000,
          },
          {
            name: "meta",
            description: "全局化配置图表数据元信息，以字段为单位进行配置。在 meta 上的配置将同时影响所有组件的文本信息。",
            type: "object",
           option: "-",
            default: "-", protocol:'optional',
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
          	name:'updateData',
          	param: "-",
            description: "更新图表数据。",
          }
        ],
      },
      exampleName: [
        {
          name: "三角形示例图",
          callbackName: "exampleCallback1",
        },
        {
          name: "长方形示例图",
          callbackName: "exampleCallback2",
        },
        {
          name: "椭圆形示例图",
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
      var tData = { ...this.basicData };
      tData.imageMask = "/static/example/wordCloud/imgs/A_07tdTIOmvlYAAAAAAAAAAABkARQnAQ.png";
      this.updateExampleData(tData);
    },
    exampleCallback2() {
      var tData = { ...this.basicData };
      tData.imageMask='/static/example/wordCloud/imgs/u=3918304302,2876966628&fm=26&gp=0.jpg';
   //    tData.interactions=[{
			// 			type: 'element-active'
			// 		}];
			// tData.state={
			// 			active: {
			// 				style: {
			// 					lineWidth: 3,
			// 				}
			// 			}
			// 		};
      this.updateExampleData(tData);
    },
    exampleCallback3() {
      var tData = { ...this.basicData };
      tData.imageMask='/static/example/wordCloud/imgs/u=2696112892,3612948094&fm=26&gp=0.jpg';
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
