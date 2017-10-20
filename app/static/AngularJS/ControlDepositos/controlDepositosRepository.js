var controlDepositosURL = global_settings.urlCORS + 'api/controlDepositos/';

registrationModule.factory('controlDepositosRepository', function($http) {
    return {
        prevSession: {
            isFirstTime: true,
            ddlBancoDisabled: null,
            ddlCuentaDisabled: null,
            txtFechasDisabled: null,
            btnBuscarDisabled: null,
            carteraControlsDisabled: null,
            selectedValueEmpresaID: null,
            selectedValueBancoID: null,
            selectedValueCuentaID: null,
            selectedValueFechaInicio: null,
            selectedValueFechaFin: null,
            btnSwitchIsEnable: null,
            selectedValueSucursaID: null,
            selectedValueDepartamentoID: null,
            showUserSearchPanel: null,
            searchType: null,
            searchTypeID: null,
            searchValue: null,
            searchClienteID: null
        },


        createReference: function(objData) {
            console.log( objData );
            return $http({
                url: controlDepositosURL + 'createReference/',
                method: "GET",
                params: objData,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        createTempReference: function(objData) {

            return $http({
                url: controlDepositosURL + 'createTempReference/',
                method: "GET",
                params: objData,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },

        insertReferenceDetails: function(objData) {
            return $http({
                url: controlDepositosURL + 'insertReferenceDetails/',
                method: "GET",
                params: objData,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },

        getDepositosPuntosVentasHeraldo: function(fechaInicio, fechaFin) {
            return $http({
                url: controlDepositosURL + 'depositosPuntosVentasHeraldo/',
                method: "GET",
                params: { fechaInicio: fechaInicio, fechaFin: fechaFin },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },

        getDetalleDepositoPuntosVentasHeraldo: function(referencia, fechaInicio, fechaFin) {
            return $http({
                url: controlDepositosURL + 'detalleDepositoPuntosVentasHeraldo/',
                method: "GET",
                params: { referencia: referencia, fechaInicio: fechaInicio, fechaFin: fechaFin },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },

        getReportePdf: function(jsondata) {
            return $http({
                url: 'http://192.168.20.89:5488/api/report',
                method: "POST",
                data: {
                    template: { name: jsondata.template.name },
                    data: jsondata.data
                },
                headers: {
                    'Content-Type': 'application/json'
                },
                responseType: 'arraybuffer'
            });
        },

        sendMail: function(filename, cuentaContable, nombreEmpresa, cuentaBancaria, nombreBanco, responsable) {
            return $http({
                url: conciliacionDetalleRegistroURL + 'sendMail/',
                method: "POST",
                data: {
                    nombreArchivo: filename,
                    cuentaContable: cuentaContable,
                    nombreEmpresa: nombreEmpresa,
                    cuentaBancaria: cuentaBancaria,
                    nombreBanco: nombreBanco,
                    responsable: responsable
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },

        insertAplicacionCobro: function(objData) {
            //console.log('insertado objeto:' + objData);
            return $http({
                url: controlDepositosURL + 'insertAplicacionCobro/',
                method: "GET",
                params: objData,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },

        insertarPuntoVenta: function(objData) {
            //console.log('insertado objeto:' + objData);
            return $http({
                url: controlDepositosURL + 'insertPuntoVenta/',
                method: "GET",
                params: objData,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },

        getPersonasParametrizadas: function(objData) {
            
            return $http({
                url: controlDepositosURL + 'personasParametrizadas',
                method: "GET",
                params: objData,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },

        generaReferenciaPuntoVenta: function(objData) {
            //console.log('insertado objeto:' + objData);
            return $http({
                url: controlDepositosURL + 'generaRefPuntoVenta/',
                method: "GET",
                params: objData,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },

        getPersonas: function() {
            return $http({
                url: controlDepositosURL + 'personas/',
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },

        updCarteraVencidaReferencia: function(idReferencia) {
            return $http({
                url: controlDepositosURL + 'updCarteraVencidaReferencia/',
                method: "GET",
                params: { idReferencia: idReferencia },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        updSetObservation: function(idDepositoBanco, observacion) {
            return $http({
                url: controlDepositosURL + 'setObservation/',
                method: "GET",
                params: { idDepositoBanco: idDepositoBanco, observacion: observacion },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },

        updSetReferencia: function(idDepositoBanco, idReferencia) {
            return $http({
                url: controlDepositosURL + 'setReferencia/',
                method: "GET",
                params: { idDepositoBanco: idDepositoBanco, idReferencia: idReferencia },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },

        delReferenciaGenerada: function(idReferencia) {
            return $http({
                url: controlDepositosURL + 'delReferenciaGenerada/',
                method: "GET",
                params: { idReferencia: idReferencia },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },

        testApi: function(objData) {

            console.log(objData);

            return $http({
                url: controlDepositosURL + 'testApi/',
                method: "GET",
                params: objData,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },

        getClientByName: function(clientName) {
            return $http({
                url: controlDepositosURL + 'clientByName/',
                method: "GET",
                params: {
                    clientName: clientName
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },

        gridDepositosReferenciaHOptions: function() {
            return {
                enableColumnResize: true,
                enableRowSelection: true,
                enableGridMenu: true,
                enableFiltering: true,
                enableGroupHeaderSelection: false,
                treeRowHeaderAlwaysVisible: true,
                showColumnFooter: true,
                showGridFooter: true,
                height: 900,
                cellEditableCondition: function($scope) {
                    return $scope.row.entity.seleccionable;
                }
            };
        },

        gridDepositosReferenciaHColumns: function(isVisible) {
            return [
                { name: 'Id', displayName: 'Id', cellClass: 'gridCellRight', width: 75 },
                { name: 'RFC', displayName: 'RFC', cellClass: 'gridCellLeft', width: 120 },
                { name: 'Nombre', displayName: 'Nombre', cellClass: 'gridCellLeft', width: 300 },
                { name: 'Referencia', displayName: 'Referencia', cellClass: 'gridCellLeft', width: 180 },
                { name: 'NumeroDepositos', displayName: 'Numero Depositos', cellClass: 'gridCellLeft', width: 75 },
                { name: 'ImporteTotal', displayName: 'Importe Total', cellFilter: 'currency', cellClass: 'gridCellRight', width: 150 },
                {
                    name: 'verdetalle',
                    displayName: 'Ver detalle',
                    cellEditableCondition: false,
                    visible: true,
                    enableCellEdit : false,
                    cellClass: 'gridCellRight',
                    cellTemplate :'<button class="btn btn-info btn-xs" ng-click="grid.appScope.showDetallesDepositoPuntosVentasHeraldo(row.entity.Referencia)"><i class="ti-eye"></i></button>',
                    width: 150
                }
            ];
        },

        gridDetallesReferenciaHOptions: function() {
            return {
                enableColumnResize: true,
                enableRowSelection: true,
                enableGridMenu: true,
                enableFiltering: true,
                enableGroupHeaderSelection: false,
                treeRowHeaderAlwaysVisible: true,
                showColumnFooter: true,
                showGridFooter: true,
                height: 900,
                cellEditableCondition: function($scope) {
                    return $scope.row.entity.seleccionable;
                },               
                exporterPdfDefaultStyle: {fontSize: 9},
                exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
                exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
                exporterPdfHeader: { text: "Detalle de depositos", style: 'headerStyle' },
                exporterPdfFooter: function ( currentPage, pageCount ) {
                  return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
                },
                exporterPdfCustomFormatter: function ( docDefinition ) {
                  docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
                  docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
                  return docDefinition;
                },
                exporterPdfOrientation: 'portrait',
                exporterPdfPageSize: 'LETTER',
                exporterPdfMaxGridWidth: 500,
                gridMenuCustomItems: [{
                    title: 'Export all data as EXCEL',
                    order: 110
                },
                {
                    title: 'Export visible data as EXCEL',
                    order: 111
                }
            ]                
            };
        },

        gridDetallesReferenciaHColumns: function(isVisible) {
            return [      
                { name: 'IdBancomer', displayName: 'Id Bancomer', cellClass: 'gridCellRight', visible: false,},          
                { name: 'Importe', displayName: 'Importe', cellFilter: 'currency', cellClass: 'gridCellRight', width: 150 },
                { name: 'fechaOperacion', displayName: 'Fecha Registro', type: 'date', cellFilter: 'date:\'dd-MM-yyyy\'', cellClass: 'gridCellLeft', width: 150 },
                { name: 'OficinaOperadora', displayName: 'Oficina Operadora', cellClass: 'gridCellLeft', width: 200 },
                { name: 'NumeroCuenta', displayName: 'Numero de Cuenta', cellClass: 'gridCellLeft', width: 200 },
                { name: 'Rap_Folio', displayName: 'Rap Folio', cellClass: 'gridCellRight', visible: false,}
            ];
        },

        gridDocumentosOptions: function() {
            return {
                enableColumnResize: true,
                enableRowSelection: true,
                enableGridMenu: true,
                enableFiltering: true,
                enableGroupHeaderSelection: false,
                treeRowHeaderAlwaysVisible: true,
                showColumnFooter: true,
                showGridFooter: true,
                height: 900,
                cellEditableCondition: function($scope) {
                    return $scope.row.entity.seleccionable;
                }
            };
        },
        gridDocumentosColumns: function(isVisible) {
            return [
                { name: 'idBmer', displayName: 'Cons', cellClass: 'gridCellRight', width: 75 },
                { name: 'banco', displayName: 'Banco', cellClass: 'gridCellLeft', width: 100 },
                { name: 'referencia', displayName: 'Referencia', cellClass: 'gridCellLeft', width: 200 },
                { name: 'concepto', displayName: 'Concepto', cellClass: 'gridCellLeft', width: 250 },
                { name: 'refAmpliada', displayName: 'Referencia Ampliada', cellClass: 'gridCellLeft', width: 200 },
                { name: 'fechaOperacion', displayName: 'Fecha', type: 'date', cellFilter: 'date:\'dd-MM-yyyy\'', cellClass: 'gridCellRight', width: 100 },
                { name: 'cargo', displayName: 'Cargo', cellFilter: 'currency', visible: isVisible, cellClass: 'gridCellRight', width: 100 },
                { name: 'abono', displayName: 'Abono', cellFilter: 'currency', cellClass: 'gridCellRight', width: 100 }, {
                    name: 'observaciones',
                    displayName: 'Observaciones',
                    cellEditableCondition: true,
                    cellClass: 'gridCellRight',
                    width: '*'
                }
            ];
        },

        gridDocumentosColumnsAplicados: function(isVisible) {
            return [
                { name: 'idBmer', displayName: 'Cons', cellClass: 'gridCellRight', width: 75 },
                { name: 'banco', displayName: 'Banco', cellClass: 'gridCellLeft', width: 100 },
                { name: 'referencia', displayName: 'Referencia', cellClass: 'gridCellLeft', width: 200 },
                { name: 'concepto', displayName: 'Concepto', cellClass: 'gridCellLeft', width: 250 },
                { name: 'refAmpliada', displayName: 'Referencia Ampliada', cellClass: 'gridCellLeft', width: 200 },
                { name: 'fechaOperacion', displayName: 'Fecha', type: 'date', cellFilter: 'date:\'dd-MM-yyyy\'', cellClass: 'gridCellRight', width: 100 },
                { name: 'cargo', displayName: 'Cargo', cellFilter: 'currency', visible: false, cellClass: 'gridCellRight', width: 100 },
                { name: 'abono', displayName: 'Abono', cellFilter: 'currency', cellClass: 'gridCellRight', width: 100 }, {
                    name: 'observaciones',
                    displayName: 'Observaciones',
                    cellEditableCondition: true,
                    visible: false,
                    cellClass: 'gridCellRight',
                    width: '*'
                },
                {
                    name: 'verdetalle',
                    displayName: 'Ver detalle',
                    cellEditableCondition: true,
                    visible: true,
                    enableCellEdit : false,
                    cellClass: 'gridCellRight',
                    cellTemplate :'<button class="btn btn-info btn-xs" ng-click="grid.appScope.showReferenceDetails(row.entity.idReferencia)"><i class="ti-eye"></i></button>',
                    width: '*'
                }
            ];
        },

        gridCarteraOptions: function() {
            return {
                enableColumnResize: true,
                enableRowSelection: true,
                enableGridMenu: true,
                enableFiltering: true,
                enableGroupHeaderSelection: false,
                treeRowHeaderAlwaysVisible: true,
                showColumnFooter: true,
                showGridFooter: true,
                height: 900,
                cellEditableCondition: function($scope) {
                    return $scope.row.entity.seleccionable;
                }
            };
        },
        gridCarteraColumns: function() {
            return [
                { name: 'folio', displayName: 'Factura', cellClass: 'gridCellLeft', width: 150 },
                { name: 'nombreSucursal', displayName: 'Sucursal', cellClass: 'gridCellLeft', width: 200 },
                { name: 'nombreDepartamento', displayName: 'Departamento', cellClass: 'gridCellLeft', width: 200 },
                { name: 'nombreCliente', displayName: 'Cliente', cellClass: 'gridCellLeft', width: 200 },
                { name: 'fecha', displayName: 'fecha', type: 'date', cellFilter: 'date:\'dd-MM-yyyy\'', cellClass: 'gridCellRight', width: 100 },
                { name: 'importe', displayName: 'Importe', cellFilter: 'currency', cellClass: 'gridCellRight', width: 100 },
                { name: 'saldo', displayName: 'Saldo', cellFilter: 'currency', cellClass: 'gridCellRight', width: 100 }
            ];
        },

        getClientById: function(idBusqueda) {
            return $http({
                url: controlDepositosURL + 'clientById/',
                method: "GET",
                params: {
                    idBusqueda: idBusqueda
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });

        },

         getReporteReferencia: function(myJson) {
            return $http({
                url: 'http://189.204.141.193:5488/api/report',
                method: "POST",
                data: {
                    template: { name: myJson.template.name },
                    data: myJson.data
                },
                headers: {
                    'Content-Type': 'application/json'
                },
                responseType: 'arraybuffer'
            });
        }

    };

});

