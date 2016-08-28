// 路由
var note = require('../db/noteDao');
module.exports = function(app, passport) {

	// ========================================
	// HOME PAGE (with login and get notes list
	// ========================================
	app.get('/', isLoggedIn, note.getNotesList, function(req, res) {
		var data = req.resultData;
		res.render('index', { datas: data });
	});

	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/login', function(req, res) {

		if (req.body.remember) {
			req.session.cookie.maxAge = 3600 * 24;
		} else {
			req.session.cookie.expires = -1;
		}
		// render the page and pass in any flash data if it exists
		res.render('login.jade', {
			message: req.flash('loginMessage')
		});
	});

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/', 		// redirect to the secure profile section
		failureRedirect: '/login', 	// redirect back to the signup page if there is an error
		failureFlash: true 			// allow flash messages
	}));

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('signup', {
			message: req.flash('signupMessage')
		});
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/', 			// redirect to the secure index section
		failureRedirect: '/signup', 	// redirect back to the signup page if there is an error
		failureFlash: true 				// allow flash messages
	}));

	// =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user: req.user // get the user out of session and pass to template
		});
	});

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/login');
	});

	app.post('/addNote', note.add, function(req, res, next) {
		res.redirect('/');
	});

	app.get('/notesList', function(req, res, next) {
		note.getNotesList(req, res, next);
	});

	app.get('/display', isLoggedIn, note.display, function(req, res, next) {
		var data = req.resultData;
		res.render("display", {datas: data});
	});

	app.get('/write', isLoggedIn, function(req, res, next) {
		res.render("write.jade");
	});

	app.get('/modify', isLoggedIn, note.display, function(req, res, next) {
		var data = req.resultData;
		res.render("modify.jade", {datas: data});
	});

	app.post('/modifyNote', isLoggedIn, note.modify, note.display, function(req, res, next) {
		var data = req.resultData;
		res.render("display", {datas: data});
	});

	app.get('/delete', isLoggedIn, note.delete, function(req, res, next) {
		res.redirect("/");
	});
};

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/login');
}