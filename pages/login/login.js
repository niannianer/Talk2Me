const utils = require('../../utils/util.js')
import CacheMessage from '../../utils/CacheMessage.js'
import RequestMessage from '../../utils/RequestMessage.js'

Page({
  data: {
    userInfo: {},
    disabled: true,
    showClearPassword: false,
    showPassword: false,
    showClearUsername: false,
    cacheLoginInfo: {},
    showPS: false,
    fousIndex: 1
  },

  onLoad: function(options) {
    let that = this
    if (wx.getStorageSync('username')) {
      that.setData({
        cacheLoginInfo: {
          username: '',
          password: ''
        },
        showClearUsername: true,
      })
    }
  },

  focus: function (e) {
    this.setData({
      fousIndex: e.currentTarget.dataset.index
    })
  },

  blur: function () {
    this.setData({
      fousIndex: 999
    })
  },

  changeUsername: function(evt) {
    let that = this
    that.setData({
      cacheLoginInfo: {
        username: evt.detail.value,
        password: that.data.cacheLoginInfo.password,
      }
    })
    if (that.data.cacheLoginInfo.username.length > 0) {
      that.setData({
        showClearUsername: true
      })
    } else {
      that.setData({
        showClearUsername: false
      })
    }
    that.checkButton()
  },

  changePassword: function(evt) {
    let that = this
    that.setData({
      cacheLoginInfo: {
        username: that.data.cacheLoginInfo.username,
        password: evt.detail.value,
      }
    })
    if (that.data.cacheLoginInfo.password.length > 0) {
      that.setData({
        showClearPassword: true
      })
    } else {
      that.setData({
        showClearPassword: false
      })
    }
    that.checkButton()
  },

  togglePassword: function() {
    let that = this
    that.setData({
      showPassword: !that.data.showPassword
    })
  },

  clearUsername: function() {
    let that = this
    that.setData({
      cacheLoginInfo: {
        username: '',
        password: that.data.cacheLoginInfo.password,
        code: that.data.cacheLoginInfo.code
      },
      showClearUsername: false
    })
    that.checkButton()
  },

  clearPassword: function() {
    let that = this
    that.setData({
      cacheLoginInfo: {
        username: that.data.cacheLoginInfo.username,
        password: '',
        code: that.data.cacheLoginInfo.code
      },
      showClearPassword: false
    })
    that.checkButton()
  },

  checkButton: function() {
    let that = this
    if (that.data.showCode) {
      if (that.data.cacheLoginInfo.username && that.data.cacheLoginInfo.password) {
        if (that.data.cacheLoginInfo.username.trim().length > 0 &&
          that.data.cacheLoginInfo.password.trim().length > 0) {
          that.setData({
            disabled: false
          })
        } else {
          that.setData({
            disabled: true
          })
        }
      } else {
        that.setData({
          disabled: true
        })
      }
    } else {
      if (that.data.cacheLoginInfo.username && that.data.cacheLoginInfo.password) {
        if (that.data.cacheLoginInfo.username.trim().length > 0) {
          that.setData({
            disabled: false
          })
        } else {
          that.setData({
            disabled: true
          })
        }
      } else {
        that.setData({
          disabled: true
        })
      }
    }
  },

  login: function() {
    let that = this
    wx.showLoading({
      title: '登录中',
      mask: true
    })
    if (that.data.cacheLoginInfo.username.trim() === '') {
      wx.showToast({
        title: "账号不能为空",
        icon: 'none',
        duration: 2000
      });

    } else if (that.data.cacheLoginInfo.password.trim() === '') {
      wx.showToast({
        title: "密码不能为空",
        icon: 'none',
        duration: 2000
      });
    } else {
      const cacheMessage = CacheMessage.getInstance()
      cacheMessage.getQYUserInfo(qyUserInfo => { // 获取 corpId userId
        const data = {
          username: that.data.cacheLoginInfo.username.trim(),
          password: that.data.cacheLoginInfo.password.trim(),
          grant_type: 'password'
        }
        RequestMessage.request({
          url: 'login',
          urlData: data,
          method: 'POST',
          success: function(res) {
            if (res.statusCode === 200) {
              console.log(res)
              let message = res.data.message
              if (res.data.code === 0) {
                route.loginTo(res.data.data)
              } else if (res.data.code === 301 || res.data.code === 302) {
                const user = res.data.data.user
                wx.showModal({
                  title: '提示',
                  content: message,
                  cancelText: '知道了',
                  confirmText: '重新填写',
                  showCancel: true,
                  success: function(res) {
                    console.log(res)
                    if (res.confirm) {
                      cacheMessage.at = user.accessToken
                      cacheMessage.rt = user.refreshToken
                      wx.navigateTo({
                        url: '../../pages/authenticationStatus/index'
                      })
                    }
                  }
                })
              } else if (res.data.code === 306) { // 公司名称不一致
                wx.navigateTo({
                  url: './binding/binding?params=' + JSON.stringify(params) + '&data=' + JSON.stringify(res.data.data)
                })
              } else {
                if (message.length > 0) {
                  wx.showModal({
                    title: '提示',
                    confirmText: '知道了',
                    content: message,
                    showCancel: false,
                    success: function(res) {}
                  })
                }
                that.setData({
                  cacheLoginInfo: {
                    username: that.data.cacheLoginInfo.username,
                    password: that.data.cacheLoginInfo.password,
                  }
                })
                that.checkButton()
              }
            }
          },
          fail: function(res) {
            wx.hideLoading()
          },
          complete: function() {
            wx.hideLoading()
          }
        })
      })
    }
  },

  clearStorage: function() {
    CacheMessage.ClearStorage()
  },

  closePSView: function() {
    this.setData({
      showPS: false
    })
  },

  toRegister: function() {
    wx.navigateTo({
      url: '../register/register',
    });
  }
})