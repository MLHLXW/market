<template>
<div class="box">
    <h4>我的私信</h4>
    <div class="box1">
        <div>
            <ul class="s1">
                <li><h2>我的私信</h2></li>
                <li v-for="(item,index) in List">
                    <img src="../assets/黑信封.png" class="mt">
                    <div class="Mi4" v-show = !item.read></div>
                    <p>{{item.content}}</p>
                    <router-link :to="'/user/LetterDetail?num='+item.number" class="ml">点击查看详情...</router-link>
                </li>
            </ul>
        </div>
    </div>
</div>
</template>

<script>
import request from '@/utils/request.js'

export default {
    data(){
        return{
            n1: true,
            List: [],
            token: "",
        }
    },
    created(){
        this.token =  localStorage.getItem('token');
        this.letter();
    },
    methods:{
        async letter(){
            const {data: res} = await request.get('/user/letter',{
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
    background-color: rgba(235,235,235);
}
.box1 h3{
    float: left;
    margin-top: 5px;
    margin-right: 35px;
    margin-left: 40px;
}
.s1{
    position: absolute;
    top: 40px;
    right: 500px;
    width: 700px;
    height:800px;
    overflow-y:scroll;
    background-color: white;
}

.s1 li{
    position: relative;
    margin-left: 40px;
    margin-right: 40px;
    height: 150px;
    line-height: 150px;
    color: black;
    border-bottom: 1px solid rgba(215,215,215);
}
.s1 li h2{
    line-height: 150px;
    margin-left: 250px;
}
.mt{
    width: 60px;
    margin: 40px 70px 40px 20px;
}
a{
    color: black;
    text-decoration: none;
    font-weight: bold;
    top: -5px;
}
p{
    width: 300px;
    position: absolute;
    display: inline-block;
    font-weight: bold;
    top: -5px;
    white-space:nowrap;/*强制在同一行内显示所有文本，直到文本结束或者遭遇br标签对象才换行。*/
    overflow: hidden;/*超出部分隐藏*/
    text-overflow: ellipsis;/*隐藏部分以省略号代替*/
}
.ml{
    position: absolute;
    top: 0px;
    right: 2px;
}
.Mi4{
    position: absolute;
    top: 43px;
    left: 75px;
    display: inline-block;
    border-radius: 50%;
    width: 10px;
    height: 10px;
    background-color: red;
}
</style>