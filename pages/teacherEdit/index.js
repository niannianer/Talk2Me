// pages/teacherEdit/index.js
import RequestMessage from '../../utils/RequestMessage.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    contries: [],
    realName: '',
    firstLanguage: '',
    gender: '',
    nationnlity: '',
    habitat: "",
    headimage: "",
    selfIntroduction: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setInitData()
    this.getInfo();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },
  // 获取个人信息
  getInfo: function(){
    console.log('sasa')
  },
  // 提交个人信息
  submit: function(){
    const that = this
    const firstLanguage = that.data.languageActive.value//第一语言
    const gender = that.data.sexActive.value//性别
    const nationnlity = that.data.contryActive.value//国籍
    let { realName, habitat, selfIntroduction} = that.data
    let param = {
      realName,
      firstLanguage,
      gender,
      nationnlity,
      habitat,
      selfIntroduction
    }
    console.log(param)
    if (that.checkoutEmpty()) {
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
  checkoutEmpty: function(){
    return true
  },
  // 输入框
  inputChange: function(e){
    const that = this
    const type = e.currentTarget.dataset.type
    const value = e.detail.value
    if(type == 'realName'){
      that.setData({
        realName: value
      })
    }else{
      that.setData({
        selfIntroduction: value
      })
    }
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
        that.setData({
          avatry: res.tempFilePaths
        })
      }
    })
  },

  // 语言
  pickerChange: function(e){
    const type = e.currentTarget.dataset.type
    if(type == 'language'){
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
  // 输入框输入
  inputChange: function(e){
    const type = e.currentTarget.dataset.type
    if (type == 'habitat'){
      this.setData({
        habitat: e.detail.value
      })
    }else if(type == 'realName'){
      this.setData({
        realName: e.detail.value
      })
    } else if (type == 'selfIntroduction'){
      this.setData({
        selfIntroduction: e.detail.value
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
      sexActive: {
        name: '男',
        value: 1
      },
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