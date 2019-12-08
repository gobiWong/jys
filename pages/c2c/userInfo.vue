<template>
	<view class="page-body">
		<view class="top">
			<statusBar></statusBar>
			<view class="header">
				<image src="/static/img/back-icon-white.png" class="back-icon"></image>
			</view>
		</view>
		<!-- 该用户的基本信息 -->
		<view class="user-info">
			<view class="slide">
				<view class="user-name">郭本聪</view>
				<view>
					<image src="/static/assert/vip-icon.png" class="vip-icon"></image>
					<text>加v用户</text>
					<text>注册时间 2019-07-04</text>
				</view>
			</view>
			<view class="main">
				<!-- 交易信息 -->
				<view>
					<view class="business-row">
						<view>
							<text>交易总额</text>
							<text>20714次</text>
						</view>
						<view>
							<text>完成率</text>
							<text>98%</text>
						</view>
					</view>
					<view class="business-row">
						<view>
							<text>30日成单</text>
							<text>3342次</text>
						</view>
						<view>
							<text>平均放行</text>
							<text>0.98分钟</text>
						</view>
					</view>
				</view>
				<!-- 认证信息 -->
				<view class="attestation-info">
					<view class="attestation">
						<image src="/static/assert/unattestation.png"></image>
						<text>邮箱认证</text>
					</view>
					<view class="attestation">
						<image src="/static/assert/attestation.png"></image>
						<text>手机认证</text>
					</view>
					<view class="attestation">
						<image src="/static/assert/attestation.png"></image>
						<text>身份认证</text>
					</view>
					<view class="attestation">
						<image src="/static/assert/attestation.png"></image>
						<text>高级认证</text>
					</view>
				</view>
			</view>
		</view>
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
		<view class="buy-card">
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
	export default {
		data() {
			return {

			}
		}
	}
</script>

<style scoped lang="scss">
	uni-page-body {
		height: 100%;
		
	}

	.page-body {
		min-height: 100%;
		background-color: #F7F7FB;
		padding-bottom: 20upx;
	}

	.top {
		height: 378upx;
		background: linear-gradient(0deg, rgba(104, 129, 255, 1), rgba(115, 156, 255, 1));

		.header {
			height: 96upx;
			line-height: 96upx;
			padding: 0 30upx;

			.back-icon {
				width: 17upx;
				height: 30upx;
				vertical-align: middle;
			}

		}

	}

	.user-info {
		margin: 0 30upx;
		height: 340px;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.02);
		border-radius: 20px;
		margin-top: -209px;
		padding: 20upx 30upx;


		.slide {
			.vip-icon {
				width: 25upx;
				height: 21upx;
				vertical-align: middle;
			}

			.user-name {
				font-size: 30px;
				font-family: PingFang-SC-Bold;
				font-weight: bold;
				color: rgba(45, 47, 86, 1);
			}

			text {
				margin-left: 12upx;
				font-size: 22px;
				font-family: PingFang-SC-Regular;
				font-weight: 400;
				color: rgba(140, 151, 157, 1);
			}

			border-bottom: 1px solid #F3F3F3;
			padding-bottom: 10upx;
		}

		.main {
			margin-top: 20upx;

			.business-row {
				display: flex;
				justify-content: space-between;

				&>view {
					width: 43%;
					display: flex;
					justify-content: space-between;

					&>text:first-child {
						font-size: 20px;
						font-family: PingFang-SC-Regular;
						font-weight: 400;
						color: rgba(186, 197, 203, 1);
					}

					&>text:last-child {
						font-size: 22px;
						font-family: PingFang-SC-Regular;
						font-weight: 400;
						color: rgba(45, 47, 86, 1);
					}
				}
			}

			.attestation-info {
				display: flex;
				justify-content: space-between;
				margin-top: 58upx;

				.attestation {
					image {
						width: 25upx;
						height: 25upx;
						vertical-align: middle;
					}

					text {
						font-size: 20px;
						font-family: PingFang-SC-Regular;
						font-weight: 400;
						color: rgba(140, 151, 157, 1);
						margin-left: 20upx;
					}
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
