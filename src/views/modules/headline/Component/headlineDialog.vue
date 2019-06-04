<template>
   <div>
       <section>
            <el-dialog title="添加头条" :visible.sync="AddShow">
                 <el-form :model="AddData"  :rules="AddDatarules">
                    <el-form-item label="标题" :label-width="formLabelWidth"  prop="name">
                        <el-input v-model="AddData.name"  placeholder="请输入内容" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="内容" :label-width="formLabelWidth"  prop="value">
                        <!-- <el-input v-model="AddData.buyIntegral" placeholder="请输入内容" autocomplete="off"></el-input> -->
                        <el-input v-model="AddData.value" type="textarea" :rows="2" placeholder="请输入内容"></el-input>
                    </el-form-item>
                 </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="AddShow = false">取 消</el-button>
                    <el-button type="primary" @click="addData">确 定</el-button>
                </div>
            </el-dialog>
       </section>

        <section>
            <el-dialog title="添加头条" :visible.sync="EditShow">
                 <el-form :model="EditData"  :rules="EditDatarules">
                    <el-form-item label="标题" :label-width="formLabelWidth"  prop="name">
                        <el-input v-model="EditData.name"  placeholder="请输入内容" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="内容" :label-width="formLabelWidth"  prop="value">
                        <!-- <el-input v-model="AddData.buyIntegral" placeholder="请输入内容" autocomplete="off"></el-input> -->
                        <el-input v-model="EditData.value" type="textarea" :rows="2" placeholder="请输入内容"></el-input>
                    </el-form-item>
                 </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="AddShow = false">取 消</el-button>
                    <el-button type="primary" @click="UpEditData">确 定</el-button>
                </div>
            </el-dialog>
       </section>
   </div>    
</template>
<script>
import API from "@/api/headline";
export default {
    data (){
        return {
            AddShow:false,
            EditShow:false,
            formLabelWidth:'120px',
            AddData:{
                name:'',
                value:'',
            },
            EditData:{
                name:'',
                value:'',   
            },
            name:'',
            AddDatarules:{
                name:[
                { required: true, message: '设置标题', trigger: 'blur' },
               ],
                value:[
                { required: true, message: '设置值', trigger: 'blur' },
               ],
            },
            EditDatarules:{
                name:[
                { required: true, message: '设置标题', trigger: 'blur' },
               ],
                value:[
                { required: true, message: '设置值', trigger: 'blur' },
               ],
            },
        }
    },
    methods:{
        addData(){
            let that = this;
            API.headlineListSave(that.AddData).then(res => {
                if(res.code == 0){
                    that.AddShow = false;
                    that.AddData = {};
                    that.$parent.GetDataList();
                    that.$message({message:'添加成功',type:'success'})
                }else{
                    that.$message.error('添加失败');   
                }
            }).catch(err => {
                    that.$message.error('添加失败');   
            })
        },

        UpEditData(){
            let that = this;
            API.Updataheadline(that.EditData).then(res => {
                if(res.code == 0){
                    that.EditShow = false;
                    that.EditData = {};
                    that.$parent.GetDataList();
                    that.$message({message:'修改成功',type:'success'})
                }else{
                    that.$message.error('修改失败');   
                }
            }).catch(err => {
                    that.$message.error('修改失败');   
            })
        },

        //添加显示
        DiaLogShow(val,row){
            this.AddShow = val;
        },

        //添加显示
        EditDiaLogShow(val,row){
            this.EditShow = val;
            console.log("查看一下穿过的值",row)
            this.EditData = Object.assign({},row);
        },
    }
}
</script>
<style scoped>

</style>
