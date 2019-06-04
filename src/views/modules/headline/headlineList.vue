<template>
  <div>
        <el-button type="success"  icon="el-icon-plus" @click="handlSave">头条新增</el-button>
        <el-col :span="24" v-loading="loading"  element-loading-text="正在查询中。。。" >
            <el-table ref="multipleTable" :data="dataList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column align="center" prop="id"  label="ID"></el-table-column>
                <el-table-column align="center" prop="name"  label="标题"></el-table-column>
                <el-table-column align="center" prop="value"  label="内容"></el-table-column>
                <el-table-column  align="center" label="操作" width="220" class-name="small-padding fixed-width">
                    <template slot-scope="scope">
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
import API from '@/api/headline'
import DialogModel from './Component/headlineDialog'
export default {
    components:{DialogModel},
    data () {
        return {
            loading:false,
            dataList:[],
            listQuery:{
            page: 1,
            limit: 10,
          },
        }
    },
    mounted () {
      this.GetDataList();
    },
    methods: {
        GetDataList(){
            let that = this;
            API.Getheadline(that.listQuery).then((res) => {
                if(res != undefined){
                  that.dataList = res.rows;
                }else{
                this.$message.error('获取失败');                    
                }
            }).catch((err) => {
                this.$message.error('获取失败');
            });
        },
        handlSave(){
            let that = this;
            this.$refs.DialogModel.DiaLogShow(true);
        },

        handlEdit(index,row){
            let that = this;
            this.$refs.DialogModel.EditDiaLogShow(true,row);  
        },



      handleDelete(index,row){
        let that = this;
        this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {confirmButtonText: '确定',cancelButtonText: '取消', type: 'warning'
        }).then(() => {
            API.Deleteheadline({id:row.id}).then((res) => {
              if(res.code == 0){
                that.GetDataList();
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

      handleSelectionChange(){

      },
    }
}
</script>
<style scoped>

</style>
