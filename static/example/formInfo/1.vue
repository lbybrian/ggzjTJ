<template>
  <div>
    <FormInfo
      :dataObj="dataObj"
      ref="exampleTestItem"
      style="
        height: auto;
        width: 80%;
        max-width: 600px;
        position: relative;
        float: left;
      "
    ></FormInfo>
  </div>
</template>
<script>
import FormInfo from "@/common/formInfo";
export default {
  components: {
    FormInfo,
  },
  beforeMount() {},
  data() {
    return {
      dataObj: {
        labelWidth: "120px",
        data: [
          {
            name: "行动目标",
            value: "",
            type: "text",
            items: [
              {
                placeholder: "请输入行动目标",
              },
            ],
          },
          {
            name: "时间范围",
            value: "",
            type: "dateRange",
            items: [""],
          },
          {
            name: "协同间隔(小时)",
            value: "",
            type: "number",
            items: [""],
          },
        ],
      },
    };
  },
  methods: {},
};
</script>
<style scoped>
* {
  box-sizing: border-box;
}
</style>
