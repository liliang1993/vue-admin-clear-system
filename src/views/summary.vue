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
      </el-form>
    </el-col>
    <el-col :span='24' class='table-title'>
        PICO Trades
    </el-col>  
    <el-col :span="24" v-loading='pico_trades_loading'>
          <bel-table
          ref="table"
          :configs="pico_trades_tableConfig"
          >
          </bel-table>
    </el-col>
    <el-col :span='24' class='table-title'>
       Client Trades
    </el-col>  
     <el-col :span="24" v-loading='client_trades_loading'>
          <bel-table
          ref="table"
          :configs="client_trades_tableConfig"
          >
          </bel-table>
    </el-col>
    <el-col :span='24' class='table-title'>
        Bridge Records
    </el-col>  
     <el-col :span="24" v-loading='bridge_records_loading'>
          <bel-table
          ref="table"
          :configs="bridge_records_tableConfig"
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
        pico_trades_loading:false,
        client_trades_loading:false,
        bridge_records_loading:false,
         pickerOptions2: {
          shortcuts: [{

            text: 'Today',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(end.getTime() + 3600 * 1000 * 24);
              picker.$emit('pick', [start, end]);
              this.pickDate();
            }
          }, {
            text: 'Yesterday',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 );
              picker.$emit('pick', [start, end]);
              this.pickDate();
            }
          },{
            text: 'This Week',
            onClick:(picker)=>{
              console.log('this',this);
              const end = Date.parse(this.getMonday('e',0));
              const start = Date.parse(this.getMonday('s',0));
              picker.$emit('pick', [start, end]);
              this.pickDate();
            }
          },{
            text: 'Previous Week',
            onClick:(picker)=>{
              console.log('this',this);
              const end = Date.parse(this.getMonday('e',-1));
              const start = Date.parse(this.getMonday('s',-1));
              picker.$emit('pick', [start, end]);
              this.pickDate();
            }
          },{
            text: 'Previous Month',
            onClick:(picker)=>{
              console.log('this',this);
              const end = Date.parse(this.getMonth('e',-1));
              const start = Date.parse(this.getMonth('s',-1));
              picker.$emit('pick', [start, end]);
              this.pickDate();
            }
          }],
        },
        keywords:{
             dateRange:[],
             login:''
        },
        pico_trades_tableData:[],
        client_trades_tableData:[],
        bridge_records_tableData:[],
        loginOptions:[],
      }
    },
    computed: {
    pico_trades_tableConfig: {
      get() {
        return {
          table: {
            attr: {
              data: this.pico_trades_tableData,
              maxHeight: '100%',
              border: false,
              defaultSort: {
                prop: 'user_id'
              }
            }
          },
          columns: [{
            attr: {
              prop: 'symbol',
              label: 'Symbol',
              minWidth: 100,
              align: 'center'
            }
          },{
            attr: {
              prop: 'sell_volume',
              label: 'Buy Volume',
              minWidth: 100,
              align: 'center'
            }
          },{
            attr: {
              prop: 'fees',
              label: 'Fees',
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
              prop: 'swaps',
              label: 'Rollover',
              minWidth: 100,
              align: 'center'
            }
          },{
            attr: {
              prop: 'close_pl',
              label: 'Close P/L',
              minWidth: 100,
              align: 'center'
            }
          }]
        }
      }
    },
    client_trades_tableConfig: {
      get() {
        return {
          table: {
            attr: {
              data: this.pico_trades_tableData,
              maxHeight: '100%',
              border: false,
              defaultSort: {
                prop: 'user_id'
              }
            }
          },
          columns: [{
            attr: {
              prop: 'symbol',
              label: 'Symbol',
              minWidth: 100,
              align: 'center'
            }
          },{
            attr: {
              prop: 'sell_volume',
              label: 'Buy Volume',
              minWidth: 100,
              align: 'center'
            }
          },{
            attr: {
              prop: 'fees',
              label: 'Fees',
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
              prop: 'swaps',
              label: 'Rollover',
              minWidth: 100,
              align: 'center'
            }
          },{
            attr: {
              prop: 'close_pl',
              label: 'Close P/L',
              minWidth: 100,
              align: 'center'
            }
          }]
        }
      }
    },
    bridge_records_tableConfig: {
      get() {
        return {
          table: {
            attr: {
              data: this.bridge_records_tableData,
              maxHeight: '100%',
              border: false,
              defaultSort: {
                prop: 'user_id'
              }
            }
          },
          columns: [{
            attr: {
              prop: 'symbol',
              label: 'Symbol',
              minWidth: 100,
              align: 'center'
            }
          },{
            attr: {
              prop: 'buy_volume',
              label: 'Buy Volume',
              minWidth: 100,
              align: 'center'
            }
          },{
            attr: {
              prop: 'sell_volume',
              label: 'Sell Volume',
              minWidth: 100,
              align: 'center'
            }
          },{
            attr: {
              prop: 'fees',
              label: 'Fees',
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
        renderPicoTable(){
           var fromTime = this.date_format(new Date(this.keywords.dateRange[0]));
            var toTime = this.date_format(new Date(this.keywords.dateRange[1]));
            var login = this.keywords.login;
            var symbol = this.keywords.symbol;
            console.log('login',login);
            var params = {
                login: login,
                from: fromTime,
                to: toTime,
            };
             this.pico_trades_loading = true;
            commonApi.getSummary_picoTrades(params).then((res)=>{
               this.pico_trades_loading = false;
                    var data = JSON.parse(res.message);
                    this.pico_trades_tableData = [];
                     for(var key in data["symbols"]){
                          this.pico_trades_tableData.push(data["symbols"][key]);
                     }
                    var totalRow ={
                        symbol:'Total',
                        buy_volume:'',
                        sell_volume:'',
                        swaps:data.swaps,
                        commission: data.commission,
                        close_pl: data.close_pl
                    };
                    this.pico_trades_tableData.push(totalRow);
                }).catch((err)=>{
                  this.pico_trades_loading = false;
                })
        },
        renderClientTradesTable(){
            var fromTime = this.date_format(new Date(this.keywords.dateRange[0]));
            var toTime = this.date_format(new Date(this.keywords.dateRange[1]));
            var login = this.keywords.login;
            var symbol = this.keywords.symbol;
            console.log('login',login);
            var params = {
                login: login,
                from: fromTime,
                to: toTime,
            };
             this.client_trades_loading = true;
            commonApi.getSummary_clientTrades(params).then((res)=>{
              this.client_trades_loading = false;
                    var data = JSON.parse(res.message);
                    this.client_trades_tableData = [];
                     for(var key in data["symbols"]){
                          this.client_trades_tableData.push(data["symbols"][key]);
                     }
                    var totalRow ={
                        symbol:'Total',
                        buy_volume:'',
                        sell_volume:'',
                        swaps:data.swaps,
                        commission: data.commission,
                        close_pl: data.close_pl
                    };
                    this.client_trades_tableData.push(totalRow);
                }).catch((err)=>{
                  this.client_trades_loading = false;
                })
        },
        renderBridgeRecordsTable(){
            var fromTime = this.date_format(new Date(this.keywords.dateRange[0]));
            var toTime = this.date_format(new Date(this.keywords.dateRange[1]));
            var login = this.keywords.login;
            var symbol = this.keywords.symbol;
            console.log('login',login);
            var params = {
                login: login,
                from: fromTime,
                to: toTime,
            };
            this.bridge_records_loading = true;
            commonApi.getSummary_bridgeRecords(params).then((res)=>{
                    this.bridge_records_loading = false;
                    var data = JSON.parse(res.message);
                    this.bridge_records_tableData = [];
                     for(var key in data["symbols"]){
                          this.bridge_records_tableData.push(data["symbols"][key]);
                     }
                    var totalRow ={
                        symbol:'Total',
                        buy_volume:'',
                        sell_volume:'',
                        fees:data.fees
                    };
                    this.bridge_records_tableData.push(totalRow);
                }).catch((err)=>{
                    this.bridge_records_loading = false;
                })
        },
        renderTable(){
          this.renderPicoTable();
          this.renderClientTradesTable();
           this.renderBridgeRecordsTable();
        }
    },
    mounted() {
       this.loadLogin(); 
    }
  }

</script>

<style scoped>

</style>