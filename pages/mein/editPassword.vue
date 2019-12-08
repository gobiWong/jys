<template>
	<view >
		<view class="from-tilte">修改密码</view>
		<view class="from">
			<view class="input-cell">
				<label>原密码</label>
				<input type="text" value="" placeholder="请输入原密码" placeholder-class="placeholder-class" class="input" password/>
			</view>
			<view class="input-cell">
				<label>确认密码</label>
				<input type="number" value="" placeholder="请输入确认密码" placeholder-class="placeholder-class" class="input" password/>
			</view>
			<view class="button-container">
				<button @tap="submit">确认</button>
			</view>
			
		</view>
		<smsCode ref='smsCode'/>
	</view>
</template>

<script>

	import smsCode from  '@/components/smsCode.vue'
	export default{
		data(){
			return {
				codeArr: ['', '', '', '', '', '']
			}
		},
		components:{
			smsCode
		},
		methods:{
			submit(){
				this.$refs.smsCode.open();
			}
		}
	}
</script>

<style lang="scss">
	
	@import '../c2c/common.scss';
</style>
