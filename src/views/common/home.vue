<template>
  <div class="dashboard-editor-container">
    <panel-group :IndexInfo='IndexInfo' @handleSetLineChartData="handleSetLineChartData"/>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
    <el-col :xs="24" :sm="24" :lg="12"> 
        <line-chart :chart-data="lineChartData"/>
    </el-col>
    <el-col :xs="24" :sm="24" :lg="12"> 
        <div class="DateTime">
          <el-date-picker size='mini' value-format='timestamp' @change='cahngTime' v-model="dataTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        </div>
        <BarChart :barCharCount='barCharCount' :barChartName='barChartName'/>
    </el-col>
    </el-row>

   <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper"  v-if="flag">
      <div class="select">  
        <el-select v-model="value" size='mini' placeholder="请选择" @change='SelectChange'>
          <el-option label="当天" value="1"> </el-option>
          <el-option label="当月" value="2"> </el-option>
          <el-option label="全部" value="3"> </el-option>
        </el-select>
      </div>
          <pie-chart  :memberCount='memberCount' :distriborCount='distriborCount' :orderCount='orderCount' :countList='countList' :countinfoList.sync='countinfoList'/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
           <template>
            <el-table :data="list" border style="width: 100%" size='mini'>
              <el-table-column prop="face" label=" 头像" width="180">
                <template slot-scope="scope">
                      <img :src="scope.row.face" width="40">
                </template>
              </el-table-column>
              <el-table-column prop="name" label="名称" width="180"></el-table-column>
              <el-table-column prop="time" label="时间" width="180"></el-table-column>
              <el-table-column prop="city" label="城市"></el-table-column>
            </el-table>
                  <!-- <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="GetUserInfo" /> -->
          </template>
        </div>
      </el-col>
    </el-row>



  </div>
</template>

<script>
import API from "@/api/api_dashboard";
import Pagination from '@/components/Pagination' 
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'



const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}


export default {
  name: 'DashboardAdmin',
  components: {
    // GithubCorner,
    PanelGroup,
    LineChart,
    // RaddarChart,
    PieChart,
    BarChart,
    // TransactionTable,
    // TodoList,
    // BoxCard,
    Pagination,
  },
  data() {
    return {
       lineChartData: {
             expectedData: [],
             actualData: [],
             weekDate:[]
       },
       listQuery:{
         page:1,
         limit:5
       },
       total:0,
       list:[],
       value:'当天',
       IndexInfo:{},
       memberCount:0,
       distriborCount:0,
       orderCount:0,
       Ordermonery:0,
       flag:false,
       countList:[],
       dataTime:'',
       barCharCount:[],
       barChartName:[]
    }
  },
  mounted(){
    let that = this;
    that.GetUserInfo();
    that.getUserMenber(1);
    that.getWeekData();
    that.weekData();
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },


    /**
     * 当天、当月、全部
     */
    SelectChange(e){
      let that= this;
      that.getUserMenber(e)

    },


    /**
     * 获取会员信息
     */
   async getUserMenber(index){
      let that = this;
      let params = {}
      let data = {
        dateBy:index
      }
     await that.Usermenber(data)
     await that.Distribor(data)
     await that.OrderNum(data)
     that.countList = ['会员', '推荐师', '订单']
     that.countinfoList = [{ value: that.memberCount, name: '会员' },{ value: that.distriborCount, name: '推荐师' },{ value: that.orderCount, name: '订单' }]
     that.flag = true;
    },

    //初始化时获取当前时间一周的数据
    weekData(){
       let that = this;
      // 获取当天 0 点的时间戳
      var timeStamp = (new Date()).getTime();
      // 一天是86400秒   故 7 天前的时间戳为
      var SevenDayAgo = timeStamp - 86400 * 7;
      that.dataTime = [SevenDayAgo,timeStamp]
      console.log("打印一下时间",that.dataTime)
      that.GetdateTimeData(SevenDayAgo,timeStamp)
    },

    //根据时间筛选数据
    cahngTime(e){
     let that = this;
     console.log("数据",e,that.dataTime)
     that.GetdateTimeData(that.dataTime[0],that.dataTime[1])
    },

    //获取时间周期数据
    async GetdateTimeData(beginTime,endTime){
      let that = this;
      let data = {
        beginTime:beginTime,
        endTime:endTime
      }
      let res = await API.GetToal(data)
      if(res.code == 0){
         that.barCharCount = [res.costAmount,res.paymoneyAmount,res.recommendAmount]
         that.barChartName = ['成本价','总金额','总佣金']
      }else{
         that.$message.error('抱歉网络开了个小差');
      }

    },

    //#endregion
    async Usermenber(data){
      let that = this;
      let res = await API.Usermenber(data)
      if(res.code == 0){
         that.memberCount = res.memberCount;
      }else{
        that.$message.error('抱歉网络开了个小差');
      }
    },

    async Distribor(data){
     let that = this;
     let res = await API.Distribor(data)
      if(res.code == 0){
          that.distriborCount = res.distriborCount;
        }else{
           that.$message.error('抱歉网络开了个小差');
        }
    },

    async OrderNum(data){
      let that = this;
      let res = await API.OrderNum(data)
      if(res.code == 0){
        that.orderCount = res.orderCount;
      }else{
        that.$message.error('抱歉网络开了个小差');
      }
    },




     GetData(fn){
      let that = this;
      let resData = {}
       fn.then(res => {
        if(res.code == 0){
          resData = res;
        }else{
           that.$message.error('抱歉网络开了个小差');
        }
      })
    },

    /**
     * 获取最新的用户数据
     */
    GetUserInfo(){
      let that = this;
      let data = {
         sort:'time',
         order:'desc',
         page:that.listQuery.page,
         limit:that.listQuery.limit
      }
      API.GetUserlist(data).then(res => {
        if(res != undefined){
            that.list = res.rows
            that.total = res.total
        }else{
            that.$message.error('抱歉网络开了个小差');
        }
      }).catch(err => {
        that.$message.error('抱歉网络开了个小差');
      })

    },


    /**
     * 获取一周的订单数据
     */
    getWeekData(){
      let that = this;
      API.OrderWeek().then(res => {
        // let time = [];
        let data = [];
        if(res.code == 0){
          res.orderWeekCounts.map(v => {
            // time.push(v.day)
            data.push(v.data)
          })
        }
        that.lineChartData.actualData = data
      }).catch(err => {
        that.$message.error('抱歉网络开了个小差');
      })
      API.UserMenberWeek().then(res => {
        let time = [];
        let data = [];
        if(res.code == 0){
          res.memberCount.map(v => {
            time.push(v.day)
            data.push(v.data)
          })
        }
        that.lineChartData.expectedData = data
        that.lineChartData.weekDate = time
      }).catch(err => {
      })
    },

  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
.select{
  width: 95px;
}
.DateTime{text-align: right;}
</style>
