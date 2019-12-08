<template>
	<view>
		<view class="announcement">
			<view @tap="details(item.title,item.createTime,item.content,item.days)" class="announcement-two" v-for="(item,index) in artists"
			 :key="index">
				<view>{{item.title}}</view>
				<view>
					<image src="../../../static/assert/more-icon.png" mode=""></image>
				</view>
				<view>{{item.createTime}}</view>
			</view>
			<view @tap="onReachBottoms" class="loading">
				{{loadingTxt}}
			</view>
		</view>
	</view>
</template>


<script>
	var _self, page = 1,
		timer = null,
		getMove = 3
	import {mapState } from 'vuex';
	export default {
		data() {
			return {
				artists: [],
				loadingTxt: '查看更多'
			};
		},
		onLoad: function() {
			_self = this;
			_self.eliminate()
		},

		onPullDownRefresh: function() {
			_self.eliminate()
		},
		computed:{
			...mapState(['lang'])
		},
		created() {
			this.aaa();
		},
		methods: {
			// 语言
			aaa(){
				 uni.setNavigationBarTitle({
				     title:this.lang.announcement
				 });
			},
			onReachBottoms(){
				this.eliminate()
			},
			details(num, num1, num2, num3) {
				let that = this;
				uni.navigateTo({
					url: './details?title=' + num + '&createTime=' + num1 + '&content=' + num2 + '&days=' + num3,

				});
			},
			eliminate() {
				page = 1;
				getMove++
				uni.showNavigationBarLoading();
				uni.request({
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					dataType: 'json',
					url: 'http://103.214.146.192/message/regularAnnouncement?page='+page,
					data: {
						rows: getMove,
						type:0
					},

					method: "GET",
					success: (res) => {
						console.log(res.data);
						this.artists = res.data.data;
						getMove++
						uni.stopPullDownRefresh();
						uni.hideNavigationBarLoading()
					}

				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.announcement {
		padding: 0 29upx;

		.announcement-two {
			width: 100%;
			height: 100%;
			border-bottom: 1upx solid #E6E6E6;
			padding-top: 30upx;
			padding-bottom: 20upx;

			&>view:nth-child(1) {
				font-size: 30upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
			}

			&>view:nth-child(2) image {
				float: right;
				clear: both;
				width: 16upx;
				height: 30upx;
			}

			&>view:nth-child(3) {
				font-size: 24upx;
				font-family: PingFang-SC-Regular;
				font-weight: 400;
				color: rgba(153, 153, 153, 1);
				margin-top: 19upx;
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
	}
</style>
