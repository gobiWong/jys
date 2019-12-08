<template>
	<view>
		<my-head title='划转'>
			<template slot='right'>
				<image src="/static/assert/recording.png" class='recording-icon'></image>
			</template>
		</my-head>
		<view class="page-container">
			<view class='coin-nav'>
				<view>
					<text>选择币种</text>
					<text>BTC</text>
					<text>比特币</text>
				</view>
				<view>
					<image src="/static/assert/more-icon.png" class='more-icon'></image>
				</view>
			</view>
			<view class='transfer-option'>
				<!-- 划转类型 -->
				<view class='tranfer-type'>
					<!-- 划转来源 -->
					<view class='left-account'>
						<text>从</text>
						<view>
							<text>币币账户</text>
							<image src="/static/assert/select_arow.png" mode=""></image>
						</view>
					</view>
					<!-- 交换按钮 -->
					<view class='change-buttons'>
						<image src="/static/assert/change.png" class='change-icon'></image>
						<text>交换</text>
					</view>
					<!-- 划转去处 -->
					<view class='right-account'>
						<text>至</text>
						<view>

							<text>法币账户</text>
						</view>
					</view>
				</view>
				<!-- 划转数量 -->
				<view class="transfer-num">
					<view class="transfer-input">
						<input type="number" placeholder="请输入提取数量" class="input" placeholder-class="placeholder-class">
						<text>提取全部</text>
					</view>
					<view class="tips">最多可转0 BTC</view>
				</view>
			</view>
		</view>
		<view class="button-fixed">
			<button>确定划转</button>
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
	.recording-icon {
		width: 43upx;
		height: 40upx;
		vertical-align: middle;
	}

	.coin-nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 0 auto;
		width: 690px;
		height: 78px;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 2px 18px 0px rgba(64, 64, 112, 0.1);
		border-radius: 10px;
		padding-left: 50upx;
		padding-right: 26upx;
		box-sizing: border-box;
		margin-top: 26upx;

		&>view {
			&>text:first-child {
				font-size: 26px;
				font-family: PingFang-SC-Regular;
				font-weight: 400;
				color: rgba(45, 47, 86, 1);
				margin-right: 41upx;
			}

			&>text:nth-child(2) {
				margin-right: 28upx;
				font-size: 26px;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(45, 47, 86, 1);
			}

			&>text:last-child {
				font-size: 26px;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(186, 197, 203, 1);
			}
		}

		.more-icon {
			width: 19upx;
			height: 34upx;
			vertical-align: middle;

		}
	}

	.transfer-option {
		height: 444px;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 2px 18px 0px rgba(64, 64, 112, 0.1);
		border-radius: 10px;
		width: 690upx;
		margin: 0 auto;
		margin-top: 26upx;
		padding-top: 60upx;

		.tranfer-type {
			display: flex;
			width: 514upx;
			margin: 0 auto;
			justify-content: space-between;
			align-items: flex-start;

			.change-buttons {
				display: flex;
				flex-direction: column;

				.change-icon {
					width: 34upx;
					height: 34upx;
					vertical-align: middle;
					margin-bottom: 16upx;
				}

				text {
					font-size: 22px;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: rgba(104, 129, 255, 1);

				}

			}

			.left-account,
			.right-account {

				display: flex;
				align-items: center;

				&>text:first-child {
					margin-right: 10upx;
					font-size: 26px;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: rgba(45, 47, 86, 1);

				}

				&>view {
					font-size: 0;

					image {
						width: 18upx;
						height: 9upx;
						margin-left: 19upx;
						vertical-align: bottom;
					}

					text {
						line-height: 32upx;
						font-size: 32px;
						font-family: PingFang-SC-Bold;
						font-weight: bold;
						font-weight: 500;
						color: rgba(45, 47, 86, 1);
					}
				}
			}

			.right-account {
				margin-top: -2upx;
			}

		}

		.transfer-num {
			width: 590upx;
			margin: 0 auto;
			margin-top: 104upx;

			.transfer-input {
				display: flex;
				align-items: center;
				border-bottom: 3px solid #F0F0FA;
				padding-bottom: 26upx;

				input {
					flex: 1;
				}

				text {
					width: 133px;
					height: 54px;
					line-height: 54upx;
					border: 1px solid rgba(104, 129, 255, 1);
					border-radius: 27px;
					font-size: 26px;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: rgba(104, 129, 255, 1);
					text-align: center;
				}
			}

			.tips {
				font-size: 22px;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(140, 151, 157, 1);
			}
		}
	}

	.button-fixed {
		position: fixed;
		bottom: 20upx;
		width: 100%;
		box-sizing: border-box;
		padding: 0 30upx;

		button {
			background: linear-gradient(-90deg, rgba(104, 129, 255, 1), rgba(115, 156, 255, 1));
			border-radius: 10px;
			height: 80upx;
			line-height: 80upx;
			font-size: 32px;
			font-family: PingFang-SC-Medium;
			font-weight: 500;
			color: rgba(255, 255, 255, 1);
		}
	}
</style>
