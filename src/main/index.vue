<template>
  <div class="mainPage">
    <div class="headerArea">
      <MyHeader>
        <template v-slot:login>
          <LoginItem
            :state="isLogined"
            @loginEvent="dealLoginEvent"
            style="display: inline-block; vertical-align: middle;"
          />
        </template>
      </MyHeader>
    </div>
    <div class="contentArea">
      <transition>
        <router-view></router-view>
      </transition>
    </div>
    <div class="footerArea">
      <MyFooter />
    </div>
    <DialogItem :config="dialogConfig" ref="testDialog">
      <template>
        <LoginRegNew ref="loginItem" />
      </template>
    </DialogItem>
  </div>
</template>

<script>
import MyHeader from "@/common/header";
import MyFooter from "@/common/footer";
import LoginItem from "@/common/loginItem";
import DialogItem from "@/common/dialogItem";
import LoginRegNew from "@/common/loginRegNew";

export default {
  components: {
    MyHeader,
    MyFooter,
    LoginItem,
    DialogItem,
    LoginRegNew
  },
  name: "",
  data() {
    return {
      isLogined: false,
      dialogConfig: {
        title: "账号中心",
        withFooter: false,
        width: "30%",
      },

    }
  },
  created() {},
  methods: {
    dealLoginEvent(command) {
      this.$refs.testDialog.show();
      // this.$refs.loginItem.changeTab("login");
    }
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.mainPage {
  position: relative;
  height: 100%;
  background-color: #f7f7f7;
}

.headerArea {
  position: relative;
  float: left;
  width: 100%;
  height: 80px;
  line-height: 80px;
}

.contentArea {
  position: relative;
  float: left;
  width: 100%;
  height: auto;
  min-height: calc(100% - 160px);
  margin: auto;
  background-color: #fff;
}

.footerArea {
  position: relative;
  float: left;
  width: 100%;
  height: 80px;
  line-height: 80px;
}
</style>
