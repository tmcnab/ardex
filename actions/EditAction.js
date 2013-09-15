var _404 = require('./404');

function get (req, res)  {

	var _id = req.params.id;

	if (typeof(_id) != 'String') {
		res.render('edit', new Article());
	}
	else {
		Article.findOneById(req.params.id, function(err, doc) {
			if (err) {
				throw err;
			}
			else if (!doc) { 
				_404(req, res);
			}
			else {
				res.render('edit', doc);
			}
		});
	}
}

function post (req, res) {

	if (_id == undefined || _id == null) {
		req.body.tags = req.body.tags.split(',');
		var _a = new Article(req.body);
		_a.save(function(e, doc, n) {
			if (err) {
				throw err;
			}
			else {
				res.redirect('/article/' + _a._id);
			}
		});
	}


	Article.findOneAndUpdate({ _id: _id }, req.body, function (err, doc) {
		if (err) throw err;
		else {
			res.redirect('/article/' + _id);
		}
	});
}

module.exports = function (req, res) 
{
	switch (req.method)
	{
		case ' GET': get (req, res); break;
		case 'POST': post(req, res); break;
		    default: _404(req, res); break;
	}
};