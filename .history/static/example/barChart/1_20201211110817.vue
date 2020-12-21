<template>
  <div>
    <BarChart
      style="height: 450px"
      :dataObj="dataObj"
      ref="exampleTestItem"
    ></BarChart>
  </div>
</template>
<script>
import BarChart from "@/common/chart/barChart";
export default {
  components: {
    BarChart,
  },
  mounted() {},
  data() {
    return {
      dataObj: {
        name: "杀伤力",
        color:['#1890ff','#2fc25b','#facc14','#223273','#8543e0','#13c2c2'],
        data: [
          {
            name: "AK47",
            value: 3000,
          },
          {
            name: "Mp5冲锋枪",
            value: 2500,
          },
          {
            name: "榴弹",
            value: 1000,
          },
          {
            name: "AWP狙击枪",
            value: 8000,
          },
          {
            name: "加农炮",
            value: 28000,
          },
          {
            name: "马克沁机枪",
            value: 12000,
          },
        ],
        mode: "horizontal",
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
