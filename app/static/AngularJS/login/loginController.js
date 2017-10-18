registrationModule.controller('loginController', function($scope, $rootScope, $location, loginRepository, alertFactory, localStorageService) {


    $scope.init = function() {
        $rootScope.mostrarMenu = 0;
        localStorageService.clearAll('userData');
        localStorageService.clearAll('empleadoDatos');
        localStorageService.clearAll('lgnUser');
        localStorage.removeItem('paramBusqueda');
    }

  
    $scope.permisos = function(usuario,contrasena) {
        if (usuario !== null)
        {
            loginRepository.getPermisos(usuario,contrasena).then(function(result) {
            console.log(result)
            if (result.data.length > 0) {
                $scope.login = result.data[0];
                $scope.getEmpleado($scope.login.idUsuario);
                if ($scope.login.idPerfil == 4) {
                    $rootScope.controlDepositosAcceso = 1;
                    $rootScope.conciliacionAccesso = 0;
                    alertFactory.warning('Bienvenido: ' + result.data[0].nombreUsuario);
                    location.href = '/conciliacionInicio';
                    $rootScope.mostrarMenu = 1;
                    localStorageService.set('userData', $scope.login);
                } else {
                    if ($scope.login.idPerfil == 5) {
                        $rootScope.controlDepositosAcceso = 1;
                        $rootScope.conciliacionAccesso = 1;
                        $rootScope.mostrarMenu = 1;
                        alertFactory.warning('Bienvenido a Control de Depositos: ' + result.data[0].nombreUsuario);
                        location.href = '/Control-Depositos';
                        localStorageService.set('userData', $scope.login);
                    } else {
                        $rootScope.controlDepositosAcceso = 0;
                        $rootScope.conciliacionAccesso = 1;
                        $rootScope.mostrarMenu = 1;
                        alertFactory.warning('Bienvenido a Control de Depositos: ' + result.data[0].nombreUsuario);
                        location.href = '/Control-Depositos';
                        localStorageService.set('userData', $scope.login);
                    }
                }

            } else {
                alertFactory.info('Valide el usuario y/o contraseña');
            }

        });
        }
    }

    $scope.getEmpleado = function(usuario) {
        loginRepository.getEmpleado(usuario).then(function(empleado) {
            if (empleado.data.length > 0) {
                $scope.empleadoDatos = empleado.data;
                localStorageService.set('empleadoDatos', $scope.empleadoDatos);
            } else {
                console.log('Consilte al area de sistemas.');
            }
        })
    }
});
