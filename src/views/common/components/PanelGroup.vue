<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <!-- <svg-icon icon-class="people" class-name="card-panel-icon" /> -->
          <icon-svg name="people" class-name="card-panel-icon"/>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">会员总数</div>
          <count-to :start-val="0" :end-val="memberCount" :duration="2600" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <div class="card-panel-icon-wrapper icon-message">
          <!-- <svg-icon icon-class="eye" class-name="card-panel-icon" /> -->
          <icon-svg name="eye" class-name="card-panel-icon"/>          
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">推荐师总数</div>
          <count-to :start-val="0" :end-val="distriborCount" :duration="3000" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper icon-money">
          <!-- <svg-icon icon-class="money" class-name="card-panel-icon" /> -->
          <icon-svg name="money" class-name="card-panel-icon"/>  
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">订单总金额</div>
          <count-to :start-val="0" :end-val="Ordermonery" :duration="3200" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-shopping">
          <!-- <svg-icon icon-class="shopping" class-name="card-panel-icon" /> -->
          <icon-svg name="shopping" class-name="card-panel-icon"/>  
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">订单数量</div>
          <count-to :start-val="0" :end-val="orderCount" :duration="3600" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import API from "@/api/api_dashboard";
export default {

    data() {
    return {
       memberCount:0,
       distriborCount:0,
       orderCount:0,
       Ordermonery:0
    }
  },

  components: {
    CountTo
  },
  mounted(){
    this.getUserMenber();
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    },
        /**
     * 获取会员信息
     */
    getUserMenber(){
      let that = this;
      let data = {
        dateBy:3
      }
     API.Usermenber(data).then(res => {
        if(res.code == 0){
          that.memberCount = res.memberCount;
        }else{
           that.$message.error('抱歉网络开了个小差');
        }
      }).catch(err => {
        that.$message.error('抱歉网络开了个小差');
      })

     API.Distribor(data).then(res => {
        if(res.code == 0){
          that.distriborCount = res.distriborCount;
        
        }else{
           that.$message.error('抱歉网络开了个小差');
        }
      }).catch(err => {
        that.$message.error('抱歉网络开了个小差');
      })

      API.OrderNum(data).then(res => {
        if(res.code == 0){
          that.orderCount = res.orderCount;
        }else{
           that.$message.error('抱歉网络开了个小差');
        }
      }).catch(err => {
        that.$message.error('抱歉网络开了个小差');
      })

      API.Ordermonery(data).then(res => {
        if(res.code == 0){
         that.Ordermonery = res.orderAmount;
        }else{
           that.$message.error('抱歉网络开了个小差');
        }
      }).catch(err => {
        that.$message.error('抱歉网络开了个小差');
      })
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col{
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
         background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shopping {
        background: #34bfa3
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shopping {
      color: #34bfa3
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>
