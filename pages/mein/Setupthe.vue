<template> 
	<view class="Setupthe">
		<view  @tap='$nav("./peoplesId")' class="Setupthe-two">
			<view>{{lang.Valuation}}</view>
			<view> 
				<view class="setting-free" style="display: flex;">
					<view>{{peoples}}</view>
					<view><image style="width:19upx;height: 35upx;" src="../../static/assert/more-icon.png" mode=""></image></view>
				</view>
			</view>
		</view>
		<view @tap='$nav("./marketId")' class="Setupthe-two">
			<view>{{lang.frequency}}</view>
			<view>
				<view class="setting-free" style="display: flex;">
					<view>{{market}}</view>
					<view><image style="width:19upx;height: 35upx;" src="../../static/assert/more-icon.png" mode=""></image></view>
				</view>
			</view>
		</view>
		<view @tap='$nav("./fallId")' class="Setupthe-two">
			<view>{{lang.rise}}</view>
			<view>
				<view class="setting-free" style="display: flex;">
					<view>{{fall}}</view>
					<view><image style="width:19upx;height: 35upx;" src="../../static/assert/more-icon.png" mode=""></image></view>
				</view>
			</view>
		</view>
		<view class="Setupthe-two">
			<view @tap="changeLang">{{lang.btn}}</view>
			<!-- <view>
				<view class="setting-free" style="display: flex;">
					<view>{{lang}}</view>
					<view><image style="width:19upx;height: 35upx;" src="../../static/assert/more-icon.png" mode=""></image></view>
				</view>
			</view> -->
		</view>
		<view class="Setupthe-one"><button @tap="bindLogin">{{lang.Logout}}</button></view>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
	data() {
		return {
			peoples:"人民币",
			market:"始终实时行情",
			fall:"绿涨红跌",
			
			
		};
	},
	onLoad(options){
		this.peoples = options.peoples
		this.market = options.market
		this.fall=options.fall
		this.aaa()
		
	},
	methods: { 
		
		...mapMutations('user', ['logout']),
		...mapMutations(['changeLang']),
		
		aaa(){
			uni.setNavigationBarTitle({
			    title:this.lang.Set
			});
		}, 
		bindLogin() {
			console.log(this.isLogin);
			if (this.isLogin) {
				this.logout();
				uni.switchTab({
					url: '/pages/mein/index'
					
				})
				
					
				
			}
		}
	},
	computed: {

		...mapState('user', ['isLogin', 'uerInfo']),
		...mapState([
			'lang'
		]),
		
		
	}
};
</script>

<style lang="scss" scoped>
.Setupthe {
	padding: 0 31upx;
	.Setupthe-two {
		display: flex;
		justify-content: space-between;
		border-bottom: 2upx solid #f0f0f0;
		margin-top: 49upx;

		& > view:nth-child(1) {
			font-size: 26upx;
			font-family: PingFang-SC-Regular;
			font-weight: 400;
			color: rgba(45, 47, 86, 1);
		}
		& > view:nth-child(2) {
			font-size: 26upx;
			font-family: PingFang-SC-Regular;
			font-weight: 400;
			color: rgba(45, 47, 86, 1);
			.setting-free {
				& > view:nth-child(1) {
					font-size: 26upx;
					font-family: PingFang-SC-Regular;
					font-weight: 400;
					color: rgba(45, 47, 86, 1);
				}
				& > view:nth-child(2) {
					margin-top: 6upx;
					margin-left: 21upx;
				}
			}
		}
	}
	.Setupthe-one button {
		width: 92%;
		height: 80upx;
		background: linear-gradient(-90deg, rgba(104, 129, 255, 1), rgba(115, 156, 255, 1));
		border-radius: 10upx;
		position: absolute;
		bottom: 89upx;
		font-size: 32upx;
		font-family: PingFang-SC-Regular;
		font-weight: 400;
		color: rgba(254, 254, 255, 1);
	}
}
</style>
