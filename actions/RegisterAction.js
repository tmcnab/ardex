var Account = require('../models/Account');

function get (req, res) 
{
	res.render('register');
}

function post (req, res) 
{
	var email = req.body.email.trim().toLowerCase();
	var error = { error: true };
	// validate email  here

	if (req.body.password.length < 8) {
		res.render('register', error);
	}

	var newUser = new Account({
		email: email,
		password: req.body.password,
		banned: false
	});

	newUser.save(function(err) {
		if (err) {
			res.render('register', error);
		}
		else {
			res.redirect('/login');
		}
	});
}

module.exports = function(req, res) 
{	
	switch (req.method)
	{
		case  "GET": get (req, res); break;
		case "POST": post(req, res); break;
		    default: res.status(404).render('404');
		
	}
};