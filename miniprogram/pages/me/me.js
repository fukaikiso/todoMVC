// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    isLogin:false

  },

  taptap(){
    console.log('么么哒...')
  },

  tapLogin(){
    if(this.data.isLogin) return

    wx.getUserProfile({
      desc: '获取用户信息用于维护会员权益',
      success:(res)=>{
        console.log('获取用户信息',res)
        this.setData({
          userInfo:res.userInfo,
          isLogin: true
        })
        let db = wx.cloud.database()
        db.collection('user').get().then(loginRes=>{
          console.log(loginRes)
          if(loginRes.data.length==0){
            this.regist(res.userInfo)
          }else{
            this.setData({
              userInfo: loginRes.data[0]
            })
          }
        })
        
        // this.regist(res.userInfo)
      }
    })
  },

  tapAvatar(){
    if(!this.data.isLogin) return
    console.log('选择头像')
    wx.chooseMedia({
      count:1,
      mediaType:['image'],
      success:(res)=>{
        console.log(res)
        let path = res.tempFiles[0].tempFilePath
        let userInfo = this.data.userInfo
        userInfo.avatarUrl = path
        this.setData({userInfo})
        this.upload(path)
      }
    })
  },

  upload(path){
    let ext = path.substr(path.lastIndexOf('.'))
    let cloudPath = Math.random() + ext
    wx.cloud.uploadFile({
      filePath:path,
      cloudPath:cloudPath,
      success:(res)=>{
        console.log('上传成功',res)
        let fileID = res.fileID
        this.updateUserAvatar(fileID)
      }
    })
  },

  updateUserAvatar(fileID){
    let db = wx.cloud.database()
    let _id = this.data.userInfo._id
    db.collection('user').doc(_id).update({
      data :{avatarUrl:fileID},
      success:(res)=>{
        console.log('修改用户头像成功',res)
      }
    })
  },

  regist(userInfo){
    let db = wx.cloud.database()
    db.collection('user').add({
      data:userInfo,
      success:(res)=>{
        console.log('注册成功',res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
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