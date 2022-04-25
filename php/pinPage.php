<?php
session_start();
require_once $_SERVER['DOCUMENT_ROOT'].'/header/headerPath.php';
?>
<!DOCTYPE html>
<script>
    var shop_id = '<?php echo $_SESSION['shop_id']; ?>';
    <?php echo "" ?>
</script>
<html>

<head>
    <meta charset="utf-8">
    <title>TYÖAJANSEURANTA</title>
    <link rel="stylesheet" href="<?php echo $css; ?>">
    <link rel="stylesheet" href="<?php echo $button_css; ?>">
    <link rel="stylesheet" href="/css/pinPage.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="/js/jquery-3.2.1.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

<body>
    <!-- Logout Header Editor -->
    <?php
    $pinAreaDisplay = "inline";
    $optionAreaDisplay = "none";
    if (!isset($_SESSION['shop_id'])) {
        header("Location: index.php");
    } else {
        if (isset($_SESSION['typed_pin']) && $_SESSION['typed_pin'] == $_SESSION['pin']) {
            $pinAreaDisplay = "none";
            $optionAreaDisplay = "inline-block";
    ?><script>
                $(window.parent.document).find("#logout_la").html("<label class='header'>KIRJAUDU ULOS</label>");
            </script><?php
                    } else {
                        ?><script>
                $(window.parent.document).find("#logout_la").html("");
            </script><?php
                    }
                }
                        ?>

    <!-- Form uploader -->
    <form enctype="multipart/form-data" action="upload.php" method="post">
        <label for="file">Valitse raportti velhoon:</label><br />
        <input name="file" type="file" id="file"><br /><br />Lataa velhoon<br />
        <script>
            var shop_id = '<?php echo $_SESSION['shop_id']; ?>';
        </script>
        <input type="submit" value="Upload csv" name="submit" />
    </form>
    <h2>SPR Työajanseuranta</h2>
    <!-- Message Bootstrap Modal -->
    <div class="container">
        <div class="modal fade" id="ntfModal" role="dialog">
            <div class="modal-dialog modal-sm">

                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Message</h4>
                    </div>
                    <div class="modal-body">
                        <p id="ntfMessage" align="center" style="font-size: 20px"></p>
                    </div>


                    <button type="button" id="ntfModalDismiss" class="btn btn-default" data-dismiss="modal" style="display:none;">OK</button>

                </div>
            </div>
        </div>

        <div class="modal fade" id="confirmLogoutModal" role="dialog">
            <div class="modal-dialog modal-sm">

                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Message</h4>
                    </div>
                    <div class="modal-body">
                        <p id="confirm_body" align="center" style="font-size: 16px">Haluatko kirjata kaikki työntekijät ulos?</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger btn-default pull-left" style="background-color: #FC4848" data-dismiss="modal">Peruuta</button>
                        <button type="button" id="logoutConfirm" class="btn btn-default" data-dismiss="modal">OK</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="confirmCleanupModal" role="dialog">
            <div class="modal-dialog modal-sm">

                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Message</h4>
                    </div>
                    <div class="modal-body">
                        <p id="confirm_body" align="center" style="font-size: 16px">Haluatko tyhjentää koko lokin?</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger btn-default pull-left" style="background-color: #FC4848" data-dismiss="modal">Peruuta</button>
                        <button type="button" id="cleanupConfirm" class="btn btn-default" data-dismiss="modal">OK</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <button type="button" id="ntfModalClick" data-toggle='modal' data-target='#ntfModal' style="display:none;">Modal</button>
    <button type="button" id="logoutModalClick" data-toggle='modal' data-target='#confirmLogoutModal' style="display:none;">Modal</button>
    <button type="button" id="cleanupModalClick" data-toggle='modal' data-target='#confirmCleanupModal' style="display:none;">Modal</button>

    <!-- Pin input -->
    <div id="pinArea" style="display:<?php echo $pinAreaDisplay; ?>">
        <p>Kirjaudu sisään:</p>
        <!--<p style="font-size: 12px; color:grey;">Access pin: <?php echo $_SESSION['pin']; ?></p>-->
        <div class="ui labeled input" align="center">

            <div class="ui label" align="center">
                PIN
            </div>
            <input id="pinInput" type="text" placeholder="PIN" style="font-size: 14px">
            <button id="pinSubmit" type="button" class="btn btn-danger" value="<?php echo $_SESSION['shop_id']; ?>">Access</button>
        </div>
    </div>

    <!-- Option Area -->
    <div id="optionArea" style="display:<?php echo $optionAreaDisplay; ?>">
        <p style="font-size: 16px; margin-top: 18px;">Valitse toiminto:</p>
        <table class="noBorder center noBackground">

            <tr>

                <td class="tdPadding"><button type="button" class="dropbtn functionButton" id="employeeLabel">Työntekijät</button></td>
                <td class="tdPadding"><button type="button" class="functionButton dropbtn" id="reportLabel">Raportointi Velhoon</button></td>
                <td class="tdPadding"><button type="button" class="functionButton dropbtn" id="reportLabel2">Raportointi</button></td>

            </tr>
            <tr>
                <td class="tdPadding"><button type="button" class="dropbtn functionButton" id="logoutEmployee">Kirjaa ulos <br>kaikki työntekijät</button></td>
                <td class="tdPadding"><button type="button" class="dropbtn functionButton" id="deleteLogs">Tyhjennä <br>kaikki tapahtumat</button></td>
                <td class="tdPadding"><button type="button" class="functionButton dropbtn" id="presentLabel">Paikalla <br>olevat</button></td>

            </tr>

        </table>
    </div>
    </div>

    <script id="loader" src="/header/jsPack.js" resources="firebasejs;firebaseInit;firebaseRef;dateStamp;pinPage"></script>
</body>

</html>