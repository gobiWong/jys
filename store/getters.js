const getters = {
	listCountryaz: state => {
		var list=[];
		try{
		
			state.user.listCountryaz.map((item)=>{
				list.push({phoneCode:item.phoneCode,name:item.name,englishName:item.englishName})
			})
		}catch(e){
			
			//TODO handle the exception
		}
		
		
		return list;
	},
	islogin:state=>{
		return state.user.isLogin; 
	},
	motherCoinNames:state=>{
		return [...state.quotation.motherCoinName];
	}
}
export default getters
