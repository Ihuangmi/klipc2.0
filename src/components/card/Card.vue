<template>
  <div>
    <el-card class="box-card" body-style="padding:0">
      <div slot="header" class="clearfix">
        <span>{{this.name}}</span>
        <el-button v-if="icon" style="float: right;width:16px;height:16px;background:#fff" type="text" @click="clickOpen">
					<img width="16" :src="imageUrl"/>
				</el-button>
      </div>
      <div class="text item">
				<template >
      <slot></slot>
    </template>
			</div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      require: true
    },
    icon: {
      type:Boolean,
      require: true
		},
		imageUrl:{
			type:String,
		}
  },
  data(){
    return{
      card:false
    }
  },
  methods:{
    clickOpen(){
      this.card=!this.card
      this.$emit('card', this.card)
    }
  }
};
</script>

<style lang="scss" scoped >
.text {
  font-size: 12px;
}
.el-button{
	padding: 0;
}
.item {
      margin: 12px 0;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.clearfix{
  width: 100%;
}
.el-card.is-always-shadow, .el-card.is-hover-shadow:focus, .el-card.is-hover-shadow:hover{
	box-shadow:none;
}
.el-card, .el-message{
  border-radius:0;
}
.box-card >.el-card__header{
    color: #AD2935;
    font-size: 14px;
    font-weight: bold;
    height: 32px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-indent: 1em;
    padding: 6px 1em;
}
</style>