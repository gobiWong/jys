<template>
	<view>
		<statusBar></statusBar>
		<view class="header">
			<view class="tabs">
				<view @tap="onreturn"><image src="../../static/assert/fanhui.png" mode=""></image></view>
				<view class="tabs-img">
					<text :class="{ actived: typeIndex == 1 }" @tap="typeIndex = 1">充币记录</text>
					<text :class="{ actived: typeIndex == 2 }" @tap="typeIndex = 2">提币记录</text>
				</view>
			</view>
		</view>

		<!-- 充币 测试提交-->
		<view class="page-container" v-if="typeIndex == 1 ? true : false">
			<view class="record-list">
				<!-- 记录列表 -->
				<view class="recordImg" v-show="Successful.length == 0">
					<image src="../../static/assert/nodata-bg.png" mode=""></image>
					<view class="image-img">暂无记录</view>
				</view>
				<view >
					<view class="record-li" v-for="(item, index) in Successful" :key="index" @tap="orderDtailId(item.id)">
						<view class="record-li-left">
							<view>{{ item.virtualWalletWithdrawNumber }} {{ item.virtualWalletName }}</view>
							<view>{{ item.createTime }}</view>
						</view>
						<view class="record-li-right">
							<text>{{ item.typeDesc }}</text>
							<image src="/static/assert/order_success.png" class="order_success"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 提币 -->
		<view class="page-container" v-if="typeIndex == 2 ? true : false">
			<view class="record-list">
				<!-- 记录列表 -->
				<view class="recordImg" v-show="Mention.length == 0">
					<image src="../../static/assert/nodata-bg.png" mode=""></image>
					<view class="image-img">暂无记录</view>
				</view>
				<view >
					<view class="record-li" v-for="(item, index) in Mention" :key="index" @tap="orderDtailEd(item.id)">
						<view class="record-li-left">
							<view>{{ item.virtualWalletWithdrawNumber }} {{ item.virtualWalletName }}</view>
							<view>{{ item.createTime }}</view>
							<!-- 需要后台添加一个全名字段 -->
							<view>{{ item.virtualWalletName }}--English</view>
						</view>
						<view class="record-li-right">
							<text>{{ item.typeDesc }}</text>
							<image src="/static/assert/order_success.png" class="order_success"></image>
						</view>
					</view>
				</view>

				<!-- 没有更多 -->
				<view class="uni-loadmore" v-if="showLoadMore">{{ loadMoreText }}</view>
			</view>
		</view>
	</view>
</template>

<script>
import { toast } from '@/utils/toast';
import request from '@/utils/request';
import { mapState, mapActions } from 'vuex';
export default {
	data() {
		return {
			typeIndex: 1,
			Successful: [],
			Mention: [],
			loadMoreText: '加载中...',
			showLoadMore: false,
			max: 0,
			fullName: '', //链名称
			currency: '', //币种图标
			uuid: '',
			name: ''
		};
	},

	computed: {
		...mapState('user', ['userinfo'])
	},
	onLoad(options) {
		this.interface();
		this.ForWithdraw();
		console.log(options, 8888888888);
		// var msg
		// uni.getStorage({
		// 	key:'msg',
		// 	success(e){
		// 		msg = JSON.parse(e.data)
		// 		console.log(JSON.parse(e.data),3213232)
		// 	}
		// })
		// this.typeIndex = options.typeIndex; // 字符串转对象
		// this.currency = options.currency;
		// try {
		this.fullName = options.fullName;
		// } catch (e) {
		// 	//TODO handle the exception
		// this.fullName = JSON.parse(options.fullName);
		// }
		// 字符串转对象
	},
	onUnload() {
		(this.max = 0), (this.Mention = []), (this.loadMoreText = '加载更多'), (this.showLoadMore = false);
	},
	onPullDownRefresh() {
		console.log('onPullDownRefresh');
		this.interface();
	},
	onReachBottom() {
		console.log('onReachBottom');
		if (this.max > count) {
			this.loadMoreText = '没有更多数据了!';
			return;
		}
		this.showLoadMore = true;
		setTimeout(() => {
			this.setDate();
		}, 300);
	},
	methods: {
		onreturn() {
			uni.navigateBack({
				delta: 1
			});
		},
		// 充币
		ForWithdraw() {
			request('/coinTrade/getUserCoinTradeList', 'POST', {
				token: this.userinfo.token,
				type: 1,
				page: 1,
				rows: 7
			}).then(res => {
				// console.log(res.data);
				if (res.data.code == 200) {
					this.Successful = res.data.data;
				}
				for (var i = 0; i < this.Successful.length; i++) {
					this.uuid = this.Successful[i].id;
				}
				for (var i = 0; i < this.Successful.length; i++) {
					this.name = this.Successful[i].virtualWalletName;
				}
				try {
					this.Successful = JSON.parse(res.data).data;
				} catch (e) {
					this.Successful = res.data.data;
				}
			});
		},

		// 提币
		interface() {
			let Mention = [];
			this.max += 4;
			request('/coinTrade/getUserCoinTradeList', 'POST', {
				page: 1,
				rows: this.max,
				token: this.userinfo.token,
				type: 2
			}).then(res => {
				console.log(res.data);
				// this.Mention=res.data.data
				if (res.data.code == 200) {
					this.Mention = this.Mention.concat(res.data.data);
					console.log(this.Mention,'0000000000000000000000')
				}
				// for (var i = 0; i < this.Mention.length; i++) {
				// 	this.uuid = this.Mention[i].id;
				// }
				// for (var i = 0; i < this.Mention.length; i++) {
				// 	this.name = this.Mention[i].virtualWalletName;
				// }
				try {
					this.Mention = JSON.parse(res.data).data;
				} catch (e) {
					this.Mention = res.data.data;
				}
				for (var i = this.max - 9; i < this.max + 1; i++) {
					Mention.push(i);
				}
				uni.stopPullDownRefresh();
			});
		},

		// 刷新
		setDate() {
			let Mention = [];

			this.max += 3;
			request('/coinTrade/getUserCoinTradeList', 'POST', {
				token: this.userinfo.token,
				type: 2,
				rows: this.max,
				page: 1
			}).then(res => {
				console.log(res.data);
				if (res.data.code == 200) {
					this.Mention = this.Mention.concat(res.data.data);
				}
				try {
					this.Mention = JSON.parse(res.data).data;
				} catch (e) {
					this.Mention = res.data.data;
				}
				for (var i = this.max - 9; i < this.max + 1; i++) {
					Mention.push(i);
				}
			});
		},

		// 充币记录详详情！
// 		orderDtailId(num, num1, num2, num3) {
// 			// uni.setStorage({
// 			// key:'uuid',
// 			// data:num
// 			// }),
// 
// 			uni.navigateTo({
// 				url: './orderDetail?uuid=' + num + '&fullName=' + num1 + '&currency=' + num2 + '&name=' + num3
// 			});
// 		},
		//提币记录详情！
		orderDtailEd(id) {
			console.log(id)
			// uni.setStorage({
			// key:'uuid',
			// data:num
			// }),

			uni.navigateTo({
				url: `./orderDetail?id=${id}`
			});
		}
	}
};
</script>

<style scoped lang="scss">
.tabs {
	padding: 0 30upx;
	display: flex;

	& > view:nth-child(1) image {
		width: 16upx;
		height: 30upx;
		margin-top: 40upx;
	}
	.tabs-img {
		display: flex;
		justify-content: center;
		border: 3upx solid #6881ff;
		height: 100%;
		margin-top: 20upx;
		margin-left: 170upx;
		& > text {
			width: 150upx;
			background: #ffffff;
			text-align: center;
			font-size: 28upx;
			font-family: PingFang-SC-Medium;
			font-weight: 500;
			color: #6881ff;
		}

		& > text.actived {
			border: 1upx solid #6881ff;
			color: #ffffff;
			background: #6881ff;
			box-sizing: border-box;
		}
	}
}

.record-list {
	padding: 0 30upx;

	.record-li {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 123upx;
		border-bottom: 2px solid #f0f0f0;

		.order_success {
			width: 30upx;
			height: 21upx;
			vertical-align: middle;
			margin-left: 20upx;
		}

		.record-li-left {
			& > view:first-child {
				font-size: 26px;
				font-family: PingFang-SC-Regular;
				font-weight: 400;
			}

			& > view:last-child {
				font-size: 22px;
				font-family: PingFang-SC-Regular;
				font-weight: 400;
			}
		}

		.record-li-right {
			& > text {
				font-size: 22px;
				font-family: PingFang-SC-Regular;
				font-weight: 400;
				color: rgba(104, 129, 255, 1);
			}
		}
	}

	.recordImg {
		image {
			width: 379upx;
			height: 311upx;
			padding-top: 50%;
			display: flex;
			margin: 0 auto;
		}

		.image-img {
			font-size: 30upx;
			font-family: PingFang-SC-Regular;
			font-weight: 400;
			color: rgba(140, 151, 157, 1);
			margin-top: 68upx;
			text-align: center;
		}
	}
}
</style>
