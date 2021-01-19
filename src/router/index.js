import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/pages/HomePage'
import AlphaSearchPage from '@/pages/AlphaSearchPage'
import TaskListPage from '@/pages/TaskListPage'
import TaskDetailsPage from '@/pages/TaskDetailsPage'
import CreateTaskPage from '@/pages/CreateTaskPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      name: 'home',
      component: HomePage
    },
    {
      path: '/alpha',
      name: 'alpha',
      component: AlphaSearchPage
    }, 
    {
      path: '/tasks',
      name: 'tasks',
      component: TaskListPage
    },
    {
      path: '/task/:tid',
      name: 'taskDetails',
      component: TaskDetailsPage
    },
    {
      path: '/search',
      name: 'Search Page',
      component: CreateTaskPage
    }
  ],
  mode: 'history'
})
