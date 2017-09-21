<template>
  <section>
      <el-col :span='24' v-for="(row,index) in dataSource"> 
          <div v-for ='(option,key) in row'>  
            <el-input :placeholder = 'options[key].desc' v-model ='row[key]'>
            </el-input>
          </div>
          <el-col :span='4'>
              <el-button type="primary" icon="delete"></el-button>
          </el-col>
      </el-col>  
  </section>
</template>

<script>
  export default {
      name:'multi-input'
      data(){
        return{
            
        }
      },
      prop:{
          dataSource:{
            required: true
          },
          options:{
              
          }
      }

  }

</script>

<style scoped>

</style>