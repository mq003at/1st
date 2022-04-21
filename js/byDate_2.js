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
						x.setAttribute("id", id + "" + date_tr + "des");
						y.appendChild(x);
						x.innerHTML = '';
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
		
			
		y = document.createElement("tr");		
		tbody.appendChild(y);
		y.setAttribute('style', 'color: #DB2020; font-size: 15px;');
		
		
	}
}

function getGroups() {
	$('#group_btn').html('');
	$('#hour_date > tbody').remove();
	
	employee_data_ref.once('value', snap => {
		var val = snap.val();
		if(val != null) {
			Object.keys(val).forEach(function(key) {
				var group_name = val[key].name;
				
				$('#group_btn').append('&emsp;<button type="button" class="dropbtn grass grp_btn" onclick="set_up_firebaseDate(\'' + key + '\',\'' + group_name + '\')">' + group_name + '</button>');
			});
		}
	});
}

function set_up_firebaseDate(group_id, group_name) {
	$('#hour_date > tbody').remove();
	
	var cur_id;
	$('#group').html(group_name);
	var group_ref = ref.child(employee_data_path + group_id + '/employees');
	group_ref.once('value', snap => {
		var val = snap.val();
		if(val != null) {
			Object.keys(val).forEach(function(key) {
				var key_val = val[key];
				var tag_id = key_val.tag_id;
				var name = key_val.name;
				
				$('#hour_date').append('<tbody id="' + tag_id + '"></tbody>');
				$('#' + tag_id).append('<tr><td colspan="2" style="text-align: left;"><span style="font-weight: bold;">- ' + name + ' -</span></td></tr>');
				tableSetUp(tag_id);
				get_employee_by_id(tag_id);
			});
		}
	});
}

function get_employee_by_id(tag_id) {
	
	var timestamps = [];
	var id = tag_id;
	
	var log_event_ref = ref.child(authorised_id_path + id + "/log_events");
	
	log_event_ref.orderByChild("dateStamp").startAt(start_date).endAt(end_date).once("value", function(snap) {
		var totalEvents = snap.numChildren();
		var val = snap.val();
		if(val != null) {
			var previous = "out";
			var size = Object.keys(val).length;
			Object.keys(val).every(function(key,index) {
				if(timestamps.length % 2 == 0) {
					timestamps = [];
				}
				
				if(val[key] != null && totalEvents != 1) {	
					if(timestamps.length % 2 == 0 && val[key].direction == "in" || timestamps.length % 2 != 0 && val[key].direction == "out") {
						timestamps.push(val[key].timeStamp);
						
						if(timestamps.length % 2 == 0 && timestamps.length != 0) {
							set_reportDate(timestamps, tag_id,"2");
						}
						else
						{
							if ((previous == "in" && val[key].direction == "in") || (val[key].direction == "in" && index == (size -1)))
							{
								set_reportDate([val[key].timeStamp,val[key].timeStamp], tag_id,"1");
							}
						}
						previous = val[key].direction;
						return true;
					}
					else {
						previous = val[key].direction;
						document.getElementById("hiddenLink").click();		
						return false;
					}
				}
			});
			document.getElementById("hiddenLink").click();
		}
	});
	
}




function set_reportDate(timestamps, id,mode) {	
	var a = timestamps[0] + "";
	var b = timestamps[1] + "";
	var daya = a.substring(6,8);
	var montha = a.substring(4,6);
	var yeara = a.substring(0,4);
	
	var dayb = b.substring(6,8);
	var monthb = b.substring(4,6);
	var yearb = b.substring(0,4);
	if (mode == "1")
	{
		var date_td = daya + "/" + montha + "/" + yeara;
		var date = "" + yeara + montha + daya;
		if(date >= start_date && date <= end_date) {
			var times = $('#' + id + date + "des").html();
			if(times.length > 0)
				$('#' + id + date + "des").append(', ');
			$('#' + id + date + "des").append(a.substring(8,10) + ":" + a.substring(10,12));	
		}
	}
	else
	{
		if(dayb == daya && monthb == montha && yeara == yearb) {
			var date_td = daya + "/" + montha + "/" + yeara;
			var date = "" + yeara + montha + daya;
			if(date >= start_date && date <= end_date) {
				
				var times = $('#' + id + date + "des").html();
				if(times.length > 0)
					$('#' + id + date + "des").append(', ');
				$('#' + id + date + "des").append(a.substring(8,10) + ":" + a.substring(10,12) + " - " + b.substring(8,10) + ":" + b.substring(10,12));
				
			}
		}
		else
		{
			var date_td = daya + "/" + montha + "/" + yeara;
			var date = "" + yeara + montha + daya;
			if(date >= start_date && date <= end_date) {
				var times = $('#' + id + date + "des").html();
				if(times.length > 0)
					$('#' + id + date + "des").append(', ');
				$('#' + id + date + "des").append("|" + a.substring(8,10) + ":" + a.substring(10,12) + "|");	
			}
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
	 var file_name = 'Raporti-' + getDateStamp() + getTimeStamp() + '-' + $('#group').html() + '.xls';
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