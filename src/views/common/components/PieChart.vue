<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
  
    countList:{
      type:Array,
      default:[]
    },
    countinfoList:{
      type:Array,
      default:[]
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch:{
    countinfoList(val){
       console.log("进来过吗",val)
       this.countinfoList = val
       this.initChart()
    }
  },
  mounted() {
    this.initChart()

    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }

    }, 100)
    window.addEventListener('resize', this.__resizeHandler)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHandler)
    this.chart.dispose()
    this.chart = null
  },

  methods: {
    // this.$emit('update:chstatus',newValue)
    initChart() {
      let that = this;
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: that.countList
        },
        calculable: true,
        series: [
          {
            name: 'WEEKLY WRITE ARTICLES',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '38%'],
            data: that.countinfoList,

            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    },
    
  }
}
</script>
