<template>
	<view class="top">
		<statusBar></statusBar>
		<view class="head">
			<image src="/static/img/back-icon-white.png" class="back-icon"></image>
		</view>
		<view class="page-title">{{pageTitle}}</view>
	</view>
</template>

<script>
	export default{
		props:{
			pageTitle:{
				default:'已评价',
				type:String
			}
		}
	}
</script>

<style lang="scss" scoped>
	.top {
		background: linear-gradient(0deg, rgba(104, 129, 255, 1), rgba(115, 156, 255, 1));
		height: 378px;
		width: 100%;

		.head {
			height: 90upx;
			display: flex;
			padding: 0 30upx;
			box-sizing: border-box;
			align-items: center;
			.back-icon{
				width: 17upx;
				height: 30upx;
				vertical-align: middle;
			}
		}

		.page-title {
			font-size: 38px;
			font-family: PingFang-SC-Bold;
			font-weight: bold;
			color: rgba(255, 255, 255, 1);
			padding-left: 30upx;
		}
	}
</style>
