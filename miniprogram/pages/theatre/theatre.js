// pages/theatre/theatre.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city:'未选择',
    theatre:[]
  },

  tapTheatre(event){
    let index = event.currentTarget.dataset.index
    let t = this.data.theatre[index]
    wx.openLocation({
      latitude: t.location.lat,
      longitude: t.location.lng,
      name:t.title,
      address:t.address,
      scale:12
    })

  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    

  },

  onShow(){
    this.setData({
      city:getApp().globalData.city
    })
    // console.log(this.city)
    let qqmapsdk = getApp().globalData.qqmapsdk
    qqmapsdk.search({
      keyword: '影院',
      region: this.city,
      page_size:20,
      success:(res)=>{
        console.log(res)
        res.data.forEach(item=>{
          if(item._distance >1000){
            item._disstr = (item._distance/1000).toFixed(2) + 'km'
          }else{
            item._disstr = item._distance.toFixed(0) + 'm'
          }
        })
        this.setData({
          theatre:res.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})