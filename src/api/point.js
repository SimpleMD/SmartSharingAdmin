import * as API from './'
export default {
    //获取积分列表
    GetPointGoodList:params => {
        return API.GET('/good/integralGood/list',params)
    },

    //删除指定列表
    RemovePointGood:params => {
        return API.DELETE('/good/integralGood/remove',params)
    },

    //批量删除
    batchRemovePointGood:params => {
        return API.DELETE('/good/integralGood/batchRemove',params)
    },

    //编辑积分商品
    EditPointGood:params => {
        return API.PUT('/good/integralGood/update',params)   
    },

    //转入积分商品
    SavaPointGood:params => {
        return API.POST('/good/good/integral',params)
    }
   
}