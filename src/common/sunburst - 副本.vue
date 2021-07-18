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
  props:{
			dataObj: Object,
		},
  data () {
    return {
      itemStyle: {
        type: "pie",
      },
      titleStyle: {
        text: "",
      },
      tooltip: {},
      dataInfo: {
        itemStyle: {
          type: "pie",
        },
        title: "",
        data: [
          {
            name: 'A',
            value: 10,
            itemStyle: {
              color: '#255'
            },
            // 父级的value是children里value的总和
            children: [{
              value: 3,
              name: 'Ab',
              itemStyle: {
                color: '#965'
              },
            }, {
              value: 5,
              name: 'Aa',
              itemStyle: {
                color: '#755'
              }
            }, {
              value: 2,
              name: 'Ac',
              itemStyle: {
                color: '#235'
              }
            }]
          }, {
            name: 'B',
            itemStyle: {
              color: 'blue'
            },
            children: [{
              name: 'Ba',
              value: 4
            }, {
              name: 'Bb',
              value: 2
            }]
          }, {
            name: 'C',
            value: 8,
            itemStyle: {
              color: 'violet'
            },
            children: [{
              name: 'Ca',
              value: 4,
              itemStyle: {
                color: '#568'
              },
            }, {
              name: 'Cb',
              value: 2,
              itemStyle: {
                color: '#755'
              },
            }, {
              name: 'Cf',
              value: 2,
              itemStyle: {
                color: '#154'
              },
            }]
          }
        ],
      },
      option: {
        // color:['#1890ff','#facc14','#2fc25b','#13c2c2','#f04864','#8543e0'],
        title: { text: "在Vue中使用echarts" },
        tooltip: {},
        series: [],
      },
    }
  },
  mounted () {
			this.$nextTick(function() {
				var tData = this.dataObj || this.dataInfo;
				this.updateData(tData);
			});
		},
  beforeDestroy() {
    if (!this.myChart) {
      return
    }
    this.myChart.dispose()
    this.myChart = null
}, //生命周期 - 销毁之前
  methods: {
 updateData (data) {
   this.myChart = echarts.init(document.getElementById('main'));
   this.setChartsInfo()
 },
 setChartsInfo () {
   this.myChart.setOption({
     series: {
       type: 'sunburst',
       data: this.dataObj
     }
   });
 },



    // updateData(data) {
    //   //恢复默认
    //   this.dataInfo = {
    //     itemStyle: { ...this.itemStyle },
    //     titleStyle: { ...this.titleStyle },
    //     tooltip: { ...this.tooltip },
    //     data: [],
    //   };
    //   var arr = [
    //     "itemStyle",
    //     "titleStyle",
    //     "tooltip",
    //   ];
    //   //按参数更新dataObj
    //   for (var k in data) {
    //     if (arr.indexOf(k) !== -1) {
    //       for (var j in data[k]) {
    //         this.dataInfo[k][j] = data[k][j];
    //       }
    //     } else {
    //       this.dataInfo[k] = data[k];
    //     }
    //   }
    //   this.dataInfo.itemStyle.type = "sunburst"; //item的type固定，不可外部修改
    //   //生成全新的chart option
    //   this.updateOption();
    //   //按新的option更新图表
    //   this.initChart();
    // },
    // updateOption() {
    //   var data = this.dataInfo;
    //   this.option.title = data.titleStyle;
    //   this.option.title.text = data.title;
    //   var item = { ...data.itemStyle };
    //   //更新Axis和series元素里的data
    //   item.data = data.data;
    //   this.option.series = [item];

    //   // for (var i = 0; i < item.data.length; i++) {
    //   //   var item = item.data[i];
    //   //   if (typeof item.value === "number") {
    //   //     item.value = [item.value];
    //   //   }
    //   //   for (var j = 0; j < this.option.series.length; j++) {
    //   //     this.option.series[j].data.push(item.value[j] || 0);
    //   //     this.option.series[j].stack=item.stack;
    //   //   }

    //   //  console.log(this.option.series,97)

    //   // this.option.tooltip = data.tooltip;
    //   // this.option.color = data.color;
    //   // }
    // },
    // updateView(elem, option) {
    //   if (this.chart) {
    //     echarts.dispose(this.chart);
    //   }
    //   this.chart = echarts.init(elem);
    //   // 绘制图表
    //   this.chart.setOption(option);
    //   this.initChartEvent();
    // },
    // initChart() {
    //   var elem = this.$refs.chartItem;
    //   this.updateView(elem, this.option);
    // },
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
