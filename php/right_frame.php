<?php session_start(); 
require_once $_SERVER['DOCUMENT_ROOT']."/header/headerPath.php";
require_once $_SERVER['DOCUMENT_ROOT']."/header/footer.php"
?>
<html>
	<head>
		<link rel="stylesheet" href="<?php echo $font;?>">
		<link rel="stylesheet" href="<?php echo $button_css;?>">
        <link rel="stylesheet" href="/css/right-frame.css">
	</head>
	<body>
		<br>
		
		<table align='left'>
			<tr>
				<th colspan='2'><label><?php echo $_SESSION['shop_name'];?></label></th>
			<tr>
			<tr>
				<th style='font-size: 18px; font-weight:bold;' colspan='2'>Kirjautunut sisään</th>
				<th><button onclick="parent.get_user();" class='lb shadow2'><i class="fas fa-sync"></i></button></th>
			</tr>
			<tbody id='log_user'>
			
			</tbody>
		</table>
		
		<script> 
			var shop_id = '<?php echo $_SESSION['shop_id'];?>'; 
		</script>
		<script>
			function out(key) {
				getDateStamp();
				getTimeStamp();
				getSecond();
				logOutEmployee(key);
			}

			function in() {}
		</script>
        <script id="loader" src="/header/jsPack.js" resources="firebasejs;firebaseInit;firebaseRef;dateStamp"></script>
	</body>
</html>