<template>
	<view class="">
		<statusBar></statusBar>
		<view class="search-head">
			<image src="/static/assert/search-icon.png" style="width: 25upx;height: 25upx;"></image>
			<input type="text" value="" :placeholder='lang.region' placeholder-class='placeholder-class' class='input' confirm-type='search' v-model='searchValue'/>
			<text>{{lang.cancel}}</text>
		</view>
		<view class="country-list">
			<view v-for="(item,index) in searchList" :key="index" @click='onClick(item.phoneCode)'>
				<text>{{item.name}}</text>
				<text>+{{item.phoneCode}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import bus from '@/utils/server.js';
	import {
		mapGetters,mapState
	} from 'vuex';
	export default{
		data(){
			return {
				countryList:[],
				searchValue:'',
			}
		},
		onLoad() {
			this.countryList=this.listCountryaz;
		},
		computed:{
			...mapGetters(['listCountryaz']),
			...mapState([
				'lang'
			]),
			searchList:function(){
				let searchValue=this.searchValue;
				let list=this.countryList.filter((item)=>{
					return  item.englishName.indexOf(searchValue)!=-1 || item.name.indexOf(searchValue)!=-1 || searchValue=='';
				})
				
				return list;
			}
		},
		methods:{
			onClick(val){
				bus.$emit('countryChange',val);
				setTimeout(()=>{
					uni.navigateBack({
						delta:1
					})
				},500)
			}
		}
	}
	
</script>

<style lang='scss'>
	.search-head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 90upx;
		padding: 0 30upx;

		input {
			flex: 1;
			margin-left: 30upx;
		}

		text {
			font-size: 28px;
			font-family: PingFang-SC-Regular;
			font-weight: 400;
			color: rgba(85, 169, 226, 1);
		}
	}
	.country-list{
		&>view{
			display: flex;
			padding: 0 30upx;
			align-items: center;
			border-bottom: 1px #F7F7F7 solid;
			height: 66upx;
			justify-content: space-between;
		}
	}
</style>
