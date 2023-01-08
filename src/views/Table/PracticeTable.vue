<template>
  <div class="base_form" style="padding-top: 15px" >
    <div class="base_query_oneLine">
      <div class="query_left">
        <el-button class="orangeButton" size="small" @click="addItem()" v-if="show">添加</el-button>
      </div>
      <div class="query_right">
        <el-input class="marginl" placeholder="请输入学号或学生名称" v-model="numName" style="width: 300px; margin-right: 5px"
          v-if="show" />
        <el-button class="blueButton" size="small" @click="doQuery()" v-if="show">查询</el-button>
      </div>
    </div>
    <div class="table-content" >
      <el-table :data="dataList" border style="width: 100%">
        <el-table-column prop="studentNum" label="学号" width="180"> </el-table-column>
        <el-table-column prop="studentName" label="学生名称" width="180"> </el-table-column>
        <el-table-column prop="practiceNum" label="实践项目序号"> </el-table-column>
        <el-table-column prop="practiceName" label="实践项目名称"> </el-table-column>
        <el-table-column prop="practiceKind" label="实践项目种类"> </el-table-column>
        <el-table-column prop="practiceDate" label="实践项目日期"> </el-table-column>
        <el-table-column label="操作" width="200" align="center" color="black" v-if="show">
          <template v-slot="scope">
            <el-button class="table_edit_button" @click="doEdit(scope.row.id)" size="mini" v-if="show">编辑</el-button>
            <el-button class="table_delete_button" style="margin-left: 5px" @click="deleteRow(scope.row.id)" size="mini"
              v-if="show">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
  
<script>
import { practiceInit, practiceQuery, practiceDelete } from "@/service/genServ.js";
import { mapState } from 'vuex';
import axios from "axios";
export default {
  name: "PracticeTable",
  data() {
    return {
      numName: '',
      dataList: [],
      show: true,
    };
  },
  computed: {
    ...mapState([
      'username', 'role'
    ])
  },
  created() {
    if (this.role == '学生') {
      axios.post('http://localhost:9090/api/auth/getName',
        {
          username: this.username
        }).then((res) => {
          this.numName = res.data;
        })
    }
    else {

      practiceInit({}).then(
        (res) => {
          this.dataList = res.data;
        }
      );
    }
  },
  mounted() {
    setTimeout(() => {
      this.loadstu()
    }, 100);
  },
  methods: {
    doQuery() {
      practiceQuery({ numName: this.numName }).then((res) => {
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
        path: "practiceEdit",
        query: { id: id },
      });
    },
    addItem() {
      this.$router.push({
        path: "practiceEdit",
        query: {},
      });
    },
    deleteRow(id) {
      practiceDelete({ id: id }).then((res) => {
        if (res.code == 0) this.doQuery();
        else {
          this.$message({
            message: res.msg,
            type: 'warnning',
          })
        }
      });
    },
    loadstu() {
      if (this.role == '学生') {
        this.show = false
        practiceQuery({ numName: this.numName }).then((res) => {
          console.log(this.numName)
          if (res.code === 0) {
            this.dataList = res.data;
          } else {
            this.$message({
              message: res.msg,
              type: 'warnning',
            })
          }
        });
      }
    },

  },
};
</script>

<style>
.base_form {
  margin-top: 1px;
  margin-left: 5px;

}
</style>