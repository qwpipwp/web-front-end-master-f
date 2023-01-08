<template>
  <div class="base_form" style="padding-top: 15px">
    <div class="base_query_oneLine">
      <div class="query_left">
        <el-button class="orangeButton" size="small" @click="addItem()">添加</el-button>
      </div>
      <div class="query_right">
        <el-input class="marginl" placeholder="请输入课程号或课程名" v-model="numName" style="width: 300px; margin-right: 5px" />
        <el-button class="blueButton" size="small" @click="doQuery()">查询</el-button>

      </div>
    </div>
    <div class="table-content">
      <el-table :data="dataList" border style="width: 100%">
        <el-table-column prop="courseNum" label="课程号" width="180"> </el-table-column>
        <el-table-column prop="courseName" label="课程名" width="180"> </el-table-column>
        <el-table-column prop="credit" label="学分"> </el-table-column>
        <el-table-column prop="precourse" label="所需课程"> </el-table-column>
        <el-table-column prop="week" label="星期"> </el-table-column>
        <el-table-column prop="index" label="节数"> </el-table-column>
        <el-table-column label="操作" width="200" align="center" color="black">
          <template v-slot="scope">
            <el-button class="table_edit_button" @click="doEdit(scope.row.id)" size="mini">编辑</el-button>
            <el-button class="table_delete_button" style="margin-left: 5px" @click="deleteRow(scope.row.id)"
              size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { courseInit, courseQuery, courseDelete } from "@/service/genServ.js";
import { mapState } from 'vuex';
export default {
  name: "CourseTable",
  data() {
    return {
      numName: '',
      dataList: [],
    };
  },
  created() {
    courseInit({}).then(
      (res) => {
        console.log(res.data)
        this.dataList = res.data;
      }
    );
  },
  computed: {
    ...mapState([
      'username', 'role','closechoose'
    ])
  },
  methods: {
    doQuery() {
      courseQuery({ numName: this.numName }).then((res) => {
        if (res.code === 0) {
          this.dataList = res.data;
        } else {
          this.$message({
            message: res.msg,
            type: 'warnning',
          })
        }
      });
    },
    doEdit(id) {
      this.$router.push({
        path: "CourseEdit",
        query: { id: id },
      });
    },
    addItem() {
      this.$router.push({
        path: "CourseEdit",
        query: {},
      });
    },
    deleteRow(id) {
      courseDelete({ id: id }).then((res) => {
        if (res.code == 0) this.doQuery();
        else {
          this.$message({
            message: res.msg,
            type: 'warnning',
          })
        }
      });
    },
    turndown() {
      this.$store.commit("close");
    }

  },
};
</script>

<style>
.base_form {
  margin-top: 1px;
  margin-left: 5px;

}
</style>