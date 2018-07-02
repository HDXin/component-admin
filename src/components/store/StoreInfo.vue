<template>
    <div class="info">
        <h4 class="text-center">{{model.storeName}}</h4>
        <img src=""
             alt="">
        <p>门店地址：{{`${model.provinceName}-${model.cityName}-${model.countyName}`}}</p>
        <p>客服电话：{{model.tel}}</p>
        <p>营业时间：{{model.openingStart}}-{{model.openingEnd}}</p>
        <h4 class="text-center">商家介绍</h4>
        <article>
            <div v-html='description'>

            </div>
            <!-- {{model.description}} -->
        </article>
    </div>
</template>
<script>
export default {
  props:['model'],
  computed: {
      description(){
           var  str = String(this.model.description).replace(/\n/g,'<br>')
          return '<div>'+str+'</div>'
      }
  }
}
</script>
<style lang="less" scoped>
.info{
    border: 1px solid #eee;
    border-right-width:0; 
    min-height: 83vh;
    padding: 0 15px
}
</style>


