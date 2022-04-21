<?php session_start(); ?>
<script>
    var shop_id = '<?php echo $_SESSION['shop_id']; ?>';
</script>
<?php file_get_contents('./header/jsPack.js'); ?>
<?php require_once('./header/header.php'); ?>
<?php
if (!isset($_SESSION['shop_id'])) {
    header("Location: index.php");
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
    <style>
        iframe {
            border: 0;
        }

        iframe#right_div {
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(249, 36, 36, 0.8);
            text-align: center;
        }

        body::-webkit-scrollbar {
            display: none;
        }

        body {
            overflow: hidden;
        }

        iframe {
            -webkit-transition: All 0.3s ease;
            -moz-transition: All 0.3s ease;
            -o-transition: All 0.3s ease;
        }
    </style>
</head>

<body scrolling='no'>
    <?php
    $nav = "TYÖNTEKIJÄT";
    ?>

		<iframe id='left_div' frameborder="0" style="position:absolute;top:51px;left:0;width:75%;height:93%;" src='pinPage.php'></iframe>
		</iframe>


</body>

</html>