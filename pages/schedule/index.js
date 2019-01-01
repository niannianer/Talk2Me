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
    role: 1,
    choseDate: {},
    showError: false,
    courseList: [],
    initCourseList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setInitCourseList()
    const that = this
    const cacheMessage = CacheMessage.getInstance()
    that.setData({
      role: cacheMessage.role
    })
  },
  getSchedule: function(){
    const that = this
    if(that.data.role == 1){
      that.getStudentSchedule()
    }else{
      that.getTeacherSchedule()
    }
  },
  // 获取老师课程表数据
  getTeacherSchedule: function () {
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
          this.showError = true
          wx.showToast({
            title: '获取失败',
            icon: 'none'
          })
        } else {
          this.showError = false
          that.formatCourse(res.data.content)
        }
      },
      fail: function () {
        this.showError = true
        wx.showToast({
          title: '获取失败，请稍后再试',
          icon: 'none'
        })
      }
    })
  },
  // 获取学生课程表数据
  getStudentSchedule: function () {
    const that = this
    let param = {
      page:0,
      size: 100,
      startDate: that.data.choseDate.startDate + ' 00:00:00',
      endDate: that.data.choseDate.endDate + ' 23:59:59',
      // teacherId: '',
      userId: CacheMessage.getInstance().studentId
    }
    RequestMessage.request({
      url: 'scheduleStudentQuery',
      data: param,
      success: function (res) {
        this.showError = false
        that.formatCourse(res.data.content)
      },
      fail: function () {
        this.showError = true
        wx.showToast({
          title: '获取失败',
          icon: 'none'
        })
        const content = [
          {
            "courseId": "402880e766c5a95d0166c5b372c90002",
            "courseRemind": 0,
            "endDate": 1543890600000,
            "flag": 0,
            "id": "402880e867742f550167746d57640002",
            "startDate": 1543888800000,
            "studentId": "402880e666b60d110166b628537c0002",
            "teacherId": "402880e5668af25101668af9189e0003"
          },
          {
            "courseId": "402880e766c5a95d0166c5b372c90002",
            "courseRemind": 0,
            "endDate": 1543892400000,
            "flag": 0,
            "id": "402880e867742f5501677463ed880001",
            "startDate": 1543892400000,
            "studentId": "402880e6674b097a01674b10b1600000",
            "teacherId": "402880e5668af25101668af9189e0003"
          }
        ]
        that.formatCourse(content)
      }
    })
  },
  // 进入详情页
  toDetail: function(e){
    console.log(e)
    const teacherId = e.currentTarget.dataset.teacherid
    const stutentId = e.currentTarget.dataset.studentid
    const scheduleId = e.currentTarget.dataset.scheduleid
    const role = wx.getStorageSync('role')
    const url = role == 2 ? '/pages/studentDetail/index?source=course' : '/pages/teacherDetail/index?source=course'
    wx.navigateTo({
      url: url + '&tId=' + teacherId + '&sId=' + stutentId + '&scheduleId=' + scheduleId
    })
  },
  // 格式化数组
  formatCourse: function (list) {
    const that = this
    if (!list || !list.length) {
      const courseList = that.data.courseList
      courseList.forEach((item,index) => {
        if(index!=0){
          for (const key in item){
            item[key] = {}
          }
        }
      })
      console.log(courseList)
      that.setData({
        courseList
      })
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
      let obj = item
      // obj.text = startTime + '-' + endTime
      obj.text = (item.courseName || '').split('/')[0]
      if(that.data.role==1){
        obj.name = `@${item.teacherName}`
      }else{
        obj.name = `@${item.studentName}`
      }
      
      let courseList = that.data.courseList
      if (hourse < 12) {
        courseList[1][weekKey] = obj
      } else if (hourse < 18){
        courseList[2][weekKey] = obj
      }else{
        courseList[3][weekKey] = obj
      }
      that.setData({
        courseList
      })
    })

  },
  // 字段获取
  getWeekText: function (week) {
    let weekText = ''
    switch (week) {
      case '1':
        weekText = 'dayOne'
        break
      case '2':
        weekText = 'dayTwo'
        break
      case '3':
        weekText = 'dayThree'
        break
      case '4':
        weekText = 'dayFour'
        break
      case '5':
        weekText = 'dayFive'
        break
      case '6':
        weekText = 'daySix'
        break
      case '7':
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
    if (!e.detail.noHide) {
      this.pickerTime.hideDialog()
    }
    this.getSchedule()
  },
  // 设置课程表初始数据
  setInitCourseList: function(){
    const that = this
    that.setData({
      courseList: [{
        dayOne: {
          text: '周一'
        },
        dayTwo: {
          text: '周二'
        },
        dayThree: {
          text: '周三'
        },
        dayFour: {
          text: '周四'
        },
        dayFive: {
          text: '周五'
        },
        daySix: {
          text: '周六'
        },
        daySeven: {
          text: '周日'
        }
      }, {
        dayOne: {},
        dayTwo: {},
        dayThree: {},
        dayFour: {},
        dayFive: {},
        daySix: {},
        daySeven: {}
      }, {
        dayOne: {},
        dayTwo: {},
        dayThree: {},
        dayFour: {},
        dayFive: {},
        daySix: {},
        daySeven: {}
      }, {
        dayOne: {},
        dayTwo: {},
        dayThree: {},
        dayFour: {},
        dayFive: {},
        daySix: {},
        daySeven: {}
      }]
    })
  }
})