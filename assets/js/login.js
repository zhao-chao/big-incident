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

	var form = layui.form
	form.verify({
		pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
	})
})
