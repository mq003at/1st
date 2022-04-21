
function gn_edit_click(click_func) {
	console.log('here');
	var group_name = document.getElementById("group_name");
	group_name.style = "border-bottom: 2px solid red";
	var gn_edit_btn = document.getElementById("gn_edit_confirm");
	gn_edit_btn.setAttribute("onclick",click_func);
}

function group_edit(group_id) {
	console.log('m_group_id = ' + m_group_id);
	var group_name = document.getElementById("group_name");
	var new_gn = group_name.value;
	group_name.value = "";
	
	var post_data = {
		name: new_gn
	}; 
	
	newPostKey = employee_data_ref.child(m_group_id);
	
	newPostKey.once("value", function(snapshot) {
		if(snapshot.val() == null)
			console.log("Does not exist");
		else {
			newPostKey.update(post_data);
		}
	});
}

function changeGroup(path) {
	var new_group = $('#change_group').val();
	var index = 0;
	var old_ref = ref.child(employee_data_path + path);
	//var new_path = employee_data_path + path;
	//var new_ref = ref.child(employee_data_path + new_group + '/employees');

	console.log(new_group);
	old_ref.once('value', snap => {
		ref.child(employee_data_path + new_group + '/employees/' + snap.key).set(snap.val(), function(err) {
			if(!err) {
				old_ref.remove();
				$('#changeGroupClick2').click();
			}
		});
	});
}
	
function remove_confirm(title, val, onclick_function) {
	//console.log(onclick_function);
	var body_cnf = document.getElementById("confirm_body");
	body_cnf.innerHTML = "<b>"+title + "</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + val;
	var but = document.getElementById("delete_button");
	but.setAttribute("onclick", onclick_function);
	
	document.getElementById("confirmModalBut").click(); 
}


function remove_data(path, tagID) {
	var curRef = ref.child(employee_data_path + path);
	console.log(employee_data_path + path);
	curRef.once("value", function(snapshot) {
		if(snapshot.val() == null)
			console.log("Does not exist");
		else {
			curRef.remove();

			if(tagID != null && tagID != '') {
				var actual_state_ref = ref.child(authorised_id_path + tagID + "/log_events");
				actual_state_ref.once("value", function(snap) {
					if(snap.numChildren() == 0) {
						deleteEmptyLog(tagID);
					} else {
						setStatus(tagID, false);
					}
					actual_state_ref.off("value");
				});
			} else {
				
			}
		}
		//curRef.off("value");
	});
	document.getElementById("delete_close").click();
}

function edit_click(click_func, inputField, btt) {
	console.log("edit_click");
	if(inputField != 'null') {
		var tag_id = document.getElementById(inputField);
		tag_id.style = "border-bottom: 2px solid red";
	}
	var confirm_but = document.getElementById(btt);
	confirm_but.setAttribute("onclick",click_func);
}

function checkIdDup(path, newId) {
	var m = 0;
	var curRef = ref.child(employee_data_path + path);
	curRef.orderByChild("tag_id").equalTo(newId).once("value", function(snap) {
		m = snap.numChildren();
		//curRef.off("value");
	});
	return m;
}


function updateLogEvent(curId, newId) {
	
	var post_data = {
			tag_id: newId
		};
		

	log_event_ref.orderByChild("tag_id").equalTo(curId).once("value").then(function(snap) {
		snap.forEach(function(childSnap) {
				updateAction(post_data, childSnap.key);
				//console.log("one" + ", key = " + childSnap.key);
		});
	});
	
}

function updateAction(post_data, key) {
	var newPostKey = log_event_ref.child(key);
		
		newPostKey.once("value", function(snapshot) {
			if(snapshot.val() == null)
				console.log("Does not exist");
			else 
				newPostKey.update(post_data);
		});	
}

function checkOldId(newId, oldId) {
	var m = oldId.indexOf(newId);
	var sub;
	
	if(m == -1 && oldId == "") {
		return oldId;
	}
	var arr = oldId.split("|");
	var oldId = [];
	for(var i = 0; i < arr.length; i++) {
		if(arr[i] != newId && arr[i] != "") {
			oldId.push(arr[i]);
		}
	}
	return oldId.join("|");
}

function getLastOldId(oldId) {
	if(oldId != "") {
		var arr = oldId.split("|");
		return arr[arr.length -1];
	}
	return "";
}

function update_id(key, curId, oldId) {
	var tag_id = document.getElementById("tag_id");
	var new_id = tag_id.value;
	tag_id.value = "";
	var m = checkIdDup(key, new_id);
	var old_ids = oldId;
	
	if(m == 0) {
		var actual_state_ref = ref.child(authorised_id_path + new_id);
		actual_state_ref.once("value", snap => {
			var num = snap.numChildren();
			if(num == 0) {
				var post_data;
				var curRef;
				if(curId != "") 
					curRef = ref.child(authorised_id_path + curId + "/log_events");
				else
					curRef = ref.child(authorised_id_path + "log_events");
				curRef.once("value", function(snap) {
					if(snap.numChildren() == 0) {
						post_data = {
							tag_id: new_id
						};
						if(curId != "") {
							deleteEmptyLog(curId);
						}
						var lastId = getLastOldId(oldId);
						//console.log(lastId);
						if(lastId != "") {
							var actual_state_ref = ref.child(authorised_id_path + lastId);
							var lastIdState = actual_state_ref;
							lastIdState.once("child_added", function(snap) {
								if(snap.val() == "out") {
									newAuthorisedId(new_id, "out");
								} else {
									//console.log(snap.val());
									getNumOfLogs(lastId, new_id);
									//newAuthorisedId(new_id, "in");
								}
								lastIdState.off("child_added");
							});
						} else
							newAuthorisedId(new_id, "out");
					} else {
						old_ids = checkOldId(new_id, oldId) + "|" + curId;
						post_data = {
							old_tag_id: old_ids,
							tag_id: new_id
						}; 
						if(snap.numChildren() == 1)
							 post_data = {
								tag_id: new_id
							}; 
						var actual_state_ref = ref.child(authorised_id_path + curId);
						actual_state_ref.once("child_added", function(snap) {
							if(snap.val() == "out") {
								newAuthorisedId(new_id, "out");
							} else {
								//console.log(snap.val().actual_state);
								getNumOfLogs(curId, new_id);
								//newAuthorisedId(new_id, "in");
							}
							actual_state_ref.off("child_added");
						});
						setStatus(curId, false);
					}
					var newPostKey = employee_data_ref.child(key);
				
					newPostKey.once("value", function(snapshot) {
						if(snapshot.val() == null)
							console.log("Does not exist");
						else {
							newPostKey.update(post_data);
							//updateFuncs(key, new_id, old_ids);
						}
					//curRef.off("value");
					});
					
				
					//newPostKey.off("value");
				});
			} else {
				document.getElementById("messPara").innerHTML = "This ID has been assigned!";
				document.getElementById("messModalClick").click();
			} 
		});
	}
	else {
		document.getElementById("messPara").innerHTML = "This ID has been assigned!";
		document.getElementById("messModalClick").click();
	}
}

function remove_id(path, id, old_id) {
	//console.log('remove_id');
	var old_ids = old_id;
	var post_data = {
		tag_id: ""
	}; 
	var newPostKey = employee_data_ref.child(path);
	newPostKey.once("value", function(snapshot) {
		if(snapshot.val() == null)
			console.log("Does not exist");
		else {
			newPostKey.update(post_data);
			if(id != "") {
			var actual_state_ref = ref.child(authorised_id_path + id + "/log_events");
			actual_state_ref.once("value", function(snap) {
				if(snap.numChildren() != 0) {
					setStatus(id, false);
					old_ids = old_id + "|" + id;
					post_data = {
						old_tag_id: old_ids
					}; 
					newPostKey = employee_data_ref.child(path);
					
					newPostKey.once("value", function(snapshot) {
						if(snapshot.val() == null)
							console.log("Does not exist");
						else {
							newPostKey.update(post_data);
						}
					});
				} else {
					deleteEmptyLog(id);
				}

				actual_state_ref.off("value");
			});
			}
			//updateFuncs(path, "", old_ids);
			document.getElementById("delete_close").click();
		}
		newPostKey.off("value");
	});
}

employee_data_ref.on("child_changed", snap => {
	var key = snap.key;
	var name = snap.val().name;
	var id = snap.val().tag_id;
	
	var a = document.getElementById(key + "set_modal");
	if(key == m_group_id && id == null) {
		$('#_label').text(name);
		$('#' + key + '_btn').text(name);
		var a = document.getElementById(key + "set_modal");
		a.setAttribute("onclick", "remove_confirm('Group','"+name+"','remove_data(\"" + key + "\", null)')"); 
		setGroupList('3', name, key);
	}
	//}
});

employee_data_ref.on("child_removed", snap => {
	var key = snap.key;
	var id = snap.val().tag_id;
	//console.log("del name: " + snap.val().name);	
	setGroupList('2', snap.val().name, key);
	$("#emp_data").html('');
	$("#table_body").html('');
	$('#' + key + '_btn').remove();
});

function addPerson() {
	//$('#err_ntf').html('');
	var name = document.getElementById("newPersonName");
	var ssn = document.getElementById("newPersonSSN");
	var id = document.getElementById("newPersonId");
	var gn = document.getElementById("newPersonGroup");
	
	if(name.value != "" && ssn.value != "") {
		var dateStamp = getDateStamp();
		var newPostKey = dateStamp + 'Emp';
		var grp_key = $('#group_select').val();
		//console.log('grp_key = ' + grp_key);
		var path = employee_data_path + grp_key + '/employees/' + newPostKey;
		if(id.value == "") {
			//document.getElementById("addPersonClick").setAttribute("data-dismiss","modal");
			document.getElementById("addPersonClick2").click();
			var postData = {
				name: name.value,
				ssn: ""+ssn.value,
				tag_id: "",
				old_tag_id: ""
			};
			
			var updates = {};
			updates[path] = postData;
			ref.update(updates);
		} else {
			
			var actual_state_ref = ref.child(authorised_id_path + id.value);
			actual_state_ref.once("value", function(snap) {
				if(snap.numChildren() == 0) {
					//document.getElementById("addPersonClick").setAttribute("data-dismiss","modal");
					document.getElementById("addPersonClick2").click();
					var postData = {
						name: name.value,
						ssn: ""+ssn.value,
						tag_id: ""+id.value,
						old_tag_id: ""
					};
					
					var updates = {};
					updates[path] = postData;
					ref.update(updates);				
										
					if(id.value != "") {
						newAuthorisedId(id.value, "out");
					}
					name.value = "";
					ssn.value = "";
					id.value = "";
					actual_state_ref.off("value");
				} else {
					id.style = "border-bottom: 2px solid red";
					//actual_state_ref.off("value");
					$('#err_ntf').html('This ID has been used');
				}
			});
			
		}
	} else {
		$('#err_ntf').html('Enter blank fields');
	}
	//$('#err_ntf').html('');
}

function addGroup() {
	var name = document.getElementById("new_group");
	if(name.value != "") {
		var dateStamp = getDateStamp();
		var group_ref = ref.child(employee_data_path);
		group_ref.orderByChild('name').equalTo(name.value).once("value", function(snap) {
			if(snap.numChildren() == 0) {
				//document.getElementById("addPersonClick").setAttribute("data-dismiss","modal");
				document.getElementById("addGroupClick2").click();
				var postData = {
					name: name.value
				};
				
				var newPostKey = dateStamp + 'Grp';
				//console.log('newPostKey = ' + newPostKey);
				var updates = {};
				updates[employee_data_path + newPostKey] = postData;
				ref.update(updates);				
				
				name.value = "";
				group_ref.off("value");
			} else {
				name.style = "border-bottom: 2px solid red";
				//group_ref.off("value");
				$('#addGroup_err').html('The name has been used');
			}
		});
		
	} else
		$('#addGroup_err').html('Enter the new group');
	
}

function setStatus(id, stt) {
	var newPostKey = authorised_id_ref.child(id);
	var post_data = {
		is_actual: stt
	}; 
	
	
	newPostKey.once("value", function(snapshot) {
		if(snapshot.val() == null)
			console.log("Does not exist");
		else 
			newPostKey.update(post_data);
		newPostKey.off("value");
	});
}

function updateOldId(new_id, oldId, curId, key) {
	
}

function newAuthorisedId(id, stt) {
	var postData = {
		is_actual: true,
		actual_state: stt,
		log_events: ""
	};
	updates = {};
	updates[authorised_id_path + id] = postData;
	ref.update(updates);
}
	
function getNumOfLogs(id, newId) {
	var logRef = ref.child(authorised_id_path + id + "/log_events");
	logRef.once('value', function(snap) {
		var num = snap.numChildren();
		updateLastLog(num,id, newId);
		logRef.off('value');
	});
}

function updateLastLog(num,id, newId) {
	var index = 0;
	var path = authorised_id_path + id + "/log_events";
	var logRef = ref.child(path);
	if(num != 0) {
		logRef.on('child_added', snap => {
			
			if(index == num - 1) {
				var postData_1 = {
					is_actual: true,
					actual_state: 'in'
				};
				var postData_2 = {
					dateStamp: snap.val().dateStamp,
					direction: snap.val().direction,
					timeStamp: snap.val().timeStamp
				};
				updates = {};
				updates[authorised_id_path + newId] = postData_1;
				//ref.update(updates);
				
				//updates = {};
				updates[authorised_id_path + newId +"/log_events/"+snap.key] = postData_2;
				ref.update(updates);
				
				var removeRef = ref.child(authorised_id_path + id +"/log_events/"+snap.key);
				removeRef.remove();
			} 
			index++;	
			if(index == num) {
				logRef.off('child_added');
			}
		});
		
		if(num != 1) {
			var post_data = {
				actual_state: 'out'
			};
			var newPostKey = ref.child(authorised_id_path + id);
			newPostKey.once("value", function(snap) {
				newPostKey.update(post_data);
				//console.log("one" + ", key = " + childSnap.key);
				//newPostKey.off('value');
			});
		} else
			deleteEmptyLog(id);
	}
}

function deleteEmptyLog(id) {
	var curRef = authorised_id_ref.child(id);
	curRef.once("value", function(snapshot) {
		if(snapshot.val() == null)
			console.log("Does not exist");
		else {
			curRef.remove();
		}
		//curRef.off("value");
	});
}
	
		
	

