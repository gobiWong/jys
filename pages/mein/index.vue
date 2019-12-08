<template>
	<view>
		<view class="mine-header">
			<image src="/static/assert/default_avatar.png" class="avatar"></image>
			<view class="nav-menu" v-if='!userinfo.token'>
				<navigator url="/pages/auth/login">{{lang.login}}</navigator>
				<text>/</text>
				<navigator url="/pages/auth/register">{{lang.registered}}</navigator>
			</view>
			<view class="login-user" v-if='userinfo.token'>
				<view class="">{{userinfo.phoneNo || userinfo.mailbox}}</view>
				<view class="">UID:{{userinfo.id}}</view>
			</view>
		</view>
		<view class="auth-bg">
			<image src="/static/assert/auth-bg.png" mode=""></image>
		</view>
		<view class="option-menu">
			<view @tap="Chargemoney">
				<image src="/static/assert/chongbi.png"></image>
				<text>{{lang.Chargemoney}}</text>
			</view>
			<view @tap="Mentionmoney">
				<image src="/static/assert/tibi.png" class="tibi-icon"></image>
				<text>{{lang.Mention}}</text>
			</view>
		</view>
		<!-- 我的导航菜单 -->

		<view class="mine-menu-list">
			<!-- 账户安全 -->
			<view v-if='!userinfo.token' class="mine-menu-li" @tap='$nav("/pages/auth/login")'>
				<image src="/static/assert/accountsecurity-icon.png" class="thunmb accnoutsecurity"></image>
				<view class="left-view">
					<text class="menu-tilte">{{lang.Accountsecurity}}</text>
					<image src="/static/assert/more-icon.png" class="more-icon"></image>
				</view>
			</view>
			<view v-if='userinfo.token' class="mine-menu-li" @tap='$nav("./account/safety")'>
				<image src="/static/assert/accountsecurity-icon.png" class="thunmb accnoutsecurity"></image>
				<view class="left-view">
					<text class="menu-tilte">{{lang.Accountsecurity}}</text>
					<image src="/static/assert/more-icon.png" class="more-icon"></image>
				</view>
			</view>
			<!-- 身份认证 -->
			<view v-if='!userinfo.token' class="mine-menu-li" @tap='$nav("/pages/auth/login")'>
				<image src="/static/assert/idcard-icon.png" class="thunmb idcard"></image>
				<view class="left-view">
					<text class="menu-tilte">{{lang.authentication}}</text>
					<image src="/static/assert/more-icon.png" class="more-icon"></image>
				</view>
			</view>
			<view v-if='userinfo.token' class="mine-menu-li" @tap='$nav("./certification/index")'>
				<image src="/static/assert/idcard-icon.png" class="thunmb idcard"></image>
				<view class="left-view">
					<text class="menu-tilte">{{lang.authentication}}</text>
					<image src="/static/assert/more-icon.png" class="more-icon"></image>
				</view>
			</view>
			<!-- 邀请好友 -->
			<view v-if='!userinfo.token' class="mine-menu-li" @tap='$nav("/pages/auth/login")'>
				<image src="/static/assert/invate-friend.png" class="thunmb invate-friend"></image>
				<view class="left-view">
					<text class="menu-tilte">{{lang.Invite }}</text>
					<image src="/static/assert/more-icon.png" class="more-icon"></image>
				</view>
			</view>
			<view v-if='userinfo.token' class="mine-menu-li" @tap='$nav("./invite")'>
				<image src="/static/assert/invate-friend.png" class="thunmb invate-friend"></image>
				<view class="left-view">
					<text class="menu-tilte">{{lang.Invite }}</text>
					<image src="/static/assert/more-icon.png" class="more-icon"></image>
				</view>
			</view>
			<view class="mine-menu-li">
				<image src="/static/assert/help-icon.png" class="thunmb help"></image>
				<view class="left-view">
					<text class="menu-tilte">{{lang.Helpcenter}}</text>
					<image src="/static/assert/more-icon.png" class="more-icon"></image>
				</view>
			</view>
			<view class="mine-menu-li">
				<image src="/static/assert/kefu.png" class="thunmb kefu"></image>
				<view class="left-view">
					<text class="menu-tilte">{{lang.service}}</text>
					<image src="/static/assert/more-icon.png" class="more-icon"></image>
				</view>
			</view>
			<view class="mine-menu-li" @tap='$nav("./Setupthe")'>
				<image src="/static/assert/setting.png" class="thunmb setting"></image>
				<view class="left-view">
					<text class="menu-tilte">{{lang.Set}}</text>
					<image src="/static/assert/more-icon.png" class="more-icon"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState ,mapGetters} from 'vuex';
	export default {
		data() {
			return {

			}
		},
		created(){
			
				
			
		},
		computed: {
			...mapState('user', ['userinfo']),
			...mapGetters(['islogin']),
			...mapState(['lang'])
			    
		},
		components: {

		},
		methods: {
			
			// 跳转页面充币
			Chargemoney(){
				uni.navigateTo({
					url: '../coin/in/index',
					
				});
			},
			// 提币
			Mentionmoney(){
				uni.navigateTo({
					url: '../coin/out/index',
					
				});
			},
			go(url) {
				if(this.islogin){
					uni.navigateTo({
						url: url,
					});
				}else{
					uni.navigateTo({
						url:'/pages/auth/login'
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login-user {
		display: flex;
		flex-direction: column;
		align-items: center;

		&>view:first-child {
			font-size: 28upx;
			font-family: PingFang-SC-Medium;
			font-weight: 500;
			color: rgba(255, 255, 255, 1);
		}

		&>view:last-child {
			font-size: 22upx;
			font-family: PingFang-SC-Medium;
			font-weight: 500;
			color: rgba(255, 255, 255, 1);
		}
	}

	.mine-header {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding-top: 90upx;
		padding-bottom: 90upx;
		background: linear-gradient(232deg, rgba(104, 129, 255, 1), rgba(115, 156, 255, 1));

		.avatar {
			width: 115upx;
			height: 115upx;
			margin-bottom: 31upx;
		}

		.nav-menu {
			display: flex;
			font-size: 28upx;
			font-family: PingFang-SC-Medium;
			font-weight: 500;
			color: rgba(255, 255, 255, 1);
		}
	}

	.option-menu {
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding-bottom: 70upx;


		&>view {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			image {
				width: 38upx;
				height: 38upx;
			}

			.tibi-icon {
				width: 34upx;
				height: 43upx;
			}

			.huazhuan-icon {
				width: 50upx;
				height: 43upx;
			}

			text {
				font-size: 26px;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(45, 47, 86, 1);
				line-height: 26upx;
				margin-top: 17upx;
			}
		}
	}

	.mine-menu-list {
		padding: 0 30upx;

		.mine-menu-li {
			height: 93upx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.left-view {
				display: flex;
				align-items: center;
				border-bottom: 1px solid #F0F0F0;
				height: 100%;
				width: 100%;
				margin-left: 34upx;
				justify-content: space-between;

				.more-icon {
					width: 13upx;
					height: 24upx;
					vertical-align: middle;
					margin-left: 30upx;
				}
			}

			.menu-tilte {
				font-size: 30upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(45, 47, 86, 1);
			}
		}
	}

	.auth-bg {
		margin-top: -74upx;

		image {
			height: 86upx;
			width: 100%;
		}

	}

	// icon 大小
	.thunmb.accnoutsecurity {
		width: 31upx;
		height: 38upx;
	}

	.thunmb.idcard {
		width: 38upx;
		height: 31upx;
	}

	.thunmb.setting {
		width: 41upx;
		height: 37upx;
	}

	.thunmb.invate-friend {
		width: 39upx;
		height: 36upx;
	}

	.thunmb.help {
		width: 39upx;
		height: 39upx;
	}

	.thunmb.kefu {
		width: 39upx;
		height: 41upx;
	}
</style>
