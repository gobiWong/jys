<template>
	<view >
		<!-- 卡片 -->
		<view class="card">
			<view class="card-content">
				<!-- 总价 -->
				<view class="card-content--top">
					<text>￥5000</text>
					<view>
						<image src="/static/assert/btc-icon.png" class="coin-icon"></image>
						<text>BTC</text>
					</view>
				</view>
				<!-- 价格与数量 -->
				<view class="card-content--bottom">
					<view>
						<text>单价</text>
						<text>￥80890.00</text>
					</view>
					<view>
						<text>数量</text>
						<text>0.003708 BTC</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 支付方式的信息 （微信，支付宝，银行卡）-->
		<view class="payment-info">
			<view class="payment-type">
				<view class="payment-type-left">
					<image :src="paymentInfo.iconSrc" mode=""></image>
					<text>{{paymentInfo.name}}</text>
				</view>
				<view class="payment-type-rihgt">
					<text>切换方式</text>
					<image src="/static/assert/more-icon.png"></image>
				</view>
			</view>
			<!-- 付款方式开始 -->
			<view class="payment-content">
				<!-- 银行卡 -->
				<view class="blank-info" v-if="false">
					<view class="blank-name">
						<text>银行卡信息</text>
						<text>中国邮政储蓄银行</text>
					</view>
					<view class="province">
						广东
					</view>
					<view class="pay-row">
						<view>收款人</view>
						<view>
							<text>邓耀琼</text>
							<image src="/static/assert/copy-icon.png" class="copy-icon"></image>
						</view>
					</view>
					<view class="pay-row">
						<view>银行卡卡号</view>
						<view>
							<text>621799591008757560</text>
							<image src="/static/assert/copy-icon.png" class="copy-icon"></image>
						</view>
					</view>
					<view class="pay-row">
						<view>
							<text>参考号</text>
							<image src="/static/assert/notes-icon.png" class="notes-icon"></image>
						</view>
						<view>
							<text>869032</text>
							<image src="/static/assert/copy-icon.png" class="copy-icon"></image>
						</view>
					</view>
					<view class="pay-row">
						<view>卖家昵称</view>
						<view>
							<text class="payment-username">郭本聪</text>
							<image src="/static/assert/vip-icon.png" class="vip-icon"></image>
							<image src="/static/assert/more-icon.png" class="more-icon"></image>
						</view>
					</view>
		
				</view>
				<!-- 支付宝，微信 -->
				<view class='pay-info'>
					<view class="pay-row">
						<view>
							<text>收款人</text>
						</view>
						<view>
							<text>付强</text>
							<image src="/static/assert/copy-icon.png" class="copy-icon"></image>
						</view>
					</view>
					<view class="pay-row">
						<view>
							<text>微信账号</text>
						</view>
						<view>
							<text>619917530</text>
							<image src="/static/assert/copy-icon.png" class="copy-icon"></image>
						</view>
					</view>
					<view class="pay-row">
						<view>
							<text>收款二维码</text>
						</view>
						<view>
							<image src="/static/assert/qrecode-icon.png" class="qrecode-icon"></image>
						</view>
					</view>
				</view>
				<view class="pay-row">
					<view>
						<text>参考号</text>
						<image src="/static/assert/notes-icon.png" class="notes-icon"></image>
					</view>
					<view>
						<text>无</text>
					</view>
				</view>
				<view class="pay-row">
					<view>卖家昵称</view>
					<view>
						<text class="payment-username">郭本聪</text>
						<image src="/static/assert/vip-icon.png" class="vip-icon"></image>
						<image src="/static/assert/more-icon.png" class="more-icon"></image>
					</view>
				</view>
			</view>
			<!-- 付款方式结束 -->
			<view class="tips">如您已向卖家转账付款，请务必点击“标记为已支付按钮”，否则有可能造成资金损失</view>
		</view>
		<!-- 底部操作按钮 -->
		<view class="options-buttons">
			<button class="cancel-button">取消订单</button>
			<button class="topay-button">去付款</button>
			<button class="confirm-button">标记支付</button>
		</view>
	</view>
</template>

<script>
	import cardIcon from '../../static/assert/card-icon.png';
	import wechatIcon from '../../static/assert/wechat-icon.png';
	import alipayIcon from '../../static/assert/alipay-cion.png';
	export default {
		data(){
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
<style lang="scss" scoped>
	.card {
		padding: 0 30upx;
		box-sizing: border-box;
	
		.card-content {
			background-position: 93% 100%;
			background-size: 110% 56%;
			background-repeat: no-repeat;
			background-image: url("/static/assert/order-bg.png");
			height: 216upx;
			box-shadow: 0px 5upx 10upx 0px rgba(0, 0, 0, 0.02);
			border-radius: 20upx;
			background-color: #FFF;
			position: relative;
			bottom: 28upx;
			z-index: 2;
			padding: 30upx 40upx;
	
			.card-content--top {
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
	
			.card-content--bottom {
				view {
					&>text:first-child {
						font-size: 26upx;
						font-family: PingFang-SC-Regular;
						font-weight: 400;
						color: rgba(140, 151, 157, 1);
						margin-right: 30upx;
					}
	
					&>text:last-child {
						font-size: 26upx;
						font-family: PingFang-SC-Medium;
						font-weight: 500;
						color: rgba(45, 47, 86, 1);
					}
				}
			}
		}
	
	}
	
	
	
	.payment-info {
		padding: 0 30upx;
		background: rgba(255, 255, 255, 1);
		border-radius: 20px;
		margin: 0 30upx;
		padding-bottom: 100upx;
	
		.payment-type {
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1px solid #F3F3F3;
	
			.payment-type-left {
				display: flex;
				align-items: center;
				height: 90upx;
	
				image {
					margin-right: 20upx;
					width: 41upx;
					height: 41upx;
				}
	
				text {
					font-size: 32upx;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: rgba(45, 47, 86, 1);
				}
			}
	
			.payment-type-rihgt {
				image {
					width: 13upx;
					height: 24upx;
					margin-left: 31upx;
				}
	
				text {
					font-size: 26upx;
					font-family: PingFang-SC-Regular;
					font-weight: 400;
					color: rgba(140, 151, 157, 1);
				}
			}
	
		}
	
		.payment-content {
			.blank-name {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 70upx;
	
				&>text:first-child {
					font-size: 26upx;
					font-family: PingFang-SC-Regular;
					font-weight: 400;
					color: rgba(140, 151, 157, 1);
				}
	
				&>text:last-child {
					font-size: 26upx;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: rgba(45, 47, 86, 1);
				}
			}
		}
	
	
	}
	
	// 支付方式的样式
	
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
	
	.tips {
		font-size: 26upx;
		font-family: PingFang-SC-Regular;
		font-weight: 400;
		color: rgba(140, 151, 157, 1);
		padding: 10upx;
		background: rgba(247, 247, 251, 1);
		border-radius: 5upx;
		margin-top: 64upx;
	}
	
	.options-buttons {
		position: absolute;
		bottom: 0;
		width: 100%;
		display: flex;
		height: 137upx;
		align-items: center;
		justify-content: space-around;
		box-shadow: 0px -1upx 7upx 0px rgba(53, 48, 15, 0.07);
		background-color: #FFF;
	
		button {
			width: 200upx;
			height: 80upx;
			line-height: 80upx;
			border: 0;
			border-radius: 10upx;
			font-size: 26upx;
			font-family: PingFang-SC-Medium;
			font-weight: 500;
			color: rgba(255, 255, 255, 1);
		}
	
		.cancel-button {
			background-color: #F6F7FF;
			color: #2D2F56;
		}
	
		.topay-button {
			background: linear-gradient(-90deg, rgba(104, 129, 255, 1), rgba(115, 156, 255, 1));
		}
	
		.confirm-button {
			background: linear-gradient(-90deg, rgba(130, 133, 174, 1), rgba(152, 156, 208, 1));
		}
	}
</style>
