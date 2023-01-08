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
          <td colspan="1" width="200">年龄</td>
          <td colspan="5">
            <el-input
              v-model="form.age"
              placeholder="请输入年龄"
              style="width: 90%"
            />
          </td>
        </tr>

        <tr style="height: 40px">
          <td colspan="1" width="200">选择</td>
          <td colspan="5">
            <el-select
              v-model="form.sex"
              placeholder="请选择性别"
              style="width: 90%"
            >
              <el-option
                v-for="items in sexList"
                :key="items.value"
                :label="items.label"
                :value="items.value"
              >
              </el-option>
            </el-select>
          </td>
        </tr>

        <tr style="height: 40px">
          <td colspan="1" width="200">学院</td>
          <td colspan="5">
            <el-input
              v-model="form.dept"
              placeholder="请输入学院"
              style="width: 90%"
            />
          </td>
        </tr>

        <tr style="height: 40px">
          <td colspan="1" width="200">出生日期</td>
          <td colspan="5">
            <el-date-picker
              style="width: 90%"
              v-model="form.birthday"
              type="date"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </td>
        </tr>
        <tr >
        <td colspan="6">
          <!-- <div style="text-align: center">个人图片</div> -->
          <img style="height: 200px" :src="image0" />
          <div class="centerButton">
            <!-- <el-upload
              class="upload-demo"
              :headers="authHeader"
              :data="{ no: '0', studentNum: form.studentNum }"
              :action="'/api/teach/uploadPersonImage'"
              :show-file-list="true"
              :limit="1"
              :multiple="false"
              :on-success="onSuccess"
            >
              <el-button size="mini" class="spacial">上传图片</el-button>
            </el-upload> -->
          </div>
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
import { studentEditInit,studentEditSubmit,getAuthHeader, getPersonImage } from "@/service/genServ.js";
export default {
  name: "BaseForm",
  data() {
    return {
      form: {
        studentNum: "",
        studentName: "",
        sex: "",
        age: "",
        dept: "",
        birthday: "",
      },
      authHeader: getAuthHeader(),
      image0: "",
      sexList:[],
      formName: "学生信息",
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.fetchData();
  },
  methods: {
    fetchData() {
      studentEditInit({ id: this.id }).then((res) => {
        this.form = res.data.form;
        this.sexList = res.data.sexList;
        this.image0 = res.data.image0;
      });
    },

    doSumit() {
      studentEditSubmit({ id: this.id, form: this.form }).then(
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