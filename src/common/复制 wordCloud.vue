<template>
  <div >
    <div id="container" ref="container"></div>
  </div>
</template>

<script>
import { WordCloud } from '@antv/g2plot';
	
export default {
  name: "",
  props: {
    dataObj: Object,
  },
  data() {
    return {
      dataInfo: {
  			changeSign:false,
				dataUrl:'https://gw.alipayobjects.com/os/antvdemo/assets/data/antv-keywords.json',
				imageMask:'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*07tdTIOmvlYAAAAAAAAAAABkARQnAQ',
				wordField:'name',
				weightField:'value',
				colorField:'name',
				interactions:[{ type: 'element-active' }],
				state:{
					active: {// 这里可以设置 active 时的样式
	          style: {
	            lineWidth: 3,
	          },
					}
	  		},
	  		wordStyle:{
					fontFamily: 'Verdana',
					fontSize: [8, 32],
				},
  	}
  	}
  },
//watch: {
//		dataInfo:{
//					handler(newValue, oldValue) {
//	//					this.dataInfo.data=newValue.data
//	//					this.dataInfo.imageMask=newValue.imageMask
//							this.dataInfo=newValue
//						console.log('newValue',newValue)
//					},
//					deep: true,
//	        immediate: true,
//		},
//},
	mounted() {
		this.$nextTick(function () {
      var tData = this.dataObj || this.dataInfo;
      this.updateData(tData);
    });
  
//this.showCloud(this.dataInfo)
  
//		this.showCloud('https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*07tdTIOmvlYAAAAAAAAAAABkARQnAQ')
//this.showCloud({imageMask:'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*07tdTIOmvlYAAAAAAAAAAABkARQnAQ',data:'https://gw.alipayobjects.com/os/antvdemo/assets/data/antv-keywords.json'})
//if(){}
//console.log('JJJJJJJJJJJJJJJJJJJJJJJJJJJJ');
		
	},
//beforeMount() {
//  if (this.dataObj) {
//    this.dataInfo = this.dataObj;
////    console.log('有了',this.dataObj)
//  }
//  else{
//this.dataInfo={imageMask:'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*07tdTIOmvlYAAAAAAAAAAABkARQnAQ',data:'https://gw.alipayobjects.com/os/antvdemo/assets/data/antv-keywords.json'}
////  	
//  }
//},
  methods: {
  	//参数一：图形形状图片地址。参数二：JSON数据地址
  	showCloud(dat){
			fetch(dat.dataUrl)
				.then((res) => res.json())
				.then((data) => {
					dat.data=data
					const wordCloud = new WordCloud('container',dat);
					if(dat.changeSign){
						wordCloud.render();
					}else{
						wordCloud.update();
					}
			});
	},
	updateData(newObj) {
    this._updateData(newObj);
    
			fetch(newObj.dataUrl)
				.then((res) => res.json())
				.then((data) => {
					newObj.data=data
					const wordCloud = new WordCloud('container',newObj);
					wordCloud.update(newObj);
			});
    },
    _updateData(newObj) {
      for (var k in newObj) {
        this.$set(this.dataInfo, k, newObj[k]);
      }
    },
//  updateData(newObj) {
////  	console.log('到这了111',newObj)
////			this.isShow = false;
////			this.dataInfo={}
//				this.dataInfo.imageMask=newObj
////    this.showCloud()
////    this.$nextTick(()=>{
//////  	console.log('到这了222')
//////      this._updateData(newObj);
////				this.dataInfo.imageMask=newObj;
//				this.showCloud();
////				this.isShow = true;
////    });
//  },
//  _updateData(newObj) {
//    for (var k in newObj) {
////      this.$set(this.dataInfo.data, k, newObj[k]);
//      this.$set(this.dataInfo.imageMask, k, newObj[k]);
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
