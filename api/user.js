import { getToken } from '@/utils/server.js';
import request from '@/utils/request'

export function basisInformation(){ 
	return request('/app/user/basisInformation','GET',{token:getToken()})
}

export function setAssterPass(form){
	return request('/app/user/setTransactionPassword','POST',{...form,token:getToken()})
}

export function bindPhone(form){
	return request('/app/user/updatePhoneNo','POST',{...form,token:getToken()})
}
export function bindEmail(form){
	return request('/app/user/emailAuthentication','POST',{...form,token:getToken()})
}


export function getAreaCode(phoneNo){
	return request('/app/user/getAreaCode','GET',{phoneNo})
}

export function verifyIdentidy(form){
	return request('/app/user/verifyIdentidy','POST',{...form})
}

export function forgetPassword(form){
	return request('/app/user/forgetPassword','POST',{...form})
} 
export function editPass(form){
	return request('/app/user/updatePassword','POST',{...form,token:getToken()})
}

