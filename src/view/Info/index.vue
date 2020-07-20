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
					<el-button type="danger" class="pull-right" @click="dialog_info=true">新增</el-button>
				</el-col>
		</el-row>
		<div class="black-space-30"></div>
	<!-- 表格数据 -->	
	<el-table :data="tableData" border style="width: 100%" >
	  <el-table-column type="selection"  width="55">
	  </el-table-column>
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
	<!--  <el-table-column prop="id" label="序号" width="140">
	  </el-table-column></li>
	  <el-table-column prop="userName" label="姓名" width="140">
	  </el-table-column>
	  <el-table-column prop="passWord" label="密码" >
	  </el-table-column>
	  <el-table-column prop="roleId" label="权限">
	  </el-table-column> -->
	  <el-table-column label="操作">
		  <template slot-scope="scope">
			  <el-button type="danger" size="small">删除</el-button>
			  <el-button type="success" size="small">编辑</el-button>
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
			   :page-sizes="[10,20,50,100]"
			  layout=" total,sizes,prev, pager, next,jumper"
			  :total="1000">
			</el-pagination>
		</el-col>
	</el-row>
	<DialogInfo :flag.sync="dialog_info" @close="closeDialog"/>
	
	</div>
</template>

<script>
	import axios from 'axios';
	import DialogInfo from "./dialog/info.vue";
	export default{
		name:'user',
		components:{DialogInfo},
		data(){
			return{
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
				// tableData:[]
				tableData: [{
				            date: '2016-05-02',
				            name: '王小虎',
				            address: '上海市普陀区金沙江路 1518 弄'
				          }, {
				            date: '2016-05-04',
				            name: '王小虎',
				            address: '上海市普陀区金沙江路 1517 弄'
				          }, {
				            date: '2016-05-01',
				            name: '王小虎',
				            address: '上海市普陀区金沙江路 1519 弄'
				          }, {
				            date: '2016-05-03',
				            name: '王小虎',
				            address: '上海市普陀区金沙江路 1516 弄'
				          }]
			}	
		},
		 methods: {
		      handleSizeChange(val) {
		        console.log(`每页 ${val} 条`);
		      },
		      handleCurrentChange(val) {
		        console.log(`当前页: ${val}`);
		      },
			  closeDialog(){
				  dialog_info.value=false;
			  }
		    },
		// methods: {
		//     getHomeInfo () {
		//       axios.get("api/user/all")
		//         .then(this.getHomeInfoSucc)
		//     },
		//     getHomeInfoSucc (res) {
		//       res = res.data
		//       if (res.ret && res.data) {
		//         // const data = res.data
		// 		tableData=res.data
		//         this.id = tableData.id
		//         this.userName = tableData.userName
		//         this.passWord = tableData.passWord
		//         this.roleId = tableData.roleId
		//       }
		//     },
		// 	handleSizeChange(val) {
		// 	  console.log(`每页 ${val} 条`);
		// 	},
		// 	handleCurrentChange(val) {
		// 	  console.log(`当前页: ${val}`);
		// 	}
		//   },
		//   mounted () {
		//     this.getHomeInfo()
		//   }
		
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
