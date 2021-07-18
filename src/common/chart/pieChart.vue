<template>
  <div class="chartArea" ref="chartItem"></div>
</template>

<script>
// 引入基本模板
var echarts = require("echarts/lib/echarts");

export default {
  name: "",
  data() {
    return {
      //serises数据图例的默认配置
      itemStyle: {
        type: "pie",
      },
      //标题的默认配置样式
      titleStyle: {
        text: "",
      },
      //默认文字提示样式
      tooltip: {},
      //接收外部传入参数dataObj
      dataInfo: {
        itemStyle: {
          type: "pie",
        },
        title: "",
        //可视化数据内容
        data: [
          {
            name: "周二",
            value: 200,
          },
        ],
      },
      option: {
        // color:['#1890ff','#facc14','#2fc25b','#13c2c2','#f04864','#8543e0'],
        title: { text: "在Vue中使用echarts" },
        tooltip: {},
        series: [],
      },
    };
  },
  props: {
    dataObj: Object,
  },
  mounted() {
    //组件加载到页面后，更新图表
    this.$nextTick(function () {
      var tData = this.dataObj || this.dataInfo;
      this.updateData(tData);
    });
  },
  methods: {
    //更新组件数据，并重绘图表
    updateData(data) {
      //恢复默认
      this.dataInfo = {
        //初始化数据图例样式(series数组元素)
        itemStyle: { ...this.itemStyle },
        //初始化标题样式
        titleStyle: { ...this.titleStyle },
        //初始化文字提示样式
        tooltip: { ...this.tooltip },
        data: [],
      };
      var arr = ["itemStyle", "titleStyle", "tooltip"];
      //按参数更新dataObj
      for (var k in data) {
        if (arr.indexOf(k) !== -1) {
          for (var j in data[k]) {
            this.dataInfo[k][j] = data[k][j];
          }
        } else {
          this.dataInfo[k] = data[k];
        }
      }
      this.dataInfo.itemStyle.type = "pie"; //item的type固定，不可外部修改
      //生成全新的chart option
      this.updateOption();
      //按新的option更新图表
      this.initChart();
    },
    //根据配置参数和数据内容，生成相应echarts的option;
    updateOption() {
      var data = this.dataInfo;
      this.option.title = data.titleStyle;
      this.option.title.text = data.title;
      var item = { ...data.itemStyle };
      item.data = data.data;
      this.option.series = [item];
      this.option.tooltip = data.tooltip;
      this.option.color = data.color;
    },
    //按option更新图表和相应的事件
    updateView(elem, option) {
      if (this.chart) {
        echarts.dispose(this.chart);
      }
      this.chart = echarts.init(elem);
      // 绘制图表
      this.chart.setOption(option);
      this.initChartEvent();
    },
    //初始化图表
    initChart() {
      var elem = this.$refs.chartItem;
      this.updateView(elem, this.option);
    },
    //初始化图表事件，让该vue组件支持click和mouseover事件
    initChartEvent() {
      var _self = this;
      this.chart.off("click");
      this.chart.on("click", function (e) {
        if (e.componentType === "series") {
          _self.$emit("click", {
            name: e.name,
            value: e.data,
            seriesName: e.seriesName,
          });
        }
      });

      this.chart.off("mouseover");
      this.chart.on("mouseover", function (e) {
        if (e.componentType === "series") {
          _self.$emit("mouseover", {
            name: e.name,
            value: e.data,
            seriesName: e.seriesName,
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.chartArea {
  height: 100%;
  min-height: 200px;
}
</style>
