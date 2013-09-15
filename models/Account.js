var bcrypt = require('bcrypt');
var cfg = require('../config');
var mongoose = require('mongoose');

var AccountSchema = mongoose.Schema({
	  banned: { type: Boolean,   index: true },
	   email: { type:String,  required: true, index: { unique: true } },
	password: { type: String, required: true }
});


AccountSchema.pre('save', function(next) {
	
	var user = this;
	if (!user.isModified('password')) {
		return next();
	}

	bcrypt.genSalt(cfg.codex.bcryptWorkFunction, function(err, salt) {
		if (err) return next(err);

		bcrypt.hash(user.password, salt, function(err, hash) {
			if (err) return next(err);

			user.password = hash;
			next();
		});

	})
});


AccountSchema.methods.comparePassword = function(cp, fn) {
	bcrypt.compare(cp, this.password, function(err, isMatch) {
		if (err) return fn(err);
		else fn(null, isMatch);
	});
};

module.exports = mongoose.model('Account', AccountSchema);