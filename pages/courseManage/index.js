// pages/courseManage/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
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
    if (that.checkoutEmpty()) {
      RequestMessage.request({
        url: 'bookingcourse',
        method: 'post',
        data: {
          tearcherId: '402880e5668b71ad01668c91604a0000',
          language: that.data.selectCourseObj.value,
          price: that.data.price
        },
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