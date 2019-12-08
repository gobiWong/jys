<template>
	<view class='page-body'>
		<view class="login-header">
			<statusBar></statusBar>
			<view class="back-head">
				<image src="/static/img/back-icon-white.png" @tap='back'></image>
				<text>{{lang.Retrieve}}</text>
				<text></text>
			</view>
			<view class="rest-step">
				<view>
					<image src="/static/assert/vatiy.png"></image>
					<text>{{lang.authenticate}}</text>
				</view>
				<view class='dot'>
					<text></text>
					<text></text>
					<text></text>
				</view>
				<view>
					<image src="/static/assert/restPassword.png"></image>
					<text>{{lang.reseted}}</text>
				</view>
			</view>
		</view>
		<view class="login-cell">
			<image src="/static/assert/account-icon.png" style='width:41upx;height:41upx;margin-left: 22upx;margin-right: 4upx;'></image>
			<input type="text" :placeholder='lang.address' placeholder-class='input-placeholder' class='input' v-model='account' />
		</view>
		<view class="login-cell-code">
			<input class='input' type="text" password value="" placeholder-class='input-placeholder' :placeholder='lang.codee'
			 v-model='verificationCode' />
			<text @tap="sendSms">{{time>=60? lang.Getcode:time+'s'}}</text>
		</view>
		<view class='login-button'>
			<button @tap="submit">{{lang.determine}}</button>
		</view>

	</view>
</template>

<script>
	var wv;

	import {
		mapActions,mapState
	} from 'vuex';
	import {
		sendCode
	} from '@/api/auth';
	import { toast } from '@/utils/toast'
	import { getAreaCode,verifyIdentidy } from '@/api/user';
	export default {
		data() {
			return {
				areaCode: "86",
				account: '',
				type: 0,
				timer: null,
				time: 60,
				verificationCode:'',
			}
		},
		created() {
			
		},
		computed: {
			...mapState([
				'lang'
			]),
		},
		methods: {
			submit(){
				if(this.account=='' && this.verificationCode==''){
					toast(this.lang.relevant);
				}
				var acountFrom={mailbox:this.account,phoneNo:this.account};
				delete acountFrom[Object.keys(acountFrom)[this.type]];
				verifyIdentidy({type:this.type,verificationCode:this.verificationCode,...acountFrom}).then(
				res=>{
					if(res.data.code==200){
						this.$nav('./restPass?uuid='+res.data.data.uuid);
					}
				})
				
			},
			sendSms() {
				if(this.time!=60){
					return false;
				}else if(this.account==''){
					toast(this.lang.enteraccount);
				}else if(this.account.indexOf('@')==-1){
					this.areaCode=getAreaCode(this.account);
					this.type=0;
				}else{
					this.type=1;
				}
				sendCode({
						type: this.type,
						number: this.account,
						areaNo: this.areaCode
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
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			siwperChange(e) {

				this.current = e.detail.current

			},
			radioChange(event) {

			},
	

		},
		

	}
</script>

<style lang="scss" scoped>
	.login-header {
		height: 340upx;
		padding: 0 30upx;

		.back-head {
			&>text:first-of-type {
				font-size: 30px;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
			}

			height: 90upx;
			line-height: 90upx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			image {
				width: 17upx;
				height: 31upx;
				vertical-align: middle;
			}
		}

	}

	.page-body {
		background: linear-gradient(232deg, rgba(104, 129, 255, 1), rgba(115, 156, 255, 1));
		min-height: 100%;
	}

	uni-page-body {
		height: 100%;
	}

	.login-cell-code {
		margin: 0 auto;
		width: 543px;
		height: 87px;
		display: flex;
		align-items: center;
		margin-bottom: 52upx;

		&>input {
			width: 317px;
			height: 87px;
			background: rgba(140, 167, 255, 1);
			border-radius: 10px;
			font-size: 26px;
			font-family: PingFang-SC-Regular;
			font-weight: 400;
			color: rgba(255, 255, 255, 1);
			padding-left: 20upx;
		}

		&>text {
			margin-left: 61upx;
			font-size: 26px;
			font-family: PingFang-SC-Medium;
			font-weight: 500;
			color: rgba(255, 255, 255, 1);
		}

		.input-placeholder {
			font-size: 26px;
			font-family: PingFang-SC-Regular;
			font-weight: 400;
			color: rgba(254, 254, 254, 1);
		}


	}

	.login-cell {
		display: flex;
		align-items: center;
		margin: 0 auto;
		width: 543px;
		height: 87px;
		margin-top: 100upx;
		background: rgba(140, 167, 255, 1);
		border-radius: 10px;
		margin-bottom: 52upx;

		image {}

		.input {
			font-size: 26upx;
			font-family: PingFang-SC-Regular;
			font-weight: 400;
			color: rgba(254, 254, 254, 1);
			padding: 0 35upx;
		}

		.input-placeholder {
			font-size: 26px;
			font-family: PingFang-SC-Regular;
			font-weight: 400;
			color: rgba(254, 254, 254, 1);
		}


	}

	.login-button {
		button {
			width: 543px;
			height: 87px;
			line-height: 87upx;
			background: rgba(140, 167, 255, 1);
			border: 1px solid rgba(140, 167, 255, 1);
			border-radius: 10px;
			border: 0;
			outline: none;
			font-size: 28px;
			font-family: PingFang-SC-Medium;
			font-weight: 500;
			color: rgba(217, 226, 255, 1);
		}
	}

	.links {
		font-size: 22px;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
		text-align: center;
		margin-top: 25upx;
	}

	.foot {
		width: 100%;
		position: fixed;
		bottom: 231upx;

		.to-register {
			font-size: 28px;
			font-family: PingFang-SC-Medium;
			font-weight: 500;
			color: rgba(255, 255, 255, 1);
			text-align: center;
		}
	}

	.rest-step {
		justify-content: center;
		display: flex;
		margin-top: 92upx;

		&>view.dot {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: flex-start;
			margin-top: 27px;

			text {
				width: 8px;
				height: 8px;
				background-color: #FFF;
				border-radius: 50%;
				margin-left: 38upx;
			}

			&>text:last-child {
				margin-right: 38upx;
			}
		}

		&>view {
			display: flex;
			flex-direction: column;
			align-items: center;

			image {
				width: 66upx;
				height: 66upx;
			}

			text {
				font-size: 26px;
				font-family: PingFang-SC-Regular;
				font-weight: 400;
				color: rgba(254, 254, 254, 1);
			}
		}
	}
</style>
