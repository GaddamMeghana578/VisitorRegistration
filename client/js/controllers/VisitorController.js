/**
 * Created by Meghana on 3/15/2016.
 */

// VisitorController
VisitorApp.controller('VisitorController',['$scope', '$http', 'Upload', function ($scope, $http, Upload) {

    $scope.user = {};
    $scope.submitted = false;

    // Submit logic. This is triggered when the visitor clicks the Submit button.
    $scope.submitForm = function() {
        $scope.submitted = true;
    }
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
                $scope.user.Image = resp.data + $scope.type;
             console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data );
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };


    // When submitting the Visitor information, send the text to the node API.
    $scope.createVisitorRegistration = function (visitor) {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        //   return uuid;
        console.log(uuid);
        $scope.user.UUID = uuid;

        $http.post('/VisitorRegistration', visitor)
            .success(function (data) {
                $scope.user = {};
                $scope.VisitorRegistration = data;
                console.log(data);
                $scope.VName = data.FirstName;
                $scope.LName = data.LastName;
                $scope.person = data.Person;
                $scope.visit = data.Visit;
                $scope.imgloc = data.Image;

                // If the image is undefined it triggers the alert message and on clicking OK it reloads the page.
                if(data.Image == undefined){
                    alert("The Image has not been uploaded. Kindly upload the image")
                    location.reload();
                }
                var d = new Date(data.Date);
                $scope.date = d.toLocaleString();

                // We got the other details. Now get the image.
                $http.get('/VisitorImage/' + $scope.imgloc)
                    .success(function (data) {
                        $scope.img = (('data:image/jpg;base64,') || ('data:image/png;base64,')) + data;
                    });
            })
            .error(function (data) {
                console.log('Error:' + data);
            });


    };

    // Refreshes the Coverpage on clicking the close button in the modal.
    $scope.refresh = function(){
        window.location.reload(true);
    }

    // Prints the modal window contents only
    document.getElementById("Print").onclick = function () {
        printElement(document.getElementById("printThis"));
    };
    function printElement(elem) {
        var domClone = elem.cloneNode(true);

        var $printSection = document.getElementById("printSection");

        if (!$printSection) {
            var $printSection = document.createElement("div");
            $printSection.id = "printSection";
            document.body.appendChild($printSection);
        }
        $printSection.innerHTML = "";
        $printSection.appendChild(domClone);
        window.print();
    }

}]);