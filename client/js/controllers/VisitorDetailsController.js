
/**
 * Created by Meghana on 3/26/2016.
 */

// VisitorDetailsController.
VisitorApp.controller('VisitorDetailsController', function($scope, $http, Upload){

    $scope.date =[];
    // Get all user information and show them.
    $http.get('/VisitorRegistration')
        .then(function (data) {
            $scope.VisitorRegistration = data;
            console.log(data);
            $scope.details = data.data;
            var data = data.data;
            $scope.sortProperty = 'FirstName';
            $scope.sortDirection = false;
            angular.forEach(data, function (value, key) {
                var d = new Date(value.Date);
                $scope.date[key] = d.toLocaleString();
                value.Date= $scope.date[key];
                data.Date = value.Date;

            })
        })

        .catch(function (data) {
            console.log('Error: ' + data);

        });

    // View logic. This is triggered when the user clicks the View button.
    $scope.submitForm = function(uuid) {
        $scope.submitted = true;
        //When clicking the view button, get the particular visitor details and show them.
        $http.get('/VisitorRegistration/' + uuid)
            .then(function (data) {
                $scope.VisitorRegistration = data;
                console.log(data);
                $scope.detail = data.data;
                var data = data.data;
                $scope.imgloc = data.Image;
                var d = new Date(data.Date);
                $scope.date = d.toLocaleString();

                // We got the other details. Now get the image.
                $http.get('/VisitorImage/' + $scope.imgloc)
                    .then(function(data) {
                        $scope.img = (('data:image/jpg;base64,') || ('data:image/png;base64,')) + data.data;
                    });

            })

            .catch(function (data) {
                console.log('Error:' + data);
            });
    };

    $scope.onFileSelect = function(file) {
        if (angular.isArray(file)) {
            file = file[0];
        }

        if(file === undefined)
            return;

        if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
            alert('Only PNG and JPEG are accepted.');
            return
        }

        if(file.type == 'image/jpeg')
        {
            $scope.type ='.jpg';
        }

        else if(file.type == 'image/png')
        {
            $scope.type ='.png';
        }

        Upload.upload({
            url: '/' +
            '' +
            'uploadImage',
            headers: {'Content-Type': 'multipart/form-data'},
            method: 'POST',
            data: {file: file}
        }).then(function (resp) {
            if (resp.data !== undefined)
                $scope.detail.Image = resp.data + $scope.type;
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data );
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };

    // When editing and saving the Visitor information, send the text to the node API to update the details of the record matching uuid and visitor.
    $scope.EditandSaveVisitorRegistration = function (uuid, visitor) {
        $http.put('/VisitorRegistration/' + uuid, visitor)
            .then(function (data) {
                $scope.VisitorRegistration = data;
                console.log(data);
                var data = data.data;
                $scope.vName = data.FirstName;
                var d = new Date(data.Date);
                $scope.date = d.toLocaleString();
                window.location.reload(true);
            })
            .catch(function (data) {
                console.log('Error:' + data);
            });
    };

    // When deleting the information, send the uuid to the node API to delete the record matching the uuid.
    $scope.DeleteVisitorRegistration = function (uuid) {
        $http.delete('/VisitorRegistration/' + uuid)
            .then(function (data) {
                $scope.VisitorRegistration = data;
                console.log(data);
                window.location.reload(true);

            })
            .catch(function (data) {
                console.log('Error:' + data);
            });
    };

});
