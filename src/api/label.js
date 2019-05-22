import * as API from '.'
export default {
    //创建标签
    lablListSave:params=>{
        return API.POST('/member/tag/save',params)
      },

    //获取标签列表
    GetLabel:params=>{
      return API.GET('/member/tag/list',params)
    },
    
    //标签修改
    UpdataLabel:params => {
      return API.PUT('/member/tag/update',params)
    },

    //标签删除
    DeleteLabel:params => {
      return API.DELETE('/member/tag/remove',params)
    },

}