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
          <td colspan="1" width="200">姓名</td>
          <td colspan="5">
            <el-input
              v-model="form.studentName"
              placeholder="请输入姓名"
              style="width: 90%"
            />
          </td>
        </tr>

        <tr style="height: 40px">
          <td colspan="1" width="200">活动序号</td>
          <td colspan="5">
            <el-input
              v-model="form.activityNum"
              placeholder="请输入"
              style="width: 90%"
            />
          </td>
        </tr>
         
         <tr style="height: 40px">
          <td colspan="1" width="200">活动名称</td>
          <td colspan="5">
            <el-input
              v-model="form.activityName"
              placeholder="请输入"
              style="width: 90%"
            />
          </td>
        </tr>

        <tr style="height: 40px">
          <td colspan="1" width="200">活动日期</td>
          <td colspan="5">
            <el-date-picker
              style="width: 90%"
              v-model="form.dates"
              type="date"
              placeholder="选择日期时间"
            >
            </el-date-picker>
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
import { activityEditInit,activityEditSubmit,getAuthHeader, getPersonImage } from "@/service/genServ.js";
export default {
  name: "ActivityEdit",
  data() {
    return {
      form: {
        studentNum: "",
        studentName: "",
        activityNum: "",
        activityName: "",
        dates: "",
      },
      authHeader: getAuthHeader(),
      image0: "",
      dateList:[],
      formName: "活动信息",
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.fetchData();
  },
  methods: {
    fetchData() {
      activityEditInit({ id: this.id }).then((res) => {
        this.form = res.data.form;
        this.dateList = res.data.dateList;
        this.image0 = res.data.image0;
      });
    },

    doSumit() {
      activityEditSubmit({ id: this.id, form: this.form }).then(
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