const moment = require('../../utils/moment.min.js')
moment.locale('zh-cn', {
  longDateFormat: {
    L: "YYYY-MM-DD",
    l: "M月D日ddd"
  }
})
let years = []
let months = []
let days = []
let weeks = []
let hours = []
let minutes = [{
  ck: '00',
  cn: '0分'
},
{
  ck: '30',
  cn: '30分'
}]

for (let i = 0; i < 2; i++) {
  const newYear = moment().year()
  years.push({
    ck: newYear + i,
    cn: newYear + i + '年'
  })
}

for (let i = 1; i <= 12; i++) {
  months.push({
    ck: i,
    cn: i + '月'
  })
}

const dayArr = ['今天']


for (let i = 0; i < 60; i++) {
  let newDate = moment().add(i, 'd')
  let item = {
    ck: newDate.format('L'),
    cn: dayArr[i] || newDate.format('l')
  }
  days.push(item)
}

for (let i = 6; i < 24; i++) {
  let item = {
    ck: i < 10 ? '0' + i : '' + i,
    cn: i + "点"
  }
  hours.push(item)
}


// for (let i = 0; i < 60; i++) {
//   let item = {
//     ck: i < 10 ? '0' + i : '' + i,
//     cn: i + "分"
//   }
//   minutes.push(item)
// }

Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    // 弹窗显示控制
    isShow: false,
    years: years,
    months: months,
    weeks: [],
    days: days,
    hours: hours,
    minutes: minutes,
    selectedIndex: [0, 1, 1],
    choseDate: ''
  },
  ready: function () {
    let that = this
    //默认第二天的10点00
    let choseDate = moment().add(1, 'd').format('L') + " 10:00"

    // 默认时间
    
    let val = [0,0,0]
    const year = moment().weekYear()
    const month = moment().month()
    const day = moment().dayOfYear()
    for(var i = 0; i< that.data.years.length; i++){
      if (that.data.years[i].ck == year){
        val[0] = i
        break
      }
    }
    val[1] = month
    val[2] = that.getMonthWeek(year,month,day) -1
    that.changeWeeks(val)
    that.getChooseDate(val)
    that.onSure()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    /*
     * 公有方法
     */
    //隐藏弹框
    hideDialog() {
      this.setData({
        isShow: !this.data.isShow
      })
    },
    //展示弹框
    showDialog() {
      this.setData({
        isShow: !this.data.isShow
      })
    },
    bindChange: function (e) {

      let that = this
      const val = e.detail.value
      that.changeWeeks(val)
      that.getChooseDate(val)
      
    },
    getChooseDate(val){
      const that = this
      const startDate = that.data.years[val[0]].ck + '-' +
        that.data.months[val[1]].ck + '-' +
        that.data.weeks[val[2]].startDate

      const endDate = that.data.years[val[0]].ck + '-' +
        that.data.months[val[1]].ck + '-' +
        that.data.weeks[val[2]].endDate
      that.setData({
        choseDate: {
          startDate,
          endDate
        }
      })
    },
    onSure: function (e) {
      var myEventDetail = {
        "choseDate": this.data.choseDate,
        "noHide": true
      };
      this.triggerEvent('sure', myEventDetail);
    },
    onClose: function () {
      this.hideDialog()
    },
    changeWeeks(val){
      const that = this
      const weekNum = this.getWeeks(that.data.years[val[0]].ck, that.data.months[val[1]].ck)

      let weeks = that.data.weeks

      for (var i = 1; i < weekNum; i++) {
        const d1 = weeks[i - 1].endDate
        if (i == weekNum - 1) {
          weeks[i] = {
            startDate: d1 + 1,
            endDate: that.data.maxDay,
            cn: that.getWeekName(i)
          }
        } else {
          weeks[i] = {
            startDate: d1 + 1,
            endDate: d1 + 7,
            cn: that.getWeekName(i)
          }
        }
      }
      that.setData({
        weeks
      })
    },

    // year:年  month:月  day:日
    getWeeks(year, month) {
      const that = this
      var d = new Date();
      // 该月第一天
      d.setFullYear(year, month - 1, 1);
      var w1 = d.getDay();
      if (w1 == 0) w1 = 7;
      that.data.weeks[0] = {
        startDate: 1,
        endDate: 1 + 7 - w1,
        cn: that.getWeekName(0)
      }

      // 该月天数
      d.setFullYear(year, month, 0);
      var dd = d.getDate();
      // 第一个周一
      let d1;
      let addWeex = 0
      if (w1 != 1){
        d1 = 7 - w1 + 2
        addWeex = 1
      }
      else {
        d1 = 1
      }
      that.setData({
        maxDay: dd
      })
      

      let week_count = Math.ceil((dd - d1 + 1) / 7) + addWeex;
      return week_count;
    },
    // 获取周数名称
    getWeekName(num) {
      var day = parseInt(day);
      if (isNaN(num) || num < 0 || num > 6)
        return false;
      var weekday = ["第一周", "第二周", "第三周", "第四周", "第五周", "第六周"];
      return weekday[num];
    },

    //获得当前日期在当月第几周
    getMonthWeek(a, b, c) {
      var date = new Date(a, parseInt(b) - 1, c), w = date.getDay(), d = date.getDate();
      return Math.ceil(
        (d + 6 - w) / 7
      );
    }
  }
})