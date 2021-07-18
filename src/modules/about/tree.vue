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
            margin-right: 20px;
          " ref="exampleItem" class="exampleItem"></Example1>
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
import Example1 from '../../../static/example/tree/1.vue'
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
      console.log(this.basicData, 666)
    })
  },
  data() {
    return {
      basicData: {},
      componentPath: '/static/example/tree/1.vue',
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
          },
        ],
        data: [
          {
            name: 'appendNodeSubmit',
            param: "(data,nodeToAppend,parent) 1、提交参数data，2、提交的节点node，3、提交节点的父级data",
            description: '新增节点提交',
          },
          {
            name: 'editNodeSubmit',
            param: "提交参数data",
            description: '编辑节点提交',
          },
          {
            name: 'removeNode',
            param: "node:该节点所对应的对象,data:所删除节点data",
            description: '移除当前节点',
          },
          {
            name: 'nodeClick',
            param: "共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身",
            description: '节点点击事件',
          },
          {
            name: 'nodeCheck',
            param: "共四个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、树目前的选中状态对象、所选中的结构集合、所选中的节点Key集合",
            description: '选中事件',
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
          {
            name: 'expandClickNode',
            description: '点击节点展开与否',
            type: 'boolean',
            option: '',
            default: 'false',
          },
          {
            name: 'accordion',
            description: '是否每次只打开一个同级树节点展开(手风琴)',
            type: 'boolean',
            option: '-',
            default: 'false',
          },
          {
            name: 'highlightCurrent',
            description: '是否高亮当前选中节点',
            type: 'boolean',
            option: '-',
            default: 'true',
          },
          {
            name: 'treeIndent',
            description: '相邻级节点间的水平缩进，单位为像素',
            type: 'number',
            option: '-',
            default: '16',
          },
          {
            name: 'treeShowCheckbox',
            description:'节点是否可被选择',
            type: 'boolean',
            option: '-',
            default: 'false',
          },
          {
            name: 'treeCheckStrictly',
            description:'在显示复选框的情况下，是否严格的遵循父子不互相关联的做法,实现单选',
            type: 'boolean',
            option: '-',
            default: 'false',
          },
          {
            name: 'editable',
            description:'可否编辑',
            type: 'boolean',
            option: '-',
            default: 'false',
          },{
            name: 'collect',
            description:'是否展示统计',
            type: 'boolean',
            option: '-',
            default: 'false',
          },{
            name: 'hideParentCheckBox',
            description:'在显示复选框的情况下，父级是否不可选',
            type: 'boolean',
            option: '-',
            default: 'false',
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
          },{
            name: 'getCheckedKeys',
            param: '(leafOnly) 接收一个 boolean 类型的参数，若为 true 则仅返回被选中的叶子节点的 keys，默认值为 false',
            description: '获取选中的节点的 key 所组成的数组',
          },{
            name: 'setCheckedKeys',
            param: '(keys, leafOnly) 接收两个参数，1. 勾选节点的 key 的数组 2. boolean 类型的参数，若为 true 则仅设置叶子节点的选中状态，默认值为 false',
            description: '通过 keys 设置目前勾选的节点',
          },
          {
            name: 'getCurrentKey',
            param: '-',
            description: '获取当前被选中节点的 key',
          },{
            name: 'getCurrentNode',
            param: '-',
            description: '获取当前被选中节点的 data',
          },
          {
            name: 'remove',
            param: '(data) 要删除的节点的 data 或者 node',
            description: '删除 Tree 中的一个节点',
          },{
            name: 'append',
            param: '(data, parentNode) 接收两个参数，1. 要追加的子节点的 data 2. 子节点的 parent 的 data、key 或者 node',
            description: '为 Tree 中的一个节点追加一个子节点',
          },{
            name: 'getNode',
            param: '(data) 要获得 node 的 key 或者 data',
            description: '根据 data 或者 key 拿到 Tree 组件中的 node',
          },
          {
            name: 'updateData',
            param: 'data更新数据',
            description: 'tree数据更新',
          },{
            name: 'previewJson',
            param: '(data)要转换的xml',
            description: 'xml转tree方法',
          },
          {
            name: 'jsonToXml',
            param: '(data)要转换的树结构',
            description: 'tree转xml方法',
          },
        ],
      },
      exampleName: [
        {
          name: '编辑',
          callbackName: 'exampleCallback1',
        },
        {
          name: '复选',
          callbackName: 'exampleCallback2',
        },
        {
          name: '单选',
          callbackName: 'exampleCallback3',
        },
        {
          name: '统计',
          callbackName: 'exampleCallback4',
        },
      ],
    }
  },
  methods: {
    updateExampleData(data) {
      if (
        this.$refs.exampleItem.$refs.exampleTree &&
        this.$refs.exampleItem.$refs.exampleTree.updateData
      ) {
        this.$refs.exampleItem.$refs.exampleTree.updateData(data)
      }
    },
    exampleCallback1() {
      var tData = { ...this.basicData }
      tData.editable = true
      this.updateExampleData(tData)
    },
    exampleCallback2() {
      this.$refs.exampleItem.$refs.exampleTree.setCheckedNodes([])
      var tData = { ...this.basicData }
      tData.treeShowCheckbox = true
      tData.treeCheckStrictly = false
      this.updateExampleData(tData)
    },
    exampleCallback3() {
      this.$refs.exampleItem.$refs.exampleTree.setCheckedNodes([])
      var tData = { ...this.basicData }
      tData.treeShowCheckbox = true
      tData.treeCheckStrictly = true
      this.updateExampleData(tData)
    },
    exampleCallback4() {
      var tData = { ...this.basicData }
      tData.collect = true
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
