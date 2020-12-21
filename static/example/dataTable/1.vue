<template>
  <div>
    <DataTable
      :dataObj="dataObj"
      @selection-change="dealSelectionChange"
      @sort-change="dealSortChange"
      @page-change="dealPageChange"
      @cell-click="dealCellClick"
      @button-click="dealButtonClick"
      @size-change="dealSizeChange"
      ref="exampleTestItem"
    ></DataTable>
  </div>
</template>
<script>
// import DataTable from "@/common/dataTable";
export default {
  components: {
    DataTable: () => import("@/common/dataTable"),
  },
  mounted() {},
  data() {
    return {
      dataObj: {
        withSelection: true,
        header: [
          {
            prop: "date",
            sortable: true,
            label: "日期ewew222222222222222",
            width: "180",
          },
          {
            prop: "name",
            label: "姓名dafeeeeeeeeee",
            width: "180",
            align: "center",
          },
          {
            prop: "address",
            label: "操作",
            buttons: [
              {
                text: "编辑",
                eventName: "eidtItem"
              },
              {
                text: "删除",
                eventName: "removeItem"
              },
            ],
          },
        ],
        data: [
          {
            date: "2020-02-21",
            name: "刘文津",
            address: "三义庙2号院",
          },
          {
            date: "2020-02-22",
            name: "刘文津",
            address: "三义庙2号院",
          },
          {
            date: "2020-02-23",
            name: "刘文津",
            address: "三义庙2号院",
          },
          {
            date: "2020-02-24",
            name: "刘文津",
            address: "三义庙2号院",
          },
        ],
        page: {
          size: 20,
          count: 3,
          layout: "prev, pager, next, sizes",
          total: 200,
        },
      },
    };
  },
  methods: {
    dealSelectionChange(val) {
      console.log(this.dataObj.selected);
    },
    dealSortChange(param) {
      console.log(param);
    },
    dealPageChange(current, size) {
      console.log(current, size)
    },
    dealCellClick(row, column, cell, event) {
      console.log(row, column, cell);
    },
    dealButtonClick(eventName, row, index) {
      console.log(eventName, row, index);
    },
    dealSizeChange(current, size) {
      console.log(current, size);
    }
  },
};
</script>
<style scoped>
* {
  box-sizing: border-box;
}
</style>
