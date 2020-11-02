$(function () {
	// 1.1 获取裁剪区域的 DOM 元素
	var $image = $('#image')
	// 1.2 配置选项
	const options = {
		// 纵横比
		aspectRatio: 1,
		// 指定预览区域
		preview: '.img-preview',
	}

	// 1.3 创建裁剪区域
	$image.cropper(options)

	$('#btnChooseImage').on('click', function () {
		$('#file').click()
	})

	// 为文件选择框绑定 change 事件
	$('#file').on('change', function (e) {
		// 获取用户选择的文件
		var filelist = e.target.files
		if (filelist.length === 0) {
			return layer.msg('请选择照片！')
		}

		// 1. 拿到用户选择的文件
		var file = e.target.files[0]
		// 2. 将文件，转化为路径
		var imgURL = URL.createObjectURL(file)
		// 3. 重新初始化裁剪区域
		$image
			.cropper('destroy') // 销毁旧的裁剪区域
			.attr('src', imgURL) // 重新设置图片路径
			.cropper(options) // 重新初始化裁剪区域
	})
})
