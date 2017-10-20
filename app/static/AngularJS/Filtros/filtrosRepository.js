var filtrosURL = global_settings.urlCORS + 'api/filtros/';

registrationModule.factory('filtrosRepository', function($http) {
    return {
        getEmpresas: function(idUsuario) {
            return $http({
                url: filtrosURL + 'empresas/',
                method: "GET",
                params: {
                    idUsuario: idUsuario
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },
        getSucursales: function(idUsuario, idEmpresa) {
            return $http({
                url: filtrosURL + 'sucursales/',
                method: "GET",
                params: {
                    idUsuario: idUsuario,
                    idEmpresa: idEmpresa
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },

        getCuentaBanco: function(idCuentaBanco, idempresa) {
            return $http({
                url: filtrosURL + 'cuentabanco/',
                method: "GET",
                params: {
                    idBanco: idCuentaBanco,
                    idEmpresa: idempresa
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },
        getClaveBanco: function(idClaveBanco) {
            return $http({
                url: filtrosURL + 'clavebanco/',
                method: "GET",
                params: {
                    idClavebanco: idClaveBanco
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },
        getCuentacontable: function(idCuentacontable) {
            return $http({
                url: filtrosURL + 'cuentacontable/',
                method: "GET",
                params: {
                    idCuentacontable: idCuentacontable
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },
        AddAuxiliar: function(idEmpresa, fechaIni, fechaFin) {
            return $http({
                url: filtrosURL + 'addAuxiliarContable/',
                method: "GET",
                params: {
                    idEmpresa: idEmpresa,
                    fechaIni: fechaIni,
                    fechaFin: fechaFin
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },
        AddDepositos: function(idBanco, fechaInicial, fechaFinal) {
            return $http({
                url: filtrosURL + 'addDepositos/',
                method: "GET",
                params: {
                    idBanco: idBanco,
                    fechaInicial: fechaInicial,
                    fechaFinal: fechaFinal
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },
        getAuxiliar: function(idEmpresa, numero_cuenta, idestatus, fElaboracion, fCorte) {
            return $http({
                url: filtrosURL + 'auxiliarContable/',
                method: "GET",
                params: {
                    idEmpresa: idEmpresa,
                    numero_cuenta: numero_cuenta,
                    idEstatus: idestatus,
                    fElaboracion: fElaboracion,
                    fCorte: fCorte
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },
        getDepositos: function(idBanco, idestatus, cuentaBancaria, fElaboracion, fCorte) {
            return $http({
                url: filtrosURL + 'depositos/',
                method: "GET",
                params: {
                    idBanco: idBanco,
                    idEstatus: idestatus,
                    cuentaBancaria: cuentaBancaria,
                    fElaboracion: fElaboracion,
                    fCorte: fCorte
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },

        getCartera: function(cliente, empresa, sucursal, departamento, fechaIni, fechaFin) {
            return $http({
                url: filtrosURL + 'cartera/',
                method: "GET",
                params: {
                    cliente: cliente,
                    empresa: empresa,
                    sucursal: sucursal,
                    departamento: departamento,
                    fechaIni: fechaIni,
                    fechaFin: fechaFin
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },

        //LQMA 27022017 add obtiene cuenta
        getCuenta: function(idBanco, idEmpresa) {
            return $http({
                url: filtrosURL + 'cuenta/',
                method: "GET",
                params: {
                    idBanco: idBanco,
                    idEmpresa: idEmpresa
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        }

    }
});
