<template>
  <div style="padding: 20px 40px">
     <div style="margin-bottom: 10px; width: 1000px;">
      <el-alert
        type="warning"
        title="此组件封装了常用的属性、方法、事件，如不能满足需求再封装更多方法和事件"
        :closable="false"
      >
      </el-alert>
    </div>
    <el-collapse v-model="activeNames" :accordion="true" style="width: 1000px">
      <el-collapse-item title="组件示例" name="1">
        <h2 style="position: relative; float: left; width: 100%">
          典型案例
          <el-button @click="openExampleStrunctDialog" style="float: right; margin-left: 20px" type="text">参数数据结构</el-button>
          <el-button @click="openExampleCodeDialog" style="float: right" type="text">示例代码</el-button>
        </h2>
        <Example1 style="
            width: calc(100% - 180px);
            display: inline-block;
            float: left;
            margin-right: 20px;"
            ref="exampleItem"
            class="exampleItem">
        </Example1>
        <el-radio-group v-model="exampleSelect" @change="dealSelectExample" style="
            padding: 10px 0px;
            float: left;
            width: 160px;
            display: inline-block;
          ">
          <slot v-for="d in exampleName">
            <el-radio style="width: 100%; margin: 0px; margin-bottom: 5px" :label="d.callbackName" border>{{ d.name }}</el-radio>
          </slot>
        </el-radio-group>
      </el-collapse-item>

      <el-collapse-item title="支持的事件" name="4">
        <DataTable ref="eventTable" :dataObj="eventDescription"></DataTable>
      </el-collapse-item>
      <el-collapse-item title="参数属性含义" name="5">
        <DataTable ref="paramTable" :dataObj="paramDescription"></DataTable>
      </el-collapse-item>
      <el-collapse-item title="支持的方法" name="6">
        <DataTable ref="methodTable" :dataObj="methodDescription"></DataTable>
      </el-collapse-item>
    </el-collapse>
    <DialogItem @openDialog="dealOpenDialog('exampleStrunctDialog')" @confirmDialog="dealConfirmDialog" :config="exampleStrunctDialog" ref="exampleStrunctDialog">
      <template>
        <CodeViewer ref="exampleStructItem"></CodeViewer>
      </template>
    </DialogItem>
    <DialogItem @openDialog="dealOpenDialog('exampleCodeDialog')" :config="exampleCodeDialog" ref="exampleCodeDialog">
      <template>
        <ExampleViewer style="max-height: 800px" :url="componentPath"></ExampleViewer>
      </template>
    </DialogItem>
  </div>
</template>

<script>
import Example1 from '../../../static/example/fishBoneChart/1.vue'
import ExampleViewer from '@/common/exampleViewer'
import CodeViewer from '@/common/codeViewer'
import DataTable from '@/common/dataTable'
import DialogItem from '@/common/dialogItem'

export default {
  components: {
    Example1,
    ExampleViewer,
    CodeViewer,
    DataTable,
    DialogItem,
  },
  mounted() {
    this.$nextTick(function () {
      this.basicData = { ...this.$refs.exampleItem.dataObj }
    })
  },
  data() {
    return {
      basicData: {},
      componentPath: '/static/example/fishBoneChart/1.vue',
      exampleSelect: '',
      activeNames: '1',
      exampleCodeDialog: {
        visible: false,
        title: '典型案例的示例代码',
        withFooter: false,
      },
      exampleStrunctDialog: {
        visible: false,
        title: '典型案例的参数数据结构',
        withFooter: true,
      },
      eventDescription: {
        header: [
          {
            prop: 'name',
            label: '事件名',
            width: '180',
          },
          {
            prop: 'description',
            label: '描述',
            align: 'left',
          },
          {
            prop: 'param',
            label: '参数',
            width: '180',
          },
        ],
        data: [
          {
            name: 'appendNodeSubmit',
            param: "提交参数data",
            description: '新增节点提交',
          },
        ],
      },
      paramDescription: {
        header: [
          {
            prop: 'name',
            label: '属性名称',
            width: '180',
          },
          {
            prop: 'description',
            label: '描述',
            align: 'left',
          },
          {
            prop: 'type',
            label: '类型',
            width: '120',
          },
          {
            prop: 'option',
            label: '可选值',
            align: 'center',
            width: '180',
          },
          {
            prop: 'default',
            label: '默认值',
            align: 'center',
            width: '120',
          },
        ],
        data: [
          {
            name: 'tree',
            description: '展示数据',
            type: 'array',
            option: '-',
            default: '-',
          },
          {
            name: 'nodeKey',
            description:'每个树节点用来作为唯一标识的属性',
            type: 'string',
            option: '-',
            default: 'id',
          },
        ],
      },
      methodDescription: {
        header: [
          {
            prop: 'name',
            label: '方法名称',
            width: '180',
          },
          {
            prop: 'description',
            label: '描述',
            align: 'left',
          },
          {
            prop: 'param',
            label: '参数',
            width: '180',
          },
        ],
        data: [
          {
            name: 'getCheckedNodes',
            param: '-',
            description: '获取选中的node',
          },
          {
            name: 'setCheckedNodes',
            param: '接收勾选节点数据的数组',
            description: '获取选中的节点的 key 所组成的数组',
          }
        ],
      },
      exampleName: [
        {
          name: '无动态',
          callbackName: 'exampleCallback1',
        },
        {
          name: '动态',
          callbackName: 'exampleCallback2',
        },
        {
          name: '动态更新数据',
          callbackName: 'exampleCallback3',
        },
      ],
    }
  },
  methods: {
    updateExampleData(data) {
      if (
        this.$refs.exampleItem.$refs.exampleTestItem &&
        this.$refs.exampleItem.$refs.exampleTestItem.updateData
      ) {
        this.$refs.exampleItem.$refs.exampleTestItem.updateData(data)
      }
    },
    exampleCallback1() {
      var tData = { ...this.basicData }
      this.updateExampleData(tData)
    },
    exampleCallback2() {
      var tData = { ...this.basicData }
      tData.name = 'lala22222222222222'
      this.updateExampleData(tData)
    },
    exampleCallback3() {
      var tData = { ...this.basicData }
      console.log(tData)
      tData.name = '改333333333333'
      this.updateExampleData(tData)
    },
    exampleCallback4() {
      var tData = { ...this.basicData }
      this.updateExampleData(tData)
    },
    dealSelectExample(v) {
      console.log(v)
      if (v && typeof this[v] === 'function') {
        this[v]()
      }
    },
    openExampleStrunctDialog() {
      this.$refs.exampleStrunctDialog.show()
    },
    openExampleCodeDialog() {
      this.$refs.exampleCodeDialog.show()
    },
    dealOpenDialog(name) {
      if (name === 'testDialog') {
        this.$refs.exampleViewerItem.code = beautify(
          JSON.stringify(this.$refs.exampleItem.dataObj),
          opts
        )
      } else if (name === 'exampleStrunctDialog') {
        this.$refs.exampleStructItem.code = beautify(
          JSON.stringify(this.$refs.exampleItem.dataObj),
          opts
        )
      } else {
      }
    },
    dealConfirmDialog() {
      var code = this.$refs.exampleStructItem.code
      try {
        this.updateExampleData(JSON.parse(code))
        // this.$refs.exampleTest.$forceUpdate();
        this.exampleSelect = ''
      } catch (e) {
        console.log(e)
      }
    },
    dealSelectionChange(val) {},
  },
}
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

.introduce > h2 {
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
