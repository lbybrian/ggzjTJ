<template>
  <div>
    <ScatterChart
      :dataObj="dataObj"
      ref="exampleTestItem"
      style="height: 450px"
    ></ScatterChart>
  </div>
</template>
<script>
import ScatterChart from "@/common/chart/scatterChart";
export default {
  components: {
    ScatterChart,
  },
  mounted() {},
  data() {
    return {
      dataObj: {
        title: "示例",
        titleStyle: {
          color: "#666",
        },
        data: [
          {
            name: "1",
            value: [143.28, 12.54, 12580],
            time: "2020年10月21日 01:30",
            itemStyle: {
                color: '#1890ff',
                // shadowBlur: 2,
                // shadowColor: '#333'
            },
          },
          {
            name: "2",
            value: [140.88, 16.54, 12580],
            time: "2020年10月21日 03:10",
            itemStyle: {
                color: '#2fc25b',
            },
          },
          {
            name: "3",
            value: [140.28, 20.54, 12580],
            time: "2020年10月21日 03:33",
            itemStyle: {
                color: '#facc14',
            },
          },
        ],
      },
    };
  },
  methods: {
    updateData(data) {
      this.dataObj = data || this.dataObj;
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
