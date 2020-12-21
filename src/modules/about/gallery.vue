<template>
  <div style="padding: 20px 40px">
    <el-card v-for="(d, i) in cardList" :key="i + ''" class="box-card">
      <div slot="header" class="clearfix">
        <el-link
          :href="d.path"
          :underline="false"
          style="font-size: 16px"
          type="text"
          >{{ d.title }}</el-link
        >
        <el-link :href="d.path" style="float: right; padding: 3px 0" type="text"
          >详情</el-link
        >
      </div>
      <div class="text item" style="height: 300px;">
        <el-image
          v-if="!d.component"
          :src="d.image"
          style="width: 100%; height: auto"
        ></el-image>
        <component v-else v-bind:is="d.component"></component>
      </div>
    </el-card>
  </div>
</template>

<script>

export default {
  components: {
    DialogItem: ()=> import("@/common/dialogItem"),
    DataTable: ()=> import("@/common/dataTable"),
    relationship: ()=> import("@/common/relationship"),
    formInfo: ()=> import("@/common/formInfo"),
    menuItem: ()=> import("@/common/menuItem"),
    barChart: ()=> import("@/common/chart/barChart"),
    lineChart: ()=> import("@/common/chart/lineChart"),
    pieChart: ()=> import("@/common/chart/pieChart"),
    scatterChart: ()=> import("@/common/chart/scatterChart"),
    radarChart: ()=> import("@/common/chart/radarChart"),
    treeChart: ()=> import("@/common/chart/treeChart"),
    gaugeChart: ()=> import("@/common/chart/gaugeChart")
  },
  mounted() {},
  data() {
    return {
      cardList: [
        {
          title: "数据表格dataTable",
          path: "/#/about/dataTable",
          component: "DataTable"
        },
        {
          title: "关系图谱relationship",
          path: "/#/about/relationship",
          component: "relationship"
        },
        {
          title: "表单信息formInfo",
          path: "/#/about/formInfo",
          component: "formInfo"
        },
        {
          title: "菜单项menuItem",
          path: "/#/about/menuItem",
          component: "menuItem"
        },
        {
          title: "barChart",
          path: "/#/about/barChart",
          component: "barChart"
        },
        {
          title: "lineChart",
          path: "/#/about/lineChart",
          component: "lineChart"
        }
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

.box-card {
  width: 450px;
  float: left;
  margin-right: 20px;
  margin-bottom: 20px;
}

.box-card + .box-card {
}
</style>
