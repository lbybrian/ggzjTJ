<template>
  <div style="padding: 20px 40px">
    <el-collapse v-model="activeNames">
      <slot v-for="(d, index) in collapseContent">
        <el-collapse-item :title="d.title" :name="index + 1 + ''">
          <div v-if="d.content.constructor.name === 'String'">
            {{ d.content }}
          </div>
          <div
            v-else-if="d.content.constructor.name === 'Array'"
            :key="j"
            v-for="(t, j) in d.content"
          >
            {{ t }}
          </div>
        </el-collapse-item>
      </slot>
    </el-collapse>
  </div>
</template>

<script>
import DataTable from "@/common/dataTable";
import DialogItem from "@/common/dialogItem";
export default {
  components: {
    DataTable,
    DialogItem,
  },
  mounted() {
    this.$nextTick(function () {});
  },
  data() {
    return {
      activeNames: ["1", "2", "3"],
      collapseContent: [
        {
          title: "基础代码的概述",
          content: [
            "基础代码项目的目的是为了帮助开发人员快速搭建项目Web前端基础架构，以方便项目能快速进行模块化、组件化地开发。",
            "基础代码除了集成了一些通用的Web前端工程化的插件(比如代理请求数据接口的nodejs插件，代码压缩打包插件等等)，也集成了一些项目前端公共的代码逻辑。",
            "前端公共的代码主要包括如下几个部分逻辑：",
            "1. 路由相关基础配置(src/router/index.js)",
            "2. 一级路由页面组件代码示例(src/main/*.vue)",
            "3. 数据接口生成脚本(src/common/config.js, src/common/adapter.js)",
            "4. 通用的功能逻辑组件(src/common/*.vue)",
            "5. 通用组件文档页面代码(src/modules/about/*.vue)",
          ],
        },
        {
          title: "基础代码的目录",
          content: "基础代码文件主要放在config、src、static和build目录中。",
        },
        {
          title: "基础代码的配置",
          content:
            "这里讲的基础代码配置，主要是开发模式下Web前端的webpack配置。",
        },
      ],
    };
  },
  methods: {},
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
