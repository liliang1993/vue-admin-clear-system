<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="keywords">
        <el-form-item>
          <el-date-picker
          v-model="keywords.dateRange"
          type="daterange"
          align="right"
          format='yyyy/MM/dd'
          placeholder="选择日期范围"
          :picker-options="pickerOptions2"
          @change = "changeDate"
          >
        </el-date-picker>
        </el-form-item>
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
        <el-form-item label="Symbol:">
          <el-input  v-model='keywords.symbol'></el-input>
        </el-form-item>
        <el-form-item label="Client:">
          <el-input v-model='keywords.client'></el-input>  
        </el-form-item>
         <el-form-item>
          <el-button type="primary" v-on:click="renderTable">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span='24' class='table-title'>
        Client Trades
    </el-col>  
    <el-col :span="24" v-loading='client_trades_loading'>
          <bel-table
          ref="table"
          :configs="tableConfig"
          >
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
        client_trades_loading:false,
         pickerOptions2: {
          shortcuts: [{

            text: 'Today',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(end.getTime() + 3600 * 1000 * 24);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: 'Yesterday',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 );
              picker.$emit('pick', [start, end]);
            }
          },{
            text: 'This Week',
            onClick:(picker)=>{
              console.log('this',this);
              const end = Date.parse(this.getMonday('e',0));
              const start = Date.parse(this.getMonday('s',0));
              picker.$emit('pick', [start, end]);
            }
          },{
            text: 'Previous Week',
            onClick:(picker)=>{
              console.log('this',this);
              const end = Date.parse(this.getMonday('e',-1));
              const start = Date.parse(this.getMonday('s',-1));
              picker.$emit('pick', [start, end]);
            }
          },{
            text: 'Previous Month',
            onClick:(picker)=>{
              console.log('this',this);
              const end = Date.parse(this.getMonth('e',-1));
              const start = Date.parse(this.getMonth('s',-1));
              picker.$emit('pick', [start, end]);
            }
          }],
          onPick: this.pickDate
        },
        keywords:{
             dateRange:[],
             login:'',
             symbol:'',
             client:''
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
              prop: 'order_id',
              label: 'Order ID',
              minWidth: 100,
              align: 'center'
            }
          },{
            attr: {
              prop: 'login',
              label: 'Login',
              minWidth: 100,
              align: 'center'
            }
          },{
            attr: {
              prop: 'type',
              label: 'Type',
              minWidth: 100,
              align: 'center'
            }
          },{
            attr: {
              prop: 'open_time',
              label: 'Open Time',
              minWidth: 100,
              align: 'center'
            }
          },{
            attr: {
              prop: 'symbol',
              label: 'Symbol',
              minWidth: 100,
              align: 'center'
            }
          },{
            attr: {
              prop: 'lots',
              label: 'Lots',
              minWidth: 100,
              align: 'center'
            }
          },{
            attr: {
              prop: 'open_price',
              label: 'Close Price',
              minWidth: 100,
              align: 'center'
            }
          },{
            attr: {
              prop: 'close_price',
              label: 'Close Price',
              minWidth: 100,
              align: 'center'
            }
          },{
            attr: {
              prop: 'close_time',
              label: 'Close Time',
              minWidth: 100,
              align: 'center'
            }
          },{
            attr: {
              prop: 'commission',
              label: 'Commission',
              minWidth: 100,
              align: 'center'
            }
          },{
            attr: {
              prop: 'swap',
              label: 'Rollover',
              minWidth: 100,
              align: 'center'
            }
          },{
            attr: {
              prop: 'bbook_size',
              label: 'B Book Size',
              minWidth: 100,
              align: 'center'
            }
          },{
            attr: {
              prop: 'bbook_per',
              label: 'B Book %',
              minWidth: 100,
              align: 'center'
            }
          },{
            attr: {
              prop: 'profit',
              label: 'P/L',
              minWidth: 100,
              align: 'center'
            }
          },{
            attr: {
              prop: 'comment',
              label: 'Comment',
              minWidth: 100,
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
        /*dates为数字类型，0代表今日,-1代表昨日，1代表明日，返回yyyy-mm-dd格式字符串*/
        getDate(dates) {
            var dd = new Date();
            var n = dates || 0;
            dd.setDate(dd.getDate() + n);
            var y = dd.getFullYear();
            var m = dd.getMonth() + 1;
            var d = dd.getDate();
            m = m < 10 ? "0" + m: m;
            d = d < 10 ? "0" + d: d;
            var day = y + "-" + m + "-" + d;
            return day;
        },
        //type为字符串类型，有两种选择，"s"代表开始,"e"代表结束，dates为数字类型，不传或0代表本周，-1代表上周，1代表下周
        getMonday(type, dates) {
            var now = new Date();
            var nowTime = now.getTime();
            var day = now.getDay();
            var longTime = 24 * 60 * 60 * 1000;
            var n = longTime * 7 * (dates || 0);
            if (type == "s") {
                var dd = nowTime - (day - 1) * longTime + n;
            };
            if (type == "e") {
                var dd = nowTime + (7 - day) * longTime + n;
            };
            dd = new Date(dd);
            var y = dd.getFullYear();
            var m = dd.getMonth() + 1;
            var d = dd.getDate();
            m = m < 10 ? "0" + m: m;
            d = d < 10 ? "0" + d: d;
            var day = y + "-" + m + "-" + d;
            return day;
        },
        getMonth(type, months) {
            var d = new Date();
            var year = d.getFullYear();
            var month = d.getMonth() + 1;
            if (Math.abs(months) > 12) {
                months = months % 12;
            };
            if (months != 0) {
                if (month + months > 12) {
                    year++;
                    month = (month + months) % 12;
                } else if (month + months < 1) {
                    year--;
                    month = 12 + month + months;
                } else {
                    month = month + months;
                };
            };
            month = month < 10 ? "0" + month: month;
            var date = d.getDate();
            var firstday = year + "-" + month + "-" + "01";
            var lastday = "";
            if (month == "01" || month == "03" || month == "05" || month == "07" || month == "08" || month == "10" || month == "12") {
                lastday = year + "-" + month + "-" + 31;
            } else if (month == "02") {
                if ((year % 4 == 0 && year % 100 != 0) || (year % 100 == 0 && year % 400 == 0)) {
                    lastday = year + "-" + month + "-" + 29;
                } else {
                    lastday = year + "-" + month + "-" + 28;
                };
            } else {
                lastday = year + "-" + month + "-" + 30;
            };
            var day = "";
            if (type == "s") {
                day = firstday;
            } else {
                day = lastday;
            };
            return day;
        },
        yesterdayHandler(){

        },
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
        pickDate(max,min){
            console.log('max',max,min);
            this.renderTable();
        },
        changeDate(date){
          console.log('123',this.keywords.dateRange);
            if(this.keywords.dateRange == undefined || this.keywords.dateRange[0] ==null||this.keywords.dateRange[1] ==null ){
                return;
            }
            this.renderTable();
        },
        changeLogin(){
            this.renderTable();
        },
        date_format(date){
            var year = date.getFullYear();
            var month = date.getMonth()+1;

            var monthStr = month < 10 ? "0"+month : month+'';
            var day = date.getDate();
             var dayStr = day < 10? "0"+day : day+'';
            return year+monthStr+dayStr;
        },
        DateRangeInit(){
            var startTime = new Date();
            var endTime = new Date(new Date().getTime() + 24*60*60*1000);
            this.keywords.dateRange.push(startTime);
            this.keywords.dateRange.push(endTime);
        },
        renderTable(){
           var fromTime = this.date_format(new Date(this.keywords.dateRange[0]));
            var toTime = this.date_format(new Date(this.keywords.dateRange[1]));
            var login = this.keywords.login;

            var symbol = this.keywords.symbol;
            var client = this.keywords.client ==''? 0 : parseInt(this.keywords.client);
            console.log('login',login);
            this.client_trades_loading = true;
            var params = {
                login: login,
                from: fromTime,
                to: toTime,
                client: client,
                symbol: symbol,
                cur_page: this.pagination.current_page,
                lp:''
            }
            commonApi.getClientTraders(params).then((res)=>{
                    var data = JSON.parse(res.message);
                    console.log('data',data,data.rows);
                    this.tableData = data.rows;
                    this.pagination.total = data.total;
                     this.client_trades_loading = false;
                }).catch(()=>{
                     this.client_trades_loading = false;
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