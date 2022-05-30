<template>
  <div class="box">
      <h4>所有商品</h4>
      <div class="box1">
        <div>
            <h3>价格区间</h3>
            <el-input v-model="input1" placeholder="请输入" class="myInput1"></el-input>
            <h3 id="nzNz">~</h3>
            <el-input v-model="input2" placeholder="请输入" class="myInput1"></el-input>
            <el-button type="primary" plain class="myButton1" @click="p_search">确定</el-button>
            <el-button type="primary" class="myButton2" @click="search">搜索</el-button>
            <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input3" class="myInput3"></el-input>
        </div>
        <div class="dong">
          <ul>
              <li v-for="(item,index) in List" :key="index"  v-if="index>pageShang&&index<pageXia">
                <router-link :to="'/user/DeGoods?id='+item.id">
                    <img :src="'data:image/jpg;base64,'+item.picture1"><h4>{{item.name}}</h4><p>{{item.price}}</p>
                </router-link>
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
            All_limit: 0,  //总商品数
            pageOn: 1, //当前页数
            //pageTotal: 0, //总页数
            List: [],
        }
    },
    created(){
        this.goodsList();
    },
    methods:{
        async goodsList(){
            const {data: res} = await request.get('/allCommodityOnSale',{
                /*params:{
                    keywords: num,
                    limit: this.limit,
                }*/
            })
            //this.verificationImg = window.URL.createObjectURL(res.picture1)
            this.List=res;
            this.All_limit=res.length;
        },

        async p_search(){
            const {data: res} = await request.get('/showByPrice',{
                params: {
                    begin: this.input1,
                    end: this.input2,
                }
            })
            this.List = res;
            this.All_limit=res.length;
        },

        async search(){
            const {data: res} = await request.get('/selectCommodityByName',{
                params: {
                   name: this.input3,
                }
            })
            this.List = res;
            this.All_limit=res.length;
            console.log(res);
        },
        curPage(index){
            this.pageOn = index;
            //this.goodsList(index);
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
.myInput1{
    float: left;
    width: 131px;
    height: 39px;
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