// pages/courseManage/index.js
import RequestMessage from '../../utils/RequestMessage.js'
import CacheMessage from '../../utils/CacheMessage.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseList: []
  },

  onLoad: function(){
    this.getData()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
  getData: function () {
    const that = this;
    RequestMessage.request({
      url: 'bookingcourseList',
      method: 'get',
      data: {
        tearcherId: CacheMessage.getInstance().teacherId
      },
      success: function (res) {
        console.log(res)
        if (res.data.status != 1) {
          wx.showToast({
            title: '查询失败',
            icon: 'none'
          })
        }else{
          that.setData({
            courseList: res.data.content || []
          })
        }
      },
      fail: function () {
        wx.showToast({
          title: '查询失败',
          icon: 'none'
        })
      }
    })
  },
  //点击删除
  deleteItem: function(item){
    wx.showModal({
      content: '确定删除该课程？',
      success: function(res){
        if (res.confirm){

        }
      }
    })
  },
  deleteSubmit: function(){

  },
  addSubmit: function(){
    wx.navigateTo({
      url: '/pages/courseUpdate/index',
    })
  }
})