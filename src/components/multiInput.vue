<template>
  <section>
      <el-col :span='24' v-for="(row,index)in value"> 
          <div v-for ='(item,key)in option'>  
            <el-input :placeholder = 'item.desc' v-model ='value[]'>
            </el-input>
          </div>
          <el-col>
              <el-button type="primary" icon="delete"></el-button>
      </el-col>  
  </section>
</template>

<script>
  export default {
      data(){
        return{
            
        }
      }
  }

</script>

<style scoped>

</style>