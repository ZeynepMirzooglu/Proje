import Course from '@/components/home/Course.vue'
import Home from '@/components/home/Home.vue'
import AddCourse from '@/components/user/dashboard/admin/AddCourse.vue'
import Courses from '@/components/user/dashboard/admin/Courses.vue'
import EditCourse from '@/components/user/dashboard/admin/EditCourse.vue'
import Dashboard from '@/components/user/dashboard/Dashboard.vue'
import MainPage from '@/components/user/dashboard/MainPage.vue'
import Profile from '@/components/user/dashboard/Profile.vue'
import SigIn from '@/components/user/SigIn.vue'
import { isAuth, isLoggedIn } from '@/composables/auth'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/course/:id',
      name: 'course',
      component: Course,
    },
    {
      path: '/signin',
      name: 'signin',
      beforeEnter:isLoggedIn,
      component: SigIn,
    },
    {
      path: '/user/dashboard',
      name: 'mainpage',
      beforeEnter:isAuth,
      component: MainPage,children:[
        { path:'',name:'dashboard',component:Dashboard},
        { path:'profile',name:'profile',component:Profile},
        { path:'courses',name:'courses',component:Courses},
        { path:'addcourse',name:'addcourse',component:AddCourse},
        { path:'editcourse/:id',name:'editcourse',component:EditCourse},
      ]
    },
   
  ],
})

export default router
