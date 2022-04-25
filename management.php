<?php session_start(); ?>
<script>
    var shop_id = '<?php echo $_SESSION['shop_id']; ?>';
</script>
<?php 
require_once $_SERVER['DOCUMENT_ROOT']."/header/header.php"; 
// require_once $_SERVER['DOCUMENT_ROOT']."/header/footer.php"
?>

<?php
if (!isset($_SESSION['shop_id'])) {
    header("Location: /index.php");;
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
    <iframe id='right_div' style="position:absolute;top:51px;left:70%;width:30%;height:100%;" src='/php/right_frame.php' scrolling='yes' src='/php/test1.php'></iframe>
    <script id="loader" src="/header/jsPack.js" resources="management"></script>
    
</body>

</html>