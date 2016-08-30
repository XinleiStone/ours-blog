// 路由
var note = require('../db/noteDao');
module.exports = function(app, passport) {

	// =====================================
	// 主页（登录之后列出笔记列表） ========
	// =====================================
	app.get('/', isLoggedIn, note.getNotesList, function(req, res) {
		var data = req.resultData;
		res.render('index', { datas: data });
	});

	// =====================================
	// 渲染登录页面 ========================
	// =====================================
	app.get('/login', function(req, res) {

		if (req.body.remember) {
			req.session.cookie.maxAge = 3600 * 24;
		} else {
			req.session.cookie.expires = -1;
		}
		// 渲染页面并传递信息
		res.render('login.jade', {
			message: req.flash('loginMessage')
		});
	});

	// 点击登录按钮
	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/', 			// 重新定位到主页
		failureRedirect: '/login', 		// 重新定位到登录页面
		failureFlash: true 				// 允许传递信息
	}));

	// =====================================
	// 渲染注册页面 ========================
	// =====================================
	app.get('/signup', function(req, res) {
		// 渲染页面并传递信息
		res.render('signup', {
			message: req.flash('signupMessage')
		});
	});

	// 点击注册之后
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/', 			// 重新定位到主页
		failureRedirect: '/signup', 	// 重新定位到注册页面
		failureFlash: true 				// 允许传递信息
	}));

	// =====================================
	// 登出后跳转到登录页面 ================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/login');
	});

	// =====================================
	// 添加笔记 ============================
	// =====================================
	app.post('/addNote', note.add, function(req, res, next) {
		res.redirect('/');
	});

	// =====================================
	// 获取笔记列表 ========================
	// =====================================
	app.get('/notesList', function(req, res, next) {
		note.getNotesList(req, res, next);
	});

	// =====================================
	// 浏览某一条笔记 ======================
	// =====================================
	app.get('/display', isLoggedIn, note.display, function(req, res, next) {
		var data = req.resultData;
		res.render("display", {datas: data});
	});

	// =====================================
	// 写笔记 ==============================
	// =====================================
	app.get('/write', isLoggedIn, function(req, res, next) {
		res.render("write.jade");
	});

	// =====================================
	// 渲染修改笔记页面 ====================
	// =====================================
	app.get('/modify', isLoggedIn, note.display, function(req, res, next) {
		var data = req.resultData;
		res.render("modify.jade", {datas: data});
	});

	// =====================================
	// 修改笔记内容 ========================
	// =====================================
	app.post('/modifyNote', isLoggedIn, note.modify, note.display, function(req, res, next) {
		var data = req.resultData;
		res.render("display", {datas: data});
	});

	// =====================================
	// 删除笔记 ============================
	// =====================================
	app.get('/delete', isLoggedIn, note.delete, function(req, res, next) {
		res.redirect("/");
	});
};

// 判断登录中间件
function isLoggedIn(req, res, next) {

	// 如果通过
	if (req.isAuthenticated())
		return next();

	// 否则重定位到登录页面
	res.redirect('/login');
}