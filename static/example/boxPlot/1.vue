<!-- 盒须图 -->
<template>
<div class='boxplot'>
     <BoxPlot :dataObj="dataObj" ref="exampleTestItem"/>
</div>

</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import  BoxPlot  from '@/common/boxPlot';

export default {
    name: 'boxplot',
//import引入的组件需要注入到对象中才能使用
components: {
    BoxPlot
},
data() {
//这里存放数据
return {
        dataObj:{
            title: [{
                        text: 'Michelson-Morley Experiment',
                        left: 'center',
                        top: 50
                    }, 
                    {
                        text: 'upper: Q3 + 1.5 * IQR \nlower: Q1 - 1.5 * IQR',
                        borderColor: '#999',
                        borderWidth: 1,
                        textStyle: {
                            fontWeight: 'normal',
                            fontSize: 14,
                            lineHeight: 20
                    },
                        left: '10%',
                        top: '90%'
                    }],
            dataset: [{
                source: [
                    [850, 740, 900, 1070, 930, 850, 950, 980, 980, 880, 1000, 980, 930, 650, 760, 810, 1000, 1000, 960, 960],
                    [960, 940, 960, 940, 880, 800, 850, 880, 900, 840, 830, 790, 810, 880, 880, 830, 800, 790, 760, 800],
                    [880, 880, 880, 860, 720, 720, 620, 860, 970, 950, 880, 910, 850, 870, 840, 840, 850, 840, 840, 840],
                    [890, 810, 810, 820, 800, 770, 760, 740, 750, 760, 910, 920, 890, 860, 880, 720, 840, 850, 850, 780],
                    [890, 840, 780, 810, 760, 810, 790, 810, 820, 850, 870, 870, 810, 740, 810, 940, 950, 800, 810, 870]
                ]
            }, 
            {
                transform: {
                    type: 'boxplot',
                    config: { itemNameFormatter: 'expr {value}' }
                }
            }, 
            {
                fromDatasetIndex: 1,
                fromTransformResult: 1
            }
            ],
            tooltip: {
                trigger: 'item',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                top:'20%',
                left: '10%',
                right: '10%',
                bottom: '15%'
            },
            xAxis: {
                type: 'category',
                boundaryGap: true,
                nameGap: 30,
                splitArea: {
                    show: true
                },
                splitLine: {
                    show: false
                }
            },
            yAxis: {
                type: 'value',
                name: 'km/s minus 299,000',
                splitArea: {
                    show: false
                }
            },
            series: [
                {
                    name: 'boxplot',
                    type: 'boxplot',
                    datasetIndex: 1,
                },
                {
                    name: 'outlier',
                    type: 'scatter',
                    datasetIndex: 2,
                }
            ]
    },
      }
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {
},
//方法集合
methods: {
    updateData(data) {
        this.dataObj = data;
        this.$nextTick(function(){
            this.$refs.exampleTestItem.updateData(this.dataObj);
        });
    },
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style>
* {
  box-sizing: border-box;
}
</style>