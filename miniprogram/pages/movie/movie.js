// pages/movie/movie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie:null,
    active:true,
    comments:null
  },

  tapIntroduction(){
    this.setData({
      active : !this.data.active
    })
  },

  tapImage(event){
    let newUrls = []
    let index = event.target.dataset.index

    if(index == undefined){
      return
    }

    this.data.movie.thumb.forEach(url => {
      newUrls.push(url.split('@')[0])
    })

    wx.previewImage({
      urls: newUrls,
      current: newUrls[index]
      
    })
  },

  getData(){
    let db = wx.cloud.database()
    db.collection('comments').where({
      movieid : this.id
    }).skip(3).limit(4).get({
      success:(res)=>{
        // console.log(res.data)
        this.setData({
          comments:res.data
        })
        
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.id = options.id
    // console.log(id)
    wx.request({
      url: 'https://api.tedu.cn/detail.php',
      method: 'GET',
      data: {id:this.id},
      success: (res)=>{
        // console.log(res)
        this.setData({
          movie: res.data
        })
      }
    })

    this.getData()
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