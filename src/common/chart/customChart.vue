<template>
  <div class="chartArea" ref="chartItem"></div>
</template>

<script>
// 引入基本模板
var echarts = require("echarts/lib/echarts");
// 引入自定义图表组件
require("echarts/lib/chart/custom");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");

export default {
  name: "",
  data() {
    return {
      itemStyle: {
        type: "custom",
      },
      titleStyle: {
        text: "",
      },
      tooltip: {},
      dataInfo: {},
      option: {},
      seriesData: [],
      maxDepth: 0
    };
  },
  props: {
    dataObj: Object,
  },
  mounted() {
    // this.$nextTick(function () {
    //   let tData = this.dataInfo || this.dataObj;
    //   this.updateData(tData);
    // });
  },
  methods: {
    convert(source, basePath, depth) {
      if (source == null) {
        return;
      }
      if (this.maxDepth > 5) {
        return;
      }
      this.maxDepth = Math.max(depth, this.maxDepth);

      this.seriesData.push({
        id: basePath,
        value: source.$count,
        depth: depth,
        index: this.seriesData.length
      });
      for (var key in source) {
        if (source.hasOwnProperty(key) && !key.match(/^\$/)) {
          var path = basePath + '.' + key;
          this.convert(source[key], path, depth + 1);
        }
      }

    },
    updateData(data) {
      console.log(data)
      console.log('正确执行')
      this.convert(data, 'option', 0);
      //生成全新的chart option
      this.updateOption();
      //按新的option更新图表
      this.initChart();
    }
    ,
    updateOption() {
      let that = this
      var displayRoot = stratify();

      function stratify() {
        return d3.stratify()
          .parentId(function (d) {
            return d.id.substring(0, d.id.lastIndexOf('.'));
          })(
            that.seriesData
          )
          .sum(function (d) {
            return d.value || 0;
          })
          .sort(function (a, b) {
            return b.value - a.value;
          });
      }

      function overallLayout(params, api) {
        var context = params.context;
        d3.pack()
          .size([api.getWidth() - 2, api.getHeight() - 2])
          .padding(3)(displayRoot);

        context.nodes = {};
        displayRoot.descendants().forEach(function (node, index) {
          context.nodes[node.id] = node;
        });
      }

      function renderItem(params, api) {
        var context = params.context;

        // Only do that layout once in each time `setOption` called.
        if (!context.layout) {
          context.layout = true;
          overallLayout(params, api);
        }

        var nodePath = api.value('id');
        var node = context.nodes[nodePath];

        if (!node) {
          // Reder nothing.
          return;
        }

        var isLeaf = !node.children || !node.children.length;

        var focus = new Uint32Array(node.descendants().map(function (node) {
          return node.data.index;
        }));

        var nodeName = isLeaf
          ? nodePath.slice(nodePath.lastIndexOf('.') + 1).split(/(?=[A-Z][^A-Z])/g).join('\n')
          : '';

        var z2 = api.value('depth') * 2;

        return {
          type: 'circle',
          focus: focus,
          shape: {
            cx: node.x,
            cy: node.y,
            r: node.r
          },
          transition: ['shape'],
          z2: z2,
          textContent: {
            type: 'text',
            style: {
              // transition: isLeaf ? 'fontSize' : null,
              text: nodeName,
              fontFamily: 'Arial',
              width: node.r * 1.3,
              overflow: 'truncate',
              fontSize: node.r / 3
            },
            emphasis: {
              style: {
                overflow: null,
                fontSize: Math.max(node.r / 3, 12)
              }
            }
          },
          textConfig: {
            position: 'inside'
          },
          style: {
            fill: api.visual('color')
          },
          emphasis: {
            style: {
              fontFamily: 'Arial',
              fontSize: 12,
              shadowBlur: 20,
              shadowOffsetX: 3,
              shadowOffsetY: 5,
              shadowColor: 'rgba(0,0,0,0.3)'
            }
          }
        };
      }

      let option = {
        dataset: {
          source: this.seriesData
        },
        tooltip: {},
        visualMap: {
          show: false,
          min: 0,
          max: this.maxDepth,
          dimension: 'depth',
          inRange: {
            color: ['#006edd', '#e0ffff']
          }
        },
        hoverLayerThreshold: Infinity,
        series: {
          type: 'custom',
          renderItem: renderItem,
          progressive: 0,
          coordinateSystem: 'none',
          encode: {
            tooltip: 'value',
            itemName: 'id'
          }
        }
      };
      this.option = option
    }
    ,
    updateView(elem, option) {
      if (this.chart) {
        echarts.dispose(this.chart);
      }
      this.chart = echarts.init(elem);
      // 绘制图表
      this.chart.setOption(option);
      this.initChartEvent();
    }
    ,
    initChart() {
      var elem = this.$refs.chartItem;
      this.updateView(elem, this.option);
    }
    ,
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
    }
    ,
  },
}
;
</script>

<style scoped>
.chartArea {
  height: 100%;
  min-height: 200px;
}
</style>
