<?php session_start(); ?>
<script>
    var shop_id = '<?php echo $_SESSION['shop_id']; ?>';
</script>
<?php require_once $_SERVER['DOCUMENT_ROOT']."/header/header.php"; ?>

<?php
if (!isset($_SESSION['shop_id'])) {
    echo '<script>alert("Welcome to Geeks for Geeks")</script>';
}

if (isset($_SESSION['typed_pin']) && $_SESSION['typed_pin'] == $_SESSION['pin']) {
?><script>
        get_user();
        $('#shrink').click();
    </script><?php
            }
                ?>
<html>

<head>
    <title>Management Page</title>
    <link rel="stylesheet" href="./css/management.css">
</head>

<body>
    <?php
    $nav = "TYÖNTEKIJÄT";
    ?>

    <iframe id='left_div' frameborder="0" style="position:absolute;top:51px;left:0;width:75%;height:93%;" src='/php/pinPage.php'></iframe>
    </iframe>
</body>

</html>