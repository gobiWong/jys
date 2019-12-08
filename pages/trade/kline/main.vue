<template>
	<view class="container">
		<web-view :src="url" @message="receiveMsg"></web-view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	export default {
		onReady() {


		},
		onLoad(option) {
			var windowWidth = uni.getSystemInfoSync().windowWidth;
			var windowheight = uni.getSystemInfoSync().windowHeight;
			var statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
			this.url = 'hybrid/html/index.html?symbol=' + option.symbol + '&width=' + windowWidth + "&height=" + windowheight +
				'&statusBarHeight=' + statusBarHeight;

		},
		onResize() {
			
			this.url = 'hybrid/html/index.html?symbol=' + option.symbol + '&width=' + windowWidth + "&height=" + windowheight +
				'&statusBarHeight=' + statusBarHeight;
		},
		data() {
			return {
				symbol: ' ',
				url: ''
			}
		},
		onHide() {
			plus.screen.lockOrientation("portrait-primary"); 
		},
		onBackPress(options) {
			if (options.from === 'navigateBack') {
				return false;
			}
			this.back();
			return true;
		},
		components: {

		},
		computed: {

		},
		methods: {
			back(){
				
				if(uni.getSystemInfoSync().windowWidth>uni.getSystemInfoSync().windowHeight){
					plus.screen.lockOrientation("portrait-primary");
				}else{
					uni.navigateBack({
						delta:0
					})
				}
				
				
				
			},
			receiveMsg(e) {
				console.log(JSON.stringify(e))
				uni.setStorage({
					key: 'market',
					data: e.detail.data[0],
					success: function() {
						uni.switchTab({
							url: "/pages/trade/main"
						})
					}
				});
			}
		}
	}
</script>

<style scoped>
	.container {
		background: #000000;
	}
</style>
