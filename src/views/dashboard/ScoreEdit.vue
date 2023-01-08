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
            <td colspan="1" width="200">课程号</td>
            <td colspan="5">
              <el-input
                v-model="form.courseNum"
                placeholder="请输入课程号"
                style="width: 90%"
              />
            </td>
          </tr>
          <tr style="height: 40px">
            <td colspan="1" width="200">课程名称</td>
            <td colspan="5">
              <el-input
                v-model="form.courseName"
                placeholder="请输入课程名称"
                style="width: 90%"
              />
            </td>
          </tr>
          <tr style="height: 40px">
            <td colspan="1" width="200">成绩</td>
            <td colspan="5">
              <el-input
                v-model="form.score"
                placeholder="请输入成绩"
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
  import { scoreEditInit,scoreEditSubmit,getAuthHeader} from "@/service/genServ.js";
  export default {
    name: "ScoreEdit",
    data() {
      return {
        form: {
          studentNum: "",
          studentName: "",
          courseNum: "",
          courseName: "",
          score: "",
        },
        authHeader: getAuthHeader(),
        formName: "成绩信息",
      };
    },
    created() {
      this.id = this.$route.query.id;
      this.fetchData();
    },
    methods: {
      fetchData() {
        scoreEditInit({ id: this.id }).then((res) => {
          this.form = res.data.form;
        });
      },
  
      doSumit() {
        scoreEditSubmit({ id: this.id, form: this.form }).then(
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