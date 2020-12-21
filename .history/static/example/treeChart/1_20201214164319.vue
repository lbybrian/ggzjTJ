<template>
  <div>
    <TreeChart
      style="height: 450px"
      :dataObj="dataObj"
      ref="exampleTestItem"
    ></TreeChart>
  </div>
</template>

<script>
	import TreeChart from "@/common/chart/treeChart";
  export default {
    components: {
		  TreeChart
    },
    data() {
      return {
        dataObj: {
          title: '树形图',
          titleStyle: {
            color: "#666",
          },
          itemStyle:{
            itemStyle:{
              borderColor:'#cecece'
            },
          },
          data: [
            {
              "name": "张三",
              // "itemStyle":{
              //   "borderColor":'#cecece'
              // },
              "children": [
                {
                  "name": "李四",
                  "children": [
                    {
                      "name": "converters",
                      "children": [
                        {
                          "name": "Converters",
                          "value": 721
                        },
                        {
                          "name": "DelimitedTextConverter",
                          "value": 4294
                        }
                      ]
                    },
                    {
                      "name": "DataUtil",
                      "value": 3322
                    }
                  ]
                },
                {
                  "name": "张三",
                  "children": [
                    {
                      "name": "DirtySprite",
                      "value": 8833
                    },
                    {
                      "name": "LineSprite",
                      "value": 1732
                    },
                    {
                      "name": "RectSprite",
                      "value": 3623
                    }
                  ]
                },
                {
                  "name": "{{受众}}",
                  "children": [
                    {
                      "name": "FlareVis",
                      "value": 4116
                    }
                  ]
                },
                {
                  "name": "query",
                  "children": [
                    {
                      "name": "AggregateExpression",
                      "value": 1616
                    },
                    {
                      "name": "And",
                      "value": 1027
                    },
                    {
                      "name": "Xor",
                      "value": 1101
                    }
                  ]
                },
                {
                  "name": "scale",
                  "children": [
                    {
                      "name": "IScaleMap",
                      "value": 2105
                    },
                    {
                      "name": "LinearScale",
                      "value": 1316
                    },
                    {
                      "name": "TimeScale",
                      "value": 5833
                    }
                  ]
                }]
            }
          ],
        }
      };
    },
    methods: {
      updateData(data) {
        this.dataObj = data;
        this.$refs.exampleTestItem.updateData(this.dataObj);
      },
    },
  }
</script>

<style scoped>
  * {
    box-sizing: border-box;
  }
</style>
