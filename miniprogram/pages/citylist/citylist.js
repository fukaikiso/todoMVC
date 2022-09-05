// pages/citylist/citylist.js

const map = require('../../libs/map')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    map:map,
    letter:'A',
    city: '未选择',
    location:false
  },

  tapLetter(event){
    // console.log(event.target.dataset)
    this.setData({
      letter: event.target.dataset.i
    })
  },

  tapCity(event){
    let city = event.target.dataset.city
    // console.log(city)
    if(city == undefined){
      return
    }else{
      getApp().globalData.city = city
      wx.navigateBack()
  }
},

  tapLocCity(event){
    let city = event.target.dataset.city
    // console.log(city)
    if (this.data.location){
      getApp().globalData.city = city
      wx.navigateBack()
    }else {
      wx.showModal({
        title:'提示',
        content:'未授权，是否跳转到设置重新授权？',
        success:(res)=>{
          // console.log(res)
          if(res.confirm){
            wx.openSetting({
              success:(res)=>{
                if(res.authSetting['scope.userLocation']){
                  this.getLocationInfo()
                }
              }
            })
          }
        }
      })
    }
  },

  getLocationInfo(){
    // let QQMapWX = require('../../libs/qqmap-wx-jssdk.js')
    // let qqmapsdk = new QQMapWX({
    //   key:'EABBZ-RE2C6-W4ISQ-M3WNA-DQCW5-KFFRK'
    // })
    let qqmapsdk = getApp().globalData.qqmapsdk
    qqmapsdk.reverseGeocoder({
      success:(res)=>{
        let city = res.result.address_component.city
        // console.log(city)
        this.setData({
          city,
          location : true
        })
        getApp().globalData.city = city
      },
      fail:(err)=>{
        // console.log(err)\
        this.setData({
          city: '定位失败，点击重试',
          location: false
        })
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log(map)
    this.getLocationInfo()

    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})