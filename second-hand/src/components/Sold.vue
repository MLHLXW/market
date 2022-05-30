<template>
<div class="box">
    <h4>我出售的 > 卖出物品记录</h4>
    <div class="box1">
        <div>
            <h1>总收入：{{sum_math}}元</h1>
            <el-button type="primary" class="myButton2">搜索</el-button>
            <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input" class="myInput"></el-input>
        </div>
        <div class="the-head">
            <h3 style="margin-left: 82px;">图片</h3>
            <h3 style="margin-left: 175px;">商品名称</h3>
            <h3 style="margin-left: 320px;">商品价格</h3>
            <h3 style="margin-left: 90px;">交易时间</h3>
            <h3 style="margin-left: 235px;">操作</h3>
        </div>
        <div>
            <ul class="MyUl">
                <li  v-for="(item,index) in List" :key="index" v-if="index>pageShang&&index<pageXia">
                     <img :src="'data:image/jpg;base64,'+item.picture1">
                     <p style="left: 325px;">{{item.name}}</p>
                     <p style="left: 770px;">{{item.price}}元</p>
                     <p style="left: 920px;">{{item.trade_time}}</p>
                     <p style=";"></p>
                     <p style=";"></p>
                     <router-link :to="'/user/GoodSold?id='+item.id" class="ast">查看</router-link>
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
    </div>
</div>
</template>

<script>
import request from '@/utils/request.js'

export default {
    data(){
    return {
        input: '',
        All_limit: 6,  //总商品数
        pageOn: 1, //当前页数
        List: [],
        token: '',
        sum_math: 0,
      }
    },

    created(){
        this.token =  localStorage.getItem('token');
        this.goodsList();
        this.getIn();
    },

    methods:{
         async goodsList(){
            const {data: res} = await request.get('/user/soldCommodity',{
                headers:{
                    'Content-Type': "application/json;charset=UTF-8",
             	    'Authorization': 'Bearer ' + this.token,
                }
            })
            this.List=res;
            this.All_limit=res.length;
            console.log(res);
        },
        async getIn(){
            const {data: res} = await request.get('/user/getIncome',{
                headers:{
                    'Content-Type': "application/json;charset=UTF-8",
             	    'Authorization': 'Bearer ' + this.token,
                }
            })
            this.sum_math=res.income;
            console.log(res);
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
h1{
    position: absolute;
    top: 70px;
    left: 80px;
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
    left: 1302px;
    top: 47px;
    color: rgb(33, 219, 33);
}
.hos{
    position: absolute;
    left: 940px;
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
.selected{
    background-color: rgba(64, 158, 255) !important;
}

.footer ul li:hover{
    background-color: rgba(64, 158, 255);
}
</style>