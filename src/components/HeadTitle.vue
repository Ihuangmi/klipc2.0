<template>
  <div class="head">
    <div class="title">{{title}}</div>
    <div class="inputs">
      <slot v-if="hasInput" name="inputs"></slot>
    </div>
    <div class="icons">
      <slot v-if="hasIcon" name="icons"></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      require: true,
    },
    hasInput: Boolean,
    hasIcon: Boolean,
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/_handle.scss";

$height: 2rem;

.head {
  height: $height;
  line-height: $height;
  @include font_color("font_color1");
  @include background_color("background_color1");
  border-bottom: 1px solid rgb(231, 229, 229);
  @include border_color("border_color2");
  display: flex;
  justify-content: space-between;

  .title {
    height: $height;
    line-height: $height;
    text-indent: 12px;
    font-size: 14px;
    font-family: NotoSansCJKsc-Bold, NotoSansCJKsc;
    font-weight: bold;
    // color: rgba(38, 38, 38, 1);
    @include font_color("font_color1");
  }
  .inputs {
    display: flex;
    flex: 1;

    & /deep/ .el-input .el-input__inner {
      border: 1px solid transparent;
      @include background_color("background_color1");
    }
  }
  .icons {
    line-height: $height;
    padding: 0 13px;
    display: flex;
    align-items: center;
  }
}
</style>