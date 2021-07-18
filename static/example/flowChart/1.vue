<template>
  <div>
    <FlowChart
      style="height: 450px"
      :dataObj="dataObj"
      ref="exampleTestItem"
    ></FlowChart>
  </div>
</template>
<script>
import FlowChart from "@/common/flowChart";
export default {
  components: {
    FlowChart,
  },
  mounted() {},
  data() {
    return {
      dataObj: {
        name: "流程图",
        nodes: [
          {
            id: "1",
            dataType: "alps",
            name: "alps_file1",
            conf: [
              {
                label: "conf",
                value: "pai_graph.conf",
              },
              {
                label: "dot",
                value: "pai_graph.dot",
              },
              {
                label: "init",
                value: "init.rc",
              },
            ],
          },
          {
            id: "2",
            dataType: "alps",
            name: "alps_file2",
            conf: [
              {
                label: "conf",
                value: "pai_graph.conf",
              },
              {
                label: "dot",
                value: "pai_graph.dot",
              },
              {
                label: "init",
                value: "init.rc",
              },
            ],
          },
          {
            id: "3",
            dataType: "alps",
            name: "alps_file3",
            conf: [
              {
                label: "conf",
                value: "pai_graph.conf",
              },
              {
                label: "dot",
                value: "pai_graph.dot",
              },
              {
                label: "init",
                value: "init.rc",
              },
            ],
          },
          {
            id: "4",
            dataType: "sql",
            name: "sql_file1",
            conf: [
              {
                label: "conf",
                value: "pai_graph.conf",
              },
              {
                label: "dot",
                value: "pai_graph.dot",
              },
              {
                label: "init",
                value: "init.rc",
              },
            ],
          },
          {
            id: "5",
            dataType: "sql",
            name: "sql_file2",
            conf: [
              {
                label: "conf",
                value: "pai_graph.conf",
              },
              {
                label: "dot",
                value: "pai_graph.dot",
              },
              {
                label: "init",
                value: "init.rc",
              },
            ],
          },
          {
            id: "6",
            dataType: "feature_etl",
            name: "feature_etl_1",
            conf: [
              {
                label: "conf",
                value: "pai_graph.conf",
              },
              {
                label: "dot",
                value: "pai_graph.dot",
              },
              {
                label: "init",
                value: "init.rc",
              },
            ],
          },
          {
            id: "7",
            dataType: "feature_etl",
            name: "feature_etl_1",
            conf: [
              {
                label: "conf",
                value: "pai_graph.conf",
              },
              {
                label: "dot",
                value: "pai_graph.dot",
              },
              {
                label: "init",
                value: "init.rc",
              },
            ],
          },
          {
            id: "8",
            dataType: "feature_extractor",
            name: "feature_extractor",
            conf: [
              {
                label: "conf",
                value: "pai_graph.conf",
              },
              {
                label: "dot",
                value: "pai_graph.dot",
              },
              {
                label: "init",
                value: "init.rc",
              },
            ],
          },
        ],
        edges: [
          {
            source: "1",
            target: "2",
          },
          {
            source: "1",
            target: "3",
          },
          {
            source: "2",
            target: "4",
          },
          {
            source: "3",
            target: "4",
          },
          {
            source: "4",
            target: "5",
          },
          {
            source: "5",
            target: "6",
          },
          {
            source: "6",
            target: "7",
          },
          {
            source: "6",
            target: "8",
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
