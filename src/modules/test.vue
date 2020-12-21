<template>
  <div style="padding: 20px 40px;">
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

export default {
  mounted() {
    var _self = this;
    this.$nextTick(function() {
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
