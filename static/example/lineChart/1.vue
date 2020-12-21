<template>
  <div>
    <LineChart
      style="height: 450px"
      :dataObj="dataObj"
      ref="exampleTestItem"
    ></LineChart>
  </div>
</template>
<script>
// import LineChart from "@/common/chart/lineChart";
export default {
  components: {
    LineChart: ()=> import("@/common/chart/lineChart"),
  },
  mounted() {},
  data() {
    return {
      dataObj: {
        title: "某周手榴弹战损趋势",
        name: "手榴弹的战损量",
        color:['#1890ff','#2fc25b','#facc14','#223273','#8543e0','#13c2c2'],
        data: [
          {
            name: "周一",
            value: 3000,
          },
          {
            name: "周二",
            value: 2500,
          },
          {
            name: "周三",
            value: 1000,
          },
          {
            name: "周四",
            value: 8000,
          },
          {
            name: "周五",
            value: 28000,
          },
          {
            name: "周六",
            value: 12000,
          },
          {
            name: "周日",
            value: 12000,
          },
        ],
        mode: "vertical",
      },     
    };
  },
  methods: {
    updateData(data) {
      this.dataObj = data;
      this.$nextTick(function(){
        this.$refs.exampleTestItem.updateData(this.dataObj);
      });
      
    },
  },
};
</script>
<style scoped>
* {
  box-sizing: border-box;
}
</style>
