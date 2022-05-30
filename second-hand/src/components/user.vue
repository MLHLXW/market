<template>
<div>
    <MyHead></MyHead>
    <MyLeft></MyLeft>
    <router-view></router-view>
    
</div>
</template>

<script>
import MyHead from './MyHead.vue'
import MyLeft from './MyLeft.vue'
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
        MyHead,
        MyLeft,
    }
}
</script>

<style lang="less" scoped>
</style>