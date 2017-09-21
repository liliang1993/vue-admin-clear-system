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
    <el-col :span='24' class='table-title' v-loading='open_orders_loading'>
        Open Orders
    </el-col>  
     <el-col :span="24">
          <bel-table
          ref="table"
          :configs="open_orders_tableConfig"
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
        open_orders_loading:false,
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
        open_orders_tableData:[],
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
              prop: 'date',
              label: 'Date',
              minWidth: 100,
              align: 'center'
            }
          },{
            attr: {
              prop: 'instrument',
              label: 'instrument',
              minWidth: 100,
              align: 'center'
            }
          },{
            attr: {
              prop: 'item',
              label: 'Item',
              minWidth: 100,
              align: 'center'
            }
          },{
            attr: {
              prop: 'amount',
              label: 'Amount',
              minWidth: 100,
              align: 'center'
            }
          },{
            attr: {
              prop: 'detail',
              label: 'Detail',
              minWidth: 100,
              align: 'center'
            }
          }]
        }
      }
    },
     open_orders_tableConfig: {
      get() {
        return {
          table: {
            attr: {
              data: this.open_orders_tableData,
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
              prop: 'Volume',
              label: 'volume',
              minWidth: 100,
              align: 'center'
            }
          },{
            attr: {
              prop: 'average_price',
              label: 'AveragePrice',
              minWidth: 100,
              align: 'center'
            }
          },{
            attr: {
              prop: 'closing_price',
              label: 'ClosingPrice',
              minWidth: 100,
              align: 'center'
            }
          },{
            attr: {
              prop: 'float_profit',
              label: 'FloatProfit ',
              minWidth: 100,
              align: 'center'
            }
          },{
            attr: {
              prop: 'swaps',
              label: ' Rollover ',
              minWidth: 100,
              align: 'center'
            }
          },{
            attr: {
              prop: 'commission',
              label: 'commission',
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
            }
                    this.pico_trades_loading = true;
            commonApi.getActivity_pico(params).then((res)=>{
                    this.pico_trades_loading = true;
                    var data = JSON.parse(res.message);
                
                    this.pico_trades_tableData = this.pico_traders_handler(data.activity);
                        console.log('data',this.pico_trades_tableData);
                    var totalRow ={
                        date:'Total',
                        instructment:'',
                        item:'',
                        amount: data.amount,
                        detail:''
                    };
                    var openBalanceRow ={
                        date:'',
                        instructment:'',
                        item:'Open Bal',
                        amount: data.open_balance,
                        detail:''
                    }
                    var closeBalanceRow ={
                        date:'',
                        instructment:'',
                        item:'Close Bal',
                        amount: data.close_balance,
                        detail:''
                    }
                    this.pico_trades_tableData.push(totalRow,openBalanceRow,closeBalanceRow);
                }).then((err)=>{
                    this.pico_trades_loading = false
                })
        },
        renderOpenOrdersTable(){
            var fromTime = this.date_format(new Date(this.keywords.dateRange[0]));
            var toTime = this.date_format(new Date(this.keywords.dateRange[1]));
            var login = this.keywords.login;
            var symbol = this.keywords.symbol;
            console.log('login',login);
            var params = {
                login: login,
                from: fromTime,
                to: toTime,
            }
            this.open_orders_loading = true;
            commonApi.getActivity_open_orders(params).then((res)=>{
              this.open_orders_loading = false;
                    var data = JSON.parse(res.message);
                    this.open_orders_tableData = this.open_orders_handler(data.orders);
                    var totalRow ={
                        symbol:'Total',
                        volume:'',
                        average_price:'',
                        closing_price:'',
                        float_profit:'',
                        swaps:data.swaps,
                        commission: data.commission,
                    };
                    this.open_orders_tableData.push(totalRow);
                }).catch((err)=>{
                    this.open_orders_loading = false;
                })
        },
        isEmptyObject(obj){
           for(var key in obj){
             return false
           };
           return true
        },
        pico_traders_handler(obj){
            console.log('obj',obj);
            if(this.isEmptyObject(obj) ){
              return [];
            }
            var group =[];
            for(var date in obj){
                var dict = obj[date];
                var staticRows = [{
                  date: date,
                  instrument:'',
                  item: 'deposit',
                  amount: dict['deposit']
                },{
                  date: '',
                  instrument:'',
                  item: 'withdrawal',
                  amount: dict['withdrawal']
                }];
                group.push.apply(group,staticRows);
                console.log('group',group,dict['symbols']);
                for(var symbol in dict['symbols']){
                      var attrs = dict['symbols'][symbol];
                      console.log('attr',attrs);
                      var attrRows = [{
                        date: '',
                        instrument:symbol,
                        item: 'profit',
                        amount: attrs['profit']
                      },{
                        date: '',
                        instrument:'',
                        item: 'commission',
                        amount: attrs['commission']
                      },{
                        date: '',
                        instrument:'',
                        item: 'swap',
                        amount: attrs['swap']
                      }];
                      group.push.apply(group,attrRows);
                }
            }
            return group;
        },
        open_orders_handler(obj){
          var list =[];
          for(var symbol in obj){
              list.push(obj[symbol]);
          }
          return list;
        },
        renderTable(){
          this.renderPicoTable();
          this.renderOpenOrdersTable();
        }
    },
    mounted() {
       this.loadLogin(); 
    }
  }

</script>

<style scoped>

</style>