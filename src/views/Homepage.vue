<template>
	<div class="container">
	  <el-container style="height: 100%">
		<el-header><Header></Header></el-header>
		<el-container>
		  <el-aside width="200px"><Aside></Aside></el-aside>
		  <el-main>
			<router-view class="router-view"></router-view>
		  </el-main>
		</el-container>
		<el-footer><Footer class="footer"></Footer></el-footer>
	  </el-container>
	</div>
</template>
  
<script>
import Header from "../components/Header";
import Aside from "../components/Aside";
import Footer from "../components/Footer.vue"
 // import Main from "../components/Main";

  
  export default {
	name: 'Index',
	components:{Header,Aside,Footer},
  }
  </script>
<style>

.el-header {
	background-color: rgb(23,38,50);
	color: #333;
	text-align: center;
	line-height: 60px;
	padding: 0px;
}
.footer {
	padding: 0px;
	width: 100%;
	text-align: center;
}
.el-footer{
	padding: 0px;
	height: 58px;
}
.el-aside {
	background-color: rgb(23,38,50);
	color: #333;
	text-align: center;
	line-height: 200px;
}

.el-main {
	background-color: #E9EEF3;
	color: #333;
	height: 105%;
	padding: 0px;
}

body > .el-container {
	margin-bottom: 40px;
}

.container{
	position: absolute;
	top:0;
	left: 0;
	width: 100%;
	height:100%;
}
.router-view{
	height: 105%;
	width: 100%;
	margin: -20px -40px -50px -10px;
	padding: 0px;
}
</style>
