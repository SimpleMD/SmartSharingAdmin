<template>
   <div>
       <section>
            <el-dialog title="添加区域" :visible.sync="AddShow">
                 <el-form :model="AddData"  :rules="AddDatarules">
                    <el-form-item label="区域名称" :label-width="formLabelWidth"  prop="name">
                        <el-input v-model="AddData.name" placeholder="请输入内容" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="图片" :label-width="formLabelWidth"  prop="value">
                        <div class="avatar-uploader" @click="UpLoadShow(1,1,1)">
                            <img v-if="AddData.value" :src="AddData.value" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </div>
                    </el-form-item>
                    <el-form-item label="轮播图" :label-width="formLabelWidth"  prop="description">
                        <div class="avatar-uploader imagesBoxList" v-for="(item,index) in AddData.imagesList" :key="index" :index='index'>
                           <div  @click.stop="UpLoadShow(1,2,1.777,index)"><img :src="item.url" class="avatar boxImg"></div> 
                           <div class="inputBox"><span>商品Id:</span><el-input v-model="item.id"></el-input></div> 
                        </div>
                        <div class="avatar-uploader imagesBoxList" @click="UpLoadShow(1,2,1.777)">
                           <i class="el-icon-plus avatar-uploader-icon boxImg"></i>
                        </div>
                    </el-form-item>
                    <el-form-item label="超赞图片" :label-width="formLabelWidth"  prop="remarks">
                        <div class="avatar-uploader"  @click="UpLoadShow(1,3,1)">
                            <div class="upLoad" v-if="AddData.remarks.url">
                                <div class="ImgBox"><img  :src="AddData.remarks.url" class="avatar"></div>
                            </div>
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </div>
                        <div class="remarkBox"><span>商品Id</span><el-input v-model="AddData.remarks.id"></el-input></div>
                    </el-form-item>                    
                    <el-form-item label="排序" :label-width="formLabelWidth"  prop="sort">
                        <el-input v-model="AddData.sort" placeholder="请输入内容" autocomplete="off"></el-input>
                    </el-form-item>
                 </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="AddShow = false">取 消</el-button>
                    <el-button type="primary" @click="addData">确 定</el-button>
                </div>
            </el-dialog>
       </section>

        <section>
            <el-dialog title="编辑区域" :visible.sync="EditShow">
                 <el-form :model="EditData"  :rules="EditDatarules">
                    <el-form-item label="区域名称" :label-width="formLabelWidth"  prop="name">
                        <el-input v-model="EditData.name" placeholder="请输入内容" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="图片" :label-width="formLabelWidth"  prop="value">
                        <div class="avatar-uploader" @click="UpLoadShow(2,2,1)">
                            <img v-if="EditData.value" :src="EditData.value" class="avatar"  width="55">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </div>
                    </el-form-item>
                    <el-form-item label="轮播图" :label-width="formLabelWidth"  prop="description">
                        <div class="avatar-uploader imagesBoxList" v-for="(item,index) in EditData.imagesList" :key="index" :index='index'>
                           <div  @click="UpLoadShow(2,2,1.777,index)"><img :src="item.url" class="avatar boxImg"></div> 
                           <div class="inputBox"><span>商品Id:</span><el-input v-model="item.id"></el-input></div> 
                        </div>
                        <div class="avatar-uploader imagesBoxList" @click="UpLoadShow(2,2,1.777)">
                           <i class="el-icon-plus avatar-uploader-icon boxImg"></i>
                        </div>
                    </el-form-item>
                    <el-form-item label="超赞图片" :label-width="formLabelWidth"  prop="remarks">
                        <div class="avatar-uploader"   @click="UpLoadShow(2,3,1)">
                            <div class="upLoad" v-if="EditData.remarks.url">
                                <div class="ImgBox"><img  :src="EditData.remarks.url" class="avatar"></div>
                            </div>
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </div>
                        <div class="remarkBox"><span>商品Id</span><el-input v-model="EditData.remarks.id"></el-input></div>
                    </el-form-item>    
                    <el-form-item label="排序" :label-width="formLabelWidth"  prop="sort">
                        <el-input v-model="EditData.sort" placeholder="请输入内容" autocomplete="off"></el-input>
                    </el-form-item>
                 </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="EditShow = false">取 消</el-button>
                    <el-button type="primary" @click="UpdataEditData">确 定</el-button>
                </div>
            </el-dialog>
       </section>

        <Uploadimg ref='UploadImg' @GetDataImg='GetDataImg' :type='ImgType' :proportion='proportion'/>
    <!--图片上传 end-->
   </div>    
</template>
<script>
import API from "@/api/region";
import Uploadimg from "@/components/UpLoadImg/UpLoadImg";
export default {
    components:{Uploadimg},
    data (){
        return {
            AddShow:false,
            EditShow:false,
            formLabelWidth:'120px',
            AddData:{
                name:'',
                value:'',
                remarks:{url:'',id:''},
                imagesList:[]
            },
            EditData:{
                id:'',
                name:'',
                value:'',
                remarks:{url:'',id:''},
                imagesList:[]
            },
            name:'',
            AddDatarules:{
                name:[
                { required: true, message: '设置标签商品', trigger: 'blur' },
               ],
                value:[
                { required: true, message: '设置标签商品', trigger: 'blur' },
                ],
                sort:[
                { required: true, message: '设置标签商品', trigger: 'blur' },
                ],
                description:[
                { required: true, message: '设置标签商品', trigger: 'blur' },
                ],
            },
            EditDatarules:{
                name:[
                { required: true, message: '设置标签商品', trigger: 'blur' },
               ],
                value:[
                { required: true, message: '设置标签商品', trigger: 'blur' },
                ],
                sort:[
                { required: true, message: '设置标签商品', trigger: 'blur' },
                ],
                description:[
                { required: true, message: '设置标签商品', trigger: 'blur' },
                ],              
            },
            imageIndex:'',
            ImgType:1,
            proportion:1,
            selectIndex:1
        }
    },
    methods:{
        //添加区域
        addData(){
            let that = this;
            that.AddData.description = JSON.stringify(that.AddData.imagesList);
            that.AddData.remarks = JSON.stringify(that.AddData.remarks);
            API.regionListSave(that.AddData).then((result) => {
                if(result.code == 0){
                    that.AddShow = false;
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
            that.EditData.description = JSON.stringify(that.EditData.imagesList);
            that.EditData.remarks = JSON.stringify(that.EditData.remarks);
            API.UpdataRegion(that.EditData).then(res => {
                if(res.code == 0){
                    that.EditShow = false;
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
        },

        //编辑显示
        EditDiaLogShow(val,row){
            this.EditShow = val;
            this.EditData.id = row.id;
            this.EditData = Object.assign({},row);

            this.$set(this.EditData,'imagesList',JSON.parse(this.EditData.description));
            this.$set(this.EditData,'value',this.EditData.value);

            this.$set(this.EditData,'remarks',JSON.parse(this.EditData.remarks));
            // this.EditData.labelName = row.labelName;
        },

        //显示图片上传框 type:上传图片的类型 proportion:上传图片的比例 IMAGE_iNDEX:轮播图时修改指定图片的下标
        UpLoadShow(seleindex,type,proportion,IMAGE_iNDEX){
            this.ImgType = type;
            this.proportion = proportion;
            this.selectIndex = seleindex;
            IMAGE_iNDEX != undefined ? this.imageIndex = IMAGE_iNDEX : this.imageIndex = undefined
            this.$refs.UploadImg.showDialog(true)
        },

        //图片返回赋值
        GetDataImg(ImgUrl){
            let that = this;
            if(this.selectIndex == 1){
                switch (that.ImgType) {
                    case 1:
                        that.AddData.value = ImgUrl;
                        break;
                    case 2:
                        that.imageIndex == undefined ? that.AddData.imagesList.push({url:ImgUrl,id:''}) : that.AddData.imagesList[that.imageIndex].url = ImgUrl;
                        break;
                    case 3:
                        that.AddData.remarks.url = ImgUrl;
                        break;                                
                    default:
                        break;
                }
            }else if(this.selectIndex == 2){
                switch (that.ImgType) {
                    case 1:
                        that.EditData.value = ImgUrl;
                        break;
                    case 2:
                        that.imageIndex == undefined ? that.EditData.imagesList.push({url:ImgUrl,id:''}) : that.EditData.imagesList[that.imageIndex].url = ImgUrl;
                        break;
                    case 3:
                        that.$set(that.EditData.remarks,'url',ImgUrl)
                        break;                                
                    default:
                        break;
                }
            }
        }
    }
}
</script>
<style >
.avatar-uploader{
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    display: inline-block;
}
.avatar-uploader .avatar-uploader-icon,.avatar-uploader img{
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar-uploader .boxImg{
    display: inline-block;height: 189px;width: 336px;
}
.generateSn{
    display: flex;
    align-items: center;
}

.imagesBoxList{
    position: relative;
    display: inline-block;height: 189px;width: 336px;
}

.remarkBox{
    display: flex;align-items: center;
}
.remarkBox span{width: 5rem;}

.inputBox{
    display: flex;align-items: center;width: 100%;position: absolute;top: 0;left: 0;background: rgba(204, 204, 204, 0.4);
}
.inputBox span{color: #fff;width:5rem;text-align: center;}

.YongMoney{
    display: flex;align-items: center;
}
.FlexWarp{
    display: flex;
    align-items: center;
}
.bookTime{}
</style>