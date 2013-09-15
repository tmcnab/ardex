var Article = require('../models/Article');
var pgize = require('../utilities/Paragraphize');
var moment = require('moment');
var tldtools = require('tldtools');

module.exports = function(req, res) 
{
	Article.findOne({_id: req.params.id}, function(err, doc) 
	{
		console.log(err);

		if (err) throw err;
		else if (!doc) res.status(404).render('404');
		else {
			doc.content = pgize(doc.content);
			doc.ago = moment(doc.published).from();
			doc.host = tldtools.extract(doc.url).url_tokens.hostname;
			console.log(doc);
			res.render('details', { article: doc, page_title: doc.title });
		}
	});
};