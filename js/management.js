$(window.parent.document).find("#left_header").html("").append(" >> <label id=\"pinpage\" class=\"header\">TYÖAJANSEURANTA</label>");
$(window.parent.document).find("#pinpage").click(() => {
    $("#left_div").attr('src', '/php/pinPage.php');
    $("#left_div").fadeIn()
})

$('#shrink').click(function () {
    if ($('#right_div').is(':visible')) {
        rightIframe_hide();
    } else {
        $('#left_div').css('width', '75%');
        $('#right_div').show();
    }
});

function rightIframe_hide() {
    window.parent.$('#left_div').css('width', '100%');
    window.parent.$('#right_div').hide();
}

// Get all user ids from the database.
function get_user() {
    $("#right_div").contents().find("#log_user").html('');
    authorised_id_ref.off();
    appendName();

    authorised_id_ref.on("child_changed", function (snap) {
        var id = snap.key;
        if (snap.val().actual_state == 'out') {
            $("#right_div").contents().find('#' + id).remove();
            $("#right_div").contents().find('#' + id).html();
        }
    });
    authorised_id_ref.on("child_removed", function (snap) {
        $("#right_div").contents().find('#' + snap.key).remove();
    });
}

function appendName() {
    if (arguments.length == 0) {
        // Get all the users in the store
        employee_data_ref.on("child_added", (snap) => {
            let groupID = snap.key;
            // $("#right_div").contents().find("#log_user").append("<div><label>" + groupID + "</label></div>");
            appendGroup(groupID);
            ref.child(employee_data_path + groupID + "/employees/").once("value", employee => {
                var val = employee.val();
                if (val != null) {
                    Object.keys(val).forEach((key) => {
                        var employeeName = val[key].name;
                        var employeeID = val[key].tag_id;
                        var employeeStatus = "";
                        authorised_id_ref.child(employeeID).child("actual_state").once("value", snap => {employeeStatus = snap.val()})
                        if (!$("#right_div").contents().find('#' + employeeID).length) {

                            $id = $("<tr id=\"" + employeeID + "\"></tr>");
                            $name = $("<td width=\"60%\">" + employeeName + "</td>");
                            $login = $("<td with=\"15%\"><button onclick=\"in(\'' + employeeID + '\')\" class=\"sun\"><i class=\"fas fa-sign-in-alt employee\"></i></button></td>");
                            $logout = $("<td><button onclick=\"out(\'' + employeeID + '\')\" class=\"moon\"><i class=\"fas fa-sign-out-alt employee\"></i></button></td>");
                            $status = $("<td with=\"15%\"></td>");
                            if (employeeStatus == "in") $status.append("<i class=\"fas fa-briefcase\" title=\"Present\"></i>")
                                else $status.append("<i class=\"fas fa-bed\" title=\"Absent\"></i>") 
                            $id.append($name, $status, $login, $logout);
                            $("#right_div").contents().find("#log_user").append($id);
                        }
                    })
                }
            })
        })
    }
    else {
        // Get specific users based on their ID
        let id = arguments[0];
        employee_data_ref.on("child_added", function (groupID) {
            ref.child(employee_data_path + groupID.key + '/employees/').orderByChild("tag_id").equalTo(id).once('value', employee => {
                var val = employee.val();

                if (val != null) {
                    Object.keys(val).forEach(function (key) {
                        var name = val[key].name;
                        if (!$("#right_div").contents().find('#' + id).length) {

                            $id = $("<tr id=\"" + id + "\"></tr>");
                            $name = $("<td width=\"55%\">" + name + "</td>");
                            $login = $("<td with=\"15%\"><button onclick=\"in(\'' + id + '\')\" class=\"sun\"><i class=\"fas fa-sign-in-alt employee\"></i></button></td>");
                            $logout = $("<td><button onclick=\"out(\'' + id + '\')\" class=\"moon\"><i class=\"fas fa-sign-out-alt employee\"></i></button></td>");
                            $status = $("<td with=\"15%\"><i class=\"fas fa-briefcase\"></i></td>");
                            $id.append($name, $status, $login, $logout);
                            $("#right_div").contents().find("#log_user").append($id);
                        }
                    });
                    employee_data_ref.off("child_added");
                }
            });
        });
    }
}

function appendGroup(groupID) {
    $("#right_div").contents().find("#log_user").append("<tr><td><div style=\"font-weight: bold;\">" + groupID + "</td></tr>");
}