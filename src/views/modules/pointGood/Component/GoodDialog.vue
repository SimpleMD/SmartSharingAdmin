<template>
   <div>
       <section>
            <el-dialog title="修改转入积分商品" :visible.sync="AddShow">
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
                id:'',
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
            console.log("美滋滋",that.AddData)
            API.EditPointGood(that.AddData).then(res => {
                if(res.code == 0){
                    that.AddShow = false;
                    that.AddData = {};
                    that.$parent.GetGoodsList();
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
            console.log("你好史学家",row)
            this.name = row.goodName;
            this.AddData.id = row.id;
            this.AddData.buyIntegral = row.buyIntegral;
        },
    }
}
</script>
<style scoped>

</style>
