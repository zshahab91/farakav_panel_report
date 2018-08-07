import Vue from 'vue'
import VueRouter from 'vue-router'
// Imports Components
import HomePage from '../pages/Home'
import HomePageLayout from '../pages/Homepagelayout'
import CategoryLayout from '../pages/Categorylayout'
import Channel from '../pages/Channel'
import Comment from '../pages/Comment'
import Like from '../pages/Like'
import Playlist from '../pages/Playlist'
import Task from '../pages/Task'
import Video from '../pages/Video'
import NotFound from '../pages/404'
import Error from '../pages/Error'

Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
  routes: [
    {
      path: '/',
      component: HomePage,
      meta: {
        title: 'Home Page'
      }
    },
    {
      path: '/homepage_layouts',
      component: HomePageLayout,
      meta: {
        title: 'HomePage Layout Report'
      }
    },
    {
      path: '/category_layouts',
      component: CategoryLayout,
      meta: {
        title: 'Category Layout Report'
      }
    },
    {
      path: '/channels',
      component: Channel,
      meta: {
        title: 'Channel Report'
      }
    },
    {
      path: '/comments',
      component: Comment,
      meta: {
        title: 'Comment Report'
      }
    },
    {
      path: '/likes',
      component: Like,
      meta: {
        title: 'Like Report'
      }
    },
    {
      path: '/playlists',
      component: Playlist,
      meta: {
        title: 'Playlist Report'
      }
    },
    {
      path: '/tasks',
      component: Task,
      meta: {
        title: 'Task Report'
      }
    },
    {
      path: '/videos',
      component: Video,
      meta: {
        title: 'Video Report'
      }
    },
    {
      path: '/error',
      component: Error,
      meta: {
        title: 'Error Page'
      }
    },
    {
      path: '*',
      component: NotFound,
      meta: {
        title: '404'
      }
    }
  ]
})

export default router
