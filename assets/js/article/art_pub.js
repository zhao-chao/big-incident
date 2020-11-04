$(function () {
	var layer = layui.layer
	var form = layui.form
	// 加载文章分类
	initCate()
	// 初始富文本编辑器
	initEditor()

	function initCate() {
		$.ajax({
			method: 'GET',
			url: '/my/article/cates',
			success: function (res) {
				if (res.status !== 0) {
					return layer.msg('初始化文章分类失败！')
				}
				// 使用模板引擎，渲染分类的下拉菜单
				var htmlStr = template('tpl-cate', res)
				$('[name=cate_id]').html(htmlStr)
				form.render()
			},
		})
	}

	// 1. 初始化图片裁剪器
	var $image = $('#image')
	// 2. 裁剪选项
	var options = {
		aspectRatio: 400 / 280,
		preview: '.img-preview',
	}
	// 3. 初始化裁剪区域
	$image.cropper(options)

	// 选择封面功能
	$('#btnChooseImage').on('click', function () {
		// 模拟点击行为
		$('#coverFile').click()
	})

	// 监听 coverFile 的 change
	$('#coverFile').on('change', function (e) {
		var files = e.target.files
		if (files.length === 0) {
			return
		}
		var newImgURL = URL.createObjectURL(files[0])
		// 为裁剪区域重新设置图片
		$image
			.cropper('destroy') // 销毁旧的裁剪区域
			.attr('src', newImgURL) // 重新设置图片路径
			.cropper(options) // 重新初始化裁剪区域
	})

	// 定义文章的发布状态
	var art_state = '已发布'
	$('#btnSave2').on('click', function () {
		art_state = '草稿'
	})

	// 为表单绑定 submit 提交事件
	$('#form-pub').on('submit', function (e) {
		e.preventDefault()
		// 基于 form 表单快速创建一个 FormData 对象
		var fd = new FormData($(this)[0])
		fd.append('state', art_state)
		/* fd.forEach(function (v, k) {
            console.log(k, v);
        }); */

		$image
			.cropper('getCroppedCanvas', {
				// 创建一个 Canvas 画布
				width: 400,
				height: 280,
			})
			.toBlob(function (blob) {
				// 将 Canvas 画布上的内容，转化为文件对象
				// 得到文件对象后，进行后续的操作
				fd.append('cover_img', blob)
				publishArticle(fd)
			})
	})

	function publishArticle(fd) {
		$.ajax({
			method: 'POST',
			url: '/my/article/add',
			data: fd,
			contentType: false,
			processData: false,
			success: function (res) {
				if (res.status !== 0) {
					return layer.msg('发布文章失败！')
				}
				layer.msg('发布文章成功！')
				location.href = '/article/art_list.html'
				window.parent.document
					.querySelector('[href="/article/art_list.html"]')
					.click()
			},
		})
	}
})
