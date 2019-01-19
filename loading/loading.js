// loading/loading.js
let app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) { 
	},
	// 获取code
	getCode(){
		let this_ = this
		wx.login({
			success(res){
				this_.authed(res.code)
			},
			fail(err){
				console.log('codefail',err)
			}
		})
	},
	authed(code){
		wx.getUserInfo({
			data: {
				withCredentials: true,
			},
			success(res) {
				console.log('encryptedData',res.encryptedData)
				console.log('iv', res.iv)
				console.log('code',code)
				// 发送encryptedData等信息到登录服务器，根据返回状态跳转：
				wx.request({
					url: 'https://c.shitangdingcan.com/meals/meals/wechat/decodeUserInfo',
					// url: 'http://192.168.0.188:8090/meals/meals/wechat/decodeUserInfo', 
					data:{
						// 'iv':'123',
						// 'encryptedData':'eeee',
						// 'code':'code'
						'iv':res.iv,
						'encryptedData':res.encryptedData,
						'code':code
					},
					header: {
						'content-type': 'application/json' // 默认值
					},
					method:'POST',
					success(res){
						console.log('解密结果',res)
						if(res.data.code == 0){
							console.log('loading获取到：app.data.openId|app.data.unionId')
							app.data.openId = res.data.data.wechatUserInfo.openId
							app.data.unionId = res.data.data.wechatUserInfo.unionId
							console.log('app.data.openId', app.data.openId, 'app.data.openId', app.data.unionId)
							// wx.showToast({ title: 'app.data.openId:' + app.data.openId +'app.data.unionId:'+app.data.unionId, icon: 'none', duration: 5000 })
							if (res.data.data.authUserInfo !=null){
								if (res.data.data.authUserInfo.status == '1') {
									app.data.compId = res.data.data.authUserInfo.compId
									app.data.loginName = res.data.data.authUserInfo.loginName
									// 已绑定：跳转meals/meals
									wx.hideLoading() // 跳转前关闭提示框
									wx.redirectTo({
										url: '/meals/meals',
									})
								} else {
									//未绑定或解绑： 跳转到 /login/login
									wx.hideLoading() // 跳转前关闭提示框
									wx.redirectTo({
										url: '/login/login',
									})
								}

							}else{
								// 绑定信息为空
								wx.hideLoading() // 跳转前关闭提示框
								wx.redirectTo({
									url: '/login/login',
								})
							}
						}
					},
					fail(err){
						console.log('err', err)
						wx.hideLoading() // 跳转前关闭提示框
						wx.navigateTo({ url: "/error/error?msg=网络错误，请稍后重试" })

					}
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
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		wx.showLoading({
			title: '加载中',
		})
		// 检验登陆态是否过期
		// let that = this
		// wx.checkSession({
		// 	success() {
		// 		// session_key 未过期，并且在本生命周期一直有效
		// 		console.log('session_key 未过期，并且在本生命周期一直有效')
		// 	},
		// 	fail() {
		// 		// session_key 已经失效，需要重新执行登录流程
		// 		// wx.login() // 重新登录
		// 		console.log('已经失效，需要重新执行登录流程')
		// 	}
		// })
		let this_ = this
		// 查看是否授权
		wx.getSetting({
			success(res) {
				if (res.authSetting['scope.userInfo']) {
					// 已经授权，可以直接调用 getUserInfo 获取头像昵称,encryptedData等。
					this_.getCode()
				} else {
					// 未授权
					console.log('未授权')
					// 跳转前关闭提示框
					wx.hideLoading()
					wx.redirectTo({
						url: '/auth/auth',
					})
				}
			}
		})
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