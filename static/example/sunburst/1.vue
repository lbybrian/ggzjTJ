<template>
  <div>
    <Sunburst :dataObj="dataObj" ref="exampleTestItem">
    </Sunburst>
  </div>
</template>

<script>
import Sunburst from "@/common/sunburst";
export default {
  name: 'sunburst',
  mounted () {
  },
  data () {
    return {
      dataObj: {
        title: "旭日图",
        color:['#FFAE57', '#FF7853', '#EA5151', '#CC3F57', '#9A2555'],
        data: [
          {
            name: 'A',
            value: 10,
            itemStyle: {
              color: '#55aa00'
            },
            // 父级的value是children里value的总和
            children: [{
              value: 3,
              name: 'Ab',
              itemStyle: {
                color: '#ff0000'
              },
            }, {
              value: 5,
              name: 'Aa',
              itemStyle: {
                color: '#5500ff'
              }
            }, {
              value: 2,
              name: 'Ac',
              itemStyle: {
                color: '#ffff00'
              }
            }]
          }, {
            name: 'B',
            itemStyle: {
              color: 'blue'
            },
            children: [{
              name: 'Ba',
              value: 4
            }, {
              name: 'Bb',
              value: 2
            }]
          }, {
            name: 'C',
            value: 8,
            itemStyle: {
              color: 'violet'
            },
            children: [{
              name: 'Ca',
              value: 4,
              itemStyle: {
                color: '#55ffff'
              },
            }, {
              name: 'Cb',
              value: 2,
              itemStyle: {
                color: '#aaff00'
              },
            }, {
              name: 'Cf',
              value: 2,
              itemStyle: {
                color: '#00ff00'
              },
            }]
          }
]
      },
    }
  },
  components: {
    Sunburst,
  },
  methods: {
    updateData (data) {
      this.dataObj = data;
      this.$refs.exampleTestItem.updateData(this.dataObj);
    },
  },
}

</script>
