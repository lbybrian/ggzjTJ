<template>
  <div>
    试试吧
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    mounted() {
      /*
       * 弹出页 popup 域名是<http://example.org>，以下是script标签中的代码:
       */

      //当A页面postMessage被调用后，这个function被addEventListener调用
      function receiveMessage(event) {
        // 我们能信任信息来源吗？
        if (event.origin !== "http://localhost:8080/#/label")
          return;

        // event.source 就当前弹出页的来源页面
        // event.data 是 "hello there!"

        // 假设你已经验证了所受到信息的origin (任何时候你都应该这样做), 一个很方便的方式就是把event.source
        // 作为回信的对象，并且把event.origin作为targetOrigin
        event.source.postMessage("hi there yourself!  the secret response " +
          "is: rheeeeet!",
          event.origin);
      }

      window.addEventListener("message", receiveMessage, false);
    },
    methods: {

    }
  }
</script>

<style>
</style>
