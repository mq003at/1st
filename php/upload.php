<?php

$target_dir = "../../sftp-share/";

$target_file = $target_dir . basename($_FILES["file"]["name"]);

$uploadOk = 1;

$FileType = pathinfo($target_file,PATHINFO_EXTENSION);

// Check if image is real or fake

if(isset($_POST["submit"])) {

    $check = getimagesize($_FILES["file"]["tmp_name"]);

    if($check !== true) {

        echo "File is an csv - " . $check["mime"] . ".";

        $uploadOk = 1;

    } else {

        echo "This is not an csv file. Please upload another.";

        $uploadOk = 0;

    }

}

// Check if file already exists

//if (file_exists($target_file)) {

  //  echo "This file already exists – please upload another.";

  //  $uploadOk = 0;

//}

// Check file size

if ($_FILES["file"]["size"] > 1000000) {

    echo "Your file is too big. Please try again";

    $uploadOk = 0;

}

// Allow certain file formats

if($FileType != "csv") {

    echo "Only csv files are allowed. Please try again";

    $uploadOk = 0;

}

// Check if $uploadOk is set to 0 by an error

if ($uploadOk == 0) {

    echo "Your file was not uploaded.";

} else {

    if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {

        echo "The file ". basename( $_FILES["file"]["name"]). " has been uploaded.";

    } else {

        echo "There was an error uploading your file.";

    }

}
