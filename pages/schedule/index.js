// pages/teacherCourses/index.js
import RequestMessage from '../../utils/RequestMessage.js'
import CacheMessage from '../../utils/CacheMessage.js'
const moment = require('../../utils/moment.min.js')
moment.locale('zh-cn', {
  longDateFormat: {
    L: "YYYY-MM-DD",
    l: "M月D日ddd"
  }
})

Page({

  /**
   * 页面的初始数据
   */
  data: {
    choseDate: {},
      courseList: [{
        dayOne: '周一',
        dayTwo: '周二',
        dayThree: '周三',
        dayFour: '周四',
        dayFive: '周五',
        daySix: '周六',
        daySeven: '周日'
      }, {
        dayOne: '12.00--14.00',
        dayTwo: '',
        dayThree: '10.00-11.00',
        dayFour: '9.00-12.00',
        dayFive: '',
        daySix: '11.00-12.00',
        daySeven: '11.00-12.00'
      }, {
        dayOne: '',
        dayTwo: '12.00--14.00',
        dayThree: '10.00-11.00',
        dayFour: '',
        dayFive: '',
        daySix: '11.00-12.00',
        daySeven: '11.00-12.00'
      }, {
        dayOne: '12.00--14.00',
        dayTwo: '',
        dayThree: '10.00-11.00',
        dayFour: '9.00-12.00',
        dayFive: '',
        daySix: '11.00-12.00',
        daySeven: '11.00-12.00'
      }, {
        dayOne: '',
        dayTwo: '12.00--14.00',
        dayThree: '10.00-11.00',
        dayFour: '',
        dayFive: '',
        daySix: '11.00-12.00',
        daySeven: '11.00-12.00'
      }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  // 获取课程表数据
  getSchedule: function(){
    const that = this
    let param = {
      startDate: that.data.choseDate.startDate + ' 00:00:00',
      endDate: that.data.choseDate.endDate + ' 23:59:59',
      teacherId: CacheMessage.getInstance().teacherId,
      userId: CacheMessage.getInstance().teacherId
    }
    RequestMessage.request({
      url: 'scheduleQuery',
      data: param,
      success: function (res) {
        if (res.data.status != 1) {
          wx.showToast({
            title: '获取失败',
            icon: 'none'
          })
        }else{
          that.formatCourse(res.data.content)
        } 
      },
      fail: function () {
        wx.showToast({
          title: '获取失败',
          icon: 'none'
        })
      }
    })
  },
  formatCourse: function(list){
    const that = this
    if(!list){
      return
    }
    list.forEach(item => {
      const week = moment(item.startDate).format('d');
      const date = moment(item.endDate).format('YYYY-MM-DD HH:mm')
      const hourse = Number(moment(item.startDate).format('HH'))
      const minite = Number(moment(item.startDate).format('mm'))
      const startTime = moment(item.startDate).format('HH:mm')
      const endTime = moment(item.endDate).format('HH:mm')
      const weekKey = that.getWeekText(week)
      if (hourse < 10){
        this.courseList[0][weekKey] = startTime + '-' + endTime
      }
    })
    
  },
  getWeekText: function(week){
    let weekText = ''
    switch(week){
      case 1:
        weekText = 'dayOne'
        break
        case 2:
        weekText = 'dayTwo'
        break
        case 3:
        weekText = 'dayThree'
          break
        case 4:
        weekText = 'dayFour'
          break
        case 5:
        weekText = 'dayFive'
          break
        case 6:
        weekText = 'daySix'
          break
        case 7:
        weekText = 'daySeven'
          break
          default:
          break
    }
    return weekText
  },
  // 选择时间
  bindCourseTime: function (e) {
    const that = this;

    if (!this.pickerTime) {
      this.pickerTime = this.selectComponent("#pickerTime")
    }
    this.pickerTime.showDialog()
  },
  // 选择时间确定
  onCourseTimeSure: function (e) {
    const that = this
    let choseDate = e.detail.choseDate
    that.setData({
      choseDate
    })
    console.log(choseDate)
    if (!e.detail.noHide){
      this.pickerTime.hideDialog()
    }
    this.getSchedule()
  },

})