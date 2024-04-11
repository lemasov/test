<?php
$json_content = file_get_contents('tec.json');
$data = json_decode($json_content, true);
if ($data !== null) {
    $wrapped_data = array($data);
    header('Content-Type: application/json');
    echo json_encode($wrapped_data);
} else {
    header('Content-Type: application/json');
    echo json_encode(array('error' => 'Ошибка чтения файла JSON'));
}
?>
