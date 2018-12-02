import RequestMessage from '../utils/RequestMessage.js'
import CacheMessage from '../utils/CacheMessage.js'

// 获取用户类型
let getUserType = () => {
  return new Promise((resolve,reject) => {
    RequestMessage.request({
      url: 'userType',
      data: {
        page: 0,
        size: 100
      },
      method: 'get',
      success: function (res) {
        console.log(res)
        resolve(res)
      },
      fail: function (err) {
        reject(err)
      }
    })
  })
}

// 获取教师课程
let getteacherCourse = (teacherId) => {
  return new Promise((resolve,reject) => {
    RequestMessage.request({
      url: 'bookingcourseList',
      method: 'get',
      data: {
        teacherId: teacherId
      },
      success: function (res) {
        resolve(res)
      },
      fail: function () {
        reject()
      }
    })
  })
}

module.exports = {
  getUserType,
  getteacherCourse
}