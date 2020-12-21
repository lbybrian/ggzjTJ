<template>
  <div style="padding: 20px 40px; height: 500px; position: relative">
    <Relationship @mouseover="dealHoverElement" />
  </div>
</template>

<script>
import Relationship from "@/common/relationship";
export default {
  components: {
    Relationship,
  },
  mounted() {},
  data() {
    return {};
  },
  methods: {
    dealHoverElement(data, elem, item) {
      console.log(data, elem, item);
      item.popperTip = elem.popper({
        content: function () {
          let div = document.createElement("div");
          div.innerHTML = "Sticky Popper content";
          div.style = {
            "margin-top": "-5px",
          };
          document.body.appendChild(div);
          return div;
        },
      });
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
</style>
