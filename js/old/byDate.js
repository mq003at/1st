var start;
var	end;

var start_day;
var start_month;
var start_year;
var start_date;


var end_day;
var end_month;
var end_year;
var end_date;
 
var table = document.getElementById("dateTableBody");




function set_up_dates() {

	table.innerHTML = "";
	var arr = [];
	start = document.getElementById("datepicker_start").value;
	end = document.getElementById("datepicker_end").value;
	
	arr = start.split("/");
	start_day = arr[1];
	start_month = arr[0];
	start_year = arr[2];
	start_date = (start_year + start_month + start_day) * 1;

	arr = end.split("/");
	end_day = arr[1];
	end_month = arr[0];
	end_year = arr[2];
	end_date = (end_year + end_month + end_day) * 1;
	
	document.getElementById("printButton").style.display="inline";
	document.getElementById("hour_date").style.display = "inline-table";
}


function tableSetUp(id) {
	var year_diff = end_year - start_year;
	if (year_diff == 0)
		var month_diff = end_month - start_month;
	else
		var month_diff = (12 - start_month) + (end_month - 1);
	//var month = start_month * 1;
	var year = start_year * 1;
	//console.log('end_month = ' + end_month);
	var tbody = document.getElementById(id);
	
	
	
	for(var k = 0; k <= year_diff; k++, year++) {
		if(k == 0)
			month = start_month * 1;
		else
			month = 1;
		
		if(k == year_diff) {
			numOfMonths = end_month * 1;
		} else {
			numOfMonths = 12;
		}
		
		for(var i = month; i <= numOfMonths; i++, month++) {
			if(i == start_month)
				day = start_day * 1;
			else
				day = 1;
			
			if(i < 10)
				month = "0" + month;
			
			if(k == year_diff) {
				if(i == numOfMonths)
					numOfDays = end_day * 1;
				else 
					numOfDays = new Date(year, month, 0).getDate();
			} else {
				numOfDays = new Date(year, month, 0).getDate();
			}
			
			for(var j = day; j <= numOfDays; j++) {
				if(j < 10)
					j = "0" + j * 1;
				var date_td = j + "/" + month + "/" + year;
				var date_tr = "" + year + month + j;
			
					var y = document.createElement("tr");
					y.setAttribute("id", id + "" + date_tr);			
					tbody.appendChild(y);

					var x = document.createElement("TD");
					x.setAttribute('align', 'center');
					x.setAttribute("id", id + "" + date_tr + "date");
					y.appendChild(x);
					var t = document.createTextNode(date_td);
					x.appendChild(t);
					
					x = document.createElement("TD");
					x.setAttribute('align', 'center');
						x.setAttribute("id", id + "" + date_tr + "hour");
						y.appendChild(x);
						x.innerHTML = 0;
					
					x = document.createElement("TD");
					x.setAttribute('align', 'center');
						x.setAttribute("id", id + "" + date_tr + "min");
						y.appendChild(x);
						x.innerHTML = 0;
			}
		}
		
		y = document.createElement("tr");		
					tbody.appendChild(y);
		y.setAttribute('style', 'color: #DB2020; font-size: 15px;');
		
		x = document.createElement("TD");
		x.setAttribute('align', 'center');
			t = document.createTextNode("Total");
			y.appendChild(x);
			x.appendChild(t);
		
		x = document.createElement("TD");
		x.setAttribute('align', 'center');
			x.setAttribute("id", id + "hour_tt");
			y.appendChild(x);
			x.innerHTML = 0;
		
		x = document.createElement("TD");
		x.setAttribute('align', 'center');
			x.setAttribute("id", id + "min_tt");
			y.appendChild(x);
			x.innerHTML = 0;
		
	}
	/*for(var i = 0; i <= month_diff; i++, month++) {
		if(i == 0)
			day = start_day * 1;
		else
			day = 1;
		
		if(month < 10)
			month = "0" + month;
		
		if(i == month_diff)
			numOfDays = end_day;
		else
			numOfDays = new Date(start_year, month, 0).getDate();
		
		for(var j = day; j <= numOfDays; j++) {
			if(j < 10)
				j = "0" + j * 1;
			var date_td = j + "/" + month + "/" + start_year;
			var date_tr = "" + start_year + month + j;
		
				var y = document.createElement("tr");
				y.setAttribute("id", id + "" + date_tr);			
				tbody.appendChild(y);

				var x = document.createElement("TD");
				x.setAttribute('align', 'center');
				x.setAttribute("id", id + "" + date_tr + "date");
				y.appendChild(x);
				var t = document.createTextNode(date_td);
				x.appendChild(t);
				x = document.createElement("TD");
				x.setAttribute('align', 'center');
					x.setAttribute("id", id + "" + date_tr + "workHours");
					y.appendChild(x);
					x.innerHTML = 0;
		}
	
	}*/
}

function getGroups() {
	$('#group_btn').html('');
	$('#hour_date > tbody').remove();
	
	employee_data_ref.on('child_added', snap => {
		var id = snap.key;
		var group_name = snap.val().name;
		$('#group_btn').append('&emsp;<button type="button" class="dropbtn grass grp_btn" onclick="set_up_firebaseDate(\'' + snap.key + '\',\'' + group_name + '\')">' + group_name + '</button>');
		
	});
}

function set_up_firebaseDate(group_id, group_name) {
	$('#hour_date > tbody').remove();
	//document.getElementById("dateDuration").innerHTML = start_day + "." + start_month + " - " + end_day + "." + end_month + "." + end_year;
	var cur_id;
	$('#group').html('Group: ' + group_name);
	var group_ref = ref.child(employee_data_path + group_id + '/employees');
	group_ref.on("child_added", snap => {
		var id = snap.key;
		var name = snap.child("name").val();
		var ssn = snap.child("ssn").val();
		var tag_id = snap.child("tag_id").val();
		var old_tag_id = snap.child("old_tag_id").val();
		$('#hour_date').append('<tbody id="' + tag_id + '"></tbody>');
		$('#' + tag_id).append('<tr><td colspan="2" style="text-align: left;"><span style="font-weight: bold;">- ' + name + ' -</span></td></tr>');
		tableSetUp(tag_id);
		getAllIds(tag_id, old_tag_id);
	});
}

function getAllIds(tag_id, old_tag_id) {
	var m = 0;
	
	var id_arr =  (old_tag_id != "") ? old_tag_id.split("|") : [];
	id_arr.push(tag_id);
	
		for(var i = 0; i < id_arr.length; i++) {
			
			var curId = id_arr[i];
			//console.log('curId: ' + curId);
			if(curId != "")
				getNumOfEventsDate(curId, (i == id_arr.length - 1) ? true:false);
		}
}

function getNumOfEventsDate(id, state) {
	var log_event_ref = ref.child(authorised_id_path + id + "/log_events");
	
	log_event_ref.orderByChild("dateStamp").startAt(start_date).endAt(end_date).once("value", function(snap) {
			m = snap.numChildren();
			//m = 1;
			console.log('m = ' + m);
			if( m != 0) {
				get_employee_by_id(id, m);
			} 
			
			if(state) {
				if(m == 0) 
					document.getElementById("hiddenLink").click();
			}
			log_event_ref.off("value");
	});

}

function get_employee_by_id(tag_id, totalEvents) {
	//console.log(tag_id);
	var index = 0;
	var timestamps = [];
	var id = tag_id;
	
	var log_event_ref = ref.child(authorised_id_path + id + "/log_events");
	
	log_event_ref.orderByChild("dateStamp").startAt(start_date).endAt(end_date).on("child_added", function(snap) {
		//if(snap.val().datestamp >= start_date && snap.val().datestamp <= end_date) {
			if(timestamps.length % 2 == 0) {
				//console.log("id = " + tag_id + ", " + name);
				timestamps = [];
			}
			
			if(snap.val() != null && totalEvents != 1) {	
				//timestamps.push(snap.child("timestamp").val());
				if(timestamps.length % 2 == 0 && snap.val().direction == "in" || timestamps.length % 2 != 0 && snap.val().direction == "out") {
					
					timestamps.push(snap.child("timeStamp").val());
					++index; 
					//console.log(timestamps);
					if(timestamps.length % 2 == 0 && timestamps.length != 0) {
						set_reportDate(timestamps.length, timestamps, tag_id);
					}
				} else {
					document.getElementById("hiddenLink").click();
					log_event_ref.off();
				}
			}
			if(index == totalEvents && totalEvents % 2 == 0 || index == (totalEvents - 1) && totalEvents % 2 != 0) {
				//set_total();
				document.getElementById("hiddenLink").click();
				log_event_ref.off();
			}
		//}
	});
	
}




function set_reportDate(i, timestamps, id) {	
		var a = timestamps[i-2] + "";
		var b = timestamps[i - 1] + "";
		
		var daya = a.substring(6,8);
		var montha = a.substring(4,6);
		var yeara = a.substring(0,4);
		
		var dayb = b.substring(6,8);
		var monthb = b.substring(4,6);
		var yearb = b.substring(0,4);
		
		
		
		if(dayb == daya && monthb == montha && yeara == yearb) {
			var date_td = daya + "/" + montha + "/" + yeara;
			var date = "" + yeara + montha + daya;
			if(date >= start_date && date <= end_date) {
				var total_min = (b.substring(8,10) * 60 + b.substring(10,12) * 1) - (a.substring(8,10) * 60 + a.substring(10,12) * 1);
				var hour = Math.floor(total_min/60);
				var min = total_min % 60;
				//hour = hour.toFixed(2);
				
				var hour_tt = hour;
				var x = document.getElementById(id + "min_tt");
				console.log(x.innerHTML);
				var min_tt = min * 1 + x.innerHTML * 1;
				var extra_h = Math.floor(min_tt/60);
				if( extra_h > 0) {
					hour_tt = hour_tt * 1 + extra_h * 1;
					min_tt = min_tt % 60;
				}
				x.innerHTML = min_tt;
				
				x = document.getElementById(id + "hour_tt");
				hour_tt = hour_tt * 1 + x.innerHTML * 1;
				x.innerHTML = hour_tt;
			
				x = document.getElementById(id + "" + date + "min");
				min = min * 1 + x.innerHTML * 1;
				var extra_h = Math.floor(min/60);
				if( extra_h > 0) {
					hour = hour * 1 + extra_h * 1;
					min = min % 60;
				}
				x.innerHTML = min;
				
				x = document.getElementById(id + "" + date + "hour");
				hour = hour * 1 + x.innerHTML * 1;
				x.innerHTML = hour;
			}
		}
}
		
function fnExcelReport() {
	$('#group_btn_tr').hide();
	 var tab_text = '<html xmlns:x="urn:schemas-microsoft-com:office:excel">';
	 tab_text = tab_text + '<head><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>';
	 tab_text = tab_text + '<x:Name>Test Sheet</x:Name>';
	 tab_text = tab_text + '<x:WorksheetOptions><x:Panes></x:Panes></x:WorksheetOptions></x:ExcelWorksheet>';
	 tab_text = tab_text + '</x:ExcelWorksheets></x:ExcelWorkbook></xml></head><body>';
	 tab_text = tab_text + "<table style='width: 40%;'>";
	 
	//get table HTML code
	 tab_text = tab_text + $('#hour_date').html();
	 tab_text = tab_text + '</table></body></html>';
	
	
	var data_type = 'data:application/vnd.ms-excel';

	 var ua = window.navigator.userAgent;
	 var msie = ua.indexOf("MSIE ");
	 var file_name = 'Report-' + getDateStamp() + '.xls';
	 //For IE
	 if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
		  if (window.navigator.msSaveBlob) {
			  var blob = new Blob([tab_text], {type: "application/csv;charset=utf-8;"}); 
			  navigator.msSaveBlob(blob, file_name);
		  }
	 } 
	//for Chrome and Firefox 
	else {
	 $('#print_btn').attr('href', data_type + ', ' + encodeURIComponent(tab_text));
	 $('#print_btn').attr('download', file_name);
	}
	$('#group_btn_tr').show();
}