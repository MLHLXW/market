import Vue from 'vue'
import VueRouter from 'vue-router'
import MyRight1 from '@/components/MyRight1.vue'
import MyLikes from '@/components/MyLikes.vue'
import Gload from '@/components/Gload.vue'
import Yload from '@/components/Yload.vue'
import Yzhuce from '@/components/Yzhuce.vue'
import DeGoods from '@/components/DeGoods.vue'
import PerSon from '@/components/PerSon.vue'
import Csxq from '@/components/Csxq.vue'
import user from '@/components/user.vue'
import MySell from '@/components/MySell.vue'
import Tianjia from '@/components/Tianjia.vue'
import Buy from '@/components/Buy.vue'
import Sold from '@/components/Sold.vue'
import admin from '@/components/admin.vue'
import gsh from '@/components/gsh.vue'
import ush from '@/components/ush.vue'
import tsd from '@/components/tsd.vue'
import Letter from '@/components/Letter.vue'
import LetterDetail from '@/components/LetterDetail.vue'
import GoodSold from '@/components/GoodSold.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    routes:[
        {path: '/', redirect: '/Yload'},
        {path: '/user', component: user, children: [
            {path: 'MyRight1', component: MyRight1},
            {path: 'MyLikes', component: MyLikes},
            {path: 'MySell', component: MySell},
            {path: 'DeGoods', component: DeGoods},
            {path: 'PerSon', component: PerSon},
            {path: 'Tianjia', component: Tianjia},
            {path: 'Csxq', component: Csxq},
            {path: 'Buy', component: Buy},
            {path: 'Sold', component: Sold},
            {path: 'Letter', component: Letter},
            {path: 'LetterDetail', component: LetterDetail},
            {path: 'GoodSold', component: GoodSold},
        ]},

        {path: '/Yzhuce', component: Yzhuce},
        {path: '/Yload', component: Yload},
        {path: '/Gload', component: Gload},
        {path: '/admin', component: admin, children: [
            {path: 'gRight', component: MyRight1},
            {path: 'gsh', component: gsh},
            {path: 'ush', component: ush},
            {path: 'tsd', component: tsd},
            {path: 'gGoods', component: DeGoods},
        ]}
    ]
})

export default router