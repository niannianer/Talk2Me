const moment = require('../../utils/moment.min.js')
moment.locale('zh-cn', {
  longDateFormat: {
    L: "YYYY-MM-DD",
    l: "M月D日ddd"
  }
})

const days = []
const hours = []
const minutes = [{
    ck: '00',
    cn: '0分'
  },
  {
    ck: '30',
    cn: '30分'
  }
]
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
    days: days,
    hours: hours,
    minutes: minutes,
    selectedIndex: [1, 4, 0],
    choseDate: ''
  },
  ready: function() {
    let that = this
    //默认第二天的10点00
    let choseDate = moment().add(1, 'd').format('L') + " 10:00"
    that.setData({
      choseDate: choseDate
    })
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
    bindChange: function(e) {
      let that = this
      const val = e.detail.value
      let isToday = that.data.days[val[0]].cn === '今天'
      let currentHour = moment().format('H')
      let beginHour = currentHour < 6 ? 6 : new Number(currentHour)+1
      let newHours = []
      if (isToday) {
        for (let i = beginHour; i < 24; i++) {
          let item = {
            ck: i < 10 ? '0' + i : '' + i,
            cn: i + "点"
          }
          newHours.push(item)
        }
        that.setData({
          hours: newHours
        })
      } else {
        that.setData({
          hours: hours
        })
      }
      let choseDate = that.data.days[val[0]].ck + ' ' +
        that.data.hours[val[1]].ck + ':' +
        that.data.minutes[val[2]].ck
      console.log("picker-time choseDate:" + choseDate)
      that.setData({
        choseDate: choseDate
      })
    },
    onSure: function(e) {
      console.log(e)
      var myEventDetail = {
        "choseDate": this.data.choseDate
      };
      this.triggerEvent('sure', myEventDetail);
    },
    onClose: function() {
      this.hideDialog()
    },
  }
})