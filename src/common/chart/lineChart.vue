<template>
  <div class="chartArea" ref="chartItem"></div>
</template>

<script>
// 引入echart插件
var echarts = require("echarts");

export default {
  name: "",
  data() {
    return {
      //线条的默认样式
      itemStyle: {
        type: "line",
      },
      //标题的默认样式
      titleStyle: {
        text: "",
      },
      //tooltip的默认样式
      tooltip: {},
      //x轴的默认样式，属性参数参考echart
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
        splitLine: {
          show: true,
          lineStyle: {
            color: "#EBEEF5",
            type: "dashed",
          },
        },
      },

      dataInfo: {
        itemStyle: {
          type: "",
        },
        //数据图表的标题
        title: "",
        //数据图例名称
        name: ["销量", "库存"],
        //数据图表的数据内容
        data: [
          {
            name: "周一",
            value: [5, 12],
          },
          {
            name: "周二",
            value: [15, 22],
          },
          {
            name: "周三",
            value: [52, 32],
          },
          {
            name: "周四",
            value: [25, 22],
          },
          {
            name: "周五",
            value: [35, 23],
          },
          {
            name: "周六",
            value: [15, 32],
          },
          {
            name: "周日",
            value: [15, 32],
          },
        ],
      },
      option: {
        title: {
          text: "",
        },
        tooltip: {},
        xAxis: {
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        },
        yAxis: {},
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
      //初始化为默认数据
      this.dataInfo = {
        //初始化x轴样式
        xAxisStyle: {
          ...this.xAxisStyle,
        },
        //初始化y轴样式
        yAxisStyle: {
          ...this.yAxisStyle,
        },
        //初始化折线样式
        itemStyle: {
          ...this.itemStyle,
        },
        //初始化标题样式
        titleStyle: {
          ...this.titleStyle,
        },
        //初始化鼠标悬浮提示信息样式
        tooltip: {
          ...this.tooltip,
        },
        data: [],
      };
      var arr = [
        "xAxisStyle",
        "yAxisStyle",
        "itemStyle",
        "titleStyle",
        "tooltip",
      ];
      //按参数更新dataObj
      for (var k in data) {
        //对于数组中存在的对象属性，在默认参数值基础上进行更新对象属性
        if (arr.indexOf(k) !== -1) {
          for (var j in data[k]) {
            this.dataInfo[k][j] = data[k][j];
          }
        } else {
          this.dataInfo[k] = data[k];
        }
      }

      //item的type固定，不可外部修改
      this.dataInfo.itemStyle.type = "line";
      //生成实际echart所需要option
      this.updateOption();
      //按实际option更新图表
      this.initChart();
    },
    //生成实际echart所需要option
    updateOption() {
      var data = this.dataInfo;
      //dataInfo的配置更新title区域
      if (data.title && typeof data.title === "string") {
        this.option.title = data.titleStyle;
        this.option.title.text = data.title;
      } else if (data.title && data.title.constructor.name === "Object") {
        this.option.title = data.title;
      } else {
      }

      this.option.series = [];
      var name = data.name || "-";
      if (typeof name === "string") {
        name = [name];
      }
      //根据name 数组和itemStyle初始化series;
      for (var i = 0; i < name.length; i++) {
        var item = {
          ...data.itemStyle,
        };
        item.data = [];
        item.name = name[i];
        this.option.series.push(item);
      }

      //更新echart图表的图例数据
      if (name.length > 1) {
        this.option.legend = data.legendStyle || {
          show: true,
        };
        this.option.legend.data = name;
      }

      //初始化xAxis、yAxis和 tooltip;
      this.option.xAxis = data.xAxisStyle;
      this.option.yAxis = data.yAxisStyle;
      this.option.tooltip = data.tooltip;
      this.option.color = data.color;
      //horizontal or vertical, 默认为"vertical"
      var mode = data.mode || "vertical";
      var axisData;

      if (mode === "vertical") {
        //当mode为vertical时，x轴为echart中的"category"类型
        this.option.xAxis.data = [];
        this.option.xAxis.type = "category";
        axisData = this.option.xAxis;
      } else {
        //当mode不为vertical时，y轴为echart中的"category"类型
        this.option.yAxis.type = "category";
        this.option.yAxis.data = [];
        axisData = this.option.yAxis;
      }

      //更新axis和series元素里的data
      data.data = data.data || [];
      for (var i = 0; i < data.data.length; i++) {
        var item = data.data[i];
        axisData.data.push(item.name);
        if (typeof item.value === "number") {
          item.value = [item.value];
        }
        //更新echart的series中的数据
        for (var j = 0; j < this.option.series.length; j++) {
          this.option.series[j].data.push(item.value[j] || 0);
        }
      }
    },
    //按option更新图表
    updateView(elem, option) {
      if (this.chart) {
        echarts.dispose(this.chart);
      }
      this.chart = echarts.init(elem);
      // 绘制图表
      this.chart.setOption(option);

      //初始化组件所支持的事件
      this.initChartEvent();
    },
    //初始化图表
    initChart() {
      var elem = this.$refs.chartItem;
      this.updateView(elem, this.option);
    },
    //初始化组件所支持的用户事件
    initChartEvent() {
      var _self = this;
      this.chart.off("click");
      //绑定鼠标点击事件，并释放该组件的鼠标点击事件
      this.chart.on("click", function (e) {
        if (e.componentType === "series") {
          _self.$emit("click", {
            name: e.name,
            value: e.data,
            seriesName: e.seriesName,
          });
        }
      });
      //绑定鼠标悬浮事件，并释放该组件的鼠标悬浮事件
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
