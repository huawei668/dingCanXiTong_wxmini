// meals/meals.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
	//   ip:'',
	//   port:'',
	//   oaUserId:'',
	//   oaOrgId:'', 
	//   userName:'',
	  openId: '', unionId: '', compId: '', loginName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	//   this.setData({ 
	//   	//   ip: options.ip,
	// 	//   port: options.port,
	// 	//   oaUserId: options.oaUserId,
	// 	//   oaOrgId: options.oaOrgId,
	// 	//   userName: options.userName,
	//    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
	  this.setData({
		  openId: app.data.openId, unionId: app.data.unionId, compId: app.data.compId, loginName: app.data.loginName
	   })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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