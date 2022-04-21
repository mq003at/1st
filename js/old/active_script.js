window.onload = getGroups;

function getGroups() {
	$('#group_div').html('');
	$('#hour_date > tbody').remove();
	
	employee_data_ref.on('child_added', snap => {
		
		var group_id = snap.key;
		var group_name = snap.val().name;
		setGroupList('1', group_name, group_id);
		$('#group_div').append('<button type="button" class="dropbtn grass grp_btn" onclick="display_employee_table(\'' + group_id + '\',\'' + group_name + '\')" id="' + group_id + '_btn">' + group_name + '</button>&emsp;&emsp;');
		
	});
}

/*function getGroups() {
	employee_data_ref.on('child_added', snap => {
		var group_id = snap.key;
		var group_name = snap.val().name;
		setGroupList('1', group_name, group_id);
		
		$('#emp_data').append('<div id="' + group_id + '"></div>');
		var mainD = document.createElement('div');
		mainD.align = "left";
		mainD.style = 'margin-left:100px;';
		mainD.innerHTML = '<label id="' + group_id + '_label">' + group_name + '</label>&emsp;';
			var div = document.createElement("div");
			div.setAttribute("class", "dropdown");
			
			var button = document.createElement("button");
			button.setAttribute("class","dropbtn grass");
			var t = document.createTextNode("Muokkaa");
			button.appendChild(t);
			button.style = 'padding: 6px;';
			div.appendChild(button);
			
			var div1 = document.createElement("div");
			div1.setAttribute("id",group_id + "myDropdown");
			div1.setAttribute("class", "dropdown-content");
			
			div.appendChild(div1);
			
			var a = document.createElement("a");
			a.setAttribute("id", group_id + "update_id");
			a.setAttribute("data-toggle","modal");
			a.setAttribute("data-target","#gn_edit");
			a.setAttribute("onclick",'gn_edit_click("group_edit(' + group_id + ')")');
			var t = document.createTextNode("Change group name");
			a.appendChild(t);
			div1.appendChild(a);
			
			a = document.createElement("a");
			a.setAttribute("id", group_id + "set_modal");
			a.setAttribute("onclick", "remove_confirm('Group','"+group_name+"','remove_data(\"" + group_id + "\", null)')"); 
			var t = document.createTextNode("Delete group");
			a.appendChild(t);
			div1.appendChild(a);

		mainD.appendChild(div);
		$('#' + group_id).append(mainD);
		$('#' + group_id).append('<table id="' + group_id + '_table" class="center marginTopEmployee emp_table_width"></table>');
		display_employee_table(group_id);
		
		ref.child(employee_data_path + group_id + "/employees").on("child_changed", snap => {
			var emp_key = snap.key;
			var emp_name = snap.val().name;
			var emp_tag_id = snap.val().tag_id;

				var emp_old_tag_id = snap.val().old_tag_id;
				var path = group_id + '/employees/' + emp_key;
				var td = document.getElementById(path);
				td.innerText = emp_tag_id;

				var a = document.getElementById(path + "update_id");
				a.setAttribute("onclick",'edit_click("update_id(\'' + path + '\',\'' + emp_tag_id + '\',\'' + emp_old_tag_id + '\')", "tag_id", "change_id_confirm")');
				
				a = document.getElementById(path + "set_modal");
				a.setAttribute("onclick", "remove_confirm('Tag','"+emp_tag_id+"','remove_id(\"" + path + "\",\"" + emp_tag_id + "\",\"" + emp_old_tag_id + "\")')"); 
				
				var del_btt = document.getElementById(path + 'remove_per');
				del_btt.setAttribute("onclick", "remove_confirm('Person','"+emp_name+"','remove_data(\"" + path + "\",\"" + emp_tag_id + "\")')");
			
		});
		
		ref.child(employee_data_path + group_id + "/employees").on("child_removed", snap => {
			var emp_key = snap.key;
			var path = group_id + '/employees/' + emp_key;
			var tr = document.getElementById(path + "tr");
			tr.remove();
		});
	});
}*/

/*function display_employee_table(group_id) {
	//document.getElementById("table_body").innerHTML = "";
	var group_path = employee_data_path + group_id + "/employees";
	ref.child(group_path).on("child_added", snap => {
		var key = snap.key;
		if(key != 'name') {
			var name = snap.child("name").val();
			var id = snap.child("tag_id").val();
			var old_id = snap.child("old_tag_id").val();
			var path = group_id + "/employees/" + key;
			
			if(old_id == null)
				old_id = "";
			
			var remove_data = "remove_data('" + path + "','" + id + "')";
			
			$('#' + group_id + '_table').append("<tr id='" + path + "tr'><td>" + name + "</td><td id='" + path + "'>" + id + "</td>" +
									"<td id='"+path+"_td_button' align='left'></td>" +
									"<td id='"+path+"_td_del'></td></tr>");
									
			var del_btt = document.createElement("button");
			del_btt.setAttribute('id', path + 'remove_per');
			del_btt.setAttribute('class', 'sun');
			del_btt.setAttribute("onclick","remove_confirm('Person','"+name+"','remove_data(\"" + path + "\",\"" + id + "\")')");
			//var t = document.createTextNode("<i class='fa fa-trash' aria-hidden='true'></i>");
			del_btt.innerHTML = "<i class='fa fa-trash' aria-hidden='true' style='font-size:20px; padding:6px;'></i>";
			//document.getElementById(path + "_td_del").appendChild(del_btt);
				
			var td = document.getElementById(path + "_td_button");
			
			var div = document.createElement("div");
			div.setAttribute("class", "dropdown");
			//td.appendChild(div);
			
			var button = document.createElement("button");
			//button.setAttribute("onmouseover","myFunction('" + path + "')");
			button.setAttribute("class","dropbtn sun");
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
			a.setAttribute("onclick",'edit_click("update_id(\'' + path + '\',\'' + id + '\',\'' + old_id + '\')", "tag_id", "change_id_confirm")');
			var t = document.createTextNode("Vaihda tagi");
			a.appendChild(t);
			div1.appendChild(a);
			
			a = document.createElement("a");
			a.setAttribute("id", path + "set_modal");
			a.setAttribute("onclick", "remove_confirm('Tag','"+id+"','remove_id(\"" + path + "\",\"" + id + "\",\"" + old_id + "\")')"); 
			var t = document.createTextNode("Poista tagi");
			a.appendChild(t);
			div1.appendChild(a);
			
			a = document.createElement("a");
			a.setAttribute("id", path + "change_group");
			a.setAttribute("data-toggle","modal");
			a.setAttribute("data-target","#changeGroup");
			a.setAttribute('onclick', 'edit_click("changeGroup(\'' + path + '\')", "null", "changeGroupClick")'); 
			var t = document.createTextNode("Change group");
			a.appendChild(t);
			div1.appendChild(a);
		}
	});
}*/

function display_employee_table(group_id, group_name) {
	if(m_group_id != '') {
		ref.child(employee_data_path + m_group_id + "/employees").off("child_added");
		//ref.child(employee_data_path + m_group_id + "/employees").off("child_changed");
		//ref.child(employee_data_path + m_group_id + "/employees").off("child_removed");
	}
	m_group_id = group_id;
	console.log(m_group_id);
	document.getElementById("emp_data").innerHTML = "";
	
	//$('#emp_data').append('<div id="' + group_id + '"></div>');
		var mainD = document.createElement('div');
		mainD.align = "left";
		mainD.style = 'margin-left:45px;';
		mainD.innerHTML = '<label id="_label">' + group_name + '</label>&emsp;';
			var div = document.createElement("div");
			div.setAttribute("class", "dropdown");
			
			var button = document.createElement("button");
			button.setAttribute("class","dropbtn grass");
			var t = document.createTextNode("Muokkaa");
			button.appendChild(t);
			button.style = 'padding: 6px;';
			div.appendChild(button);
			
			var div1 = document.createElement("div");
			div1.setAttribute("id",group_id + "myDropdown");
			div1.setAttribute("class", "dropdown-content");
			
			div.appendChild(div1);
			
			var a = document.createElement("a");
			a.setAttribute("id", group_id + "update_id");
			a.setAttribute("data-toggle","modal");
			a.setAttribute("data-target","#gn_edit");
			a.setAttribute("onclick",'gn_edit_click("group_edit()")');
			var t = document.createTextNode("Change group name");
			a.appendChild(t);
			div1.appendChild(a);
			
			a = document.createElement("a");
			a.setAttribute("id", group_id + "set_modal");
			a.setAttribute("onclick", "remove_confirm('Group','"+group_name+"','remove_data(\"" + group_id + "\", null)')"); 
			var t = document.createTextNode("Delete group");
			a.appendChild(t);
			div1.appendChild(a);

		mainD.appendChild(div);
		$('#emp_data').append(mainD);
		//$('#emp_data').append('<table id="' + group_id + '_table" class="center marginTopEmployee emp_table_width"></table>');
		
		
	
	document.getElementById("table_body").innerHTML = "";
	var group_path = employee_data_path + group_id + "/employees";
	ref.child(group_path).on("child_added", snap => {
		var key = snap.key;
		if(key != 'name') {
			var name = snap.child("name").val();
			var id = snap.child("tag_id").val();
			var old_id = snap.child("old_tag_id").val();
			var path = group_id + "/employees/" + key;
			
			if(old_id == null)
				old_id = "";
			
			var remove_data = "remove_data('" + path + "','" + id + "')";
			
			$('#table_body').append("<tr id='" + path + "tr'><td>" + name + "</td><td id='" + path + "'>" + id + "</td>" +
									"<td id='"+path+"_td_button' align='left'></td>" +
									"<td id='"+path+"_td_del'></td></tr>");
									
			var del_btt = document.createElement("button");
			del_btt.setAttribute('id', path + 'remove_per');
			del_btt.setAttribute('class', 'sun');
			del_btt.setAttribute("onclick","remove_confirm('Person','"+name+"','remove_data(\"" + path + "\",\"" + id + "\")')");
			//var t = document.createTextNode("<i class='fa fa-trash' aria-hidden='true'></i>");
			del_btt.innerHTML = "<i class='fa fa-trash' aria-hidden='true' style='font-size:20px; padding:6px;'></i>";
			document.getElementById(path + "_td_del").appendChild(del_btt);
				
			var td = document.getElementById(path + "_td_button");
			
			var div = document.createElement("div");
			div.setAttribute("class", "dropdown");
			td.appendChild(div);
			
			var button = document.createElement("button");
			//button.setAttribute("onmouseover","myFunction('" + path + "')");
			button.setAttribute("class","dropbtn sun");
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
			a.setAttribute("onclick",'edit_click("update_id(\'' + path + '\',\'' + id + '\',\'' + old_id + '\')", "tag_id", "change_id_confirm")');
			var t = document.createTextNode("Vaihda tagi");
			a.appendChild(t);
			div1.appendChild(a);
			
			a = document.createElement("a");
			a.setAttribute("id", path + "set_modal");
			a.setAttribute("onclick", "remove_confirm('Tag','"+id+"','remove_id(\"" + path + "\",\"" + id + "\",\"" + old_id + "\")')"); 
			var t = document.createTextNode("Poista tagi");
			a.appendChild(t);
			div1.appendChild(a);
			
			a = document.createElement("a");
			a.setAttribute("id", path + "change_group");
			a.setAttribute("data-toggle","modal");
			a.setAttribute("data-target","#changeGroup");
			a.setAttribute('onclick', 'edit_click("changeGroup(\'' + path + '\')", "null", "changeGroupClick")'); 
			var t = document.createTextNode("Change group");
			a.appendChild(t);
			div1.appendChild(a);
		}
	});
	
	ref.child(employee_data_path + group_id + "/employees").on("child_changed", snap => {
			var emp_key = snap.key;
			var emp_name = snap.val().name;
			var emp_tag_id = snap.val().tag_id;

				var emp_old_tag_id = snap.val().old_tag_id;
				var path = group_id + '/employees/' + emp_key;
				var td = document.getElementById(path);
				td.innerText = emp_tag_id;

				var a = document.getElementById(path + "update_id");
				a.setAttribute("onclick",'edit_click("update_id(\'' + path + '\',\'' + emp_tag_id + '\',\'' + emp_old_tag_id + '\')", "tag_id", "change_id_confirm")');
				
				a = document.getElementById(path + "set_modal");
				a.setAttribute("onclick", "remove_confirm('Tag','"+emp_tag_id+"','remove_id(\"" + path + "\",\"" + emp_tag_id + "\",\"" + emp_old_tag_id + "\")')"); 
				
				var del_btt = document.getElementById(path + 'remove_per');
				del_btt.setAttribute("onclick", "remove_confirm('Person','"+emp_name+"','remove_data(\"" + path + "\",\"" + emp_tag_id + "\")')");
			
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