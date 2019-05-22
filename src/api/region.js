import * as API from '.'
export default {
    //创建区域
    regionListSave:params=>{
        return API.POST('/good/region/save',params)
      },

    //获取区域列表
    Getregion:params=>{
      return API.GET('/good/region/list',params)               
    },
    
    //区域修改
    UpdataRegion:params => {
      return API.PUT('/good/region/update',params)
    },

    //区域删除
    DeleteRegion:params => {
      return API.DELETE('/good/region/remove',params)
    },

}