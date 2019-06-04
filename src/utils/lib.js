function formatNumber (n) {
    const str = n.toString()
    return str[1] ? str : `0${str}`
  }
  

export default {
    dade_Time: dada =>{
        console.log("你好葵姐阿斯达所多")
        var date = new Date(dada);
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
      
        const hour = date.getHours()
        const minute = date.getMinutes()
        const second = date.getSeconds()
      
        const t1 = [year, month, day].map(formatNumber).join('-')
        // const t2 = [hour, minute, second].map(formatNumber).join(':')
      
        return `${t1}`
    },


}