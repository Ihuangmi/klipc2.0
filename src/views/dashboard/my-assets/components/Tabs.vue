<template>
  <div class="tabs">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        v-for="(tab, index) in tabItems"
        :key="index"
        :label="tab.label"
        :name="tab.name"
        lazy
      >
        <!-- <div>{{tab.label}}</div> -->
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  props: {
    tabItems: {
      type: Array,
      require: true,
      default: () => [],
    },
  },
  data() {
    return {
      activeName: "week",
      chartsList: {},
    };
  },
  methods: {
    handleClick(tab) {
      this.$emit("tabChange", tab.name);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_handle.scss";

@include font_color("font_color1");
@include background_color("background_color1");
@include border_color("border_color1");
$color: #ad2935;

.tabs {
  & /deep/.el-tabs__nav-wrap::after {
    height: 0;
  }
  & /deep/ .el-tabs__header {
    height: 32px;
    line-height: 32px;
    padding: 0 12px;
    margin: 0;
    border-bottom: 1px solid rgb(231, 229, 229);
  }
  & /deep/ .el-tabs__active-bar {
    height: 0;
    background-color: $color;
  }
  & /deep/.el-tabs__item {
    font-size: small;
    padding: 0;
    margin-right: 15px;
    height: 18px;
    line-height: 18px;
    border-radius: 2px;
  }
  & /deep/.el-tabs__item:hover {
    color: $color;
  }
  & /deep/.el-tabs__item.is-active {
    color: #fff;
    background-color: $color;
    padding: 0 4px;
  }
}
</style>