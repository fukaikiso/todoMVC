// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [],
    cid: '1',
    city:'未选择'
  },


  /**
   * 封装方法，通过cid与offset加载电影列表
   * @param {number} cid 类别id
   * @param {number} offset 起始下标
   */

  loadData(cid,offset){
    return new Promise((resolve,reject)=>{
      wx.showLoading()
      wx.request({
        url: 'https://api.tedu.cn/index.php',
        method: 'GET',
        data: {
          cid,
          offset,
          city:'未选择'
        },
        success:(res)=>{
          // console.log(res)
          resolve(res.data)
        },
        fail:(err)=>{
          reject(err)
        },
        complete:()=>{
          wx.hideLoading()
        }
      })
    })
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
        this.setData({city})
        getApp().globalData.city = city
      }
    })
  },

  changeCid(event){
    this.setData({
      cid:event.target.dataset.id
    })

    //如果找到cid对应的电影列表，则直接显示
    wx.getStorage({
      key:this.data.cid,
      success:(data)=>{
        // console.log(data)s
        this.setData({
          movies:data.data
        })
      },
      fail:(err)=>{
        console.warn(err)
        this.loadData(this.data.cid,0).then((data)=>{
          this.setData({
            movies:data
          })
          //向缓存中存储
          wx.setStorage({
            key:this.data.cid,
            data:data
          })
    
        }).catch(err=>{
          console.warn(err)
        })
      }
    })

    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadData(1,0).then((data)=>{
      this.setData({
        movies:data
      })
    }).catch(err=>{
      console.warn(err)
    })

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
    // console.log(getApp().globalData.city)
    this.setData({
      city:getApp().globalData.city
    })
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
    // console.log('到底了。。')
    let cid = this.data.cid
    let offset = this.data.movies.length

    this.loadData(cid,offset).then((data)=>{
      if(data.length==0){
        wx.showToast({
          title: '我是有底线的',
          icon: 'error'
        })
      }
      this.setData({
        movies:this.data.movies.concat(data)
      })
    }).catch(err=>{
      console.warn(err)
    })
  },

  onPullDownRefresh(){
    // console.log('下拉刷新')
    this.loadData(this.data.cid,0).then(data=>{
      this.setData({
        movies: data
      })
      wx.setStorage({
        key:this.data.cid,
        data:data
      })
      wx.stopPullDownRefresh()
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  
  
})