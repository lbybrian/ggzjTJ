<template>
  <div>
    <TimeLine :dataObj="dataObj" ref="exampleTestItem">
    </TimeLine>
  </div>
</template>

<script>
  import TimeLine from "@/common/timeLine";
  export default {
    name: '',
    data() {
      return {
        dataObj: {
            showSign:false,
            leftButton: false,
            rightButton: false,
            width: 0,
            middleWidth: 360,
            boxWidth: 490,
            N: 3,
            divUlWidth: '0px',
            divUlMarginLeft: '0px',
            detailList:[],
          list: [{
              time: '2012/12/12',
              title: '《Palantir技术探秘》《Palantir技术探秘》《Palantir技术探秘》',
              others:['测试数据11',{ces:'测试数据22',value: '95%',name: '环球网'}],
            },
            {
              time: '2013/12/12',
              title: '《Palantir技术探秘2》《Palantir技术探秘2》《Palantir技术探秘2》',
              others:['测试数据11'],
            },
            {
              time: '2014/12/12',
              title: '《Palantir技术探秘2》《Palantir技术探秘2》《Palantir技术探秘2》',
              others:['测试数据11',{value: '43%',name: '环球网2',ces:'测试数据22'}],
            },
            {
              time: '2015/12/12',
              title: '《Palantir技术探秘2》《Palantir技术探秘2》《Palantir技术探秘2》',
              others:[{name: '环球网2',value: '54%'}],
            },
            {
              time: '2016/12/12',
              title: '《Palantir技术探秘2》《Palantir技术探秘2》《Palantir技术探秘2》',
              others:['测试数据22',{name: '环球网2',value: '24%'}],
            },
            {
              time: '2017/12/12',
              title: '《Palantir技术探秘2》《Palantir技术探秘2》《Palantir技术探秘2》',
              others:[{name: '环球网2',value: '67%'}],
            },
            {
                time: '2012/12/12',
                title: '《Palantir技术探秘》《Palantir技术探秘》《Palantir技术探秘》',
                others:[{ces:'测试数据22',value: '95%',name: '环球网'}],
              },
              {
                time: '2013/12/12',
                title: '《Palantir技术探秘2》《Palantir技术探秘2》《Palantir技术探秘2》',
                others:[{value: '21%',name: '环球网2',ces:'测试数据22'}],
              },
              {
                time: '2014/12/12',
                title: '《Palantir技术探秘2》《Palantir技术探秘2》《Palantir技术探秘2》',
                others:['测试数据11'],
              },
              {
                time: '2015/12/12',
                title: '《Palantir技术探秘2》《Palantir技术探秘2》《Palantir技术探秘2》',
                others:[{name: '环球网2',value: '54%'}],
              },
              {
                time: '2016/12/12',
                title: '《Palantir技术探秘2》《Palantir技术探秘2》《Palantir技术探秘2》',
                others:['测试数据22',{name: '环球网2',value: '24%'}],
              },
              {
                time: '2017/12/12',
                title: '《Palantir技术探秘2》《Palantir技术探秘2》《Palantir技术探秘2》',
                others:[{name: '环球网2',value: '67%'}],
              },
              {
                  time: '2012/12/12',
                  title: '《Palantir技术探秘》《Palantir技术探秘》《Palantir技术探秘》',
                  others:['测试数据11'],
                },
                {
                  time: '2013/12/12',
                  title: '《Palantir技术探秘2》《Palantir技术探秘2》《Palantir技术探秘2》',
                  others:[{value: '21%',name: '环球网2',ces:'测试数据22'}],
                },
                {
                  time: '2014/12/12',
                  title: '《Palantir技术探秘2》《Palantir技术探秘2》《Palantir技术探秘2》',
                  others:['测试数据11',{value: '43%',name: '环球网2',ces:'测试数据22'}],
                },
                {
                  time: '2015/12/12',
                  title: '《Palantir技术探秘2》《Palantir技术探秘2》《Palantir技术探秘2》',
                  others:[{name: '环球网2',value: '54%'}],
                },
                {
                  time: '2016/12/12',
                  title: '《Palantir技术探秘2》《Palantir技术探秘2》《Palantir技术探秘2》',
                  others:['测试数据22'],
                },
                {
                  time: '2017/12/12',
                  title: '《Palantir技术探秘2》《Palantir技术探秘2》《Palantir技术探秘2》',
                  others:[{name: '环球网2',value: '67%'}],
                }
          ]
        }
      }
    },
    components: {
      TimeLine,
    },
    created() {},
    mounted() {},
    methods: {
      updateData(data) {
        console.log(1111111111111111,data)
        // if(data.detailList){

        // }
        this.$refs.exampleTestItem.updateData(data);
      },
    },
  }
</script>
