<?php 
    @ob_start();
    session_start();

    $logo_img = '/img/logo_1.png';
    require_once("logo.php");

?>

<!DOCTYPE html>
<html>
    <head>
        <title>SPR Management</title>
        <link rel="stylesheet" href ="/css/style.css">
        <link rel="stylesheet" href="<?php echo $button_css;?>">

        <style>
			.button {
				background-color: #4CAF50; /* Green */
				border: none;
				color: white;
				padding: 5px 20px;
				text-align: center;
				text-decoration: none;
				display: inline-block;
				font-size: 16px;
				margin: 4px 2px;
				-webkit-transition-duration: 0.4s; /* Safari */
				transition-duration: 0.4s;
				cursor: pointer;
				border-radius: 4px;
			}
			
			.button {
				background-color: white; 
				color: black; 
				border: 2px solid #f44336;
			}

			.button:hover {
				background-color: #f44336;
				color: white;
			}

		</style>

    </head>

    <body>       
        <h2>Myymälä</h2>
        <div>
            <table id="place_option" align="center" style="table-layout:fixed" class="radioButtons collapseBorder"></table>
            <button type="button" class="button" id="place_confirm">Go</button>
        </div>

        <script>
            window.onload = function init() {
                var ref = firebase.database().ref();
				var shop_data_ref = ref.child("shop_data");

                ref.child("shop_data").once("value")
                    .then((snap) => {
                        var val = snap.val();
					    if(val != null) {
						    Object.keys(val).forEach((key) => {
							    setRadioButton(val[key].name, key, val[key].pin);
						    });
					    }
                        else console.log("Nothing in the database.")
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                    .then(() => {
                        $('#place_confirm').click(() => {
                        var shop_data = $("input[type=radio][name=place]:checked").val();
                        var arr = shop_data.split("/");
                        console.log(shop_data)
                        console.log(arr)
  
                        var shop_name = $('#' + arr[0]).text();
                        $.post("setShopId.php", {"shop_id": arr[0], "pin": arr[1], 'shop_name': shop_name}, (data) => {
						    window.open("management.php", "_top");
						    parent.window.$('#right_div').find('#shop_name').html(shop_name);})
                        })
                    })
            };

            function setRadioButton(val, key, pin){
                $("#place_option").append("<tr><td><label id='" + key + "'>" + val + "</label></td><td><input type='radio' name='place' value='" + key + "/" + pin + "'></td></tr>");
            }    
        </script>

<script id="loader" src="./header/jsPack.js" resources="firebasejs;firebaseInit;firebaseRef;jQuery"></script>       </body>
</html>