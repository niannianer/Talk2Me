let BaseUrls = require('./BaseUrl.js')

export default class RequestMessage {
  isLock = false
  isPush = false
  queue = []
  static requestUrl = {
    judgetime: 'secure/course/bookedschedule/judgetime', // 判断开时间是否合法
    login: 'oauth/token',
    bookingcourse: 'secure/course/bookingcourse/save',//保存教室所授课程和价格
    userinfoSave: 'user/userinfo/save',//保存个人信息
    bookingschedule: 'secure/course/bookingschedule/save', //预定课程
    thUserList: 'user/list/query', 
    bookingcourseList: 'secure/course/bookingcourse/query',
    courseLists: 'management/coursetype/query', //课程种类
    userType: 'user/role/list/query', //用户类型
    scheduleQuery: 'secure/course/bookedschedule/query'
    
  }

  constructor() {}

  // 单例
  static getInstance() {
    if (!RequestMessage.instance) {
      RequestMessage.instance = new RequestMessage()
    }
    return RequestMessage.instance
  }

  static request(args) {
    const baseUrl = 'baseUrl'
    RequestMessage.requestWithBaseUrl(baseUrl, args)
  }

  static requestWithBaseUrl(baseUrl, args) {
    // wx.showNavigationBarLoading()
    let _data = args.data || {}
    const at = wx.getStorageSync('at')
    const rt = wx.getStorageSync('rt')
    if (typeof _data === 'object') {
      if (at.length > 0) {
        _data.at = at
        _data.rt = rt
      }
    }

    const deviceID = wx.getStorageSync('deviceID')
    const departmentId = wx.getStorageSync('departmentId')
    let header = {
      'content-type': args.header && args.header.type ? args.header.type : 'application/json',
      // 'at': at,
      // 'rt': rt,
    }

    console.log(BaseUrls.getBaseUrl(baseUrl) + RequestMessage.requestUrl[args.url])
    // console.log(_data)
    let url = BaseUrls.getBaseUrl(baseUrl) + RequestMessage.requestUrl[args.url]
    if (args.method == 'POST' && typeof args.urlData === 'object'){
      const query = RequestMessage.query(args.urlData)
      url = `${url}${query}`
    }
    wx.request({
      url: url,
      data: _data,
      header: Object.assign(header, args.header),
      method: args.method || 'GET',
      success: function(res) {
        if (res.data.code === 4) { // 登录验证失败 自动登录  （现修改为退出登录）
          return RequestMessage.addQueue({
            baseUrl,
            args
          })
        } else {
          const requestMessage = RequestMessage.getInstance()
          requestMessage.isLock = false
        }
        args.success && args.success(res)
      },
      fail: function(err) {
        args.fail && args.fail(err);
      },
      complete: function(res) {
        // wx.hideNavigationBarLoading()
        args.complete && args.complete(res)
      }
    });
  }

  static getUrl(url) {
    return requestUrl[url] || ''
  }

  static addQueue(request) {
    const requestMessage = RequestMessage.getInstance()
    if (!requestMessage.isLock) {
      requestMessage.queue = []
      requestMessage.queue.push(request)
      requestMessage.isLock = true
      // requestMessage.login()
      wx.setStorageSync('isNotAutoLogin', true)
      //自动登录
      return wx.reLaunch({
        url: '/pages/guide/guide',
      })
    } else {
      return requestMessage.queue.push(request)
    }
  }

  login() {
    // 创建账号
    const that = this
    const qyUserInfo = wx.getStorageSync('qyUserInfo')
    const userInfo = wx.getStorageSync('userInfo')
    RequestMessage.request({
      data: {
        corpId: qyUserInfo.corpid,
        userId: qyUserInfo.userid,
        nickName: qyUserInfo.name,
        orgId: userInfo.org.orgId
      },
      url: 'quickLogin',
      method: 'POST',
      success: (res => {
        console.log(res)
        console.log('loginsdsds')
        if (res.data.code === 0) {
          const data = res.data.data
          wx.setStorageSync('at', data.user.accessToken)
          wx.setStorageSync('rt', data.user.refreshToken)
          wx.setStorageSync('userInfo', data)
          that.isLock = false
          that.sendQueueRequest()
        } else {
          that.isLock = false
          that.queue = []
          return wx.redirectTo({
            //自动登录
            url: '/pages/guide/guide'
          })
        }
      }),
      fail: (res => {
        that.isLock = false
        that.queue = []
        return wx.redirectTo({
          //自动登录
          url: '/pages/guide/guide'
        })
      })
    })
  }

  sendQueueRequest() {
    for (const request of this.queue) {
      RequestMessage.request(request.baseUrl, request.args)
    }
  }
  static query(data){
    let str = [];
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        if (typeof data[key] != 'object') {
          str.push(encodeURIComponent(key) + '=' + encodeURIComponent((data[key])));
        } else {
          str.push(encodeURIComponent(key) + '=' + encodeURIComponent((JSON.stringify(data[key]))));
        }
      }
    }
    return str.join('&');
  }
}