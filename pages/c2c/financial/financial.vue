<template>
	<view>
		<view class="finvid">
			<view class="freeze">
				<view class="frozen">
					{{currency}}
				</view>
				<!-- 可用 -->
				<view class="available">
					<view style="flex:1.6">{{lang.available}}</view>
					<view style="flex:2.4">{{lang.freeze}}</view>
					<view style="flex:1">{{lang.equivalent}}(CNY)</view>
				</view>
				<view class="details">
					<view style="flex:1.6">{{frozen}}</view>
					<view style="flex:2.4">{{activity}}</view>
					<view style="flex:1">{{CNYId}}</view>
				</view>
			</view>
			<!-- 财务 -->
			<view class="service">
				<view class="service-one">{{lang.Financialrecords}}</view>
				<view class="service-image">
					
					<image @tap="openPopup" src="../../../static/assert/gengduo.png" mode=""></image>
					<uni-popup ref="popup" type="bottom">
						<view class="pay">
							<view style="color: #6881FF;" @tap="closepull">{{lang.all}}</view>
							<view v-for="(item,index) in countrys" :key="index" @tap="addCountrysClass(item.salesStatus)">{{item.proceed}}</view>
							<view style="color: #6881FF;" @tap="closePopup">{{lang.cancel}}</view>
						</view>

					</uni-popup>
				</view>
			</view>
			<!-- 日期 -->
		<!-- 没有数据时 -->
		<view  v-if="!islogin || timeDate.length==0"  class="There">
			<image src="../../../static/assert/nodata-bg.png" mode=""></image>
			<view>{{lang.Norecord}}</view>
		</view>
			<view class="timedate" v-if="islogin && timeDate.length!=0" v-for="(item,index) in timeDate" :key="index">
				<view class="timeDiet">
					<view class="vertical"></view>
					<text>{{item.createTime}}</text>
				</view>
				<!-- 提币 -->
				<view class="mention">
					<view class="Mention">
						<view>{{item.recordName}}</view>
						<view>{{item.turnoverAmount}} {{item.virtualWalletName}}</view>
					</view>
					<view class="MentionDate">
						<view>{{item.createTime}}</view>
						<view>{{item.amountType}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '@/utils/request';
	import {mapGetters,mapState} from 'vuex';
	import uniPopup from "@/components/uni-popup/uni-popup.vue";
	export default {
		data() {
			return {
				timeDate: [], //日期
				CNYId: '',
				currency: '',
				frozen: "",
				activity: "",
				record: [],
				salesStatus: "",
				WalletId:'',
				loadingText: '加载中...',
				loadingType: 0, //定义加载方式 0---contentdown  1---contentrefresh 2---contentnomore
				contentText: {
					contentdown: '上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				countrys: [
					
					{
						proceed: "买入",
						salesStatus: "0"
					},
					{
						proceed: "卖出",
						salesStatus: "1"
					},
					{
						proceed: "充币",
						salesStatus: "2"
					},
					{
						proceed: "提币",
						salesStatus: "3"
					}
				],

			}
		},
		components: {
			uniPopup,
		},
		onLoad(options) {
			this.currency = options.currency,
			this.frozen = options.frozen,
			this.activity = options.activity,
			this.CNYId = options.CNYId,
			this.WalletId = options.WalletId
			this.information('1','')
			this.aaa()
		},
		computed: {
			...mapState('user', ['userinfo']),
			...mapGetters(['islogin']),
			...mapState(['lang'])
		},
		methods: {
			// 语言
			aaa(){
				 uni.setNavigationBarTitle({
				     title:this.lang.Financialrecords
				 });
			},
			// 全部
			closepull(){
				let that = this
				that.closePopup()
				that.information('1','')
				console.log(JSON.stringify(that.information))
			},
			addCountrysClass(index){	
				let that = this
				that.closePopup()
			    that.information('1',index)	
				console.log(that.information)
		
			},
			openPopup() {
				this.$refs.popup.open()
			},
			closePopup() {
				this.$refs.popup.close()
			},
			
			information(num,num1) {
				request('/app/userVirtualWallet/financialRecord', 'GET', {
					page: num,
					rows: 11,
					token: this.userinfo.token,
					virtuaWalletId:this.WalletId,
					type:num1
				}).then(res => {
					if (res.data.code == 200) {
						this.timeDate = res.data.data[length];	
					}
					try{
						this.timeDate = JSON.parse(res.data).data;			
					}catch(e){
						this.timeDate = res.data.data;			
						
					}
				});
			},
	
		}
	}
</script>

<style lang="scss" scoped>
	/deep/.uni-popup__wrapper.uni-custom.bottom .uni-popup__wrapper-box {
		width: 100%;
		max-height: 100%;
		overflow-y: scroll;
	}
	.finvid {
		padding: 0 30upx;

		.freeze {
			width: 100%;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 0px 5upx 1upx rgba(169, 169, 169, 0.16);
			border-radius: 10upx;
			margin-top: 23upx;
			padding-bottom: 39upx;

			.frozen {
				font-size: 36upx;
				font-family: PingFang-SC-Bold;
				font-weight: bold;
				color: rgba(104, 129, 255, 1);
				padding-top: 39upx;
				margin-left: 20upx;
			}

			// 可用
			.available {
				font-size: 26upx;
				font-family: PingFang-SC-Regular;
				font-weight: 400;
				color: rgba(192, 192, 192, 1);
				display: flex;
				padding: 0 20upx;
				margin-top: 30upx;
			}

			.details {
				font-size: 28upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(45, 47, 86, 1);
				display: flex;
				padding: 0 20upx;
				&>view{
					
					overflow: hidden;
					text-overflow: ellipsis;
				}
				
			}
		}

		// 财务
		.service {
			display: flex;
			justify-content: space-between;

			.service-one {
				font-size: 32upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
				padding-top: 45upx;
			}

			// 图
			.service-image image {
				width: 33upx;
				height: 7upx;
				padding-top: 70upx;
			}

			.pay {
				&>view {
					border-bottom: 1upx solid #F4F4F4;
					padding-bottom: 32upx;
					text-align: center;
					padding-top: 30upx;
				}
			}

		}
	// 没有数据时
	.There image {
		width: 379upx;
		height: 311upx;
		padding-top: 91upx;
		display: flex;
		margin: 0 auto;
	}

	.There view {
		font-size: 30upx;
		font-family: PingFang-SC-Regular;
		font-weight: 400;
		color: rgba(140, 151, 157, 1);
		text-align: center;
		margin-top: 68upx;
	}
		// 日期
		.timedate {
			height: 100%;
			width: 100%;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 0px 5px 1px rgba(169, 169, 169, 0.16);
			border-radius: 10px;
			margin-top: 30upx;

			.timeDiet {
				display: flex;
				border-bottom: 1upx solid #F1F1F1;
				padding-bottom: 29upx;

				.vertical {
					width: 3upx;
					height: 30upx;
					background: rgba(104, 129, 255, 1);
					margin-top: 29upx;
					margin-left: 20upx;
					border: 1px solid rgba(104, 129, 255, 1)
				}

				text {
					font-size: 28upx;
					font-family: PingFang-SC-Regular;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
					margin-top: 24upx;
					margin-left: 19upx;
				}
			}

			// 提币
			.mention {
				border-bottom: 1upx solid #F1F1F1;
				padding-bottom: 20upx;
				padding-top: 20upx;

				.Mention {
					display: flex;
					justify-content: space-between;
					padding: 0 20upx;

					&>view {
						font-size: 28upx;
						font-family: PingFang-SC-Medium;
						font-weight: 500;
						color: rgba(51, 51, 51, 1);
					}

				}

				.MentionDate {
					display: flex;
					justify-content: space-between;
					padding: 0 20upx;

					&>view {
						font-size: 24upx;
						font-family: PingFang-SC-Regular;
						font-weight: 400;
						color: rgba(153, 153, 153, 1);
					}
				}
			}

		}
	}

	/deep/.uni-popup__wrapper-box {
		padding: 12upx;
		background: rgba(255, 255, 255, 1);
		border-radius: 30upx 30upx 0upx 0upx;
	}

	/deep/.uni-popup__wrapper-box {
		width: 100%;
		height: 568upx;
		// overflow-y: scroll;
	}
</style>
