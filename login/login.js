let app = getApp()
// login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
	  companyAccount:'',
	  loginName:'',
	  loginPwd:'',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
  // 打电话方法
  call:function(){
    wx.makePhoneCall({
      phoneNumber: '020-36523365'
    })
  },
	//监测输入的值：
	setcompanyAccount(e) {
		this.setData({
			companyAccount: e.detail.value
		})
	},
	setloginName(e) {
		this.setData({
			loginName: e.detail.value
		})
	},
	setloginPwd(e) {
		this.setData({
			loginPwd: e.detail.value
		})
	},
  // 验证是否输入为空：
  ifNull() {
	  wx.showModal({
		  title: '提示',
		  content: '这是一个模态弹窗',
		  success: function (res) {
			  if (res.confirm) {
				  console.log('用户点击确定')
			  }
		  }
	  })
		console.log(this.data.companyAccount,this.data.loginName,this.data.loginPwd)
		  if (this.data.companyAccount==''){
			  wx.showToast({
				  title: '请输入单位账号',
				  icon: 'none',
				  duration: 1000
			  })
		  } else if (this.data.loginName=='') {
			  wx.showToast({
				  title: '请输入个人账号',
				  icon: 'none',
				  duration: 1000
			  })
		  } else if (this.data.loginPwd=='') {
			  wx.showToast({
				  title: '请输入密码',
				  icon: 'none',
				  duration:1000
			  })
		  }else{
			// 输入不为空之后提交信息
			  wx.showLoading({
				  title: '正在登录',
			  })
			  this.companyAuth()
		  }
  	},
	
  	//发送信息给登陆服务器,进行单位鉴权,并判断个人账号是否已经绑定有其他微信号
	companyAuth(){
		let this_ = this
		wx.request({
			url: 'https://c.shitangdingcan.com/meals/meals/wechat/loginMiniForLogon', // 接口地址
			// url: 'http://192.168.0.188:8090/meals/meals/wechat/loginMiniForLogon', 
			method: 'POST',
			data: {
				'companyAccount':this.data.companyAccount,
				'loginName':this.data.loginName,
				'loginPwd':this.data.loginPwd
			},
			header: {
				'content-type': 'application/json' // 默认值
			},
			success(res) {
				console.log('登录res',res)
				//   请求成功后判断状态值
				if(res.data.code==0){
					if (res.data.data.status == 0) {
						wx.hideLoading() // 判断完关闭提示框
						wx.showToast({ title: '单位账号不存在！', icon: 'none', duration: 1000 })
					} else if (res.data.data.status == 2) {
						wx.hideLoading() // 判断完关闭提示框
						wx.showToast({ title: '本单位试用已到期！', icon: 'none', duration: 1000 })
					} else if (res.data.data.status == 3) {
						wx.hideLoading() // 判断完关闭提示框
						wx.showModal({
							title: '提示',
							content: '本账号已被其他微信绑定，是否确定重新绑定到本微信？',
							success(res) {
								if (res.confirm) {
									// 发送请求到应用服务器
									this_.userAuth()
								} else if (res.cancel) {
									console.log('用户点击取消')
								}
							}
						})
					} else if (res.data.data.status == 1) {
						// 发送请求到应用服务器
						this_.userAuth()
					}else{
						wx.hideLoading() // 判断完关闭提示框
						console.log('公司状态异常')
					}
				}else{
					wx.hideLoading() // 判断完关闭提示框
					console.log('code!=0')
					wx.showToast({ title: '网络错误！', icon: 'none', duration: 1000 })
				}
				
			},
			fail(res) {
				wx.hideLoading() // 判断完关闭提示框
				console.log('网络错误', res)
			}
		})
	},
	//请求应用服务器进行用户鉴权
	userAuth(){ 
		// let this_ = this
		console.log('app.data.unionId',app.data.openId,app.data.unionId)
		// 测试模态框
		// wx.showModal({
		// 	title: 'app.data.openId|app.data.unionId',
		// 	content: app.data.openId+'|' + app.data.unionId,
		// 	success(res) {
		// 		if (res.confirm) {
		// 			console.log('用户点击确定')
		// 		} else if (res.cancel) {
		// 			console.log('用户点击取消')
		// 		}
		// 	}
		// })
		wx.request({
			url: 'https://b.shitangdingcan.com/meals/meals/wechat/loginMiniForApplication', // 接口地址
			// url: 'http://192.168.0.188:8090/meals/meals/wechat/loginMiniForApplication',
			method: 'POST',
			data: {
				'companyAccount': this.data.companyAccount,
				'loginName': this.data.loginName,
				'loginPwd': this.data.loginPwd,
				'openId': app.data.openId,
				'unionId': app.data.unionId

			},
			header: {
				'content-type': 'application/json' // 默认值
			},
			success(res) {
				console.log('应用res',res)
				//   请求成功后判断状态值
				if(res.data.code == 0){
					if (res.data.data.status == 6){
						wx.hideLoading() // 判断完关闭提示框
						// 跳回初始页，获取组装token的东西
						wx.redirectTo({
							url: '/loading/loading',
						})
					}else if (res.data.data.status == 2 || res.data.data.status == 5) {
						wx.hideLoading() // 判断完关闭提示框
						wx.showToast({ title: '个人账号不存在或密码错误！', icon: 'none', duration: 1000 })
						// wx.navigateTo({ url: "/error/error?msg=个人账号不存在或密码错误！" })
					} else if (res.data.data.status == 3 || res.data.data.status == 4) {
						wx.hideLoading() // 判断完关闭提示框
						wx.showToast({ title: '账号已被管理员禁用或删除！', icon: 'none', duration: 1000 })
						// wx.navigateTo({ url: "/error/error?msg=账号已被管理员禁用或删除！" })
					} else if (res.data.data.status == 7) {
						wx.hideLoading() // 判断完关闭提示框
						wx.showToast({ title: '用户绑定失败！', icon: 'none', duration: 1000 })
						// wx.navigateTo({ url: "/error/error?msg=用户绑定失败!" })
					} else {
						wx.hideLoading() // 判断完关闭提示框
						wx.showToast({ title: '用户状态异常！', icon: 'none', duration: 1000 })
						// console.log('用户状态异常')
					}
				}else {
					wx.hideLoading() // 判断完关闭提示框
					console.log('code!=0')
					wx.showToast({ title: '网络错误！code!=0', icon: 'none', duration: 1000 })
				}
				
			},
			fail(res) {
				wx.hideLoading() // 判断完关闭提示框
				console.log('网络错误', res)
			}
		})
	},
	// test
	test(){
		console.log(app.data.data.text)
		app.data.data.text =  'wo是修改后的全局变量'
		console.log(app.data.data.text)
	}
	
	

})