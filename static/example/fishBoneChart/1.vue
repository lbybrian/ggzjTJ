<template>
  <div>
    <FishBoneChart style="" :dataObj="dataObj" ref="exampleTestItem"></FishBoneChart>
  </div>
</template>

<script>
  import FishBoneChart from "@/common/chart/fishBoneChart";
  export default {
    components: {
      FishBoneChart
    },
    data() {
      return {
        dataObj: {
          "name": "主线",
          "children": [
            {
              "name": "二级0",
              "children": [
                {
                  "name": "Mill"
                },
                {
                  "name": "Mixer"
                },
                {
                  "name": "Metal Lathe"
                }
              ]
            },
            {
              "name": "二级1"
            },
            {
              "name": "二级2",
              "children": [
                {
                  "name": "三级1"
                },
                {
                  "name": "三级2",
                  "children": [
                    {
                      "name": "四级1"
                    },
                    {
                      "name": "四级2",
                      "children": [
                        {
                          "name": "五级1"
                        },
                        {
                          "name": "五级2"
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "Meat",
                  "children": [
                    {
                    "name": "Mutton"
                    },
                  ]
                }
              ]
            },
            {
              "name": "二级3",
              "children": [
                {
                  "name": "Manager"
                },
                {
                  "name": "Master's Student"
                },
                {
                  "name": "Magician"
                },
                {
                  "name": "Miner"
                },
                {
                  "name": "Magister",
                  "children": [
                    {
                    "name": "Malpractice"
                    },
                  ]
                },
                {
                  "name": "Massage Artist",
                  "children": [
                    {
                      "name": "Masseur"
                    },
                    {
                      "name": "Masseuse"
                    }
                  ]
                }
              ]
            },
            {
              "name": "二级4",
              "children": [
                {
                "name": "Malleability"
              }]
            },
            {
              "name": "二级5",
              "children": [
                {
                "name": "Marine"
              }]
            }
          ]
        }
      };
    },
    methods: {
      updateData(data) {
        this.dataObj.name = data.name;
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
