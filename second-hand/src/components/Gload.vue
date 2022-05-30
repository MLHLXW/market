<template>
    <div class="box">
        <div class="photo">
            <img src="../assets/管理员登陆.png" alt="">
        </div>
        <div class="load">
            <img src="../assets/logo.png" alt="">
            <input placeholder="请输入管理员账号" v-model="input1" class="MyInput1">
            <input type="password" placeholder="请输入密码" v-model="input2" class="MyInput2">
            <el-button round class="MyButton" @click="login">登录</el-button>
        </div>
    </div>
</template>

<script>
import request from '@/utils/request.js'
import Qs from 'qs'

export default {
    data(){
        return{
            input1: '',
            input2: '',
        }
    },
    methods:{
        async login(){
            var temp = Qs.stringify({"username": 'admin'+this.input1, "password": this.input2,})
            const {data: res} = await request.post('/logging',temp,
            {headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            })
            if(res != false){
                localStorage.setItem("token", res.jwttoken);
                this.$router.push('/admin/gRight');
            }
            else{
                alert("登录失败！请检查输入的手机号码与密码是否正确.");
            }
            console.log(res.jwttoken);
        },
    }
}
</script>

<style lang="less" scoped>
.box{
    position: relative;
}
.photo{
    position: absolute;
    top: 50px;
    left: 150px;
}
.photo img{
    height: 830px;
}
.load{
    position: absolute;
    top: 140px;
    right: 300px;
    height: 600px;
    width: 585px;
    border-radius: 20px;
    background-color: rgba(116,223,178);
}
.load img{
    position: absolute;
    height: 60px;
    top: 75px;
    left: 250px;
}
.MyInput1{
    position: absolute;
    left: 70px;
    top: 190px;
    border-radius: 20px;  /*设置圆角半径*/
    padding-left: 45px;              /*设置内边距防止遮盖住图片*/
    height: 60px;             /*input高度*/
    width: 400px;                  /*input宽度*/
    background-image: url("../assets/输入1.png") ;/*设置图片的地址*/
    background-size:25px 25px;    /*这里是图片的大小*/
    background-repeat:no-repeat ;  /*让图片不重复*/
    background-position: 10px 15px; /*图片在input中的位置  离左边的距离和离上边的距离*/
    border: none;
}
.MyInput2{
    position: absolute;
    left: 70px;
    top: 300px;
    border-radius: 20px;  /*设置圆角半径*/
    padding-left: 45px;              /*设置内边距防止遮盖住图片*/
    height: 60px;             /*input高度*/
    width: 400px;                  /*input宽度*/
    background-image: url("../assets/输入2.png") ;/*设置图片的地址*/
    background-size:25px 25px;    /*这里是图片的大小*/
    background-repeat:no-repeat ;  /*让图片不重复*/
    background-position: 10px 15px; /*图片在input中的位置  离左边的距离和离上边的距离*/
    border: none;
}
input:focus{
    outline: none;
}
.MyButton{
    position: absolute;
    top: 410px;
    left: 200px;
    width: 180px;
    height: 60px;
}
</style>