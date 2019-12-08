<template>
	<view>
		<view class="from-tilte">{{type==0? '支付宝':'微信'}}</view>
		<view class="from">
			<view class="input-cell">
				<label>姓名</label>
				<input type="text" value="" placeholder="请输入姓名" placeholder-class="placeholder-class" class="input" />
			</view>
			<view class="input-cell">
				<label>账号</label>
				<input type="number" value="" placeholder="请输入银行卡号" placeholder-class="placeholder-class" class="input" />
			</view>
			<view class="input-cell">
				<label>请添加二维码</label>
			</view>
			<view class="add-picture">
				
				<image src="/static/assert/addpicture.png" ></image>
			</view>
			<view class="button-container">
				<button @tap="submit">保存</button>
			</view>
		</view>
		<payPassword ref='paypassword'/>
	</view>
</template>

<script>
	import payPassword from  '../../components/paypassword/paypassword.vue'
	/**
	 * @name data tyep
	 * @description  
	 * type     0       1
	 * 描述   支付宝   微信
	 */
	export default {
		data() {
			return {
				type: 0,
				from: {
					name: '',
					blankNumber: '',
				}
			}
		},
		methods:{
			upload(){
				uni.chooseImage({
					sizeType:["compressed"],
					count:1,
					success:function(res){
						
					}
				})
			},
			submit(){
				this.$refs.paypassword.open();
			}
		},
		components:{
			payPassword
		}
	}
</script>

<style lang="scss">
	@import './common.scss';
	.add-picture{
		display: flex;
		align-items: center;
		justify-content: center;
		width:262px;
		height:262px;
		background:rgba(247,247,251,1);
		border:1px dashed #BAC5CB;
		border-radius:10px;
		image{
			width: 60upx;
			height: 60upx;
		}
	}
</style>
