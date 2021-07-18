<template>
  <div>
    <ScatterPlot
      style="height: 450px"
      :dataObj="dataObj"
      ref="exampleTestItem"
    ></ScatterPlot>
  </div>
</template>
<script>
import ScatterPlot from "@/common/scatterPlot";
export default {
  components: {
    ScatterPlot,
  },
  mounted() {},
  data() {
    return {
      dataObj: {
        //echarts 的标题
        title: {
          text: "基础散点图",
          textStyle: {
            //color:'pink'
          },
        },
        data: [
          {
            name: "学习",
            value: [4.0, 8.04],
          },
          {
            name: "玩耍",
            value: [6.07, 6.95],
          },
          {
            name: "喜喜",
            value: [8.0, 7.58],
          },
          {
            name: "哈哈",
            value: [10.05, 8.81],
          },
        ],
        itemStyle: {
          type: "scatter",
          symbolSize: 50,
          label: {
            show: "true",
            formatter: "{b}",
          },
        },
        xAxisStyle: {
          axisTick: {
            show: true, //坐标轴刻度
          },
          splitLine: {
            //网格线
            show: false,
          },
          axisLabel: {
            formatter: "{value}",
            textStyle: {
              //改变刻度字体样式
              color: "#000",
            },
          },
        },
        yAxisStyle: {
          axisTick: {
            show: true, //坐标轴刻度
          },
          splitLine: {
            //网格线
            show: false,
          },
          axisLabel: {
            formatter: "{value}",
            textStyle: {
              //改变刻度字体样式
              color: "#000",
            },
          },
        },
      },
    };
  },
  methods: {
    updateData(data) {
      this.dataObj = data;

      this.$refs.exampleTestItem.updateData(this.dataObj);
    },
  },
};
</script>
<style scoped>
* {
  box-sizing: border-box;
}
</style>
