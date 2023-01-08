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
            <td colspan="1" width="200">实践项目序号</td>
            <td colspan="5">
              <el-input
                v-model="form.practiceNum"
                placeholder="请输入实践项目序号"
                style="width: 90%"
              />
            </td>
          </tr>
          <tr style="height: 40px">
            <td colspan="1" width="200">实践项目名称</td>
            <td colspan="5">
              <el-input
                v-model="form.practiceName"
                placeholder="请输入实践项目名称"
                style="width: 90%"
              />
            </td>
          </tr>
          <tr style="height: 40px">
          <td colspan="1" width="200">实践项目种类</td>
          <td colspan="5">
            <el-select
              v-model="form.kind"
              placeholder="请选择种类"
              style="width: 90%"
            >
              <el-option
                v-for="items in kindList"
                :key="items.value"
                :label="items.label"
                :value="items.value"
              >
              </el-option>
            </el-select>
          </td>
        </tr>
        <tr style="height: 40px">
          <td colspan="1" width="200">实践项目日期</td>
          <td colspan="5">
            <el-date-picker
              style="width: 90%"
              v-model="form.practiceDate"
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
  import { practiceEditInit,practiceEditSubmit,getAuthHeader} from "@/service/genServ.js";
  export default {
    name: "PracticeEdit",
    data() {
      return {
        form: {
          studentNum: "",
          studentName: "",
          practiceNum: "",
          practiceName: "",
          practiceKind: "",
          practiceDate: "",
        },
        authHeader: getAuthHeader(),
        kindList:[],
        formName: "实践项目信息",
      };
    },
    created() {
      this.id = this.$route.query.id;
      this.fetchData();
    },
    methods: {
      fetchData() {
        practiceEditInit({ id: this.id }).then((res) => {
          this.form = res.data.form;
          this.kindList = res.data.kindList;
        });
      },
  
      doSumit() {
        practiceEditSubmit({ id: this.id, form: this.form }).then(
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