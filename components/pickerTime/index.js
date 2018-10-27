// components/pickTime/index.js
const date = new Date()
const years = []
const months = []
const days = []
for (let i = 1990; i <= date.getFullYear() + 1; i++) {
  years.push(i)
}
for (let i = 1; i <= 12; i++) {
  let m = i < 10 ? '0'+i : i
  months.push(m)
}
for (let i = 1; i <= 31; i++) {
  let d = i < 10 ? '0' + i : i
  days.push(d)
}
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    deep: {
      type: String,
      value: '3'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    yearsList: years,
    year: date.getFullYear(),
    monthsList: months,
    month: 2,
    daysList: days,
    day: 2,
    selectedIndex: [years.length-2, 0, 0]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindChange: function (event) {
      let idx = event.detail.value;//value为数组，表示 picker-view 内的 picker-view-column 当前选择的是第几项（下标从 0 开始）
      this.setData({ 'selectedIndex': idx });
      this._load(idx);
    },
    onSure: function (event) {
      const that = this;
      const selectIndex = that.data.selectedIndex
      const datas = { 
        year: that.data.yearsList[selectIndex[0]],
        month: that.data.monthsList[selectIndex[1]],
        day: that.data.daysList[selectIndex[2]]
      };
      this.triggerEvent('sure', {
        timer: datas.year + '-' + datas.month + '-' + datas.day
      });
    },
    onClose: function () {
      this.triggerEvent('closed');
    },
    _load: function (idx) {
      const that = this;
      let dayMax = 31;
      let m = Number(that.data.monthsList[idx[1]])
      let y = that.data.yearsList[idx[0]]
          //判断闰年
      
          //判断小月
       if (m == 4 || m == 6 || m == 9 || m == 11) {
         dayMax = 30;
        } else if(m == 2){
         if ((y % 4 === 0 && y % 100 !== 0) || y % 400 === 0) {
           dayMax = 29;
         }
         else {
           dayMax = 28;
         }
        }else {
          dayMax = 31;
        }
        let days = []
        for (let i = 1; i <= dayMax; i++) {
         let d = i < 10 ? '0' + i : i
         days.push(d)
       }
        that.setData({
          daysList: days
        })
  }
  }
})
