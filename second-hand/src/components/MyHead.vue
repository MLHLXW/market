<template>
    <div class="header">
        <img src="" alt="" class="Mi1">
        <h3></h3>
        <router-link to="/Yload"><img src="../assets/退出.png" class="Mi2"></router-link>
        <router-link to="/user/PerSon"><img src="../assets/头像 男孩.png" class="Mi2"></router-link>
        <div class="Mi3">
            <router-link to="/user/Letter"><img src="../assets/信封.png" class="Mi2"  @click="sws"></router-link>
            <div class="Mi4" v-show = "!n1"></div>
        </div>
    </div>
</template>

<script>
import request from '@/utils/request.js'
import bus from './eventBus.js'

export default {
    data(){
        return{
            n1: true,
        }
    },
    created(){
        this.token =  localStorage.getItem('token');
        this.goodsList();
    },
    methods:{
        async goodsList(){
            const {data: res} = await request.get('/user/getIsRead',{
                headers:{
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + this.token,
                }
            })
            this.n1 = res.isRead;
            console.log(this.n1);
        },
        sws(){
            console.log(this.n1);
            this.n1 = true;
            console.log(this.n1);
        }
    }
}
</script>



<style lang="less" scoped>
.header{
    height: 88px;
    width: 1899px;
    border: none;
    background-color: rgba(84,92,100);
}
h3{
    float: left;
    margin-top: 10px;
    color: white;
}
.Mi1{
    float: left;
    height: 50px;
}
.Mi2{
    float: right;
    width: 40px;
    margin: 20px 40px 0px 0px;
}
.Mi3{
    position: relative;
    top: 2px;
    float: right;
    width: 40px;
}
.Mi4{
    position: absolute;
    top: 20px;
    right: 36px;
    display: inline-block;
    border-radius: 50%;
    width: 10px;
    height: 10px;
    background-color: red;
}
</style>