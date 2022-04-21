<?php
	session_start();
	
	if(isset($_POST['shop_id']) && isset($_POST['pin']) && isset($_POST['shop_name'])) {
		$_SESSION['shop_id'] = $_POST['shop_id'];
		$_SESSION['pin'] = $_POST['pin'];
		$_SESSION['shop_name'] = $_POST['shop_name'];
	}
	
?>