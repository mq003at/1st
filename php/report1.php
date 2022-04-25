<?php
session_start();
require_once $_SERVER['DOCUMENT_ROOT'] . '/header/headerPath.php';
$nav = "RAPORTIT";
?>

<!DOCTYPE html>
<html>

<head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<title>Report Management</title>
	<link rel="stylesheet" href="code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
	<link rel="stylesheet" href="/css/report1.css">
	<link rel="stylesheet" href="<?php echo $css; ?>">
	<link rel="stylesheet" href="<?php echo $button_css; ?>">
	<xml>
		<x:ExcelWorkbook>
			<x:ExcelWorksheets>
				<x:ExcelWorksheet>
					<x:WorksheetOptions>
						<x:Panes></x:Panes>
					</x:WorksheetOptions>
				</x:ExcelWorksheet>
			</x:ExcelWorksheets>
		</x:ExcelWorkbook>
	</xml>
</head>

<body>

	<h2 style="font-weight: bold; margin-top: 51px;">RAPORTIT</h2>
	<br>

	<div id="date_choosing" align="center">
		<table id="datepicker" style="background-color:#FFFFFF" border="0">
			<tr class="noBorder">
				<th>Aloitus pvm</th>

				<th>Päättymis pvm</th>
			</tr>
			<tr class="noBorder">
				<td><input type="text" id="datepicker_start"></td>

				<td><input type="text" id="datepicker_end"></td>
			</tr>
		</table>
	</div>


</body>

</html>
