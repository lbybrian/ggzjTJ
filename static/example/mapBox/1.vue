<template>
  <div>
    <MapBox :cssType="cssType" ref="exampleTestItem"></MapBox>
  </div>
</template>

<script>
import MapBox from '@/common/mapBox'

export default {
  name: 'mapbox',
  components: {
    MapBox,
  },
  data() {
    return {
      cssType: {
        width: '100%',
        height: '600px',
      },
      mapData: {
        geojson: [
          {
            description: '航空母舰XX0001',
            time: '2019-07-10  08:35:20',
            coordinates: [130.28, 20.54],
          },
          {
            description: '航空母舰XX0002',
            time: '2019-07-10  08:30:20',
            coordinates: [128.88, 25.54],
          },
          {
            description: '航空母舰XX0003',
            time: '2019-07-10  08:35:20',
            coordinates: [125.28, 30.54],
          },
        ],
        pointsVisibility:'visible',
        lineSvisibility:'visible',
        zoom:4,
        center:[121.4333, 34.5]
      },
    }
  },
  mounted() {
    this.$nextTick(function () {
      this.updateData()
    })
  },
  methods: {
    //数据更新
    updateData() {
      this.$nextTick(function() {
        this.$refs.exampleTestItem.dataUpdate(this.mapData)
      })
    },
  },
}
</script>

<style scoped>
.mapboxgl-popup {
  max-width: 400px;
  font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
}
</style>
