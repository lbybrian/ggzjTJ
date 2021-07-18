<template>
  <div>
	  <div class="chartArea" ref="chartItem"></div>
  </div>
</template>

<script>
// 引入基本模板
var echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/sunburst");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");

export default {
  name: "",
  data() {
    return {
      itemStyle: {
        type: "sunburst",
      },
      titleStyle: {
        text: "",
      },
      tooltip: {},
      dataInfo: {
        itemStyle: {
          type: "sunburst",
        },
        title: "",
        data: [],
      },
      option: {
        bgColor : 'white',
        color:['#1890ff','#facc14','#2fc25b','#13c2c2','#f04864','#8543e0'],
        title: { text: "旭日图" },
        tooltip: {},
        series: [],
      },
    };
  },
  props: {
    dataObj: Object,
  },
  mounted() {
    this.$nextTick(function () {
      var tData = this.dataObj || this.dataInfo;
      this.updateData(tData);
    });
  },
  methods: {
    updateData(data) {
      //恢复默认
      this.dataInfo = {
        itemStyle: { ...this.itemStyle },
        titleStyle: { ...this.titleStyle },
        tooltip: { ...this.tooltip },
        data: [],
      };
      var arr = [
        "itemStyle",
        "titleStyle",
        "tooltip",
      ];
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

      this.dataInfo.itemStyle.type = "sunburst"; //item的type固定，不可外部修改
      console.log(this.dataInfo,this.dataObj)
      //生成全新的chart option
      this.updateOption();
      //按新的option更新图表
      this.initChart();
    },
    updateOption() {

          var data = this.dataInfo;
          console.log(data,8666)
          this.option.title = data.titleStyle;
          this.option.title.text = data.title;
          var item = { ...data.itemStyle };
          item.data = data.data;
          this.option.series = [item];
          this.option.tooltip = data.tooltip;
          this.option.color = data.color;
    },
    updateView(elem, option) {
      if (this.chart) {
        echarts.dispose(this.chart);
      }
      this.chart = echarts.init(elem);
      // 绘制图表
      this.chart.setOption(option);
      this.initChartEvent();
    },
    initChart() {
      var elem = this.$refs.chartItem;
      this.updateView(elem, this.option);
    },
    initChartEvent() {
      var _self = this;
      this.chart.off("click");
      this.chart.on("click", function (e) {
        if (e.componentType === "series") {
          _self.$emit("click", {
            name: e.name,
            value: e.data,
            seriesName: e.seriesName
          });
        }
      });

      this.chart.off("mouseover");
      this.chart.on("mouseover", function (e) {
       if (e.componentType === "series") {
          _self.$emit("mouseover", {
            name: e.name,
            value: e.data,
            seriesName: e.seriesName
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
  min-height: 400px;
}
</style>
