<template>
    <div class="box">
        <div class="photo">
            <img src="../assets/注册.png" alt="">
        </div>
        <div class="load">
            <img src="../assets/logo.png" alt="">
            <input placeholder="请输入邮箱地址" v-model="input1" class="MyInput1">
            <input placeholder="请输入密码" v-model="input2" class="MyInput2">
            <input placeholder="请输入验证码" v-model="input3" class="MyInput3">
            <input placeholder="请输入您的用户名" v-model="input4" class="MyInput4">
            <el-button round class="MyButton1" @click="logon">注册</el-button>
            <el-button round class="MyButton2" @click="email">发送验证码</el-button>
        </div>
    </div>
</template>

<script>
import request from '@/utils/request.js'

export default {
    data(){
        return{
            input1: '',
            input2: '',
            input3: '',
            input4: '',
            right: '',
        }
    },

    methods:{
        async logon(){
            if(this.input3 == this.right){
                const {data: res} = await request.get('/logon',{
                params:{
                    phone: this.input1,
                    name: this.input4,
                    password: this.input2,
                    //username: this.input4,
                }
                })
                if(res.msg == false){
                    alert("注册失败！用户名或邮箱已注册.");
                }
                else if(res.msg == true){
                    this.$router.push('/Yload');
                }
                console.log(res.msg);
            }
            else alert("验证码错误，请重新输入");
        },

        async email(){
            const {data: res} = await request.get('/emailVF',{
                params:{
                    email: this.input1,
                }
            })
            this.right = res.emailInfo;
            console.log(this.right);
            alert("验证码已发送.");
        }
    }
}


</script>

<style lang="less" scoped>
.box{
    position: relative;
    height: 941px;
    background-color: rgba(116,223,178);
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
    height: 700px;
    width: 585px;
    border-radius: 20px;
    background-color: white;
}
.load img{
    position: absolute;
    height: 60px;
    top: 55px;
    left: 250px;
}

input{
    position: absolute;
    border-radius: 20px;  /*设置圆角半径*/
    padding-left: 45px;              /*设置内边距防止遮盖住图片*/
    height: 60px;             /*input高度*/
    background-size:25px 25px;    /*这里是图片的大小*/
    background-repeat:no-repeat ;  /*让图片不重复*/
    background-position: 10px 15px; /*图片在input中的位置  离左边的距离和离上边的距离*/
    border: 1px solid rgba(203, 197, 197, 0.921);
}

.MyInput1{
    left: 70px;
    top: 170px;
    width: 400px;                  /*input宽度*/
    background-image: url("../assets/输入1.png") ;/*设置图片的地址*/
}
.MyInput2{
    left: 70px;
    top: 500px;
    width: 400px;                  /*input宽度*/
    background-image: url("../assets/输入2.png") ;/*设置图片的地址*/
}
.MyInput3{
    left: 70px;
    top: 280px;
    width: 220px;
}
.MyInput4{
    left: 70px;
    top: 390px;
    width: 400px;
}
input:focus{
    outline: none;
}
.MyButton1{
    position: absolute;
    top: 610px;
    left: 200px;
    width: 180px;
    height: 60px;
    color: white;
    background-color: rgba(116,223,178);
    border: 1px solid rgba(203, 197, 197, 0.921);
}
.MyButton2{
    position: absolute;
    top: 280px;
    left: 340px;
    width: 170px;
    height: 60px;
    color: white;
    background-color: rgba(116,223,178);
    border: 1px solid rgba(203, 197, 197, 0.921);
}
</style>