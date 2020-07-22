const user={ 
	state = {
		menuUser:[]
	};
	getters = {
	  getMenuUser:state=>state.menuUser
	};

	 mutations = {
	  setMenuUser (state,data){     //获取pizza数据
		state.menuUser = data;
		// console.log(state.menuUser);
	  },
	  addUserInfo(state,data){     //新增拍pizza数据
		state.menuUser.push(data)
	  },
	  deleteMenuUser(state,data){    //删除pizza数据
		state.menuUser.forEach((item,index)=>{
		  if (item.id == data){
			state.menuUser.splice(index,1);
		  }
		});
	  }
	};
	 actions = {

		};
	}
export default user;
