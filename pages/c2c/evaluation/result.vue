<template>
	<view class="page-body">
		<commonHead></commonHead>
		<!-- 评价信息 -->
		<view class="evaluation-info">
			<view class="info-head">
				<view>
					<view>郭本聪</view>
					<view>
						<image src="/static/assert/evaluation-2.png" class="evaluation-icon"></image>
						<text>已好评</text>
					</view>
				</view>
				<view>
					<image src="/static/assert/vip-icon.png"></image>
					<text>加V用户</text>
					<text>注册时间 2019-07-04</text>
				</view>
			</view>
			<view class="info-mian">
				<view class="my-evaluation">卖家服务态度挺好的，放币也很快。下次有机会再合作</view>
				<view class="eveluation-star">
					<!-- 放币时间 -->
					<view>
						<text>放币时间</text>
						<view style="{height: 30upx;font-size:0;}">
							<image src="/static/assert/full-star-icon.png" class="star-icon"></image>
							<image src="/static/assert/full-star-icon.png" class="star-icon"></image>
						</view>
					</view>
					<!-- 放币态度 -->
					<view>
						<text>放币态度</text>
						<view style="{height: 30upx;font-size:0;}">
							<image src="/static/assert/full-star-icon.png" class="star-icon"></image>
							<image src="/static/assert/full-star-icon.png" class="star-icon"></image>
							<image src="/static/assert/full-star-icon.png" class="star-icon"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 该用户挂的单  如果是卖家 只显示卖单 如果是买家 以此类推-->
		<!-- 出售 -->
		<view class="sell-card">
			<view class="card-title">在线出售</view>
			<view>
				<view class="coin-name">BTC</view>
				<view class="price">
					<text>数量0.034148 BTC</text>
					<text>单价</text>
				</view>
				<view class="limit">
					<text>限额 ￥500.00-￥2871.00</text>
					<text>￥841000.00</text>
				</view>
				<view style="display: flex;justify-content: space-between;">
					<view>
						<image src="/static/assert/alipay-cion.png" class="pay-icon"></image>
						<image src="/static/assert/wechat-icon.png" class="pay-icon"></image>
						<image src="/static/assert/card-icon.png" class="pay-icon"></image>
					</view>
					<button>出售</button>
				</view>
			</view>
		</view>
		<!-- 购买 -->
		<view class="buy-card" v-show="false">
			<view class="card-title">在线购买</view>
			<view>
				<view class="coin-name">BTC</view>
				<view class="price">
					<text>数量0.034148 BTC</text>
					<text>单价</text>
				</view>
				<view class="limit">
					<text>限额 ￥500.00-￥2871.00</text>
					<text>￥841000.00</text>
				</view>
				<view style="display: flex;justify-content: space-between;">
					<view>
						<image src="/static/assert/alipay-cion.png" class="pay-icon"></image>
						<image src="/static/assert/wechat-icon.png" class="pay-icon"></image>
						<image src="/static/assert/card-icon.png" class="pay-icon"></image>
					</view>
					<button>购买</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import commonHead from '../commonHead'
	export default {
		data() {
			return {

			}
		},
		components: {
			commonHead
		}
	}
</script>

<style scoped lang="scss">
	uni-page-body {
		height: 100%;
	}

	.page-body {
		background-color: #F7F7FB;
		min-height: 100%;
	}

	.evaluation-info {
		width: 690px;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.02);
		border-radius: 20px;
		margin: 0 auto;
		padding: 30upx 21upx;
		box-sizing: border-box;
		margin-top: -150px;

		.info-head {
			border-bottom: 1px solid #F3F3F3;
			padding-bottom: 19upx;

			&>view:first-child {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}

			&>view:last-child {
				image {
					width: 25upx;
					height: 21upx;
					vertical-align: middle;
					margin-right: 12upx;
				}

				text {
					font-size: 22px;
					font-family: PingFang-SC-Regular;
					font-weight: 400;
					color: rgba(140, 151, 157, 1);
					margin-right: 10upx;
					vertical-align: middle;
				}
			}

			.evaluation-icon {
				width: 22upx;
				height: 22upx;
				vertical-align: middle;
				margin-right: 13upx;
			}

		}
	}

	.info-mian {
		padding-bottom: 20upx;

		.my-evaluation {
			word-break: break-all;
			font-size: 24px;
			font-family: PingFang-SC-Regular;
			font-weight: 400;
			color: rgba(45, 47, 86, 1);
			line-height: 24upx;
			margin-top: 37upx;
			margin-bottom: 60upx;
		}

		.eveluation-star {
			&>view {
				height: 60upx;
				display: flex;
				align-items: center;

				.star-icon {
					width: 30upx;
					height: 30upx;
					vertical-align: middle;
					margin-right: 30upx;
				}

				text {
					font-size: 24px;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: rgba(140, 151, 157, 1);
					vertical-align: middle;
					margin-right: 50upx;
				}
			}
		}
	}
	
	.sell-card,
	.buy-card {
		margin: 0 30px;
		padding: 20upx 30upx;
		height: 340px;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.02);
		border-radius: 20px;
		margin-top: 20upx;
	
		.card-title {
			font-size: 28px;
			font-family: PingFang-SC-Bold;
			font-weight: bold;
			color: rgba(45, 47, 86, 1);
			border-bottom: 1px solid #F3F3F3;
			line-height: 28upx;
			padding-bottom: 25upx;
		}
	
		.coin-name {
			font-size: 28px;
			font-family: PingFang-SC-Medium;
			font-weight: 500;
			color: rgba(45, 47, 86, 1);
			margin-top: 41upx;
		}
	
		.price,
		.limit {
			display: flex;
			justify-content: space-between;
			font-size: 22px;
			font-family: PingFang-SC-Regular;
			font-weight: 400;
			color: rgba(140, 151, 157, 1);
		}
	
		.limit {
			&>text:last-child {
				font-size: 32px;
				font-family: PingFang-SC-Bold;
				font-weight: bold;
				color: rgba(104, 129, 255, 1);
			}
	
		}
	
		.pay-icon {
			width: 30upx;
			height: 30upx;
			vertical-align: middle;
			margin-right: 15upx;
		}
	
		button {
			width: 160px;
			height: 51px;
			background: rgba(104, 129, 255, 1);
			border-radius: 5px;
			line-height: 51upx;
			font-size: 24upx;
			font-family: PingFang-SC-Medium;
			font-weight: 500;
			color: rgba(255, 255, 255, 1);
			margin: 0;
		}
	}
</style>
