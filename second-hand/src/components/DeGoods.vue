<template>
<div class="box">
    <h4>所有商品>商品详情</h4>
    <div class="box1">
        <div class="content1">
            <div class="XK">
                <img :src="'data:image/jpg;base64,'+List.picture1" v-show = "n == 0">
                <img :src="'data:image/jpg;base64,'+List.picture2"  v-show = "n == 1">
                <img :src="'data:image/jpg;base64,'+List.picture3" v-show = "n == 2">
            </div>
            <ul>
                <li><img :src="'data:image/jpg;base64,'+List.picture1" @mouseover="curPage0()"></li>
                <li><img :src="'data:image/jpg;base64,'+List.picture2"  @mouseover="curPage1()"></li>
                <li><img :src="'data:image/jpg;base64,'+List.picture3"  @mouseover="curPage2()"></li>
            </ul>
            <h1>卖家说明</h1>
            <h2>
                {{List.introduction}}
            </h2>
        </div>
        <div class="content2">
            <h1>{{List.name}}</h1>
            <p class="Z1">上架时间：{{List.time}}</p>
            <h2 class="price">${{List.price}}</h2>
            <h1 class="Z2">卖家：</h1>
            <h1 class="Z3">{{List.seller}}</h1>
            <div>
                <h2 class="Z4">联系方式:</h2>
                <h4 class="Z4">{{List.contact}}</h4>
            </div>
            <div>
                <el-button type="danger" class="myButton1" @click="guaQi">购买</el-button>
                <el-button type="success" class="myButton1" @click='likes()' v-show="!isIt">收藏</el-button>
                <el-button type="info" plain class="myButton1" @click='unlikes()' v-show="isIt">已收藏</el-button>
            </div>
            <div class="textK">
                <h4 class="Z2">价钱不合理？图片盗取？有问题点击这里</h4>
                <el-button type="primary" class="myButton2" @click="ts">投诉</el-button>
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
            input: "",
            limit: 3, 
            List: [],
            n: 0,
            token: "",
            isIt: false,
            ID: this.$route.query.id,
        }
    },
    created(){
        this.token =  localStorage.getItem('token');
        console.log(this.token);
        this.detail(this.$route.query.id);
        this.isNo();
    },
    methods:{
        async detail(ID){
            const {data: res} = await request.get('/commodityDetail',{
                params:{
                    id: ID,
                }
            })
            this.List = res;
        },

        async likes(){
            const {data: res} = await request.get('/user/addFavorite',{
                params: {
                    id: this.ID,
                },
                headers: {
                    'Content-Type': "application/json;charset=UTF-8",
             	    'Authorization': 'Bearer ' + this.token,
        	    }
            })
            this.isIt = !this.isIt;
        },

        async guaQi(){
            const {data: res} = await request.get('/user/addHungTrade',{
                params: {
                    id: this.ID,
                },
                headers: {
                    'Content-Type': "application/json;charset=UTF-8",
             	    'Authorization': 'Bearer ' + this.token,
        	    }
            })
            alert("商品已挂起，请尽快联系商家进行购买协商!");
        },
        
        async unlikes(){
            const {data: res} = await request.get('/user/cancelF',{
                params: {
                    id: this.ID,
                },
                headers: {
                    'Content-Type': "application/json;charset=UTF-8",
             	    'Authorization': 'Bearer ' + this.token,
        	    }
            })
            this.isIt = !this.isIt;
        },

        async myts(){
            const {data: res} = await request.get('/user/addComplaint',{
                params: {
                    id: this.ID,
                    content: this.input,
                },
                headers: {
                    'Content-Type': "application/json;charset=UTF-8",
             	    'Authorization': 'Bearer ' + this.token,
        	    }
            })
        },

        async isNo(){
            const {data: res} = await request.get('/user/isFavorite',{
                params: {
                    id: this.ID,
                },
                headers: {
                    'Content-Type': "application/json;charset=UTF-8",
             	    'Authorization': 'Bearer ' + this.token,
        	    }
            })
            this.isIt = res.isFavorite;
        },
        
        ts(){
            this.input = window.prompt("请输入您的投诉内容如：图片问题，价格问题","请在此输入");
            this.myts();
        },

        curPage0(){
            this.n = 0;
        },
        curPage1(){
            this.n = 1;
        },
        curPage2(){
            this.n = 2;
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

.myButton1{
    float: left;
    margin-left: 38px;
    width: 98px;
}
.myButton2{
    float: right;
    width: 80px;
    margin-left: 10px;
}
.content1{
    position: absolute;
    left: 218px;
    top: 70px;
    width: 520px;
    height: 800px;
}
.content2{
    position: absolute;
    right: 200px;
    top: 120px;
    width: 520px;
    height: 800px;
}
.XK img{
    width: 520px;
    height: 360px;
}
.content1 ul{
    float: left;
}
.content1 ul li{
    float: left;
    padding-left: 26px;
}
.content1 ul li img{
    width: 100px;
    height: 50px;
    margin-left: 20px;
    margin-right: 20px;
}
.content1 h1{
    margin-top: 100px;
    margin-bottom: 60px;
} 
.price{
    color: red;
    margin-bottom: 30px;
}
.Z1{
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 20px;
}
.Z2{
    display: inline;
}
.Z3{
    display: inline;
    color: rgb(233, 39, 233);
}
.Z4{
    display: inline-block;
    margin-top: 20px;
    margin-bottom: 120px;
}
.textK{
    margin-top: 150px;
}
</style>