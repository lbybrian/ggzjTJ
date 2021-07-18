<template>
  <div  class="chartArea" ref="chartItem">应该在这：
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

      // this.updateData(this.dataInfo);
    console.log(d3,fishbone,typeof datajson)
    	this.$nextTick(function() {
    		var tData = this.dataObj || this.dataInfo;
    		this.updateData(tData);
    	});
  },
  methods: {
    updateData(datas){
          console.log(111111111111111,datas.name,typeof fishbone)
      // if(datas.name){
        var fishbone = d3.fishbone()
          console.log(222222222222222,typeof fishbone,fishbone)
        // d3.json(datajson, function(data){
        d3.json("./data.json", function(err,data){
        // d3.json("http://127.0.0.1:8081/data.json", function(data){

      console.log(3333333333333,data,typeof datajson)
          // the most reliable way to get the screen size
          var size = (function(){
              return {width: this.clientWidth, height: this.clientHeight};
              }).bind(window.document.documentElement),
          svg = d3.select(".chartArea")
          // svg = d3.select("body")
            .append("svg")
            .attr(size())
            // .datum(data)
            .datum(datajson)
            .call(fishbone.defaultArrow)
            .call(fishbone);
      console.log(44444444444)
      //   // this.changeData()
        fishbone.force().start();
        console.log(88888888888)
        // d3.select(window).on("resize", function(){
        //   fishbone.force()
        //     .size([size().width, size().height])
        //     .start();
        //   svg.attr(size())
        // });
        })
        // }).header("content-type", "Access-Control-Allow-Origin:*");
        // }).header("content-type", "Access-Control-Allow-Origin:http://localhost:8081");
        console.log(9999999999)
      // }
    },

    changeData(){
        fishbone.force().start();
      console.log(55555555555)
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
.label-0{ font-size: 1em; }
.label-1{ font-size: .5em; fill: #111; }
.label-2{ font-size: .5em; fill: #444; }
.label-3{ font-size: .4em; fill: #888; }
.label-4{ font-size: .4em; fill: #aaa; }
.link-0{ stroke: #000; stroke-width: 2px}
.link-1{ stroke: #333; stroke-width: 1px}
.link-2, .link-3, .link-4{ stroke: #666; stroke-width: .5px; }

</style>
