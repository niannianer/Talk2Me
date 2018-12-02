// pages/teacherDetail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teacherId: '',
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
      teacherId: options.id
    })
  },

  bookingschedule: function(){
    const that = this
    wx.navigateTo({
      url: `/pages/courseEdit/index?teacherId=${that.data.teacherId}`,
    })
  }
})