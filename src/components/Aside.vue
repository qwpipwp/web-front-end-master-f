<template>
    <div style="height: 100%;">
        <el-menu background-color=rgb(23,38,50) text-color="#ffffff" active-text-color=rgb(42,159,146)
            class="el-menu-vertical-demo" default-active="this.$route.path" router :unique-opened="true">
            <el-submenu :index="item.path + ''" v-for="item in menu_data" :key="item.name">
                <template #title><i :class="item.icon"></i><span>{{ item.name }}</span></template>

                <el-menu-item :index="child.path" v-for="child in item.child" :key="child.name">
                    <i :class="child.icon"></i>{{ child.name }}
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>



<script>
import { mapState } from 'vuex'
export default {
    name: "Aside",
    computed: {
        ...mapState([
            'username', 'jwtToken', 'role'
        ])
    },
    data() {
        return {
            menu_data: [
            ],
            teacher_table: [
                {
                    name: '个人主页',
                    icon: 'el-icon-location',
                    path: '1',
                    child: [
                        {
                            name: '个人信息',
                            path: '/Homepage/Information',
                        },
                        {
                            name: '个人博客',
                            path: '/Homepage/Blog',
                        }
                    ]
                },
                {
                    name: '学生相关',
                    icon: 'el-icon-document',
                    path: '2',
                    child: [
                        {
                            name: '学籍管理',
                            path: '/Homepage/Student',
                        },
                        {
                            name: '家庭成员',
                            path: '/Homepage/FamilyMember',
                        },
                        {
                            name: '荣誉管理',
                            path: '/Homepage/Honor',
                        },
                        {
                            name: '学生信息',
                            path: '/Homepage/InformationTable',
                        }
                    ]
                },
                {
                    name: '课程相关',
                    icon: 'el-icon-document',
                    path: '3',
                    child: [
                        {
                            name: '课程管理',
                            path: '/Homepage/CourseTable',
                        },
                        {
                            name: '课程信息',
                            path: '/Homepage/CourseInfo',
                        },
                        {
                            name: '成绩管理',
                            path: '/Homepage/ScoreTable',
                        },
                        {
                            name: '作业考勤',
                            path: '/Homepage',
                        },
                        {
                            name: '课程表',
                            path: '/Homepage/Class',
                        },
                    ]
                },
                {
                    name: '活动相关',
                    icon: 'el-icon-document',
                    path: '4',
                    child: [
                        {
                            name: '活动管理',
                            path: '/Homepage/Activity',
                        },
                        {
                            name: '实践管理',
                            path: '/Homepage/PracticeTable',
                        },
                    ]
                }
            ],
            student_table: [
                {
                    name: '个人主页',
                    icon: 'el-icon-location',
                    path: '1',
                    child: [
                        {
                            name: '个人信息',
                            path: '/Homepage/Information',
                        },
                        {
                            name: '个人博客',
                            path: '/Homepage/Blog',
                        }
                    ]
                },
                {
                    name: '学生相关',
                    icon: 'el-icon-document',
                    path: '2',
                    child: [
                        {
                            name: '我的学籍',
                            path: '/Homepage/Student',
                        },
                        {
                            name: '家庭成员',
                            path: '/Homepage/FamilyMember',
                        },
                        {
                            name: '我的荣誉',
                            path: '/Homepage/Honor',
                        },
                        {
                            name: '我的信息',
                            path: '/Homepage/InformationTable',
                        }
                    ]
                },

                {
                    name: '课程相关',
                    icon: 'el-icon-document',
                    path: '3',
                    child: [
                        {
                            name: '我的课程',
                            path: '/Homepage/Class',
                        },
                        {
                            name: '课程信息',
                            path: '/Homepage/CourseInfo',
                        },
                        {
                            name: '我的成绩',
                            path: '/Homepage/ScoreTable',
                        },
                        {
                            name: '选课中心',
                            path: '/Homepage/ChooseCourse',
                        },
                    ]
                },
                {
                    name: '活动相关',
                    icon: 'el-icon-document',
                    path: '4',
                    child: [
                        {
                            name: '历史活动',
                            path: '/Homepage/Activity',
                        },
                        {
                            name: '历史实践',
                            path: '/Homepage/PracticeTable',
                        },
                    ]
                }
            ],
            admin_table: [
                {
                    name: '学生相关',
                    icon: 'el-icon-document',
                    path: '2',
                    child: [
                        {
                            name: '学籍管理',
                            path: '/Homepage/Student',
                        },
                        {
                            name: '家庭成员',
                            path: '/Homepage/FamilyMember',
                        },
                        {
                            name: '荣誉管理',
                            path: '/Homepage/Honor',
                        },
                        {
                            name: '学生信息',
                            path: '/Homepage/InformationTable',
                        }
                    ]
                },
                {
                    name: '课程相关',
                    icon: 'el-icon-document',
                    path: '3',
                    child: [
                        {
                            name: '课程管理',
                            path: '/Homepage/CourseTable',
                        },
                        {
                            name: '课程信息',
                            path: '/Homepage/CourseInfo',
                        },
                        {
                            name: '成绩管理',
                            path: '/Homepage/ScoreTable',
                        },
                        {
                            name: '作业考勤',
                            path: '/Homepage',
                        }
                    ]
                },
                {
                    name: '活动相关',
                    icon: 'el-icon-document',
                    path: '4',
                    child: [
                        {
                            name: '活动管理',
                            path: '/Homepage/Activity',
                        },
                        {
                            name: '实践管理',
                            path: '/Homepage/PracticeTable',
                        },
                    ]
                }
            ],
        }
    },
    created() {
        if (this.role == '老师') {
            this.menu_data = this.teacher_table
            return
        }
        if (this.role == '学生') {
            this.menu_data = this.student_table
            return
        }
        else {
            this.menu_data = this.admin_table
        }
    }
}
</script>




<style scoped>
.el-menu-vertical-demo {
    height: 100%;
    background-color: rgb(23, 38, 50);
}
</style>
