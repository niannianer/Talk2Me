/**
 * 微信小程序
 */
const wxConfig = require('./wxConfig')

/**
 * let params = {
      js_code: code,
      appid: appID,
      secret,
      grant_type: 'authorization_code'
    }
 * 
 */
let getSessionKey = (_data) => {
  return new Promise((resolve,reject) => {
    wx.request({
      url: 'https://api.weixin.qq.com/sns/jscode2session',
      data: _data,
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
        resolve(res)
      },
      fail: function(err){
        reject(err)
      }
    })
  })
}

//获取小程序码
let getxacodeunlimit = () => {
  return new Promise((resolve,reject)=>{
    wx.request({
      url: 'https://api.weixin.qq.com/wxa/getwxacodeunlimit',
      data: _data,
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
        resolve(res)
      },
      fail: function (err) {
        reject(err)
      }
    })
  })
}

