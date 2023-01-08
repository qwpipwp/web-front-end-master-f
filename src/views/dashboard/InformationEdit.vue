<template>
    <div class="app-container">
      <div class="table_center">
        <table class="content">
          <tr>
            <td
              colspan="6"
              style="font-size: 24px; font-weight: bold; color: #304156"
            >
              {{formName}}
            </td>
          </tr>
          <tr style="height: 40px">
            <td colspan="1" width="200">学号</td>
            <td colspan="5">
              <el-input
                v-model="form.studentNum"
                placeholder="请输入学号"
                style="width: 90%"
              />
            </td>
          </tr>
  
          <tr style="height: 40px">
            <td colspan="1" width="200">学生名称</td>
            <td colspan="5">
              <el-input
                v-model="form.studentName"
                placeholder="请输入学生名称"
                style="width: 90%"
              />
            </td>
          </tr>
          <tr style="height: 40px">
            <td colspan="1" width="200">电话号码</td>
            <td colspan="5">
              <el-input
                v-model="form.telephoneNumber"
                placeholder="请输入电话号码"
                style="width: 90%"
              />
            </td>
          </tr>
          <tr style="height: 40px">
            <td colspan="1" width="200">预信息</td>
            <td colspan="5">
              <el-input
                v-model="form.preEnrolmentInformation"
                placeholder="请输入预信息"
                style="width: 90%"
              />
            </td>
          </tr>
          <tr style="height: 40px">
            <td colspan="1" width="200">社会关系</td>
            <td colspan="5">
              <el-input
                v-model="form.social"
                placeholder="请输入社会关系"
                style="width: 90%"
              />
            </td>
          </tr>
          
          
        </table>
      </div>
  
      <div class="centerButton">
        <el-button size="mini" class="rowButton" @click="doSumit()"
          >提交</el-button
        >
      </div>
    </div>
  </template>
  
  <script>
  import { informationEditInit,informationEditSubmit,getAuthHeader} from "@/service/genServ.js";
  export default {
    name: "InformationEdit",
    data() {
      return {
        form: {
          studentNum: "",
          studentName: "",
          telephoneNumber: "",
          preEnrolmentInformation: "",
          social: "",
        },
        authHeader: getAuthHeader(),
        formName: "信息管理",
      };
    },
    created() {
      this.id = this.$route.query.id;
      this.fetchData();
    },
    methods: {
      fetchData() {
        informationEditInit({ id: this.id }).then((res) => {
          this.form = res.data.form;
        });
      },
  
      doSumit() {
        informationEditSubmit({ id: this.id, form: this.form }).then(
          (res) => {
            if (res.code === 0) {
              this.$message({
                message: '保存成功！',
                type: 'warnning',
              })            
              this.id = res.data.id;
            }else {
              this.$message({
                message: res.msg,
                type: 'warnning',
              })            
            }
          }
        );
      },
      
    },
  };
  </script>