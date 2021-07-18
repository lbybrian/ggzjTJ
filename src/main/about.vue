<template>
  <div class="mainPage">
    <div class="headerArea">
      <MyHeader>
        <template v-slot:logo>
          <h2 style="font-weight: 900; font-size: 24px">
            军工交付-项目Web前端
          </h2>
        </template>
      </MyHeader>
    </div>
    <div class="contentArea">
      <div class="mainArea">
        <el-breadcrumb separator="/" style="padding: 10px 40px; padding-top: 20px">
          <slot v-for="d in breadcrumb">
            <el-breadcrumb-item v-if="!!d.path" :to="{ path: d.path }">{{
              d.name || d
            }}</el-breadcrumb-item>
            <el-breadcrumb-item v-else>{{ d.name || d }}</el-breadcrumb-item>
          </slot>
        </el-breadcrumb>
        <div class="contentItem">
          <transition>
            <router-view></router-view>
          </transition>
        </div>
      </div>
      <div class="leftMenuArea">
        <div class="menuItem">
          <MenuItem ref="myMenuItem" :menuInfo="menuInfo" />
        </div>
      </div>
    </div>
    <div class="footerArea">
      <MyFooter />
    </div>
  </div>
</template>

<script>
  import MyHeader from "@/common/header";
  import MyFooter from "@/common/footer";
  import MenuItem from "@/common/menuItem";
  // import LoginItem from "@/common/loginItem";
  // import DialogItem from "@/common/dialogItem";
  export default {
    components: {
      MyHeader,
      MyFooter,
      MenuItem,
      // LoginItem,
      // DialogItem,
    },
    name: "",
    data() {
      return {
        isLogined: false,
        breadcrumb: [{
            path: "/about",
            name: "关于",
          },
          {
            name: "公共组件列表",
          },
          {
            name: "dataTable",
          },
        ],
        menuInfo: {
          defaultActive: "/about",
          mode: "vertical",
          data: MenuConfig.admin,
        },
      };
    },
    mounted() {
      var path = this.$route.path;
      console.log(path);
      this.updatePageIndicator(path);
    },
    created() {},
    watch: {
      $route(to, from) {
        this.updatePageIndicator(to.path);
      },
    },
    methods: {
      updatePageIndicator(path) {
        var bMap = {
          "/about": ["基础代码介绍"],
          "/about/gallery": ["公共组件预览"],
          "/about/dataTable": ["公共组件列表", "数据表格dataTable"],
          "/about/relationship": ["公共组件列表", "关系图谱relationship"],
          "/about/scatterChart": ["公共组件列表", "地图散点图一scatterChart"],
          "/about/mapBox": ["公共组件列表", "地图散点图二mapBox"],
          "/about/formInfo": ["公共组件列表", "表单信息formInfo"],
          "/about/barChart": ["公共组件列表", "柱形图barChart"],
          "/about/lineChart": ["公共组件列表", "折线图lineChart"],
          "/about/pieChart": ["公共组件列表", "饼图pieChart"],
          "/about/radarChart": ["公共组件列表", "雷达图radarChart"],
          "/about/menuItem": ["公共组件列表", "菜单项menuItem"],
          "/about/treeChart": ["公共组件列表", "treeChart"],
          "/about/funnelChart": ["公共组件列表", "漏斗图funnelChart"],
          "/about/gaugeChart": ["公共组件列表", "仪表图gaugeChart"],
          "/about/flowChart": ["公共组件列表", "流程图flowChart"],
          "/about/arcChart": ["公共组件列表", "弧形图arcChart"],
          "/about/wordCloud": ["公共组件列表", "词云图wordCloud"],
          "/about/sanKey": ["公共组件列表", "桑基图sanKey"],
          "/about/olGisMap": ["公共组件列表", "gis地图olGisMap"],
          "/about/tree": ["公共组件列表", "树结构tree"],
          "/about/timeLine": ["公共组件列表", "时间线timeLine"],
          "/about/boxPlot": ["公共组件列表", "盒须图boxPlot"],
          "/about/parallel": ["公共组件列表", "平行坐标系parallel"],
        }
        this.breadcrumb.length = 1;
        this.breadcrumb = this.breadcrumb.concat(bMap[path] || []);
        console.log(this.menuInfo.defaultActive)
        this.$refs.myMenuItem.defaultActive = path;
      },
      dealLoginEvent(param) {
        this.$refs.testDialog.show();
        console.log(param);
      },
    },
  };

</script>

<style scoped>
  * {
    box-sizing: border-box;
  }

  .mainPage {
    position: relative;
    height: 100%;
    background-color: #f7f7f7;
  }

  .headerArea {
    position: relative;
    float: left;
    width: 100%;
    height: 80px;
    line-height: 80px;
  }

  .contentArea {
    position: relative;
    float: left;
    width: 100%;
    /* height: auto; */
    height: calc(100% - 110px);
    margin: auto;
    background-color: #fff;
  }

  .mainArea {
    width: 100%;
    position: relative;
    height: 100%;
    padding-left: 220px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .leftMenuArea {
    width: 220px;
    height: 100%;
    left: 0px;
    top: 0px;
    overflow-y: auto;
    overflow-x: hidden;
    position: absolute;
  }

  .contentItem,
  .menuItem {
    position: relative;
    width: 100%;
    height: calc(100% - 80px) !important;
    /* overflow: auto; */
  }

  /deep/ .exampleItem {
    background-color: #fdfdfd;
    padding: 10px;
  }

  .footerArea {
    position: relative;
    float: left;
    width: 100%;
    height: 30px;
    line-height: 30px;
    background-color: #666;
    color: #fff;
  }

  /deep/ .menuItem,
  /deep/ .menuItem,
  /deep/ .el-menu {
    height: 100%;
  }

  /deep/ ::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 10px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }

  /deep/ ::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    background-color: skyblue;
    background-image: -webkit-linear-gradient(45deg,
        rgba(255, 255, 255, 0.2) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.2) 50%,
        rgba(255, 255, 255, 0.2) 75%,
        transparent 75%,
        transparent);
  }

  /deep/ ::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #ededed;
    border-radius: 10px;
  }

</style>
