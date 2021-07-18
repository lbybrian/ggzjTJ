<template>
  <div style="padding: 20px 40px">
    <div style="margin-bottom: 10px; width: 1000px;">
      <el-alert
        type="warning"
        title="此组件依赖于mapBox-gl官方地图，此地图暂时为免费状态，仅限加载50000次。如果甲方部署离线版可使用此地图。我已在该组件内写明离线部署版的引用方式，详见mapBox组件。mapBoxGl官方中文API:http://www.mapbox.cn/mapbox-gl-js/api/ ，英文API:https://docs.mapbox.com/mapbox-gl-js/api/map/"
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

      <!-- <el-collapse-item title="支持的事件" name="4">
        <DataTable ref="eventTable" :dataObj="eventDescription"></DataTable>
      </el-collapse-item> -->
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
import Example1 from '../../../static/example/mapBox/1.vue'
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
      this.basicData = { ...this.$refs.exampleItem.mapData }
    })
  },
  data() {
    return {
      basicData: {},
      componentPath: '/static/example/mapBox/1.vue',
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
            name: 'button-click',
            param: 'name, row, index',
            description: '当点击按钮时触发该事件',
          }
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
        data: [{
            name: "cssType",
            description:
              "地图视图大小",
            type: "Object",
            option: "-",
            default: "width: '100%',height: '600px',",
          },{
            name: "mapData.geojson",
            description:
              "散点坐标，描述等集合",
            type: "Object",
            option: "-",
            default: "-",
          },{
            name: "mapData.geojson[].coordinates",
            description:
              "散点坐标",
            type: "Array",
            option: "-",
            default: "-",
          },{
            name: "mapData.geojson[].description",
            description:
              "散点描述",
            type: "String",
            option: "-",
            default: "-",
          },{
            name: "mapData.center",
            description:
              "地图展示中心点",
            type: "Array",
            option: "-",
            default: "[121.43, 34.5]",
          },{
            name: "mapData.pointsVisibility",
            description:
              "是否展示散点",
            type: "String",
            option: "visible:是；none:否",
            default: "visible",
          },{
            name: "mapData.lineSvisibility",
            description:
              "是否展示连线",
            type: "String",
            option: "visible:是；none:否",
            default: "visible",
          },{
            name: "mapData.zoom",
            description:
              "缩放比",
            type: "Number",
            option: "-",
            default: "4",
          }
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
            name: "dataUpdate",
            param: "data",
            description: "更新图上的数据和相关样式参数",
          }
        ],
      },
      exampleName: [
        {
          name: '不带浮点',
          callbackName: 'exampleCallback1',
        },
        {
          name: '带浮点',
          callbackName: 'exampleCallback2',
        },
        {
          name: '带连线',
          callbackName: 'exampleCallback3',
        },
        {
          name: '带浮点和连线',
          callbackName: 'exampleCallback4',
        },
        {
          name: '改变缩放比',
          callbackName: 'exampleCallback5',
        },
      ],
    }
  },
  methods: {
    updateExampleData(data) {
      if (this.$refs.exampleItem.$refs.exampleTestItem && this.$refs.exampleItem.$refs.exampleTestItem.dataUpdate) {
        this.$refs.exampleItem.$refs.exampleTestItem.dataUpdate(data)
      }
    },
    exampleCallback1() {
      var tData = { ...this.basicData }
      tData.pointsVisibility = 'none'
      tData.lineSvisibility = 'none'
      this.updateExampleData(tData)
    },
    exampleCallback2() {
      var tData = { ...this.basicData }
      tData.pointsVisibility = 'visible'
      tData.lineSvisibility = 'none'
      this.updateExampleData(tData)
    },
    exampleCallback3() {
      var tData = { ...this.basicData }
      tData.pointsVisibility = 'none'
      tData.lineSvisibility = 'visible'
      this.updateExampleData(tData)
    },
    exampleCallback4() {
      var tData = { ...this.basicData }
      tData.pointsVisibility = 'visible'
      tData.lineSvisibility = 'visible'
      this.updateExampleData(tData)
    },
    exampleCallback5() {
      var tData = { ...this.basicData }
      tData.zoom = 3
      this.updateExampleData(tData)
    },
    dealSelectExample(v) {
      console.log(v, 676767)
      if (v && typeof this[v] === 'function') {
        this[v]()
      }
    },
    // openDataStrunctDialog() {
    //   this.$refs.testDialog.show()
    // },
    openExampleStrunctDialog() {
      this.$refs.exampleStrunctDialog.show()
    },
    openExampleCodeDialog() {
      this.$refs.exampleCodeDialog.show()
    },
    dealOpenDialog(name) {
      if (name === 'testDialog') {
        this.$refs.exampleViewerItem.code = beautify(
          JSON.stringify(this.$refs.exampleItem.mapData),
          opts
        )
      } else if (name === 'exampleStrunctDialog') {
        this.$refs.exampleStructItem.code = beautify(
          JSON.stringify(this.$refs.exampleItem.mapData),
          opts
        )
      } else {
      }
    },
    dealConfirmDialog() {
      var code = this.$refs.exampleStructItem.code
      console.log(code)
      try {
        this.updateExampleData(JSON.parse(code))
        // this.$refs.exampleTest.$forceUpdate();
        this.exampleSelect = ''
      } catch (e) {
        console.log(e)
      }
    },
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
