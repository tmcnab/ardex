module.exports = function (app) 
{
	// Public Actions
	app.get ('/',            require('./IndexAction'));
	app.get ('/article/:id', require('./DetailsAction'));
	app.get ('/help',        require('./HelpAction'));
	app.get ('/login',       require('./LoginAction'));
	app.post('/login',       require('./LoginAction'));
	app.get ('/register', 	 require('./RegisterAction'));
	app.post('/register', 	 require('./RegisterAction'));
	app.get ('/logout',      require('./LogoutAction'));

	// Authorized Functions (next rev)
	app.get ('/edit/:id', require('./EditAction'));
	app.post('/edit/:id', require('./EditAction'));
	app.get ('/submit',   require('./SubmitAction'));
	app.post('/submit',   require('./SubmitAction'));

	// 404 Handler
	app.use(function (req, res, next) {
		res.render('404', { status: 404, url: req.url, title: 'Resource Not Found' });
	});

	// 500 / Any Handler
	app.use(function(err, req, res, next) {
		res.render('500', { status: err.status || 500, error: err, title: 'Server Failure' });
	});
};