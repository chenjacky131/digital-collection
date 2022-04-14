<template>
	<picker class="select-box" @change="handleChange" :value="index" :range="list">
		<text class="uni-input">{{list[index]}}</text>
		<text class="iconfont icon-arrow-down"></text>
	</picker>
</template>

<script>
	// props: index当前值 list选择列表
	export default {
		name: "c-select",
		props:{
			index: Number,
			list: Array
		},
		data() {
			return {

			};
		},
		created(){
		},
		methods: {
			handleChange(e) {
				this.$emit('change', e)
			}
		}
	}
</script>

<style lang="scss" scoped>
.select-box{
	background-color: #C0C0C0;
	border-radius: 10px;
	margin-left: 4px;
	padding: 4px 10px;
		.iconfont{
			margin-right: 0;
			margin-left: 4px;
			font-size: 12px;
		}
}
</style>
