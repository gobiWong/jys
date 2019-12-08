<template>
	<view class="order">
		<view class="title uni-divider"> 
			<view>
				<image src="/static/assert/weituo.png" mode=""></image>
				<text class="uni-h5 uni-bold">{{lang.Commissioned}}</text>
			</view>
			<view @tap="islogin? $nav('/pages/trade/entrustOrder/entrustOrder'):$nav('/pages/auth/login')">
				<text>{{lang.all}}</text>
				<image src="/static/assert/all.png" mode=""></image>
			</view>
		</view>
		<view class="no-data" v-if="!islogin || dataList.length==0">
			<image src="/static/assert/nodata-bg.png" mode=""></image>
			<text>{{lang.Norecord}}</text>
		</view>
		<view class="item uni-divider" v-if="islogin && dataList.length!=0" v-for="(item,index) in dataList_" :key='index'>
			<view class="opt">
				<text class="uni-h4 uni-bold uni-up">{{item.tradeType}}</text>
				<text class="uni-h4 uni-bold" style="margin-left: 5px;">{{item.virtualWalletPairName}}</text>
				<text class="uni-h6 uni-text-gray uni-common-pl">{{item.createTime}}</text>
				<text class="cancel uni-bold" v-if="item.trade_status===0" @tap="update(item.id)">{{lang.undo}}</text>
			</view>
			<view class="thead">
				<view class="th price">{{lang.pricerr}}({{item.motherCoinName}})</view>
				<view class="th num">{{lang.numberr}}({{item.childCoinName}})</view>
				<view class="th turnover">{{lang.clinch}}({{item.childCoinName}})</view>
			</view>
			<view class="tbody">
				<view class="td price">{{item.tradePrice}}</view>
				<view class="td num">{{item.tradeAmount}}</view>
				<view class="td turnover">{{item.alreadyAmount}}</view>
			</view>
		</view>

	
	</view>

</template>

<script>
	
	import {
		mapGetters,
		mapState
	} from 'vuex';
	
	import {listEntrust ,update}from '@/api/quotation';
	export default {
		props: {
			item: Object,
			entrustType:{
				default:0,
				type:Number
			}
		},
		data(){
			return {
				dataList:[]
			}
		},
		computed: {
			...mapGetters(['islogin']),
			...mapState('quotation',['defaultWalletPair']),
			...mapState(['lang']),
			dataList_(){
				let list=[];

				this.dataList.map((ele)=>{
					let createTimeList=ele.createTime.split(' ');
					let yearCreateTimeList=createTimeList[0].split('-');
					let secondCreateTimeList=createTimeList[1].split(':');
					let createTimeStr=secondCreateTimeList[0]+':'+secondCreateTimeList[1]+' '+yearCreateTimeList[1]+'/'+yearCreateTimeList[2];
					ele.createTime=createTimeStr;
					ele.childCoinName=ele.virtualWalletPairName.split('/')[0];
					ele.motherCoinName=ele.virtualWalletPairName.split('/')[1];
					list.push(ele);
				})
				return list;
				
			},
		},
		methods:{
			getData(){
				listEntrust({page:1,historyIs:0,childVirtualWalletPairId:this.defaultWalletPair.childId,motherVirtualWalletPairId:this.defaultWalletPair.motherId}).then(res=>{
					if(res.data.code==200){
						this.dataList=res.data.data;
					
					}
				})
			},
			update(id){
				update(id).then(res=>{
					if(res.data.code==200){
						this.getData();
					}else{
						toast(res.data.msg)
					}
				})
				
				
			}
		},
		mounted() {
			if(this.islogin){
				this.getData();
			}
		}
	}
</script>
<style scoped lang="scss">
	.order .title {
		padding: 0 30upx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 105upx;
	}
	.order .title>view:first-child {
		font-size: 28upx;
		font-family: PingFang-SC-Bold;
		font-weight: bold;
		color: rgba(38, 37, 80, 1);
	}

	.order .title>view:first-child>image {
		width: 39upx;
		height: 30upx;
		margin-right: 20upx;
	}

	.order .title>view:last-child {
		font-size: 24upx;
		font-family: PingFang-SC-Regular;
		font-weight: 400;
		color: rgba(38, 37, 80, 1);
	}

	.order .title>view:last-child>image {
		width: 39upx;
		height: 31upx;
		margin-left: 20upx;
	}

	.order .title>view {
		display: flex;
		align-items: center;
	}

	.order .item {
		padding: 20upx 20upx 20upx 20upx;
	}

	.order .item .opt {
		position: relative;
		display: flex;
		align-items: baseline;
	}

	.order .item .opt .cancel {
		position: absolute;
		top: 0;
		right: 0;
		width: 80upx;
		height: 50upx;
		line-height: 50upx;
		padding: 0;
		font-size: 28px;
		font-family: PingFang-SC-Medium;

		color: rgba(104, 129, 255, 1);

	}

	.order .item .thead {
		display: flex;
		color: #8e9fa7;
	}

	.order .item .price {
		width: 35%;

	}

	.order .item .num {
		width: 35%;

	}

	.order .item .turnover {
		width: 30%;
		text-align: right;

	}

	.thead .turnover,
	.thead .num,
	.thead .price {
		color: #C0C0C0;
		font-size: 24px;
		font-family: PingFang-SC-Regular;
		font-weight: 400;

	}

	.tbody .turnover,
	.tbody .num,
	.tbody .price {
		color: #8C979D;
		font-size: 28px;
		font-family: PingFang-SC-Medium;
		font-weight: 500;

	}

	.order .item .tbody {
		display: flex;

	}

	.no-data {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		image {
			width: 379upx;
			height: 311upx;
			margin-top: 39upx;
		}

		text {
			font-size: 30px;
			font-family: PingFang-SC-Regular;
			font-weight: 400;
			color: rgba(140, 151, 157, 1);
			margin: 20upx;
		}
	}
</style>
