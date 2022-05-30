<template>
<div class="box">
    <h4>我出售的 > 编辑商品</h4>
    <div class="box1">
        <div class="left">
            <div>
                <h4>商品名称:</h4>
                <el-input class="myInput" v-model="input1" placeholder="请输入内容"></el-input>
            </div>
                <h4>商品价格:</h4>
                <el-input class="myInput" v-model="input2" placeholder="请输入内容"></el-input>
            <div class="LX">
                <h4>联系方式:</h4>
               <el-input class="myText" type="textarea" :rows="8" placeholder="请输入内容" v-model="textarea1"></el-input>

            </div>
            <div class="LX">
                <h4>商品说明:</h4>
                <el-input class="myText" type="textarea" :rows="7" placeholder="请输入内容" v-model="textarea2"></el-input>
            </div>
        </div>
        <div class="right">
            <div class="D1">
                <el-upload
                    class="avatar-uploader1"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess1"
                    :before-upload="beforeAvatarUpload1">
                    <img v-if="imageUrl1" :src="imageUrl1" class="avatar1">
                    <i v-else class="el-icon-plus avatar-uploader-icon1"></i>
                </el-upload>
            </div>
            <div class="D2">
                <el-upload
                    class="avatar-uploader2"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess2"
                    :before-upload="beforeAvatarUpload2">
                    <img v-if="imageUrl2" :src="imageUrl2" class="avatar2">
                    <i v-else class="el-icon-plus avatar-uploader-icon2"></i>
                </el-upload>
            </div>
            <div class="D3">
                <el-upload
                    class="avatar-uploader2"
                    action= "https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess3"
                    :before-upload="beforeAvatarUpload3">
                    <img v-if="imageUrl3" :src="imageUrl3" class="avatar2">
                    <i v-else class="el-icon-plus avatar-uploader-icon2"></i>
                </el-upload>
            </div>
            <div>
                <el-input class="D4" v-model="input" placeholder="请输入内容"></el-input>
                <el-button type="primary">点击上传</el-button>
            </div>
        </div>
        <div class="bottom">
            <el-button class="mbt" type="primary"  @click="Upload()">确认修改</el-button>
            <el-button class="mbt" type="info">取消</el-button>
            <p class="warn">商品编辑后需要经管理员审核方可进入市场流通！</p>
        </div>
    </div>
</div>
</template>

<script>
import request from '@/utils/request.js'
import { Upload } from 'element-ui';

export default {
    data(){
        return{
            input: '',
            input1: '',
            input2: '',
            textarea1: '',
            textarea2: '',
            imageUrl1: '',
            imageUrl2: '',
            imageUrl3: '',
            dataImage1: new FormData(),
            token: "",
            ID: this.$route.query.id,
        }
    },
    created(){
        this.token =  localStorage.getItem('token');
    },
    methods:{
      async Upload(){
            this.dataImage1.append("name", this.input1);
            this.dataImage1.append("price", this.input2);
            this.dataImage1.append("contact", this.textarea1);
            this.dataImage1.append("introduction", this.textarea2);
            this.dataImage1.append("id", this.ID);
            const {data: res} = await request.post('/user/updateCommodity',this.dataImage1,{
                headers: {
            	    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + this.token,
        	    }
            });
            alert("已修改！");
      },
      handleAvatarSuccess1(res,file) {
        this.imageUrl1 = URL.createObjectURL(file.raw);
        this.dataImage1.append("file1", file.raw);
      },
      beforeAvatarUpload1(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      handleAvatarSuccess2(res, file) {
        this.imageUrl2 = URL.createObjectURL(file.raw);
        this.dataImage1.append("file2", file.raw);
      },
      beforeAvatarUpload2(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      handleAvatarSuccess3(res, file) {
        this.imageUrl3 = URL.createObjectURL(file.raw);
        this.dataImage1.append("file3", file.raw);
      },
      beforeAvatarUpload3(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
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
h4{
    display: inline-block; 
}
.left{
    position: absolute;
    left: 170px;
    top: 90px;
}
.myInput{
    display: inline-block;
    width: 400px;
    height: 60px;
    margin-left: 20px;
}
.myText{
    display: inline-block;
    width: 400px;
    height: 60px;
    margin-left: 20px;
}
.LX{
    padding-top: 20px;
    height: 200px;
}
.right{
    position: absolute;
    right: 270px;
    top: 140px;
}
.D1{
    width: 450px;
    height: 250px;
    border: 1px dashed #05c1ec;
    margin-bottom: 20px; 
}
.D2{
    display: inline-block;
    width: 200px;
    height: 120px;
    border: 1px dashed #05c1ec;
    margin-right: 50px;
    margin-bottom: 40px; 
}
.D3{
    display: inline-block;
    width: 200px;
    height: 120px;
    border: 1px dashed #05c1ec;
    margin-bottom: 40px; 
}
.D4{
    display: inline-block;
    width: 200px;
    margin-left: 50px;
    margin-right: 30px;
}
.bottom{
    position: absolute;
    bottom: 80px;
    left: 40%;
}
.mbt{
    width: 90px;
    margin-right: 50px;
}
.warn{
    margin-top: 40px;
    color:rgb(62, 200, 235);
    margin-left: -57px;
}
.avatar-uploader1 .el-upload {
    border: 1px dashed #05c1ec;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
.avatar-uploader1 .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon1 {
    font-size: 28px;
    color: #8c939d;
    width: 450px;
    height: 250px;
    line-height: 250px;
    text-align: center;
}
.avatar1 {
    width: 450px;
    height: 250px;
    display: block;
}

.avatar-uploader2 .el-upload {
    border: 1px dashed #05c1ec;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
.avatar-uploader2 .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon2 {
    font-size: 28px;
    color: #8c939d;
    width: 200px;
    height: 120px;
    line-height: 120px;
    text-align: center;
}
.avatar2 {
    width: 200px;
    height: 120px;
    display: block;
}
</style>