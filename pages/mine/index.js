// pages/mine/index.js
import RequestMessage from '../../utils/RequestMessage.js'
import CacheMessage from '../../utils/CacheMessage.js'
import BaseUrl from '../../utils/BaseUrl.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    role: 1,
    isLoading: true,
    avatary: '',
    serviceUrl: BaseUrl.getBaseUrl('baseUrl'),
    sysUserId: '',
    info: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    const cacheMessage = CacheMessage.getInstance()
    that.setData({
      role: cacheMessage.role,
      sysUserId: cacheMessage.role == 2 ? cacheMessage.teacherId : cacheMessage.studentId
    })
    
  },
  onShow: function(){
    this.getInfo()
  },
  // 获取个人信息
  getInfo: function () {
    const that = this
    if (!that.data.sysUserId) {
      return
    }
    RequestMessage.request({
      url: that.data.role == 1 ? 'studentDetail' : 'teacherDetail',
      data: {
        sysUserId: that.data.sysUserId
      },
      method: 'get',
      success: function (res) {
        if (res.data.status != 1) {
          return wx.showToast({
            title: '加载失败',
            duration: 2000
          })
        }
        const content = res.data.content
        that.setData({
          info: content,
          isLoading: false,
          avatary: content.headimage ? that.data.serviceUrl + content.headimage : ''
        })

      },
      fail: function (res) {

      }
    })
  },
  // 推出登录
  logout: function(){

  },
  // 编辑信息
  editInfo: function(){
    wx.navigateTo({
      url: '/pages/completeInfo/index',
    })
  },
  // 去课程管理
  toCourseManage: function () {
    wx.navigateTo({
      url: '/pages/courseManage/index',
    })
  },
  // 评论列表
  commentTo: function () {
    wx.navigateTo({
      url: '/pages/comment/index',
    })
  },
  // 课程表
  toSchedule: function () {
    wx.navigateTo({
      url: '/pages/schedule/index',
    })
  }
})