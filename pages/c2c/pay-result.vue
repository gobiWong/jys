<template>

	<view class="result-card">
		<view class="result-card-head">
			<!-- 交易总额 -->
			<view class="result-card--top">交易总额</view>
			<view class="result-card--bottom">
				<text>￥5000</text>
				<view>
					<image src="/static/assert/btc-icon.png" class="coin-icon"></image>
					<text>BTC</text>
				</view>
			</view>
		</view>
		<!-- 订单信息 -->
		<view class="result-card-main">
			<view class="pay-row">
				<view>卖家昵称</view>
				<view>
					<text class="payment-username">郭本聪</text>
					<image src="/static/assert/vip-icon.png" class="vip-icon"></image>
					<image src="/static/assert/more-icon.png" class="more-icon"></image>
				</view>
			</view>
			<view class="pay-row">
				<view>
					<text>单价</text>
				</view>
				<view>
					<text>￥80890.00</text>
				</view>
			</view>
			<view class="pay-row">
				<view>
					<text>数量</text>
				</view>
				<view>
					<text>0.003708 BTC</text>

				</view>
			</view>
			<view class="pay-row">
				<view>
					<text>下单时间</text>
				</view>
				<view>
					<text>2019-07-04 18：15：06</text>
				</view>
			</view>
			<view class="pay-row">
				<view>
					<text>订单号</text>
				</view>
				<view>
					<text>115563358496201588</text>
					<image src="/static/assert/copy-icon.png" class="copy-icon"></image>
				</view>
			</view>
			<view class="pay-row">
				<view>
					<text>参考号</text>
					<image src="/static/assert/notes-icon.png" class="notes-icon"></image>
				</view>
				<view>
					<text>798895</text>
					<image src="/static/assert/copy-icon.png" class="copy-icon"></image>
				</view>
			</view>


		</view>
	</view>

</template>

<script>
	import cardIcon from '../../static/assert/card-icon.png';
	import wechatIcon from '../../static/assert/wechat-icon.png';
	import alipayIcon from '../../static/assert/alipay-cion.png';
	export default {
		data() {
			return {
				cardIcon,
				wechatIcon,
				alipayIcon,
				paymentInfo: {
					name: '银行卡',
					iconSrc: cardIcon
				},
			}
		}
	}
</script>

<style scoped lang="scss">
	.result-card {
		margin: 0 30upx;
		background-color: #fff;
		box-shadow: 0px 5upx 10upx 0px rgba(0, 0, 0, 0.02);
		border-radius: 20upx;
		position: relative;
		top: -136upx;
		z-index: 1;
		padding: 0 30upx;
		box-sizing: border-box;
		padding-bottom: 200upx;
	}

	.result-card-head {
		height: 146upx;
		border-bottom: 1px solid #E6E6E6;
		box-sizing: border-box;
	}

	.result-card-head::after {
		position: absolute;
		content: ' ';
		width: calc(100% - 18upx * 2);
		left: 18upx;
		height: 28upx;
		top: -12upx;
		border-radius: 20px;
		background-color: #fff;
		opacity: 0.2;
	}

	.result-card-head::before {
		position: absolute;
		content: ' ';
		width: calc(100% - 30upx * 2);
		left: 30upx;
		height: 38upx;
		top: -22upx;
		border-radius: 20px;
		background-color: #fff;
		opacity: 0.1;
	}

	.result-card--top {
		font-size: 24upx;
		font-family: PingFang-SC-Regular;
		font-weight: 400;
		color: rgba(140, 151, 157, 1);
		padding-top: 20upx;
	}

	.result-card--bottom {
		display: flex;
		justify-content: space-between;
		align-items: center;

		view {
			display: flex;
			align-items: center;

		}

		&>text {
			font-size: 38upx;
			font-family: PingFang-SC-Bold;
			font-weight: bold;
			color: rgba(104, 129, 255, 1);
		}

		.coin-icon {
			width: 40upx;
			height: 40upx;
			margin-right: 11upx;
		}
	}

	.result-card-main {
		.pay-row {
			display: flex;
			justify-content: space-between;
			height: 70upx;
			align-items: center;

			&>view:first-child {
				font-size: 26upx;
				font-family: PingFang-SC-Regular;
				font-weight: 400;
				color: rgba(140, 151, 157, 1);

				text {
					font-size: 26upx;
					font-family: PingFang-SC-Regular;
					font-weight: 400;
					color: rgba(140, 151, 157, 1);
				}
			}

			&>view:last-child {
				text {
					font-size: 26upx;
					font-family: PingFang-SC-Regular;
					font-weight: 400;
					color: rgba(45, 47, 86, 1);
					margin-right: 22upx;
				}

				text.payment-username {
					margin-right: 11upx;
				}

				.vip-icon {
					width: 25upx;
					height: 21upx;
					margin-right: 21upx;
				}

				.more-icon {
					width: 13upx;
					height: 24upx;
				}
			}
		}

	}

	.copy-icon {
		width: 23upx;
		height: 23upx;

	}

	.notes-icon {
		width: 23upx;
		height: 21upx;
		margin-left: 15upx;
	}

	.qrecode-icon {
		width: 35upx;
		height: 35upx;
	}
</style>
