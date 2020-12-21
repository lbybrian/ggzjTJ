<template>
  <div>
    <GaugeChart
      style="height: 450px"
      :dataObj="dataObj"
      ref="exampleTestItem"
    ></GaugeChart>
  </div>
</template>
<script>
import GaugeChart from "@/common/chart/gaugeChart";
export default {
  components: {
    GaugeChart,
  },
  mounted() {},
 data() {
    return {
      dataObj: {
        title: "业务指标",
        data: [
          {value: 50, name: '完成率'}
        ],
        itemStyle: {
          axisLine: {            // 坐标轴线
            lineStyle: {       // 属性lineStyle控制线条样式
              color: [[0.2, '#1890ff'], [0.8, '#2fc25b'], [1, '#facc14']]
            }
          },
          itemStyle:{
            color:'#13c2c2'
          },
        },
      }
    };
  },
  methods: {
    updateData(data) {
      this.dataObj = data;
      this.$refs.exampleTestItem.updateData(this.dataObj);
    },
  },
};
</script>
<style scoped>
* {
  box-sizing: border-box;
}
</style>
