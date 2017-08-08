/**
 * Created by Meghana on 3/20/2016.
 */

// Admin Controller.
VisitorApp.controller('AdminController', function($scope){

    // Submit logic. This is triggered when the user clicks the Login button.
    $scope.submitForm = function(username,password) {
        $scope.submitted = true;

        // When landing on the page, checks if the username and password matches the below.
        if(username === 'admin' && password === '12345'){
            var path = "/#!/Submit"
            window.location.href = path;
        }

        else{
            alert("Username or Password is incorrect")
        }
    };

});
