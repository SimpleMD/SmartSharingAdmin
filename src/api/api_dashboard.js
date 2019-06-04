import * as API from './'

export default {
    /**
     * 获取会员数量
     * params：参数
     */
    Usermenber: params=>{
        return API.GET('/member/statistic/member/count',params)
      },

    /**
     * 获取会员一周的数据变化
     * params：参数
     */
     UserMenberWeek: params => {
        return API.GET('/member/statistic/count/week')
     },


    /**
     * 获取推荐师数量
     * params：参数
     */
    Distribor: params=>{
        return API.GET('/member/statistic/distribor/count',params)
      },   
    
    /**
     * 获取推荐师展现金额
     * params：参数
     */

    Distribormoney: params=>{
        return API.GET('/member/statistic/distribor/withdrawAmount',params)
      },
    
    /**
     * 获取订单数量
     * params:参数
     */
    OrderNum: params=>{
        return API.GET('/order/statistic/count',params)
    },

    /**
     * 获取订单金额
     * params:参数
     */
    Ordermonery: params=>{
        return API.GET('/order/statistic/amount',params)
    },

    
    /**
     * 获取一周的订单数量
     * params:参数  
     */
    OrderWeek:params => {
        return API.GET('/order/statistic/count/week')
    },

    /**
     * 获取最新加入的会员
     * params:参数
     */
    GetUserlist:params => {
        return API.GET('/memebr/member/list',params)
    },

    /**
     * 获取年天月的金额汇总
     * params:参数
     */
    GetToal:params =>{
        return API.GET('/order/statistic/shopOrder',params)
    }

}