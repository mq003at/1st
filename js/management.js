$(window.parent.document).find("#left_header").html("").append(" >> <label id=\"pinpage\" class=\"header\">TYÖAJANSEURANTA</label>");
$(window.parent.document).find("#pinpage").click(() => {
    $("#left_div").attr('src', '/php/pinPage.php');
    $("#left_div").fadeIn()
})

$('#shrink').click(function() {
    if($('#right_div').is(':visible')) {
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

function get_user() {
    $("#right_div").contents().find("#log_user").html('');
    authorised_id_ref.off();
    authorised_id_ref.orderByChild("actual_state").equalTo("in").on("child_added", function(snap) {
        var id = snap.key;
        appendName(id);
    });
    
    authorised_id_ref.on("child_changed", function(snap) {
        var id = snap.key;
        if(snap.val().actual_state == 'out') {
            $("#right_div").contents().find('#'+id).remove();
            $("#right_div").contents().find('#'+id).html();
        }
    });
    authorised_id_ref.on("child_removed", function(snap) {
        $("#right_div").contents().find('#'+snap.key).remove();
    });
}

function appendName(id) {
    employee_data_ref.on("child_added", function(snap_1) {
        ref.child(employee_data_path + snap_1.key + '/employees/').orderByChild("tag_id").equalTo(id).once('value', snap_2 => {
            var val = snap_2.val();
            
            if(val != null) {
                Object.keys(val).forEach(function(key) {
                    var name = val[key].name;
                    if(!$("#right_div").contents().find('#'+id).length)
                        $("#right_div").contents().find("#log_user").append('<tr id="'+id+'"><td width="35%">' + name + '</td>' +
                                '<td><button onclick="out(\'' + id + '\')" class="sun"><i class="fas fa-sign-out-alt employee"></i></button></td></tr>');
                });
                employee_data_ref.off("child_added");
            }
        });
    });
}