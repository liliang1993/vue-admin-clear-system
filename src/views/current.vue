<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="keywords">
        <el-form-item label="Login:">
          <el-select  v-model='keywords.login' @change= 'changeLogin'>  
              <el-option
              v-for ='item in loginOptions'
              :key = 'item'
              :label = 'item'
              :value = 'item'
              
              >  
              </el-option>      
          </el-select>
        </el-form-item>
         <el-form-item>
          <el-button type="primary" v-on:click="renderTable">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="24">
          <bel-table
          ref="table"
          :configs="tableConfig"
          >
          </bel-table>
    </el-col>
  </section>
</template>

<script>
  import util from '../common/js/util'
  //import NProgress from 'nprogress'
  import commonApi from '../api/api';

  export default {
    data() {
      return {
        keywords:{
             login:''
        },
        tableData:[],
        loginOptions:[]
      }
    },
    computed: {
    tableConfig: {
      get() {
        return {
          table: {
            attr: {
              data: this.tableData,
              maxHeight: '100%',
              border: false,
              defaultSort: {
                prop: 'user_id'
              }
            }
          },
          columns: [{
            attr: {
              prop: 'balance',
              label: 'Balance',
              minWidth: 100,
              align: 'center'
            }
          },{
            attr: {
              prop: 'equity',
              label: 'Equity',
              minWidth: 100,
              align: 'center'
            }
          },{
            attr: {
              prop: 'margin',
              label: 'Type',
              minWidth: 100,
              align: 'center'
            }
          },{
            attr: {
              prop: 'free_margin',
              label: 'FreeMargin',
              minWidth: 100,
              align: 'center'
            }
          },{
            attr: {
              prop: 'margin_level',
              label: 'MarginLevel',
              minWidth: 100,
              align: 'center'
            }
          },{
            attr: {
              prop: 'profit',
              label: 'profit',
              minWidth: 100,
              align: 'center'
            }
          }]
        }
      }
    }
  },
    methods: {
        loadLogin(){
            commonApi.getLogins().then((res)=>{
                console.log('res',res);
                var login_dict = JSON.parse(res.message);
                if(login_dict.length>0){
                     this.keywords.login =  login_dict[0];
                     this.loginOptions = login_dict;
                     this.DateRangeInit();
                      this.renderTable();
                }  
            }).catch((err)=>{

            })
        },

        changeLogin(){
            this.renderTable();
        },


        renderTable(){
            var login = this.keywords.login;
            console.log('login',login);
            var params = {
                login: login,
                from: '0',
                to: '0'
            }
            commonApi.getCurrentMtbase(params).then((res)=>{
                    var data = JSON.parse(res.message);
                    this.tableData.push(data);
                })
        }
    },
    mounted() {
       this.loadLogin(); 
    }
  }

</script>

<style scoped>

</style>