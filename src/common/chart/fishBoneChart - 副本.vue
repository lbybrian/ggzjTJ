<template>
  <div  class="chartArea" ref="chartItem">应该在这：</div>
</template>

<!-- <script src="http://cdnjs.cloudflare.com/ajax/libs/d3/3.4.1/d3.min.js" charset="utf-8"></script> -->
<!-- <script src="./d3.fishbone.js"></script> -->
<script type="module">
// 引入基本模板
// import d3 from 'd3/dist/d3.min.js';
import * as d3 from 'd3';
// import d3 from 'd3';
// require("http://cdnjs.cloudflare.com/ajax/libs/d3/3.4.1/d3.min.js");
// const d3 = require("d3/dist/d3.js");
// require("./d3.fishbone.js");
import fishbone from './d3.fishbone.js'
// import datas from './data.json'

export default {
  name: "",
  props: {
    dataObj: Object,
  },
  data() {
    return {
        dataInfo: {
          "name": "Quality---111111",
          "children": [{
              "name": "Machine---1",
              "children": [{
                  "name": "Mill"
                },
                {
                  "name": "Mixer"
                },
                {
                  "name": "Metal Lathe"
                }
              ]
            },
            {
              "name": "Method---2"
            },
            {
              "name": "Material---1-3",
              "children": [{
                  "name": "Masonite"
                },
                {
                  "name": "Marscapone",
                  "children": [{
                      "name": "Malty"
                    },
                    {
                      "name": "Minty",
                      "children": [{
                          "name": "spearMint"
                        },
                        {
                          "name": "pepperMint"
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "Meat",
                  "children": [{
                    "name": "Mutton"
                  }]
                }
              ]
            },
            {
              "name": "Man Power---4",
              "children": [{
                  "name": "Manager"
                },
                {
                  "name": "Master's Student"
                },
                {
                  "name": "Magician"
                },
                {
                  "name": "Miner"
                },
                {
                  "name": "Magister",
                  "children": [{
                    "name": "Malpractice"
                  }]
                },
                {
                  "name": "Massage Artist",
                  "children": [{
                      "name": "Masseur"
                    },
                    {
                      "name": "Masseuse"
                    }
                  ]
                }
              ]
            },
            {
              "name": "Measurement---5",
              "children": [{
                "name": "Malleability"
              }]
            },
            {
              "name": "Milieu---6",
              "children": [{
                "name": "Marine"
              }]
            }
          ]
        }
      }
  },
  mounted() {
    console.log(77777777777,fishbone)
      console.log(3333333333333)
    	// this.$nextTick(function() {
        console.log(55555555555)
    		var tData = this.dataObj || this.dataInfo;
    		this.updateData(tData);
        console.log(666666666)
    	// });
      // this.updateData(this.dataInfo);
      console.log(44444444444)
  },
  methods: {
    updateData(datas){
      if(fishbone){
          console.log(111111111111111)
        var fishbone =d3.fishbone()
          this.changeData()
        // d3.json(JSON.stringfy(JSON.parse(datas)), function(data){

        console.log(99999999999999999)
      }
    },
    changeData(){
      d3.json("./data.json", function(data){
        console.log(222222222222222,data)
        // the most reliable way to get the screen size
        var size = (function(){
            return {width: this.clientWidth, height: this.clientHeight};
            }).bind(window.document.documentElement),
          // }).bind(window.document.querySelector(".chartArea")),

       svg = d3.select(".chartArea")
          .append("svg")
          // firefox needs a real size
          .attr(size())
          // // set the data so the reusable chart can find it
          .datum(data)
          // // set up the default arrowhead
          .call(fishbone.defaultArrow)
          // // call the selection modifier
          .call(fishbone);

        // this is the actual `force`: just start it
        fishbone.force().start();

        // handle resizing the window
        d3.select(window).on("resize", function(){
          fishbone.force()
            .size([size().width, size().height])
            .start();
          svg.attr(size())
        });
      })
    }
  },
};
</script>

<style scoped>
/* @import url("./style.css"); */
.chartArea {
  height: 100%;
  min-height: 200px;
}

html, body{ margin: 0; padding: 0; overflow: hidden;}
*{ font-family: "Gill Sans", "Gill Sans MT"; }
.label-0{ font-size: 2em; }
.label-1{ font-size: 1.5em; fill: #111; }
.label-2{ font-size: 1em; fill: #444; }
.label-3{ font-size: .9em; fill: #888; }
.label-4{ font-size: .8em; fill: #aaa; }
.link-0{ stroke: #000; stroke-width: 2px}
.link-1{ stroke: #333; stroke-width: 1px}
.link-2, .link-3, .link-4{ stroke: #666; stroke-width: .5px; }

</style>
