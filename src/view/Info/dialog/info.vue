<template>
	<!-- 新增弹窗-->
	<el-dialog title="用户信息" :visible.sync="dialog_info_flag" @close="close" >  
		  <el-form  :model="form" >
		  <el-form-item label="序号" :label-width="formLabelWidth" >
		    <el-input v-model="form.id" autocomplete="off"></el-input>
		  </el-form-item>
	      <el-form-item label="姓名" :label-width="formLabelWidth">
	        <el-input v-model="form.userName" autocomplete="off"></el-input>
	      </el-form-item>
	      <el-form-item label="密码" :label-width="formLabelWidth">
	        <el-input v-model="form.passWord" autocomplete="off"></el-input>
	      </el-form-item>
		  <el-form-item label="权限" :label-width="formLabelWidth">
		    <el-input v-model="form.roleId" autocomplete="off"></el-input>
		  </el-form-item>
	    </el-form>
	    <div slot="footer" class="dialog-footer">
	      <el-button @click="dialog_info_flag = false">取 消</el-button>
	      <el-button type="primary" @click="submit" >确 定</el-button>
	    </div>
	</el-dialog>
</template>

<script>
	// import {AddInfo} from '../../../api/user.js'
	import axios from 'axios';
	export default{
		userName:"dialoginfo",
		data(){
			return{
				dialog_info_flag:false,
				tableData:[],
				form:{
					id:'',
					userName:'',
					passWord:'',
					roleId:''
				},
				 formLabelWidth: '80px',
			}
		},
		
		//单项数据流，父寄->子级，不能反向修改
		methods:{
			dialog_info(){
				this.form={
					id:'',
					userName:'',
					passWord:'',
					roleId:''
				}
			},
			close(){
					this.$emit('update:flag',false);
					this.dialog_info_flag=false;
			},
			sumbit() {
				this.tableData = this.tableData || []
				if (this.form.id == '') {
					lert("用户序号不能为空")
				} else if (this.form.userName == '') {
					alert("用户名称不能为空")
				} else if (this.form.passWord == '') {
					alert("用户密码不能为空")
				} else if (this.form.roleId == '') {
					alert("用户权限不能为空")
				} else {
				var addInfo = new URLSearchParams()
				addInfo.append("id", this.form.id)
				addInfo.append("userName", this.form.userName)
				addInfo.append("passWord", this.form.passWord)
				addInfo.append("roleId", this.form.roleId)
				axios.get('api/user/saveUser', addInfo).then((response) => {
					console.log("新增用户返回的结果：", response)
					if (response.data.code == 0) {
					alert(response.data.message)
					this.tableData.push({
						id: response.data.data.id,
						userName: response.data.data.userName,
						passWord: response.data.data.passWord,
						roleId: response.data.data.roleId
					})
					} else {
						alert("新增用户失败的原因：" + respnse.data.message)
						}
					}).catch((error) => {
						console.log("新增用户失败的原因：" + error)
							})
						}
					},
			// addInfo() {
			//   axios.get("api/user/saveUser").then(this.addInfoSucc);
			// },
			// addInfoSucc (res) {
			//   this.tableData = res.data
			// },
			// submit(){
			// 	let resquesData=
			// 	{
			// 		id:form.id,
			// 		userName:form.userName,
			// 		passWord:form.passWord,
			// 		roleId:form.roleId,
			// 	}
			// 	AddInfoSucc(resquesData).then(response => {
			// 		console.log(response.data)
			// 	})
			// },
			// AddData(){
			// 	// AddInfo({
			// 	// id:form.id,
			// 	// userName:form.userName,
			// 	// passWord:form.passWord,
			// 	// roleId:form.roleId,
			// 	// }).then(response=>{
			// 	// 	console.log(response)
			// 	// }).catch(error=>{
					
			// 	// })
			// 	let result = this.list.filter((res)=>{
			// 	  return (res.data===form.data)
			// 	});
			//   	axios.get("api/user/saveUser",this.form)
			// 	.then(res=>{
			// 	  this.$store.commit('addUserInfo',this.form);
			// 	  this.$message('添加成功');
			// 	  this.form.id='';
			// 	  this.form.userName='';
			// 	  this.form.passWord='';
			// 	  this.form.roleId='';
			// 	})
			//   },
		
			
			/*关闭窗口*/
			cancelled(){
			  this.$emit('closed');
			}
		},
		props:{
			flag:{
				type:Boolean,
				default:false
			}
		},
		watch:{
			flag:{
				handler(newValue,oldValue){
					this.dialog_info_flag=newValue
				}
			}
		},
		created(){
		},
		mounted () {
		 // this.AddInfo()
		}
	}
</script>

<style>
</style>
