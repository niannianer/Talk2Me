// pages/register/index.js
const app = getApp()
import RequestMessage from '../../utils/RequestMessage.js'
import someService from '../../servies/someService.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    contryActive: {},
    contries: [],
    sexActive: {},
    sexs: [],
    userTypeActive: {},
    userTypes: [],
    avatry: '',
    lang: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.getLanuage(this);
    this.getUserType()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  // 注册
  register: function(){
    const that = this
    let param = {
      enabled: 1,
      roles: [{ id: that.data.userTypeActive.id, name: that.data.userTypeActive.name }],
      username: that.data.username,
      password: that.data.password
    }
    RequestMessage.request({
      url: 'register',
      data: param,
      method: 'POST',
      success: function (res) {
        if (res.data.status == 1) {
          wx.showToast({
            title: '注册成功',
            icon: 'none'
          })
          wx.redirectTo({
            url: '/pages/login/index',
          })
        } else {
          wx.showToast({
            title: '注册失败',
            icon: 'none'
          })
        }
      },
      fail: function () {
        wx.showToast({
          title: '注册失败，请稍后再试',
          icon: 'none'
        })
      }
    })
  },
  onGotUserInfo(e) {
    const that = this
    if (e.detail.errMsg == 'getUserInfo:ok'){
      that.setData({
        userInfo: e.detail.userInfo
      })
    }
  },

  // 上传图片
  uploadImg: function(){
    const that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          avatry: res.tempFilePaths
        })
      }
    })
  },

  // 获取用户类型
  getUserType: function(){
    const that = this
    someService.getUserType().then(res=>{
      console.log(res)
      if(res.data.content){
        that.setData({
          userTypes: res.data.content || []
        })
      }
    })
  },
  // 用户类型选择
  userTypePickerChange: function (e) {
    this.setData({
      userTypeActive: this.data.userTypes[e.detail.value]
    })
  },

  // 用户名输入
  bindinputName: function(e){
    this.setData({
      username: e.detail.value
    })
  },
  // 密码输入
  bindinputPwd: function (e) {
    this.setData({
      password: e.detail.value
    })
  },


})