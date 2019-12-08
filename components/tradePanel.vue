<template>
	<view class="trade-inner">
		<view class="tab">
			<view class="buy " :class="type == 1 ? 'normal' : ''" @click="onChangeType(1)">{{lang.buy}}</view>
			<view class="sell " :class="type == 2 ? 'normal' : ''" @click="onChangeType(2)">{{lang.sell}}</view>
			<!-- <view class="parallelogram"></view> -->
		</view>
		<view class="select-tab">
			<text :class="{actived:currentIndex==0,tabbuy:type==1}" @tap="currentIndex=0">{{lang.price}}</text>
			<text :class="{actived:currentIndex==1,tabbuy:type==1}" @tap="currentIndex=1">{{lang.market}}</text>
			<!-- <text :class="{actived:currentIndex==2}" @tap="currentIndex=2">止盈止损</text> -->
		</view>
		<view v-show="type == 1">
			<view class="price-input uni-thinner-border">
				<input class="uni-input " v-model='price' type="digit" :placeholder="currentIndex==1? lang.optimal:'0.00'" :disabled="currentIndex==1" :style="{backgroundColor:currentIndex==0? '':'#F7F7FD',borderRadius:'10px'}"/>
				<view class="opt option-button-cell" v-if="currentIndex==0">
					<view class="button" @tap="reduce">-</view>
					<view class="button" style="color: #4CDFB0;" @tap="add">+</view>
				</view>
			</view>
			<view class="uni-h7 uni-text-gray price-text margin-top--12" v-if='currentIndex==0'>≈{{motherRateForCNY*price}} CNY</view>
			<view class="num-input uni-thinner-border">
				<input class="uni-input digit-input" type="digit" :placeholder="lang.numberr"  v-model="amount" />
				<view class="opt coin-name ">{{childCoinName}}</view>
			</view>
			<view class="uni-h7 uni-text-gray margin-top--12">{{lang.available}} {{availableAmount}} {{motherCoinName}}</view>
			<!-- <slider value="0" min="0" max="100" show-value /> -->
			<view class="slider-percentage " :class="{'percentage-buy':type==1}">
				<text :class="{actived:percentIndex==0}" @tap="percentIndex=0">25%</text>
				<text :class="{actived:percentIndex==1}" @tap="percentIndex=1">50%</text>
				<text :class="{actived:percentIndex==2}" @tap="percentIndex=2">75%</text>
				<text :class="{actived:percentIndex==3}" @tap="percentIndex=3">100%</text>
			</view>
			<view class="uni-h5 trande-moneny">交易额 {{tansferAmount}}</view>
			<button class="btn uni-bg-up" @tap='buy'>{{islogin? lang.buy +childCoinName:lang.login}}</button>
		</view>

		<view v-show="type == 2">
			<view class="price-input uni-thinner-border">
				<input class="uni-input " type="digit" v-model='price' :placeholder="currentIndex==1? lang.optimal:'0.00'"  :disabled="currentIndex==1" :style="{backgroundColor:currentIndex==0? '':'#F7F7FD',borderRadius:'5px'}"/>
				<view class="opt option-button-cell" v-if="currentIndex==0">
					<view class="button" @tap="reduce">-</view>
					<view class="button" style="color: #EB375D;" @tap="add">+</view>
				</view>
			</view>
			<view class="uni-h7 uni-text-gray price-text margin-top--12" v-if='currentIndex==0'>≈{{motherRateForCNY*price}} CNY</view>
			<view class="num-input uni-thinner-border">
				<input class="uni-input" type="digit" :placeholder="lang.numberr"  v-model="amount"/>
				<view class="opt coin-name ">{{childCoinName}}</view>
			</view>
			<v<view class="uni-h7 uni-text-gray margin-top--12">{{lang.available}} {{availableAmount}} {{childCoinName}}
		</view>
		<!-- <slider value="0" min="0" max="100" show-value /> -->
		<view class="slider-percentage" :class="{'percentage-buy':type==1}">
			<text :class="{actived:percentIndex==0}" @tap="percentIndex=0">25%</text>
			<text :class="{actived:percentIndex==1}" @tap="percentIndex=1">50%</text>
			<text :class="{actived:percentIndex==2}" @tap="percentIndex=2">75%</text>
			<text :class="{actived:percentIndex==3}" @tap="percentIndex=3">100%</text>
		</view>
		<view class="uni-h5 trande-moneny">交易额 {{tansferAmount}}</view>
		<button class="btn uni-bg-down" @tap='sell'>{{islogin? lang.sell +childCoinName:lang.login}}</button>
	</view>
	</view>
</template>

<script>
	import {userVirtualWallet,addTrade,DataByTwoCoinName} from '@/api/assert';
	import {getCoinAmount,getCoinId,} from '@/utils/server'
	import {mapGetters,mapState} from 'vuex';
    import {toast} from '@/utils/toast'
	export default {
		props: {
			list: {
				type: Array,
				default: () => {
					return []
				}
			},
			motherCoinName: {
				type: String
			},
			childCoinName: {
				type: String
			},
			

		},
		data() {
			return {
				currentIndex: 0,
				percentIndex: -1,
				availableAmount: '--',
				type: 1,
				amount:'',
				price:'',
				motherRateForCNY:""
			}
		},
		created() {
			this.getPriceData();
		},
		watch:{
			currentIndex(){
				this.price='';
			},
			percentIndex(val){//切换百分比
			if(val!=-1 && this.price!=''){
					this.amount=(this.availableAmount/4)*(val+1)/this.price
				}
			},
			type(val){
				// 初始化
				this.amount='';
				this.percentIndex=-1;
				this.price='';
				// 获取余额
				if(!this.islogin){
					return ;
				}
				if(val==1){
					getCoinAmount(this, this.$props.motherCoinName).then(availableAmount => {
						this.availableAmount = availableAmount;
						
					});
				}else{
					getCoinAmount(this, this.$props.childCoinName).then(availableAmount => {
						this.availableAmount = availableAmount;
					});
				}
			}
		},
		mounted() {
			if (this.islogin) {
				this.typeChange()
			}
			
		},
		computed: {
			...mapGetters(['islogin']),
			...mapState(['lang']),
			list_() {
				return this.list;
			},
			type_() {
				// console.log("type:"+this.type)
				return this.type;
			},
			tansferAmount(){
				var str;
				if(this.amount<=0 || this.islogin==false){
					return '--'
				}else if(this.amount==''){
					return '--'
				}else{
					return this.amount*this.price + this.$props.motherCoinName
				}
			
				return str;
			}
		},
		methods: {
			getPriceData(){
				DataByTwoCoinName({'childCoinName':this.$props.childCoinName,'motherCoinName':this.$props.motherCoinName}).then(res=>{
						this.motherRateForCNY=res.data.motherRateForCNY;
				})
			},
			typeChange(){
				if(this.type===1){
					getCoinAmount(this, this.$props.motherCoinName).then(availableAmount => {
						this.availableAmount = availableAmount;
						
					});
				}else{
					getCoinAmount(this, this.$props.childCoinName).then(availableAmount => {
						this.availableAmount = availableAmount;
					});
				}
				
			},
			reduce(){
				if(this.price>0){
					this.price=(Number(this.price)-0.01).toFixed(2);
				}
			},
			add(){
			
				this.price=(Number(this.price)+0.01).toFixed(2);
			},
			onChangeType(e) {
				this.type = e;
			},
			buy() {
				if (this.islogin) {
					if(this.currentIndex===1){
                        console.log(this.amount)
						if(this.amount==''){
							toast(this.lang.relevant);
							return false;
						}
					}else{
						if(this.price=='' || this.amount==''){
							toast(this.lang.relevant);
							return false;
						}
					}
					Promise.all([
						new Promise((resolve,reject)=>{
							{
								getCoinId(this, this.$props.motherCoinName).then(virtualWalletId => {
									resolve(virtualWalletId)
								});
							}
						}),
						new Promise((resolve,reject)=>{
							{
								getCoinId(this, this.$props.childCoinName).then(virtualWalletId => {
									resolve(virtualWalletId)
								});
							}
						})
					])
					.then(virtualWalletIdList=>{
						this.submit({entrustVirtualWalletId:virtualWalletIdList[1],tradeVirtualWalletId:virtualWalletIdList[0]})
                        console.log(virtualWalletId)
					})
					
				} else {
					this.$nav('/pages/auth/login')
				}
			},
			sell() {
				
				if (this.islogin) {
					if(this.currentIndex===1){
						if(this.amount==''){
						  toast(this.lang.relevant);
							return false;
						}
					}else{
						if(this.price=='' || this.amount==''){
						toast(this.lang.relevant);
							return false;
						}
					}
					
					Promise.all([
						new Promise((resolve,reject)=>{
							{
								getCoinId(this, this.$props.motherCoinName).then(virtualWalletId => {
									resolve(virtualWalletId)
									
								});
							}
						}),
						new Promise((resolve,reject)=>{
							{
								getCoinId(this, this.$props.childCoinName).then(virtualWalletId => {
									resolve(virtualWalletId)
								});
							}
						})
					])
					.then(virtualWalletIdList=>{
						
							this.submit({entrustVirtualWalletId:virtualWalletIdList[1],tradeVirtualWalletId:virtualWalletIdList[0]})
					})
				} else {
					this.$nav('/pages/auth/login')
				}
			},
			submit(form){
				addTrade({pendingOrder:this.currentIndex,entrustType:this.type-1,amount:this.amount,price:this.price,...form})
				.then(res=>{
					if(res.data.code==200){
						this.$emit('onsubmit');
						toast(this.lang.Entrust)
						this.amount=''; 
						this.percentIndex=-1;
						this.price='';
						this.typeChange();
					}
				})
			}
		}
	}
</script>

<style>
	.trade-inner .tab {
		position: relative;
		display: flex;
		text-align: center;
		width: 264upx;

	}

	.trade-inner .tab .buy,
	.trade-inner .tab .sell {
		color: #ffffff;
		font-weight: bold;
		width: 50%;
		height: 60upx;
		line-height: 60upx;
		font-size: 28upx;
		font-family: PingFang-SC-Regular;
		font-weight: 400;
		color: rgba(255, 255, 255, 1);
		border-radius: 10upx;
		font-size: 28px;
		font-family: PingFang-SC-Regular;
		font-weight: 400;
		color: rgba(45, 47, 86, 1);
		border: 2px solid rgba(241, 241, 241, 1);
	}


	.trade-inner .tab .normal {
		font-size: 28upx;
		font-family: PingFang-SC-Regular;
		font-weight: 400;
		color: rgba(38, 37, 80, 1);
		background: rgba(247, 247, 253, 1);
		box-shadow: 0px 3upx 1px 0px rgba(53, 48, 15, 0.08);
		border-radius: 10upx;
		width: 133upx;
		height: 65upx;
		margin-top: -2upx;
	}

	.trade-inner .tab .sell.normal {
		margin-left: -10upx;
		z-index: 10;
		color: #EB375D;
	}

	.trade-inner .tab .buy.normal {
		margin-right: -10upx;
		z-index: 10;
		color: #4CDFB0;
	}

	.trade-inner .tab .parallelogram {
		position: absolute;
		left: calc(50% - 19upx);
		top: 0;
		transform: translate(-50%, -50%);
		width: 36upx;
		height: 74upx;
		background: #ffffff;
		-webkit-transform: skew(-30deg);
		-moz-transform: skew(-30deg);
		-o-transform: skew(-30deg);
		transform: skew(-30deg);
	}

	.trade-inner .price-input {
		position: relative;
		margin-top: 30upx;
	}

	.trade-inner .price-input input {
		position: relative;
		padding-right: 180upx;
	}

	.trade-inner .price-input .opt {
		display: flex;
		position: absolute;
		top: 2upx;
		right: 0;
		width: 180upx;
		height: 84upx;
		line-height: 84upx;
		margin-top: -4px;
		margin-right: -2px;
	}

	.trade-inner .num-input {
		position: relative;
		margin-top: 30upx;
	}

	.trade-inner .price-input .opt .button {
		border: 0;
		/* background: #fff; */
		width: 50%;
		height: 84upx;
		line-height: 84px;
		text-align: center;
		font-size: 48upx;
		font-weight: 400;
		text-align: center;

	}

	.trade-inner .btn {
		height: 74upx;
		line-height: 74upx;
		color: #fff;
		font-size: 28upx;
		font-weight: bold;

	}

	.select-tab {
		margin-top: 40upx;
		display: flex;
		/* justify-content: space-between; */

	}

	.select-tab>text {
		padding: 12upx 23upx 10upx 22upx;
		font-size: 26upx;
		line-height: 26upx;
		font-family: PingFang-SC-Regular;
		font-weight: 400;
		color: #2D2F56;
		box-sizing: border-box;
	}

	.select-tab>text.actived {
		color: #fff;
		background-color: #EB375D;
		border-radius: 10upx;

	}

	.select-tab>text.tabbuy.actived {
		background-color: #4CDFB0;

	}

	.option-button-cell {
		background: rgba(247, 247, 253, 1);
		box-shadow: -2upx 2upx 1px 0px rgba(53, 48, 15, 0.12);
		border-radius: 10upx
	}

	.option-button-cell>.button:first-child {
		color: #bcbed5;
	}

	.option-button-cell:after {
		content: ' ';
		position: absolute;
		width: 2upx;
		height: 42upx;
		top: calc(50% - 42upx / 2);
		left: calc(50% - 2upx / 2);
		background-color: #8285AE;
	}

	.uni-text-gray.price-text {
		font-size: 24upx;
		font-family: PingFang-SC-Regular;
		font-weight: 400;
		color: rgba(140, 151, 157, 1);
	}

	.opt.coin-name {
		display: flex;
		position: absolute;
		top: 19upx;
		right: 0;
		width: 90upx;
		height: 42upx;
		line-height: 42upx;
		font-size: 26upx;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		color: rgba(186, 197, 203, 1);
	}

	.uni-input.digit-input {
		padding-right: 200upx;
	}

	.margin-top--12 {
		margin-top: 12upx;
	}

	.slider-percentage {
		height: 48%;
		width: 100%;
		display: flex;
		justify-content: space-between;
		
		
	}

	.slider-percentage>text {
		padding: 6upx 18upx;
		font-size: 22upx;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		color: rgba(140, 151, 157, 1);
		border:1px solid rgba(196,206,212,1);
		border-radius:10px;
		box-sizing: border-box;
	}

	.slider-percentage>text.actived {
		padding: 8upx 20upx;
		color: #FFFFFF;
		background-color: #EB375D;
		border-radius: 10upx;
		border:none;
	}

	.slider-percentage.percentage-buy>text.actived {
		color: #FFFFFF;
		background-color: #4CDFB0;
	}

	.trande-moneny {
		font-size: 24upx;
		font-family: PingFang-SC-Regular;
		font-weight: 400;
		color: rgba(140, 151, 157, 1);
		margin-top: 60upx;
	}
</style>
