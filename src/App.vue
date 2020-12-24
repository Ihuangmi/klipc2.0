<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { getToken, setToken } from "@/utils/token";

export default {
  data() {
    return {};
  },
  // beforeCreate() {
  //   var token = getToken("user-token");
  //   if (`${location.origin}` === "http://my20.klipc.com.cn") {
  //     window.location.href = `http://my21.klipc.com.cn`;
  //   }
  // },
};
</script>

<style lang="scss">
@import "@/styles/_index.scss";
</style>
<style lang="scss">
#app {
  min-height: 100vh;
}
* {
  -webkit-touch-callout: none; /*系统默认菜单被禁用*/
  -webkit-user-select: none; /*webkit浏览器*/
  -khtml-user-select: none; /*早期浏览器*/
  -moz-user-select: none; /*火狐*/
  -ms-user-select: none; /*IE10*/
  user-select: none;
}

input {
  -webkit-user-select: auto; /*webkit浏览器*/
}
textarea {
  -webkit-user-select: auto; /*webkit浏览器*/
}
</style>
