import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@/views/Login'
import SignUp from '@/views/SignUp'




const routes = [
  {
    path: '/Home',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/SignUp',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/Findback',
    name: 'Findback',
    component: () => import('@/components/ManageAccount/Findback.vue')
  },
  {
    path: '/ChangePassword',
    name: 'ChangePassword',
    component: () => import('@/components/ManageAccount/ChangePassword.vue')
  },
  {
    path: '/BaseTable',
    name: 'BaseTable',
    component: () => import('@/views/dashboard/BaseTable.vue')
  },
  {
    path: '/Student',
    name: 'Student',
    component: () => import('@/views/Table/Student.vue')
  },
  {
    path: '/BaseForm',
    name: 'BaseForm',
    component: () => import('@/views/dashboard/BaseForm.vue')
  },
  {
    path: '/PracticeTable',
    name: 'PracticeTable',
    component: () => import('@/views/Table/PracticeTable.vue')
  },
  {
    path: '/Class',
    name: 'Class',
    component:() => import('@/views/Class.vue')
  },
  {
    path: '/InformationTable',
    name: 'InformationTable',
    component: () => import('@/views/InformationTable.vue')
  },
  {
    path: '/InformationEdit',
    name: 'InformationEdit',
    component: () => import('@/views/dashboard/InformationEdit.vue')
  },
  {
    path: '/Honor',
    name: 'Honor',
    component: () => import('@/views/dashboard/Honor.vue')
  },


  {
    path: '/CourseInfo',
    name: 'CourseInfo',
    component: () => import('@/views/dashboard/CourseInfo.vue')
  },
  {
    path: '/FamilyMember',
    name: 'FamilyMember',
    component: () => import('@/views/dashboard/FamilyMember.vue')
  },
  {
    path: '/Homework',
    name: 'Homework',
    component: () => import('@/views/dashboard/Homework.vue')
  },
  {
    path: '/HomeworkEdit',
    name: 'HomeworkEdit',
    component: () => import('@/views/dashboard/HomeworkEdit.vue')
  },
  {
    path: '/Count',
    name: 'Count',
    component: () => import('@/views/dashboard/Count.vue')
  },
  {
    path: '/CountEdit',
    name: 'CountEdit',
    component: () => import('@/views/dashboard/CountEdit.vue')
  },
  {
    path: '/editor',
    name: 'editor',
    component: () => import('@/components/editor.vue')
  },
  {
    path: '/Homepage',
    name: 'Homepage',
    component: () => import('@/views/Homepage.vue'),
    redirect: '/Homepage/Information',
    children:[
      {
        path: 'Class',
        name: 'Class',
        component:() => import('@/views/Class.vue')
      },
      {
      path: 'Information',
      name: 'Information',
      component:() => import('@/components/Information.vue')
      },
      {
        path: 'InformationEdit',
        name: 'InformationEdit',
        component: () => import('@/views/dashboard/InformationEdit.vue')
      },
      {
        path: 'Student',
        name: 'Student',
        component:() => import('@/views/Table/Student.vue')
      },
      {
        path: 'FamilyMember',
        name: 'FamilyMember',
        component: () => import('@/views/dashboard/FamilyMember.vue')
      },
      {
        path: 'Honor',
        name: 'Honor',
        component: () => import('@/views/dashboard/Honor.vue')
      },
      {
        path: 'InformationTable',
        name: 'InformationTable',
        component: () => import('@/views/InformationTable.vue')
      },
      {
        path: 'CourseTable',
        name: 'CourseTable',
        component: () => import('@/views/Table/CourseTable.vue')
      },
      {
        path: 'CourseInfo',
        name: 'CourseInfo',
        component: () => import('@/views/dashboard/CourseInfo.vue')
      },
      {
        path: 'ScoreTable',
        name: 'ScoreTable',
        component: () => import('@/views/Table/ScoreTable.vue')
      },
      {
        path: 'Activity',
        name: 'Activity',
        component: () => import('@/views/dashboard/Activity.vue')
      },
      {
        path: 'PracticeTable',
        name: 'PracticeTable',
        component: () => import('@/views/Table/PracticeTable.vue')
      },
      {
        path: 'BaseForm',
        name: 'BaseForm',
        component: () => import('@/views/dashboard/BaseForm.vue')
      },
      {
        path: 'FamilyMemberEdit',
        name: 'FamilyMemberEdit',
        component: () => import('@/views/dashboard/FamilyMemberEdit.vue')
      },
      {
        path: 'HonorEdit',
        name: 'HonorEdit',
        component: () => import('@/views/dashboard/HonorEdit.vue')
      },
      {
        path: 'CourseEdit',
        name: 'CourseEdit',
        component: () => import('@/views/dashboard/CourseEdit.vue')
      },
      {
        path: 'CourseInfoEdit',
        name: 'CourseInfoEdit',
        component: () => import('@/views/dashboard/CourseInfoEdit.vue')
      },
      {
        path: 'ScoreEdit',
        name: 'ScoreEdit',
        component: () => import('@/views/dashboard/ScoreEdit.vue')
      },
      {
        path: 'PracticeEdit',
        name: 'PracticeEdit',
        component: () => import('@/views/dashboard/PracticeEdit.vue')
      },
      {
        path: 'ActivityEdit',
        name: 'ActivityEdit',
        component: () => import('@/views/dashboard/ActivityEdit.vue')
      },
      {
        path: 'Blog',
        name: 'Blog',
        component: () => import('@/views/Blog.vue')
      },
      {
        path: 'Article',
        name: 'Article',
        component: () => import('@/views/Article.vue')
      },
      {
        path: 'ChooseCourse',
        name: 'ChooseCourse',
        component: () => import('@/views/ChooseCourse.vue')
      },
    ]
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
