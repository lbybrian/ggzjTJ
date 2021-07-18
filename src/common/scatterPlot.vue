<template>
  <div class="chartArea" ref="chartItem"></div>
</template>

<script>
var echarts = require("echarts/lib/echarts");
export default {
  props: {
    dataObj: Object,
  },
  data() {
    return {
       itemStyle: {
          type: "scatter",
        },
       xAxisStyle: {
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: true,
          color: "#959595",
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "#cecece",
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "#EBEEF5",
            type: "dashed",
          },
        },
      },
      //y轴的默认样式，属性参数参考echart
      yAxisStyle: {
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: true,
          color: "#959595",
        },
        axisLine: {
          show: false,
        },
      },
      dataInfo: {
        title: {
          text: "基础散点图",
          textStyle: {},
        },
        itemStyle: {
          type: "scatter",
        },
        data: [
          {
            name: "学习",
            value: [10.0, 8.04],
          },
          {
            name: "玩耍",
            value: [8.07, 6.95],
          },
          {
            name: "喜喜",
            value: [13.0, 7.58],
          },
          {
            name: "哈哈",
            value: [9.05, 8.81],
          },
        ],
        type: "scatter",
      },
      option: {
        title: {
          text: "在Vue中使用echarts",
          textStyle: {},
        },
        tooltip: {},
        xAxis: {},
        yAxis: {},
        series: [],
      },
    };
  },
  methods: {
    //更新
    updateData(data) {
      //恢复默认
      this.dataInfo = {
          //初始化x轴样式
        xAxisStyle: {...this.xAxisStyle},
        //初始化y轴样式
        yAxisStyle: {...this.yAxisStyle},
        //初始化数据图例样式(series数组元素)
        itemStyle: { ...this.itemStyle },
        //初始化标题样式
        titleStyle: { ...this.titleStyle },
        //初始化文字提示样式
        tooltip: { ...this.tooltip },
        data: [],
      };
      for (var k in data) {
        this.dataInfo[k] = data[k];
      }
      this.dataInfo.itemStyle.type = "scatter"; //item的type固定，不可外部修改
      //生成全新的chart option
      this.updateOption();
      //按新的option更新图表
      this.initChart();
    },
    //生成实际echart所需要option
    updateOption() {
      var data = this.dataInfo;
      //dataInfo的配置更新title区域
      this.option.title = data.title;
      this.option.xAxis = data.xAxisStyle;
      this.option.yAxis = data.yAxisStyle;
      this.option.tooltip = data.tooltip;
      //更series元素里的data
      var item = { ...data.itemStyle };
      item.data = data.data;
      this.option.series = [item];
      console.log(this.option.series, 88888888);
    },
    //初始化图表
    initChart() {
      var elem = this.$refs.chartItem;
      this.updateView(elem, this.option);
    },
    //按option更新图表
    updateView(elem, option) {
      if (this.chart) {
        echarts.dispose(this.chart);
      }
      this.chart = echarts.init(elem);
      // 绘制图表
      this.chart.setOption(option);
      // 强制视图更新事件
      this.$forceUpdate();
      //初始化组件所支持的事件
      // this.initChartEvent();
    },
  },
  mounted() {
    //组件加载到页面后，更新图表
    var data = this.dataInfo;
    this.$nextTick(function () {
      var tData = this.dataObj || this.dataInfo;
      this.updateData(tData);
    });
  },
};
</script>

<style>
.chartArea {
  height: 100%;
  min-height: 200px;
}
</style>