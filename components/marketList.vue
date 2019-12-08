<template>
	<block >
		<view class="rank">
			<view class="item thead">
				<view class="n uni-h7">{{lang.currency}}</view>
				<view class="p uni-h7">{{lang.price}}</view>
				<view class="t uni-h7">24H{{lang.applies}}</view>
			</view>
			<view v-for="(item, index) in list_" :key="index" class="item uni-divider" @click="onClick(item)" v-cloak>
				<view class="n">
					<view><text class="coin-name">{{item.childCoinName}}</text><text class="coin-name-Unit">/{{item.motherCoinName}}</text></view>
					<view>{{lang.volume}}{{item.volume}}</view>
				</view>
				<view class="p">
					<view>{{item.close}}</view>
					<view>¥{{item.cnyPrice}}</view>
				</view>
				<view class="t"><label class="" :class="item.riseAndfall > 0 ? 'light uni-bg-up' : 'light uni-bg-down' ">{{item.riseAndfall}}%</label></view>
			</view>
		</view>
	</block>
</template>


<script>
	import { mapState, mapMutations } from 'vuex';
	export default {
		data() { 
			return {
			};
		},
		props:{
			list: {
				type: Array,
				default: () => {
					return []
				}
			}
		},
		computed: {							
				...mapState([
					'lang'
				]),
				
			
			list_(){
				var list=[];
				for(var i=0;i<this.list.length;i++){
				var	item=this.list[i];
					item.motherCoinName=item.symbol.split('/')[1];
					item.childCoinName=item.symbol.split('/')[0];
					item.riseAndfall=Number(item.riseAndfall).toFixed(2);
					item.volume=Number(item.volume).toFixed(0)
					item.cnyPrice=Number(item.motherRateForCNY * item.close).toFixed(2)
					list.push(item);
				}
				return list;
			},
			
		},
		methods: {
			onClick(item) {
				// #ifdef APP-PLUS
					uni.navigateTo({
						url: "/pages/trade/kline/main?symbol="+item.symbol
					});
				// #endif
				// #ifdef H5
					let windowWidth = uni.getSystemInfoSync().windowWidth;
					let windowheight = uni.getSystemInfoSync().windowHeight;
					let statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
					let url = 'http://apps.infinite-ex.com/kline-web?symbol=' + item.symbol + '&width=' + windowWidth + "&height=" + windowheight +
						'&statusBarHeight=' + statusBarHeight;
					location.href=url;
				// #endif
		
					
					uni.setStorage({
						key:'setDefaultWalletPair',
						data:{motherId:item.motherCoin,childId:item.childCoin,name:item.symbol}
					})
					this.$store.commit('quotation/setDefaultWalletPair',{motherId:item.motherCoin,childId:item.childCoin,name:item.symbol});
				
			
			}
		}
	}
</script>

<style scoped>
	.uni-divider::after{
		background-color:#EEEEEE;
	}
	.rank{
		background-color: #F7F7FB;
		padding: 10px 0px;
		flex:1;
	}
	.thead{
		font-size:24upx;
		font-family:PingFang-SC-Regular;
		font-weight:400;
		color:rgba(193,193,193,1);
	}
	.rank .title{
		padding: 10px 20px;
	}
	.rank .item{
		display: flex;
		padding: 20px 20px;
		color: #C1C1C1;
		align-items: center;
		
	}
	.uni-divider{
		border-bottom: 1px solid #EEEEEE !important;
	}
	.rank .item .n{
		width: 35%;
	}
	.rank .item .p{
		width: 35%;
	}
	.rank .item .t{
		width: 30%;
		text-align: right;
	}
	.n>view>.coin-name{
		font-size:36upx;
		font-family:PingFang-SC-Bold;
		font-weight:bold;
		color:rgba(51,51,51,1);
	}
	.n>view>.coin-name-Unit{
		font-size:24upx;
		font-family:PingFang-SC-Regular;
		font-weight:400;
		color:rgba(192,192,192,1);
	}
	.n>view:last-child{
		font-size:26px;
		font-family:PingFang-SC-Regular;
		font-weight:400;
		color:rgba(175,174,174,1);
	}
	.p>view:first-child{
		font-size:36upx;
		font-family:PingFang-SC-Bold;
		font-weight:bold;
		color:rgba(51,51,51,1);
	}
	.p>view:last-child{
		font-size:26upx;
		font-family:PingFang-SC-Regular;
		font-weight:400;
		color:rgba(175,174,174,1);
	}
	.rank .item .t .light{
		display: block;
		width: 150px;
		color: #ffffff;
		text-align: center;
		float: right;
		border-radius: 4upx;
	}
	.uni-bg-up{
		background-color: #02C0A0;
	}
	.uni-bg-down{
		background-color: #EB375D;
	}
	.uni-bg-up,.uni-bg-down{
		font-size:26upx;
		font-family:PingFang-SC-Medium;
		font-weight:500;
		color:rgba(255,255,255,1);
		height:66upx;
		line-height: 66upx;
		border-radius:5upx;
	}

</style>
