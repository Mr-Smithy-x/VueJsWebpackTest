import Vue from 'vue'
import Router from 'vue-router'

import Skill from '@/components/skills/Skill'
import Skills from '@/components/skills/Skills'
import About from '@/components/about/About'
import ListFeed from '@/components/news/ListFeed'
import Article from '@/components/news/article/Article'

Vue.use(Router)

export default new Router({

  routes: [
    {
      path: '/',
      name: 'skills',
      component: Skills
    },
    {
      path: '/skill/:id',
      name: 'skill',
      component: Skill
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/news',
      name: 'list',
      component: ListFeed
    },
    {
      path: '/news/:page',
      name: 'list_page',
      component: ListFeed
    },
    {
      path: '/news/:query/:page',
      name: 'list_query_page',
      component: ListFeed
    },
    {
      path: '/article/:id',
      name: 'article',
      component: Article
    }
  ],

  mode: 'history'
})
