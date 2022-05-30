<template>
<div class="box">
    <h4>我出售的 > 卖出物品记录</h4>
    <div class="box1">
        <div>
            <el-button type="primary" plain class="myButton1" @click="whyNo">全选</el-button>
            <el-button type="primary" class="myButton2" @click="pass">通过</el-button>
            <el-button type="danger" class="myButton2" @click="unpass">不通过</el-button></el-button>
        </div>
        <div class="the-head">
            <h3 style="margin-left: 82px;">图片</h3>
            <h3 style="margin-left: 175px;">商品名称</h3>
            <h3 style="margin-left: 320px;">商品价格</h3>
            <h3 style="margin-left: 120px;">上架时间</h3>
            <h3 style="margin-left: 235px;">操作</h3>
        </div>
        <div>
            <ul class="MyUl">
                <li  v-for="(item,index) in List" :key="index" v-if="index>pageShang&&index<pageXia">
                     <input type="checkbox" class="tui-checkbox"  v-model="item.sign">
                     <img :src="'data:image/jpg;base64,'+item.picture1">
                     <p style="left: 325px;">{{item.name}}</p>
                     <p style="left: 770px;">{{item.price}}元</p>
                     <p style="left: 950px;">{{item.time}}</p>
                     <p style=";"></p>
                     <p style=";"></p>
                     <router-link :to="'/admin/gGoods?id='+item.id" class="ast">查看</router-link>
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
import Qs from 'qs'

export default {
    data(){
    return {
        options: [{
          value: '选项1',
          label: '审核中'
        }, {
          value: '2',
          label: '挂起'
        }, {
          value: '3',
          label: '正在出售'
        }, {
          value: '4',
          label: '售出'
        }, {
          value: '5',
          label: '全部'
        }],
        value: '',
        input: '',
        All_limit: 0,  //总商品数
        pageOn: 1, //当前页数
        List: [],
        pList: [],
        sList: [],
        token: '',
      }
    },

    created(){
        this.token =  localStorage.getItem('token');
        this.goodsList();
    },

    methods:{
         async goodsList(){
            const {data: res} = await request.get('/admin/commodity',{
                headers: {
            	    'Content-Type': "application/json;charset=UTF-8",
             	    'Authorization': 'Bearer ' + this.token,
        	    }
            })
            //this.verificationImg = window.URL.createObjectURL(res.picture1)
            this.List=res;
            this.All_limit=res.length;
            console.log(res);
        },
        async pass(){
            for(var i = 0; i < this.List.length; i++){
                if(this.List[i].sign)this.pList.push(this.List[i].id);
            }
            var temp = JSON.stringify(this.pList+'') //{ indices: false });
            console.log(temp);
            const {data: res} = await request.get('/admin/commodity/pass',{
                params: {
                    arr: temp,
                },
                headers: {
            	    'Content-Type': "application/x-www-form-urlencoded",
             	    'Authorization': 'Bearer ' + this.token,
        	    }
            })
            this.goodsList();
        },
        async unpass(){
            for(var i = 0; i < this.List.length; i++){
                if(this.List[i].sign)this.sList.push(this.List[i].id);
            }
            var temp = JSON.stringify(this.sList+'') //{ indices: false });
            console.log(temp);
            const {data: res} = await request.get('/admin/commodity/fail',{
                params: {
                    arr: temp,
                },
                headers: {
            	    'Content-Type': "application/x-www-form-urlencoded",
             	    'Authorization': 'Bearer ' + this.token,
        	    }
            })
            this.goodsList();
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
        whyNo(){
            this.List.forEach(item=>(item.sign = true));
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
    width: 100px;
    margin-left: 0px;
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
    left: 1332px;
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

.tui-checkbox:checked {
	background: rgba(116,223,178);
}
//设置复选框样式
.tui-checkbox {
	width:25px;
	height:25px;
    left: -15px;
    bottom: 25px;
    zoom: 150%;
	background-color:#ffffff;
	border:solid 1px #dddddd;
	-webkit-border-radius:50%;
	border-radius:50%;
	font-size:0.8rem;
	margin:0;
	padding:0;
	position:absolute;
	display:inline-block;
	vertical-align:top;
	cursor:default;
	-webkit-appearance:none;
	-webkit-user-select:none;
	user-select:none;
	-webkit-transition:background-color ease 0.1s;
	transition:background-color ease 0.1s;
}
//设置伪类，即显现的对勾样式
.tui-checkbox:checked::after {
	content:'';
	top:5px;
	left:5px;
	position:absolute;
	background:transparent;
	border:#fff solid 2px;
	border-top:none;
	border-right:none;
	height:6px;
	width:10px;
	-moz-transform:rotate(-45deg);
	-ms-transform:rotate(-45deg);
	-webkit-transform:rotate(-45deg);
	transform:rotate(-45deg);
}
</style>