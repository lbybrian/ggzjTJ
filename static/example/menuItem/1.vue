<template>
  <div>
    <MenuItem style="height: 450px" :menuInfo="dataObj" ref="exampleTestItem">
    </MenuItem>
  </div>
</template>
<script>
// import MenuItem from "../../../src/common/menuItem";

export default {
  components: {
    MenuItem: () => import("@/common/menuItem"),
  },
  data() {
    return {
      dataObj: {
        data: [
          {
            icon: "",
            label: "#菜单项1",
            children: [
              {
                icon: "",
                label: "菜单项1-1",
              },
              {
                icon: "",
                label: "菜单项1-2",
              },
            ],
          },
          {
            icon: "",
            label: "菜单项2",
            children: [
              {
                icon: "",
                label: "菜单项2-1",
              },
              {
                icon: "",
                label: "菜单项2-2",
              },
            ],
          },
          {
            icon: "",
            label: "菜单项3",
          },
          {
            icon: "",
            label: "菜单项4",
            children: [
              {
                icon: "",
                label: "菜单项4-1",
              },
              {
                icon: "",
                label: "菜单项4-2",
              },
            ],
          },
        ],
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