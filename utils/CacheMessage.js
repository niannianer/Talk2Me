const hash = require('./md5.js')
// import LoginService from '../services/LoginService.js'

export default class CacheMessage {
  isFirstLoad = false
  guideIsLoading = true
  teacherId = '402880e666b60d110166b6734fa90004'
  studentId = '402880e6674b097a01674b10b1600000'
  iv = '2029485746583574'
  at = ''
  rt = ''
  deviceID = ''
  userInfo = {}
  departmentId = ''
  systemInfo = {}
  entryPoint = '' // 小程序打开方式
  entryType = 0
  entryParams = {}
  searchHistoryKey = 'bigSearchHistory'
  isShowAddPosition = false
  isNotAutoLogin = false
  hasWantJob = false // 是否搜索了想要招聘的职位名称
  homerecommendsearchList = []
  homerecommendhassearch = false
  commendSearchMaxNum = false
  searchSource = ''
  renzStatusObj = {}

  constructor() {
    // this.loginService = new LoginService()
  }

  // 单例
  static getInstance() {
    if (!CacheMessage.instance) {
      CacheMessage.instance = new CacheMessage()
    }
    return CacheMessage.instance
  }

  set isFirstLoad(value) {
    CacheMessage.isFirstLoad = value
  }

  get isFirstLoad() {
    return CacheMessage.isFirstLoad
  }
  set teacherId(value) {
    CacheMessage.teacherId = value
  }

  get teacherId() {
    return wx.getStorageSync('teacherId')
  }
  set studentId(value) {
    CacheMessage.studentId = value
  }

  get studentId() {
    return wx.getStorageSync('studentId')
  }
  set at(value) {
    CacheMessage.at = value
  }

  get at() {
    return wx.getStorageSync('at')
  }

  set rt(value) {
    CacheMessage.rt = value
  }

  get rt() {
    return wx.getStorageSync('at')
  }

  set entryPoint(value) {
    CacheMessage.entryPoint = value
  }

  get entryPoint() {
    return CacheMessage.entryPoint
  }

  set deviceID(value) {
    CacheMessage.deviceID = value
  }

  get deviceID() {
    return wx.getStorageSync('deviceID')
  }

  set userInfo(value) {
    CacheMessage.userInfo = value
  }

  get userInfo() {
    return CacheMessage.userInfo
  }

  set departmentId(value) {
    CacheMessage.departmentId = value
  }

  get departmentId() {
    return CacheMessage.departmentId
  }

  set systemInfo(value) {
    CacheMessage.systemInfo = value
  }

  get systemInfo() {
    return CacheMessage.systemInfo
  }

  set entryType(value) {
    CacheMessage.entryType = +value
  }

  get entryType() {
    return CacheMessage.entryType
  }

  set entryParams(value) {
    CacheMessage.entryParams = value
  }

  get entryParams() {
    return CacheMessage.entryParams
  }

  set isFirstLoad(value) {
    CacheMessage.isFirstLoad = value
  }

  get isFirstLoad() {
    return CacheMessage.isFirstLoad
  }

  set isShowAddPosition(value) {
    CacheMessage.isShowAddPosition = value
  }

  get isShowAddPosition() {
    return CacheMessage.isShowAddPosition
  }

  set key(value) {
    CacheMessage.key = value
  }

  get key() {
    return CacheMessage.key
  }

  set iv(value) {
    CacheMessage.iv = value
  }

  get iv() {
    return CacheMessage.iv
  }


  set isNotAutoLogin(value) {
    CacheMessage.isNotAutoLogin = value
  }

  setIsNotAutoLogin(value) {
    wx.setStorageSync('isNotAutoLogin', value)
    CacheMessage.isNotAutoLogin = value
  }

  get isNotAutoLogin() {
    return wx.getStorageSync('isNotAutoLogin') || false
  }

  get hasWantJob() {
    return wx.getStorageSync('hasWantJob') || ''
  }

  set hasWantJob(value) {
    CacheMessage.hasWantJob = value
  }

  setHasWantJob(value) {
    wx.setStorageSync('hasWantJob', value)
    CacheMessage.hasWantJob = value
  }

  get homerecommendsearchList() {
    return wx.getStorageSync('homerecommendsearchList') || []
  }

  set homerecommendsearchList(value) {
    CacheMessage.homerecommendsearchList = value
  }
  
  setHomerecommendsearchList(value) {
    wx.setStorageSync('homerecommendsearchList', value)
    CacheMessage.homerecommendsearchList = value
  }

  get homerecommendhassearch() {
    return wx.getStorageSync('homerecommendhassearch') || false
  }

  set homerecommendhassearch(value) {
    CacheMessage.homerecommendhassearch = value
  }

  setHomerecommendhassearch(value) {
    wx.setStorageSync('homerecommendhassearch', value)
    CacheMessage.homerecommendhassearch = value
  }
  
  get commendSearchMaxNum() {
    return wx.getStorageSync('commendSearchMaxNum') || false
  }

  set commendSearchMaxNum(value) {
    CacheMessage.commendSearchMaxNum = value
  }

  setCommendSearchMaxNum(value) {
    wx.setStorageSync('commendSearchMaxNum', value)
    CacheMessage.commendSearchMaxNum = value
  }
  get searchSource() {
    return CacheMessage.searchSource
  }

  set searchSource(value) {
    CacheMessage.searchSource = value
  }
  
  get renzStatusObj() {
    return CacheMessage.renzStatusObj
  }

  set renzStatusObj(value) {
    CacheMessage.renzStatusObj = value
  }
  initCacheData(options) {
    const that = this
    that.entryPoint = options.scene
    that.deviceID = wx.getStorageSync('deviceID')
    if (!that.deviceID) {
      wx.getSystemInfo({
        success: function(res) {
          const id = hash.md5(res.model + res.pixelRatio + res.windowWidth + res.windowHeight + res.language + res.version + res.platform + Date())
          wx.setStorageSync('deviceID', id)
          that.deviceID = id
        }
      })
    }

    if (wx.getStorageSync('userInfo')) {
      that.userInfo = wx.getStorageSync('userInfo')
    }

    if (wx.getStorageSync('departmentId')) {
      that.departmentId = wx.getStorageSync('departmentId')
    }

    if (wx.getStorageSync('at')) {
      that.at = wx.getStorageSync('at')
      that.rt = wx.getStorageSync('rt')
    }

    wx.getSystemInfo({
      success: function(res) {
        that.systemInfo = res
      }
    })
  }

  // 企业微信登录
  qyWXLogin(callback) {
    const that = this
    wx.qy.login({
      success: (loginRes => {
        // that.loginService.qyWXLogin(loginRes.code, result => {
        //   console.log(result)
        //   wx.setStorageSync('session_key', result['session_key'])
        //   callback && callback(result['session_key'])
        // })
      }),
      fail: (err => {
        console.log('登录失败')
        console.log(err)
      })
    })
  }

  // 校验企业微信登录 静态方法
  static CheckLogin(callback) {
    CacheMessage.getInstance().checkLogin(callback)
  }

  // 校验企业微信登录
  checkLogin(callback) {
    try {
      const that = this
      wx.qy.checkSession({
        success: (_ => {
          const sessionKey = wx.getStorageSync('session_key')
          console.log(sessionKey)
          console.log('sessionKey')
          if (sessionKey && sessionKey != '') {
            callback && callback(sessionKey)
          } else {
            that.qyWXLogin(callback)
          }
        }),
        fail: (_ => {
          that.qyWXLogin(callback)
        })
      })
    } catch (err) {
      throw new Error('目前暂不支持微信，请下载企业微信后使用')
      //   wx.navigateToMiniProgram({
      //     appId: 'wx17102223f3da8045',
      //     path: 'pages/home/index',
      //     envVersion: 'release'
      //   })
      // wx.showModal({
      //   content: '目前暂不支持微信，请下载企业微信后使用',
      //   confirmText: '知道了',
      //   confirmColor: '#4164E1',
      //   showCancel: false,
      //   complete: (_ => {

      //   })
      // })
    }
  }

  // // 获取企业微信信息
  // static GetQYUserInfo(callback) {
  //   CacheMessage.getInstance().getQYUserInfo(callback)
  // }

  // getQYUserInfo(callback) {
  //   const cacheMessage = CacheMessage.getInstance()
  //   const qyUserInfo = wx.getStorageSync('qyUserInfo')
  //   console.log('qyUserInfo')
  //   if (qyUserInfo && qyUserInfo != '') {
  //     console.log(qyUserInfo)
  //     return callback(qyUserInfo)
  //   } else {
  //     cacheMessage.checkLogin(result => {
  //       wx.getUserInfo({
  //         withCredentials: true,
  //         success: (res => {
  //             wx.setStorageSync('qyUserInfo', res)
  //             callback(info)
  //         }),
  //         fail: (err => {
  //           console.log('获取个人信息失败')
  //           console.log(err)
  //         })
  //       })
  //     })
  //   }
  // }

  //获取头像
  static GetQYUserAvatar(callback) {
    return CacheMessage.getInstance().getQYUserAvatar(callback)
  }

  getQYUserAvatar(callback) {
    let that = this;
    const qyUserAvatar = wx.getStorageSync('qyUserAvatar')
    if (qyUserAvatar && qyUserAvatar != '') {
      return callback(qyUserAvatar)
    } else {
      const cacheMessage = CacheMessage.getInstance()
      cacheMessage.checkLogin(_ => {
        wx.qy.getAvatar({
          success: function(res) {
            wx.setStorageSync('qyUserAvatar', res.avatar)
            return callback(res.avatar)
          },
          fail: function(err) {
            console.log('获取个人头像失败')
            console.log(err)
          }
        })
      })
    }
  }

  //校验智联账号登录
  static CheckZLLogin() {
    return CacheMessage.getInstance().checkZLLogin()
  }

  checkZLLogin() {
    const at = wx.getStorageSync('at')
    return (at && at.length > 0) ? true : false
  }

  // 获取智联账号登录信息
  getUserInfo() {
    return wx.getStorageSync('userInfo') || {}
  }

  setEntry(options) {
    this.entryPoint = options.scene
    console.log(options)
    if (options.query.type && options.query.params) {
      this.entryType = +options.query.type
      this.entryParams = JSON.parse(options.query.params)
    } else {
      this.clearEntryData()
    }
  }

  //搜索缓存
  static SetLocationSearchHistory(cityId, cityName, searchVal) {
    CacheMessage.getInstance().setLocationSearchHistory(cityId, cityName, searchVal)
  }

  setLocationSearchHistory(cityId, cityName, searchVal) {
    let that = this
    const newSearchHistory = {
      cityId: cityId,
      cityName: cityName,
      val: searchVal,
      time: (new Date()).getTime()
    }
    let historyArr = wx.getStorageSync(this.searchHistoryKey) || []

    const tempHistoryArr = JSON.parse(JSON.stringify(historyArr))
    for (const index in historyArr) {
      const history = historyArr[index]
      if (history.cityId === newSearchHistory.cityId && history.val === newSearchHistory.val) {
        tempHistoryArr.splice(index, 1)
        break
      }
    }

    historyArr = [newSearchHistory].concat(tempHistoryArr)

    if (historyArr.length > 10) {
      historyArr.splice(10, historyArr.length - 10)
    }

    wx.setStorage({
      key: that.searchHistoryKey,
      data: historyArr
    })
  }

  // 清除消息参数
  static ClearEntryData() {
    CacheMessage.getInstance().clearEntryData()
  }

  clearEntryData() {
    this.entryType = 0
    this.entryParams = {}
  }

  // 清除缓存
  static ClearStorage() {
    CacheMessage.getInstance().clearStorage()
  }

  clearStorage() {
    try {
      this.at = ''
      this.rt = ''
      this.entryPoint = '' // 小程序打开方式
      this.deviceID = ''
      this.userInfo = {}
      this.departmentId = ''
      this.systemInfo = {}
      
      let res = wx.getStorageInfoSync()
      res.keys.forEach(item => {
        if (item !== 'deviceID' && item !== 'username' && item !== 'bigSearchHistory' && item != 'isNotAutoLogin') {
          try {
            wx.removeStorageSync(item)
          } catch (e) {
            console.log(e)
          }
        }
      })
    } catch (e) {
      console.log(e)
    }
  }


// 清空首页未认证状态人才推荐
  static ClearHomeRecommend() {
    CacheMessage.getInstance().clearHomeRecommend()
  }

  clearHomeRecommend() {
    try {
      this.renzStatusObj = {}
      this.searchSource = ''
      this.hasWantJob = false // 是否搜索了想要招聘的职位名称
      this.homerecommendsearchList = []
      this.homerecommendhassearch = false
      this.commendSearchMaxNum = false
      let jobCommendArr = ['hasWantJob', 'homerecommendsearchList', 'homerecommendhassearch', 'commendSearchMaxNum']
      let res = wx.getStorageInfoSync()
      res.keys.forEach(item => {
        try {
          if (jobCommendArr.indexOf(item) > -1) {
            wx.removeStorageSync(item)
          }
        } catch (e) {
          console.log(e)
        }
      })
    } catch (e) {
      console.log(e)
    }
  }


  static ClearAll() {
    CacheMessage.getInstance().clearAll()
  }

  clearAll() {
    this.clearStorage()
    this.clearEntryData()
    this.clearHomeRecommend()
  }
}