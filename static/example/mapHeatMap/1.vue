<template>
  <div>
  	<MapHeatMap
  		:dataObj="dataObj"
      ref="exampleTestItem"
      >
      </MapHeatMap>
  </div>
</template>

<script>
import MapHeatMap from "@/common/mapHeatMap";
export default {
  name: '',
  data() {
    return {
      dataObj: {
          map: '',
          mapData: {
            center: [103.00, 36.00],
            zoom: 4,
            minZoom: 2,
            maxZoom: 19,
          },
          hotData: []
        },
    }
  },
	components: {
		MapHeatMap,
	},
	methods: {
    updateData(data) {
      this.$refs.exampleTestItem.updateData(data);
    },
  },
}
</script>
