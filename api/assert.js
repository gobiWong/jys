
const baseURL = `http://103.214.146.192:81`;
import  request from '@/utils/request';

import {toast} from '@/utils/toast'
import { getToken } from '@/utils/server.js';

const Pagerequest = function(url, method, data) {
 return new Promise((resove,reject)=>{
	 	uni.request({
	 		header: {
	 			'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
	 		},
	 		dataType:'json',
	 		url: baseURL+url,
	 		method,
	 		data,
			success:function(data){
				if(data.statusCode>=500){
					// toast('服务异常,请稍后再试');
				}
				if(data.data.code!=200 && data.data.code!=undefined){
					toast(data.data.msg);
				}
				resove(data)
			},
	 		fail:function(err){
				console.log(err)
				reject('服务异常')
	 			// toast('服务异常,请稍后再试');
	 			uni.hideLoading();
	 		}
	 	})
	
 })
	 
}


export function getDepthByTwoCoins(form){
	return Pagerequest('/quotations/getBuySellData',"GET",{...form})	
}

export function userVirtualWallet(virtuaWalletName){
	if(virtuaWalletName){
		return  request("/app/userVirtualWallet/userVirtualWallet",'GET',{token:getToken(),virtuaWalletName})
	}else{
		return  request("/app/userVirtualWallet/userVirtualWallet",'GET',{token:getToken()})
	}
}

export function getMotherCoinName(){
	return  Pagerequest("/quotations/getMotherCoinName",'GET',{token:getToken()})
}

export function getlist(coinName) {
	return Pagerequest('/quotations/get24hrDataByMotherCoinName', "GET", {motherCoinName: coinName});
}


export function addTrade(form){
	return request('/revisedTradePool/add','POST',{token:getToken(),...form})
}

export function DataByTwoCoinName(form){
	
	return Pagerequest('/quotations/get24hrDataByTwoCoinName','GET',{...form})
}

export function  regularAnnouncement(){
	return request('/message/regularAnnouncement','GET',{page:1,rows:6})
}
export function  getExchangeRateByCoinName(data){
	return Pagerequest('/quotesExchangeRate/getExchangeRateByCoinName','GET',data)
		// console.log(321321)
}
export function getBuySellData(data){
	return Pagerequest('/quotations/getBuySellData',"GET",data)	
}
export function get24hrDataForAll(data){
	return Pagerequest('/quotations/get24hrDataForAll',"GET",data)	
}
// 查看合约行情
export function get24hrDataForAgreement(data){
	return Pagerequest('/quotations/get24hrDataForAgreement',"GET",data)	
}
