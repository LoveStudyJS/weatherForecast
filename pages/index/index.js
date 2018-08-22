//index.js
//获取应用实例
var bmap = require('../../libs/bmap-wx.js'); 
const app = getApp()

Page({
  data:{
    latitude: null,
    longitude: null,
    currentWeather: null,
    date: null,
    originalData: null
  },
  onLoad: function(){
    console.log('111111')
    const _that = this
    wx.getLocation({
      success: function(res) {
        console.log(res)
        _that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
        _that.init()
      },
    })
  },
  init() {
    let _that = this
    let BMap = new  bmap.BMapWX({
      ak: app.globalData.ak
    })
    BMap.weather({
      location: `${this.data.longitude},${this.data.latitude}`,
      fail: _that.fail,
      success: _that.success,
    })
  },
  success: function(res){
    console.log(res)
    this.setData({
      currentWeather: res.currentWeather[0],
      date: res.originalData.date,
      originalData: res.originalData.results[0]
    })
    let copyData = this.data.originalData
    copyData.weather_data[0].date = '今天'
    this.setData({
      originalData: copyData
    })
  }
})
