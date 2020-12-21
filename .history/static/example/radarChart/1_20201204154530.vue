<template>
  <div>
    <RadarChart
      style="height: 450px"
      :dataObj="dataObj"
      ref="exampleTestItem"
    ></RadarChart>
  </div>
</template>
<script>
import RadarChart from "@/common/chart/radarChart";
export default {
  components: {
    RadarChart,
  },
  mounted() {},
  data() {
    return {
      dataObj: {
        color:['#1890ff','#2fc25b','#facc14','#223273','#8543e0','#13c2c2'],
        title: "武器装备性能对比",
        legendStyle: {
          left: 10,
          top: "middle",
          orient: "vertical",
          icon: "diamond",
          // icon: "image://data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7"
        },
        radarStyle: {
          indicator: [
            { name: "装甲厚度", max: 100 },
            { name: "舰载机携带数", max: 100 },
            { name: "续航", max: 100 },
            { name: "吨位", max: 100 },
            { name: "航速", max: 100 },
          ],
        },
        data: [
          {
            name: "米尼兹级",
            style: {
              areaStyle: {
                color: "#1890ff",
                opacity: .5
              },
              lineStyle: {
                color: "#1890ff",
              },
            },
            value: [55, 80, 68, 87, 90],
          },
          {
            name: "001型",
            style: {
              areaStyle: {
                color: "#2fc25b",
                opacity: .5
              },
              lineStyle: {
                color: "#2fc25b",
              },
            },
            value: [25, 84, 96, 80, 70],
          },
          {
            name: "库兹列左夫",
            value: [75, 34, 46, 90, 80],
            style: {
              areaStyle: {
                color: "#facc14",
                opacity: .5
              },
              lineStyle: {
                color: "#facc14",
              },
            },
          },
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
