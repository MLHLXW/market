<template>
<div>
  <router-view></router-view>
</div>
</template>

<script>
import user from '@/components/user.vue'
import Letter from './components/Letter.vue'
import LetterDetail from './components/LetterDetail.vue'
import Csxq from './components/Csxq.vue'
import Tianjia from './components/Tianjia.vue'
import MySell from './components/MySell.vue'
import Sold from './components/Sold.vue'
import Buy from './components/Buy.vue'
import MyLeft from './components/MyLeft.vue'
import gsh from './components/gsh.vue'
import ush from './components/ush.vue'
import tsd from './components/tsd.vue'

export default {
  components:{
    user,
    Letter,
    LetterDetail,
    Csxq,
    Tianjia,
    MySell,
    Sold,
    Buy,
    MyLeft,
    gsh,
    ush,
    tsd,
  },
}
</script>

<style lang="less">
*{
  list-style-type: none;
  margin: 0px;
  padding: 0px;
}
</style>