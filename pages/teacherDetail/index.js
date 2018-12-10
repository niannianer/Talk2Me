// pages/teacherDetail/index.js
import RequestMessage from '../../utils/RequestMessage.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    teacherId: '',
    info: {},
    commentList: [{
      title: '风趣，知识丰富',
      name: '王晓晓',
      time: '2016年2月12日',
      type: '商务英语',
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.'
    }, {
      title: '风趣，知识丰富',
      name: '王晓晓',
      time: '2016年2月12日',
      type: '商务英语',
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.'
    }],
    courseList: [{
      dayOne: '周一',
      dayTwo: '周二',
      dayThree: '周三',
      dayFour: '周四',
      dayFive: '周五',
      daySix: '周六',
      daySeven: '周日'
    },{
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
    console.log(options)
    this.setData({
      teacherId: options.sysUserId
    })
    this.getTeacherInfo()
  },
  // 获取教师详情
  getTeacherInfo: function(){
    const that = this
    RequestMessage.request({
      url: 'teacherDetail',
      data: {
        sysUserId: that.data.teacherId
      },
      method: 'get',
      success: function (res) {
        if(res.data.status != 1){
          return wx.showToast({
            title: '加载失败',
            duration: 2000
          })
        }
        that.setData({
          info: res.data.content
        })
      },
      fail: function (res) {

      }
    })
  },
  // 预定
  bookingschedule: function(){
    const that = this
    wx.navigateTo({
      url: `/pages/courseEdit/index?teacherId=${that.data.teacherId}`,
    })
  }
})