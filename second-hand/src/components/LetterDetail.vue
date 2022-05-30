<template>
<div class="box">
    <h4>我的私信</h4>
    <div class="box1">
        <div class="s1">
            <p>{{List.content}}</p>
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
        }
    },
    created(){
        this.token =  localStorage.getItem('token');
        console.log(this.$route.query.num);
        this.letterDetail(this.$route.query.num);
    },
    methods:{
        async letterDetail(myNumber){
            const {data: res} = await request.get('/user/letter/detail',{
                headers: {
            	    'Content-Type': "application/json;charset=UTF-8",
             	    'Authorization': 'Bearer ' + this.token,
        	    },
                params:{
                    number: myNumber,
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
    top: 200px;
    left: 380px;
    width: 800px;
    height: 400px;
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
p{
    position: absolute;
    display: inline-block;
    font-weight: bold;
    top: 160px;
    left: 120px;
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