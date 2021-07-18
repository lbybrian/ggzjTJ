<template>
  <div  class="chartArea" ref="chartItem">
  </div>
</template>

<!-- <script src="http://cdnjs.cloudflare.com/ajax/libs/d3/3.4.1/d3.min.js" charset="utf-8"></script> -->
<!-- <script src="./d3.fishbone.js"></script> -->

<script type="module">
import * as d3 from 'd3';
import fishbone from  './d3.fishbone.js'
import datajson from './data.json'

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
    // const s = document.createElement('script');
    //   s.type = 'text/javascript';
    //   s.src = './d3.fishbone.js';
    //   document.body.appendChild(s);

    	this.$nextTick(function() {
    		var tData = this.dataObj || this.dataInfo;
    		this.updateData(tData);
    	});
    console.log(d3,fishbone,typeof datajson)
  },
  methods: {
    updateData(datas){
          console.log(111111111111111,datas.name,typeof fishbone)
        var fishbone = d3.fishbone()
          console.log(222222222222222,typeof fishbone,fishbone)
        d3.json(datas, ()=>{
      console.log(3333333333333,datas,typeof datajson)
          var size = (function(){
              return {width: this.clientWidth, height: this.clientHeight};
              }).bind(window.document.documentElement),
          svg = d3.select(".chartArea")
            .append("svg")
            .attr(size())
            .datum(datas)
            .call(fishbone.defaultArrow)
            .call(fishbone);
      console.log(44444444444)
        fishbone.force().start();
        })
        console.log(55555555)
    },
    changeData(){}
  },
};
</script>

<style scoped>
/* @import url("./style.css"); */
.chartArea {
 height: 100%;
  min-height: 200px;
}

/* html, body{ margin: 0; padding: 0; overflow: hidden;} */
/* *{ font-family: "Gill Sans", "Gill Sans MT"; } */
/* .label-0{ font-size: 1em; }
.label-1{ font-size: .5em; fill: #111; }
.label-2{ font-size: .5em; fill: #444; }
.label-3{ font-size: .4em; fill: #888; }
.label-4{ font-size: .4em; fill: #aaa; }
.link-0{ stroke: #000; stroke-width: 2px}
.link-1{ stroke: #333; stroke-width: 1px}
.link-2, .link-3, .link-4{ stroke: #666; stroke-width: .5px; } */

/* .label-0{ font-size: 2em; }
.label-1{ font-size: 1.5em; fill: #111; }
.label-2{ font-size: 1em; fill: #444; }
.label-3{ font-size: .9em; fill: #888; }
.label-4{ font-size: .8em; fill: #aaa; }

.link-0{ stroke: #000; stroke-width: 2px}
.link-1{ stroke: #333; stroke-width: 1px}
.link-2, .link-3, .link-4{ stroke: #666; stroke -width: .5px; } */
</style>
