<template>
  <div class="box">
      <h4>我的收藏</h4>
      <div class="box1">
        <div>
            <el-button type="primary" plain class="myButton1" @click="whyNo">全选</el-button>
            <el-button type="primary" plain class="myButton1" @click="changed">选择</el-button>
            <el-button type="danger"  class="myButton1" @click="myDelete">删除</el-button>
            <el-button type="primary" class="myButton2" @click="search">搜索</el-button>
            <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input3" class="myInput3"></el-input>
        </div>
        <div class="dong">
          <ul>
              <li v-for="(item,index) in List" :key="index" v-if="index>pageShang&&index<pageXia">
                <router-link :to="'/user/DeGoods?id='+item.id">
                    <img :src="'data:image/jpg;base64,'+item.picture1"><h4>{{item.name}}</h4><p>20元</p>
                </router-link>
                <input type="checkbox" class="tui-checkbox" v-if="cSee" v-model="item.sign">
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
        return{
            input1: '',
            input2: '',
            input3: '',
            check1: false,
            All_limit: 0,  //总商品数
            pageOn: 1, //当前页数
            List: [],
            token: "",
            cSee: false,
            pList: [],
        }
    },
    created(){
        this.token =  localStorage.getItem('token');
        this.myLikes();
    },
    methods:{
        async myLikes(){
            const {data: res} = await request.get('/user/favorite',{
                headers: {
            	    'Content-Type': "application/json;charset=UTF-8",
             	    'Authorization': 'Bearer ' + this.token,
        	    }
            });
            this.List=res;
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
        whyNo(){
            if(this.cSee){
                this.List.forEach(item=>(item.sign = true));
                this.cSee=false;
                this.cSee=true;
            }
        },
        changed(){
            this.cSee = !this.cSee;
        },
        async myDelete(){
            this.pList = [];
            for(var i = 0; i < this.List.length; i++){
                if(this.List[i].sign)this.pList.push(this.List[i].id);
            }
            var temp = JSON.stringify(this.pList+'') //{ indices: false });
            console.log(temp);
            const {data: res} = await request.get('/user/cancelF/arr',{
                params: {
                    arr: temp,
                },
                headers: {
            	    'Content-Type': "application/x-www-form-urlencoded",
             	    'Authorization': 'Bearer ' + this.token,
        	    }
            })
            this.myLikes();
        },
        async search(){
            const {data: res} = await request.get('/user/FSelectName',{
                params: {
                   name: this.input3,
                },
                headers: {
            	    'Content-Type': "application/json;charset=UTF-8",
             	    'Authorization': 'Bearer ' + this.token,
        	    }
            })
            this.List = res;
            this.All_limit=res.length;
            console.log(res);
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
            return (this.pageOn-1)*8-1;
        },
        pageXia(){
            return this.pageOn*8;
        },
        pageTotal(){
            if(this.All_limit % 8 == 0)return(this.All_limit/8);
            else return (Math.floor(this.All_limit/8)+1);
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
#nzNz{
    margin-left: 20px;
    margin-right: 20px;
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
.myInput3{
    float: right;
    width: 236px;
    height: 39px;
}
.dong ul{
    float: left;
    width: 1582px;
    height: 770px;
    padding-left: 70px;
}
.dong ul li{
    position: relative;
    float: left;
    margin: 42px 42px;
    width: 272px;
    height: 303px;
    box-shadow: 10px 10px 10px -4px rgba(0,0,0,0.3);
}
.dong ul li img{
    width: 272px;
    height: 235px;
}
.dong ul li p{
    position: absolute;
    color: aqua;
    font-size: 15px;
    bottom: 5px;
    left: 30px;
}
//设置选中背景
.tui-checkbox:checked {
	background: rgba(116,223,178);
}
//设置复选框样式
.tui-checkbox {
	width:25px;
	height:25px;
    right: 5px;
    bottom: 5px;
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

.footer{
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