window.onload = getGroups;

function getGroups() {
	$('#group_div').html('');
	$('#hour_date > tbody').remove();
	
	employee_data_ref.on('child_added', snap => {
		var group_id = snap.key;
		var group_name = snap.val().name;
		setGroupList('1', group_name, group_id);
		$('#group_div').append('<button type="button" class="grass grp_btn" onclick="display_employee_table(\'' + group_id + '\',\'' + group_name + '\')" id="' + group_id + '_btn">' + group_name + '</button>&emsp;&emsp;');		
	});
}

function display_employee_table(group_id, group_name) {
	$(".group_list option[value='" + group_id + "']").prop('selected', true);
	if(m_group_id != '') {
		ref.child(employee_data_path + m_group_id + "/employees").off();
	}
	m_group_id = group_id;
	document.getElementById("emp_data").innerHTML = "";
	

	var mainD = document.createElement('div');
	mainD.align = "left";
	mainD.style = 'margin-left:45px;';
	mainD.innerHTML = '<label id="_label">' + group_name + '</label>&emsp;';
	var div = document.createElement("div");
	div.setAttribute("class", "dropdown");

	var button = document.createElement("button");
	button.setAttribute("class","grass employee");
	var t = document.createTextNode("Muokkaa");
	button.appendChild(t);
	div.appendChild(button);

	var div1 = document.createElement("div");
	div1.setAttribute("id",group_id + "myDropdown");
	div1.setAttribute("class", "dropdown-content");

	div.appendChild(div1);

	var a = document.createElement("a");
	a.setAttribute("id", group_id + "update_id");
	a.setAttribute("data-toggle","modal");
	a.setAttribute("data-target","#gn_edit");
	a.setAttribute("onclick",'javascript:$("#group_name").val("");edit_click("group_edit()", "group_name", "gn_edit_confirm");');
	var t = document.createTextNode("Vaihda ryhmän nimi");
	a.appendChild(t);
	div1.appendChild(a);

	a = document.createElement("a");
	a.setAttribute("id", group_id + "set_modal");
	a.setAttribute("onclick", "remove_confirm('Group','"+group_name+"','remove_data(\"" + group_id + "\", null)')"); 
	var t = document.createTextNode("Poista ryhmä");
	a.appendChild(t);
	div1.appendChild(a);

	mainD.appendChild(div);
	$('#emp_data').append(mainD);	
	
	document.getElementById("table_body").innerHTML = "";
	var group_path = employee_data_path + group_id + "/employees";
	ref.child(group_path).on("child_added", snap => {
		var key = snap.key;
		if(key != 'name') {
			var name = snap.child("name").val();
			var id = snap.child("tag_id").val();
			var path = group_id + "/employees/" + key;

			/*var id_print = id;
			if(id.charAt(0) == '-') {
				id_print = '';
				id = id.substr(1);
			}*/
			
			$('#table_body').append("<tr id='" + path + "tr'><td>" + name + "</td><td id='" + path + "'><label id='id'>" + id + "</label>" +
									"<label id='lock'></label></td>" +
									"<td id='"+path+"_td_button' align='left'></td>" +
									"<td id='"+path+"_td_del'></td>" +
									"<td id='"+path+"_login'><button class='sun' onclick='logIn(\"" + path + "\")'><i class='fas fa-sign-in-alt employee icon'></i></button></td></tr>");
			
			var access_state = 'Tukkia';
			
			authorised_id_ref.child(id).once("value", function(snap) {
				if(snap.val().actual_state == 'in') {
					document.getElementById(path+"_login").style.visibility = 'hidden';
				} 
				if(!snap.val().is_actual) {
					//$('td').filter(function(){return this.text() == }).css("color","red");
					document.getElementById(path).querySelector('#lock').innerHTML += '&nbsp;<i class="fas fa-lock icon"></i>';
					access_state = 'Sallia';
				}
			});
			
			var del_btt = document.createElement("button");
			del_btt.setAttribute('id', path + 'remove_per');
			del_btt.setAttribute('class', 'sun');
			del_btt.setAttribute("onclick","remove_confirm('Person','"+name+"','remove_data(\"" + path + "\")')");
			
			del_btt.innerHTML = "<i class='fa fa-trash employee icon' aria-hidden='true'></i>";
			document.getElementById(path + "_td_del").appendChild(del_btt);
				
			var td = document.getElementById(path + "_td_button");
			
			var div = document.createElement("div");
			div.setAttribute("class", "dropdown");
			td.appendChild(div);
			
			var button = document.createElement("button");
			button.setAttribute("class","sun employee");
			var t = document.createTextNode("Muokkaa");
			button.appendChild(t);
			div.appendChild(button);
			
			var div1 = document.createElement("div");
			div1.setAttribute("id",path + "myDropdown");
			div1.setAttribute("class", "dropdown-content");
			
			div.appendChild(div1);
			
			var a = document.createElement("a");
			a.setAttribute("id", path + "update_id");
			a.setAttribute("data-toggle","modal");
			a.setAttribute("data-target","#myModal");
			a.setAttribute("onclick",'javascript:$("#tag_id").val("");javascript:$("#newId_ntf").html("");edit_click("update_id(\'' + path + '\')", "tag_id", "change_id_confirm");');
			var t = document.createTextNode("Vaihda tagi");
			a.appendChild(t);
			div1.appendChild(a);
			
			a = document.createElement("a");
			a.setAttribute("id", path + "set_modal");
			a.setAttribute("onclick", "remove_confirm('Tag','"+path+"','block_id(\"" + path + "\")')"); 
			var t = document.createTextNode(access_state);
			a.appendChild(t);
			div1.appendChild(a);
			
			a = document.createElement("a");
			a.setAttribute("id", path + "change_group");
			a.setAttribute("data-toggle","modal");
			a.setAttribute("data-target","#changeGroup");
			a.setAttribute('onclick', 'edit_click("changeGroup(\'' + path + '\')", "null", "changeGroupClick")'); 
			var t = document.createTextNode("Vaihda ryhmä");
			a.appendChild(t);
			div1.appendChild(a);
		}
	});
	
	ref.child(employee_data_path + group_id + "/employees").on("child_changed", snap => {
			var emp_key = snap.key;
			var emp_name = snap.val().name;
			var emp_tag_id = snap.val().tag_id;
			
			/*var id_print = emp_tag_id;
			if(emp_tag_id.charAt(0) == '-') {
				id_print = '';
				emp_tag_id = emp_tag_id.substr(1);
			}*/

			var path = group_id + '/employees/' + emp_key;
			var td = document.getElementById(path).querySelector('#id');
			//document.getElementById(td.innerHTML + '_login').setAttribute('id', emp_tag_id + '_login');
			
			td.innerText = emp_tag_id;
			
		});
		
		ref.child(employee_data_path + group_id + "/employees").on("child_removed", snap => {
			var emp_key = snap.key;
			var path = group_id + '/employees/' + emp_key;
			var tr = document.getElementById(path + "tr");
			tr.remove();
		});
}

function setGroupList(stt, group_name, group_id) {
	// 1 = append, 2 = remove, 3 = change text
	if(stt == '1')
		$('.group_list').append('<option value="' + group_id + '">' + group_name + '</option>');
	else if(stt == '2') {
		$('.group_list option[value="' + group_id + '"]').remove();
	} else if(stt == '3') {
		$('.group_list option[value="' + group_id + '"]').text(group_name);
	}
}