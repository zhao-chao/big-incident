$.ajaxPrefilter(function (options) {
	// 在 AJAX 请求之前，统一拼接请求的根路径
	options.url = 'http://192.168.1.12:3007' + options.url
	// 为有权限的接口设置 headers 请求头
	if (options.url.includes('/my/')) {
		options.headers = {
			Authorization: localStorage.getItem('token') || '',
		}
	}
	options.complete = function (res) {
		// 成功 or 失败都会执行这里
		if (
			res.responseJSON.status === 1 &&
			res.responseJSON.message === '身份认证失败！'
		) {
			// 1. 清空 token
			localStorage.removeItem('token')
			// 2. 强制跳转到登录页
			location.href = '/login.html'
		}
	}
})
