<template>
  <div>
    <Topology style="height: 450px" :menuInfo="dataObj" ref="exampleTestItem">
    </Topology>
  </div>
</template>
<script>
// import Topology from "../../../src/common/topology";


export default {
  components: {
    Topology: () => import("@/common/topology"),
  },
  data() {
    return {
      dataObj: {
        
      },
    };
  },
  methods: {
    updateData(data) {
      this.dataObj = data;
      this.$nextTick(function () {
        this.$refs.exampleTestItem.updateData(this.dataObj);
      });
    },
  },
};
</script>