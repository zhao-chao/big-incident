$(function () {
	var layer = layui.layer
	var form = layui.form

	initCate()
	// 定义加载文章分类的方法
	function initCate() {
		$.ajax({
			method: 'GET',
			url: '/my/article/cates',
			success: function (res) {
				if (res.status !== 0) {
					return layer.msg('初始化文章分类失败！')
				}
				// 调用模板引擎，渲染分类的下拉菜单
				var htmlStr = template('tpl-cate', res)
				$('[name=cate_id]').html(htmlStr)
				// 一定要记得调用 form.render() 方法
				form.render()
			},
		})
	}
})
