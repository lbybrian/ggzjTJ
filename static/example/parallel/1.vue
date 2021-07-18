<!-- 平行坐标系 -->
<template>
<div class='parallel'>
    <Parallel :dataObj="dataObj" ref="exampleTestItem"/>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import  Parallel  from '@/common/parallel';

export default {
    name: 'parallel',
//import引入的组件需要注入到对象中才能使用
components: {
    Parallel
},
data() {
//这里存放数据
return {
    dataObj:{
         parallelAxis: [
        {dim: 0, name: 'Price'},
        {dim: 1, name: 'Net Weight'},
        {dim: 2, name: 'Amount'},
        {
            dim: 3,
            name: 'Score',
            type: 'category',
            data: ['Excellent', 'Good', 'OK', 'Bad']
        }
    ],
    series: {
        type: 'parallel',
        lineStyle: {
            width: 4
        },
        data: [
            [12.99, 100, 82, 'Good'],
            [9.99, 80, 77, 'OK'],
            [20, 120, 60, 'Excellent']
        ]
    }
       
    }
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    updateData (data) {
      this.dataObj = data;
      this.$refs.exampleTestItem.updateData(this.dataObj);
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
<style  scoped>

</style>