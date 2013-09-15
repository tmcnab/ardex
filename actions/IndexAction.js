var Article = require('../models/Article');
var moment = require('moment');
var tldtools = require('tldtools');

function getBriefResult (item) {
	var _ = {};
	_.ago = moment(item.published).from();
	_.abs = item.content.substring(0, 400 < item.content.length ? 400 : item.content.length);
	_.tit = item.title;
	_.url = item.url;
	_.dom = tldtools.extract(item.url).url_tokens.hostname;
	return _;
}

module.exports = function(req, res) 
{
	var model = { 
		layout: null,
		 query: req.query.q
	};

	if (req.query.q) 
	{
		Article.search({ query: req.query.q }, function (err, sres) 
		{
			if (err) throw err;

			Article.count({}, function (cErr, cRes) 
			{
				if (cErr) 
				{
					throw cErr;
				}
				else 
				{
					model.results = {};
					model.results.total = cRes;
					model.results.count = sres.hits.total;
					model.results.duration = sres.took; 
					model.results.items = [];

					for (var i = 0; i < sres.hits.hits.length; i++) {
						var _ = getBriefResult(sres.hits.hits[i]._source);
						_.id = sres.hits.hits[i]._id;
						_.acc = (sres.hits.hits[i]._score * 100).toFixed(2);
						model.results.items.push(_);
					};

					res.render('index', model);
				}
			});
		});
	} else {
		res.render('index', model);
	}
};