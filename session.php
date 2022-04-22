<?php
	session_start();
	
	if(isset($_POST['shop_id']) && isset($_POST['shop_name'])) {
		$_SESSION['shop_id'] = $_POST['shop_id'];
		$_SESSION['shop_name'] = $_POST['shop_name'];
		// $_SESSION['typed_pin'] = "regT863";
	}
	
?>