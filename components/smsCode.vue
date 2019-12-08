<template>
	<view>
		<uniPopup ref="popup" type="center" :custom='true' :maskClick='false'>
			
				<view class="pay-head">
					<text>请填写手机短信验证码</text>
					<text @tap="close">取消</text>
				</view>
				<view class="pay-body">
					<label>已发送到手机号：153****0239</label>
					<view class="numer-list">
						<input type="text" focus maxlength="6" @input="inputCode" />
						<view class="" v-for="(item,index) in codeArr" :key='index'>
							<text>{{item}}</text>
						</view>
					</view>
					<view class="link">
						<text>60S</text>
						<text>后重新获取</text>
					</view>
				</view>
				<view class="pay-foot">
					<button>确认</button>
				</view>
			
		</uniPopup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	export default {
		data() {
			return {
				codeArr: ['', '', '', '', '', '']
			}
		},
		components: {
			uniPopup
		},
		methods: {
			open() {
				this.$refs.popup.open()
			},
			close() {
				this.$refs.popup.close();
				this.$parent.codeArr = ['', '', '', '', '', ''];
			},
			inputCode(e) {
				var value = e.detail.value
				this.$parent.codeArr = Array(...this.$parent.codeArr);
				for (var i = 0; i < 6; i++) {
					if (value[i]) {
						this.$parent.codeArr[i] = value[i]
					} else {
						this.$parent.codeArr[i] = '';
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	.pay-head {
		width: 650upx;
		box-sizing: border-box;
		padding: 0 30upx;
		height: 100upx;
		background-color: #F7F7FB;
		border-radius: 10upx 10upx 0px 0px;
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
		width: 650upx;
		box-sizing: border-box;

		.numer-list {
			display: flex;
			justify-content: space-between;
			position: relative;
			height: 70upx;

			view {

				height: 70upx;

			}

			text {
				height: 70upx;
				line-height: 70upx;
				text-align: center;
				display: inline-block;
				width: 70upx;
				border: 2px solid rgba(230, 230, 230, 1);
				text-align: center;
				font-size: 36upx;
				font-family: PingFang-SC-Regular;
				font-weight: 400;
				color: rgba(104, 129, 255, 1);
			}

			input {
				position: absolute;
				width: 100%;
				height: 100%;
				opacity: 0;
				z-index: 10;
				background-color: red;
			}
		}

		label {
			font-size: 26upx;
			font-family: PingFang-SC-Medium;
			font-weight: 500;
			color: rgba(140, 151, 157, 1);
			line-height: 29upx;
			margin-top: 57upx;
			margin-bottom: 51upx;
			display: inline-block;
			width: 100%;
			text-align: left;
		}



		.link {
			font-size: 24upx;
			line-height: 24upx;
			font-family: PingFang-SC-Regular;
			font-weight: 400;
			// color: rgba(104, 129, 255, 1);
			margin-top: 22upx;
			display: block;
			text-align: right;

			&>text:first-child {
				color: rgba(104, 129, 255, 1);
				margin-right: 10upx;
			}
		}
	}

	.pay-foot {
		border-radius: 0px 0px 10upx 10upx;
		background-color: #FFF;
		width: 650upx;
		box-sizing: border-box;
		padding: 0 30upx;
		padding-top: 50upx;
		padding-bottom: 38upx;

		button {
			border: 0;
			height: 80upx;
			line-height: 80upx;
			background: linear-gradient(-90deg, rgba(104, 129, 255, 1), rgba(115, 156, 255, 1));
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
