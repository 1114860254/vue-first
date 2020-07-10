<template>
	<div id="login">
		<div class="login-wrap">
			<ul class="menu-tab">
				<li  v-for="item in menuTab":key="item.id" :class="{'current':item.current}" @click="toggleMenu(item)">{{item.txt}}</li>
			</ul>
			<!-- 表单 -->
			<el-form :model="ruleForm" status-icon :rules="rules2" ref="ruleForm"  class="login-form" size="medium">
			  
			  <el-form-item  prop="username" class="item-from">
				  <label>邮箱</label>
			    <el-input type="text" v-model="ruleForm.username" auto-complete="off"></el-input>
			  </el-form-item>
			  
			  <el-form-item  prop="password"class="item-from">
				  <label>密码</label>
			    <el-input type="text" v-model="ruleForm.password" auto-complete="off" minlength="6"maxlength="20"></el-input>
			  </el-form-item>
			  
			  <el-form-item  prop="passwords"class="item-from" v-show="model==='register'">
			  	  <label>重复密码</label>
			    <el-input type="text" v-model="ruleForm.passwords" auto-complete="off" minlength="6"maxlength="20"></el-input>
			  </el-form-item>
			  
			  <el-form-item  prop="code"class="item-from">
				  <label>验证码</label>
				  <el-row :gutter="11">
				    <el-col :span="15"><el-input v-model="ruleForm.code"minlength="6"maxlength="6"></el-input></el-col>
				    <el-col :span="9"><el-button type="success"class="block" @click="getSms()">获取验证码</el-button>
					</el-col>
				  </el-row>
			   
			  </el-form-item>
			  <el-form-item>
			    <el-button type="danger" @click="submitForm('ruleForm')" class="login-btn block">提交</el-button>
			     
			  </el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import {GetSms} from "@/api/login";
	import service from "@/utils/request";
	import {stripscript} from '@/utils/validate';
	import axios from 'axios';
	import {xxx}  from '@/api/login.js'
	export default{
		name:'login',
		data(){
			var validateCode = (rule, value, callback) => {
				// 过滤特殊字符
				this.ruleForm.code=stripscript(value)
				value=this.ruleForm.code
				let reg=/^[a-zA-Z0-9]{6}$/;
			        if (value === '') {
			          return callback(new Error('请输入验证码'));
			        }else if(!reg.test(value)){
					  return callback(new Error('验证码格式有误'));
					}else{
		
						callback();
					}
			      };
			      var validateUsername = (rule, value, callback) => {
					let reg=/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
			        if (value === '') {
			          callback(new Error('请输入用户名'));
					}else if(!reg.test(value)){
					callback(new Error('用户名格式有误'));
			        } else {
			          callback();
			        }
			      };
			      var validatePassword = (rule, value, callback) => {
					// 过滤特殊字符
					this.ruleForm.password=stripscript(value)
					value=this.ruleForm.password
					let reg= /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/; 
			        if (value === '') {
			          callback(new Error('请输入密码'));
			        } else if (!reg.test(value)) {
			          callback(new Error('密码为6至20位的数字加字母'));
			        } else {
			          callback();
			        }
			      };
				  var validatePasswords = (rule, value, callback) => {
						if(this.model==='login'){callback();}
						// 过滤特殊字符
						this.ruleForm.passwords=stripscript(value)
						value=this.ruleForm.passwords
						let reg= /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/; 
				    if (value === '') {
				      callback(new Error('请再次输入密码'));
				    } else if (value!=this.ruleForm.password) {
				      callback(new Error('重复密码不正确'));
				    } else {
				      callback();
				    }
				  };
			return{
				menuTab:[
					{txt:'登录',current:true,type:'login'},
					{txt:'注册',current:false,type:'register'}
				],	
				model:'login',
				 ruleForm: {
				          username: '',
				          password: '',
						  passwords:'',
				          code: ''
				        },
				rules2: {
				          username: [
				            { validator: validateUsername, trigger: 'blur' }
				          ],
				          password: [
				            { validator: validatePassword, trigger: 'blur' }
				          ],
						  passwords: [
						    { validator: validatePasswords, trigger: 'blur' }
						  ],
				          code: [
				            { validator: validateCode, trigger: 'blur' }
				          ]
				        }
			}
		},
		// setup(prop,{refs,root}){
		// 	const login=(()=>{
		// 		Login(requestData).then(response=>{
		// 			root.$router.push({
		// 				name:'Console'
		// 			}) 
		// 		}).catch(error=>{})
		// 	})
		// 	},
		methods:{
			
			toggleMenu(data){
				this.menuTab.forEach(elem=>{
					elem.current=false
				});
				data.current=true
				this.model=data.type
			},
			//获取验证码
			getSms(){
				GetSms()
			},
			
			submitForm(formName) {
			        this.$refs[formName].validate((valid) => {
			          if (valid) {
			            alert('submit!');
			          } else {
			            console.log('error submit!!');
			            return false;
			          }
			        });
			      },
		}
	}
</script>

<style lang="scss" scoped>
#login{
	height: 100vh;
	background-color: #344a5f;
}	
.login-wrap{
	width: 338px;
	margin: auto;
}
.menu-tab{
	text-align: center;
	li{
		display: inline-block;
		width: 88px;
		line-height: 36px;
		font-size: 14px;
		color:#fff;
		border-radius: 2px;
		cursor: pointer;
	}
.current{
	background-color:rgba(0,0,0,.1);
}
}
.login-form{
	margin-top: 29px;
	label{
		display: block;
		margin-bottom:3px ;
		font-size: 14px;
		color: #FFF;
	}
}
.item-from{
	margin-bottom: 13px;
}
.block{
	display: block;
	width: 100%;
}
.login-btn{
	margin-top: 19px;
}
</style>
