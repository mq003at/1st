$err_border = "border-bottom: 1px solid red";
//------------------------------------------------------------------------------------------------------------//
employee_data_ref.on("child_changed", snap => {
	var key = snap.key;
	var name = snap.val().name;
	var id = snap.val().tag_id;
	
	var a = document.getElementById(key + "set_modal");
	if(key == m_group_id && id == null) {
		$('#' + key + '_btn').attr('onclick', 'display_employee_table(\'' + key + '\',\'' + name + '\')');
		$('#_label').text(name);
		$('#' + key + '_btn').text(name);
		var a = document.getElementById(key + "set_modal");
		a.setAttribute("onclick", "remove_confirm('Group','"+name+"','remove_data(\"" + key + "\", null)')"); 
		setGroupList('3', name, key);
	}
});

employee_data_ref.on("child_removed", snap => {
	var key = snap.key;
	var id = snap.val().tag_id;

	setGroupList('2', snap.val().name, key);
	$("#emp_data").html('');
	$("#table_body").html('');
	$('#' + key + '_btn').remove();
});

authorised_id_ref.on("child_changed", function(snap) {
	var path = $('#table_body td:contains("' + snap.key + '")').attr('id');

	if(snap.val().actual_state == 'in') {
		document.getElementById(path+"_login").style.visibility = 'hidden';
	} else {		
		document.getElementById(path+"_login").style.visibility = 'visible';
	}
	
	if(snap.val().is_actual) {
		document.getElementById(path).querySelector('#lock').innerHTML = '';
		//document.getElementById(path + "_name").innerHTML = ;
		document.getElementById(path + "set_modal").innerHTML = 'Tukkia';
	} else {
		document.getElementById(path).querySelector('#lock').innerHTML = '&nbsp;<i class="fas fa-lock"></i>';
		document.getElementById(path + "set_modal").innerHTML = 'Sallia';
	}
});

//------------------------------------------------------------------------------------------------------------//

function changeGroup(path) {
	var new_group = $('#change_group').val();
	var index = 0;
	var old_ref = ref.child(employee_data_path + path);

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
	if(document.getElementById(val)) {
		val = document.getElementById(val).innerHTML;
	}
	var body_cnf = document.getElementById("confirm_body");
	body_cnf.innerHTML = "<b>"+title + "</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + val;
	var but = document.getElementById("delete_button");
	but.setAttribute("onclick", onclick_function);
	
	document.getElementById("confirmModalBut").click(); 
}

function edit_click(click_func, inputField, btt) {
	if(inputField != 'null') {
		var tag_id = document.getElementById(inputField);
		tag_id.style = "border-bottom: 2px solid red";
	}
	var confirm_but = document.getElementById(btt);
	confirm_but.setAttribute("onclick",click_func);
}

function group_edit(group_id) {
	var group_name = document.getElementById("group_name");
	var new_gn = group_name.value;
	group_name.value = "";
	
	var post_data = {
		name: new_gn
	}; 
	
	newPostKey = employee_data_ref.child(m_group_id);
	employee_data_ref.orderByChild('name').equalTo(new_gn).once("value", function(snapshot) {
		if(snapshot.val())
			$('#gn_err').html('The name has been used');
		else {
			$('#gn_edit_confirm2').click();
			newPostKey.update(post_data);
		}
	});
}

function update_id(path) {
	var cur_id = document.getElementById(path).querySelector('#id').innerHTML;
	var new_id = $('#tag_id').val();
	var update_data = {
		tag_id: new_id
	};
	
	var update_data_2 = {
		is_actual: true
	};
	
	var employee_ref = ref.child(employee_data_path + path);
	
	if(new_id == cur_id) {
		employee_ref.update(update_data);
		ref.child(authorised_id_path + cur_id).update(update_data_2);
	} else {
		ref.child(authorised_id_path + new_id).once('value', snap => {
			if(snap.val()) {
				$("#newId_ntf").html("This ID has been assigned!");
			} else {
				$('#change_id_confirm2').click();
				var cur_id_ref = ref.child(authorised_id_path + cur_id);
				
				cur_id_ref.once('value', snap => {
					document.getElementById(path).querySelector('#lock').innerHTML = '';
					document.getElementById(path + "set_modal").innerHTML = 'Tukkia';

					ref.child(authorised_id_path + new_id).set(snap.val());
					if(!snap.val().is_actual) {
						ref.child(authorised_id_path + new_id).update(update_data_2);
					}
					cur_id_ref.remove();
				});

				employee_ref.update(update_data);
			}
		});
	}
}

function block_id(path) {
	var cur_id = document.getElementById(path).querySelector('#id').innerHTML;
	var index = cur_id.indexOf('<i')
	if( index != -1) {
		cur_id = cur_id.substr(0, index-1);
	}
	console.log(cur_id);
	var cur_id_events = ref.child(authorised_id_path + cur_id + '/log_events');
	var update_data;
	
	/*cur_id_events.once('value', snap => {
		if(snap.val() == '') {
			deleteEmptyLog(cur_id);
			
			update_data = {
				tag_id: ''
			};
			
		} else {*/
		if(document.getElementById(path + "set_modal").innerHTML == 'Tukkia')
			setStatus(cur_id, false);
		else
			setStatus(cur_id, true);
	//deleteLog(cur_id);		
	/*update_data = {
		tag_id: ''
	};*/
		//}
	//ref.child(employee_data_path + path).update(update_data);
	//});
}

function remove_data(path) {
	var tagID;
	if(document.getElementById(path)) {
		tagID = document.getElementById(path).querySelector('#id').innerHTML;
	} else
		tagID = path;
	
	var curRef = ref.child(employee_data_path + path);

	curRef.remove();

	if(tagID != null && tagID != '') {
		deleteLog(tagID);
	}

}

function setStatus(id, stt) {
	var newPostKey = authorised_id_ref.child(id);
	var post_data = {
		is_actual: stt
	}; 

	newPostKey.update(post_data);
}

function deleteLog(id) {
	var curRef = authorised_id_ref.child(id);
	curRef.remove();
}

function addPerson() {
	var name = document.getElementById("newPersonName");
	var ssn = document.getElementById("newPersonSSN");
	var id = document.getElementById("newPersonId");
	var gn = document.getElementById("newPersonGroup");
	
	if(name.value != "") {
		var dateStamp = getDateStamp() + getTimeStamp() + getSecond();
		var newPostKey = dateStamp + 'Emp';
		var grp_key = $('#group_select').val();
		var path = employee_data_path + grp_key + '/employees/' + newPostKey;
		if(id.value == "") {
			document.getElementById("addPersonClick2").click();
			var i = 0;
			while(i < 1) {
				var id = 'temp' + Math.floor(Math.random() * 1000);
				
				var postData = {
							name: name.value,
							ssn: ""+ssn.value,
							tag_id: id
						};
						
				ref.child(authorised_id_path + id).once('value', function(snap) {
					if(!snap.val()) {
						newAuthorisedId(id, false);
						
						var updates = {};
						updates[path] = postData;
						ref.update(updates);
						
						i++;
					}
				});
			}
		} else {		
			var actual_state_ref = ref.child(authorised_id_path + id.value);
			actual_state_ref.once("value", function(snap) {
				if(!snap.val()) {
					document.getElementById("addPersonClick2").click();
					
					newAuthorisedId(id.value);
					
					var postData = {
						name: name.value,
						ssn: ""+ssn.value,
						tag_id: ""+id.value
					};
					
					var updates = {};
					updates[path] = postData;
					ref.update(updates);				
				} else {
					id.style = $err_border;
					$('#err_ntf').html('Oops! This ID has been used.');
				}
			});
			
		}
	} else {
		name.style = $err_border;
		$('#err_ntf').html('Oops! The name ?');
	}
}

function addGroup() {
	var name = document.getElementById("new_group");
	if(name.value != "") {
		var dateStamp = getDateStamp() + getTimeStamp() + getSecond();
		var group_ref = ref.child(employee_data_path);
		group_ref.orderByChild('name').equalTo(name.value).once("value", function(snap) {
			if(!snap.val()) {
				document.getElementById("addGroupClick2").click();
				var postData = {
					name: name.value
				};
				
				var newPostKey = dateStamp + 'Grp';
				var updates = {};
				
				updates[employee_data_path + newPostKey] = postData;
				ref.update(updates);				
			} else {
				name.style = $err_border;
				$('#addGroup_err').html('The name has been used');
			}
		});
		
	} else {
		name.style = $err_border;
		$('#addGroup_err').html('Oops! The group name ?');
	}
}

function newAuthorisedId(id) {
	var access = true;
	
	if(arguments[1] != null) {
		access = arguments[1];
	}

	var postData = {
		is_actual: access,
		actual_state: 'out',
		log_events: ""
	};
	updates = {};
	updates[authorised_id_path + id] = postData;
	ref.update(updates);
}

function logIn(path) {
	getDateStamp();
	getTimeStamp();
	getSecond();
	
	var key = document.getElementById(path).querySelector('#id').innerHTML;
	
	logInEmployee(key);
}
	
		
	

