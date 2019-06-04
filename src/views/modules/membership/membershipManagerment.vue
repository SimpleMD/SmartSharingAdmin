<template>
  <div class="membershipManagerment">
    <el-row :gutter="24">
       <el-col :span="24">
          <el-input v-model="listQuery.searchParam" style="width:180px;" placeholder="请输入用户名搜索"></el-input> 
          <el-button type="success" @click="searchGetMenberData" icon="el-icon-search">用户搜索</el-button>
          <el-button type="success" @click="BangLabel" icon="el-icon-search" :disabled='multipleSelection.length == 0'>绑定标签</el-button>
       </el-col>
       <el-col :span="24"  v-loading="loading"  element-loading-text="正在查询中。。。" >
         <el-table ref="multipleTable" :data="menberList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="face" label="头像"  align="center">
            <template slot-scope="scope">
                 <img :src="scope.row.face" :alt="scope.row.name" width="80">
            </template>
          </el-table-column>
          <el-table-column prop="memberId" label="会员Id"  align="center"></el-table-column>
          <el-table-column prop="name" label="会员名称"  align="center"></el-table-column>
          <el-table-column prop="sex" label="性别"  align="center">
            <template slot-scope="scope">
                <el-tag type="success" v-if="scope.row.status != 0">{{ scope.row.status == 1 ? '女' : '男' }}</el-tag>
                <el-tag v-else type="success">未知</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="crateTime" label="添加时间"  align="center"></el-table-column>
          <el-table-column prop="region" label="地址"  align="center"></el-table-column>
          <el-table-column prop="lvName" label="等级"  align="center"></el-table-column>
          <el-table-column prop="consumePoint" label="消费积分"  align="center"></el-table-column>
          <el-table-column prop="point" label="剩余积分"  align="center"></el-table-column>
          <el-table-column align="center" label="操作" width="250" class-name="small-padding fixed-width">
             <template slot-scope="scope">
               <el-dropdown @command='commandSelect($event,scope.$index,scope.row)'>
                <el-button type="primary">
                  更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command='1'>标签</el-dropdown-item>
                  <el-dropdown-item command='2'>设置上级</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
                <el-button type="primary" size="mini" @click="handleLabel(scope.$index,scope.row)">标签</el-button>
                <el-button type="primary" size="mini" @click="handleInfo(scope.$index,scope.row)">详情</el-button>
                <el-button type="danger" size="mini" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
             </template>
          </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="GetMenberList" />
       </el-col>
    </el-row>

   <el-dialog title="查看标签" :visible.sync="dialogVisible" width="30%">
    <el-tag type="info"  closable v-for='(item,index) in MenberTagList' :key="index" @close='closeTag(item.tagId)'>{{item.column4}}</el-tag>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>

   <el-dialog title="会员绑定标签" :visible.sync="UserdialogVisible" width="30%">
    <el-select v-model="MenberTag.tagId" placeholder="请选择" @change="SelectChange">
      <el-option
        v-for="item in labelList"
        :key="item.id"
        :label="item.labelName"
        :value="item.id">
      </el-option>
    </el-select>
    <span slot="footer" class="dialog-footer">
      <el-button @click="UserdialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="AddMenberLabel">确 定</el-button>
    </span>
  </el-dialog>

   <el-dialog title="绑定上级" :visible.sync="UpLvUnidVisible" width="30%">
    上级Unid：<el-input v-model="UserUn.disId" placeholder="请输入id"></el-input>
    <span slot="footer" class="dialog-footer">
      <el-button @click="UpLvUnidVisible = false">取 消</el-button>
      <el-button type="primary" @click="UpLvUserBang">确 定</el-button>
    </span>
  </el-dialog>

  </div>
</template>

<script>
import API from '@/api/member'
import APILab from '@/api/label'
import Pagination from '@/components/Pagination'
  export default {
    components:{Pagination},
    data () {
      return {
        loading:false,
        dialogVisible:false,
        UserdialogVisible:false,
        UpLvUnidVisible:false,
        MenberTag:{
          tagId:'',tagName:'',memberIds:''
        },
        MenberTagList:[],
        menberList:[],
        labelList:[],
        listQuery:{
          page: 1,
          limit: 10,
        },
        total:10,
        UserUn:{
          disId:'',
          memberId:''
        },
        multipleSelection:[],
      }
    },
    mounted () {
       this.GetMenberList();
       this.GetLabelList();
    },
    methods: {
      //获取所有的等级  
      GetMenberList(){
        let that = this;
        API.getMenberList(Object.assign({},that.listQuery)).then(res => {
          if(res != undefined){
            that.menberList = res.rows;
            that.total = res.total;
          }else{
            this.$message.error('会员列表获取失败');
          }
        }).catch(err =>{})
      },

      //获取所有标签
      GetLabelList(){
        let that = this;
        APILab.GetLabel({page: 1,limit: 10}).then(res => {
          if(res != undefined){
            that.labelList = res.rows;
          }else{
            this.$message.error('标签未拿到'); 
          }
        }).catch(err => {
          this.$message.error('标签未拿到');
        })
      },

      //会员绑定标签
      AddMenberLabel(){
        let that = this;
        API.UserBangLabel(that.MenberTag).then(res => {
          if(res.code == 0){
           that.UserdialogVisible = false;
          }
        }).catch(err => {
            this.$message.error('绑定失败');
        })
      },
      
      //删除
      handleDelete(index,row){
        let that = this;
        that.loading = true;
        this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {confirmButtonText: '确定',cancelButtonText: '取消', type: 'warning'
        }).then(() => {
            API.deleteMenber({memberId:row.memberId}).then(res => {
              if(res.code == 0){
                  this.$message({ message: '删除成功', type: 'success'});
                  that.GetMenberList();
              }else{
                  this.$message.error('删除失败');
              }
              that.loading = false;
            }).catch(err => {})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });        
          that.loading = false;  
        });
      },

      //操作
      commandSelect(e,index,row){
        let that = this;
        if(e == 1){
          this.handleLabel();
        }else{
          this.UserUn.memberId = row.memberId;
          this.UpLvUnidVisible = true;
        }
      },
      
      //绑定上一级
      UpLvUserBang(){
        let that = this;
        API.UpUserLvDis(this.UserUn).then(res => {
          if(res.code == 0){
            this.UpLvUnidVisible = false;
          }
        }).catch(err => {
          this.$message.error('绑定失败');
        })
      },

      //获取指定用户的标签
      GetMenberTag(menberId){
        let that = this;
        API.GetMenberLabel({memberId:menberId}).then(res => {
          if(res.code == 0){
            that.MenberTagList = res.tags;
          }
        })
      },

      //绑定标签
      BangLabel(){
        let arr = [];
        this.UserdialogVisible = true;
        this.multipleSelection.map(Mres => {
          arr.push(Mres.memberId)
        })
        this.MenberTag.memberIds = arr.join(',');
      },

      //查看标签
      handleLabel(index,row){
        let that = this;
        that.dialogVisible = true;
        this.GetMenberTag(row.memberId);
      },

      //删除指定用户的标签
      closeTag(id){
        let that = this;
        API.DELETEMenberLabel({id:id}).then(res => {
          if(res.code == 0){
             that.dialogVisible = false;
          }else{
          this.$message.error('删除失败');            
          }
        }).catch(err => {
          this.$message.error('删除失败');
        })
      },

      //标签的赋值
      SelectChange(e){
        let that = this;
        that.MenberTag.tagName = that.labelList.find(f => f.id == e).labelName;
      },

      searchGetMenberData(){
        let that = this;
        that.GetMenberList();
      },

      //多选
      handleSelectionChange(val){
        let that = this;
        this.multipleSelection = val;
      },

      //查看详情
      handleInfo(){
        let that = this;
      },
     
    }
  }
</script>

<style lang="scss">
  
</style>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        