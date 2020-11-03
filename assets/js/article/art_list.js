$(function () {
	var layer = layui.layer
	var form = layui.form
	var laypage = layui.laypage

	function padZero(n) {
		return n > 9 ? n : '0' + n
	}
	// 格式化时间的过滤器
	template.defaults.imports.dateFormat = function (date) {
		const dt = new Date(date)
		var y = dt.getFullYear()
		var m = padZero(dt.getMonth() + 1)
		var d = padZero(dt.getDate())

		var hh = padZero(dt.getHours())
		var mm = padZero(dt.getSeconds())
		var ss = padZero(dt.getSeconds())

		return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
	}

	// 查询参数对象
	var q = {
		pagenum: 1, // 页码
		pagesize: 2, // 每页显示条数
		cate_id: '', // 文章分类 Id,
		state: '', // 文章的发布状态
	}

	initTable()

	function initTable() {
		$.ajax({
			method: 'GET',
			url: '/my/article/list',
			data: q,
			success: function (res) {
				if (res.status !== 0) {
					return layer.msg('获取文章列表失败！')
				}
				// 使用模板引擎渲染
				var htmlStr = template('tpl-table', res)
				$('tbody').html(htmlStr)

				// 表格数据渲染好后，再渲染分页
				renderPage(res.total)
			},
		})
	}

	// 获取文章分类
	initCate()

	function initCate() {
		$.ajax({
			method: 'GET',
			url: '/my/article/cates',
			success: function (res) {
				if (res.status !== 0) {
					return layer.msg('获取分类数据失败！')
				}
				// 使用模板引擎渲染分类
				var htmlStr = template('tpl-cate', res)
				$('[name=cate_id]').html(htmlStr)
				// 通知 layui 重新渲染表单区域的 UI 结构
				form.render()
			},
		})
	}

	// 筛选功能
	$('#form-search').on('submit', function (e) {
		e.preventDefault()
		var cate_id = $('[name=cate_id]').val()
		var state = $('[name=state]').val()

		q.cate_id = cate_id
		q.state = state

		// 根据最新的筛选条件重新渲染表格数据
		initTable()
	})

	// 渲染分页的方法
	function renderPage(total) {
		laypage.render({
			elem: 'pageBox',
			count: total, // 总条数
			limit: q.pagesize, // 每页显示条数
			curr: q.pagenum, // 默认选中哪一页
			layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
			limits: [2, 3, 5, 10],
			// 分页发生切换的时候触发 jump
			// 1. 点击页码会触发
			// 2. 调用 laypage.render 会触发
			jump: function (obj, first) {
				// 把最新的页码值给查询对象
				q.pagenum = obj.curr
				q.pagesize = obj.limit
				// first 为 false 代表点击页面的时候出发点
				// first 为 true 代表直接调用 laypage.render 触发的
				if (!first) {
					// 获取并渲染
					initTable()
				}
			},
		})
	}

	// 删除文章
	$('tbody').on('click', '.btn-delete', function () {
		var len = $('.btn-delete').length
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
					url: `/my/article/delete/${id}`,
					success: function (res) {
						if (res.status !== 0) {
							return layer.msg('删除文章失败！')
						}
						layer.msg('删除文章成功！')
						// 判断当前页中是否还有剩余的数据
						// 如果没有，则让页码值减1后再重新获取
						if (len === 1) {
							// 证明删除完毕后当前页面已经没有数据了
							// 页码值最小是 1
							q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
						}
						initTable()
					},
				})
			}
		)
	})
})
