// setup Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var findOrCreate = require('mongoose-findorcreate')

var User = require('./user.js');

//creating Journal Entry collection
//images and videos?????
var entrySchema = new Schema({
	user: {type: ObjectId, ref: 'users'},
	day: {type: Date, default: Date.now},
	text: String, //look into creating a file and then storing the path
	keywords: [String]
});

//Adds an entry with the given information... pass in empty array if no keywords
entrySchema.methods.addEntry = function(date, words, keys, uname)
{
	var today = new Entry({
		day: date,
		text: words,
		keywords: keys,
		user: uname
	});

	today.save(function(err, today){
		if(err) return console.error(err);
		console.dir(today);
	});
}

//Input: user, returns all Entries from the user
entrySchema.methods.getEntries = function(uname)
{
	Entry.find({user: uname}, function(err,entries){
		if (err) return console.error(err);
		console.dir(entries);
		return entries;
	});
}

//Input: username and a keyword, returns an array of all corresponding entries
entrySchema.methods.keywordSearch = function(uname, key)
{
	Entry.find({user: uname}, function(err,entries){
		if (err) return console.error(err);
		var array = [];
		for(var i=0; i<entries.length; i++)
		{
			var there = false;
			for (var k=0; k < entries[i].keywords.length; k++)
			{
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
		return array;
	});
}

//Given the username and the day, returns that entry 
//day object has to be exact, including seconds. I can change to make it less specific
entrySchema.methods.specificEntry = function(uname, day)
{
	Entry.find({user: uname, day: date}, function(err,entry){
		if (err) return console.error(err);
		console.dir(entry);
		return entry;
	});
}

//Accepts the username, month and year and returns an array of all corresponding entries
entrySchema.methods.monthEntries = function(uname, month, year)
{
	Entry.find({user: uname}, function(err,entries){
		if (err) return console.error(err);
		var array = [];
		console.dir(entries);
		for(var i=0; i<entries.length; i++)
		{
			//console.dir(entries[i].day.getMonth() + ' vs ' + month);
			//console.dir(entries[i].day.getYear() + ' vs ' + year);
			if(entries[i].day.getMonth() === month && entries[i].day.getYear()=== year)
			{
				array.push(entries[i]);
			}
		}
		//console.dir(array);
		return array;
	});
}

//do I need 
//entrySchema.plugin(findOrCreate);

var Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;