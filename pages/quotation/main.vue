<template>
	<view>
		<statusBar></statusBar>
		<view class="header">
			<!-- head left -->
			<view @tap="message"><image src="../../static/assert/xiaoxi.png" class="drawer-icon"></image></view>
			<view>
				<text class="symbol-text">{{ lang.symbol }}</text>
			</view>
			<!-- head right -->
			<view><image src="../../static/assert/search-icon.png" class="more-icon" @tap="$nav('./search')"></image></view>
		</view>
		<!-- 轮播图 -->
		<view class="page-section-spacing" @tap="$nav('./notice/activity')">
			<swiper :style="{ height: swierHeight + 'px' }" class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item><image style="width: 100%;height: 366upx;" src="../../static/assert/bananer2.png" mode=""></image></swiper-item>
				<swiper-item><image style="width: 100%;height: 366upx;" src="../../static/assert/bananer3.png" mode=""></image></swiper-item>
				<swiper-item><image style="width: 100%;height: 366upx;" src="../../static/assert/bananer1.png" mode=""></image></swiper-item>
			</swiper>
		</view>
		<!-- 通知 -->
		<view class="notice-one">
			<view class="image-one"><image src="../../static/assert/tongzhi.png" mode=""></image></view>
			<view class="chargeone">
				<swiper
					class="_swiper tc"
					@change="slideChange"
					:indicator-dots="false"
					autoplay="true"
					:interval="4000"
					circular="true"
					display-multiple-items="2"
					:duration="8000"
					:circular="true"
					
					@tap="$nav('./notice/announcement')"
				>
					<swiper-item><view class="swiper-item"></view></swiper-item>
					<swiper-item><view class="swiper-item"></view></swiper-item>
					<swiper-item v-for="(item, index) in list" :key="index">
						<view class="swiper-item ">{{ item.title }}</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<view class="container">
			<!--币种选择  -->
			<view class="coin-segment">
				<text class="coin-name" v-for="(item, index) in motherCoinNames" :Key="index" :class="{ actived: coinNamecurrent == index }" @tap="coinNamecurrent = index">
					{{ item }}
				</text>
			</view>

			<!-- 币种列表 -->
			<marketList :list="marketList"></marketList>
		</view>
	</view>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import marketList from '../../components/marketList.vue';
import { getlist, regularAnnouncement } from '@/api/assert.js';
export default {
	data() {
		return {
			symbol: '行情',
			marketList: [],
			coinNamecurrent: 1,
			current: 1,
			timer: null,
			list: ['123', '123', '123'],
			interverFlag: false,
			background: ['color1', 'color2', 'color3'],
			indicatorDots: false,
			autoplay: true,
			interval: 2000,
			duration: 500,
			flag:true
		};
	},
	onLoad() {
		regularAnnouncement().then(res => {
			if (res.data.code == 200) {
				this.list = res.data.data;
			}
			try {
				this.list = JSON.parse(res.data).data;
			} catch (e) {
				this.list = res.data.data;
			}
		});
		// this.$showLoading('数据加载中..')
		//进入队列 防止 getter未加载
		setTimeout(() => {
			this.getData(true);
		}, 100);
	},
	mounted() {
		this.flags()
		
	},
	computed: {
		...mapGetters(['motherCoinNames']),
		...mapState(['lang']),
		swierHeight() {
			return uni.getSystemInfoSync().windowHeight;
		}
	},
	watch: {
		coinNamecurrent() {
			// this.$showLoading('数据加载中..')
			this.getData(true);
		}
	},
	components: {
		marketList
	},
	onNavigationBarButtonTap(e) {
		switch (e.index) {
			case 0:
				break;
			case 1:
				this.$nav('./search');
				break;
		}
	},
	onUnload() {
		// clearInterval(this.timer);
	},
	methods: {
		flags(){
			
			
			uni.getStorage({
				key:'flag',
				success(e){
					
					if(e.data){
						console.log(321321321)
						uni.navigateBack();
						uni.setStorage({
							key: 'flag',
							data: false
						})
					}
				}
				
			})
		
			
		},
		slideChange() {},
		changeIndicatorDots(e) {
			this.indicatorDots = !this.indicatorDots;
		},
		changeAutoplay(e) {
			this.autoplay = !this.autoplay;
		},
		intervalChange(e) {
			this.interval = e.target.value;
		},
		durationChange(e) {
			this.duration = e.target.value;
		},
		// 跳转
		message() {
			uni.navigateTo({
				//里面是一个对象形式的参数
				url: 'message'
			});
		},
		...mapActions('quotation', ['setList']),
		intervalGetData() {
			this.timer = setInterval(() => {
				if (!interverFlag) {
					return interverFlag;
				}
				this.getData();
			}, 5000);
		},
		getData(loading) {
			getlist(this.motherCoinNames[this.coinNamecurrent]).then(
				res => {
					res = res.data;
					if (res.code == 200) {
						this.interverFlag = true;
						this.marketList = JSON.parse(JSON.stringify(res.data));
						this.setList(this.marketList);
					}
				},
				err => {
					//服务异常 就不执行定时
					clearInterval(this.timer);
				}
			);
		}
	}
};
</script>

<style lang="scss" scoped>
.header > view {
	display: flex;
	align-items: center;
}
.page-section-spacing {
	width: 100%;
	height: 366upx;
}
.notice-one {
	width: 80%;
	height: 75upx;
	background: rgba(255, 255, 255, 1);
	box-shadow: 0upx 3upx 8upx 1upx rgba(153, 153, 153, 0.09);
	border-radius: 5upx;
	margin: -40upx auto;
	padding: 0 20upx;
	display: flex;
	align-items: center;
	position: relative;
	z-index: 999;
}
.image-one image {
	width: 36upx;
	height: 30upx;
	align-items: center;
	justify-content: center;
}
.chargeone {
	font-size: 28upx;
	font-family: PingFang SC;
	font-weight: 400;
	color: rgba(51, 51, 51, 1);
	margin-left: 21upx;
	flex: 1;
}
.header {
	display: flex;
	height: 90upx;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	padding: 0 30upx;
	box-sizing: border-box;
	margin-top: 30upx;
}

.drawer-icon {
	width: 30upx;
	height: 30upx;
}
.more-icon {
	width: 29upx;
	height: 31upx;
}
.chart-icon {
	width: 37upx;
	height: 35upx;
	margin-right: 52upx;
}
.symbol-text {
	text-align: center;
	font-size: 36upx;
}
.container {
	display: flex;
	flex-direction: column;
	height: 100%;
}

.Segment {
	display: flex;
	padding: 0 30upx;
	box-sizing: border-box;
}

.Segment > text {
	height: 80upx;
	width: 20%;
	line-height: 80upx;
	text-align: center;
	border: 2px solid #e0e0e0;
	border-radius: 1px;
	box-sizing: border-box;
	color: #999999;
	font-family: PingFang-SC-Regular;
	border-right: 0;
}

.Segment > text:last-child {
	border: 2px solid #e0e0e0;
}

.coin-segment {
	padding: 0 30upx;
	margin-top: 20upx;
	border-bottom: 1px solid #e8e8e8;
	margin-top: 82upx;
}

.coin-name {
	font-size: 28px;
	font-family: PingFang-SC-Bold;
	font-weight: bold;
	color: rgba(175, 174, 174, 1);
	display: inline-block;
	padding: 0 9upx;
	text-align: center;
	position: relative;
	margin-left: 20upx;
	padding-bottom: 14upx;
}

.coin-name.actived {
	color: #457fd0;
	border-bottom: 1px solid #457fd0;
}

.coin-name.actived:after {
	content: ' ';
	position: absolute;
	height: 2px;
	width: 100%;
	bottom: 0;
	left: 0;

	background-color: #457fd0;
}

.Segment > text.actived {
	box-sizing: border-box;
	background-color: #457fd0;
	color: #fff;
}

.tab-bar {
	display: flex;
	margin: 20upx 20upx;
	border: 2upx solid #cfcfcf;
	border-radius: 10upx;
}

.tab-bar .tab-bar-item {
	text-align: center;
	height: 70upx;
	line-height: 70upx;
}

.tab-bar .active {
	background: #1478ca;
	color: #ffffff;
}

.rank {
	padding: 10px 0px;
}

.rank .title {
	padding: 10px 20px;
}

.rank .item {
	display: flex;
	padding: 20px 20px;
}

.rank .item .n {
	width: 35%;
}

.rank .item .p {
	width: 35%;
}

.rank .item .t {
	width: 30%;
	text-align: right;
}

.rank .item .t .light {
	display: block;
	width: 150px;
	color: #ffffff;
	text-align: center;
	float: right;
	border-radius: 4upx;
}

._notice {
	position: fixed;
	left: 0;
	top: 0;
	/* #ifdef H5 */
	top: 88upx;
	/* #endif */
	z-index: 9;
	width: 100%;
	background: rgba(72, 1, 1, 0.3);
	font-size: 20upx;

	height: 75upx;
	color: #ffffff;
	border-radius: 6upx;
	overflow: hidden;
	box-sizing: border-box;
}
._swiper {
	height: 75upx;
}
.swiper-item {
	line-height: 75upx;
	padding-left: 80px;
}
/deep/uni-swiper .uni-swiper-slide-frame{
	width: 100% !important;
	position: relative !important;
}
</style>
