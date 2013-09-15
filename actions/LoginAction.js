var Account = require('../models/Account');

module.exports = function(req, res) 
{
	if (req.method == 'GET') {
		res.render('login');
	}
	else {
		var _email = req.body.email;
		var _pass = req.body.password;

		Account.findOne({ email: _email }, function(err, acc) {
			if (err) throw err;

			acc.comparePassword(_pass, function(err, match) {
				if (match) {
					// do login here
					req.session.user_id = acc.id;
					res.redirect('/');
				}
				else {
					res.render('login', { error : true });
				}
			});
		});
	}
}