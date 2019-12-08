
import { toast } from '@/utils/toast'
import { getToken } from '@/utils/server.js';

import request from '@/utils/request'

export function listEntrust(form){
	for(var i in form){
		if(form[i]===''){
			
		delete form[i]
		}
	}
	return  request("/revisedTradePool/listEntrust",'GET',{token:getToken(),rows:6,...form})
	
}
export function transactionDetails(form){
	for(var i in form){
		if(form[i]===''){
			
		delete form[i]
		}
	}
	return  request("/revisedTradePool/transactionDetails",'GET',{token:getToken(),rows:6,...form})
	
}

export function  update(tradePoolId){
	return  request("/revisedTradePool/update",'POST',{token:getToken(),tradePoolId})
}
export  function getChildWallet(motherCoin){
	return request('/virtualWalletPair/childCoin','GET',{motherCoin})
}
