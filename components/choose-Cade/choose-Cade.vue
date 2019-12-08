<template>
	<view class="boxa">
		<!-- 导航栏循环 -->
		<view class="top_kbox">
			<block v-for="(item,i) in newlist" :key="i">
				<view class="ibox" @tap="alertnum(i)" :class="[i== i1?'actives':'']">
					<text class="uni_14">{{item}}<text><image class="image-img" src="../../static/assert/jiantou.png" mode=""></image></text></text>
					
				</view>
			</block>
		</view>
		<!-- 下拉之后的循环 -->
		<view  :class="[show?'list_boxs2':'list_boxs']">
			<view class="lione">
				<block v-for="(item,i) in listchild" :key="i">
					<view class="mli" @tap="chooseOne(i)">
						<text :class="[i== i2?'actives':'']" class="uni_14">{{item}}</text>
						
					</view>
				</block>
			</view>
			<view class="hideA" @tap="hide">
			</view>
		</view>
	</view>
</template>

<script>
	import {toast} from '@/utils/toast';
	import request from '@/utils/request';
	export default {
		props: ['list', 'arr'], //数组  arr
		data() {
			return {
				i1: null,
				i2: null,
				show: false,
				listchild: [],
				type:'永续',
				newlist: this.list
			}
		},
		onLoad(){
			
		},
		created(){
			// this.MoneyId()
		},
		methods: {
			alertnum(i) {
				if (this.i1 != i) {
					this.listchild = [];
					this.i1 = i;
					this.listchild = this.arr[i];
					this.i2 = null;
					this.show = true;
					let ins = this.listchild.indexOf(this.newlist[i]);
					if (ins > -1) {
						this.i2 = ins
					}
				}

			},
			// 币种
			MoneyId() {
				console.log(this.newlist)
				request('/virtualWallet/list', 'GET', {})
					.then(res => {
					
						if (res.data.code == 200) {
							this.listchild = res.data.data;
							
						}else{
							toast(res.data.msg)
						}
						
						
					})
			
			},
			
			chooseOne(i) {
				this.i2 = i;
				this.newlist[this.i1] = this.listchild[i];
				this.$emit('chooseLike', [this.i1, this.i2])
			},
			hide() {
				this.show = false;
				this.i1 = null;
				this.i2 = null;
			}
		}
	}
</script>

<style>
	.hideA {
		height: calc(100% - 310upx);
	}
  .image-img{
	  width: 16upx;
	  height: 9upx;
	  margin-left: 10upx;
  }
  .uni_14{
	  font-size:30upx;
	  font-family:PingFang SC;
	  font-weight:500;
	  color:rgba(45,47,86,1);
	  
  }
	.mli {
		/* border: 1upx solid red; */
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 22upx 0;
		justify-content: center;
	}

	.lione {
		background-color: #fff;
		padding: 110upx 36upx;
        padding-bottom: 0;
	}

	.list_boxs {
		background-color: rgba(84, 80, 80, 0.48);
		position: fixed;
		height: calc(100%);
		width: 100%;
		z-index: 88;
		transition: all .5s;
		transform: translateY(-120%);
	}
	.list_boxs2{
		background-color: rgba(84, 80, 80, 0.48);
		position: fixed;
		height: calc(100%);
		width: 100%;
		z-index: 88;
		transform: translateY(0);
		transition: all .5s;
	}

	.ii {
		width: 30upx;
		height: 30upx;
		display: block;
		margin-left: 12upx;
	}

	.actives {
		color: #6881FF;
	}

	.ibox {
		display: flex;
		align-items: center;
	}

	.top_kbox {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #FFFFFF;
		padding: 28upx 5%;
		position: fixed;
		top: 88upx;
		width: 90%;
		z-index: 99;
		border-bottom: 1upx solid #E0E0E0;
		padding-bottom: 30upx;
		
	}
	.boxa{
		padding-top: 84upx;
		position: relative;
		
	}
</style>
