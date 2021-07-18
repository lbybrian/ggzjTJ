<template>
  <div>
    <Tree ref="exampleTree" :dataObj="dataObj" @nodeClick='nodeClick' @nodeCheck="nodecheck" @appendNodeSubmit="appendNodeSubmit" @editNodeSubmit="editNodeSubmit" @removeNode="removeNode" @appendNode="appendNode" @editNode="editNode"></Tree>
  </div>
</template>

<script>
import Tree from '@/common/tree'

export default {
  name: '',
  components: {
    Tree,
  },
  data() {
    return {
      dataObj: {
        nodeKey: 'id', //唯一标识
        tree: [
          {
            id: 1,
            label: '一级 1',
            count: 10,
            children: [
              {
                id: 4,
                label: '二级 1-1',
                count: 10,
                children: [
                  {
                    id: 9,
                    label: '三级 1-1-1',
                    count: 3,
                  },
                  {
                    id: 10,
                    label: '三级 1-1-2',
                    count: 7,
                  },
                ],
              },
            ],
          },
          {
            id: 2,
            label: '一级 2',
            count: 10,
            children: [
              {
                id: 5,
                label: '二级 2-1',
                count: 8,
              },
              {
                id: 6,
                label: '二级 2-2',
                count: 2,
              },
            ],
          },
          {
            id: 3,
            label: '一级 3',
            children: [
              {
                id: 25,
                label: '二级 32-1',
              },
            ],
          },
        ],
        expandClickNode: false, //点击节点展开与否
        accordion: false, //是否手风琴模式
        highlightCurrent: false, //当前选择是否高亮
        treeIndent: 16, //水平缩进
        treeShowCheckbox: false, //是否复选
        treeCheckStrictly: false, //是否严格的遵循父子不互相关联的做法,配合treeShowCheckbox(复选)实现单选
        editable: false, //可否编辑
        collect: false, //是否展示统计，
        hideParentCheckBox: true, //在显示复选框的情况下，父级是否不可选
        dialogData: {
          title: '',
          visible: false,
        },
        form:{
          label:''
        }
      },
      nodeToAppend: null,
    }
  },
  mounted() {
    this.treeFun()
    // this.xmlToTreeTest()
  },
  methods: {
    //数据更新
    updateData(data) {
      this.dataObj = data || this.dataObj
      this.$refs.exampleTree.updateData(this.dataObj)
    },
    nodeClick(data, node, self) {
      console.log(data, node, self, '节点被点击时的回调')
    },
    nodecheck(data, node, box, key) {
      console.log(data, node, box, key, '当复选框被点击的时候触发')
      console.log(this.$refs.exampleTree.getCheckedNodes(),5677765)
    },

    appendNode(node, data) {
      console.log(node, data, 7788,'新增')
      this.nodeToAppend = node
      this.dataObj.dialogData.visible = true
      this.dataObj.dialogData.title = '新增节点'

    },
    editNode(node, data) {
      console.log(node, data, '编辑')
      this.dataObj.dialogData.visible = true
      this.dataObj.dialogData.title = '编辑节点'
      this.$nextTick(() => {
        this.dataObj.form.label = data.label
      })

    },
    appendNodeSubmit(data) {
      console.log(data, '新增')
      let dataBox = {
        ...data,
        id: 20,
      }
      console.log(dataBox, this.nodeToAppend,9998888)
      this.$refs.exampleTree.append(dataBox, this.nodeToAppend)
      this.dataObj.dialogData.visible = false
    },
    editNodeSubmit(data) {
      console.log(data, '编辑')
    },
    removeNode(node, data) {
      console.log(node, data, '删除')
      if (data.children && data.children.length > 0) {
        this.$message.error('有子节点，请先删除子节点')
      } else {
        this.$confirm('确定删除该节点吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            node.remove()
          })
          .catch(() => {})
        return false
      }
    },
    treeFun() {
     let boxD = this.$refs.exampleTree.jsonToXml(this.dataObj.tree)
      console.log(boxD,998800)
    },
    // xmlToTreeTest() {
    //   var xml = `<?xml version="1.0" encoding="UTF-8"?>
    //               <task>
    //               <user key="1">
    //                 <name age="14" height="166">
    //                 </name>
    //               </user>
    //               <user key="2">
    //                 <abc age="12">alone</abc>
    //               </user>
    //               <job key="3">
    //                 <name haha="开发">web</name>
    //               </job>
    //               <addree key="4">
    //                 <name type="首都">BeiJing</name>
    //               </addree>
    //               <addree key="5">
    //                 <name type="南京">nanjing</name>
    //               </addree>
    //             </task> `
    //   this.$refs.exampleTree.previewJson(xml)
    // },
  },
}
</script>

<style scoped>
.mapboxgl-popup {
  max-width: 400px;
  font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
}
</style>
