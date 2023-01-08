
<template>
    <div ref="imageTofile" class="PDF">
        <!-- <el-row :gutter="0" class="form" style="display: flex " v-if="showstu">
          <el-col :span="18">
              <el-descriptions :column="2" border>
                  <el-descriptions-item label="学生姓名">{{ form.studentName }}</el-descriptions-item>
                  <el-descriptions-item label="学号">{{ form.studentNum }}</el-descriptions-item>
                  <el-descriptions-item label="性别">{{ getSex(form.sex) }}</el-descriptions-item>
                  <el-descriptions-item label="学院">{{ form.dept }}</el-descriptions-item>
                  <el-descriptions-item label="出生日期">{{ form.birthday }}</el-descriptions-item>
                  <el-descriptions-item label="年龄">{{ form.age }}</el-descriptions-item>
              </el-descriptions>
          </el-col>
          <el-col :span="6" style="align-items: stretch">
              <div class="imgBox">
                  <img class="devImg" fit="fill" :alt="this.username" :src="'/md/'+ this.username+ '/头像.jpg'"> -->
        <!-- <img class="devImg" :src="require(`../../public/md/${this.username}/头像.jpg`)" /> -->
        <!-- <img class="devImg" fit="fill" :src="require('@/assets/1.jpg')" /> -->
        <!-- </div>
          </el-col>
      </el-row> -->

        <el-row style="display: flex" v-if="showstu">
            <el-col :span="24">
                <el-tabs v-model="activeName" type="card" class="demo-tabs">
                    <el-tab-pane :label="form.studentName" name="first">
                        <el-row>
                            <el-col :span="16" class="other-info">
                                <div>
                                    学号: <p>{{ form.studentNum }}</p>
                                </div>
                                <div>
                                    性别: <p>{{ getSex(form.sex) }}</p>
                                </div>
                                <div>
                                    学院: <p>{{ form.dept }}</p>
                                </div>
                                <div>
                                    出生日期: <p>{{ form.birthday }}</p>
                                </div>
                                <div>
                                    年龄: <p>{{ form.age }}</p>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <img class="devImg" fit="fill" :alt="this.username"
                                    :src="'/md/' + this.username + '/头像.jpg'">
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>

        <el-row style="display: flex" v-if="!showstu">
            <el-col :span="24">
                <el-tabs v-model="activeName" type="card" class="demo-tabs">
                    <el-tab-pane :label="form.teacherName" name="first">
                        <el-row>
                            <el-col :span="16" class="other-info">
                                <div>
                                    工号: <p>{{ form.teacherNum }}</p>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <img class="devImg" fit="fill" :alt="this.username"
                                    :src="'/md/' + this.username + '/头像.jpg'">
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
        <v-md-editor v-model="text" height="600px" :mode="mdmode" @save="savemd"></v-md-editor>
    </div>
    <div class="use">
        <el-button class="button-dalod" title="生成图片" @click="getPDF()" icon="el-icon-download"></el-button>
        <el-button class="button-dalod" title="编辑介绍" @click="edite()">编辑介绍</el-button>
        <el-upload accept="JPG" :data="{ username: this.username }" :headers="authHeader" :limit="1"
            :action="'/api/teach/uploadImage'" :multiple="false" :on-success="onSuccess" :show-file-list="true">

            <el-button class="upload">上传头像</el-button>
        </el-upload>
    </div>
</template>


<script>
import axios from 'axios';
import htmlToPdf from "@/utils/getPDF.js";
import { studentEditInit, getAuthHeader, teacherEditInit } from "@/service/genServ.js";
import { mapState } from 'vuex';
export default {
    name: "Information",
    data() {
        return {
            text: '',
            form: {
                studentNum: "",
                studentName: "",
                sex: "",
                age: "",
                dept: "",
                birthday: "",
                text: '',
            },
            authHeader: getAuthHeader(),
            image0: "",
            sexList: [],
            formName: "个人信息",
            identity: '',
            showstu: '',
            activeName: 'first',
            mdmode: "preview",

        };
    },
    computed: {
        ...mapState([
            'username', 'role'
        ])
    },
    methods: {
        fetchData() {
            if (this.role == '学生') {
                studentEditInit({ id: this.id }).then((res) => {
                    this.form = res.data.form;
                    this.sexList = res.data.sexList;
                    this.image0 = res.data.image0;
                });
            }
            if (this.role == '老师') {
                teacherEditInit({ id: this.id }).then((res) => {
                    this.form = res.data.form;
                });
            }
        },
        getSex(sex) {
            if (sex == "1") {
                this.sex = "男";
            } else {
                this.sex = "女";
            }
            return this.sex;
        },
        getPDF() {
            htmlToPdf.downloadPDF(document.querySelector(".PDF"), "个人主页");
        },
        edite() {
            this.mdmode = ""
        },
        savemd() {
            axios.post('http://localhost:9090/blog/edite',
                {
                    username: this.username,
                    text: this.text
                }).then(() => {
                    this.$message({
                        message: "发布成功",
                        type: "sucess"
                    });
                    this.$router.push('/Homepage')
                })
        },
        // uploadFile() {
        //     axios.post('http://localhost:9090/blog/upload',
        //         {

        //         }).then((res) => {
        //             console.log(res.data)
        //         })
        // }
    },
    mounted() {
        if (this.role == '老师') {
            this.identity = 'teacher'
            this.showstu = false
        }
        else {
            this.identity = 'student'
            this.showstu = true
        }
        //获得md文件渲染到页面
        axios.get(`/md/${this.identity}/intro.md`).then(res => {
            this.text = res.data;
        })

        setTimeout(() => {
            this.fetchData()
        }, 100);

    },
    created() {
        if (this.role == '老师') {
            axios.post('http://localhost:9090/api/auth/getTeaId', {
                username: this.username
            }).then((res) => {
                this.id = res.data
            })
        }
        if (this.role == '学生') {
            axios.post('http://localhost:9090/api/auth/getStuId', {
                username: this.username
            }).then((res) => {
                this.id = res.data
            })
        }
    }
};
</script>





<style>
.imgBox {
    border: 1px solid #ebeef5;
    border-left: none;
    width: 250px;
    height: 250px;
    position: relative;
}

.devImg {
    background-size: contain;
    max-width: 100%;
    max-height: 100%;
}

.form {
    margin-top: 10px;
}

.el-tabs__item.is-active {
    width: 150px !important;
    font-size: 24px;
}
</style>

<style scoped>
:deep(.el-descriptions__body table) {
    height: 200px;
}

:deep(.el-tabs__nav) {
    background-color: rgb(23, 38, 50);
}

:deep(.el-tabs__item.is-active) {
    color: #fff;
}

.devImg {
    height: 240px;
    border: 2px solid #ebeef5;
    margin-left: 100px;
}

.head {
    background-color: rgb(23, 38, 50);
}

.PDF {
    width: 1000px;
    margin: 0 auto;
    padding-top: 50px;
}

ul li div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}

.other-info div {
    display: flex;
    color: #fff;
    width: 80%;
    height: 40px;
    padding: 0 20px;
    border-radius: 50px;
    background-color: rgb(23, 38, 50);
    margin-top: 10px;
    align-items: center;
    justify-content: space-between;
}

.other-info div p {
    display: flex;
    color: #000;
    width: 60%;
    background-color: #fff;
    height: 30px;
    border-radius: 50px;
    padding: 0 20px;
    align-items: center;
}
.use{
    display: flex;
    float: right;
}

.upload {
    margin-left: 8px;
}
</style>