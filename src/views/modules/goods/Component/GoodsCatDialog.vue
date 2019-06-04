
<template>
<!--用户等级新增,编辑分离-->
    <div>
    <section>
        <el-dialog title="分类新增" :visible.sync="AddShow">
        <el-form :model="AddData"  :rules="AddDatarules" ref="AddruleForm">
            <el-form-item label="分类名称" :label-width="formLabelWidth"  prop="name">
                <el-input v-model="AddData.name" placeholder="请输入内容" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="是否为根级" :label-width="formLabelWidth"  prop="root">
                <el-radio v-model="AddData.root" label="1"  @change = 'changeRadio'>是</el-radio>
                <el-radio v-model="AddData.root" label="2"  @change = 'changeRadio'>否</el-radio>
                <el-alert style="padding:0px" title="注：根级也就是设置初始等级" type="success"></el-alert>
            </el-form-item>
            <el-form-item label="父级Id" :label-width="formLabelWidth" prop="parentId" v-if="AddData.root == 2">
                <el-select v-model="AddData.parentId" >
                    <el-option
                        v-for="item in GoodsCatList"
                        :key="item.catId"
                        :label="item.name"
                        :value="item.catId">
                        <span style="float: left">{{ item.name }}</span>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="排序" :label-width="formLabelWidth" prop="sort">
                <el-input v-model="AddData.sort" placeholder="请输入内容" autocomplete="off"></el-input>
                <el-alert style="padding:0px" title="注：越大代表等级越高" type="success"></el-alert>
            </el-form-item>
            <el-form-item label="是否展示" :label-width="formLabelWidth"  prop="showed">
                <el-radio v-model="AddData.showed" label="1">是</el-radio>
                <el-radio v-model="AddData.showed" label="2">否</el-radio>
                <el-alert style="padding:0px" title="注：是否在前台小程序展示" type="success"></el-alert>
            </el-form-item>
            <el-form-item label="图片" :label-width="formLabelWidth" prop="img">
                <div class="avatar-uploader" @click="UpLoadShow(1,1,1)">
                    <img v-if="AddData.img" :src="AddData.img" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </div>
            </el-form-item>

            <el-form-item label="轮播图" :label-width="formLabelWidth"  prop="banner">
                <div class="avatar-uploader imagesBoxList" v-for="(item,index) in AddData.imagesList" :key="index" :index='index'>
                    <div  @click.stop="UpLoadShow(1,2,1.777,index)"><img :src="item.url" class="avatar boxImg"></div> 
                    <div class="inputBox"><span>商品Id:</span><el-input v-model="item.id"></el-input></div> 
                </div>
                <div class="avatar-uploader imagesBoxList" @click="UpLoadShow(1,2,1.777)">
                    <i class="el-icon-plus avatar-uploader-icon boxImg"></i>
                </div>
            </el-form-item>

            <el-form-item label="超赞图片" :label-width="formLabelWidth"  prop="offerImage">
                <div class="avatar-uploader"  @click="UpLoadShow(1,3,1)">
                    <div class="upLoad" v-if="offerImage.url">
                        <div class="ImgBox"><img  :src="offerImage.url" class="avatar"></div>
                    </div>
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </div>
                <div class="remarkBox"><span>商品Id</span><el-input v-model="offerImage.id"></el-input></div>
            </el-form-item> 

            <el-form-item label="分类描述" :label-width="formLabelWidth" prop="description">
                <el-input   type="textarea" :rows="2" placeholder="请输入内容" v-model="AddData.description" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="AddShow = false">取 消</el-button>
            <el-button type="primary" @click="addData">确 定</el-button>
            <el-button @click="resetForm('AddruleForm')">重置</el-button>
        </div>
        </el-dialog>
    </section>

    <!--商品分类添加-->
    <section>
        <el-dialog title="商品分类编辑" :visible.sync="EditShow" >
        <el-form :model="EdiData"  :rules="EdiDatarules"  ref="EditruleForm">
            <el-form-item label="分类名称" :label-width="formLabelWidth"  prop="name">
                <el-input v-model="EdiData.name" placeholder="请输入内容" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="是否为根级" :label-width="formLabelWidth"  prop="root">
                <el-radio v-model="EdiData.root" label="1"  @change = 'EditchangeRadio'>是</el-radio>
                <el-radio v-model="EdiData.root" label="2"  @change = 'EditchangeRadio'>否</el-radio>
                <el-alert style="padding:0px" title="注：根级也就是设置初始等级" type="success"></el-alert>
            </el-form-item>
            <el-form-item label="父级Id" :label-width="formLabelWidth" prop="parentId"  v-if="EdiData.root == 2">
                <!-- <el-input v-model="EdiData.parentId" placeholder="请输入内容" autocomplete="off"></el-input> -->
                <el-select v-model="EdiData.parentId" >
                    <el-option
                        v-for="item in GoodsCatList"
                        :key="item.catId"
                        :label="item.name"
                        :value="item.catId">
                        <span style="float: left">{{ item.name }}</span>
                        <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span> -->
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="排序" :label-width="formLabelWidth" prop="sort">
                <el-input v-model="EdiData.sort" placeholder="请输入内容" autocomplete="off"></el-input>
                <el-alert style="padding:0px" title="注：越大代表等级越高" type="success"></el-alert>
            </el-form-item>
            <el-form-item label="是否展示" :label-width="formLabelWidth"  prop="showed">
                <el-radio v-model="EdiData.showed" label="1">是</el-radio>
                <el-radio v-model="EdiData.showed" label="2">否</el-radio>
                <el-alert style="padding:0px" title="注：是否在前台小程序展示" type="success"></el-alert>
            </el-form-item>
            <el-form-item label="图片" :label-width="formLabelWidth" prop="img">
                <div class="avatar-uploader" @click="UpLoadShow(2,1,1)">
                    <img v-if="EdiData.img" :src="EdiData.img" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </div>
            </el-form-item>

            <el-form-item label="轮播图" :label-width="formLabelWidth"  prop="banner">
                <div class="avatar-uploader imagesBoxList" v-for="(item,index) in EdiData.imagesList" :key="index" :index='index'>
                    <div  @click="UpLoadShow(2,2,1.777,index)"><img :src="item.url" class="avatar boxImg"></div> 
                    <div class="inputBox"><span>商品Id:</span><el-input v-model="item.id"></el-input></div> 
                </div>
                <div class="avatar-uploader imagesBoxList" @click="UpLoadShow(2,2,1.777)">
                    <i class="el-icon-plus avatar-uploader-icon boxImg"></i>
                </div>
            </el-form-item>

            <el-form-item label="超赞图片" :label-width="formLabelWidth"  prop="offerImage">

                <div class="avatar-uploader"   @click="UpLoadShow(2,3,1)">
                    <div class="upLoad" v-if="offerImage.url">
                        <div class="ImgBox"><img  :src="offerImage.url" class="avatar"></div>
                    </div>
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </div>
                <div class="remarkBox"><span>商品Id</span><el-input v-model="offerImage.id"></el-input></div>
            </el-form-item> 

            <el-form-item label="分类描述" :label-width="formLabelWidth" prop="description">
                <el-input   type="textarea" :rows="2" placeholder="请输入内容" v-model="EdiData.description" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="EditShow = false">取 消</el-button>
            <el-button type="primary" @click="editData">确 定</el-button>
        </div>
        </el-dialog>
    </section>
    <!--商品分类编辑-->

    <Uploadimg ref='UploadImg' @GetDataImg='GetDataImg' :type='ImgType' :proportion='proportion'/>
    <!--图片上传 end-->
    </div>
</template>
<script>
import API from "@/api/goods";
import Uploadimg from "@/components/UpLoadImg/UpLoadImg";
export default {
    props:{
      GoodsCatList:{
          type:Array,
          default:[]
      }
    },
    watch:{
    },
    components:{Uploadimg},
    data () {
        return {
           AddShow:false,
           EditShow:false,
           ImgType:0, //设置图片类型
           proportion:1, //设置图片比例
           IMAGE_iNDEX:1, //是删除还是编辑的标识
           selectIndex:1,
           imageIndex:'',
           AddData:{
           parentId:'',
           root:'2',
           img:'',
           banner:'',
           offerImage:'',
           imagesList:[]
           },
           offerImage:{url:'',id:''},
           EdiData:{
            parentId:'',
            root:'2',
            img:'',
            banner:'',
            offerImage:{url:'',id:''},
            imagesList:[]
           },
           formLabelWidth:'120px',
           AddDatarules:{
             name:[
                { required: true, message: '等级名称', trigger: 'blur' },
             ],
             root:[
                { required: true, message: '请设置根级', trigger: 'blur' },
             ],
             parentId:[
                { required: true, message: '请设置父级', trigger: 'blur' },
             ],
             sort:[
                { required: true, message: '请设置排序', trigger: 'blur' },
             ],
             showed:[
                { required: true, message: '请设置是否展示', trigger: 'blur' },
             ],
             img:[
                { required: true, message: '请设置分类图片', trigger: 'blur' },
             ],
             imagesList:[
                { required: true, message: '请设置轮播图片', trigger: 'blur' },
             ],
             description:[
                { required: true, message: '请设置描述', trigger: 'blur' },
             ],
           },
           EdiDatarules:{
             name:[
                { required: true, message: '等级名称', trigger: 'blur' },
             ],
             root:[
                { required: true, message: '请设置根级', trigger: 'blur' },
             ],
             parentId:[
                { required: true, message: '请设置父级', trigger: 'blur' },
             ],
             sort:[
                { required: true, message: '请设置排序', trigger: 'blur' },
             ],
             showed:[
                { required: true, message: '请设置是否展示', trigger: 'blur' },
             ],
             img:[
                { required: true, message: '请设置分类图片', trigger: 'blur' },
             ],
             banner:[
                { required: true, message: '请设置轮播图片', trigger: 'blur' },
             ],
             description:[
                { required: true, message: '请设置描述', trigger: 'blur' },
             ],
           }
        }
    },
    methods: {
        //添加用户的等级
        addData(){
            let that = this;
            that.AddData.banner = JSON.stringify(that.AddData.imagesList);
            that.AddData.offerImage = JSON.stringify(that.offerImage);
            this.$refs['AddruleForm'].validate((valid) => {
            if (valid) {
                API.AddGoodsCat(that.AddData).then(res => {
                    if(res.code == 0){
                        that.$message({ message: '添加成功', type: 'success'});
                        that.$parent.GetGoodsCatList();
                        that.AddShow = false
                        // that.AddData = {
                        //     img:'',
                        //     parentId:'',
                        //     root:'2'
                        // }
                    }else{
                    that.$message.error('添加失败');
                    }
                }).catch(err => {})
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },

        //编辑用户等级EditruleForm
        editData(){
            let that = this;
           that.EdiData.banner = JSON.stringify(that.EdiData.imagesList);
            that.EdiData.offerImage = JSON.stringify(that.offerImage);
            this.$refs['EditruleForm'].validate((valid) => {
            if (valid) {
                API.UpdataGoodsCat(that.EdiData).then(res => {
                    if(res.code == 0){
                        that.$message({message:'编辑成功',type:'success'})
                        that.$parent.GetGoodsCatList();
                        that.EditShow = false;
                    }else{
                        that.$message.error('添加失败');                    
                    }
                }).catch(err => {})
            } else {
                console.log('error submit!!');
                return false;
            }
            });            
        },

        //选择父级
        changeRadio(){
            this.AddData.root == 1 ? this.AddData.parentId = '0' : this.AddData.parentId = ''
        },

        //编辑选择父级
        EditchangeRadio(){
            this.EdiData.root == 1 ? this.EdiData.parentId = '0' : this.EdiData.parentId = ''           
        },

        //添加显示
        DiaLogShow(val){
            this.AddShow = val;
            // this.AddData.imagesList = [];
            this.resetForm('AddruleForm');
        },

        resetForm(formName) {
          this.$refs[formName].resetFields();
        },

        //编辑显示
        EditDiaLogShow(val,row){
            this.EditShow = val;
            row.root = row.root+''
            row.parentId = row.parentId*1
            row.showed = row.showed+''
            this.EdiData = Object.assign({},row);
            this.$set(this.EdiData,'img',row.img);
            this.$set(this.EdiData,'imagesList',JSON.parse(this.EdiData.banner));
            // this.$set(this.EdiData,'offerImage',);
            this.offerImage = JSON.parse(row.offerImage)
        },

        //显示图片上传框 type:上传图片的类型 proportion:上传图片的比例 IMAGE_iNDEX:是删除还是编辑的标识
        UpLoadShow(seleindex,type,proportion,IMAGE_iNDEX){
            this.ImgType = type;
            this.proportion = proportion;
            this.selectIndex = seleindex;
            IMAGE_iNDEX != undefined ? this.imageIndex = IMAGE_iNDEX : this.imageIndex = undefined
            this.$refs.UploadImg.showDialog(true)
        },

        //图片赋值
        //图片返回赋值
        GetDataImg(ImgUrl){
            let that = this;
            if(this.selectIndex == 1){
                switch (that.ImgType) {
                    case 1:
                        that.AddData.img = ImgUrl;
                        break;
                    case 2:
                        that.imageIndex == undefined ? that.AddData.imagesList.push({url:ImgUrl,id:''}) : that.AddData.imagesList[that.imageIndex].url = ImgUrl;
                        break;
                    case 3:
                        that.offerImage.url = ImgUrl;
                        break;                                
                    default:
                        break;
                }
            }else if(this.selectIndex == 2){
                switch (that.ImgType) {
                    case 1:
                        that.EdiData.img = ImgUrl;
                        break;
                    case 2:
                        that.imageIndex == undefined ? that.EdiData.imagesList.push(ImgUrl) : this.$set(that.EdiData.imagesList,that.imageIndex,ImgUrl)
                        that.EdiData.banner = that.EdiData.imagesList.join(',');
                        break;
                    case 3:
                        // that.offerImage.url = ImgUrl;
                        // that.$set(that.EdiData.offerImage,'url',ImgUrl)
                        break;                                
                    default:
                        break;
                }
            }
        }
    }
}
</script>
<style scoped>
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
