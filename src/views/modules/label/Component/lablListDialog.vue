<template>
   <div>
       <section>
            <el-dialog title="添加标签" :visible.sync="AddShow">
                 <el-form :model="AddData"  :rules="AddDatarules">
                    <el-form-item label="标签名称" :label-width="formLabelWidth"  prop="labelName">
                        <el-input v-model="AddData.labelName" placeholder="请输入内容" autocomplete="off"></el-input>
                    </el-form-item>
                 </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="AddShow = false">取 消</el-button>
                    <el-button type="primary" @click="addData">确 定</el-button>
                </div>
            </el-dialog>
       </section>

        <section>
            <el-dialog title="添加标签" :visible.sync="EditShow">
                 <el-form :model="EditData"  :rules="EditDatarules">
                    <el-form-item label="标签名称" :label-width="formLabelWidth"  prop="labelName">
                        <el-input v-model="EditData.labelName" placeholder="请输入内容" autocomplete="off"></el-input>
                    </el-form-item>
                 </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="EditShow = false">取 消</el-button>
                    <el-button type="primary" @click="UpdataEditData">确 定</el-button>
                </div>
            </el-dialog>
       </section>
   </div>    
</template>
<script>
import API from "@/api/label";

export default {
    data (){
        return {
            AddShow:false,
            EditShow:false,
            formLabelWidth:'120px',
            AddData:{
                labelName:''
            },
            EditData:{
                id:'',
                labelName:''
            },
            name:'',
            AddDatarules:{
                labelName:[
                { required: true, message: '设置标签商品', trigger: 'blur' },
               ],
            },
            EditDatarules:{
                labelName:[
                { required: true, message: '设置标签商品', trigger: 'blur' },
               ],                
            }
        }
    },
    methods:{
        //添加标签
        addData(){
            let that = this;
            API.lablListSave(that.AddData).then((result) => {
                if(result.code == 0){
                    that.AddShow = false;
                    that.AddData = {}
                    that.$parent.GetLabelList();
                    that.$message({ message: '添加成功', type: 'success'});
                }else{
                    that.$message.error('添加失败');                    
                }
            }).catch((err) => {
                    that.$message.error('添加失败');                       
            });
        },

        //重新编辑标签
        UpdataEditData(){
            let that = this;
            API.UpdataLabel(that.EditData).then(res => {
                if(res.code == 0){
                    that.EditShow = false;
                    that.EditData = {}
                    that.$parent.GetLabelList();
                    that.$message({ message: '编辑成功', type: 'success'});                    
                }else{
                    that.$message.error('编辑失败');                          
                }
            }).catch(err => {
                that.$message.error('编辑失败');                    
            })
        },

        //添加显示
        DiaLogShow(val,row){
            this.AddShow = val;
            // this.name = row.goodName;
            // this.$set(this.AddData,'goodId',row.goodId);
        },

        //编辑显示
        EditDiaLogShow(val,row){
            this.EditShow = val;
            this.EditData.id = row.id;
            this.EditData.labelName = row.labelName;
        },
    }
}
</script>
<style scoped>

</style>
