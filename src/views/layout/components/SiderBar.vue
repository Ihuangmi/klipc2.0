<template>
  <el-aside
    class="SideBar"
    width="auto"
    router
    @mouseenter.native="collapseOpen"
    @mouseleave.native="collapseClose"
  >
    <!-- <el-scrollbar style="height: 100vh"> -->
      <div class="scrollbar">
      <el-menu
        class="el-menu-vertical-demo"
        :default-active="activeMenu"
        :background-color="themeType"
        unique-opened
        :collapse="isCollapse"
      >
        <div class="applink">
          <div v-for="(item, index) in routesItem" :key="item.name + index">
            <div v-if="!item.hidden" class="menu-link">
              <el-submenu
                v-if="item.children && item.children.length > 1"
                :index="item.redirect || item.path"
              >
                <template v-if="theme==='light'" slot="title">
                  <svg-icon
                    v-if="routeMatch(item.redirect, item.path)"
                    :iconClass="item.meta.icon2"
                  ></svg-icon>
                  <svg-icon v-else :iconClass="item.meta.icon"></svg-icon>
                  <span v-if="isCollapse">{{
                    $t(item.meta.shortTitle)
                  }}</span>
                  <span v-else slot="title">{{ $t(item.meta.title) }}</span>
                </template>
                <template v-else slot="title">
                  <svg-icon
                    v-if="routeMatch(item.redirect, item.path)"
                    :iconClass="item.meta.icon4"
                  ></svg-icon>
                  <svg-icon v-else :iconClass="item.meta.icon3"></svg-icon>
                  <span v-if="isCollapse" :class="routeMatch(item.redirect, item.path) ? 'sel-item' : 'not-sel'">{{
                    $t(item.meta.shortTitle)
                  }}</span>
                  <span v-else slot="title">{{ $t(item.meta.title) }}</span>
                </template>
                <router-link
                  v-for="route in item.children"
                  :key="route.path"
                  :to="resolvePath(item.path, route.path)"
                >
                  <el-menu-item :index="resolvePath(item.path, route.path)">
                    <span slot="title">{{ $t(route.meta.title) }}</span>
                  </el-menu-item>
                </router-link>
              </el-submenu>
              <router-link v-else :to="item.path">
                <el-menu-item v-if="theme==='light'" :index="item.path" class="menu-item">
                  <svg-icon
                    v-if="
                      activeMenu === item.redirect || activeMenu === item.path
                    "
                    :iconClass="item.meta.icon2"
                  ></svg-icon>
                  <svg-icon v-else :iconClass="item.meta.icon"></svg-icon>
                  <span v-if="isCollapse">{{
                    $t(item.meta.shortTitle)
                  }}</span>
                  <span v-else>{{ $t(item.meta.title) }}</span>
                </el-menu-item>
                <el-menu-item v-else :index="item.path" class="menu-item">
                  <svg-icon
                    v-if="
                      activeMenu === item.redirect || activeMenu === item.path
                    "
                    :iconClass="item.meta.icon4"
                  ></svg-icon>
                  <svg-icon v-else :iconClass="item.meta.icon3"></svg-icon>
                  <span v-if="isCollapse" :class="routeMatch(item.redirect, item.path) ? 'sel-item' : 'not-sel'">{{
                    $t(item.meta.shortTitle)
                  }}</span>
                  <span v-else>{{ $t(item.meta.title) }}</span>
                </el-menu-item>
              </router-link>
            </div>
          </div>
        </div>
      </el-menu>
      </div>
    <!-- </el-scrollbar> -->
  </el-aside>
</template>

<script>
import routes from "@/router";
export default {
  name: "SideBar",
  data() {
    return {
      lang: "",
      routesItem: [],
      dialogVisible: false,
      isCollapse: true,
    };
  },
  computed: {
    theme(){
      return this.$store.getters.theme;
    },
    themeType() {
      return this.$store.state.menu_bg;
    },
    activeMenu() {
      return this.$route.path;
    },
  },
  mounted() {
    this.getRoute();
  },
  methods: {
    collapseOpen() {
      // console.log("collapseOpen");
      this.isCollapse = false;
    },
    collapseClose() {
      // console.log("collapseClose");
      this.isCollapse = true;
    },
    resolvePath(basePath, routePath) {
      const path = require("path");
      const url = path.resolve(basePath, routePath);
      return url;
    },
    getRoute() {
      this.routesItem = routes.options.routes;
      // console.log(`routesItem===`, routes.options.routes)
    },
    routeMatch(path1, path2) {
      var str = this.$route.path;
      var reg = RegExp(path1 || path2);
      // 判断当前子路由是否包含父级路由
      return reg.test(str);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/_handle.scss";
// @include font_color("font_color1");
@include background_color("background_color2");
@include border_color("border_color1");
.svg-icon {
  width: 24px;
  height: 24px;
  margin-top: 2px;
}
.selected {
  filter: drop-shadow(0px 0px 5px #ffa3a3);
}
.logo {
  width: 100%;
  height: 50px;
  margin-bottom: 30px;
  background-color: #bc1b29;
}
.logo2 {
  width: 100%;
  height: 50px;
  text-align: center;
  margin-bottom: 30px;
  // margin: 0 auto;
  background-color: #bc1b29;
  img {
    width: 50px;
    height: 50px;
  }
}
.SideBar {
    // height: 100vh;
  // .el-scrollbar__wrap {
  //     overflow-x: hidden !important;
  //     // @include background_color("background_color7");
  // }
  // ********** scrollbar ***************
  .scrollbar {
    width: 100%;
    height: 100vh;
    margin: 0 auto;
  }
  &::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 6px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 15px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #cac9c9;
    // @include background_color("background_color4");
  }

  &::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    // box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    /* background: #ededed; */
  }
  // ********** scrollbar ***************
  .el-menu {
    border-right: solid 1px red;
    @include border_color("border_color1");
  }
  .icon {
    width: 24px;
    height: 24px;
    margin-top: 2px;
  }
  .sel-item{
    @include font_color("font_color8");
  }
  .not-sel{
    
  }
  .el-menu--collapse {
    width: 50px;
    .menu-link {
      width: 46px;
      height: 46px;
      // overflow: hidden;
      // @include font_color("font_color7");
      border-radius: 6px;
      text-align: center;
      font-size: 12px;
      font-weight: bold;
      margin: 15px auto;
    }
    .menu-link /deep/ {
      // .is-active {
      //   color: #ad2935;
      //   @include font_color("font_color8");
      //   @include background_color("background_color7");
      // }
      .el-menu-item {
        padding-left: 0 !important;
        .el-tooltip {
          padding-left: 12px !important;
        }
      }
      .el-submenu .el-submenu__title,
      .menu-item {
        // color: #5f6472;
        color: yellow;
        @include font_color("font_color7");
        font-weight: bold;
        font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
        font-size: 12px;
        // padding-left: 12px !important;
        width: 100%;
        text-align: center;
        padding: 0 !important;
        // width: 46px;
        line-height: 18px;
        &:hover {
          // font-weight: bold;
          background: #f8fafb !important;
          @include background_color("background_color7");
        }
        .svg-icon {
          width: 24px;
          height: 24px;
          // margin-right: 10px;
        }
        span {
          display: block;
        }
        .el-submenu__icon-arrow {
          // right: 8px;
          display: none;
        }
      }
      .el-submenu .el-menu {
        .el-menu-item {
          color: #778ca2;
          @include font_color("font_color7");
          font-size: 12px;
          padding-left: 12px !important;
          &:hover {
            background: #f8fafb !important;
            @include background_color("background_color7");
          }
        }
      }
    }
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    min-width: 144px;
    max-width: 200px;
    min-height: 400px;

    .applink {
      // @include font_color("font_color1");
      @include background_color("background_color6");
      @include border_color("border_color1");
      width: 144px;
      // height: 100vh;
      box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.15);
      border-right: 2px solid rgb(241, 234, 234);
      position: absolute;
      top: 0;
      left: 0px;
      z-index: 9999;
      .menu-link /deep/ {
        margin: 32px 0;
        .el-submenu .el-submenu__title,
        .menu-item {
          color: #5f6472;
          @include font_color("font_color7");
          font-weight: bold;
          font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
          font-size: 12px;
          // width: 130px;
          height: 28px;
          display: flex;
          align-items: center;
          padding-left: 13px !important;
          background: rgb(39, 18, 18);
          border-radius: 6px;
          &:hover {
              font-weight: bold;
              @include font_color("font_color8");
            background: #f8fafb !important;
            @include background_color("background_color7");
          }
          .svg-icon {
            width: 24px;
            height: 24px;
            margin-right: 10px;
          }
          .el-submenu__icon-arrow {
            right: 8px;
          }
        }
        .el-submenu .el-menu {
          margin: 8px 0;
          .el-menu-item {
            // min-width: 50px;
            height: 28px;
            line-height: 28px;
            color: #778ca2;
            font-size: 12px;
            border-radius: 6px;
            margin-bottom: 2px;
            padding-left: 47px !important;
            &:hover {
              font-weight: bold;
              @include font_color("font_color8");
              @include background_color("background_color7");
            }
          }
        }
        .el-menu-item.is-active {
          color: #ad2935;
          @include font_color("font_color8");
          @include background_color("background_color7");
        }
      }
    }
  }
}
</style>