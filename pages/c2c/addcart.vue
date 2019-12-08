<template>
	<view >
		<view class="from-tilte">添加银行卡</view>
		<view class="from">
			<view class="input-cell">
				<label>姓名</label>
				<input type="text" value="" placeholder="请输入姓名" placeholder-class="placeholder-class" class="input" />
			</view>
			<view class="input-cell">
				<label>银行卡号</label>
				<input type="number" value="" placeholder="请输入银行卡号" placeholder-class="placeholder-class" class="input"/>
			</view>
			<view class="input-cell">
				<label>开户银行</label>
				<input type="text" value="" placeholder="请输入开户行" placeholder-class="placeholder-class" class="input"/>
			</view>
			<view class="input-cell">
				<label>开户地址 （选填）</label>
				<input type="text" value="" placeholder="请输入开户地址" placeholder-class="placeholder-class" class="input"/>
			</view>
			<view class="button-container">
				<button>保存</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				from:{
					name:'',
					blankNumber:'',
				}
			}
		}
	}
</script>

<style lang="scss">
@import './common.scss';

</style>
