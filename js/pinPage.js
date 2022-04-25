let shopKey = $("#pinSubmit").val();
let shopPin;
let typedPin;

$(window).on("load", function () {
    var ref = firebase.database().ref();
    ref
      .child("shop_data").child(shopKey)
      .once("value")
      .then((snap) => {
        var val = snap.val();
        shopPin = val.pin;
      });
});

$("#pinInput").keyup((e) => {
	if (e.keyCode == 13) submitPin();
})

$("#pinSubmit").click(() => {
	submitPin();
});

$("#employeeLabel").click(function() {
	window.open("employee.php", "_self");
	parent.rightIframe_hide();
});

$("#reportLabel").click(function() {
	window.open("report1.php", "_self");
	parent.rightIframe_hide();
});

$("#reportLabel2").click(function() {
	window.open("report.php", "_self");
	parent.rightIframe_hide();
});

$("#reportin").click(function() {
	window.open("tagged.php", "_self");
	parent.rightIframe_hide();

});

$("#logoutEmployee").click(function() {
	$("#logoutModalClick").click();
});

$("#logoutConfirm").click(function() {
	getInEmp();
});

$("#deleteLogs").click(function() {
	$("#cleanupModalClick").click();
});

$("#cleanupConfirm").click(function() {
	cleanupLogs();
});

function submitPin(){
	typedPin = $("#pinInput").val();
	if (typedPin == shopPin) {
	  $(window.parent.document)
		.find("#logout_la")
		.html("<label class='header'>KIRJAUDU ULOS</label>");
	  $("#optionArea").css("display", "inline");
	  $("#pinArea").css("display", "none");
	  $.post("session.php", {"typed_pin": typedPin });
	} else {
	  alert("Incorrect Pin");
	}
}

function cleanupLogs() {
	var falseIn = [];
	var index = 0;
	var post_data = {
		log_events: ""
	}; 

	authorised_id_ref.once("value", function(snap) {
		var val = snap.val();
		if(val != null) {
			Object.keys(val).forEach(function(key) {
				var newPostKey = authorised_id_ref.child(key);
				if(val[key].actual_state == 'out') {
					newPostKey.update(post_data);	
				} else {
					updateLastLog(key);
				}
			});
		}
	});

	document.getElementById("ntfModalClick").click();
	$('#ntfMessage').html('All logs has been cleaned up.');
	setTimeout(offModal, 1000);
}

function updateLastLog(id) {
	var index = 0;
	var path = authorised_id_path + id + "/log_events";
	var logRef = ref.child(path);
	
	logRef.once('value', snap => {
		var val = snap.val();
		var num = snap.numChildren();
		if(val != null) {
			Object.keys(val).forEach(function(key) {
				index++;
				if(index < num) {
					var removeRef = ref.child(path + '/' + key);
					removeRef.remove();
				}
			});
		}
	});
}

function getInEmp() {
	getDateStamp();
	getTimeStamp();
	getSecond();
	
	authorised_id_ref.orderByChild("actual_state").equalTo("in").once("value", snap => {
		var val = snap.val();

		if(val != null) {
			Object.keys(val).forEach(function(key) {
				logOutEmployee(key);
			});
		}
		
		document.getElementById("ntfModalClick").click();
		$('#ntfMessage').html('All employes has been logged out.');
		setTimeout(offModal, 1000);
	});
}

function offModal() {
	document.getElementById("ntfModalDismiss").click();
}
