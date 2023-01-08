<template>
    <div class="base_form" style="padding-top: 15px">
        <div class="base_query_oneLine">
            <div class="query_left">

            </div>
            <div class="query_right">
                <el-input class="marginl" placeholder="请输入课程号或课程名" v-model="numName"
                    style="width: 300px; margin-right: 5px" />
                <el-button class="blueButton" size="small" @click="doQuery()">查询</el-button>
            </div>
        </div>
        <div class="table-content">
            <el-table :data="dataList" border style="width: 100%" stripe>
                <el-table-column prop="courseNum" label="课程号" width="180"> </el-table-column>
                <el-table-column prop="courseName" label="课程名" width="180"> </el-table-column>
                <el-table-column prop="credit" label="学分"> </el-table-column>
                <el-table-column prop="precourse" label="所需课程"> </el-table-column>
                <el-table-column label="操作" width="200" align="center" color="black">
                    <template v-slot="scope">
                        <el-button class="table_choose_button" @click="choose(scope.row.id, scope.row.courseNum)"
                            size="mini" :disabled="chosenList[scope.row.courseNum]">选课</el-button>
                        <el-button class="table_cancel_button" style="margin-left: 5px"
                            @click="cancelChoose(scope.row.id)" size="mini"
                            :disabled="!chosenList[scope.row.courseNum]">取消选课</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import { courseInit, courseQuery, } from "@/service/genServ.js";
import axios from "axios";
import { mapState } from 'vuex';
export default {
    name: "CourseTable",
    data() {
        return {
            numName: '',
            dataList: [],
            courseid: '',
            chosenList: [],
        };
    },
    computed: {
        ...mapState([
            'username', 'role', 'closechoose'
        ])
    },
    created() {

        courseInit({}).then(
            (res) => {
                this.dataList = res.data;
                this.coursenum = this.dataList
            }
        );

        axios.post('http://localhost:9090/home/getChosenList', {
            username: this.username
        }).then((res) => {
            console.log(res.data.data)
            console.log(res.data.data.length)
            for (var i = 0; i < res.data.data.length; i++) {
                this.chosenList[res.data.data[i].courseNum] = true;
            }
        })

    },
    mounted() {

        setTimeout(() => {
            console.log(this.dataList.length)
            // for (var i = 0; i < this.dataList.length; i++) {
            //     this.chosenList[i] = false;
            // }
            console.log(this.chosenList)
        }, 1000);


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
        choose(id, coursenum) {
            this.chosenList[coursenum] = true;

            axios.post('http://localhost:9090/home/choose',
                {
                    courseid: id,
                    username: this.username
                }).then((res) => {
                    if (res.data == '时间冲突') {
                        this.chosenList[coursenum] = false;
                        this.$message({
                            message: "时间冲突，无法选课",
                            type: "warning",
                        });
                        return
                    }
                    this.$message({
                        message: "选课成功",
                        type: "success",
                    });
                    console.log(res.data)
                })
        },
        cancelChoose(id, coursenum) {
            this.chosenList[coursenum] = false;
            axios.post('http://localhost:9090/home/cancel',
                {
                    courseid: id,
                    username: this.username
                }).then((res) => {
                    this.$message({
                        message: "取消成功",
                        type: "success",
                    });
                    console.log(res.data)
                })
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