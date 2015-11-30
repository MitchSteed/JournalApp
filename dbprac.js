//global variables

var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/practice');

//creating User collection
var userSchema = new mongoose.Schema({
	username: {type: String},
	password: String
});

var User = mongoose.model('User', userSchema);

//creating Journal Entry collection
//images and videos?????
var entrySchema = new mongoose.Schema({
	day: {type: Date},
	text: String, //look into creating a file and then storing the path
	keywords: [String],
	user_name: String
});

var Entry = mongoose.model('Entry', entrySchema);

//adds an entry
function addEntry(date, words, keys, uname)
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

//returns all the entries for the user
function getEntries(uname)
{
	Entry.find({username: uname}, function(err,entries){
		if (err) return console.error(err);
		console.dir(entries);
		return entries;
	});
}

//adds a user to the database
function addUser(uname, pword)
{
	
	var person = new User({
	username: uname,
	password: pword
	});

	person.save(function(err, person){
		if (err) return console.error(err);
		console.dir(person);
	});
}

//checks to see if the user exists
function authenticate(uname, pword)
{
	User.findOne({username: uname, password: pword}, function(err, user){
		if(err)	return console.error(err);
		
		if(user === null)
		{
			console.log("nope");
		}
		else
		{
			console.log("yep");
		} 
		console.dir(user);
	});
	
	
}

//running code
//init();


uname = "corbin";
pword = "hope";
var d = new Date();
day = d.getDate();
keywords = ["cool","love"];
t = "I wish the semester was over, but this is cool";

addUser(uname,pword);
authenticate(uname,pword);
addEntry(day, t, keywords, uname);
