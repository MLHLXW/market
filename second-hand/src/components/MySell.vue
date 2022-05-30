<template>
<div class="box">
    <h4>我出售的</h4>
    <div class="box1">
        <div>
            <el-select class="MySelect" v-model="value" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-button type="primary" plain class="myButton1" @click='goto'>添加商品</el-button>
            <el-button type="primary" class="myButton2" @click="search">搜索</el-button>
            <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input" class="myInput"></el-input>
        </div>
        <div class="the-head">
            <h3 style="margin-left: 82px;">图片</h3>
            <h3 style="margin-left: 175px;">商品名称</h3>
            <h3 style="margin-left: 340px;">价格</h3>
            <h3 style="margin-left: 70px;">状态</h3>
            <h3 style="margin-left: 60px;">查看</h3>
            <h3 style="margin-left: 60px;">编辑</h3>
            <h3 style="margin-left: 60px;">更改状态</h3>
        </div>
        <div>
            <ul class="MyUl">
                <li  v-for="(item,index) in List" :key="index" v-if="index>pageShang&&index<pageXia" v-show="ifStatus(item.status)">
                     <img :src="'data:image/jpg;base64,'+item.picture1">
                     <p style="left: 325px;">{{item.name}}</p>
                     <p style="left: 770px;">{{item.price}}元</p>
                     <router-link :to="'/user/DeGoods?id='+item.id" v-show="item.status == '正在出售'" class="ast1">查看</router-link>
                     <router-link :to="'/user/Csxq?id='+item.id" v-show="item.status == '正在出售'" class="ast2">编辑商品</router-link>
                     <el-button type="info" plain disabled class="hos2" v-show="item.status == '售出'">售出</el-button>
                     <el-button type="primary" plain disabled class="hos" v-show="item.status == '正在出售'" >正在出售</el-button>
                     <el-button type="danger" plain disabled class="hos" v-show="item.status == '审核中'">审核中</el-button>
                     <el-button type="success" plain disabled class="hos1" v-show="item.status == '挂起'">挂起</el-button>
                     <el-button type="danger" disabled class="hos" v-show="item.status == '审核未通过'">审核未通过</el-button>
                     <a  class="ast" v-show="item.status != '审核中'&& item.status != '审核未通过' " @click="getId(item.id,item.status)">更改状态</a>
                </li>
            </ul>
        </div>
        <div class="footer">
            <ul>
                <li @click="prePage"><a><</a></li>
                <li v-for="item in pages" :class="pageOn == item ? 'selected':''" @click="curPage(item)">
                    <a>{{item}}</a>
                </li>
                <li @click="nextPage"><a>></a></li>
            </ul>
        </div>

        <div class="MGQ" v-show="s1">
            <h3 style="position: absolute; left: 180px;">提示</h3>
            <p class="tsc">您的商品已被挂起，请确认交易是否成功进行,若没有完成交易，请点击“正在出售”；若已完成交易，请点击“售出”</p>
            <el-button type="primary" style="position: absolute; left: 60px; top: 200px; width: 100px;" @click="toSell">正在出售</el-button>
            <el-button type="primary" style="position: absolute; left: 180px; top: 200px; width: 100px;" @click="toSold">售出</el-button>
            <el-button type="info" style="position: absolute; left: 310px; top: 200px; width: 100px;" @click="clse1">取消</el-button>
        </div>  

        <div class="MGQ" v-show="s2">
            <h3 style="position: absolute; left: 180px;">提示</h3>
            <p class="tsc">请确认该商品状态，若重新上架商品，则点击“正在出售”，您的商品将重新进行审核</p>
            <el-button type="primary" style="position: absolute; left: 60px; top: 200px; width: 100px;"@click="toSelling">正在出售</el-button>
            <el-button type="info" style="position: absolute; left: 310px; top: 200px; width: 100px;"@click="clse2">取消</el-button>
        </div>

        <div class="MGQ" v-show="s3">
            <h3 style="position: absolute; left: 180px;">提示</h3>
            <p class="tsc">请确认交易是否成功进行,若已完成交易，请点击“售出”</p>
            <el-button type="primary" style="position: absolute; left: 60px; top: 200px; width: 100px;"@click="toTrade">售出</el-button>
            <el-button type="info" style="position: absolute; left: 310px; top: 200px; width: 100px;"@click="clse3">取消</el-button>
        </div>
    </div>
</div>
</template>

<script>
import request from '@/utils/request.js'

export default {
    data(){
    return {
        options: [{
          value: '审核中',
          label: '审核中'
        }, {
          value: '挂起',
          label: '挂起'
        }, {
          value: '正在出售',
          label: '正在出售'
        }, {
          value: '售出',
          label: '售出'
        }, {
          value: '全部',
          label: '全部'
        }],
        value: '全部',
        input: '',
        All_limit: 6,  //总商品数
        pageOn: 1, //当前页数
        token: "",
        List: [],
        gid: 0,
        s1: false,
        s2: false,
        s3: false,
      }
    },

    created(){
        this.token =  localStorage.getItem('token');
        this.goodsList();
    },

    methods:{
        async goodsList(){
            const {data: res} = await request.get('/user/commodity',{
                headers:{
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + this.token,
                }
            })
            this.List = res;
            console.log(res);
        },
        async search(){
            const {data: res} = await request.get('/user/selectByName',{
                params: {
                   name: this.input,
                },
                headers:{
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + this.token,
                }
            })
            this.List = res;
            this.All_limit=res.length;
            console.log(res);
        },
        async toSelling(){
            const {data: res} = await request.get('/user/soldToSelling',{
                params: {
                   id: this.gid,
                },
                headers:{
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + this.token,
                }
            })
            console.log(this.gid);
            alert("已修改");
            this.s1 = false;
            this.s2 = false;
            this.s3 = false;
            this.goodsList();
        },
        async toTrade(){
            const {data: res} = await request.get('/user/addTrade',{
                params: {
                   id: this.gid,
                },
                headers:{
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + this.token,
                }
            })
            console.log(this.gid);
            alert("已修改");
            this.s1 = false;
            this.s2 = false;
            this.s3 = false;
            this.goodsList();
        },
        async toSold(){
            const {data: res} = await request.get('/user/hungToSold',{
                params: {
                   id: this.gid,
                },
                headers:{
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + this.token,
                }
            })
            console.log(this.gid);
            alert("已修改");
            this.s1 = false;
            this.s2 = false;
            this.s3 = false;
            this.goodsList();
        },
        async toSell(){
            const {data: res} = await request.get('/user/hungToSell',{
                params: {
                   id: this.gid,
                },
                headers:{
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + this.token,
                }
            })
            console.log(this.gid);
            alert("已修改");
            this.s1 = false;
            this.s2 = false;
            this.s3 = false;
            this.goodsList();
        },
        getId(ID,status){
            this.gid = ID;
            if(status == "挂起")this.s1 = true;
            else if(status == "正在出售")this.s3 = true;
            else if(status == "售出")this.s2 = true;
        },
        clse1(){
            this.s1 = false;
        },
        clse2(){
            this.s2 = false;
        },
        clse3(){
            this.s3 = false;
        },
        curPage(item){
            this.pageOn = item;
            //this.goodsList(this.pageOn);
        },
        prePage(){
            if(this.pageOn > 1){
                this.pageOn--;
                //this.goodsList(this.pageOn);
            }
        },
        nextPage(){
            if(this.pageOn < this.pageTotal){
                this.pageOn++;
                //this.goodsList(this.pageOn);
            }
        },
        goto(){
            this.$router.push("/user/Tianjia");
        },
        ifStatus(ss){
            if(ss == this.value || this.value == "全部")return true;
            else return false;
        },
       guaQi(){

       }
    },

     computed:{
        pages(){
            if(this.pageTotal <= 7)return this.pageTotal;
            if(this.pageOn <= 5)return[1,2,3,4,5,'...',this.pageTotal];
            else if(this.pageOn >= this.pageOn - 4)return[1,'...',this.pageTotal-4,this.pageTotal-3,this.pageTotal-2,this.pageTotal-1,this.pageTotal];
            else return[1,'...',this.pageOn-1,this.pageOn,this.pageOn+1,'...',this.pageTotal]
        },
        pageShang(){
            return (this.pageOn-1)*5-1;
        },
        pageXia(){
            return this.pageOn*5;
        },
        pageTotal(){
            if(this.All_limit % 5 == 0)return(this.All_limit/5);
            else return (Math.floor(this.All_limit/5)+1);
        }
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
.myButton1{
    float: left;
    margin-left: 38px;
    width: 98px;
}
.myButton2{
    float: right;
    width: 65px;
    margin-left: 40px;
    margin-right: 40px;
}
.myInput{
    float: right;
    width: 236px;
    height: 39px;
}
.MySelect{
    float: left;
    width: 120px;
    margin-left: 50px;
}
.the-head{
    margin-left: 45px;
    margin-top: 90px;
    height: 65px;
    width: 1480px;
    background-color: rgba(242,242,242);
}
.the-head h3{
    margin-top: 18px;
}

.MyUl li{
    height: 122px;
    border-bottom: solid 1px black;
    margin-left: 50px;
    width: 1480px;
    position: relative;
}
.MyUl li img{
    margin-top: 18px;
    margin-left: 40px;
    width: 105px;
    height: 85px;
}
.MyUl li p{
    display: inline-block;
    position: absolute;
    top: 47px;
}
.ast{
    position: absolute;
    left: 1320px;
    top: 47px;
    color: rgb(86, 213, 245);
}
.hos{
    width: 100px;
    position: absolute;
    left: 870px;
    top: 40px;
}
.ast1{
    position: absolute;
    left: 1052px;
    top: 47px;
    color: rgb(33, 219, 33);
}
.ast2{
    position: absolute;
    left: 1172px;
    top: 47px;
    color: rgb(33, 219, 33);
}
.hos1{
    width: 100px;
    position: absolute;
    left: 870px;
    top: 40px;
}

.hos2{
    width: 100px;
    position: absolute;
    left: 880px;
    top: 40px;
}
.footer{
    position: absolute;
    bottom: 50px;
    padding-left: 1040px;
}
.footer{
    float: left;
}
.footer ul li{
    float: left;
    margin-left: 17px;
    width: 26px;
    height: 42px;
    font-size: 20px;
    line-height: 42px;
    border: none;
    padding-left: 16px;
    background-color: rgba(245,245,245);
}

.footer ul li:hover{
    background-color: rgba(64, 158, 255);
}

.el-select-dropdown__item.selected {
    /* color: #409EFF; */
    font-weight: 700;
}
.MGQ{
    position: absolute;
    left: 550px;
    top: 300px;
    width: 500px;
    height: 250px;
    background-color: rgb(233, 226, 226);
}
.tsc{
    position: absolute;
    display: inline-block;
    width: 400px;
    left: 50px;
    top: 50px;
}
</style>