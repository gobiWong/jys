<template>
	<view class="Setupthe">
		<view @click="translat" class="Setupthe-two">
			<view>绿涨红跌</view>
			<view> 
				<view class="setting-free">
					<image v-show="settingone" src="../../static/assert/xuanzhong.png" mode=""></image>			
				</view>
			</view>
		</view>
		<view @click="translatiId" class="Setupthe-two">
			<view>红涨绿跌 </view>
			<view>
				<view class="setting-free">
					<image v-show="settingtwo" src="../../static/assert/xuanzhong.png" mode=""></image>			
				</view>
			</view>
		</view>			
	</view>
</template>

<script>
export default {
	data() {
		return {
			settingone:false,
			settingtwo:false,
		
			
			
		};
	},
	methods: {
		translat(){
			let that = this;
			that.settingone = true
			uni.navigateTo({
				//里面是一个对象形式的参数
				url: './Setupthe?fall=绿涨红跌',
				
			})
			
		},
		translatiId(){
			let that = this;
			that.settingtwo = true
			uni.navigateTo({
				//里面是一个对象形式的参数
				url: './Setupthe?fall=红涨绿跌',
				
			})
		},

	},
	
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
				image{
					width: 48upx;
					height: 47upx;
				}
				
			}
		}
	}
	
}
</style>
