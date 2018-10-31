// pages/courseEdit/index.js
import RequestMessage from '../../utils/RequestMessage.js'
import CacheMessage from '../../utils/CacheMessage.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    price: '',
    courseLists: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadCourseList()
  },

  // 提交
  submit: function () {
    const that = this;
    if (that.checkoutEmpty()) {
      RequestMessage.request({
        url: 'bookingcourse',
        method: 'post',
        data: {
          tearcherId: CacheMessage.getInstance().teacherId,
          price: that.data.price,
          SubjectTypes: [{
            id: that.data.selectCourseObj.id
          }]
        },
        success: function (res) {
          console.log(res)
          if (res.data.status != 1) {
            wx.showToast({
              title: '提交失败',
              icon: 'none'
            })
          }else{
            wx.showToast({
              title: '提交成功',
              icon: 'none',
              duration: 2000,
              success: function(){
                wx.navigateBack({
                  delta: 1
                })
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
    }
  },
  // 校验空
  checkoutEmpty: function () {
    const that = this;
    if (!that.data.selectCourseObj.id) {
      wx.showToast({
        title: '请选择课程名称',
        icon: 'none'
      })
      return false
    }
    if (!that.data.price) {
      wx.showToast({
        title: '请输入课程价格',
        icon: 'none'
      })
      return false
    }
    return true
  },
  // 课程名称
  namePickerChange: function (e) {
    this.setData({
      selectCourseObj: this.data.courseLists[Number(e.detail.value)]
    })
  },
  // 课程列表
  loadCourseList: function(){
    const that = this
    RequestMessage.request({
      url: 'courseLists',
      method: 'get',
      data: {
        name: ''
      },
      success: function (res) {
        console.log(res)
        if (res.data.status != 1) {
          wx.showToast({
            title: '查询失败',
            icon: 'none'
          })
        } else {
          that.setData({
            courseLists: res.data.content || []
          })
        }
      },
      fail: function () {
        wx.showToast({
          title: '查询失败',
          icon: 'none'
        })
      }
    })
  },
  inputChange: function(e){
    this.setData({
      price: e.detail.value
    })
  }
  

})