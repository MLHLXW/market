<template>
    <div class="box">
        <div class="photo">
            <img src="../assets/用户登陆.png" alt="">
        </div>
        <div class="load">
            <img src="../assets/logo.png" alt="">
            <input placeholder="请输入邮箱号" v-model="input1" class="MyInput1">
            <input type="password" placeholder="请输入密码" v-model="input2" class="MyInput2">
            <el-button round class="MyButton" @click='login'>登录</el-button>
            <a href="#/Yzhuce" class="Ma1">还没注册？去注册</a>
            <a href="#/Gload" class="Ma2">我是管理员</a>
        </div>
    </div>
</template>

<script>
import request from '@/utils/request.js'
import Qs from 'qs'
import bus from './eventBus.js'

export default {
    data(){
        return{
            input1: '',
            input2: '',
            read: false,//判断是否有私信，已读则为true
        }
    },
     methods:{
        async login(){
            var temp = Qs.stringify({"username": 'user'+this.input1, "password": this.input2,})
            const {data: res} = await request.post('/logging',temp,
            {headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            })
            if(res != false){
                if(res.isBan){
                    alert("您已被封禁！");
                }
                else{
                    localStorage.setItem("token", res.jwttoken);
                    this.$router.push('/user/MyRight1');
                }
            }
            else{
                alert("登录失败！请检查输入的手机号码与密码是否正确.");
            }
            console.log(res.jwttoken);
            //this.read = res.isRead;
            bus.$emit('share',this.read);
            console.log(this.read);
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
a{
    text-decoration: none;
    font-size: 20px;
}
.Ma1{
    position:absolute;
    left: 210px;
    top: 510px;
    color: white;
}
.Ma2{
    position:absolute;
    left: 240px;
    top: 640px;
    color: rgba(116,223,178);
}
</style>