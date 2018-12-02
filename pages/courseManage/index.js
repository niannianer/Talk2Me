// pages/courseManage/index.js
import RequestMessage from '../../utils/RequestMessage.js'
import CacheMessage from '../../utils/CacheMessage.js'
import someService from '../../servies/someService.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoading: true,
    courseList: []
  },

  onLoad: function(){
    
  },

  onShow: function(){
    this.getData()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  
  // 获取数据
  getData: function () {
    const that = this;
    someService.getteacherCourse(CacheMessage.getInstance().teacherId).then(res => {
      that.setData({
        isLoading: false
      })
      if (res.data.status != 1) {
        wx.showToast({
          title: '查询失败',
          icon: 'none'
        })
      } else {
        that.setData({
          courseList: res.data.content || []
        })
      }
    }).catch(()=>{
      wx.showToast({
        title: '查询失败',
        icon: 'none'
      })
    })
  },
  //点击删除
  deleteItem: function(e){
    const that = this
    wx.showModal({
      content: '确定删除该课程？',
      success: function(res){
        if (res.confirm){
          that.deleteSubmit(e)
        }
      }
    })
  },
  // 删除
  deleteSubmit: function (e) {
    const that = this
    let param = that.data.courseList[e.currentTarget.dataset.index]
    param.status = 0
    RequestMessage.request({
      url: 'bookingcourse',
      method: 'post',
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
            duration: 2000,
            success: function () {
              that.getData()
            }
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
  addSubmit: function(){
    wx.navigateTo({
      url: '/pages/courseUpdate/index',
    })
  }
})