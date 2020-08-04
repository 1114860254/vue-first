<template>
	<div>
		<el-row :gutter="14">
			<el-col :span="4">
				<div class="label-wrap">
					<label for="">类型:</label>
					<div class="wrap-content">
						<el-select v-model="value" placeholder="请选择" style="width: 100%;">
							<el-option v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.value">
							</el-option>
						</el-select>
					</div>
				</div>
			</el-col>
			<el-col :span="8">
				<div class="label-wrap">
					<label for="">日期:</label>
					<div class="wrap-content">
						<el-date-picker
						style="width: 100%;"
						      v-model="value2"
						      type="datetimerange"
						      align="right"
						      start-placeholder="开始日期"
						      end-placeholder="结束日期"
						      :default-time="['12:00:00', '08:00:00']">
						    </el-date-picker>
					</div>
				</div>
				</el-col>
			<el-col :span="4">
				<div class="label-wrap">
					<label for="">关键字:</label>
					<div class="wrap-content">
						<el-select v-model="search_key" placeholder="请选择"style="width: 100%;">
							<el-option v-for="item in searchOption"
							:key="item.value"
							:label="item.label"
							:value="item.value">
							</el-option>
						</el-select>
					</div>
				</div>
				</el-col>
				<el-col :span="4">
					<el-input v-model="search_keywork" placeholder="请输入内容"style="width: 100%;"></el-input>
				</el-col>
				<el-col :span="2">
					<el-button type="danger">搜索</el-button>
				</el-col>
				<el-col :span="2">
					<el-button type="danger" class="pull-right" @click="dialog_info=true" >新增</el-button>
				</el-col>
		</el-row>
		<div class="black-space-30"></div>
	<!-- 表格数据 -->	
	<el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize).filter(data => !search || data.id.toLowerCase().includes(search.toLowerCase()))"  border stripe fit empty-text="暂无数据" border style="width: 100%" >
	  <el-table-column type="selection"  width="55">
	  </el-table-column>
	 <el-table-column prop="id" label="序号" width="140">
	  </el-table-column></li>
	  <el-table-column prop="userName" label="姓名" width="140">
	  </el-table-column>
	  <el-table-column prop="passWord" label="密码" >
	  </el-table-column>
	  <el-table-column prop="roleId" label="权限">
	  </el-table-column>
	  <el-table-column label="操作">
		  <template slot-scope="scope">
			  <el-button type="danger" size="small"@click="deleteData(scope.$index,scope.row,tableData)">删除</el-button>
			  <el-button type="success" size="small" @click="modifyData(scope.$index, scope.row)">编辑</el-button>
		  </template>
	  </el-table-column>
	</el-table>
	<div class="black-space-30"></div>
	<!-- 底部分页 -->
	<el-row>
		<el-col :span="12">
			<el-button size="medium">批量删除</el-button>
		</el-col>
		<el-col :span="12">
			<el-pagination
			class="pull-right"
			  background
			   @size-change="handleSizeChange"
			   @current-change="handleCurrentChange"
			   :page-size="pageSize"
			   :page-sizes="[10,20,50,100]"
			   :current-page="currentPage"
			  layout=" total,sizes,prev, pager, next,jumper"
			  :total="total">
			</el-pagination>
		</el-col>
	</el-row>
	<DialogInfo :flag.sync="dialog_info" @close="closeDialog"/>
	<el-dialog :visible.sync="centerDialogVisible">
		<el-form :model="editForm">
			<el-form-item label="序号">
				<el-input v-model="editForm.id" :disabled="true"></el-input>
			</el-form-item>
			<el-form-item label="姓名">
				<el-input v-model="editForm.userName"></el-input>
			</el-form-item>
			<el-form-item label="密码">
				<el-input v-model="editForm.passWord" ></el-input>
			</el-form-item>
			<el-form-item label="权限">
				<el-input v-model="editForm.roleId" ></el-input>
			</el-form-item>
		</el-form>
		<div>
			<el-button @click="closeDialog()">取消</el-button>
			<el-button type="primary" @click="sumbitEditRow()">确定</el-button>
		</div>
	</el-dialog>
	</div>
</template>

<script>
	var _index;
	import axios from 'axios';
	import { GetList, DeleteInfo,sumbitEdit} from '../../api/user.js'
	import DialogInfo from "./dialog/info.vue";
	export default{
		name:'user',
		components:{DialogInfo},
		data(){
			return{
				id:'',
				search:'',
				currentPage:1,
				pageSize:10,
				total:null,
				centerDialogVisible:false,
				editForm:[],
				dialog_info:false,
				options:([{
					value:'1',
					label:'管理员1',
					},{
					value:'2',
					label:'管理员2',
					},{value:'3',
					label:'管理员3',
					},{value:'4',
					label:'管理员4',
				}]),
				value:[],
				value2:[],
				searchOption:([{
					value:'id',
					label:'ID',
					},{
					value:'roleID',
					label:'角色ID',
				}]),
				search_key:'id',
				search_keywork:'',
				tableData:null,
			}	
		},
		methods: {
			modifyData(index, row) {
				this.centerDialogVisible = true
				this.editForm = Object.assign({}, row); //重置对象
				_index = index;
							//console.log("index的值：" + index)
							//	console.log("_index的值：" + _index)
				console.log("row的值是：", this.editForm) //代表选择的这一行的数据
			},
			deleteData(index, row) {
				//this.tableData.splice(index, 1)
				console.log("序号：", row.id)
				
				console.log(index,row)
				this.$confirm('确定删除该用户数据?','提示',{
					type:'warning'
				}).then(()=>{
			    var params = new URLSearchParams()
				params.append("id", row.id)
				axios.post('api/user/delUser', params).then((response) => {
				console.log("删除的结果：", response)
				console.log(response.data)
				if (response.data == 0) {
					alert(response.data.message)
					console.log(this.tableData)
					this.tableData.splice(index, 1)
				} else {
					alert("删除失败的原因：" + response.data.message)
				}
				}).catch((error) => {
					console.log("删除失败的原因：", error)
					})
				})						
			},
			sumbitEditRow() {
				let resquestData = {
					id: this.editForm.id,
					userName: this.editForm.userName,
					passWord: this.editForm.passWord,
					roleId: this.editForm.roleId,
				}
				sumbitEdit(resquestData).then(response => {
					let data = resquestData
					this.$message({
						message: '修改成功',
						type: 'success'
					})
				})
				this.tableData.splice(index, 1)
				this.centerDialogVisible = false;
			},
	// 		sumbitEditRow() {
	// 			var editData = _index;
	// 			console.log("editData的值" + this.editForm)
	// 		if(this.editForm.userName==''){
	// 			alert("名称不能为空")
	// 			}else if(this.editForm.passWord==''){
	// 			alert("密码不能为空")
	// 			}else if(this.editForm.roleId==''){
	// 			alert("权限不能为空")
	// 			}else{
	// 			var paras = new URLSearchParams()
	// 			paras.append("id", this.editForm.id)
	// 			paras.append("userName", this.editForm.userName)
	// 			paras.append("passWord", this.editForm.passWord)
	// 			paras.append("roleId", this.editForm.roleId)
	// 			axios.post('api/user/saveUser', JSON.stringify(paras)).then((response) => {
	// 				console.log("修改结果：", response.data.code)
	// 				if (response.data== 0) {
	// 					alert(response.data.message)
	// 					this.tableData[editData].id = response.data.data.id
	// 					this.tableData[editData].userName = response.data.data.userName
	// 					this.tableData[editData].passWord = response.data.data.passWord
	// 					this.tableData[editData].roleId = response.data.data.roleId
	// 					} else {
	// 						alert(response.data.message)
	// 						}
	// 					}).catch((error) => {
	// 						console.log("失败的原因：" + error)
	// 						})
	// 			this.centerDialogVisible = false;
	// 		}
	// },
		    getHomeInfo () {
		      axios.get("api/user/all").then(this.getHomeInfoSucc);
		    },
			getHomeInfoSucc (res) {
		      this.tableData = res.data
		    },
			getList(){
				let requestData={
					pageNum:this.currentPage,
					pageSize:this.pageSize
				}
				GetList(requestData).then(response => {
					let data=response.data
					this.total=data.total
				})
			},
			// getList(){
			// 	axios.get("api/user/pageList").then(this.getListSucc);
			// },
		 //    getListSucc(res){
			// 	console.log(res),
			// 	this.total=res.data.total,
			// 	this.pageNum=res.data.pageNum,
			// 	this.pageSize=res.data.PageSize
			// },
			handleSizeChange(val) {
				this.pageSize=val
				console.log(val)
			},
			handleCurrentChange(val) {
				this.currentPage=val
				console.log(val)
				this.getList()
			},
			closeDialog(){
				this.centerDialogVisible=false,
				dialog_info.value=false;
			},
			
			 
		  },
		  mounted () {
		    this.getHomeInfo(),
			this.getList()
		  }
		
	}
</script>

<style lang="scss" scoped>
.label-wrap{
	label{
		float: left;
		line-height: 40px;
		width: 60px;
	}
	.wrap-content{
		margin-left: 60px;
	}
	
}
.pull-right{float:right;}
</style>