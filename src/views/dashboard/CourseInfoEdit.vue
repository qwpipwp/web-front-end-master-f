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
          <td colspan="1" width="200">课程序号</td>
          <td colspan="5">
            <el-input
              v-model="form.courseNum"
              placeholder="请输入"
              style="width: 90%"
            />
          </td>
        </tr>

        
        <tr style="height: 40px">
          <td colspan="1" width="200">课程名称</td>
          <td colspan="5">
            <el-input
              v-model="form.courseName"
              placeholder="请输入"
              style="width: 90%"
            />
          </td>
        </tr>

        
         
         <tr style="height: 40px">
          <td colspan="1" width="200">课程信息</td>
          <td colspan="5">
            <el-input
              v-model="form.CourseInfo"
              placeholder="请输入"
              style="width: 90%"
            />
          </td>
        </tr>

        <tr style="height: 40px">
          <td colspan="1" width="200">课本</td>
          <td colspan="5">
            <el-input
              v-model="form.textbook"
              placeholder="请输入"
              style="width: 90%"
            />
          </td>
        </tr>
        <tr style="height: 40px">
          <td colspan="1" width="200">课程资源</td>
          <td colspan="5">
            <el-input
              v-model="form.resource"
              placeholder="请输入"
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
import { courseInfoEditInit,courseInfoEditSubmit,getAuthHeader, getPersonImage } from "@/service/genServ.js";
export default {
  name: "CourseInfoEdit",
  data() {
    return {
      form: {
       courseNum: "",
        courseName: "",
        courseInfo: "",
        textbook: "",
        resource: "",
      },
      authHeader: getAuthHeader(),
      image0: "",
     
      formName: "课程信息管理",
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.fetchData();
  },
  methods: {
    fetchData() {
      courseInfoEditInit({ id: this.id }).then((res) => {
        this.form = res.data.form;
        
        this.image0 = res.data.image0;
      });
    },

    doSumit() {
      courseInfoEditSubmit({ id: this.id, form: this.form }).then(
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
    onSuccess(response, file, fileList) {
      if (response.code == 0) {
        this.$message({
          message: "上传成功",
          type: "success",
        });
        getPersonImage({ studentNum: this.form.studentNum, no: "0" }).then((res) => {
          this.image0 = res.data;
        });
      }
      this.$emit("upLoadSucess", response, file, fileList);
    },
  },
};
</script>