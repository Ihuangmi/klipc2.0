<template>
  <el-container>
    <div class="aside">
      <div class="logo2" @click="toHome()">
        <img src="@/assets/images/logo.png" />
      </div>
      <sider-bar></sider-bar>
      <div class="language">
        <svg-icon
          @click.native="dialogVisible = true"
          :iconClass="icon"
        ></svg-icon>
      </div>
    </div>
    <Dialog :visible.sync="dialogVisible" @submit="switchLanguage" />

    <!-- <el-container> -->
    <div class="main">
      <top-card v-if="userid !== ''" :userid="userid"></top-card>
      <div>
          
          <TopSkin />
      </div>

      <router-view />
    </div>
    <!-- </el-container> -->
  </el-container>
</template>

<script>
import SiderBar from "./components/SiderBar";
import Dialog from "@/components/LangBox";
import { getUserId } from "@/api/user";
// import TopCard from "@/components/TopCard";
import TopCard from "@/components/BoxCard";
import { getToken, setToken } from "@/utils/token";
import { checkUserLogin } from "@/api/user";
import TopSkin from "@/components/TopSkin";

export default {
  name: "Layout",
  components: {
    SiderBar,
    Dialog,
    TopCard,
    TopSkin,
  },
  data() {
    return {
      userid: "",
      dialogVisible: false,
      icon: "zh-hans",
    };
  },
  created() {
    this.getUserId();
  },
  mounted() {
    this.checkUser();
    this.icon = this.$i18n.locale;// 设置默认语言图标
  },
  methods: {
    toHome(){
      this.$router.push({
        path: '/dashboard'
      })
    },
    getUserId() {
      getUserId().then((res) => {
        var user_id = res.results.user_id;
        // this.$store.commit("SET_USERID", user_id);
        sessionStorage.setItem("user_id", user_id);
        this.userid = res.results.user_id;
        // console.log(this.userid)
      });
    },
    switchLanguage(obj) {
      // console.log(obj)
      this.dialogVisible = false;
      this.icon = obj.icon;
    },
    checkUser() {
      // console.log("检测用户是否在线");
      var timer = setInterval(() => {
        if (getToken("user-token")) {
          checkUserLogin().then((res) => {
            console.log("用户在线");
          });
        }
      }, 1000 * 120);
      this.$once("hook:beforeDestroy", () => {
        clearInterval(timer);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_handle.scss";

$menuWidth: 55px;
.aside {
  @include font_color("font_color1");
  @include background_color("background_color6");
  @include border_color("border_color1");
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 999;
  height: 100%;
  border-right: 4px solid #d7e4f2;
  box-sizing: border-box;

  .logo2 {
    width: 100%;
    height: 50px;
    text-align: center;
    margin-bottom: 30px;
    background-color: #bc1b29;
    cursor: pointer;
    img {
      width: 50px;
      height: 50px;
    }
  }
}
.el-container {
  height: 100%;
}
.main {
  width: 100%;
  min-height: 100vh;
  @include background_color("background_color1");

  margin-left: $menuWidth;
  overflow: hidden;
}

.language {
  position: absolute;
  left: 15px;
  bottom: 20px;
  z-index: 9999;
  .svg-icon {
    width: 25px;
    height: 25px;
    cursor: pointer;
  }
}
</style>

