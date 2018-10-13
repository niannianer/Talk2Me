// component/no-resume/no-resume.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    subTitle: String,
    nomargintop: Boolean,
    typename: String
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 去找人才
    gotoSerchResume: function () {
      wx.switchTab({
        url: '/pages/search/search',
      })
    },

    //去输入职位名称
    gotoWriteJobname: function(){
      // this.triggerEvent("noresumejump")
      
      wx.navigateTo({
        url: '/pages/wantJob/wantJob',
      })
    }
  }
})
