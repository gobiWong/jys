import Vue from 'vue';
const bus=new Vue();
export default bus;
import {userVirtualWallet} from  '@/api/assert';
export  function getToken(){
  return uni.getStorageSync('userinfo').token;
}
// 获取余额
export async function getCoinAmount(vm,coinName){
	// await 1;
	 vm.$store.state.assert.assertList=updataAssertList()
	
 	let list = await vm.$store.state.assert.assertList;
   
	let item=list.find((item)=>{
		return item.virtuaWalletName==coinName
	});
	return item.availableAmount;
}

// 获取id
export async function getCoinId(vm,coinName){

	 vm.$store.state.assert.assertList=updataAssertList()
	
 	let list = await vm.$store.state.assert.assertList;
	let item=list.find((item)=>{
	
		return item.virtuaWalletName==coinName
	});

	return item.virtualWalletId;
}
// 人民币价格


export async function updataAssertList(vm) {
	let list=[];
	  await userVirtualWallet().then((res)=>{
		  if(res.data.code==200){
			  var length=res.data.data.length-1;
			 list= res.data.data.slice(0,length);
		  }
		  
	  });
	
	  return list;
}