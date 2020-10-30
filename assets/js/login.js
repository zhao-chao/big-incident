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
	var layer = layui.layer

	// 自定义校验规则
	form.verify({
		// 自定义了一个叫做 pwd 校验规则
		pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
		// 校验两次密码是否一致的规则
		repwd: function (value) {
			// 通过形参拿到的是确认密码框中的内容
			// 还需要拿到密码框中的内容
			// 然后进行一次等于的判断
			// 如果判断失败,则return一个提示消息即可
			var pwd = $('.reg-box [name=password]').val()
			if (pwd !== value) {
				return '两次密码不一致！'
			}
		},
	})
	// 注册功能 监听注册表单的提交事件
	$('#form_reg').on('submit', function (e) {
		// 1. 阻止默认的提交行为
		e.preventDefault()
		// 2. 发起Ajax的POST请求
		var data = {
			// 获取用户名
			username: $('#form_reg [name=username]').val(),
			// 获取密码
			password: $('#form_reg [name=password]').val(),
		}
		$.post('http://ajax.frontend.itheima.net/api/reguser', data, function (
			res
		) {
			// 判断是否成功
			if (res.status !== 0) {
				// 失败的话弹出提示框
				return layer.msg(res.message)
			}
			layer.msg('注册成功，请登录！')
			// 模拟人的点击行为
			$('#link_login').click()
		})
	})
})
