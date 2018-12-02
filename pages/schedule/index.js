// pages/teacherCourses/index.js
import RequestMessage from '../../utils/RequestMessage.js'
import CacheMessage from '../../utils/CacheMessage.js'

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
      }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
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
            title: '提交失败',
            icon: 'none'
          })
        } else {
          wx.showToast({
            title: '提交成功',
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: function () {
        wx.showToast({
          title: '提交失败',
          icon: 'none'
        })
      }
    })
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
    if (e.detail.noHide){
      this.getSchedule()
      return
    }
    this.pickerTime.hideDialog()
    
  },

})