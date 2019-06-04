<template>
   <div>
       <section>
            <el-dialog title="转入积分商品" :visible.sync="AddShow">
                 <el-form :model="AddData"  :rules="AddDatarules">
                    <el-form-item label="商品名称" :label-width="formLabelWidth"  prop="goodId">
                        <el-input v-model="name" :disabled='true' placeholder="请输入内容" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="设置积分数额" :label-width="formLabelWidth"  prop="buyIntegral">
                        <el-input v-model="AddData.buyIntegral" placeholder="请输入内容" autocomplete="off"></el-input>
                    </el-form-item>

                 </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="AddShow = false">取 消</el-button>
                    <el-button type="primary" @click="addData">确 定</el-button>
                </div>
            </el-dialog>
       </section>
   </div>    
</template>
<script>
import API from "@/api/point";
export default {
    data (){
        return {
            AddShow:false,
            formLabelWidth:'120px',
            AddData:{
                goodId:'',
                buyIntegral:0,
            },
            name:'',
            AddDatarules:{
                goodId:[
                { required: true, message: '设置商品', trigger: 'blur' },
               ],
                buyIntegral:[
                { required: true, message: '设置', trigger: 'blur' },
               ],
            },

        }
    },
    methods:{
        //转入一分钱抢
        addData(){
            let that = this;
            API.SavaPointGood(that.AddData).then(res => {
                if(res.code == 0){
                    that.AddShow = false;
                    that.AddData = {};
                    that.$message({message:'转入成功',type:'success'})
                }else{
                    that.$message.error('转入失败');   
                }
            }).catch(err => {
                    that.$message.error('转入失败');   
            })
        },

        //添加显示
        DiaLogShow(val,row){
            this.AddShow = val;
            this.name = row.goodName;
            this.$set(this.AddData,'goodId',row.goodId);
        },
    }
}
</script>
<style scoped>

</style>
