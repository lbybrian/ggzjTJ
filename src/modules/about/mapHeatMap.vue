<template>
  <div style="padding: 20px 40px">
    <el-collapse v-model="activeNames" :accordion="true" style="width: 1000px">
      <el-collapse-item title="组件示例" name="1">
        <h2 style="position: relative; float: left; width: 100%">
          典型案例
          <el-button
            @click="openExampleStrunctDialog"
            style="float: right; margin-left: 20px"
            type="text"
            >参数数据结构</el-button
          >
          <el-button
            @click="openExampleCodeDialog"
            style="float: right"
            type="text"
            >示例代码</el-button
          >
        </h2>
        <Example1
          style="
            width: calc(100% - 180px);
            display: inline-block;
            float: left;
            margin-right: 20px;
          "
          ref="exampleItem"
          class="exampleItem"
        ></Example1>
        <el-radio-group
          v-model="exampleSelect"
          @change="dealSelectExample"
          style="
            padding: 10px 0px;
            float: left;
            width: 160px;
            display: inline-block;
          "
        >
          <slot v-for="d in exampleName">
            <el-radio
              style="width: 100%; margin: 0px; margin-bottom: 5px"
              :label="d.callbackName"
              border
              >{{ d.name }}</el-radio
            >
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
    <DialogItem
      @openDialog="dealOpenDialog('exampleStrunctDialog')"
      @confirmDialog="dealConfirmDialog"
      :config="exampleStrunctDialog"
      ref="exampleStrunctDialog"
    >
      <template>
        <CodeViewer ref="exampleStructItem"></CodeViewer>
      </template>
    </DialogItem>
    <DialogItem
      @openDialog="dealOpenDialog('exampleCodeDialog')"
      :config="exampleCodeDialog"
      ref="exampleCodeDialog"
    >
      <template>
        <ExampleViewer
          style="max-height: 800px"
          :url="componentPath"
        ></ExampleViewer>
      </template>
    </DialogItem>
  </div>
</template>

<script>
import Example1 from "../../../static/example/mapHeatMap/1.vue";
import ExampleViewer from "@/common/exampleViewer";
import CodeViewer from "@/common/codeViewer";
import DataTable from "@/common/dataTable";
import DialogItem from "@/common/dialogItem";

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
      this.basicData = { ...this.$refs.exampleItem.dataObj };
    });
  },
  data() {
    return {
      basicData: {},
      componentPath: "/static/example/mapHeatMap/1.vue",
      exampleSelect: "",
      activeNames: "1",
      exampleCodeDialog: {
        visible: false,
        title: "典型案例的示例代码",
        withFooter: false,
      },
      exampleStrunctDialog: {
        visible: false,
        title: "典型案例的参数数据结构",
        withFooter: true,
      },
      eventDescription: {
        header: [
          {
            prop: "name",
            label: "事件名",
            width: "180",
          },
          {
            prop: "description",
            label: "描述",
            align: "left",
          },
          {
            prop: "param",
            label: "参数",
            width: "180",
          },
        ],
        data: [
          {
            name:"click",
            param:"-",
            description:"当点击时触发该事件"
          }
        ],
      },
      paramDescription: {
        header: [
          {
            prop: "name",
            label: "属性名称",
            width: "180",
          },
          {
            prop: "description",
            label: "描述",
            align: "left",
          },
          {
            prop: "type",
            label: "类型",
            width: "120",
          },
          {
            prop: "option",
            label: "可选值",
            align: "center",
            width: "120",
          },
          {
            prop: "default",
            label: "默认值",
            align: "center",
            width: "120",
          },
          {
            prop: "protocol",
            label: "可选性",
            align: "center",
            width: "120",
          },
        ],
        data: [
          {
            name: "data",
            description: "设置图表数据源,数据源为json数组。",
            type: "array object",
            option: "-",
            default: "-",
            protocol:'required',
          },
        ],
      },
      methodDescription: {
        header: [
          {
            prop: "name",
            label: "方法名称",
            width: "180",
          },
          {
            prop: "description",
            label: "描述",
            align: "left",
          },
          {
            prop: "param",
            label: "参数",
            width: "180",
          },
        ],
        data: [
          {
          	name:'updateData',
          	param: "-",
            description: "更新图表数据。",
          }
        ],
      },
      exampleName: [
        {
          name: "地中海黄金热力图",
          callbackName: "exampleCallback1",
        },
        {
          name: "恢复初始",
          callbackName: "exampleCallback2",
        },
        {
          name: "",
          callbackName: "exampleCallback3",
        },
      ],
    };
  },
  methods: {
  	updateExampleData(data) {
        if (this.$refs.exampleItem && this.$refs.exampleItem.updateData) {
          this.$refs.exampleItem.updateData(data);
        }
      },
    exampleCallback1() {
      var tData = { ...this.basicData };
        tData.map='';
        tData.mapData.center=[34.00, 36.00];
        tData.hotData=[{
            "id": 2951,
            "level_one": "反恐",
            "level_two": "威胁",
            "level_weighting": 2,
            "score": -2,
            "title": "Amazon tells Florida sheriff to pound sand when asked to help solve a crime | Commentary",
            "url": "http://www.orlandosentinel.com/opinion/scott-maxwell-commentary/os-op-amazon-no-help-florida-arrest-scott-maxwell-20200101-y2a6c7qzxzgwlo2u3xw2ivoo4q-story.html",
            "location": "US",
            "time": "2020-01-01 00:00:00",
            "eventCount": -4,
            "level": null,
            "content": null,
            "lon": 1,
            "lat": 2,
            "area": null
          },
          {
            "id": 2955,
            "level_one": "反恐",
            "level_two": "威胁",
            "level_weighting": 2,
            "score": 2,
            "title": "Taiwan Santa Claus project spreads Christmas joy in handwritten cards",
            "url": "http://m.focustaiwan.tw/news/asoc/201912210006.aspx",
            "location": "Taiwan",
            "time": "2020-01-01 00:00:00",
            "eventCount": 4,
            "level": null,
            "content": null,
            "lon": 121,
            "lat": 24,
            "area": null
          },
          {
            "id": 2957,
            "level_one": "反恐",
            "level_two": "威胁",
            "level_weighting": 2,
            "score": -4,
            "title": "‘Iran is not afraid’: Why Tehran dismisses US threats over Iraq",
            "url": "https://www.aljazeera.com/news/2020/01/afraid-analysts-dismiss-threats-iraq-200101172345472.html",
            "location": "Iraq",
            "time": "2020-01-01 00:00:00",
            "eventCount": -8,
            "level": null,
            "content": null,
            "lon": 44,
            "lat": 33,
            "area": null
          },
          {
            "id": 2958,
            "level_one": "反恐",
            "level_two": "威胁",
            "level_weighting": 2,
            "score": -2,
            "title": "Kim Jong Un ends suspension of North Korea nuclear missile testing",
            "url": "https://www.rnz.co.nz/news/world/406558/kim-jong-un-ends-suspension-of-north-korea-nuclear-missile-testing",
            "location": "North Korea",
            "time": "2020-01-01 00:00:00",
            "eventCount": -4,
            "level": null,
            "content": null,
            "lon": 127,
            "lat": 40,
            "area": null
          },
          {
            "id": 2960,
            "level_one": "反恐",
            "level_two": "威胁",
            "level_weighting": 2,
            "score": -4,
            "title": "Indian American Taxi Driver Attacked with Barbecue Pit Pan in Possible Hate Crime",
            "url": "https://www.indiawest.com/news/global_indian/indian-american-taxi-driver-attacked-with-barbecue-pit-pan-in/article_332897a8-2c0b-11ea-b29e-3b984fbb283a.html",
            "location": "India",
            "time": "2020-01-01 00:00:00",
            "eventCount": -8,
            "level": null,
            "content": null,
            "lon": 77,
            "lat": 20,
            "area": null
          },
          {
            "id": 2962,
            "level_one": "反恐",
            "level_two": "威胁",
            "level_weighting": 2,
            "score": -2,
            "title": "Donald Trump On War With Iran: 'I Like Peace, I Don't See That Happening'",
            "url": "https://www.republicworld.com/world-news/us-news/trump-on-war-with-iran-i-like-peace-i-dont-see-that-happening.html",
            "location": "Iran",
            "time": "2020-01-01 00:00:00",
            "eventCount": -4,
            "level": null,
            "content": null,
            "lon": 53,
            "lat": 32,
            "area": null
          },
          {
            "id": 2965,
            "level_one": "反恐",
            "level_two": "威胁",
            "level_weighting": 2,
            "score": -2,
            "title": "As India’s first CDS takes charge, PM Modi says institution reflects hopes and aspirations of 1.3 bn Indians",
            "url": "https://www.timesnownews.com/india/article/as-india-s-first-cds-takes-charge-pm-modi-says-institution-reflects-hopes-and-aspirations-of-1-3-bn-indians/534302",
            "location": "India",
            "time": "2020-01-01 00:00:00",
            "eventCount": -4,
            "level": null,
            "content": null,
            "lon": 77,
            "lat": 20,
            "area": null
          },
          {
            "id": 2967,
            "level_one": "反恐",
            "level_two": "威胁",
            "level_weighting": 2,
            "score": -2,
            "title": "North Korea's Kim warns of 'new strategic weapon' as nuclear freeze falters",
            "url": "https://www.japantimes.co.jp/?post_type=news&p=2400013",
            "location": "North Korea",
            "time": "2020-01-01 00:00:00",
            "eventCount": -4,
            "level": null,
            "content": null,
            "lon": 127,
            "lat": 40,
            "area": null
          },
          {
            "id": 2968,
            "level_one": "反恐",
            "level_two": "威胁",
            "level_weighting": 2,
            "score": 2,
            "title": "Kalgoorlie mother-son duo off to Uganda on mercy mission",
            "url": "https://thewest.com.au/news/kalgoorlie-miner/kalgoorlie-mother-son-duo-off-to-uganda-on-mercy-mission-ng-b881420362z",
            "location": "Uganda",
            "time": "2020-01-01 00:00:00",
            "eventCount": 4,
            "level": null,
            "content": null,
            "lon": 33,
            "lat": 2,
            "area": null
          },
          {
            "id": 2969,
            "level_one": "反恐",
            "level_two": "威胁",
            "level_weighting": 2,
            "score": -4,
            "title": "Israel cements policy of withholding Palestinian bodies",
            "url": "http://www.palestinemonitor.org/details.php?id=l543hna25071yre5zpbiei",
            "location": "Israel",
            "time": "2020-01-01 00:00:00",
            "eventCount": -8,
            "level": null,
            "content": null,
            "lon": 34.75,
            "lat": 31.5,
            "area": null
          },
          {
            "id": 2975,
            "level_one": "反恐",
            "level_two": "威胁",
            "level_weighting": 2,
            "score": -2,
            "title": "750 soldiers with 82nd Airborne headed for CENTCOM, additional 4,000 troops expected to deploy as Iran tensions mount",
            "url": "https://www.militarytimes.com/flashpoints/2020/01/01/750-soldiers-with-82nd-airborne-headed-for-centcom-additional-4000-troops-expected-to-deploy-as-iran-tensions-mount/",
            "location": "Iran",
            "time": "2020-01-01 00:00:00",
            "eventCount": -4,
            "level": null,
            "content": null,
            "lon": 53,
            "lat": 32,
            "area": null
          },
          {
            "id": 2976,
            "level_one": "反恐",
            "level_two": "威胁",
            "level_weighting": 2,
            "score": -2,
            "title": "Turkish Defence Chief Denies Rift With Russia Over Libya",
            "url": "https://www.globalsecurity.org/wmd/library/news/turkey/2019/turkey-191231-sputnik01.htm",
            "location": "Libya",
            "time": "2020-01-01 00:00:00",
            "eventCount": -4,
            "level": null,
            "content": null,
            "lon": 17,
            "lat": 25,
            "area": null
          },
          {
            "id": 2980,
            "level_one": "反恐",
            "level_two": "威胁",
            "level_weighting": 2,
            "score": -1,
            "title": "Leader of North Korea Hints at Resuming Tests :: WRAL.com",
            "url": "https://www.wral.com/north-korea-is-no-longer-bound-by-nuclear-test-moratorium-kim-says/18862037/",
            "location": "North Korea",
            "time": "2020-01-01 00:00:00",
            "eventCount": -2,
            "level": null,
            "content": null,
            "lon": 127,
            "lat": 40,
            "area": null
          }
        ]
         console.log(111111,tData)
        this.updateExampleData(tData);
    },
    exampleCallback2() {
      var tData = {
          map: '',
          mapData: {
            center: [103.00, 36.00],
            zoom: 4,
            minZoom: 2,
            maxZoom: 19,
          },
          hotData: []
        };
      this.updateExampleData(tData);
    },
    exampleCallback3() {
      var tData = { ...this.basicData };
      this.updateExampleData(tData);
    },
    dealSelectExample(v) {
      console.log(v);
      if (v && typeof this[v] === "function") {
        this[v]();
      }
    },
    openDataStrunctDialog() {
      this.$refs.testDialog.show();
    },
    openExampleStrunctDialog() {
      this.$refs.exampleStrunctDialog.show();
    },
    openExampleCodeDialog() {
      this.$refs.exampleCodeDialog.show();
    },
    dealOpenDialog(name) {
      if (name === "testDialog") {
        this.$refs.exampleViewerItem.code = beautify(
          JSON.stringify(this.$refs.exampleItem.dataObj),
          opts
        );
      } else if (name === "exampleStrunctDialog") {
        this.$refs.exampleStructItem.code = beautify(
          JSON.stringify(this.$refs.exampleItem.dataObj),
          opts
        );
      } else {
      }
    },
    dealConfirmDialog() {
      var code = this.$refs.exampleStructItem.code;
//    console.log(code);
      try {
        this.updateExampleData(JSON.parse(code));
        // this.$refs.exampleTest.$forceUpdate();
        this.exampleSelect = "";
      } catch (e) {
        console.log(e);
      }
    },
    dealSelectionChange(val) {},
  },
};
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
