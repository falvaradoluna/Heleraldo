var registrationModule = angular.module("registrationModule", ["ngRoute", "LocalStorageModule",'ngAnimate', 'ngTouch', 'ui.grid', 'ui.grid.selection', 'ui.grid.grouping', 'ui.grid.pinning', 'ui.grid.edit','ui.grid.moveColumns', 'ui.grid.exporter','angular.filter', /*'nvd3'*/,'googlechart'])

    .config(function($routeProvider, $locationProvider) {

        /*cheange the routes*/
        $routeProvider.when('/', {
            templateUrl: 'AngularJS/Templates/login.html', //example 1
            controller: 'loginController'
        });
       $routeProvider.when('/Control-Depositos', {
            templateUrl: 'AngularJS/Templates/controldepositos.html', //FAL 19012017
            controller: 'controlDepositosController'
        });

        $routeProvider.when('/Generar-Referencias', {
            templateUrl: 'AngularJS/Templates/generarReferencias.html', //FAL 19012017
            controller: 'generarReferenciasController'
        });

        $routeProvider.otherwise({ redirectTo: '/' });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    });

registrationModule.directive('resize', function($window) {
    return function(scope, element) {
        var w = angular.element($window);
        var changeHeight = function() { element.css('height', (w.height() - 20) + 'px'); };
        w.bind('resize', function() {
            changeHeight(); // when window size gets changed             
        });
        changeHeight(); // when page loads          
    };
});
registrationModule.run(function($rootScope) {
    $rootScope.var = "full";

})
