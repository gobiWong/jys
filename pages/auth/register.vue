<template>
	<view>

		<view class="auth-header">
			<statusBar></statusBar>
			<view class="back-head">
				<image src="/static/img/back-icon-white.png" @tap='back'></image>
			</view>
		</view>
		<view class="auth-bg">
			<image src="/static/assert/auth-bg.png" mode=""></image>
		</view>
		<view class="auth-form">
			<view class="auth-form-head">
				<view class='auth-form-tabstext'>
					<text :class="{actived:type==0}" class="tabs-text" @tap="type=0">{{lang.Mobile}}</text>
					<text :class="{actived:type==1}" class="tabs-text" @tap="type=1">{{lang.mail}}</text>
				</view>
				<view class="auth-form-tabsdot">
					<text :class="'actived-dots-'+type"></text>
				</view>
			</view>
			<view v-if="type == 0?true:false">
				<!-- 手机注册 -->
				<view class='mobile'>
					<!-- 地区 及 手机号 -->
					<view class='input-form-cell'>
						<view class="area-code" @tap='showSheet'>+{{areaCode}}</view>
						<text class='line'></text>
						<input v-model="form.phoneNo" type="number" class="input" placeholder-class="placeholder-class" :placeholder='lang.phonenumber' />
					</view>
					<!-- 密码 -->
					<view class='input-form-cell'>
						<view>
							<image src="/static/assert/password-icon.png" class="password-icon"></image>
						</view>
						<input type="text" v-model="form.password" password class="input" placeholder-class="placeholder-class"
						 :placeholder='lang.logined' />
					</view>
					<!-- 确认密码 -->
					<view class='input-form-cell'>
						<view>
							<image src="/static/assert/password-icon.png" class="password-icon"></image>
						</view>
						<input v-model='form.confirmPassword ' type="text" password class="input" placeholder-class="placeholder-class"
						 :placeholder='lang.confirmation' />
					</view>
					<!-- 验证码 -->
					<view class="code-cell">
						<input type="number" v-model='form.verificationCode' class="input" placeholder-class="placeholder-class"
						 :placeholder="lang.phoneverification" />
						<button @tap.stop='sendSMS' :disabled='SMSStatus' :class="SMSStatus? '':'undisButton'">{{phoneTime>=60? lang.Getcode:phoneTime+"s"}}</button>
					</view>
					<!-- 邀请码 -->
					<view class='input-form-cell'>
						<view>
							<image src="/static/assert/invate-code.png" class="invate-code-icon"></image>
						</view>
						<input v-model='form.invitationCode' type="text" class="input" placeholder-class="placeholder-class" :placeholder='lang.optional' />
					</view>
					<!-- 协议 -->
					<view style="margin-top: 20upx;">
						<radio-group @change="radioChange">
							<label class="radio">
								<radio value='xieyi' checked id="radio" color="#729AFF" style='transform: scale(0.7);' /> <text  @tap="toweb">《{{lang.Exchange}}》</text> </label>
						</radio-group>
					</view>
					<view class="option-foot">
						<!-- 注册按钮 -->
						<view class="auth-buttons">
							<button @tap='submit'>{{lang.registered}}</button>
						</view>
						<!-- 调转登录链接 -->
						<navigator url="/auth/login" class="link" @tap="$nav('./login')">{{lang.Youhave}}</navigator>
					</view>
				</view>
			</view>
			<view v-if="type==1?true:false">
				<view class="email">
					<!-- 地区 及 邮箱 -->
					<view class='input-form-cell'>
						<view>
							<image src="/static/assert/email-icon.png" class="email-icon"></image>
						</view>
						<input v-model="form.mailbox" type="email" class="input" placeholder-class="placeholder-class" :placeholder='lang.emailaddress' />
					</view>
					<!-- 密码 -->
					<view class='input-form-cell'>
						<view>
							<image src="/static/assert/password-icon.png" class="password-icon"></image>
						</view>
						<input type="text" v-model="form.password" password class="input" placeholder-class="placeholder-class"
						 :placeholder='lang.logined' />
					</view>
					<!-- 确认密码 -->
					<view class='input-form-cell'>
						<view>
							<image src="/static/assert/password-icon.png" class="password-icon"></image>
						</view>
						<input v-model='form.confirmPassword ' type="text" password class="input" placeholder-class="placeholder-class"
						 :placeholder='lang.confirmation' />
					</view>
					<!-- 验证码 -->
					<view class="code-cell">
						<input type="number" v-model='form.verificationCode' class="input" placeholder-class="placeholder-class"
						 :placeholder="lang.phoneverification" />
						<button @tap='sendSMS' :disabled='EmailStatus' :class="EmailStatus? '':'undisButton'">{{eMailtime>=60? lang.Getcode:eMailtime+"s"}}</button>
					</view>
					<!-- 邀请码 -->
					<view class='input-form-cell'>
						<view>
							<image src="/static/assert/invate-code.png" class="invate-code-icon"></image>
						</view>
						<input v-model='form.invitationCode' type="text" class="input" placeholder-class="placeholder-class" :placeholder='lang.optional' />
					</view>
					<!-- 协议 -->
					<view style="margin-top: 20upx;">
						<radio-group @change="radioChange">
							<label class="radio">
								<radio value='xieyi' checked id="radio" color="#729AFF" style='transform: scale(0.7);'/> <text  @tap="toweb">《{{lang.Exchange}}》</text> </label>
						</radio-group>
					</view>
					<view class="option-foot">
						<!-- 注册按钮 -->
						<view class="auth-buttons">
							<button @tap='submit'>{{lang.registered}}</button>
						</view>
						<!-- 调转登录链接 -->
						<navigator url="/auth/login" class="link" @tap="$nav('./login')">{{lang.Youhave}}</navigator>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	import {register,sendCode} from '@/api/auth';
	import bus from '@/utils/server.js';
	import {toast} from '@/utils/toast'
	export default {
		data() {
			return {
				type: 0,
				areaCode: "86",
				form: {
					phoneNo: '',
					mailbox: '',
					confirmPassword: '',
					password: '',
					verificationCode: '',
				},
				eMailtimer:'',
				phoneTimer:'',
				eMailtime:60,
				phoneTime:60,
			}
		},
		onHide() {
			clearInterval(this.eMailtimer);
			clearInterval(this.phoneTimer);
		},
		methods: {
			toweb(){
				plus.runtime.openURL('https://www.buycoins.one/help/detail/189');
			},
			showSheet() {
				this.$nav('./country')
				bus.$on('countryChange',(val)=>{
					this.areaCode=val;
				})
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			siwperChange(e) {
				this.type = e.detail.current;
				for(var i in this.form){
					this.form[i]='';
				}
			},
			radioChange(event) {

			},
			
			submit() {
				for(var i in this.form){
					if(this.form[i]==''){
						delete this.form[i];
					}
				}
				register({ ...this.form,
					type: this.type,
					areaCode:this.areaCode
				}).
				then(res => {
					if(res.data.code==200){
						toast(this.lang.successfully);
						setTimeout(()=>{
							this.$nav('/pages/auth/login')
						},500)
					}
				})
			},
			sendSMS() {
				if(this.phoneTime!=60 || this.eMailtime!=60){
					
					return false;
				}
				sendCode({
					type: this.type,
					number: this.form.phoneNo || this.form.mailbox,
					areaNo: this.areaCode
				}).then(res => {
				
					if(this.type==0 && res.data.code==200){
						clearInterval(this.phoneTimer)
						this.phoneTimer=setInterval(()=>{
							
							this.phoneTime--;
							
							if(this.phoneTime<=0){ clearInterval(this.phoneTimer);this.phoneTime=60 }
						},1000)
					}else if(this.type==1 && res.data.code==200){
						
						clearInterval(this.eMailtimer)
						this.eMailtimer=setInterval(()=>{
							
							this.eMailtime--;
							if(this.eMailtime<=0){ clearInterval(this.eMailtimer);this.phoneTime=60 }
						},1000)
					}
				})

			}
		},
		mounted() {
			
		},
		computed: {
			...mapState([
				'lang'
			]),
			SMSStatus() {
				return this.form.phoneNo == '';
			},
			EmailStatus() {
				return this.form.mailbox == '';
			},
			swierHeight() {
				return uni.getSystemInfoSync().windowHeight;

			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './common.scss';
</style>
