<template>
	<view>
		<commonHead pageTitle='我的广告'></commonHead>
		<!-- 筛选 -->
		<view class='select-menu'>
			<view>
				<text>币种</text>
				<image src='/static/assert/select-arow-white.png'></image>
			</view>
			<view>
				<text>交易类型</text>
				<image src='/static/assert/select-arow-white.png'></image>
			</view>
			<view>
				<text>状态</text>
				<image src='/static/assert/select-arow-white.png'></image>
			</view>
			<view>
				<text>接单状态</text>
				<image src='/static/assert/select-arow-white.png'></image>
			</view>
		</view>
		<!-- 广告列表 -->
		<view>
			<view class="ad-card">
				<!-- 头部 -->
				<view class="ad-card-head">
					<view>
						<view class="">
							<text>出售</text>
							<text>BTC</text>
						</view>
						<image src="/static/assert/gengduo.png" class='more-icon'></image>
					</view>
					<view>
						<text>上架中</text>
						<text>2019-07-04 14:00:00</text>
					</view>
				</view>
				<!-- 主体部分 -->
				<view class="ad-card-body">
					<view class='body-top'>
						<view>
							<text>总数量（USDT）</text>
							<text>200</text>
						</view>
						<view>
							<text>剩余数量（USDT）</text>
							<text>200</text>
						</view>
					</view>
					<view class='body-bottom'>
						<view>价格（CNY）：6.25</view>
						<view>
							<my-switch></my-switch>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import commonHead from '../commonHead';
	import mySwitch from '@/components/my-switch.vue';
	export default {
		data() {
			return {

			}
		},
		components: {
			commonHead,
			mySwitch
		}
	}
</script>

<style scoped lang='scss'>
	.select-menu {
		margin-top: -150upx;
		display: flex;
		justify-content: space-between;
		padding: 0 30upx;

		&>view {
			padding: 5upx 17upx 5upx 17upx;
			background: rgba(34, 43, 83, 0.1);
			border-radius: 10px;

			text {
				font-size: 26px;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
				line-height: 26upx;

			}

			image {
				margin-left: 20upx;
				width: 19upx;
				height: 11upx;
				vertical-align: middle;
			}
		}

	}

	.ad-card {
		width: 690px;
		box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.02);
		border-radius: 20px;
		margin: 0 auto;
		overflow: hidden;
		margin-top: 41upx;

		.ad-card-head {
			height: 100upx;
			height: 100%;
			padding: 0 30upx;
			background-color: #F9FAFF; 

			&>view {
				display: flex;
				justify-content: space-between;

			}

			&>view:first-child {
				display: flex;
				align-items: center;

				text {
					font-size: 28px;
					font-family: PingFang-SC-Bold;
					font-weight: bold;
					color: rgba(45, 47, 86, 1);
				}
			}

			&>view:last-child {
				&>text:first-child {
					font-size: 22px;
					font-family: PingFang-SC-Regular;
					font-weight: 400;
					color: rgba(45, 47, 86, 1);
				}

				&>view:last-child {
					font-size: 22px;
					font-family: PingFang-SC-Regular;
					font-weight: 400;
					color: rgba(140, 151, 157, 1);
				}
			}

			.more-icon {
				width: 27upx;
				height: 5upx;
				vertical-align: middle;
			}
		}

		.ad-card-body {
			padding: 0 30upx;
			box-sizing: border-box;

			.body-top {
				margin-top: 30upx;
				border-bottom: 1px solid #F3F3F3;
				padding-bottom: 10upx;

				&>view {
					line-height: 60upx;

					text:first-child {
						font-size: 24px;
						font-family: PingFang-SC-Regular;
						font-weight: 400;
						color: rgba(186, 197, 203, 1);
						min-width: 250upx;
						display: inline-block;
					}

					text:last-child {
						font-size: 26px;
						display: inline-block;
						margin-left: 50upx;
						font-family: PingFang-SC-Regular;
						font-weight: 400;
						color: rgba(45, 47, 86, 1);
					}
				}
			}

			.body-bottom {
				display: flex;
				margin: 29upx 0;
				justify-content: space-between;

				view {
					font-size: 22px;
					font-family: PingFang-SC-Regular;
					font-weight: 400;
					color: rgba(140, 151, 157, 1);
				}
			}
		}
	}
</style>
