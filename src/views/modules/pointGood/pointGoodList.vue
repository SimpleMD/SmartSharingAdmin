<template>
  <div class="membershipManagerment">
    <el-row :gutter="24">
      <el-col :span="24">
        <el-button type="success"  icon="el-icon-plus" @click="AddGoods">转入积分商品</el-button>
        <el-button type="success"  icon="el-icon-circle-close" :disabled="multipleSelection.length == 0" @click="DeleteBatch">批量删除</el-button>
      </el-col>
      <el-col :span="24" v-loading="loading"  element-loading-text="正在查询中。。。" >
        <el-table ref="multipleTable" :data="GoodsList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column align="center" prop="goodId"  label="商品ID"></el-table-column>
          <el-table-column align="center" prop="thumbnail"  label="商品图片">
            <template slot-scope="scope">
               <img :src="scope.row.thumbnail" width="80">
            </template>
          </el-table-column>
          <el-table-column align="center" prop="goodName"  label="商品名称"></el-table-column>
          <el-table-column align="center" prop="hot" label="是否热销">
            <template slot-scope="scope">
                <el-tag :type="scope.row.hot == 1 ? 'success' : 'error' ">{{ scope.row.hot == 1 ? '是' : '否' }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="price" label="价格" ></el-table-column>
          <!-- <el-table-column align="center" prop="cost" label="成本价" ></el-table-column>
          <el-table-column align="center" prop="sort" label="排序" ></el-table-column>
          <el-table-column align="center" prop="status" label="商品状态" >
             <template slot-scope="scope">
                 <el-tag type="success" v-if="scope.row.status == 1">已上架</el-tag> <el-tag type="success"  v-if="scope.row.status == 2">未上架</el-tag>
                 <el-tag type="success" v-if="scope.row.status == 3">立即上架</el-tag>
             </template>
          </el-table-column>           -->
          <el-table-column align="center" prop="catName" label="分类名称" ></el-table-column>
          <el-table-column align="center" prop="buyIntegral" label="所需积分" ></el-table-column>
          <!-- <el-table-column align="center" prop="payType" label="付款类型" >
             <template slot-scope="scope">
                 <el-tag type="success" v-if="scope.row.payType == 1">微信支付</el-tag> <el-tag type="success"  v-if="scope.row.payType == 2">余额支付</el-tag>
             </template>
          </el-table-column> -->

          <!-- <el-table-column align="center" prop="showSales" label="展示销量" ></el-table-column>
          <el-table-column align="center" prop="sales" label="真实销量" ></el-table-column> -->
          <el-table-column  align="center" label="操作" width="220" class-name="small-padding fixed-width">
             <template slot-scope="scope">
                <!-- <el-button type="success"  size="mini" icon="el-icon-plus" @click="handYi(scope.$index,scope.row)"></el-button> -->
                <el-button type="primary" size="mini" @click="handlEdit(scope.$index,scope.row)">编辑</el-button>
                <el-button type="danger" size="mini" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
             </template>
          </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="GetGoodsList" />
      </el-col>
    </el-row>

   <GoodModel ref="GoodDialog"/>
  </div>
</template>

<script>
import API from '@/api/goods'
import API_G from '@/api/point'
import Pagination from '@/components/Pagination'
import GoodModel from './Component/GoodDialog'

  export default {
    components: {GoodModel,Pagination},
    data () {
      return {
        loading:false,
        GoodsList:[],
        listQuery:{
          page: 1,
          limit: 10,
        },
        total:10,
        multipleSelection:[],
      }
    },
    mounted () {
       this.GetGoodsList();
    },
    methods: {

      //获取所有的等级
      GetGoodsList(){
        let that = this;
        API_G.GetPointGoodList(Object.assign({},that.listQuery)).then(res => {
          if(res != undefined){
             that.GoodsList = res.rows
             that.total = res.total
          }else{
             this.$message.error('抱歉推荐师等级未获取到');
          }
        }).catch(err =>{})
      },

      //删除数据
      handleDelete(index,row){
        let that = this;
        that.loading = true;
        this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {confirmButtonText: '确定',cancelButtonText: '取消', type: 'warning'
        }).then(() => {
            API_G.RemovePointGood({id:row.id}).then(res => {
              if(res.code == 0){
                  this.$message({ message: '删除成功', type: 'success'});
                  that.GetGoodsList();
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

      //批量删除
      DeleteBatch(){
        let that = this;
        let arr = [];
        that.loading = true;
        that.multipleSelection.map(res => {
          arr.push(res.id)
        })
        this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {confirmButtonText: '确定',cancelButtonText: '取消', type: 'warning'
        }).then(() => {
          API_G.batchRemovePointGood({ids:arr.join(',')}).then(res => {
            if(res.code == 0){
              that.GetGoodsList();
              this.$message({ message: '批量删除成功', type: 'success'});
            }else{
              this.$message.error('删除失败');
            }
            that.loading = false;
          }).catch(err => {this.$message.error('删除失败');})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });        
          that.loading = false;  
        });
      },

      //添加商品
      AddGoods(){
        let that = this;
        this.$router.push('/goods-goodsList')
      },

    //   //转入一分钱抢
      handlEdit(index,row){
        let that = this;
        this.$refs.GoodDialog.DiaLogShow(true,row)
      },
      
      //编辑数据 index下标、row指定当前条数据
    //   handlEdit(index,row){
    //     let that = this;
    //     this.$router.push({
    //       path:'/goods-goodsedit',
    //       query:row
    //     })
    //   },

      //获取选择哪条
      handleSelectionChange(val){
        let that = this;
        this.multipleSelection = val;
      },
     
    }
  }
</script>

<style lang="scss">
  
</style>
