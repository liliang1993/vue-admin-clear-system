import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Table from './views/nav1/Table.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'
import Page4 from './views/nav2/Page4.vue'
import Page5 from './views/nav2/Page5.vue'
import Page6 from './views/nav3/Page6.vue'
import echarts from './views/charts/echarts.vue'

import Current from './views/current.vue'
import Summary from './views/summary.vue'
import Activity from './views/activity.vue'
import Funds from './views/funds.vue'
import PicoTrades from './views/picoTrades.vue'
import ClientTrades from './views/clientTrades.vue'
import BridgeRecords from './views/bridgeRecords.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: 'User',
        iconCls: 'el-icon-message',//图标样式class
        leaf:true,
        children: [
            { path: '/user', component: Table, name: '主页', hidden: true },
        ]
    },
    {
        path: '/',
        component: Home,
        name: 'Current',
        leaf:true,
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/current', component:Current, name: '页面4' },
        ]
    },
     {
        path: '/',
        component: Home,
        name: 'Summary',
        leaf:true,
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/summary', component:Summary, name: '页面4' },
        ]
    },
    // {
    //     path: '/',
    //     component: Home,
    //     name: 'Activity',
    //     leaf:true,
    //     iconCls: 'fa fa-id-card-o',
    //     children: [
    //         { path: '/activity', component:Activity, name: '页面4' },
    //     ]
    // },
    {
        path: '/',
        component: Home,
        name: 'Activity',
        leaf:true,
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/funds', component:Funds, name: '页面4' },
        ]
    },
    {
        path: '/',
        component: Home,
        name:  'PICO Trades',
        leaf:true,
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/picoTrades', component:PicoTrades, name: '页面4' }
        ]
    },
    {
        path: '/',
        component: Home,
        name:  'Client Trades',
        leaf:true,
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/clientTrades', component:ClientTrades, name: '页面4' }
        ]
    },
    {
        path: '/',
        component: Home,
        name:  'Bridge Records',
        leaf:true,
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/bridgeRecords', component:BridgeRecords, name: '页面4' },
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;