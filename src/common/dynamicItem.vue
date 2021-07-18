<template>
  <div class="componentArea">
    <slot v-if="inited">
      <component v-if="!dataInfo.keepAlive" :is="dataInfo.current" :dataObj="dataInfo.data"></component>
      <keep-alive v-else>
        <component v-if="!dataInfo.keepAlive" :is="dataInfo.current" :dataObj="dataInfo.data"></component>
      </keep-alive>
    </slot>
  </div>
</template>
<script>
  var tData = ComArray;
  var componentItems = {};
  for (var i = 0; i < tData.length; i++) {
    var item = tData[i];
    componentItems[item.name] = require(`@/${item.component}.vue`).default;
  }

  export default {
    name: "",
    components: componentItems,
    created() {
      this.dataInfo.name = this.comName || this.dataInfo.name;
      this.dataInfo.data = this.dataObj || this.dataInfo.data;
      this.inited = true;
    },
    data() {
      return {
        inited: false,
        list: tData,
        dataInfo: {
          keepAlive: false,
          current: "dataTable",
          data: {}
        }
      };
    },
    methods: {
      swtichComponent(name, data) {
        this.dataInfo.current = name;
        this.dataInfo.data = data;
      }
    },
    props: {
      comName: String,
      dataObj: Object
    },
  };

</script>

<style scoped>
  .componentArea {
    width: 100%;
    height: 100%;
    box-shadow: 1px 1px 1px #888888;
  }

</style>
