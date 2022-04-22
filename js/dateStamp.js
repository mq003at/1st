let ds_dateStamp;
let ds_timeStamp;
let ds_sec;

let now;

function getDateStamp() {
	now = new Date();

	let date = [now.getFullYear(), now.getMonth()+1, now.getDate()];

	for ( let i = 1; i < 3; i++ ) {
		if ( date[i] < 10 ) {
			date[i] = "0" + date[i];
		}
	}

	ds_dateStamp = date.join("");
	return ds_dateStamp;
}


function getTimeStamp() {
	let time = [ now.getHours(), now.getMinutes()];
	
	for ( let i = 0; i < 2; i++ ) {
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
	let postData = {
		dateStamp: ds_dateStamp * 1,
		direction: "out",
		timeStamp: "" + ds_dateStamp + "" + ds_timeStamp
	};
	
	let statusPost = {
		actual_state: "out"
	};
	
	let newPostKey = authorised_id_ref.child(key);
	newPostKey.update(statusPost);
	
	let newKey = ds_dateStamp + "" + ds_timeStamp + "" + ds_sec;
	updates = {};
	updates[authorised_id_path + key + "/log_events/" + newKey] = postData;
	ref.update(updates);		
}

function logInEmployee(key) {	
	let postData = {
		dateStamp: ds_dateStamp * 1,
		direction: "in",
		timeStamp: "" + ds_dateStamp + "" + ds_timeStamp
	};
	
	let statusPost = {
		actual_state: "in"
	};
	
	let newPostKey = authorised_id_ref.child(key);
	newPostKey.update(statusPost);
	
	let newKey = ds_dateStamp + "" + ds_timeStamp + "" + ds_sec;
	updates = {};
	updates[authorised_id_path + key + "/log_events/" + newKey] = postData;
	ref.update(updates);		
}