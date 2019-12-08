<template>
	<view class="drawer">
		<view class="head-title">筛选</view>
		<view>日期</view>
		
	</view>
</template>

<script>
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
				marketList:[],
			}
		},
		computed: {
		},
		watch: {
			
			

		},
		methods: {
			
		}
	}
</script>

<style>
	.drawer {
		padding-top: 100upx;
		width: 100%;
		&>view:nth-child(2) {
			font-size:28upx;
			font-family:PingFang-SC-Regular;
			font-weight:400;
			color:rgba(140,151,157,1);
			padding-left: 30upx;
			margin-top: 59upx;
		}
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

	
</style>
