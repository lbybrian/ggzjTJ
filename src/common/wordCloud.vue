<template>
  <div >
    <div id="container"></div>
  </div>
</template>

<script>
import { WordCloud } from '@antv/g2plot';
	
export default {
  name: "",
  beforeMount() {
    if (this.dataObj) {
      this.dataInfo = this.dataObj;
//    console.log('有了',this.dataInfo)
    }
  },
  props: {
    dataObj: Object,
  },
  data() {
    return {
  		datas:[],
  		datasShow:{},
      isShow: true,
//    dataInfo: {
//      withSelection: true,
//      withIndex: true,
////      data:[
////				{imageMask:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=144259653,1738085311&fm=26&gp=0.jpg'},
////				{imageMask:'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*07tdTIOmvlYAAAAAAAAAAABkARQnAQ'},
////				{imageMask:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3183640937,1982156122&fm=26&gp=0.jpg'},
////			]
//    },
    
  	};
  },
  watch: {},
	mounted() {
//		this.showCloud('https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*07tdTIOmvlYAAAAAAAAAAABkARQnAQ')
	},
  methods: {
  	showCloud(hehe){
		fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/antv-keywords.json')
//		fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/world-population.json')
			.then((res) => res.json())
			.then((data) => {
				this.datas=data
//console.log(this.datas)
				this.datas.map(i=>{
//					console.log(i.name)
					this.datasShow.data=this.datas;
					this.datasShow.wordField='name',
					//this.datasShow.wordField=i.name,
					this.datasShow.weightField='value';
					this.datasShow.colorField='name';
				}),
				this.datasShow.imageMask=hehe
//				imageMask='https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=144259653,1738085311&fm=26&gp=0.jpg';
				
				this.datasShow.wordStyle={
								fontFamily: 'Verdana',
								fontSize: [8, 32],
						};
				const wordCloud = new WordCloud('container', this.datasShow);
				wordCloud.render();
			});
	},
//  updateData(newObj) {
////  	console.log('到这了111')
//    this.isShow = false;
//    this.showCloud()
//    this.$nextTick(function () {
////  	console.log('到这了222')
//      this._updateData(newObj);
//				this.showCloud(newObj);
//				this.isShow = true;
//    });
//  },
//  _updateData(newObj) {
//    for (var k in newObj) {
//      this.$set(this.dataInfo.data, k, newObj[k]);
//    }
//  },
//  clearSelection() {
//    this.tableItem.clearSelection();
//  },
//  setCurrentRow(row) {
//    this.tableItem.setCurrentRow(row);
//  },
//  toggleRowSelection(row, selected) {
//    this.tableItem.toggleRowSelection(row, selected);
//  },
//  clearSort() {
//    this.tableItem.clearSort();
//  },
//  handleSelectionChange(val) {
//    this.dataInfo.selected = val;
//    this.$emit("selection-change", val);
//  },
//  dealSizeChange(val) {
//    this.dataInfo.page.size = val;
//    this.dataInfo.page.current = 1;
//    this.$emit("size-change", this.dataInfo.page.current || 1, val);
//  },
//  dealPageChange(val) {
//    this.dataInfo.page.current = val;
//    this.$emit("page-change", val, this.dataInfo.page.size);
//  },
//  dealCellClick(row, column, cell, event) {
//    this.$emit("cell-click", row, column, cell, event);
//  },
//  dealClickButton(eventName, row, index) {
//    this.$emit("button-click", eventName, row, index);
//  },
//  dealSortChange(param) {
//    this.$emit("sort-change", param);
//  },
  },
  created() {},
};
</script>

<style scoped>
.containerArea {
  width: 100%;
  height: 100%;
}

/deep/ .el-pagination {
  padding-left: 0px;
}
</style>
