<template>
	<view>
		
		<!-- <my-head title='账户安全'></my-head> -->
		<!-- <view class="page-container"> -->
			<!-- 解锁 -->
			<!-- <view class="lock">
				<view>
					<view>
						<image src="/static/assert/gestureLock.png"></image>
						<text>手势登录</text>
					</view>
					<switch color="#4cd964" disabled />
				</view>
				<view>
					<view>
						<image src="/static/assert/fingerprintLock.png"></image>
						<text>指纹解锁</text>
					</view>
					<switch color="#4cd964" disabled />
				</view>
			</view> -->
			<!-- 安全级别 -->
	<!-- 		<view class="safety-level">
				<view>
					<text>安全级别 </text>
					<text class="level-text">低</text>
					<view class="level-pattern">
						<text></text>
						<text></text>
						<text></text>
					</view>
				</view>
				<view>为保证您的账户安全，以下验证请至少开启两项。</view>
			</view> -->
			<!-- 验证及密码  -->
			<view class="verification-list">
				<!-- 手机验证 -->
				<view class="verification-li">
					<view>
						<image src="/static/assert/safaty-mobile.png" style="width:28upx ;height:40upx;margin-left: 5upx;"></image>
						<text>{{lang.verification}}</text>
					</view>
					<view :class='{unbind:basisInformationInfo.phoneNo==0}'>
						<text v-show='basisInformationInfo.phoneNo!=0'>{{lang.binding}}</text>
						<text v-show='basisInformationInfo.phoneNo==0' @tap="$nav('./bindMobile')">{{lang.unbounded}}</text>
					</view>
				</view>
				<!-- 邮箱验证 -->
				<view class="verification-li" >
					<view>
						<image src="/static/assert/safaty-email.png" style="width:37upx ;height:31upx;"></image>
						<text>{{lang.Email}}</text>
					</view>
					<view :class='{unbind:basisInformationInfo.mailbox==0}'>
						<text v-show='basisInformationInfo.mailbox!=0'>{{lang.binding}}</text>
						<text v-show='basisInformationInfo.mailbox==0' @tap="$nav('./bindEmail')">{{lang.unbounded}}</text>
					</view>
				</view>
				<!-- 邮箱验证 -->
			<!-- 	<view class="verification-li">
					<view>
						<image src="/static/assert/safaty-google.png" style="width:37upx ;height:41upx;"></image>
						<text>谷歌验证</text>
					</view>
					<view>已绑定</view>
				</view> -->
					<!-- 登录密码 -->
				<view class="verification-li" @tap="$nav('./editPass')">
					<view>
						<image src="/static/assert/safaty-login-pass.png" style="width:37upx ;height:42upx;"></image>
						<text>{{lang.password}}</text>
					</view>
					<view>
						<text>{{lang.Modify}}</text>
					</view>
				</view>
					<!-- 法币资金密码 -->
				<view class="verification-li">
					<view>
						<image src="/static/assert/safaty-asset-pass.png" style="width:37upx ;height:42upx;"></image>
						<text>{{lang.Money}}</text>
					</view>
					<view class='asset-pass'>
						<view class='pass-options' v-show='basisInformationInfo.tradePassword!=0'>
							<text @tap="rest">{{lang.reset}}</text>
							<text  @tap="$nav('./editAssertPass')">{{lang.Forgot}}</text>
						</view>
						<text v-show='basisInformationInfo.tradePassword==0'  @tap="assert">{{lang.Set}}</text>
					</view>
				</view>
			</view>
			
		<!-- </view> -->
	</view>
</template>

<script>
	import {basisInformation} from '@/api/user.js';
	import {mapState } from 'vuex';
	export default {
		data() {
			return {
				basisInformationInfo:{},
			}
		},
		computed:{  
			...mapState('user', ['userinfo']),
			...mapState(['lang'])
		},
		mounted() {
			this.init();
		},
		onLoad(){
			this.init();
			this.aaa()
		},
		methods: {
			
			aaa(){
				 uni.setNavigationBarTitle({
				     title:this.lang.Accountsecurity
				 });
			},
			init(){
				basisInformation().then(res=>{
				if(res.data.code==200){
					this.basisInformationInfo=res.data.data;
					
				}
			})
			},
			assert(){
				var _self=this;
				if(this.userinfo.phoneNo===null){
					uni.showModal({
						cancelText:'取消',
						confirmText:'去绑定',
						cancelColor:'#6B87FF',
						confirmColor:'#6B87FF',
						content:'您还未绑定手机号',
						success:function(e) {
							if(e.confirm){
					 			_self.$nav('./bindMobile')
							}
						}
					})
				}else{
					uni.navigateTo({
						url:'/pages/mein/account/setAssterPass'
					})
				}
			},
			
			clicks() {
				
			},
			rest(){
				uni.showModal({
					showCancel:false,
					content:'为了您的账号和资金安全,请前往网页端完成相关操作.'
				})
			},
		},
	}
</script>

<style scoped lang="scss">
	.lock {
		padding: 0 30upx;
		box-sizing: border-box;


		&>view {
			height: 106upx;
			padding-bottom: 10upx;
			box-sizing: border-box;

			display: flex;
			align-items: center;
			justify-content: space-between;

			image {
				width: 33upx;
				height: 33upx;
				vertical-align: middle;
				margin-right: 35upx;
			}

			text {
				font-size: 30px;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(45, 47, 86, 1);
				vertical-align: middle;
			}
		}
	}

	.safety-level {



		&>view {
			display: flex;
			align-items: flex-end;
			padding: 0 30upx;
			font-size: 24px;
			font-family: PingFang-SC-Regular;
			font-weight: 400;
			color: rgba(157, 171, 179, 1);
		}

		.level-text {
			display: inline-block;
			font-size: 24px;
			font-family: PingFang-SC-Regular;
			font-weight: 400;
			color: rgba(235, 55, 93, 1);
			margin-left: 18upx;

		}

		.level-pattern {
			margin-left: 20upx;

			&>text {
				display: inline-block;
				margin-right: 4upx;
				width: 34px;
				height: 12px;
				background: rgba(235, 55, 93, 1);
				border-radius: 6px;

			}
		}
	}

	.verification-list {
		// margin-top: 32upx;
		.verification-li {
			width: 690px;
			height: 78px;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 2px 18px 0px rgba(64, 64, 112, 0.1);
			border-radius: 10px;
			margin: 0 auto;
			margin-bottom: 14px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-left: 29upx;
			padding-right: 19upx;
			box-sizing: border-box;
			&>view:first-child {
				
				image{
					vertical-align: middle;
					margin-right: 40upx;
				}
				text{
					font-size: 28px;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: rgba(45, 47, 86, 1);
					vertical-align: middle;
				}
			}

			&>view:last-child >text{
				font-size: 26px;
				font-family: PingFang-SC-Regular;
				font-weight: 400;
				color: rgba(157, 171, 179, 1);
			}
			
			&>view:last-child.unbind>text{
				color: #EB375D;
			}
		}
	}
	.asset-pass{
		.pass-options{
			&>text{
				display: inline-block;
			}
			&>text:first-child{
				margin-right: 20upx;
			}
		}
	}
</style>
