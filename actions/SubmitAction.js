var Article = require('../models/Article');
var _404 = require('./404');


function get (req, res) 
{
	res.render('edit', { page_title: 'New Article' });
}

function post (req, res) 
{
	function onSave (error, document) {
		if (error) {
			throw error;	
		} else {
			console.log(document);
			res.status(201).redirect('/article/' + document._id);
		}
	}

	if (req.body.tags) {
		req.body.tags = req.body.tags.trim()
			.split(/[\s,]+/)
			.filter(function(v){return v!==''});
	}

	(new Article(req.body)).save(onSave)
}


module.exports = function (req, res) {
	switch (req.method)
	{
		case  "GET":  get(req, res); break;
		case "POST": post(req, res); break;
			default: _404(req, res); break;
	}
};



// content: { type: String, es_indexed: true },
// 	published: { type: Date,   es_indexed: true },
// 	     tags: { type: Array,  es_indexed: true },
// 	    title: { type: String, es_indexed: true },
// 	      url: { type: String, es_indexed: true }