<template>
    <div class="class-table">
        <div class="table-wrapper">
            <div class="tabel-container">
                <table>
                    <thead>
                        <tr>
                            <th>时间</th>
                            <th v-for="(weekNum, weekIndex) in weeks" :key="weekIndex"> {{
                                '周' + digital2Chinese(weekNum,
                                    'week')
                            }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(courseNum, courseIndex) in coursesLen" :key="courseIndex">

                            <td>
                                <p>{{ '第' + digital2Chinese(courseNum) + "节" }}</p>
                                <p class="period">{{ classTableData.period[courseIndex] }}</p>
                            </td>

                            <td v-for="(weekNum, weekIndex) in weeks" :key="weekIndex">
                                {{ fieldCharacter(weekIndex, courseIndex) }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
export default {
    data() {
        return {
            weeks: [], //周集合
            coursesLen: 0, //最大课节数
            classTableData: {
                period: ['08:00-09:50', '10:10-12:00', '02:00-03:50', '04:10-06:00', '07:00-8:50', '9:10-11:00'], //时间段
                weekCourse: [
                    {
                        'week': 0,
                        'courses': [
                            { 'index': 1, 'title': '' },
                            { 'index': 2, 'title': '' },
                            { 'index': 3, 'title': '' },
                            { 'index': 4, 'title': '' },
                            { 'index': 5, 'title': '' },
                            { 'index': 6, 'title': '' }
                        ]
                    },
                    {
                        'week': 1,
                        'courses': [
                            { 'index': 1, 'title': '' },
                            { 'index': 2, 'title': '' },
                            { 'index': 3, 'title': '' },
                            { 'index': 4, 'title': '' },
                            { 'index': 5, 'title': '' },
                            { 'index': 6, 'title': '' }
                        ]
                    },
                    {
                        'week': 3,
                        'courses': [
                            { 'index': 1, 'title': '' },
                            { 'index': 2, 'title': '' },
                            { 'index': 3, 'title': '' },
                            { 'index': 4, 'title': '' },
                            { 'index': 5, 'title': '' },
                            { 'index': 6, 'title': '' }
                        ]
                    },
                    {
                        'week': 2,
                        'courses': [
                            { 'index': 1, 'title': '' },
                            { 'index': 2, 'title': '' },
                            { 'index': 3, 'title': '' },
                            { 'index': 4, 'title': '' },
                            { 'index': 5, 'title': '' },
                            { 'index': 6, 'title': '' }
                        ]
                    },
                    {
                        'week': 4,
                        'courses': [
                            { 'index': 1, 'title': '' },
                            { 'index': 2, 'title': '' },
                            { 'index': 3, 'title': '' },
                            { 'index': 4, 'title': '' },
                            { 'index': 5, 'title': '' },
                            { 'index': 6, 'title': '' }
                        ]
                    },
                    {
                        'week': 5,
                        'courses': [
                            { 'index': 1, 'title': '' },
                            { 'index': 2, 'title': '' },
                            { 'index': 3, 'title': '' },
                            { 'index': 4, 'title': '' },
                            { 'index': 5, 'title': '' },
                            { 'index': 6, 'title': '' }
                        ]
                    },
                    {
                        'week': 6,
                        'courses': [
                            { 'index': 1, 'title': '' },
                            { 'index': 2, 'title': '' },
                            { 'index': 3, 'title': '' },
                            { 'index': 4, 'title': '' },
                            { 'index': 5, 'title': '' },
                            { 'index': 6, 'title': '' }
                        ]
                    }
                ]
            }
        }
    },
    computed: {
        ...mapState([
            'username', 'role'
        ])
    },
    created() {
        this.updateData();
        this.initWeekCourses();
        this.getcourse();
    },
    methods: {
        getcourse() {
            axios.post('http://localhost:9090/home/getCourse', {
                username: this.username
            }).then((res) => {
                console.log(res.data.data)
                // console.log(res.data.data[0].week)
                // console.log(JSON.stringify(this.classTableData.weekCourse[res.data.data[0].week].courses[0].index))
                // this.classTableData.weekCourse[res.data.data[0].week].courses

                for (var i = 0; i < res.data.data.length; i++) {
                    console.log(i)
                    // this.classTableData.weekCourse[res.data.data[i].week].courses[i].index = res.data.data[i].index;
                    // this.classTableData.weekCourse[res.data.data[i].week].courses[i].title = res.data.data[i].courseName;
                    //给课表对应的行列赋值，太过复杂了
                    this.classTableData.weekCourse[res.data.data[i].week].courses[res.data.data[i].index].title = res.data.data[i].courseName;
                }
                console.log(JSON.stringify(this.classTableData.weekCourse))
            })
        },
        updateData() {

            /* 将数据按从周日到周六排序 */
            this.classTableData.weekCourse.sort((a, b) => {
                return a.week - b.week;
            });

            /* 将数据按从第一节到第n节排序 */
            for (let v of this.classTableData.weekCourse) {
                for (let k in v) {
                    if (k === 'courses') {
                        v[k].sort((a, b) => {
                            return a.index - b.index;
                        });
                    }
                }
            }

            console.log(JSON.stringify(this.classTableData.weekCourse[0].courses));
        },
        /**
         * 计算周数据及课节数
         */
        initWeekCourses() {
            const that = this;
            this.weeks = []; //周集合
            this.coursesLen = 0; //最大的课节数

            this.weeks = this.classTableData.weekCourse.map((item) => {
                for (let k in item) {
                    if (k === 'courses') {
                        let maxCoursesLen = 0;
                        /* 取出一周中最大的课节数及当天的最大课节数 */
                        for (let j of item[k]) {
                            j.index > that.coursesLen && (that.coursesLen = j.index); //取所有一周里最大课节值
                            j.index > maxCoursesLen && (maxCoursesLen = j.index); //取当天最大课节值
                        }


                        /* 如果当天的课节总数小于当天的最大课节值 */
                        if (item[k].length < maxCoursesLen) {
                            for (let i = 0; i < maxCoursesLen; i++) { //以最大课节值为终点遍历当天课节
                                if (!item[k][i] || item[k][i].index != (i + 1)) { //如果下标课节不存在或着与循环的下标不匹配
                                    item[k].splice(i, 0, ''); //填充空课节
                                }
                            }
                        }
                    }
                }
                return item.week;
            });

            console.log(JSON.stringify(this.classTableData.weekCourse));




        },
        /**
         * 处理格子数据，无数据转换为字符串'-'
         * @param {Number} weekIndex 周几对应的下标
         * @param {Number} courseNum 第几节课对应的下标
         * @returns {String} 返回对应的字符
         */
        fieldCharacter(weekIndex, courseIndex) {
            if (
                this.classTableData.weekCourse[weekIndex]
                &&
                this.classTableData.weekCourse[weekIndex].courses[courseIndex]
                &&
                this.classTableData.weekCourse[weekIndex].courses[courseIndex].index === courseIndex + 1
            ) {
                return this.classTableData.weekCourse[weekIndex].courses[courseIndex].title;
            }
            return '-';
        },


        /**
        * 数字转中文
        * @param {Number} num 需要转换的数字
        * @param {Boolean} identifier 标识符
        * @returns {String} 转换后的中文
        */
        digital2Chinese(num, identifier) {
            const character = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];
            return identifier === 'week' && (num === 0 || num === 7) ? '日' : character[num];
        },
    }
};
</script>

<style lang="scss" scoped>
.class-table {
    margin-top: 50px;

    .table-wrapper {
        width: 100%;
        height: 100%;
        overflow: auto;
    }

    .tabel-container {
        margin: 7px;

        table {
            table-layout: fixed;
            width: 100%;

            thead {
                background-color: #67a1ff;

                th {
                    color: #fff;
                    line-height: 17px;
                    font-weight: normal;
                }
            }

            tbody {
                background-color: #eaf2ff;

                td {
                    color: #677998;
                    line-height: 12px;
                }
            }

            th,
            td {
                width: 40px;
                padding: 8px 2px;
                font-size: 12px;
                text-align: center;
            }

            tr td:first-child {
                color: #333;

                .period {
                    font-size: 8px;
                }
            }
        }
    }
}
</style>
