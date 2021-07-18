<template>
  <div style="padding: 20px 40px; width: 800px; height: 600px;">
    <DynamicItem :comName="dataTable"></DynamicItem>
  </div>
</template>

<script>
  import DynamicItem from "@/common/dynamicItem";
  export default {
    // name: "introduce",
    components: {
      DynamicItem
    },
    mounted() {
      this.$nextTick(function () {});
    },
    data() {
      return {

      };
    },
    methods: {},
  };

</script>

<style scoped>
  * {
    box-sizing: border-box;
  }

  .introduce {
    position: relative;
    float: left;
    max-width: 1200px;
    margin-bottom: 20px;
    padding-right: 20px;
    width: 100%;
  }

  .introduce>h2 {
    font-weight: 700;
    margin-bottom: 5px;
  }

  /deep/ .CodeMirror {
    border-top: solid 1px #ddd;
    border-left: solid 1px #ddd;
    box-shadow: 1px 1px 1px #ddd;
    height: 500px !important;
  }

  /deep/ .exampleItem,
  .howToImport .CodeMirror {
    height: auto !important;
  }

  .exampleItem {
    padding-bottom: 10px;
  }

  /deep/ .containerArea {
    margin-bottom: 10px;
  }

  /deep/ .el-form-item {
    margin-bottom: 5px;
  }

  /deep/ .el-collapse-item__header {
    font-weight: 700;
  }

</style>
