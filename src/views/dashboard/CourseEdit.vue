<template>
  <div class="app-container">
    <div class="table_center">
      <table class="content">
        <tr>
          <td colspan="6" style="font-size: 24px; font-weight: bold; color: #304156">
            {{ formName }}
          </td>
        </tr>
        <tr style="height: 40px">
          <td colspan="1" width="200">课程号</td>
          <td colspan="5">
            <el-input v-model="form.courseNum" placeholder="请输入课程号" style="width: 90%" />
          </td>
        </tr>

        <tr style="height: 40px">
          <td colspan="1" width="200">课程名称</td>
          <td colspan="5">
            <el-input v-model="form.courseName" placeholder="请输入课程名称" style="width: 90%" />
          </td>
        </tr>
        <tr style="height: 40px">
          <td colspan="1" width="200">学分</td>
          <td colspan="5">
            <el-input v-model="form.credit" placeholder="请输入学分" style="width: 90%" />
          </td>
        </tr>
        <tr style="height: 40px">
          <td colspan="1" width="200">预选课</td>
          <td colspan="5">
            <el-input v-model="form.precourse" placeholder="请输入预选课名称" style="width: 90%" />
          </td>
        </tr>
        <tr style="height: 40px">
          <td colspan="1" width="200">星期</td>
          <td colspan="5">
            <el-select v-model="form.week" placeholder="请选择星期" style="width: 90%">
              <el-option v-for="item in options1" :key="item.id" :value="item.select" />

            </el-select>
          </td>
        </tr>
        <tr style="height: 40px">
          <td colspan="1" width="200">节数</td>
          <td colspan="5">
            <el-select v-model="form.index" placeholder="请选择节数" style="width: 90%">
              <el-option v-for="item in options2" :key="item.id" :value="item.select" />
            </el-select>
          </td>
        </tr>

      </table>
    </div>

    <div class="centerButton">
      <el-button size="mini" class="rowButton" @click="doSumit()">提交</el-button>
    </div>
  </div>
</template>

<script>
import { courseEditInit, courseEditSubmit, getAuthHeader } from "@/service/genServ.js";
export default {
  name: "CourseEdit",
  data() {
    return {
      form: {
        courseNum: "",
        courseName: "",
        credit: "",
        precourse: "",
        week: '',
        index: '',
      },
      authHeader: getAuthHeader(),
      formName: "课程信息",
      options1: [{ select: "星期一" }, { select: "星期二" }, { select: "星期三" },
      { select: "星期四" }, { select: "星期五" }, { select: "星期六" }, { select: "星期日" },],
      options2: [{ select: "第一节" }, { select: "第二节" }, { select: "第三节" },
      { select: "第四节" }, { select: "第五节" }, { select: "第六节" }],
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.fetchData();
  },
  methods: {
    fetchData() {
      courseEditInit({ id: this.id }).then((res) => {
        this.form = res.data.form;
      });
    },

    doSumit() {
      switch (this.form.week) {
        case "星期日":
          this.form.week = 0
          break;
        case "星期一":
          this.form.week = 1
          break;
        case "星期二":
          this.form.week = 2
          break;
        case "星期三":
          this.form.week = 3
          break;
        case "星期四":
          this.form.week = 4
          break;
        case "星期五":
          this.form.week = 5
          break;
        case "星期六":
          this.form.week = 6
          break;
      }
      switch (this.form.index) {
        case "第一节":
          this.form.index = 0
          break;
        case "第二节":
          this.form.index = 1
          break;
        case "第三节":
          this.form.index = 2
          break;
        case "第四节":
          this.form.index = 3
          break;
        case "第五节":
          this.form.index = 4
          break;
        case "第六节":
          this.form.index = 5
          break;

      }

      courseEditSubmit({ id: this.id, form: this.form }).then(
        (res) => {
          if (res.code === 0) {
            this.$message({
              message: '保存成功！',
              type: 'warnning',
            })
            this.id = res.data.id;
            this.$router.push("/Homepage/CourseTable");
          } else {
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