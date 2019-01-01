// component/empty/empty.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    subTitle: String,
    nomargintop: Boolean,
    typename: String,
    page: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    param: {}
  },

  ready: function(){
    this.showData();
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 按钮
    btnEvent: function () {
      this.data.param.btnFunction()
    },

    // 文案，方法
    showData: function(){
      const that = this
      const datas = {
        courseManage: {
          title: '没有添加课程',
          buttonText: '去添加',
          btnFunction: function(){
            wx.navigateTo({
              url: '/pages/courseUpdate/index',
            })
          }
        }
      }
      if (that.data.page){
        that.setData({
          param: datas[that.data.page]
        })
      }
    }
  }
})
