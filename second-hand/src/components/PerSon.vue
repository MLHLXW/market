<template>
<div class="box">
    <h4>个人主页</h4>
    <div class="box1">
        <div>
            <div class="left">
                <img src="../assets/蟹黄堡.jpeg">
                <h2>诚信分：{{List.integrity}}分</h2>
            </div>
            <div class="right">
                <h2 class="first">昵称:{{List.name}}</h2>
                <h2>手机号:{{List.phone}}</h2>
                <h2>总消费:{{List.income}}</h2>
                <h2>总收入:{{List.consumption}}</h2>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import request from '@/utils/request.js'

export default {
    data(){
        return{
            List: [],
            token: "",
        }
    },
    created(){
        this.token =  localStorage.getItem('token');
        this.person();
    },
    methods:{
        async person(){
            const {data: res} = await request.get('/user/userDetails',{
                headers: {
            	    'Content-Type': "application/json;charset=UTF-8",
             	    'Authorization': 'Bearer ' + this.token,
        	    }
            })
            //this.verificationImg = window.URL.createObjectURL(res.picture1)
            this.List=res;
            console.log(res);
        },
    }
}
</script>

<style lang="less" scoped>
.box{
    position: absolute;
    top: 88px;
    right: 0px;
    width: 1634px;
    height: 993px;
    background-color: rgba(245,245,245);
}
.box h4{
    margin-top: 20px;
    margin-left: 30px;
    margin-bottom: 10px;
}
.box1{
    position: relative;
    width:1582px;
    height: 894px;
    margin-left: 26.5px;
    padding-top: 22px;
    background-color: rgba(255,255,255);
}
.box1 h3{
    float: left;
    margin-top: 5px;
    margin-right: 35px;
    margin-left: 40px;
}
.left{
    position: absolute;
    left: 370px;
    top: 170px;
}
.left img{
    border-radius: 50%;
    height: 300px;
    width: 300px;
}
.left h2{
    position: absolute;
    top: 350px;
    left: 70px;
}
.right{
    position: absolute;
    left: 840px;
    top: 170px;
}
.right h2{
    margin-bottom: 20px;
}
.first{
    margin-top: 50px;
}
</style>