// pages/courseEdit/index.js
import RequestMessage from '../../utils/RequestMessage.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    price: '',
    courseNames: [{
      name: '英语',
      value: 'english'
    }, {
      name: '法语',
      value: 'fayu'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 提交
  submit: function () {
    const that = this;
    if (that.checkoutEmpty()) {
      RequestMessage.request({
        url: 'bookingcourse',
        method: 'post',
        data: {
          tearcherId: '402880e5668b71ad01668c91604a0000',
          language: that.data.selectCourseObj.value,
          price: that.data.price
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
    if (!that.data.selectCourseObj.name) {
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
      selectCourseObj: this.data.courseNames[e.detail.value]
    })
  },
  inputChange: function(e){
    this.setData({
      price: e.detail.value
    })
  }
  

})