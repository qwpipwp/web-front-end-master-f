<template>
  <div class="base_form" style="padding-top: 15px">
    <div class="base_query_oneLine">
      <div class="query_left">
        <el-button class="orangeButton" size="small" @click="addItem()" v-if="show">添加</el-button>
      </div>
      <div class="query_right">
        <el-input class="marginl" placeholder="请输入学号或姓名" v-model="numName" style="width: 300px; margin-right: 5px"
          v-if="show" />
        <el-button class="blueButton" size="small" @click="doQuery()" v-if="show">查询</el-button>
      </div>
    </div>
    <div class="table-content">
      <el-table :data="dataList" border style="width: 100%">
        <el-table-column prop="studentNum" label="学号" width="180"> </el-table-column>
        <el-table-column prop="studentName" label="姓名" width="180"> </el-table-column>
        <el-table-column prop="name" label="家长姓名"> </el-table-column>
        <el-table-column prop="sex" label="性别"> </el-table-column>
        <el-table-column prop="rel" label="关系"> </el-table-column>
        <el-table-column label="操作" width="200" align="center" color="black" v-if="show">
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
import { familyMemberInit, familyMemberQuery, familyMemberDelete } from "@/service/genServ.js";
import { mapState } from 'vuex';
import axios from "axios";
export default {
  name: "FamilyMember",
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
  components: {

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
      familyMemberInit({}).then(
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
      familyMemberQuery({ numName: this.numName }).then((res) => {
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
        path: "FamilyMemberEdit",
        query: { id: id },
      });
    },
    addItem() {
      this.$router.push({
        path: "FamilyMemberEdit",
        query: {},
      });
    },
    deleteRow(id) {
      familyMemberDelete({ id: id }).then((res) => {
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
        familyMemberQuery({ numName: this.numName }).then((res) => {
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