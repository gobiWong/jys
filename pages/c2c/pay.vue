<template>
	<view class="body">
		<view class="top">
			<statusBar></statusBar>
			<view class="head">
				<image src="/static/img/back-icon-white.png" />
			</view>
			<view class="head-content">
				<!-- top -->
				<view>
					<view>
						<image src="/static/assert/time-icon.png" class="time-icon"></image>
						<text class="tip-text">请付款</text>
					</view>
					<view>
						<image src="/static/assert/talk-icon.png" class="talk-icon"></image>
					</view>
				</view>
				<!-- bottom -->
				<view>
					<text>请在14:50内付款给卖家</text>
					<text>联系对方</text>
				</view>
			</view>
		</view>
		<!-- 订单取消或完成 -->
		<!-- <payResult/> -->
		<!-- 订单代付款 -->
		<payNopay/>
	</view>
</template>

<script>
	
	import payResult from './pay-result.vue';
	import payNopay from './pay-nopay.vue';

	export default {
		data() {
			return {
				

			}
		},
		components:{
			payResult,
			payNopay
		}
	}
</script>

<style lang="scss" scoped>
	.body {
		background-color: #F7F7FB;
	}

	.top {
		height: 300upx;
		border-bottom: 43upx;
		padding: 0 30upx;	
		padding-bottom: 137upx;
		background: linear-gradient(45deg, rgba(104, 129, 255, 1), rgba(115, 156, 255, 1));
		position: relative;
		z-index: 1;

		.head {
			height: 90upx;
			display: flex;
			align-items: center;

			image {
				width: 17upx;
				height: 30upx;
			}

		}

		.head-content {
			&>view {
				display: flex;
				justify-content: space-between;
				align-items: center;

				view {
					display: flex;
					align-items: center;
				}

				text {
					font-size: 22upx;
					font-family: PingFang-SC-Regular;
					font-weight: 400;
					color: rgba(255, 255, 255, 1);
				}
			}

			.time-icon {
				width: 40upx;
				height: 40upx;
				margin-right: 19upx;
			}

			.talk-icon {
				width: 44upx;
				height: 44upx;
				margin-right: 10upx;
			}

			.tip-text {
				font-size: 38upx;
				font-family: PingFang-SC-Bold;
				font-weight: bold;
				color: rgba(255, 255, 255, 1);
			}
		}
	}

	.top::after {
		content: ' ';
		bottom: -28upx;
		height: 62upx;
		width: 100%;
		border-radius: 100%;
		left: 0;
		position: absolute;
		background: linear-gradient(45deg, rgba(104, 129, 255, 1), rgba(115, 156, 255, 1));
		z-index: -2;
	}
</style>
