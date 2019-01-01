// components/tab/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    active: 0,
    detailTab: [{
      text: '在线时间',
      value: 0
    }, {
        text: '评价',
        value: 1
      }]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tabEvent: function(e){
      const index = e.currentTarget.dataset.index
      this.setData({
        active: index
      })
      this.triggerEvent('tabEvent', index)
    }
  }
})
