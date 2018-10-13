// components/selectItem/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    typeName: String,
    tabOtherSearch: {
      type: Boolean,
      value: false,
      observer: 'closeWrap'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    selectItemData: {
      language: {
        name: '语言',
        activeItem: '',
        typeName: 'language',
        selectArray: [{
          name: '中文',
          value: 1
        }, {
          name: '俄语',
          value: 2
          }, {
            name: '英语',
            value: 3
          }]
      }, zoom: {
        name: 'zoom',
        activeItem: '',
        typeName: 'zoom',
        selectArray: [{
          name: 'u8',
          value: 1
        }, {
          name: 'u7',
          value: 2
        }, {
          name: 'u6',
          value: 3
        }]
      }, onlineTime: {
        name: '时区',
        activeItem: '',
        typeName: 'onlineTime',
        selectArray: [{
          name: '9:00-10:00',
          value: 1
        }, {
            name: '10:00-11:00',
          value: 2
        }, {
            name: '14:00-15:00',
          value: 3
        }]
      }, prices: {
        name: '价格',
        activeItem: '',
        typeName: 'prices',
        selectArray: [{
          name: '100-200',
          value: 1
        }, {
          name: '150-300',
          value: 2
        }, {
          name: '500以上',
          value: 3
        }]
      }
    },
    currentSearch: {},
    openActive: ''//展开的item名称
  },
  ready: function(){
    const that = this;
    that.setData({
      currentSearch: that.data.selectItemData[that.data.typeName]
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 展开收起
    toogleItem: function(){
      const that = this;
      that.triggerEvent('toogleItem')
      let isActive = that.data.openActive == that.data.currentSearch.typeName
      that.setData({
        openActive: isActive ? '' : that.data.currentSearch.typeName
      })
    },
    //选中选项
    selectItem: function(e){
      const that = this;
      let currentSearch = that.data.currentSearch
      currentSearch.activeItem = currentSearch.selectArray[e.currentTarget.dataset.index].value
      that.setData({
        currentSearch
      })
      that.triggerEvent('selectItem',{
        currentSearch
      })
    },
    closeWrap: function(){
      const that = this;
      that.setData({
        openActive: ''
      })
    }
    
  }
})
