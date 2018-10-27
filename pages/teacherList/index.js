// pages/teacherList/index.js
import RequestMessage from '../../utils/RequestMessage.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoading: true,
    tabOtherSearch: false,
    page: 0,
    size: 10,
    teacherList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    const that = this
    that.setData({
      page: that.data.page+1
    })
    that.getData('next')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
  // 获取列表
  getData: function(type = 'init'){
    const that = this
    let {page,size} = that.data
    RequestMessage.request({
      url: 'thUserList',
      data: {
        page,
        size
      },
      method: 'get',
      success: function (res) {
        let list = that.data.teacherList
        if(type == 'next'){
          list = list.concat(res.data.content || [])
        }else{
          list = res.data.content || []
        }
        that.setData({
          teacherList: list
        })
      },
      fail: function (res) {
        
      },
      complete: function () {
        that.setData({
          isLoading: false
        })
      }
    })
  },

  // 详情
  goDetail: function(e){
    console.log(e)
    wx.navigateTo({
      url: `/pages/teacherDetail/index?id=${e.currentTarget.dataset.id}`,
    })
  },
  selectItem: function(selectObj){
    console.log(selectObj.detail.currentSearch)
  },
  toogleItem: function(){
    const that = this;
    this.setData({
      tabOtherSearch: !that.data.tabOtherSearch
    })
  },
  // 去添加课程
  addCouseHandle: function(){
    wx.navigateTo({
      url: '/pages/courseEdit/index',
    })
  }

})