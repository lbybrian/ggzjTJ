<template>
    <FunnelChart
       style="height: 450px"
      :dataObj="dataObj"
      ref="exampleTestItem"
    ></FunnelChart>
</template>
<script>
import FunnelChart from "@/common/chart/funnelChart";
export default {
    components:{
        FunnelChart,
    },
    data(){
        return{
            dataObj:{
                name:"漏斗图",
                color:['#1890ff','#2fc25b','#facc14','#223273','#8543e0','#13c2c2'],
                data:[
                    {
                        value: 60, 
                        name: '访问'
                    },
                    {
                        value: 40, 
                        name: '咨询'
                    },
                    {
                        value: 20,
                        name: '订单'
                    },
                    {
                        value: 80, 
                        name: '点击'
                    },
                    {
                        value: 100, 
                        name: '展现'
                    }
                ],
                       
            }
        }
    },
     methods: {
        updateData(data) {
        this.dataObj = data;
        this.$refs.exampleTestItem.updateData(this.dataObj);
    },
  },
}
</script>
<style scoped>
* {
  box-sizing: border-box;
}
</style>