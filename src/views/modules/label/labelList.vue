<template>
    <div>
        <el-button type="success"  icon="el-icon-plus" @click="AddLabel">标签新增</el-button>
        <el-col :span="24" v-loading="loading"  element-loading-text="正在查询中。。。" >
          <el-table ref="multipleTable" :data="LabelData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column align="center" prop="id"  label="标签ID"></el-table-column>
            <el-table-column align="center" prop="labelName"  label="标签名"></el-table-column>
            <el-table-column  align="center" label="操作" width="220" class-name="small-padding fixed-width">
             <template slot-scope="scope">
                <!-- <el-button type="success"  size="mini" icon="el-icon-plus" @click="handYi(scope.$index,scope.row)"></el-button> -->
                <el-button type="primary" size="mini" @click="handlEdit(scope.$index,scope.row)">编辑</el-button>
                <el-button type="danger" size="mini" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
             </template>
          </el-table-column>
          </el-table>
        </el-col>
        <DialogModel ref="DialogModel"/>
    </div>    
</template>
<script>
import API from '@/api/label'
import DialogModel from './Component/lablListDialog'
export default {
    components:{DialogModel},
    data () {
        return {
          loading:false,
          listQuery:{
            page: 1,
            limit: 10,
          },
          total:0,
          LabelData:[]
        }
    },
    mounted () {
       this.GetLabelList();
    },
    methods: {
      //添加商品分类
      AddLabel(){
        let that = this;
        this.$refs.DialogModel.DiaLogShow(true)
      },

      handleDelete(index,row){
        let that = this;
        this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {confirmButtonText: '确定',cancelButtonText: '取消', type: 'warning'
        }).then(() => {
            API.DeleteLabel({id:row.id}).then((res) => {
              if(res.code == 0){
                that.GetLabelList();
                this.$message({ message: '删除成功', type: 'success'});
              }else{
                this.$message.error('删除失败');            
              }
            }).catch((err) => {
                this.$message.error('删除失败');
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });        
          that.loading = false;  
        });
      },

      //商品编辑
      handlEdit(index,row){
        let that = this;
        this.$refs.DialogModel.EditDiaLogShow(true,row);    
      },

      handleSelectionChange(){
        let that = this;

      },

      //标签列表
      GetLabelList(){
        let that = this;
        API.GetLabel(that.listQuery).then((res) => {
          if(res != undefined){
            that.LabelData = res.rows;
            that.total = res.total;
          }
          console.log(that.LabelData,"你好世界")
        }).catch((err) => {
           this.$message.error('抱歉网络错误');
        });
      },
    }
}
</script>
<style scoped>

</style>
