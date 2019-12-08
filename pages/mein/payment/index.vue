<template>
	<view>
		<view class="page-head-title">收款方式</view>
		<view class="payment-type-list">
			<uni-swipe-action :options="options">
				<view class="payment-type-li" >
					<view class="top">
						<view>
							<image src="/static/assert/wechat-icon.png" class="pay-cion"></image>
							<text>微信</text>
						</view>
						<view>
							<text class="bule-dot"></text>
							<text>已激活</text>
						</view>
					</view>
					<view class="bottom">
						<view>张飘飘</view>
						<view>11111111@qq.com</view>
					</view>
				</view>
			</uni-swipe-action>
		</view>
		<view class="button-cell">
			<button>添加</button>
		</view>
	</view>
</template>

<script>
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue';
	export default {
		data() {
			return {
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#EB375D'
					}
				}]
			}
		},
		components: {
			uniSwipeAction
		}
	}
</script>
<style scoped lang="scss">
	.payment-type-list {
	
		margin-top: 40upx;
	}

	.payment-type-li {
		padding: 0 30upx;
		margin: 0 30upx;
		height: 230upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 2upx 0px 20upx 0px rgba(0, 0, 0, 0.05);
		border-radius: 10upx;

		.top {
			height: 100upx;

			display: flex;
			justify-content: space-between;
			border-bottom: 1px solid #F3F3F3;
			align-items: center;

			.pay-cion {
				width: 44upx;
				height: 44upx;
			}

			.bule-dot {
				width: 11upx;
				height: 11upx;
				background: rgba(104, 129, 255, 1);
				border-radius: 50%;
				 margin-right: 10px;
			}

			&>view {
				display: flex;
				align-items: center;
			}

			&>view:last-child {
				text {
					font-size: 24upx;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: rgba(104, 129, 255, 1);
				}
			}

		}

		.bottom {
			&>view {
				font-size: 24upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(140, 151, 157, 1);
				line-height: 24upx;
			}

			&>view:first-child {
				margin-top: 30upx;
				margin-bottom: 19upx;
			}

		}
	}

	.button-cell {
		padding: 0 30upx;
		margin-top: 151upx;

		button {
			box-sizing: border-box;
			font-size: 26upx;
			font-family: PingFang-SC-Medium;
			font-weight: 500;
			color: rgba(255, 255, 255, 1);
			line-height: 91upx;
			height: 91upx;
			border: 0;
			background: linear-gradient(-90deg, rgba(104, 129, 255, 1), rgba(115, 156, 255, 1));
			border-radius: 10upx;
		}
	}
</style>
