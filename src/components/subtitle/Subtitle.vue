<template>
  <div class="title">{{name}}</div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      require: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_handle.scss";
.title {
  @include background_color("background_color1");
  width: 100%;
  height: 36px;
  border-bottom: 4px solid;
  @include border_color("border_color1");
  border-right: 4px solid;
  text-indent: 1em;
  font-size: 14px;
  box-sizing: border-box;
  color: #ad2935;
  display: flex;
  align-items: center;
  font-weight: 800;
}
</style>