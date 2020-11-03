$(function () {
	var layer = layui.layer
	var form = layui.form
	// 获取文章分类的列表
	initArtCateList()

	function initArtCateList() {
		$.ajax({
			method: 'GET',
			url: '/my/article/cates',
			success: function (res) {
				var htmlStr = template('tpl-table', res)
				$('tbody').html(htmlStr)
			},
		})
	}

	// 添加类别弹框
	var indexAdd = null
	$('#btnAddCate').on('click', function () {
		indexAdd = layer.open({
			type: 1,
			area: ['500px', '250px'],
			title: '添加文章分类',
			content: $('#dialog-add').html(),
		})
	})

	// 添加文章分类，通过委托的形式为表单绑定提交事件
	$('body').on('submit', '#form-add', function (e) {
		e.preventDefault()
		$.ajax({
			method: 'POST',
			url: '/my/article/addcates',
			data: $(this).serialize(),
			success: function (res) {
				if (res.status !== 0) {
					return layer.msg('新增分类失败！')
				}
				// 重新获取分类数据
				initArtCateList()
				// 提示成功消息
				layer.msg('新增分类成功！')
				// 关闭弹出层
				layer.close(indexAdd)
			},
		})
	})

	// 通过代理的方式，为 btn-edit 按钮绑定点击事件
	var indexEdit = null
	$('tbody').on('click', '.btn-edit', function () {
		// 修改分类信息的层
		indexEdit = layer.open({
			type: 1,
			area: ['500px', '250px'],
			title: '修改文章分类',
			content: $('#dialog-edit').html(),
		})

		// 获取当前分类数据
		var id = $(this).attr('data-id')
		$.ajax({
			method: 'GET',
			url: `/my/article/cates/${id}`,
			success: function (res) {
				form.val('form-edit', res.data)
			},
		})
	})

	// 修改文章分类
	$('body').on('submit', '#form-edit', function (e) {
		e.preventDefault()
		$.ajax({
			method: 'POST',
			url: '/my/article/updatecate',
			data: $(this).serialize(),
			success: function (res) {
				if (res.status !== 0) {
					return layer.msg('更新文章数据失败！')
				}
				layer.msg('更新文章数据成功！')
				// 关闭弹框
				layer.close(indexEdit)
				// 更新分类数据
				initArtCateList()
			},
		})
	})

	// 通过委托的形式为删除按钮绑定点击事件
	$('tbody').on('click', '.btn-delete', function () {
		var id = $(this).attr('data-id')
		layer.confirm(
			'确认删除?',
			{
				icon: 3,
				title: '提示',
			},
			function (index) {
				$.ajax({
					method: 'GET',
					url: `/my/article/deletecate/${id}`,
					success: function (res) {
						if (res.status !== 0) {
							return layer.msg('删除分类失败！')
						}
						layer.msg('删除分类成功！')
						layer.close(index)
						initArtCateList()
					},
				})
			}
		)
	})
})
