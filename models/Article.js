var cfg = require('../config');
var mongoose = require('mongoose');
var mongoosastic = require('mongoosastic');

var ArticleSchema = mongoose.Schema({
	  content: { type: String,  es_indexed: true },
	  flagged: { type: Boolean, default: false },
	published: { type: Date,    es_indexed: true },
	     tags: { type: Array,   es_indexed: true },
	    title: { type: String,  es_indexed: true },
	      url: { type: String,  es_indexed: true }
});

ArticleSchema.plugin(mongoosastic);


module.exports = mongoose.model('Articles', ArticleSchema);
