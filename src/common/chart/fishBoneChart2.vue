<template>
  <div id="content" class="chartArea" style="width:100%">
    <br/>
    <canvas id="canvas" ref="canvas" style="background-color: rgb(238, 238, 238);width:1000px;height:600px"></canvas>
  </div>
</template>

<script>
  export default {
    name: 'Jtopo',
    props: {
      dataObj: Object,
    },
    mounted () {
      console.log(22222222222,this.dataObj)
      this.initTopo()
    },
    methods: {
      initTopo () {
        let canvas = this.$refs.canvas
        if(this.dataObj){
          let mfb = new MakFishBone(canvas, {data: this.dataObj})
          mfb.start()
        }
      }
    }
  }
</script>
