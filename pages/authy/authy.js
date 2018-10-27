const app = getApp()
const wxService = require('../../servies/wx.js')

Page({
  data: {
    userInfo: {},
    goToHome: false,
    marketChannel: false
  },
  onLoad: function (options) {
    if (options.goHome === 'y') {
      this.setData({
        goToHome: true
      })
    } else if (options.marketChannel === 'y') {
      this.setData({
        marketChannel: true
      })
    }
  },

  getUserInfo: function (e) {
    let that = this
    wx.login({
      success: function (res) {
        console.log(res)
        if (res.code && e.detail.iv) {
          let param = {
            js_code: res.code,
            grant_type: 'authorization_code',
            appid: appID,
            secret,
          }
          wxService.getSessionKey().then(res=>{

          })

        } else {
          /*
          wx.showToast({
            title: '授权失败，请重试',
            icon: 'none',
            duration: 2000
          })*/
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '授权失败，请重试',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  // 校验手机号用户是否存在
  checkUserExist: function (passportName) {
    app.requestToB({
      baseUrl: app.globalData.baseUrlNew,
      url: app.globalData.requestUrl.userCenter.checkExist,
      data: {
        passportName
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 200) {
          const isExist = res.data.data.isExist
          wx.redirectTo({
            url: `/pages/register/register?isExist=${isExist}&mobile=${passportName}`,
          })

        } else {
          wx.showModal({
            title: '提示',
            content: res.data.message || '出错啦',
            showCancel: false,
            confirmText: '知道了'
          })
        }
      }
    })
  }
})
