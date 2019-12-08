<template>
	<view>
		<view class="activity">
			<!-- 图 -->
			<view class="activity-image">
				<view v-for="(item, index) in SettingList" :key="index">
					<view>{{ item.projectName }}</view>
					<image :src="item.showImg" mode="" @tap="List(item.id, item.virtualWalletName, item.virtualWalletId,item.showImg)"></image>
				</view>
				<!-- 没有更多 -->
				<view @tap="onReachBottoms" class="uni-loadmore">{{ loadMoreText }}</view>
			</view>
		</view>
	</view>
</template>

<script>
import {mapState } from 'vuex';
import { toast } from '@/utils/toast';
import { makeNewSettingList } from '@/api/actved.js';
import request from '@/utils/request';
export default {
	data() {
		return {
			SettingList: [],
			loadMoreText: '查看更多',
			max: 0
		};
	},
	
	onPullDownRefresh() {
		console.log('onPullDownRefresh');
		this.setDate();
	},
    computed:{
		...mapState(['lang'])
	},
	created() {
		this.setDate();
		this.aaa()
	},
	methods: {
		// 语言
		aaa(){
			 uni.setNavigationBarTitle({
			     title:this.lang.activity
			 });
		},
		onReachBottoms(){
			this.setDate()
		},
		List(num, num1, num2,num3) {
			uni.navigateTo({
				url: '/pages/quotation/activity/index?id=' + num + '&virtualWalletName=' + num1 + '&virtualWalletId=' + num2+'&showImg='+num3
			});
		},
		
		setDate() {
			let SettingList = [];
			this.max += 8;
			uni.showNavigationBarLoading();
			makeNewSettingList({
				page: 1,
				rows: this.max
			}).then(res => {
				console.log(res.data);
				if (res.data.code == 200) {
					this.SettingList = res.data.data;
					
				} 
				for (var i = this.max - 9; i < this.max + 1; i++) {
					SettingList.push(i);
				}
				try {
					this.SettingList = JSON.parse(res.data).data;
				} catch (e) {
					this.SettingList = res.data.data;
				}
				
				uni.stopPullDownRefresh();
				uni.hideNavigationBarLoading()
			});
		}
	}
};
</script>

<style lang="scss">
.activity {
	padding: 0 30upx;
	.activity-image {
		width: 100%;
		height: 100%;
		& > view:nth-child(1) image {
			width: 100%;
			height: 260upx;
		}
		& > view:nth-child(2) image {
			width: 100%;
			height: 260upx;
			margin-top: 30upx;
		}
		& > view:nth-child(3) image {
			width: 100%;
			height: 260upx;
			margin-top: 30upx;
		}
		& > view:nth-child(4) image {
			width: 100%;
			height: 260upx;
			margin-top: 30upx;
		}
	}
}
</style>
