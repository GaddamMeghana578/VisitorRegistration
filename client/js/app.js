/**
 * Created by Meghana on 3/5/2016.
 */

// Define an angular module for our VisitorApp.
var VisitorApp= angular.module('VisitorApp', ['ngRoute', 'ngFileUpload']);

// Define Routing for VisitorApp.
VisitorApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/Coverpage', {
            templateUrl: 'views/Coverpage.html',
            controller: 'VisitorController'
        }).
        when('/Login', {
            templateUrl: 'views/Admin.html',
            controller: 'AdminController'
        }).
        when('/Submit', {
            templateUrl: 'views/VisitorDetails.html',
            controller: 'VisitorDetailsController'
        }).
        otherwise({
            redirectTo: '/Coverpage'
        });
    }]);
