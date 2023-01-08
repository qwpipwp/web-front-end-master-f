<template>
  <div class="navi">
    <el-menu class="header" mode="horizontal" router>
      <el-menu-item index="/" class="menu-item">Home</el-menu-item>
      <template v-for="(v, i) in listA" :key="i">
        <template v-if="v.children.length > 0">
          <el-submenu :index="i.toString()">
            <template #title>
              <span class="menu-item">{{ v.title }}</span>
            </template>
            <template v-for="(item, j) in v.children" :key="j">
              <el-menu-item class="menu-item-two" :index="'/' + item.name">{{
                item.title
              }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item class="menu-item" :index="'/' + v.name">{{
            v.title
          }}</el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Navi",
  components: {},

  data() {
    return {
      listA: [
        {
          name: "BaseTable",
          title: "课程事项",
          children: [
            {
            name: "CourseTable",
            title: "课程管理",
            children: [],
            },
            {
            name: "CourseInfo",
            title: "课程信息",
            children: [],
            },
            {
            name: "ScoreTable",
            title: "成绩管理",
            children: [],
            },
            {
            name: "Homework",
            title: "作业管理",
            children: [],
            },
            {
            name: "Attdence",
            title: "出勤管理",
            children: [],
            },
            {
            name: "Count",
            title: "学分管理",
            children: [],
            },
          ],
        },
        {
          name: "Person",
          title: "个人信息",
          children: [
            {
            name: "StudentHomepage",
            title: "个人页面",
            children: [],
            },
            {
            name: "BaseTableOne",
            title: "学生管理",
            children: [],
            },
            {
            name: "FamilyMember",
            title: "家庭成员",
            children: [],
            },
            {
            name: "InformationTable",
            title: "信息管理",
            children: [],
            },
            {
            name: "Honor",
            title: "荣誉管理",
            children: [],
            },
          ],
        },
        {
          name: "Activitys",
          title: "活动事项",
          children: [
            {
            name: "Activity",
            title: "活动管理",
            children: [],
            },
            {
            name: "PracticeTable",
            title: "实践管理",
            children: [],
            },
          ],
        },
      ],
    };
  },
  methods: {},
};
</script>
<style scoped>
.navi {
  border-bottom: 4px solid #c80201;
}
.header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: #e8e8e8;
}
.menu-item {
  color: #585858 !important;
  font-size: 18px;
  font-weight: bold;
}
</style>
