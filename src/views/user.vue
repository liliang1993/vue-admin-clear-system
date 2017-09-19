<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="keywords">
         <el-form-item>
          <el-button type="primary" v-on:click="editUser">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="24">
          <bel-table
          ref="table"
          :configs="tableConfig"
          >
          <template slot='edit' scope='scope'>
              <el-button
                  type="info"
                  icon='edit'
                  size="mini"
                  @click='editUser(scope.row)'></el-button>
          </template>
          </bel-table>
    </el-col>
     <!--工具条-->
      <el-col :span="24" class='btm-action'>
            <el-pagination
                class='pagination'
                :page-sizes="pagination.page_sizes"
                :page-size="pagination.page_size"
                :layout="pagination.layout"
                :total="pagination.total"
                :current-page='pagination.current_page'
                @current-change='onChangeCurrentPage'
             >
            </el-pagination>
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
        loginOptions:[],
        pagination: {
          current_page: 1,
          total: 0,
          page_size: 15,
          layout: "total, prev, pager, next, jumper"
        },
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
              prop: 'id',
              label: 'ID',
              minWidth: 100,
              align: 'center'
            }
          },{
            attr: {
              prop: 'name',
              label: 'Name',
              minWidth: 100,
              align: 'center'
            }
          },{
            attr: {
              prop: 'login_id',
              label: 'Login ID',
              minWidth: 100,
              align: 'center'
            }
          },{
            attr: {
              prop: 'status',
              label: 'Status',
              minWidth: 100,
              align: 'center'
            }
          },{
            attr: {
              prop: 'edit_users',
              label: 'Edit Users',
              minWidth: 100,
              align: 'center'
            }
          },{
            attr: {
              prop: 'view_users',
              label: 'View Users',
              minWidth: 100,
              align: 'center'
            }
          },{
            attr: {
              prop: 'abook',
              label: 'A Book',
              minWidth: 100,
              align: 'center'
            }
          },{
            attr: {
              prop: 'mt',
              label: 'MT4',
              minWidth: 100,
              align: 'center'
            }
          },{
            attr: {
              prop: 'bridge',
              label: 'Bridge',
              minWidth: 100,
              align: 'center'
            }
          },{
            attr: {
              prop: 'describtion',
              label: 'describtion',
              minWidth: 100,
              align: 'center'
            }
          },{
            attr: {
              label: 'Edit',
              minWidth: 100,
              scopedSlot: 'edit',
              align: 'center'
            }
          }]
        }
      }
    }
  },
    methods: {
        onChangeCurrentPage(pageNum){
          this.pagination.current_page = pageNum;
           this.renderTable();
        },
        renderTable(){
            var login = this.keywords.login;
            console.log('login',login);
            var params = {
                cur_page:this.pagination.current_page
            }
            this.tableData = [];
            commonApi.getUserlist(params).then((res)=>{
                    var data = JSON.parse(res.message);
                    this.tableData = data.rows;
                    this.pagination.total = data.t0tal;
                })
        },
        editUser(row){
            layer.open({
                    type:2,
                    shade:0,
                    maxmin:true,
                    area:['600px','550px'],
                    title:'添加',
                    content:'#/user/edit'
                })
        }
    },

    mounted() {
       this.renderTable();
       
    }
  }

</script>

<style scoped>

</style>