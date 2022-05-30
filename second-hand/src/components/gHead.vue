<template>
    <div class="header">
        <img src="" alt="" class="Mi1">
        <h3></h3>
        <router-link to="/Gload"><img src="../assets/退出.png" class="Mi2"></router-link>
        <router-link to="/user/PerSon"><img src="../assets/vip.png" class="Mi2"></router-link>
    </div>
</template>

<script>
export default {
    data(){
        return{
            n1: false,
        }
    }
}
</script>

<style lang="less" scoped>
.header{
    height: 88px;
    width: 1899px;
    border: none;
    background-color: rgba(84,92,100);
}
h3{
    float: left;
    margin-top: 10px;
    color: white;
}
.Mi1{
    float: left;
    height: 50px;
}
.Mi2{
    float: right;
    width: 40px;
    margin: 20px 40px 0px 0px;
}
.Mi3{
    position: relative;
    top: 2px;
    float: right;
    width: 40px;
}
.Mi4{
    position: absolute;
    top: 20px;
    right: 36px;
    display: inline-block;
    border-radius: 50%;
    width: 10px;
    height: 10px;
    background-color: red;
}
</style>