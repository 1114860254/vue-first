<template>
	<div id="main-wrap">
		<div class="main-content">
			<div class="content">
				<router-view/>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		
	}
</script>

<style lang="scss" scoped>
#main-wrap{
		height: 100vh;
	}
.main-content{
	width: 100%;
	height: 100%;
	padding-top:105px ;
	padding-right: 30px;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	background-color: 	#F0F8FF;
}	
.content{
	width: 100%;
	height: 100%;
	padding:30px 30px 0 30px;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	background-color: #fff;
}
.open{
	.main-content{padding-left: 280px;}
}
.close{
	.main-content{padding-left:94px;}
}
</style>