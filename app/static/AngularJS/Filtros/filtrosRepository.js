var filtrosURL = global_settings.urlCORS + 'api/filtros/';

registrationModule.factory('filtrosRepository', function($http) {
    return {
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
    }
});
