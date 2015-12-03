// setup Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate')

// setup bcrypt
var bcrypt = require('bcrypt');
var SALT = bcrypt.genSaltSync();

// setup json web token
var jwt = require('jsonwebtoken');
var SECRET = '\x1f\x1e1\x8a\x8djO\x9e\xe4\xcb\x9d`\x13\x02\xfb+\xbb\x89q"F\x8a\xe0a';

//creating Journal Entry collection
//images and videos?????
var entrySchema = new Schema({
	day: {type: Date},
	text: String, //look into creating a file and then storing the path
	keywords: [String],
	user_name: String
});


entrySchema.methods.addEntry = function(date, words, keys, uname)
{
	var today = new Entry({
		day: date,
		text: words,
		keywords: keys,
		user_name: uname
	});

	today.save(function(err, today){
		if(err) return console.error(err);
		console.dir(today);
	});
}

entrySchema.methods.getEntries = function(uname)
{
	Entry.find({user_name: uname}, function(err,entries){
		if (err) return console.error(err);
		console.dir(entries);
		return entries;
	});
}

entrySchema.methods.keywordSearch = function(uname, keys)
{
	Entry.find({user_name: uname}, function(err,entries){
		if (err) return console.error(err);
		var array = [];
		//console.dir("here ya go");
		//console.dir(entries.length);
		for(var i=0; i<entries.length; i++)
		{
			var there = false;
			for (var k=0; k < entries[i].keywords.length; k++)
			{
				//console.dir(entries[i].keywords[k]);
				if(entries[i].keywords[k] === key)
				{
					there = true;
				}
			}
			if(there)
			{
				array.push(entries[i]);
			}
			
		}
		//console.dir('the array');
		//console.dir(array);
		return array;
	});
}

//do I need 
//entrySchema.plugin(findOrCreate);

var Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;