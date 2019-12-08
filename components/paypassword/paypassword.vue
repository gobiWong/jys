<template>
	<view>
		<uniPopup ref="popup" type="bottom" :custom='true' :maskClick='false'>
			<block>
				<view class="pay-head">
					<text>安全验证</text>
					<text @tap="close">取消</text>
				</view>
				<view class="pay-body">
					<label>法币资金密码</label>
					<input type="text" value="" password class='input' placeholder-class="placeholder-class" placeholder="请输入法币资金密码" />
					<text class="link">忘记密码?</text>
				</view>
				<view class="pay-foot">
					<button>确认</button>
				</view>
			</block>
		</uniPopup>
	</view>
</template>

<script>
	import uniPopup from '../uni-popup/uni-popup.vue'
	export default {
		data() {
			return {

			};
		},
		components: {
			uniPopup
		},
		methods: {
			open() {
				this.$refs.popup.open()
			},
			close(){
				this.$refs.popup.close();
			}
		}
	}
</script>

<style lang="scss">
	.pay-head {
		padding: 0 30upx;
		height: 100upx;
		background-color: #F7F7FB;
		border-radius: 20upx 20upx 0px 0px;
		display: flex;
		align-items: center;
		justify-content: space-between;

		&>text:first-child {
			font-size: 36upx;
			font-family: PingFang-SC-Bold;
			font-weight: bold;
			color: rgba(0, 0, 54, 1);
		}

		&>text:last-child {
			font-size: 28upx;
			font-family: PingFang-SC-Medium;
			font-weight: 500;
			color: rgba(140, 151, 157, 1);
		}
	}

	.pay-body {
		background-color: #FFF;
		padding: 0 30upx;

		label {
			font-size: 26upx;
			font-family: PingFang-SC-Medium;
			font-weight: 500;
			color: rgba(140, 151, 157, 1);
			line-height: 29upx;
			margin-top: 29upx;
			margin-bottom: 20upx;
			display: inline-block;
		}

		input {
			height: 80upx;
			line-height: 80upx;
			border: 1px solid rgba(230, 230, 230, 1);
			border-radius: 10px;
			padding-left: 20upx;
		}

		.link {
			font-size: 24upx;
			line-height: 24upx;
			font-family: PingFang-SC-Regular;
			font-weight: 400;
			color: rgba(104, 129, 255, 1);
			margin-top: 22upx;
			display: block;
			text-align: right;
		}
	}

	.pay-foot {
		background-color: #FFF;

		padding: 0 30upx;
		padding-top: 50upx;
		padding-bottom:38upx;
		button {
			border: 0;
			height: 80upx;
			line-height: 80upx;
			background: linear-gradient(-90deg, rgba(197, 207, 213, 1), rgba(218, 228, 233, 1));
			border-radius: 10upx;
			font-size: 26upx;
			font-family: PingFang-SC-Medium;
			font-weight: 500;
			color: rgba(255, 255, 255, 1);
		}

		button.undisable {
			background: linear-gradient(-90deg, rgba(104, 129, 255, 1), rgba(115, 156, 255, 1));
		}
	}
</style>
