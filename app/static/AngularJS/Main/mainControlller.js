registrationModule.controller('mainController', function($scope, $rootScope, $location, localStorageService, alertFactory) {

    $rootScope.userData = localStorageService.get('userData');
   
    $scope.nameTemplate = function() {
            if($rootScope.userData)
                $scope.tituloPagina = $location.$$url.replace(/[^a-zA-Z0-9]/g,' ') + ' Heraldo';
            else
                location.href = '/';
    }

    $scope.init = function(){
         $rootScope.datosUsuario = localStorageService.get('empleadoDatos');
         if ($rootScope.datosUsuario != null)
         {
            $rootScope.mostrarMenu = 1;

            if ($rootScope.userData.idPerfil == 4)
                $rootScope.controlDepositosAcceso = 0;
             else 
                if ($rootScope.userData.idPerfil == 5)
                    $rootScope.controlDepositosAcceso = 1;
                else
                    $rootScope.controlDepositosAcceso = 1;
         }
    }
      
    $scope.salir = function() {
        alertFactory.warning('Hasta luego ' + $rootScope.userData.nombreUsuario)
        localStorageService.clearAll('userData');
        localStorageService.clearAll('empleadoDatos');
        localStorageService.clearAll('lgnUser');
        localStorage.removeItem('paramBusqueda');
        location.href = '/';
    }
});
