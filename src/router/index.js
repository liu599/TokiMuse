import Vue from 'vue'
import Router from 'vue-router'
import Rank from 'components/rank/rank'
import Recommend from 'components/recommend/recommend'
import Search from 'components/search/search'
import Singer from 'components/singer/singer'
import Radio from 'components/radio/radio'
import Disc from 'components/disc/disc'
import TopList from 'components/top-list/top-list'
import UserCenter from 'components/user-center/user-center'

import SingerDetail from 'components/singer-detail/singer-detail'

// 注册路由
Vue.use(Router)

export default new Router({
  routes: [
    // 配置根目录解决高亮问题
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/user',
      name: 'UserCenter',
      component: UserCenter
    },
    {
      path: '/rank',
      name: 'Rank',
      component: Rank,
      children: [
        {
          path: ':id',
          component: TopList
        }
      ]
    },
    {
      path: '/radio',
      name: 'Radio',
      component: Radio
    },
    {
      path: '/recommend',
      name: 'Recommend',
      component: Recommend,
      children: [
        {
          path: ':id',
          component: Disc
        }
      ]
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/singer',
      name: 'Singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    }
  ]
})
