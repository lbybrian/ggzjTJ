//路由配置

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//layout template
import index from '@/main/index'
import about from '@/main/about'

//modules
import dataTable from '@/modules/about/dataTable'
import relationship from '@/modules/about/relationship'
import formInfo from '@/modules/about/formInfo'
import menuItem from '@/modules/about/menuItem'
import introduce from '@/modules/about/introduce'
import gallery from '@/modules/about/gallery'
import barChart from '@/modules/about/chart/barChart'
import lineChart from '@/modules/about/chart/lineChart'
import scatterChart from '@/modules/about/chart/scatterChart'
import pieChart from '@/modules/about/chart/pieChart'
import gaugeChart from '@/modules/about/chart/gaugeChart'
import radarChart from '@/modules/about/chart/radarChart'
import funnelChart from '@/modules/about/chart/funnelChart'
import treeChart from '@/modules/about/chart/treeChart'
import topology from '@/modules/about/topology'
import wordCloud from '@/modules/about/wordCloud'

export default new Router({
  routes: [{
      path: '/',
      name: 'index',
      component: index,
      children: [{
        path: '/',
        name: 'introduce',
        component: introduce,
      }]
    },
    {
      path: '/about',
      name: 'about',
      component: about,
      children: [{
        path: '/about',
        name: 'introduce',
        component: introduce,
      }, {
        path: '/about/gallery',
        name: 'gallery',
        component: gallery,
      },{
        path: '/about/dataTable',
        name: 'dataTable',
        component: dataTable,
      }, {
        path: '/about/relationship',
        name: 'relationship',
        component: relationship,
      }, {
        path: '/about/formInfo',
        name: 'formInfo',
        component: formInfo,
      }, {
        path: '/about/menuItem',
        name: 'menuItem',
        component: menuItem,
      }, {
        path: '/about/barChart',
        name: 'barChart',
        component: barChart,
      }, {
        path: '/about/lineChart',
        name: 'lineChart',
        component: lineChart,
      }, {
        path: '/about/scatterChart',
        name: 'scatterChart',
        component: scatterChart,
      }, {
        path: '/about/pieChart',
        name: 'pieChart',
        component: pieChart,
      }, {
        path: '/about/radarChart',
        name: 'radarChart',
        component: radarChart,
      },{
        path:'/about/funnelChart',
        name:'funnelchart',
        component:funnelChart,
      },
     
      {
        path: '/about/gaugeChart',
        name: 'gaugeChart',
        component: gaugeChart,
      },
      {
        path: '/about/treeChart',
        name: 'treeChart',
        component: treeChart,
      },
      {
        path: '/about/topology',
        name: 'topology',
        component: topology,
      },
      {
        path: '/about/wordCloud',
        name: 'wordCloud',
        component: wordCloud,
      },
    ]
    }
  ]
})
