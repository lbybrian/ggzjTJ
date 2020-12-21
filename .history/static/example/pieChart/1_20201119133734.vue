<template>
  <div>
    <PieChart
      style="height: 450px"
      :dataObj="dataObj"
      ref="exampleTestItem"
    ></PieChart>
  </div>
</template>
<script>
import PieChart from "@/common/chart/pieChart";
export default {
  components: {
    PieChart,
  },
  mounted() {},
  data() {
    return {
      dataObj: {
        title: "某次军事演习",
        data: [{
          name: "空军1",
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
