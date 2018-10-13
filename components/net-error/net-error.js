// component/net-error/net-error.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    errorText: String
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
    aginEvent: function () {
      this.triggerEvent('aginEvent')
    }
  }
})
