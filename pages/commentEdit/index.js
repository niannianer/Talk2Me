// pages/commentEdit/index.js
const badImg = '../../images/bad-gray.png'
const badImgColor = '../../images/bad-color.png'
const goodImg = '../../images/good-gray.png'
const goodImgColor = '../../images/good-color.png'
import RequestMessage from '../../utils/RequestMessage.js'
import CacheMessage from '../../utils/CacheMessage.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    stars: [
      { src: goodImg, srcColor: goodImgColor, active: false, text: '好评',value: 1 },
      { src: badImg, srcColor: badImgColor,active: false,text:'差评',value:0 }
    ],
    starNum: 0,
    writeText: '',
    merchantName: '',
    teacherId: '',
    studentId: '',
    scheduleId: '',
    commentType: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      teacherId: options.tId || '',
      studentId: options.sId || '',
      scheduleId: options.scheduleId || ''
    })
  },

  //发表评论
  addComment() {
    const that = this
    if (that.data.textLength > 0) {
      wx.showToast({
        title: '请评价12字以上',
        icon: 'none'
      })
    } else {
      const role = wx.getStorageSync('role')
      const cacheMessage = CacheMessage.getInstance()
      const param = {
        reviewerId: role == 2 ? cacheMessage.teacherId : cacheMessage.studentId,
        userId: role == 2 ? that.data.studentId : that.data.teacherId,
        content: that.data.writeText,
        commentType: that.data.commentType,
        title: '',
        scheduleId: that.data.scheduleId
      }
      RequestMessage.request({
        url: 'commentSave',
        method: 'post',
        data: param,
        success: function (res) {
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
                that.getData()
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
  //评分
  rating(e) {
    const that = this
    const stars = that.data.stars
    const index = e.currentTarget.dataset.index
    stars[stars.length-index-1].active = false
    stars[index].active = true
    that.setData({
      stars,
      commentType: stars[index].value
    })
  },
  //文字输入
  textInput(e){
    const val = e.detail.value
    const len = 12 - val.length
    this.setData({
      writeText: val,
      textLength: len>0?len:0
    })
  }
})