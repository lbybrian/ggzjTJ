<template>
  <div>
    <CustomChart
      style="height: 450px"
      :dataObj="dataObj"
      ref="exampleTestItem"
    ></CustomChart>
  </div>
</template>
<script>
export default {
  components: {
    CustomChart: ()=> import("@/common/chart/customChart"),
  },
  mounted() {
    $.when(
      $.get('https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data/asset/data/option-view.json')
    ).done(res => {
      this.dataObj = res
      console.log(this.dataObj)
    })
    setTimeout(() => {
      this.updateData(this.dataObj)
    }, 3000)
  },
  data() {
    return {
      dataObj: {},
    };
  },
  methods: {
    updateData(data) {
      this.dataObj = data;
      this.$nextTick(function(){
        this.$refs.exampleTestItem.updateData(this.dataObj);
      });

    },
  },
};
</script>
<style scoped>
* {
  box-sizing: border-box;
}
</style>
