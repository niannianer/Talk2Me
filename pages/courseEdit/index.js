// pages/courseEdit/index.js
import RequestMessage from '../../utils/RequestMessage.js'
const CacheMessage = require('../../utils/CacheMessage.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    startTime: '',
    endTime: '',
    timeType: '',
    selectCourseObj: {},
    teacherId: '',
    courseNames: [{
      name: '英语',
      value: 'english'
    },{
      name: '法语',
      value: 'fayu'
    }]    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },
  // 提交
  submit: function(){
    const that = this;
    if (that.checkEmpty()){
      that.checkTime().then(res=>{
        let param = {
          courseId: '',
          startDate: '',
          endDate: '',
          accept: 0,
          studentId: ''
        }
        RequestMessage.request({
          url: 'bookingschedule',
          data: {
            bookDate: date,
            teacherId: CacheMessage.getInstance().teacherId
          },
          success: function (res) {
            if (res.data.status != 1) {
              reject(res)
              return wx.showToast({
                title: '校验日期失败',
                icon: 'none'
              })
            }
            resolve(res)
          },
          fail: function () {
            wx.showToast({
              title: '校验日期失败',
              icon: 'none'
            })
            reject()
          }
        })
      })
    }
  },

  // 校验时间是否可用
  checkTime: function(){
    return new Promise((resolve,reject) => {
      RequestMessage.request({
        url: 'judgetime',
        data: {
          bookDate: date,
          teacherId: CacheMessage.getInstance().teacherId
        },
        success: function (res) {
          if (res.status != 1) {
            reject(res)
            return wx.showToast({
              title: '校验日期失败',
              icon: 'none'
            })
          }
          resolve(res)
        },
        fail: function () {
          wx.showToast({
            title: '校验日期失败',
            icon: 'none'
          })
          reject()
        }
      })
    })
  },
  // 校验空
  checkEmpty: function(){
    const that = this;
    if (!that.data.selectCourseObj.name) {
      wx.showToast({
        title: '请选择课程名称',
        icon: 'none'
      })
      return false
    }
    if (!that.data.startTime) {
      wx.showToast({
        title: '请选择开始时间',
        icon: 'none'
      })
      return false
    }
    if (!that.data.endTime) {
      wx.showToast({
        title: '请选择结束时间',
        icon: 'none'
      })
      return false
    }
    return true
  },
  // 课程名称
  namePickerChange: function(e){
    this.setData({
      selectCourseObj: this.data.courseNames[e.detail.value]
    })
  },
  bindTimeChange: function (e) {
    const that = this;
    if (e.currentTarget.dataset.type == 'start') {
      that.setData({
        startTime: e.detail.value
      })
    } else {
      that.setData({
        endTime: e.detail.value
      })
    }
    that.checkTime(e.detail.value)
  },

  // 校验日期
  checkTime: function(date){
    return new Promise((resolve,reject) => {
      RequestMessage.request({
        url: 'judgetime',
        data: {
          bookDate: date,
          teacherId: '40289f6d641c4e2c01641c4e85660000'
        },
        success: function(res){
          if(res.data.status != 1){
            reject(res)
            wx.showToast({
              title: '校验日期失败',
              icon: 'none'
            })
          }else{
            resolve(res)
          }
          
        },
        fail: function(){
          wx.showToast({
            title: '校验日期失败',
            icon: 'none'
          })
          reject()
        }
      })
    })
  }

})