<template>
  <div class="containerArea">
    <!-- 数据表格table的参考含义请参考 script标签中的data.dataInfo参数注释 -->
    <el-table
      v-if="isShow"
      :data="dataInfo.data"
      ref="dataTableItem"
      :height="dataInfo.height"
      :max-height="dataInfo.maxHeight"
      :stripe="dataInfo.stripe || false"
      :border="dataInfo.border || false"
      :empty-text="dataInfo.emptyText || '暂无数据'"
      :fit="dataInfo.fit === undefined ? true : dataInfo.fit"
      :highlight-current-row="dataInfo.heightCurrentRow"
      :show-header="
        dataInfo.showHeader === undefined ? true : dataInfo.showHeader
      "
      @selection-change="handleSelectionChange"
      @cell-click="dealCellClick"
      @sort-change="dealSortChange"
      style="width: 100%"
    >
      <el-table-column
        v-if="dataInfo.withSelection"
        type="selection"
        width="50"
        align="center"
      ></el-table-column>
      <el-table-column
        v-if="dataInfo.withIndex"
        type="index"
        align="center"
      ></el-table-column>
      <slot v-for="d in dataInfo.header">
        <el-table-column
          :sortable="d.sortable"
          :align="d.align"
          :prop="d.prop"
          :label="d.label"
          :fixed="d.fixed"
          :header-align="d.headerAlign || d.align"
          :width="d.width"
          :index="d.index"
          :min-width="d.minWidth"
          :show-overflow-tooltip="d.showOverflowTooltip"
          :class-name="d.className"
          :resizable="d.resizable"
        >
          <template :title="t.title || t.text" slot-scope="scope">
            <slot v-if="!!d.buttons">
              <slot v-for="(t, i) in d.buttons">
                <el-button
                  @click="
                    dealClickButton(
                      t.eventName || t.label,
                      scope.row,
                      scope.$index
                    )
                  "
                  v-if="
                    !t.condition ||
                    (t.condition.constructor.name === 'Array' &&
                      t.condition.indexOf(scope.row[d.prop]) !== -1) ||
                    (t.condition.constructor.name === 'String' &&
                      t.condition === scope.row[d.prop])
                  "
                  :type="t.type || 'text'"
                  :class="t.class"
                  :title="t.title || t.text"
                  :icon="t.icon"
                  :size="t.size || 'small'"
                >
                  {{ t.text }}
                </el-button>
              </slot>
            </slot>
            <slot v-else>
              <span v-if="!d.style" :prop="d.prop">{{
                scope.row[d.prop]
              }}</span>
              <div v-else :prop="d.prop" :style="d.style">
                <span :prop="d.prop">{{ scope.row[d.prop] }}</span>
              </div>
            </slot>
          </template>
        </el-table-column>
      </slot>
    </el-table>

    <!-- 数据表格table的分页参数，参考含义请参考 script标签中的data.dataInfo参数注释 -->
    <slot v-if="!!dataInfo.page">
      <el-pagination
        :style="dataInfo.style || 'margin-top: 5px;'"
        :page-size="dataInfo.page.pageSize || 20"
        :page-sizes="dataInfo.page.sizes || [10, 20, 50, 100]"
        :current-page="dataInfo.page.currentPage"
        :layout="dataInfo.page.layout || 'prev, pager, next, sizes'"
        :total="dataInfo.page.total || 1000"
        :background="dataInfo.page.background"
        @size-change="dealSizeChange"
        @current-change="dealPageChange"
      ></el-pagination>
    </slot>
  </div>
</template>

<script>
export default {
  //组件mount之前确认是否有传入dataObj参数，有的话就替换组件实例的默认数据。
  beforeMount() {
    if (this.dataObj) {
      this.dataInfo = this.dataObj;
    }
  },
  data() {
    return {
      isShow: true,
      //dataInfo标识组件实例的默认数据参数定义
      dataInfo: {
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
                text: "编辑",
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
                text: "删除",
                eventName: "removeItem",
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
  watch: {},
  mounted() {
    //获取数据表格实例
    this.tableItem = this.$refs.dataTableItem;
  },
  methods: {
    //更新表格数据，同时也让数据表格界面更新
    updateData(newObj) {
      this.isShow = false;
      this.$nextTick(function () {
        this._updateData(newObj);
        this.isShow = true;
      });
    },
    //只更新表格数据
    _updateData(newObj) {
      for (var k in newObj) {
        this.$set(this.dataInfo, k, newObj[k]);
      }
    },
    //清除数据表格的选中状态
    clearSelection() {
      this.tableItem.clearSelection();
    },
    setCurrentRow(row) {
      this.tableItem.setCurrentRow(row);
    },
    toggleRowSelection(row, selected) {
      this.tableItem.toggleRowSelection(row, selected);
    },
    //清除数据表格排序状态
    clearSort() {
      this.tableItem.clearSort();
    },
    //响应选中变化事件，释放selection-change事件
    handleSelectionChange(val) {
      this.dataInfo.selected = val;
      this.$emit("selection-change", val);
    },
    //响应分页size变化事件，释放size-change事件
    dealSizeChange(val) {
      this.dataInfo.page.size = val;
      this.dataInfo.page.current = 1;
      this.$emit("size-change", this.dataInfo.page.current || 1, val);
    },
    //响应翻页事件，释放page-change事件
    dealPageChange(val) {
      this.dataInfo.page.current = val;
      this.$emit("page-change", val, this.dataInfo.page.size);
    },
    //响应单元格点击事件，释放cell-click事件
    dealCellClick(row, column, cell, event) {
      this.$emit("cell-click", row, column, cell, event);
    },
    //响应按钮点击事件，释放button-click事件
    dealClickButton(eventName, row, index) {
      this.$emit("button-click", eventName, row, index);
    },
    //响应排序变化事件，释放sort-change事件
    dealSortChange(param) {
      this.$emit("sort-change", param);
    },
  },
  created() {},
  props: {
    dataObj: Object,
  },
};
</script>

<style scoped>
.containerArea {
  width: 100%;
  height: 100%;
}

/deep/ .el-pagination {
  padding-left: 0px;
}
</style>
