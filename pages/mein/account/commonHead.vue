<template>
	<view>
		<statusBar></statusBar>
		<view class="head">
			<image src="/static/img/back-icon.png" class="back-icon" @tap='back'></image>
			<text style="font-size:30upx;font-family:PingFang-SC-Medium;font-weight:500;color:rgba(45,47,86,1);">{{pageTitle}}</text>
			<text></text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			pageTitle: {
				default: '',
				type: String
			}
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.head {
		height: 90upx;
		display: flex;
		padding: 0 30upx;
		box-sizing: border-box;
		align-items: center;
		justify-content: space-between;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 3px 8px 0px rgba(53, 48, 15, 0.07);

		.back-icon {
			width: 17upx;
			height: 30upx;
			vertical-align: middle;
		}
	}
</style>
