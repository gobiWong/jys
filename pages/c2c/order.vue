<template>
	<view>
		<view class="page-head">
			<statusBar />
			<view class="head">
				<image src="/static/img/back-icon.png" @tap="back"></image>
				<image src="/static/assert/filter-icon-black.png" @tap="showDrawer=!showDrawer"></image>
			</view>
			<!-- 头部下拉栏 -->
			<head-drawer ref='drawer'>
				<template slot>
					<!-- 交易类型 -->
					<view class="status-tabs">
						<label>交易类型</label>
						<view>
							<text>购买</text>
							<text>出售</text>
						</view>
					</view>
					<!-- 订单状态 -->
					<view class="status-tabs">
						<label>订单状态</label>
						<view>
							<text>进行中</text>
							<text>已完成</text>
							<text>已取消</text>
							<text>申诉中</text>
						</view>
					</view>
					<view class="status-tabs">
						<label>交易区</label>
						<view>
							<text>普通</text>
							<text>大宗</text>
						</view>
					</view>
				</template>
			</head-drawer>
		</view>
		<view class="page-container">
			<!-- 头部 -->
			<view class="title">订单记录</view>
			<!-- 数据列表 -->
			<view class="data-list">
				<view class="data-li">
					<view class="li-thead">
						<view>
							<text>购买</text>
							<text class="margin-left-11">BTC</text>
						</view>
						<view>
							<text class="red-dot"></text>
							<text class="status">请付款</text>
							<image src="/static/assert/more-icon.png" class="more-icon"></image>
						</view>
					</view>
					<view class="li-tbody">
						<view>
							<text>时间</text>
							<text>数量(BTC)</text>
							<text>交易总额(CNY)</text>
						</view>
						<view>
							<text>15:21 07/11</text>
							<text>0.001216</text>
							<text>100.00</text>
						</view>
					</view>
					<view class="li-tfoot">郭本聪</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import headDrawer from '@/components/headDrawer'
	export default {
		data() {
			return {
				showDrawer: false,
			}
		},
		components: {
			headDrawer
		},
		methods: {
			show() {
				this.$refs.drawer.open();
			},
			close() {
				this.$refs.drawer.close();
			},
			back(){
				uni.navigateBack({
					delta:1
				})
			}
		},
		watch: {
			showDrawer(val) {
				if ( val) {
					this.show();
				} else {
					this.close();
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.page-head {
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 1;
	}

	.head {
		height: 90upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 30upx;
		// box-shadow: 2px 0px 20px 0px rgba(0, 0, 0, 0.05);
		position: relative;

		&>image:first-child {
			width: 17upx;
			height: 30upx;

		}

		&>image:last-child {
			width: 30upx;
			height: 30upx;
			;
		}
	}

	.title {
		font-size: 38upx;
		font-family: PingFang-SC-Bold;
		font-weight: bold;
		color: rgba(38, 37, 80, 1);
		margin-left: 30upx;
	}

	.data-list {
		padding: 0 30upx;
		box-sizing: border-box;
		margin-top: 40upx;

		.data-li {
			background: rgba(255, 255, 255, 1);
			box-shadow: 2upx 0px 20upx 0px rgba(0, 0, 0, 0.05);
			border-radius: 10upx;
			height: 252upx;
			width: 100%;
			padding: 30upx;
			box-sizing: border-box;
			overflow: hidden;
			position: relative;
			z-index: -1;

			.li-thead {
				font-size: 28upx;
				font-family: PingFang-SC-Bold;
				font-weight: bold;
				color: rgba(45, 47, 86, 1);
				display: flex;
				align-items: center;
				justify-content: space-between;

				view {
					display: flex;
					align-items: center;
				}

				.margin-left-11 {
					margin-left: 11upx;
				}

				.red-dot {
					width: 11upx;
					height: 11upx;
					background: rgba(235, 55, 93, 1);
					border-radius: 50%;
					display: inline-block;
				}

				.status {
					margin-left: 4upx;
					margin-right: 24upx;
					font-size: 26upx;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: rgba(104, 129, 255, 1);
				}

				.more-icon {
					width: 9upx;
					height: 16upx;
				}
			}

			.li-tbody {
				margin-top: 20upx;
				line-height: 28upx;

				&>view {
					display: flex;
					justify-content: space-between;

					&>text {
						width: 33%;
					}

					&>text:first-child {
						text-align: left;
					}

					&>text:nth-child(2) {
						text-align: center;
					}

					&>text:last-child {
						text-align: right;
					}
				}

				&>view:first-child {
					font-size: 22upx;
					font-family: PingFang-SC-Regular;
					font-weight: 400;
					color: rgba(186, 197, 203, 1);
				}

				&>view:last-child {
					font-size: 24upx;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: rgba(140, 151, 157, 1);

				}
			}

			.li-tfoot {
				margin-top: 10upx;
				font-size: 26upx;
				font-family: PingFang-SC-Regular;
				font-weight: 400;
				color: rgba(45, 47, 86, 1);
			}
		}

		.data-li:after {
			content: ' ';
			position: absolute;
			left: 0;
			top: 0;
			width: 10upx;
			height: 100%;
			background-color: #8A9DFF;
		}
	}

	.status-tabs {
		&>label {
			font-size: 30px;
			font-family: PingFang-SC-Medium;
			font-weight: 500;
			color: rgba(45, 47, 86, 1);
			line-height: 30upx;
			margin-bottom: 40upx;
			margin-top: 50upx;
			display: inline-block;
		}

		&>view {
			display: flex;
			flex-flow: row wrap;
			font-size: 0;

			text {

				width: 210px;
				height: 60px;
				background: rgba(247, 247, 251, 1);
				border-radius: 30px;
				text-align: center;
				line-height: 60upx;
				margin-right: 30upx;
				font-size: 24px;
				font-family: PingFang-SC-Regular;
				font-weight: 400;
				color: rgba(140, 151, 157, 1);
			}

			&>text:nth-child(3n) {
				margin-right: 0;
			}

			&>text:nth-child(n+4) {
				margin-top: 25upx;
			}
		}
	}
</style>
