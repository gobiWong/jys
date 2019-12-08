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
					<image src="/static/assert/restPass-actved.png"></image>
					<text>{{lang.reseted}}</text>
				</view>
			</view>
		</view>
		<view class="login-cell">
			<image src='/static/assert/pass-login.png' style='width:33upx;height:41upx;margin-left: 26upx;' />
			<input class='input' type="text" password value="" placeholder-class='input-placeholder' :placeholder='lang.Pleaseenter'
			 v-model="newPassword" />
		</view>
		<view class="login-cell">
			<image src='/static/assert/pass-login.png' style='width:33upx;height:41upx;margin-left: 26upx;' />
			<input class='input' type="text" password value="" placeholder-class='input-placeholder' :placeholder='lang.Pleaseenter'
			 v-model='confirmPassword' />
		</view>
		<view class='login-button'>
			<button @tap="forgetPassword">{{lang.determine}}</button>
		</view>

	</view>
</template>

<script>
	
	import {mapActions,mapState} from 'vuex';
	import { toast } from '@/utils/toast'
	import { forgetPassword } from '@/api/user';
	export default {
		data() {
			return {
				confirmPassword: '',
				newPassword: '',
				uuid:''
			}
		},
		onLoad(options) {
			this.uuid=options.uuid;
			this.aaa()
		},
		computed:{
			...mapState([
				'lang'
			]),
		},
		methods: {
			aaa(){
				uni.setNavigationBarTitle({
				    title:this.lang.reset
				});
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			forgetPassword(){
				if(this.newPassword=='' || this.confirmPassword==''){
					toast(this.lang.theoptions)
				}else if(this.newPassword!=this.confirmPassword){
					toast(this.lang.match)
				}else{
				forgetPassword({uuid:this.uuid,newPassword:this.newPassword,confirmPassword:this.confirmPassword})
					.then(res=>{
						if(res.data.code==200){
							uni.redirectTo({
								url:'./login'
							})
						}
					})
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
		&>view.dot{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: flex-start;
			margin-top: 27px;
			text{
				width: 8px;
				height: 8px;
				background-color: #FFF;
				border-radius: 50%;
				margin-left: 38upx;
			}
			&>text:last-child{
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
