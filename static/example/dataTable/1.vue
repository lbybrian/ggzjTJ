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
export default {
  components: {
    DataTable: () => import("@/common/dataTable"),
  },
  mounted() {},
  data() {
    return {
      dataObj: {
        //showHeader标识数据表格是否显示表头
        showHeader: true,
        //withSelection标识数据表格是否带有复选框列
        withSelection: true,
        //withIndex标识数据表格是否带有自动索引列
        withIndex: true,
        //header标识数据表格的标题有哪些列，每列与data数组元素的哪个属性绑定
        header: [
          {
            //prop标识该元素所代表的数据列与data数组元素的哪个属性绑定
            prop: "key1",
            //label标识该元素所代表的数据列头名称标签
            label: "列名1",
            //width标识该元素所代表的数据列宽的像素值
            width: "180",
            //width标识该元素所代表的数据列的单元格文本对齐方式
            align: "center",
          },
          {
            prop: "key2",
            label: "列名2",
            width: "180",
            align: "center",
          },
          {
            prop: "key3",
            label: "列名3",
          },
          {
            prop: "key3",
            label: "操作",
            buttons: [
              {
                //text标识相应按钮的文本信息
                text: "",
                //按钮的鼠标悬浮提示
                title: "编辑",
                //eventName标识点击相应按钮触发的事件名称
                eventName: "eidtItem",
                //condition标识某数据行的相应按钮显示的条件
                condition: ["CC112"],
                //标识相应按钮的大小
                size: "mini",
                //icon标识相应按钮的图标
                icon: "el-icon-edit",
              },
              {
                text: "",
                title: "删除",
                eventName: "removeItem",
                //icon标识相应按钮的图标
                icon: "el-icon-delete",
              },
            ],
          },
        ],
        //data数组为数据表格Body显示的数据内容。
        data: [
          {
            key1: "AA111",
            key2: "BB111",
            key3: "CC111",
          },
          {
            key1: "AA112",
            key2: "BB112",
            key3: "CC112",
          },
        ],
        //page为数据表格分页配置
        page: {
          //background标识分页条是否有背景，有的话背景是什么
          background: false,
          //sizes标识当前分页条支持每页最多显示记录数可以切换的数值
          sizes: [20, 50, 100, 200],
          //pageSize标识当前分页条每页最多显示条数
          pageSize: 2,
          //layout标识当前分页条包含的操作元素
          layout: "prev, pager, next",
          //total标识当前分页条对应数据总量总条数
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
      console.log(current, size);
    },
    dealCellClick(row, column, cell, event) {
      console.log(row, column, cell);
    },
    dealButtonClick(eventName, row, index) {
      console.log(eventName, row, index);
    },
    dealSizeChange(current, size) {
      console.log(current, size);
    },
  },
};
</script>
<style scoped>
* {
  box-sizing: border-box;
}
</style>
