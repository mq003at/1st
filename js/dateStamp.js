var ds_dateStamp;
var ds_timeStamp;
var ds_sec;

var now;

function getDateStamp() {
	now = new Date();

	var date = [ now.getFullYear(), now.getMonth() + 1, now.getDate()];

	for ( var i = 1; i < 3; i++ ) {
		if ( date[i] < 10 ) {
			date[i] = "0" + date[i];
		}
	}

	ds_dateStamp = date.join("");
	return ds_dateStamp;
}

function getTimeStamp() {
	var time = [ now.getHours(), now.getMinutes()];
	
	for ( var i = 0; i < 2; i++ ) {
		if ( time[i] < 10 ) {
		  time[i] = "0" + time[i];
		}
	}

	ds_timeStamp = time.join("");
	return ds_timeStamp;
}

function getSecond() {
	ds_sec = now.getMilliseconds();
	return ds_sec;
}

function logOutEmployee(key) {	
	var postData = {
		dateStamp: ds_dateStamp * 1,
		direction: "out",
		timeStamp: "" + ds_dateStamp + "" + ds_timeStamp
	};
	
	var statusPost = {
		actual_state: "out"
	};
	
	var newPostKey = authorised_id_ref.child(key);
	newPostKey.update(statusPost);
	
	var newKey = ds_dateStamp + "" + ds_timeStamp + "" + ds_sec;
	updates = {};
	updates[authorised_id_path + key + "/log_events/" + newKey] = postData;
	ref.update(updates);		
}

function logInEmployee(key) {	
	var postData = {
		dateStamp: ds_dateStamp * 1,
		direction: "in",
		timeStamp: "" + ds_dateStamp + "" + ds_timeStamp
	};
	
	var statusPost = {
		actual_state: "in"
	};
	
	var newPostKey = authorised_id_ref.child(key);
	newPostKey.update(statusPost);
	
	var newKey = ds_dateStamp + "" + ds_timeStamp + "" + ds_sec;
	updates = {};
	updates[authorised_id_path + key + "/log_events/" + newKey] = postData;
	ref.update(updates);		
}