// pages/teacherEdit/index.js
import RequestMessage from '../../utils/RequestMessage.js'
import CacheMessage from '../../utils/CacheMessage.js'
import BaseUrl from '../../utils/BaseUrl.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    contries: [],
    sysUserId: '',
    role: 1,
    info: {},
    isLoading: true,
    avatary: '',
    serviceUrl: BaseUrl.getBaseUrl('baseUrl')
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
    that.setInitData()
    that.getInfo();
  },
  
  // 提交个人信息
  submit: function () {
    const that = this
    const firstLanguage = that.data.languageActive.value//第一语言
    const gender = that.data.sexActive.value//性别
    const nationnlity = that.data.contryActive.value//国籍
    let { realName, habitat, selfIntroduction, sysUserId, id, headimage } = that.data.info
    let param = {
      id,
      sysUserId,
      realName,
      firstLanguage,
      gender,
      nationnlity,
      habitat,
      selfIntroduction,
      headimage
    }
    if (that.checkEmpty()) {
      RequestMessage.request({
        url: 'userinfoSave',
        method: 'post',
        data: param,
        success: function (res) {
          console.log(res)
          if (res.data.status != 1) {
            wx.showToast({
              title: '提交失败',
              icon: 'none'
            })
          } else {
            wx.showToast({
              title: '提交成功',
              icon: 'none',
              duration: 2000,
              success: function () {
                wx.navigateBack({
                  delta: 1
                })
              }
            })
          }
        },
        fail: function () {
          wx.showToast({
            title: '提交失败',
            icon: 'none'
          })
        }
      })
    }
  },
  // 获取个人信息
  getInfo: function () {
    const that = this
    if (!that.data.sysUserId) {
      return
    }
    RequestMessage.request({
      url: that.data.role == 1 ?'studentDetail':'teacherDetail',
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
          sexActive: that.data.sexs[content.gender-1],
          avatary: content.headimage ? that.data.serviceUrl + content.headimage: ''
        })
        
      },
      fail: function (res) {

      }
    })
  },
  checkEmpty: function () {
    return true
  },
  // 输入框
  inputChange: function (e) {
    const that = this
    const type = e.currentTarget.dataset.type
    const value = e.detail.value
    that.data.info[type] = value
    that.setData({
      info: that.data.info
    })
    console.log(that.data.info)
  },
  // 上传图片
  uploadImg: function () {
    const that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: that.data.serviceUrl+'talk2me/upload',
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            file: tempFilePaths[0]
          },
          success(res) {
            const data = JSON.parse(res.data)
            if (data.status == 1){
              that.data.info.headimage = data.content
              that.setData({
                info: that.data.info,
                avatary: that.data.serviceUrl + data.content
              })
            }else{
              wx.showToast({
                title: '上传失败，请稍后再试！',
                icon: 'none'
              })
            }
          }
        })
      }
    })
  },

  // 语言
  pickerChange: function (e) {
    const type = e.currentTarget.dataset.type
    if (type == 'language') {
      this.setData({
        languageActive: this.data.firstLanguages[e.detail.value]
      })
    } else if (type == 'gender') {
      this.setData({
        sexActive: this.data.sexs[e.detail.value]
      })
    } else if (type == 'contry') {
      this.setData({
        contryActive: this.data.contries[e.detail.value]
      })
    }

  },

  //  初始值设置
  setInitData: function () {
    this.setData({
      contryActive: {
        name: '中国',
        value: 'china'
      },
      contries: [{
        name: '中国',
        value: 'china'
      }, {
        name: '新西兰',
        value: 'newzealand'
      }, {
        name: '新加坡',
        value: 'singapore'
      }],
      sexs: [{
        name: '男',
        value: 1
      }, {
        name: '女',
        value: 2
      }],
      userTypeActive: {
        name: '学生',
        value: 1
      },
      userTypes: [{
        name: '学生',
        value: 1
      }, {
        name: '老师',
        value: 2
      }],
      languageActive: {
        name: 'English',
        value: 'english'
      },
      firstLanguages: [{
        name: 'English',
        value: 'english'
      }, {
        name: 'Franch',
        value: 'franch'
      }]
    })

  }
})