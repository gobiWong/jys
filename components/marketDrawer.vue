<template>
	<view class="drawer">
		<view class="head-title">{{lang.COINS}}</view>
		<scroll-view class="uni-swiper-tab" scroll-x >
			<!-- <view class="swiper-tab-list uni-bold siperli" @click="onClick(-1)" ><label label :class="currentIndex == '-1'   ? 'active' : ''">自选</label></view> -->
			<view class="swiper-tab-list uni-bold siperli" v-for="(item, index) in areaList_" :key="index" @click="onClick(index)"><label
				 :class="index == currentIndex   ? 'active' : ''">{{item}}</label></view>
		</scroll-view>
		<view class="input-cell-search">
			<image src="/static/assert/search-icon.png" class="search-icon" ></image>
			<input type="text" confirm-type="search" v-model="searchVal" placeholder-class="placeholder-class" class="input" :placeholder="lang.Currency" />
		</view>
		<view class="uni-list">
			<view class="uni-list-cell" v-for="(item, index) in marketList_" :key="index" @tap="setDefaultWalletPair(item)" hover-class="uni-list-cell-hover">
				<view class="data-list--d">
					<view class="data-list--d-left">
						<!-- <image src="/static/assert/start-icon.png" class="start-icon"></image> -->
						<text>{{item.childCoinName}}</text>
						<text>/{{item.motherCoinName}}</text>
					</view>
					<view class="data-list--d-right">
						<text class="uni-h5" :class="item.riseAndfall > 0 ? 'uni-up data-list--d-change' : 'uni-down data-list--d-change'">{{item.close}}</text>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import {getlist} from '@/api/assert'
	import {mapState } from 'vuex';
	export default {
		props: {
			areaList: {
				type: Array,
				default: () => {
					return []
				}
			},
		},
		data() {
			return {
				tabIndex: 0,
				currentIndex: 1,
				marketList:[],
				dataList:[],
				searchVal:''
			}
		},
		computed: {
			...mapState(['lang']),
			areaList_() {
				return this.areaList;
			},
			marketList_(){
				let list=[];
				
				this.dataList.map((item,index)=>{
					let motherCoinName=item.symbol.split('/')[1]
					let childCoinName=item.symbol.split('/')[0]
					list.push({...item,childCoinName,motherCoinName})
				})
				
				
				return list;
			}
		},
		
		watch: {
			searchVal(val){

				let list=[];
				if(val!=undefined && val!=''){
					let searchKey=(this.searchVal).toUpperCase();
					this.marketList.map((item)=>{
						 if(item.symbol.split('/')[0].indexOf(searchKey)!=-1){
							 list.push(item)
						 }
					})
					
					this.dataList=list;
				}else{
					this.dataList=this.marketList;
				}
				
			},
			currentIndex: {
				handler(val) {
				  getlist(this.areaList_[val]).then(res=>{
					  if(res.data.code==200){
						 this.marketList=res.data.data;
						 if(this.searchVal===''){
							this.dataList=this.marketList;
						}else{
							let list=[];
							let searchKey=(this.searchVal).toUpperCase();
							 this.marketList=res.data.data;
							this.marketList.map((item)=>{
								 if(item.symbol.split('/')[0].indexOf(searchKey)!=-1){
									 list.push(item)
								 }
							})
							
							this.dataList=list;
						}
						
					  }
				  })
				},
				immediate: true
			},

		},
		methods: {
			setDefaultWalletPair(item){
				
				uni.setStorage({
					key:'setDefaultWalletPair',
					data:{motherId:item.motherCoin,childId:item.childCoin,name:item.symbol}
				})
				
				this.$store.commit('quotation/setDefaultWalletPair',{motherId:item.motherCoin,childId:item.childCoin,name:item.symbol});
				this.$emit('onchange',{childCoinName:item.childCoinName,motherCoinName:item.motherCoinName})
			},
			onClick(index) {
				this.currentIndex = index
			},
			onChangeType() {
				this.tabIndex = Math.abs(this.tabIndex - 1);
			}
		}
	}
</script>

<style>
	.drawer {
		padding-top: 100upx;
		width: 100%;
	}

	.drawer .active {
		color: #6881FF;
		border-bottom: 2upx solid #6881FF;
		padding-bottom: 20upx;
	}

	.head-title {
		font-size: 36upx;
		font-family: PingFang-SC-Bold;
		font-weight: bold;
		color: #262550;
		margin-left: 30upx;
		margin-bottom: 20upx;
	}

	.siperli {
		font-size: 28upx;
		font-family: PingFang-SC-Bold;
		font-weight: bold;
		color: rgba(175, 174, 174, 1);
	}

	.input-cell-search {
		display: flex;
		padding: 0 30upx;
		align-items: center;
		height: 95upx;
		border-top: 1px solid #E8E8E8;
	}

	.input-cell-search>input {
		flex: 1;
		margin-left: 20upx;
		margin-right: 20upx;
	}

	.search-icon {
		width: 20upx;
		height: 22upx;
	}

	.data-list--d {
		display: flex;
		justify-content: space-between;
		height: 98upx;
		width: 100%;
		align-items: center;
		padding: 0 30upx;
	}

	.data-list--d-left {
		display: flex;
		align-items: center;
	}

	.data-list--d-left>text:first-of-type {
		font-size: 36upx;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		color: rgba(102, 102, 102, 1);
	}

	.data-list--d-left>text:last-of-type {
		font-size: 24upx;
		font-family: PingFang-SC-Regular;
		font-weight: 400;
		color: rgba(162, 162, 162, 1);
	}

	.data-list--d-change {
		font-size: 30upx;
		font-family: PingFang-SC-Regular;
		font-weight: 400;
	}

	.start-icon {
		width: 31upx;
		height: 31upx;
		vertical-align: middle;
		margin-right: 30upx;
	}
</style>
