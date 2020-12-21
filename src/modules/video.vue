<template>
  <div style="padding: 20px 40px;">
    <!-- <el-tree
      :data="data"
      show-checkbox
      node-key="_id"
      @check="dealCheckItem"
      ref="testTree"
      :default-expanded-keys="['2', '3']"
      :default-checked-keys="['5']"
    ></el-tree> -->
    <video
      id="myVideo"
      class="video-js vjs-default-skin vjs-big-play-centered"
      controls
      autoplay="muted"
      preload="auto"
    >
      <source src="../assets/myVideo.mp4" type="video/mp4" />
    </video>
  </div>
</template>

<script>
// import  "../assets/plugin/video/video.js/dist/video";
// import video_zhCN from "../assets/plugin/video/video.js/dist/lang/zh-CN.json";
// import video_en from "../assets/plugin/video/video.js/dist/lang/en.json";
// import "../assets/plugin/video/video.js/dist/video-js.css"

// videojs.addLanguage("zh-CN", video_zhCN);
// videojs.addLanguage("en", video_en);
export default {
  mounted() {
    var _self = this;
    this.$nextTick(function() {
      // _self.$refs.testTree.setCheckedKeys(["4", "5"]);
    
      var player = _self.$video(
        "myVideo",
        {
          controls: true,
          autoplay: false,
          preload: "auto",
          loop: false,
          controlBar: {
            captionsButton: true,
            chaptersButton: true,
            playbackRateMenuButton: true,
            LiveDisplay: true,
            subtitlesButton: true,
            remainingTimeDisplay: true,
            progressControl: true,
            volumeMenuButton: { inline: true, vertical: true },
            fullscreenToggle: true
          }
        },
        function() {
          var newbtn = document.createElement("btn");
          newbtn.innerHTML =
            '<button style="color: #fff;" class="vjs-control" id="downloadButton"><i class="fa fa-expand" title="">bbb  </i></button>' +
            '<button style="color: #fff;" class="vjs-control" id="full_screen_button"><i class="fa fa-chrome" title="截图bai">aaa</i></button>';
          var controlBar = document.getElementsByClassName(
            "vjs-control-bar"
          )[0];
          var insertBeforeNode = document.getElementsByClassName(
            "vjs-fullscreen-control"
          )[0];
          // controlBar.insertBefore(newbtn, insertBeforeNode);
          // player.src({ type: "rtmp/flv", src: r.roomLiveUri });
          // player.play();
        }
      );
    });
  },
  data() {
    return {
      data: [
        {
          _id: "1",
          label: "一级 2",
          children: [
            {
              _id: "3",
              label: "二级 2-1",
              children: [
                {
                  _id: "4",
                  label: "三级 3-1-1"
                },
                {
                  _id: "5",
                  label: "三级 3-1-2",
                  disabled: true
                }
              ]
            },
            {
              _id: "2",
              label: "二级 2-2",
              disabled: true,
              children: [
                {
                  _id: "6",
                  label: "三级 3-2-1"
                },
                {
                  _id: "7",
                  label: "三级 3-2-2",
                  disabled: true
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
    dealCheckItem(d, n, t) {
      console.log(d);
      var tNodes = this.$refs.testTree.getHalfCheckedKeys();
      console.log(tNodes);
    }
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
</style>
