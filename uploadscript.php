<?php
 
error_reporting(0);
if (isset($_POST) and $_SERVER['REQUEST_METHOD'] == "POST") {
    $valid_mymeTypes = array("image/jpg", "image/png", "image/gif", "image/bmp", "image/jpeg", "GIF", "JPG", "PNG", "doc", "txt", "docx", "pdf", "xls", "xlsx"); //add the formats you want to upload
 
    $myObj->name = uniqid();
    $myObj->path = 'uploads/';
    $myObj->size = $_FILES['myfile']['size'];
    $myObj->type = $_FILES['myfile']['type'];
    $myObj->ext = explode('/', $myObj->type)[1];
    $myObj->msg = '';
    
     
    $name = uniqid();    
    $size = $_FILES['myfile']['size']; //get the size of the file
 
    if (strlen($myObj->name)) {
        if (in_array($myObj->type, $valid_mymeTypes)) {
            if ($myObj->size < 2098888) { 
                $tmp = $_FILES['myfile']['tmp_name'];
                if (move_uploaded_file($tmp, $myObj->path . $myObj->name.'.'.$myObj->ext )) { //check if it the file move successfully.
                    $myObj->msg = '¡Imagen guardada!';
                    $myJSON = json_encode($myObj);
                    echo $myJSON;
                } else {
                    echo "failed";
                }
            } else {
                echo "File size max 2 MB";
            }
        } else {
            echo "Invalid file format..";
        }
    } else {
        echo "Please select a file..!";
    }
    exit;
}

/*<?php
// requires php5
define('UPLOAD_DIR', 'uploads/');
$img = $_POST['imgBase64'];
$img = str_replace('data:image/jpeg;base64,', '', $img);
$img = str_replace(' ', '+', $img);
$data = base64_decode($img);
$file = UPLOAD_DIR . uniqid() . '.jpg';
$success = file_put_contents($file, $data);
print $success ? $file : 'Unable to save the file.';