// components/comment/index.js
const moment = require('../../utils/moment.min.js')

moment.locale('zh-cn', {
  longDateFormat: {
    L: "YYYY-MM-DD",
    l: "M月D日ddd"
  }
})

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    commentList: {
      type: Array,
      value: [],
      observer: function(nVal,oVal){
        this.formatList(nVal, oVal)
      }
    },
    commentNum: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    activeIndex: 0,
    lists: []
  },

  ready: {
  },
  /**
   * 组件的方法列表
   */
  methods: {
    tabEvent: function(e){
      const that = this
      const index = e.currentTarget.dataset.index
      let list = []
      if(index == 0){
        list = that.data.allList
      }else if(index == 1){
        list = that.data.goodList
      }else if(index == 2){
        list = that.data.badList
      }
      that.setData({
        activeIndex: index,
        lists: list
      })
    },
    // 格式化数据
    formatList: function (nVal, oVal){
      const that = this
      let goodList = []
      let badList = []
      let allList = []
      nVal.map(function(item){
        // 'YYYY-MM-DD HH:mm:ss'
        item.time = moment(item.submitDate).format('YYYY-MM-DD')
        if(item.commentType == 1){
          goodList.push(item)
        } else if (item.commentType == 0){
          badList.push(item)
        }
      })
      allList = nVal
      that.setData({
        lists: nVal,
        goodList,
        badList,
        allList
      })
    },

  }
})
