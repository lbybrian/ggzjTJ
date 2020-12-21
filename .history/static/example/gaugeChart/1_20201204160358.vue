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
        axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                    width: 10,
                    color: [[0.3, 'red'], [0.7, 'yellow'], [1, 'blue']]
                }
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
