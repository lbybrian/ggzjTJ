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
    var data = this.dataInfo;
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
      //生成全新的chart option
      this.updateOption(data);
      //按新的option更新图表
      this.initChart();
    },
    updateOption(obj) {
      console.log(obj,1111111111121313131)

          // var data = this.dataInfo;
          // console.log(data,8666)
          // this.option.title = data.titleStyle;
          // this.option.title.text = data.title;
          // var item = { ...data.itemStyle };
          // item.data = data.data;
          // this.option.series = [item];
          // this.option.tooltip = data.tooltip;
          // this.option.color = data.color;
          // console.log(this.option,9333333)

          var colors = this.option.color;
          var bgColor = 'white';

          var data =[{
        name: '虚构',
        itemStyle: {
          color: colors[1]
        },
        children: [{
          name: '小说',
          children: [{
            name: '5☆',
            children: [{
              name: '疼'
            }, {
              name: '慈悲'
            }, {
              name: '楼下的房客'
            }]
          }, {
            name: '4☆',
            children: [{
              name: '虚无的十字架'
            }, {
              name: '无声告白'
            }, {
              name: '童年的终结'
            }]
          }, {
            name: '3☆',
            children: [{
              name: '疯癫老人日记'
            }]
          }]
        }, {
          name: '其他',
          children: [{
            name: '5☆',
            children: [{
              name: '纳博科夫短篇小说全集'
            }]
          }, {
            name: '4☆',
            children: [{
              name: '安魂曲'
            }, {
              name: '人生拼图版'
            }]
          }, {
            name: '3☆',
            children: [{
              name: '比起爱你，我更需要你'
            }]
          }]
        }]
      }, {
        name: '非虚构',
        itemStyle: {
          color: colors[2]
        },
        children: [{
          name: '设计',
          children: [{
            name: '5☆',
            children: [{
              name: '无界面交互'
            }]
          }, {
            name: '4☆',
            children: [{
              name: '数字绘图的光照与渲染技术'
            }, {
              name: '日本建筑解剖书'
            }]
          }, {
            name: '3☆',
            children: [{
              name: '奇幻世界艺术\n&RPG地图绘制讲座'
            }]
          }]
        }, {
          name: '社科',
          children: [{
            name: '5☆',
            children: [{
              name: '痛点'
            }]
          }, {
            name: '4☆',
            children: [{
              name: '卓有成效的管理者'
            }, {
              name: '进化'
            }, {
              name: '后物欲时代的来临',
            }]
          }, {
            name: '3☆',
            children: [{
              name: '疯癫与文明'
            }]
          }]
        }, {
          name: '心理',
          children: [{
            name: '5☆',
            children: [{
              name: '我们时代的神经症人格'
            }]
          }, {
            name: '4☆',
            children: [{
              name: '皮格马利翁效应'
            }, {
              name: '受伤的人'
            }]
          }, {
            name: '3☆',
          }, {
            name: '2☆',
            children: [{
              name: '迷恋'
            }]
          }]
        }, {
          name: '居家',
          children: [{
            name: '4☆',
            children: [{
              name: '把房子住成家'
            }, {
              name: '只过必要生活'
            }, {
              name: '北欧简约风格'
            }]
          }]
        }, {
          name: '绘本',
          children: [{
            name: '5☆',
            children: [{
              name: '设计诗'
            }]
          }, {
            name: '4☆',
            children: [{
              name: '假如生活糊弄了你'
            }, {
              name: '博物学家的神秘动物图鉴'
            }]
          }, {
            name: '3☆',
            children: [{
              name: '方向'
            }]
          }]
        }, {
          name: '哲学',
          children: [{
            name: '4☆',
            children: [{
              name: '人生的智慧'
            }]
          }]
        }, {
          name: '技术',
          children: [{
            name: '5☆',
            children: [{
              name: '代码整洁之道'
            }]
          }, {
            name: '4☆',
            children: [{
              name: 'Three.js 开发指南'
            }]
          }]
        }]
      }];

          var itemStyle = {
            star5: {
              color: colors[0]
            },
            star4: {
              color: colors[1]
            },
            star3: {
              color: colors[2]
            },
            star2: {
              color: colors[3]
            }
          };


          for (var j = 0; j < data.length; ++j) {
            var level1 = data[j].children;
            for (var i = 0; i < level1.length; ++i) {
              var block = level1[i].children;
              var bookScore = [];
              var bookScoreId;
              for (var star = 0; star < block.length; ++star) {
                var style = (function(name) {
                  switch (name) {
                    case '5☆':
                      bookScoreId = 0;
                      return itemStyle.star5;
                    case '4☆':
                      bookScoreId = 1;
                      return itemStyle.star4;
                    case '3☆':
                      bookScoreId = 2;
                      return itemStyle.star3;
                    case '2☆':
                      bookScoreId = 3;
                      return itemStyle.star2;
                  }
                })(block[star].name);

                block[star].label = {
                  color: style.color,
                  downplay: {
                    opacity: 0.5
                  }
                };

                if (block[star].children) {
                  style = {
                    opacity: 1,
                    color: style.color
                  };
                  block[star].children.forEach(function(book) {
                    book.value = 1;
                    book.itemStyle = style;

                    book.label = {
                      color: style.color
                    };

                    var value = 1;
                    if (bookScoreId === 0 || bookScoreId === 3) {
                      value = 5;
                    }

                    if (bookScore[bookScoreId]) {
                      bookScore[bookScoreId].value += value;
                    } else {
                      bookScore[bookScoreId] = {
                        color: colors[bookScoreId],
                        value: value
                      };
                    }
                  });
                }
              }

              level1[i].itemStyle = {
                color: data[j].itemStyle.color
              };
            }
          }

          this.option = {
            backgroundColor: bgColor,
            color: colors,
            series: [{
              type: 'sunburst',
              center: ['50%', '48%'],
              data: data,
              sort: function(a, b) {
                if (a.depth === 1) {
                  return b.getValue() - a.getValue();
                } else {
                  return a.dataIndex - b.dataIndex;
                }
              },
              label: {
                rotate: 'radial',
                color: bgColor
              },
              itemStyle: {
                borderColor: bgColor,
                borderWidth: 2
              },
              levels: [{}, {
                r0: 0,
                r: 40,
                label: {
                  rotate: 0
                }
              }, {
                r0: 40,
                r: 105
              }, {
                r0: 115,
                r: 140,
                itemStyle: {
                  shadowBlur: 2,
                  shadowColor: colors[2],
                  color: 'transparent'
                },
                label: {
                  rotate: 'tangential',
                  fontSize: 10,
                  color: colors[0]
                }
              }, {
                r0: 140,
                r: 145,
                itemStyle: {
                  shadowBlur: 80,
                  shadowColor: colors[0]
                },
                label: {
                  position: 'outside',
                  textShadowBlur: 5,
                  textShadowColor: '#333',
                },
                downplay: {
                  label: {
                    opacity: 0.5
                  }
                }
              }]
            }]
          };


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
