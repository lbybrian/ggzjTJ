<template>
  <div>
    <Relationship
      :dataObj="dataObj"
      @inited="dealInitedEvent"
      @node-hover="dealHoverElement"
      ref="exampleTestItem"
      style="height: 450px; position: relative; float: left"
    ></Relationship>
    <div ref="popperTemp" style="display: none">
      <div
        class="popperDiv"
        style="
          top: -100px;
          left: -40px;
          color: #ddd;
          padding: 10px 15px;
          border-radius: 5px;
          margin-top: 10px;
          background-color: rgba(22, 22, 22, 0.7);
        "
      >
        <span
          style="
            width: 0px;
            height: 0px;
            margin-left: 50%;
            left: -10px;
            top: 0px;
            position: absolute;
            border-left: 10px solid transparent;
            border-bottom: 10px solid rgba(22, 22, 22, 0.7);
            border-right: 10px solid transparent;
          "
        ></span>
        <p style="padding-top: 10px">
          <span
            class="labelItem"
            style="font-weight: 800; font-size: 18px; margin-right: 10px"
            >{{ current.name }}</span
          >
          <span>{{ current.politicsLabel }}</span>
        </p>
        <p style="padding: 15px 0px">
          <label style="width: 160px; display: inline-block" class="labelItem"
            >推特发布量: <span>{{ current.tweets }}</span>
          </label>
          <label style="width: 160px; display: inline-block" class="labelItem"
            >粉丝数: <span>{{ current.friends_t }}</span></label
          >
          <a href="current.twitterUrl" style="color: #fff" target="_blank"
            ><img
              style="vertical-align: middle; margin-right: 5px; width: 30px"
              src="/static/example/relationship/images/twitter.png"
            />{{ current.name }}</a
          >
        </p>
        <p style="padding-bottom: 15px">
          <label class="labelItem" style="width: 160px; display: inline-block"
            >脸书好友数: <span>{{ current.friends_t }}</span></label
          >
          <label style="width: 160px; display: inline-block" class="labelItem"
            >人气数: <span>{{ current.friends_t }}</span></label
          >
          <a href="current.facebookUrl" style="color: #fff" target="_blank"
            ><img
              style="vertical-align: middle; margin-right: 5px; width: 30px"
              src="/static/example/relationship/images/facebook.png"
            />{{ current.name }}</a
          >
        </p>
        <p style="padding-bottom: 15px">
          <label class="labelItem" style="width: 160px; display: inline-block"
            >影响力: <span>{{ current.friends_t }}</span></label
          >
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import Relationship from "@/common/relationship";
export default {
  components: {
    Relationship,
  },
  beforeMount() {
    var _self = this;
    this.getFocusPersionData(function (tData) {
      _self.ids = tData.data.map((item) => {
        return item.id + "";
      });
      var tStr = JSON.stringify(_self.ids);
      tStr = tStr.replace("[", "").replace("]", "");
      _self.updateRelationData({
        ids: tStr,
      });
    });
  },
  data() {
    return {
      ids: [],
      dataObj: {
        map: {
          label: "name",
        },
        // layout: {
        //   name: "fcose",
        // },
      },
      current: {
        name: "许智峰",
        tweets: 220000,
        friends_t: 232222,
        politicsLabel: "民进党-反对派",
        twitterUrl: "http://www.twitter.com",
        facebookUrl: "http://facebook.com",
      },
    };
  },
  methods: {
    dealInitedEvent(cy, elem) {},
    getFocusPersionData(callback) {
      this.adapter.getFocusPersonData({}, function (tData) {
        if (typeof callback === "function") {
          callback(tData.data);
        }
      });
    },
    updateRelationData(query) {
      var _self = this;
      query = query || {};
      this.adapter.getRelationData(query, function (tData) {
        // console.log(tData);
        _self.dataObj.nodes = tData.data.data.nodes;
        _self.dataObj.edges = tData.data.data.edges;
        _self.$refs.exampleTestItem.updateData(_self.dataObj);
      });
    },
    dealHoverElement(a, b, c) {
      console.log(a, b, c);
      if (b.isNode()) {
        var d = b.data();
        var attr = {};
        if (d.attributes) {
          for (var i = 0; i < d.attributes.length; i++) {
            attr[d.attributes[i].key] = d.attributes[i].value;
          }
          this.current.name = d.name;
          this.current.tweets;
        }
        this.$nextTick(function () {
          var str = this.$refs.popperTemp.innerHTML;
          c.popperTip = b.popper({
            content: () => {
              let div = document.createElement("div");
              div.innerHTML = str;
              document.body.appendChild(div);
              return div;
            },
            popper: {
              class: "popperItem",
              placement: "bottom",
            },
          });
        });
      }
    },
  },
};
</script>
<style scoped>
* {
  box-sizing: border-box;
}

.popperItem {
  color: #ddd;
  padding: 10px 15px;
  border-radius: 5px;
  background-color: rgba(22, 22, 22, 0.7);
  margin-top: 10px;
  top: -100px !important;
  left: -40px !important;
}

.popperItem::before {
  content: "";
  width: 0px;
  height: 0px;
  position: absolute;
  border-left: 10px solid transparent;
  border-bottom: 10px solid rgba(22, 22, 22, 0.7);
  border-right: 10px solid transparent;
  left: -9px;
  margin-left: 50%;
  top: -9px;
}
</style>
