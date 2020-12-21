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
        <el-breadcrumb
          separator="/"
          style="padding: 10px 40px; padding-top: 20px"
        >
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
      breadcrumb: [
        {
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
        data: [
          {
            icon: "",
            path: "/about",
            label: "基础代码介绍",
          },
          {
            icon: "",
            path: "/about/gallery",
            label: "公共组件预览",
          },
          {
            icon: "",
            label: "公共组件列表",
            children: [
              {
                icon: "",
                label: "数据表格dataTable",
                path: "/about/dataTable",
              },
              {
                icon: "",
                label: "关系图谱relationship",
                path: "/about/relationship",
              },
              {
                icon: "",
                label: "地图散点图scatterChart",
                path: "/about/scatterChart",
              },
              {
                icon: "",
                label: "表单信息formInfo",
                path: "/about/formInfo",
              },
              {
                icon: "",
                label: "柱形图barChart",
                path: "/about/barChart",
              },
              {
                icon: "",
                label: "折线图lineChart",
                path: "/about/lineChart",
              },
              {
                icon: "",
                label: "饼图pieChart",
                path: "/about/pieChart",
              },
              {
                icon: "",
                label: "树形图treeChart",
                path: "/about/treeChart",
              },
              {
                icon: "",
                label: "雷达图radarChart",
                path: "/about/radarChart",
              },
              {
                icon: "",
                label: "仪表图gaugeChart",
                path: "/about/gaugeChart",
              },
              {
                icon: "",
                label: "菜单项menuItem",
                path: "/about/menuItem",
              },
              {
                icon: "",
                label: "漏斗图funnelChart",
                path: "/about/funnelChart",
              },
              {
                icon: "",
                label: "词云图wordCloud",
                path: "/about/wordCloud",
              },
            ],
          },
        ],
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
        "/about/scatterChart": ["公共组件列表", "地图散点图scatterChart"],
        "/about/formInfo": ["公共组件列表", "表单信息formInfo"],
        "/about/barChart": ["公共组件列表", "柱形图barChart"],
        "/about/lineChart": ["公共组件列表", "折线图lineChart"],
        "/about/pieChart": ["公共组件列表", "饼图pieChart"],
        "/about/radarChart": ["公共组件列表", "雷达图radarChart"],
        "/about/menuItem": ["公共组件列表", "菜单项menuItem"],
        "/about/treeChart": ["公共组件列表", "treeChart"],
        "/about/funnelChart": ["公共组件列表", "漏斗图funnelChart"],
        "/about/gaugeChart": ["公共组件列表", "仪表图gaugeChart"],
        "/about/wordCloud": ["公共组件列表", "词云图wordCloud"],
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
  height: auto;
  min-height: calc(100% - 180px);
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
  height: 100% !important;
  overflow: auto;
}

/deep/ .exampleItem {
  background-color: #fdfdfd;
  padding: 10px;
}

.footerArea {
  position: relative;
  float: left;
  width: 100%;
  height: 80px;
  line-height: 80px;
}
</style>
