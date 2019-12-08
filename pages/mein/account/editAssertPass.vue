<template>
	<view>
		<view class="form">
			<!-- 原密码 --> 
			<view class='input-cell'>
				<view class='label'>
					<image src="/static/assert/bind-mobile.png" mode="" style='width: 31upx;height: 46upx;margin-right: 31upx;'></image>
					<text>{{lang.fundpassword}}</text>
				</view>
				<view class='input-contianers'>
					<view class='input-wrapper'>
						<input type="text" password value="" :placeholder='lang.originalfundpassword' placeholder-class='placeholder-class' class='input' v-model='form.originalPassword'/>
					</view>
				</view>
			</view>
			<!-- 新密码 -->
			<view class='input-cell'>
				<view class='label'>
					<image src="/static/assert/bind-mobile.png" mode="" style='width: 31upx;height: 46upx;margin-right: 31upx;'></image>
					<text>{{lang.newpassword}}</text>
				</view>
				<view class='input-contianers'>
					<view class='input-wrapper'>
						<input type="text" password value="" placeholder='lang.yournewpassword' placeholder-class='placeholder-class' class='input' v-model='form.newPassword'/>
					</view>
				</view>
			</view>
			<!--新密码确认  -->
			<view class='input-cell'>
				<view class='label'>
					<image src="/static/assert/bind-mobile.png" mode="" style='width: 31upx;height: 46upx;margin-right: 31upx;'></image>
					<text>{{lang.passwordconfirmation}}</text>
				</view>
				<view class='input-contianers'>
					<view class='input-wrapper'>
						<input ttype="text" password value="" :placeholder='lang.passwordagain' placeholder-class='placeholder-class' class='input' v-model='form.confirmPassword'/>
					</view>
				</view>
			</view>
			<!-- 短信/邮箱验证码 -->
			<view class='input-cell'>
				<view class='label'>
					<image src="/static/assert/bind-code.png" mode="" style='width: 38upx;height: 28upx;margin-right: 31upx;margin-right: 23upx;'></image>
					<text>{{lang.SMSemail}}</text>
				</view>
				<view class='input-contianers'>
					<view class='input-wrapper'>
						<input type="text" password value="" :placeholder='lang.yourverification' placeholder-class='placeholder-class' class='input' v-model='form.verificationCode'/>
					</view>
					<view class='button-submit'>
						<button @tap="sendMSM">{{time>=60?lang.Getcode:time+'s'}}</button>
					</view>
				</view>
			</view>
			<view>
				<button class='submit' @tap='submit' :disabled='disable'>{{lang.determine}}</button>
			</view>
		</view>
	</view>
</template>

<script>
	import commonHead from './commonHead';
	import {
		mapState
	} from 'vuex';
	import {
		editPass
	} from '@/api/user';
	import {
		sendCode
	} from '@/api/auth';
	export default {
		data() {
			return {
				timer: null,
				time: 60,
				form: {
					originalPassword:'',
					newPassword: '',
					confirmPassword: '',
					verificationCode: '',
					passwordType:1
				},
				disable: true,
			}
		},
		watch: {
			form: {
				handler(val) {
					let j=0;
					for(var i in val){
						j++;
						if(val[i]==''){ break;}
					};
					if(j==3){
						this.disable=false;
					}
				},
				deep: true
			}
		},
		computed:{
			...mapState('user', ["userinfo"]), 
			...mapState(['lang'])
		},
		components: {
			commonHead
		},
		created() {
			this.aaa()
		},
		methods: {
			aaa(){
				 uni.setNavigationBarTitle({
				     title:this.lang.Changefundpassword
				 });
			},
			submit() {
			
				editPass(this.form).then(res => {
					if(res.code==200){
						toast('修改成功');
					}
				})
			},
			sendMSM() {
				if (this.time < 60) {
					return false
				};
				sendCode({
						type: this.userinfo.phoneNo ? 0:1,
						number: this.userinfo.phoneNo || this.userinfo.phoneNo,
						areaNo: this.userinfo.areaCode
					})
					.then(res => {
						console.log(res.data)
						if (res.data.code == 200) {
							clearInterval(this.timer);
							this.timer = setInterval(() => {
								this.time--;
								if (this.time <= 0) {
									clearInterval(this.timer);
									this.time = 60
								}
							}, 1000)
						}

					})
			}
		}
	}
</script>

<style lang='scss' scoped>
	@import './common.scss';
</style>
