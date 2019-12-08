<template>
	<view class='page-body'>
		<view class="login-header">
			<statusBar></statusBar>
			<!-- <view class="back-head">
				<image src="/static/img/back-icon-white.png" @tap='back'></image>
			</view> -->
		</view>
		<view class="login-cell">
			<image src="/static/assert/account-icon.png" style='width:41upx;height:41upx;margin-left: 22upx;margin-right: 4upx;'></image>
			<input type="text" :placeholder='lang.address' placeholder-class='input-placeholder' class='input' v-model='account' />
		</view>
		<view class="login-cell">
			<image src='/static/assert/pass-login.png' style='width:33upx;height:41upx;margin-left: 26upx;' />
			<input class='input' type="text" password value="" placeholder-class='input-placeholder' :placeholder='lang.Pleaseenter'
			 v-model='password' />
		</view>
		<view class='login-button'>
			<button @tap="onlogin">{{lang.login}}</button>
		</view>
		<view class='links' @tap="$nav('./findPass')">{{lang.Forgot}}？</view>
		<view class='foot'>
			<view class='to-register' @tap="$nav('./register')">{{lang.Noaccount}}</view>
		</view>
	</view> 
</template>

<script>
	var wv;

	import {mapActions,mapState} from 'vuex';
	import { toast } from '@/utils/toast';
	export default {
		data() {
			return {
				current: 0,
				areaCode: "+86",
				account: '',
				password: '',
				type: 0,
			}
		},
		created() {

		},
		computed: {
			...mapState(['lang']),
		},
		methods: {
			...mapActions('user', ['loginInfo']),
			
			// back(){
			// 	uni.navigateBack({
			// 		delta:1
			// 	})
			// },
			siwperChange(e) {

				this.current = e.detail.current

			},
			radioChange(event) {

			},
			onlogin() {
				if (this.type == 0) {
					this.loginInfo({
						phoneNo: this.account,
						password: this.password,
						type: this.type,
					})
				} else if (this.type == 3) {
					this.loginInfo({
						mailbox: this.account,
						password: this.password,
						type: this.type,
					})
				}
			}

		},
		watch: {
			account(val) {
				if (val.indexOf('@') == -1) {
					this.type = 0;
				} else {
					this.type = 3;
				}
			}
		},

	}
</script>

<style lang="scss" scoped>
	.login-header {
		height: 340upx;
		padding: 0 30upx;

		.back-head {
			height: 90upx;
			line-height: 90upx;

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

	.login-cell {
		display: flex;
		align-items: center;
		margin: 0 auto;
		width: 543px;
		height: 87px;
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
</style>
