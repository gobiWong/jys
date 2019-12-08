<template>
	<view class="">
		<my-head title='充币'>
			<template slot='center'>
				<input type="text" class='input search-input' confirm-type="search" value="" placeholder="请搜索币种" placeholder-class="placeholder-class" />
			</template>
			<template slot='right'>
				<text class="cancel-text">取消</text>
			</template> 
		</my-head>
		<view class='page-container'>
			<uni-indexed-list :moneyDate="moneyDate"></uni-indexed-list>
		</view>

	</view>
</template>

<script>
	import uniIndexedList from '@/components/uni-indexed-list/uni-indexed-list.vue';
	export default {
		data() {
			return {
				moneyDate:''
				
			}
		},
		components: {
			uniIndexedList
		},
		created(){
			this.MoneyId()
		},
		methods: {
			bindClick() {

			},
			// 接口
			MoneyId() {
				var that =this;
				uni.request({
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					dataType: 'JSON',
					url: 'http://192.168.1.9:8090/coinTrade/listVirtualWallet',
					
					method: "POST",
					success: (res) => {	
						console.log(res.data.data)
						try{
							that.moneyDate = JSON.parse(res.data).data.virtualWalletName
						}catch(e){
							that.moneyDate =res.data.data.virtualWalletName
							//TODO handle the exception
						}
			            
					  console.log(that.moneyDate,22)
					}
			
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.cancel-text {
		font-size: 28upx;
		font-family: PingFang-SC-Regular;
		font-weight: 400;
		color: rgba(153, 153, 153, 1);
	}
	.search-input{
		padding-left: 20upx;
		width: 80%;
	}
</style>
