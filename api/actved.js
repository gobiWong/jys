import { getToken } from '@/utils/server.js';
import request from '@/utils/request'

export function makeNewSettingList(data){ 
	return request('/makeNewSetting/makeNewSettingList','GET',data)
}

export function makeNewSettingDetails(id){ 
	return request('/makeNewSetting/makeNewSettingDetails','GET',{id})
}                   
 
export function tokenTypeList(id){ 
	return request('/makeNewSetting/tokenTypeList','GET',{id})
}
export function Publicity(id){  
	return request('/userPurchaseNumber/Publicity','GET',{id})
}
export function signNumber(id){ 
	return request('/userPurchaseNumber/signNumber','GET',{id,token:getToken()})
} 
// 账户
export function userVirtualWallet(){ 
	return request('/app/userVirtualWallet/userVirtualWallet','GET',{token:getToken()})
} 













