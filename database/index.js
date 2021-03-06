var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'fitbud'
});

connection.connect(function(err){
	if (err) {
		console.log('could not connect to db');
	} else {
		console.log('connected to db');
	}
});

var createUser = function(username, pass) {
	var query = 'INSERT INTO users (email, password) values (?, ?)';
	connection.query(query, [username, pass], function(err, result){
		if (err) {
			console.log('error inserting user');
		} else {
			console.log('successfully added');
		}
	})
}

var checkUser = function(username, callback) {
	var query = 'SELECT * from users WHERE email = ?';
	connection.query(query, [username], function(err, result){
		if (err) {
			console.log('error when finding user');
		} else{
			console.log('result of finding a user', result);
			if (result.length === 0) {
				callback(false);
			}
			else callback(true);
		}
	})
}

var getWorkouts = function(callback) {
	var query = 'SELECT * from postings';
	connection.query(query, (err, result) => {
		if (err) {
			console.log('error getting postings');
		} else {
			console.log('DB POSTING RESULTS:', result);
			callback(result);
		}
	});
}

var getSingleWorkout = function(title, callback){
	var query = 'SELECT * from postings where title = ?';
	connection.query(query, [title], (err, result) => {
		if (err) {
			console.log('error getting single posting');
		} else {
			console.log('SINGLE DB POSTING RESULT:', result);
			callback(result);
		}
	});
};

//'INSERT INTO posts SET ?', {title: 'test'},



var createWorkout = function(workoutObj, callback) {
	var query = 'INSERT INTO postings SET ?';
	connection.query(query, workoutObj, (err, result) => {
		if (err) {
			console.log('error creating workout');
		} else {
			console.log('created workout result:', result);
			callback(result);
		}
	});
};
var createProfile = function(profileObj, callback) {
	var query = 'INSERT INTO profile SET ?';
	connection.query(query, profileObj, (err, result) => {
		if (err) {
			console.log('error creating profile');
		} else {
			console.log('created profile result:', result);
			callback(result);
		}
	});
};
module.exports = {
	checkUser,
	createUser,
	getWorkouts,
	getSingleWorkout,
	createWorkout,
	createProfile
};



