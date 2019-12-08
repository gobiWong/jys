<template>
	<view>
		<view class="notice">
			<view>
				<view class="notice-one" v-for="(item, index) in noticTwo" :key="index">
					<view>{{ item.loginType }}</view>
					<view>{{ item.createTime }}</view>
				</view>
				<view class="loading" @tap="onReachBottoms">{{ contentdown }}</view>
			</view>
		</view>
	</view>
</template>

<script>
var _self,
	page = 1,
	timer = null,
	getMove = 5;
import { mapState, mapActions } from 'vuex';
import wsLoadMore from '@/components/uni-load-more/uni-load-more.vue';
export default {
	data() {
		return {
			noticTwo: [],
			contentdown: '查看更多'
		};
	},
	components: {
		wsLoadMore
	},
	onLoad: function() {
		_self = this;
		_self.noticeru();
	},
	// 下拉刷新
	onPullDownRefresh: function() {
		
		_self.noticeru();
	},
	// 上拉加载

	computed: {
		...mapState('user', ['userinfo']),
		...mapState(['lang'])
	},
	created() {
		this.aaa()
	},
	methods: {
		// 语言
		aaa(){
			 uni.setNavigationBarTitle({
			     title:this.lang.notice
			 });
		},
		onReachBottoms() {
			this.noticeru();
		},
		noticeru() {
			
			page = 1;
			getMove++;
			_self.loadingType = 0;
			uni.showNavigationBarLoading();
			uni.request({
				header: {
					'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
				},
				dataType: 'json',
				url: 'http://103.214.146.192/app/loginLog/ipManage?page=' + page,
				data: {
					rows: getMove,
					token: this.userinfo.token
				},

				method: 'GET',
				success: res => {
					getMove++;
					console.log(res.data);
					this.noticTwo = res.data.data;
					uni.stopPullDownRefresh();
					uni.hideNavigationBarLoading();
				}
			});
		}
	}
};
</script>

<style lang="scss">
.notice {
	padding: 0 26upx;

	.notice-one {
		width: 100%;
		// height: 100%;
		overflow: auto;
		border-bottom: 1upx solid #e6e6e6;
		padding-top: 30upx;
		padding-bottom: 20upx;

		& > view:nth-child(1) {
			font-size: 30upx;
			font-family: PingFang-SC-Medium;
			font-weight: 500;
			color: rgba(51, 51, 51, 1);
		}

		& > view:nth-child(2) {
			font-size: 24upx;
			font-family: PingFang-SC-Regular;
			font-weight: 400;
			color: rgba(153, 153, 153, 1);
		}
	}
}

.loading {
	font-size: 30upx;
	font-family: PingFang-SC-Regular;
	font-weight: 400;
	color: rgba(153, 153, 153, 1);
	margin-top: 19upx;
	text-align: center;
	display: flex;
	justify-content: center;
}
</style>
