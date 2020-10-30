$(function () {
	// 点击“去注册账号”的链接
	$('#link_reg').on('click', function () {
		// 影藏登录框
		$('.login-box').hide()
		// 显示注册框
		$('.reg-box').show()
	})

	// 点击“去登录”的链接
	$('#link_login').on('click', function () {
		// 影藏注册框
		$('.login-box').show()
		// 显示登录框
		$('.reg-box').hide()
	})
})
