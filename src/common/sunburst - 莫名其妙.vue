<template>
  <div>
    <div class="chartArea" ref="chartItem"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: "",
  props:{
    dataObj: Object,
  },
  data () {
    return {
      dataInfo: {
        itemStyle: {
          type: "sunburst",
        },
        title: "",
        data: [],
      },
      option:{
        color:['#1890ff','#facc14','#2fc25b','#13c2c2','#f04864','#8543e0'],
        title: { text: "在Vue中使用echarts" },
        tooltip: {},
        series: {
          type: 'sunburst',
          data: []
        }
      }
    }
  },
  mounted () {
    this.$nextTick(function () {
      var tData = this.dataObj || this.dataInfo;
      this.updateData(tData);
    });
  },
  methods: {
    // updateData (data) {
    //   if (this.myChart) {
    //     this.myChart.dispose()
    //   }
    //   this.myChart = echarts.init(document.getElementById('main'));
    //   this.myChart.setOption({
    //     series: {
    //       type: 'sunburst',
    //       data: this.dataObj
    //     }
    //   });
    // },


    updateData(data) {
      // //恢复默认
      // this.dataInfo = {
      //   itemStyle: { ...this.itemStyle },
      //   titleStyle: { ...this.titleStyle },
      //   tooltip: { ...this.tooltip },
      //   data: [],
      // };
      // var arr = [
      //   "itemStyle",
      //   "titleStyle",
      //   "tooltip",
      // ];
      //按参数更新dataObj
      // for (var k in data) {
      //   if (arr.indexOf(k) !== -1) {
      //     for (var j in data[k]) {
      //       this.dataInfo[k][j] = data[k][j];
      //     }
      //   } else {
      //     this.dataInfo[k] = data[k];
      //   }
      // }
      this.dataInfo.itemStyle.type = "sunburst"; //item的type固定，不可外部修改
      //生成全新的chart option
      this.updateOption(data);
      //按新的option更新图表
      this.initChart();
    },
    updateOption(obj) {
      console.log(obj,21212)
      this.option.series.data = obj.data;
      console.log(this.option,21212)
    },
    updateView(elem, option) {
      if (this.chart) {
        echarts.dispose(this.chart);
      }
      this.chart = echarts.init(elem);
      // 绘制图表
      this.chart.setOption(option);
      // this.initChartEvent();
    },
    initChart() {
      var elem = this.$refs.chartItem;
      this.updateView(elem, this.option);
    },
    // initChartEvent() {
    //   var _self = this;
    //   this.chart.off("click");
    //   this.chart.on("click", function (e) {
    //     if (e.componentType === "series") {
    //       _self.$emit("click", {
    //         name: e.name,
    //         value: e.data,
    //         seriesName: e.seriesName
    //       });
    //     }
    //   });

    //   this.chart.off("mouseover");
    //   this.chart.on("mouseover", function (e) {
    //    if (e.componentType === "series") {
    //       _self.$emit("mouseover", {
    //         name: e.name,
    //         value: e.data,
    //         seriesName: e.seriesName
    //       });
    //     }
    //   });
    // },
  },
};
</script>

<style scoped>
::v-deep .el-pagination {
  padding-left: 0px;
}

#main {
  margin-left: 200px;
}
</style>
