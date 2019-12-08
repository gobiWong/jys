<template>

	
		<view class="popup-draw" :animation='animationData'>
			<view class="popup">
				<view class='Popup-head'>安全验证</view>
				<view>
					<view class="account">{{account}}</view>
					<view class="code-container">
						<input type="number" value="" v-model='verificationCode' />
						<button @tap='sendMSM'>{{time>=60?'发送':time+'s'}}</button>
					</view>
				</view>
			</view>
		</view>


</template>

<script>
	import {
		mapState
	} from 'vuex';
	import {
		sendCode
	} from '@/api/auth';
	export default {

		data() {
			return {
				timer: null,
				time: 60,
				verificationCode: '',
				animationData:'',
				animation:''
			}
		},
		watch: {
			verificationCode(val) {
				if (val.length >= 6) {

					this.$emit('callBack', val.slice(0, 6))
				}
			}
		},
		props: {
			type: {
				default: 0,
				type: Number
			}
		},
		created() {
			var animation = uni.createAnimation({
				duration: 200,
				timingFunction: 'ease',
				transformOrigin: "0% 0% 0",
			})
			this.animation = animation;
		},
		computed: {
			...mapState('user', ["userinfo"]),
			account() {
				return this.$props.type == 0 ? this.userinfo.phoneNo : this.userinfo.mailbox;
			},
			areaNo() {
				return this.$props.type == 0 ? this.userinfo.areaCode : null;
			}
		},
		methods: {
			sendMSM() {
				if (this.time < 60) {
					return false
				};
				sendCode({
						type: this.$props.type,
						number: this.account,
						areaNo: this.areaNo,
					})
					.then(res => {
						if (res.data.code == 200) {
							clearInterval(this.timer);
							this.timer = setInterval(() => {
								this.time--;
								if (this.time <= 0) {
									clearInterval(this.timer);
									this.time = 60
								}
							}, 1000)
						}

					})
			},
			openPopup() {
				this.animation.translateY(0).step();
				this.animationData = this.animation.export();

			},
			closePopup() {
				this.animation.translateY('100%').step();
				this.animationData = this.animation.export();
			}
		}
	}
</script>

<style scoped lang='scss'>
	
	.popup-draw {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		transform: translateY(100%);
	}

	.popup {
		background-color: #FFF;

		&>view:last-child {
			padding: 0 48upx;
		}
	}

	.Popup-head {
		height: 91px;
		line-height: 91upx;
		text-align: center;
		box-shadow: 0px 3px 8px 0px rgba(53, 48, 15, 0.07);
		font-size: 30px;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		color: rgba(45, 47, 86, 1);
	}

	.account {
		font-size: 24px;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		line-height: 24px;
		margin-top: 58upx;
		margin-bottom: 29upx;
		color: rgba(45, 47, 86, 1);
	}

	.code-container {
		display: flex;
		padding-bottom: 93upx;

		input {
			width: 458px;
			height: 50px;
			border: 2px solid rgba(221, 221, 234, 1);
			border-radius: 10px;
			padding-left: 20upx;
			box-sizing: border-box;
			font-size: 28upx;
		}

		button {
			width: 141px;
			height: 50px;
			background: rgba(107, 135, 255, 1);
			border-radius: 10px;
			line-height: 50upx;
			font-size: 26px;
			font-family: PingFang-SC-Medium;
			font-weight: 500;
			color: rgba(255, 255, 255, 1);
		}
	}
</style>
