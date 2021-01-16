import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/pages/HomePage'
import AlphaSearchPage from '@/components/pages/AlphaSearchPage'
import TaskListPage from '@/components/pages/TaskListPage'
import TaskDetailsPage from '@/components/pages/TaskDetailsPage'
import CreateTaskPage from '@/components/pages/CreateTaskPage'

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
