<?php
$updateData = file_get_contents("php://input");
$updateData = json_decode($updateData, true);

if ($updateData !== null) {
    $json_content = file_get_contents('tec.json');
    $currentData = json_decode($json_content, true);

    if ($currentData !== null) {
        foreach ($updateData as $updatedParam) {
            $paramName = $updatedParam['name'];
            foreach ($currentData['params'] as &$param) {
                if ($param['name'] === $paramName) {
                    $param['min'] = $updatedParam['min'];
                    $param['max'] = $updatedParam['max'];
                    $param['now'] = $updatedParam['now'];
                    break;
                }
            }
        }

        $file = fopen('tec.json', 'w');

        if ($file) {
            fwrite($file, json_encode($currentData));
            fclose($file);
            echo json_encode(array('success' => 'Данные успешно обновлены'));
        } else {
            echo json_encode(array('error' => 'Ошибка записи в файл JSON'));
        }
    } else {
        echo json_encode(array('error' => 'Ошибка чтения файла JSON'));
    }
} else {
    echo json_encode(array('error' => 'Ошибка декодирования данных'));
}
?>
