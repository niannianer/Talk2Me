// pages/courseEdit/index.js
const CacheMessage = require('../../utils/CacheMessage.js')
import RequestMessage from '../../utils/RequestMessage.js'
const someService = require('../../servies/someService.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoading: false,
    startDate: '',
    endDate: '',
    timeType: '',
    selectCourseObj: {},
    teacherId: '',
    courseList: []    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      teacherId: options.teacherId
    })
    this.getTeacherCourse();
  },

  // 提交
  submit: function(){
    const that = this;
    console.log(CacheMessage)
    const cacheMessage = CacheMessage.default.getInstance()
    if (that.checkEmpty()){
      // that.checkTime().then(res=>{
        let param = {
          courseId: that.data.selectCourseObj.id,
          startDate: that.data.startDate,
          endDate: that.data.endDate,
          studentId: cacheMessage.studentId,
          teacherId: that.data.teacherId
        }
        RequestMessage.request({
          url: 'bookingschedule',
          data: param,
          method: 'POST',
          success: function (res) {
            if (res.data.status == 3) {
              return wx.showToast({
                title: res.data.extraInfo,
                icon: 'none'
              })
            }
            if (res.data.status != 1) {
              return wx.showToast({
                title: '预定失败，请稍后再试',
                icon: 'none'
              })
            }
          },
          fail: function () {
            wx.showToast({
              title: '预定失败，请稍后再试',
              icon: 'none'
            })
          }
        })
      // })
    }
  },
  // 获取当前教师的课程列表
  getTeacherCourse: function(){
    const that = this
    someService.getteacherCourse(that.data.teacherId).then(res => {
      that.setData({
        isLoading: false
      })
      if (res.data.status != 1) {
        wx.showToast({
          title: '查询失败',
          icon: 'none'
        })
      } else {
        let list = res.data.content || []
        list.forEach(item => {
          Object.assign(item, item.subjectTypes[0])
        })
        that.setData({
          courseList: list
        })
      }
    }).catch(() => {
      wx.showToast({
        title: '查询失败',
        icon: 'none'
      })
    })
  },
  // 校验时间是否可用
  checkTime: function(){
    const that = this
    return new Promise((resolve,reject) => {
      RequestMessage.request({
        url: 'judgetime',
        data: {
          bookDate: date,
          teacherId: that.data.teacherId
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
  // 选择时间
  bindCourseTime: function (e) {
    const that = this;
    that.setData({
      timeType: e.currentTarget.dataset.type
    })

    if (!this.pickerTime) {
      this.pickerTime = this.selectComponent("#pickerTime")
    }
    this.pickerTime.showDialog()
  },
  // 选择时间确定
  onCourseTimeSure: function (e) {
    const that = this
    let choseDate = e.detail.choseDate += ':00'
    this.pickerTime.hideDialog()
    if (that.data.timeType == 'start'){
      that.setData({
        startDate: choseDate,
        startDateStr: that.formatDataTimeStr(choseDate)
      })
      // that.checkTime(e.detail.value)
    }else{
      that.setData({
        endDate: choseDate,
        endDateStr: that.formatDataTimeStr(choseDate)
      })
    }
    that.checkTime(choseDate)
    
  },
  formatDataTimeStr: function (dataTime) {
    if (dataTime == false) {
      return ''
    }
    let length = dataTime.length
    if (length < 5) {
      return ''
    }
    return dataTime.substring(5, length)
  },
  // 校验空
  checkEmpty: function(){
    const that = this;
    if (!that.data.selectCourseObj.id) {
      wx.showToast({
        title: '请选择课程名称',
        icon: 'none'
      })
      return false
    }
    if (!that.data.startDate) {
      wx.showToast({
        title: '请选择开始时间',
        icon: 'none'
      })
      return false
    }
    if (!that.data.endDate) {
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
      selectCourseObj: this.data.courseList[Number(e.detail.value)]
    })
    console.log(this.data.selectCourseObj)
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
    const that = this
    return new Promise((resolve,reject) => {
      RequestMessage.request({
        url: 'judgetime',
        data: {
          bookDate: date,
          teacherId: that.data.teacherId
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