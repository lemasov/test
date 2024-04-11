$(function() {
    console.log( "SERVER ready!" );

    $(document).ready(function(){
        function sendDataToServer(updatedParams) {
            var updatedData = {
                params: updatedParams
            };

            $.ajax({
                url: 'updateData.php',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(updatedData),
                success: function(response) {
                    console.log('Data successfully updated:', response);
                },
                error: function(xhr, status, error) {
                    console.error('Error updating data:', error);
                }
            });
        }


        $.getJSON('API.php', function(data) {
            var paramsList = $('#paramsList');

            if (data[0].params != null) {
                data[0].params.forEach(function(param, index){
                    var listItem = $('<li class="list-group-item"></li>');
                    var title = $('<h6>' + param.name + '</h6>');
                    var inputGroup = $('<div class="input-group mb-3"></div>');
                    var inputMin = $('<span class="input-group-text">MIN: </span><input type="text" id="param.min' + index + '" class="form-control" value="' + param.min + '" aria-label="Турбина" aria-describedby="input-min' + index + '">');
                    var inputMax = $('<span class="input-group-text">MAX: </span><input type="text" id="param.max' + index + '" class="form-control" value="' + param.max + '" aria-label="Турбина" aria-describedby="input-max' + index + '">');
                    var inputNow = $('<span class="input-group-text">NOW: </span><input type="text" id="param.now' + index + '" class="form-control" value="' + param.now + '" aria-label="Турбина" aria-describedby="input-now' + index + '">');
                    var saveButton = $('<button type="button" class="btn btn-success">save data</button>');

                    inputMin.change(function() {
                        param.min = parseFloat($(this).val());
                    });

                    inputMax.change(function() {
                        param.max = parseFloat($(this).val());
                    });

                    inputNow.change(function() {
                        param.now = parseFloat($(this).val());
                    });

                    saveButton.click(function() {
                        var updatedParam = {
                            name: param.name,
                            min: param.min,
                            max: param.max,
                            now: param.now
                        };

                        sendDataToServer(updatedParam);
                    });

                    inputGroup.append(inputMin, inputMax, inputNow, saveButton);
                    listItem.append(title, inputGroup);
                    paramsList.append(listItem);
                });
            } else {
                console.error("Error fetching data.params ");
            }
        });

    });
    
});