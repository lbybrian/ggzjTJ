<template>
  <div>
    <olGisMap :cssType="cssType"
              ref="exampleTestItem"></olGisMap>
  </div>
</template>

<script>
import olGisMap from '@/common/olGisMap'

export default {
  name: 'olgismap',
  components: {
    olGisMap,
  },
  data () {
    return {
      cssType: {
        width: '100%',
        height: '400px',
      },
      mapData: {
        geojson: [{
          type: 'point',//地图的展示类型
          features: [
            {
              coordinates: [116.382422, 39.898995],//坐标
              title: '首都北京',//标题
              description: '北京：中国的政治中心。',//描述
              color: "red",
            },
            {
              coordinates: [121.496871, 31.210857],
              title: '经济中心上海',
              description: '上海：中国经济中心。',
              color: "blue",
            },
            {
              coordinates: [114.091959, 22.643352],
              title: '经济特区深圳',
              description: '深圳：中国经济特区。',
              color: "orange",
            },
          ]
        }],
        center: [103.00, 36.00],
        zoom: 4,
        minZoom: 2,
        maxZoom: 19,
      },
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.updateData()
    })
  },
  methods: {
    //数据更新
    updateData () {
      this.$nextTick(function () {
        this.$refs.exampleTestItem.dataUpdate(this.mapData)
      })
    },
  },
}
</script>

<style scoped>
.mapboxgl-popup {
  max-width: 400px;
  font: 12px/20px "Helvetica Neue", Arial, Helvetica, sans-serif;
}
</style>
