<template>
	<view class="step">
		<!-- 提交 -->
		<view class="step-1">
			<view class="img-container">
				<image src="/static/assert/tijiao.png"></image>
			</view>
			<view class="description-container">
				<view>申诉申请已提交</view>
				<view>2019-06-23</view>
			</view>
		</view>
		<!-- 处理中 -->
		<view class="step-2">
			<view class="img-container">
				<image src="/static/assert/deal.png"></image>
			</view>
			<view class="description-container">
				<view>客服处理中</view>
			</view>
		</view>
		<!-- 处理完成 -->
		<view class="step-3">
			<view class="img-container">
				<image src="/static/assert/success.png"></image>
			</view>
			<view class="description-container">
				<view>处理完成</view>
				<view>2019-06-30</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {


			}
		},
		methods: {

		},

	}
</script>

<style lang="scss">
	.step {
		&>view {
			display: flex;
			margin-left: 30upx;

			.img-container {
				background-color: #D0D0D0;
				border-radius: 50%;
				text-align: center;
				margin-right: 50upx;
				position: relative;

				image {
					width: 45upx;
					height: 45upx;
					vertical-align: middle;
				}
			}
			
			.img-container::after {
				content: ' ';
				height: 89upx;
				position: absolute;
				bottom: -88upx;
				background-color: #D0D0D0;
				width: 5upx;
				left: calc(50% - 5upx / 2);
			}

			.description-container {
				display: flex;
				justify-content: center;
				flex-direction: column;

				&>view:first-child {
					font-size: 28upx;
					line-height: 28upx;
					font-family: PingFang-SC-Bold;
					font-weight: bold;
					color: rgba(45, 47, 86, 1);
				}

				&>view:last-child {
					font-size: 22upx;
					line-height: 22upx;
					margin-top: 20upx;
					font-family: PingFang-SC-Regular;
					font-weight: 400;
					color: rgba(186, 197, 203, 1);
				}

			}
		}

		&>.step-1 {
			margin-bottom: 87upx;

			.img-container {
				width: 99upx;
				height: 99upx;
				line-height: 99upx;

			}

		}

		&>.step-2 {
			margin-bottom: 87upx;

			.img-container {
				width: 81upx;
				height: 81upx;
				line-height: 81upx;
				margin-left: 9upx;

			}

			&>view {
				&>view:last-child {
					font-size: 28upx;
					font-family: PingFang-SC-Bold;
					font-weight: bold;
					color: rgba(45, 47, 86, 1);
					margin-top: 0;
				}
			}
		}

		&>.step-3 {
			.img-container {
				width: 81upx;
				height: 81upx;
				line-height: 81upx;
				margin-left: 9upx;
			}
			.img-container::after{
				content: '';
				position: inherit;
			}
		}
	}
</style>
