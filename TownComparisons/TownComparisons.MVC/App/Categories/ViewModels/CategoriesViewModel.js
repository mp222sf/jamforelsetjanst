﻿categoryModule.controller("categoriesViewModel", function ($scope, categoryService, $http, $q, $routeParams, $route, $window, $location, viewModelHelper, categoriesFactory) {

    $scope.viewModelHelper = viewModelHelper;
    $scope.categoryService = categoryService;
    $scope.sortByName = 'Name';
    $scope.sortAsc = 'sortAsc';
    $scope.sortDesc = 'sortDesc';
    $scope.classActive = 'active';
    $scope.classInvisible = 'invisible';

    var initialize = function () {
        $scope.sortCategoryByName();
        if ($route.current.$$route.originalPath == "/categories/alphabet") {
            $scope.viewCategoriesBasedOnAlphabet();
        }
        else {
            $scope.viewAllCategories();
        }
    }

    // Sorts the categories by Name (Desc).
    $scope.sortCategoryByName = function () {
        $scope.visibleName = '';
        $scope.fileName = $scope.sortAsc;
        $scope.activeName = $scope.classActive;

        if ($scope.sortBy == $scope.sortByName) {
            $scope.sortBy = '-' + $scope.sortByName;
            $scope.fileName = $scope.sortDesc;
        }
        else {
            $scope.sortBy = $scope.sortByName;
            $scope.fileName = $scope.sortAsc;
        }
    }

    //Get all categories based on category via APICategoriesController
    $scope.viewAllCategories = function () {
        viewModelHelper.apiGet('api/categories', null,
            function (result) {
                $scope.groupCategories = result.data;
            });
    }

    //Get all categories based on alphabet via APICategoriesController
    $scope.viewCategoriesBasedOnAlphabet = function () {
        viewModelHelper.apiGet('api/categories/alphabet', null,
            function (result) {
                $scope.alphabetCategories = result.data;
            });
    }

    //Show all organisational units inside a category
    $scope.showCategory = function (category) {
        categoriesFactory.showCategory(category);
    }

     //Switch between sortings
    $scope.changeView = function (value) {
        categoriesFactory.changeView(value);
    }

    initialize();
});
