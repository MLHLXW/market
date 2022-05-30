<template>
<div>
    <gHead></gHead>
    <gLeft></gLeft>
    <router-view></router-view>
</div>
</template>

<script>
import gHead from './gHead.vue'
import gLeft from './gLeft.vue'
/*import MyRight1 from './MyRight1.vue'
import MyLikes from './MyLikes.vue'
import Gload from './Gload.vue'
import Yload from './Yload.vue'
import Yzhuce from './Yzhuce.vue'
import DeGoods from './DeGoods.vue'
import PerSon from './PerSon.vue'
import Csxq from './Csxq.vue'
import MySell from './MySell.vue'*/

export default {
    components:{
        gHead,
        gLeft,
    }
}
</script>

<style lang="less" scoped>
</style>