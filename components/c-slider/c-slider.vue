<template>
	<view class="wrap">
		<view class="flex-row align-center">
			<slider class="slider flex1" :min="0" :max="100" @changing="handleSliderChange" :value="value" step="5" :activeColor="'#ED9D04'" show-value/>			
			<text class="percent">%</text>
		</view>
		<view class="num flex-row space-between">
			<text>{{min | myTofixed(6)}}</text>
			<text>{{max | myTofixed(6)}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"c-slider",
		props:{
			min:{
				type: Number,
				default(){
					return 0
				}
			},
			max:{
				type: Number,
				default(){
					return 100
				}
			}
		},
		data() {
			return {
				value: 0
			};
		},
		methods:{
			handleSliderChange(e){
				this.$emit('change', e.target.value)
			}
		}
	}
</script>

<style lang="scss" scoped>
.wrap{
	width: 100%;
}
.slider{
	margin-right: 0;
	margin-bottom: 6px;
	margin-top: 6px;
	/deep/.uni-slider-value{
		color: $main-color;
	}
}
.percent{
	color: $main-color;
}
.num{
	margin-bottom: 12px;
	font-size: 12px;
	width: 100%;
}
</style>
