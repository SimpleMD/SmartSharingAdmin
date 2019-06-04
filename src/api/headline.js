import * as API from '.'
export default {
    //创建头条
    headlineListSave:params=>{
        return API.POST('/advertisement/headLine/save',params)
      },

    //获取头条列表
    Getheadline:params=>{
      return API.GET('/advertisement/headLine/list',params)               
    },
    
    //头条修改
    Updataheadline:params => {
      return API.PUT('/advertisement/headLine/update',params)
    },

    //头条删除
    Deleteheadline:params => {
      return API.DELETE('/advertisement/headLine/remove',params)
    },

}