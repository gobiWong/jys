import request from '@/utils/request'

export function register(form){ 
	return request(`/user/register`,'POST',{...form})
}
export function sendCode({type,number,areaNo}){
	var numberKey;
	numberKey= type !=0? 'phoneNo':'mailbox';
	let numberForm={phoneNo:number,mailbox:number,areaNo};
	delete numberForm[numberKey]
	if(type==1){
		delete numberForm["areaNo"];
	}
	return request('/user/sendCode',"GET",{type,...numberForm})	
}


export function login(form){

	return request('/user/login',"POST",{...form})	
}

export function listCountryaz(){
	return request('/countryCity/listCountry',"GET",{page:0,rows:250},true)	
}

