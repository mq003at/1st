<!DOCTYPE html>
<?php
require_once("headerPath.php");
?>

<html>

<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="<?php echo $css; ?>">
    <link rel="stylesheet" href="<?php echo $font; ?>">
    <style>
        span#logout {
            display: block;
            float: right;
            height: 0px;
        }

        header {
            padding: 15px;
            color: white;
            background: #F92424;
            font-weight: bold;
            text-align: left;
            font-size: 16px;
        }
    </style>
    <script src="https://code.jquery.com/jquery-3.2.1.js"></script>
</head>

<body>
    <script>
        $(document).ready(function() {
            $("#logout_la").click(function() {
                console.log("clicked");
                $.post("logout.php", {}, function() {
                    //window.open(path + "/spr/public/index.php", "_top");
                    //$("#left_div").attr('src', "index.php");
                    window.open("../index.php", "_top");
                });
            });
            $("#pinpage").click(function() {
                //window.open(path + "/spr/public/php/pinPage.php","_self");
                $("#left_div").attr('src', "pinPage.php");
                //window.open("php/pinPage.php","_self");
            });
            $("#homepage").click(function() {
                //window.open(path + "/spr/public/index.php","_top");
                //$("#left_div").attr('src', "index.php");
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