<?php
@ob_start();
session_start();

$logo_img = './img/logo_1.png';
require_once("./logo.php");
require_once("./header/header.php");
?>

<!DOCTYPE html>
<html>

<head>
    <title>SPR Management</title>
    <link rel="stylesheet" href="./css/style.css">
    <link rel="stylesheet" href="./css/index.css">
    <script src="./js/jquery-3.2.1.js"></script>
    <link rel="stylesheet" href="<?php echo $button_css; ?>">
</head>

<body>
    <?php
    if (isset($_SESSION['typed_pin']) && $_SESSION['typed_pin'] == $_SESSION['pin']) {
        $pinAreaDisplay = "none";
        $optionAreaDisplay = "inline-block";
    ?><script>
            window.open("management.php", "_top");
        </script><?php
                } else {
                    ?><script>
            $(window.parent.document).find("#logout_la").html("");
        </script><?php
                } ?>

    <h2>Myymälä</h2>
    <div>
        <table id="place_option" align="center" style="table-layout:fixed" class="radioButtons collapseBorder"></table>
        <button type="button" class="button" id="place_confirm">Go</button>
    </div>

    <script>
        window.onload = function init() {
            var ref = firebase.database().ref();

            ref.child("shop_data").once("value")
                .then((snap) => {
                    var val = snap.val();
                    if (val != null) {
                        Object.keys(val).forEach((key) => {
                            setRadioButton(val[key].name, key);
                        })
                    } else console.log("Nothing in the database.")
                })
                .catch((err) => {
                    console.log(err)
                })
                .then(() => {
                    $('#place_confirm').click(() => {
                        var shop_data = $("input[type=radio][name=place]:checked").val();
                        var arr = shop_data.split("/");
                        console.log(arr)

                        var shop_name = $('#' + arr[0]).text();
                        $.post("session.php", {
                            "shop_id": arr[0],
                            'shop_name': shop_name
                        }, (data) => {
                            window.open("./management.php", "_top");
                            parent.window.$('#right_div').find('#shop_name').html(shop_name);
                        })
                    })
                })
        };

        function setRadioButton(val, key, pin) {
            $("#place_option").append("<tr><td><label id='" + key + "'>" + val + "</label></td><td><input type='radio' name='place' value='" + key + "'></td></tr>");
        }
    </script>

    <script id="loader" src="./header/jsPack.js" resources="firebasejs;firebaseInit;firebaseRef"></script>
</body>

</html>