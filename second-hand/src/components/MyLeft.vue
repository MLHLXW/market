<template>
    <div class="box">
        <ul>
            <li :class="sn == 1 ? 'selected':''" @click='TS1()'><router-link to="/user/MyRight1"><img src="../assets/所有.png">所有商品</router-link></li>
            <li :class="sn == 2 ? 'selected':''" @click='TS2()'><router-link to="/user/MyLikes"><img src="../assets/购物车.png">我的收藏</router-link></li>
            <li @click='TS3()'><router-link to="/user/Sold"><img src="../assets/交易记录.png">交易记录</router-link></li>
            <li :class="sn == 3 ? 'selected':''" @click='TS31()' v-show="x1"><router-link to="/user/Sold" class="ss1">售出记录</router-link></li>
            <li :class="sn == 4 ? 'selected':''" @click='TS4()' v-show="x1"><router-link to="/user/Buy" class="ss1">购入记录</router-link></li>
            <li :class="sn == 5 ? 'selected':''" @click='TS5()'><router-link to="/user/MySell"><img src="../assets/出售.png">我出售的</router-link></li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return{
            x1: false,
            sn: 1,
        }
    },
    methods:{
        TS3(){
            this.x1 = !this.x1;
            this.sn = 3;
        },
        TS31(){
            this.sn = 3;
        },
        TS1(){
            this.sn=1;
        },
        TS2(){
            this.sn=2;
        },
        TS4(){
            this.sn=4;
        },
        TS5(){
            this.sn=5;
        }
    }
}
</script>

<style lang="less" scoped>
.box{
    border: none;
    position: absolute;
    left: 0px;
}
ul{
    padding-top: 34px;
    width: 264px;
    height: 959px;
    background-color: rgba(84,92,100);
}

ul li{
    position: relative;
    height: 56px;
    line-height: 56px;
}

ul li a{
    display: block;
    padding-left: 68px;
    height: 56px;
    font-size: 20px;
    text-decoration: none;
    color: white;
}

ul li a:hover{
    background-color: rgba(116, 223, 178);
}

ul li a img{
    position: absolute;
    width: 20px;
    left: 24px;
    top: 19px;
}

.selected{
    background-color: rgba(116, 223, 178);
}
.ss1{
    font-size: 10px;
    
}
</style>