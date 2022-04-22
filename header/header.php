<!DOCTYPE html>
<?php
require_once("/headerPath.php");
?>

<html>

<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="./css/header.css">
    <link rel="stylesheet" href="<?php echo $css; ?>">
    <link rel="stylesheet" href="<?php echo $font; ?>">

    <script src="./js/jquery-3.2.1.js"></script>
</head>

<body>
    <script>
        $(document).ready(function() {
            $("#logout_la").click(function() {
                $.post("logout.php", {}, function() {
                    window.open("../index.php", "_top");
                });
            });
            $("#pinpage").click(function() {
                $("#left_div").attr('src', "./pinPage.php");
            });
            $("#homepage").click(function() {
                window.open("../index.php", "_top");
                $("#logout_la").click();
            });
        });
    </script>

    <header id='header'>
        <span align="right" id="logout">
            <label class="header" id='logout_la'></label>
            <label class="header" id='shrink'><i class="fas fa-th-list"></i></label>
        </span>

        <span align="left">> <label id="homepage" class="header">PÄÄSIVU</label>
            <div id='left_header' style="display: inline"></div>
        </span>
    </header>

</body>

</html>