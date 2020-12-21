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
        title: "某业务指标完成情况",
        legendStyle: {
          left: 10,
          top: "middle",
          orient: "vertical",
          icon: "diamond",
          // icon: "image://data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7"
        },
        series: [
          {
            name: '业务指标',
            type: 'gauge',
            detail: {formatter: '{value}%'},
            data: [{value: 50, name: '完成率'}]
        }
        ],
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
