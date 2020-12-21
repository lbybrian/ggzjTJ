<template>
  <div>
  	<WordCloud
  		:dataObj="dataObj"
      ref="exampleTestItem"
      >
      </WordCloud>
  </div>
</template>

<script>

export default {
  name: '',
  data(){
  	return {
  		dataObj:{
        withSelection: true,
        withIndex: true,
  			data:[
  				{imageMask:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=144259653,1738085311&fm=26&gp=0.jpg'},
  				{imageMask:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3183640937,1982156122&fm=26&gp=0.jpg'},
  				{imageMask:'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*07tdTIOmvlYAAAAAAAAAAABkARQnAQ'},
//				imageMask='https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*07tdTIOmvlYAAAAAAAAAAABkARQnAQ';
//					imageMask='https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=101783654,3333647477&fm=26&gp=0.jpg';
//					imageMask='https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3229398837,545051938&fm=26&gp=0.jpg';
//					imageMask='https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1411775707,1369726493&fm=26&gp=0.jpg';
					
//					imageMask='https://gw.alipayobjects.com/os/antvdemo/assets/data/antv-keywords.json';
  			]
  		}
  	}
  },
	components: {
    WordCloud: () => import("@/common/wordCloud"),
	},
	beforeMount(){},
	mounted() {
		console.log(11111111111)
	}
}
</script>
