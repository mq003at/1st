var ref = firebase.database().ref();

if (typeof shop_id !== "undefined") {
    var employee_data_path = "shop_data/" + shop_id + "/employee_data/";
    var authorised_id_path = "shop_events/" + shop_id + "/authorised_id/";
    var employee_data_ref = ref.child(employee_data_path);
    var authorised_id_ref = ref.child(authorised_id_path);

}


