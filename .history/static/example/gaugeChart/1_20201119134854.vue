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
        title: "某次军事演习",
        data: [{
          name: "空军",
          value: 1000
        }, {
          name: "陆军",
          value: 1050
        }, {
          name: "海军",
          value: 2000
        }]
      },
      
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
