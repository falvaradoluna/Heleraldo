registrationModule.controller('controlDepositosController', ['$scope', '$rootScope', '$location', 'localStorageService', 'filtrosRepository', 'alertFactory', '$http',
    '$log', '$timeout', 'uiGridConstants', 'controlDepositosRepository', 'exportUiGridService',
    function($scope, $rootScope, $location, localStorageService, filtrosRepository, alertFactory, $http,
        $log, $timeout, uiGridConstants, controlDepositosRepository, exportUiGridService, $sce) {
        // var text = "\n{mensaje:'hola mundo', code:234}";
        // var inicio = text.indexOf('{');
        // var fin = text.indexOf('}');
        // var text2 = text.substr( inicio, fin );
        // var text3 = eval("(" + text2 + ')');
        // console.log( text3 );
        // console.log( 'mensale', text3.mensaje );
      $scope.init = function(){
        $rootScope.userData = localStorageService.get('userData');
        $scope.idUsuario = $rootScope.userData.idUsuario;
    }
        $rootScope.mostrarMenu = 1;
        //Listas Onjetos BD
        $scope.lstEmpresaUsuario = [];
        $scope.lstBanco = [];
        $scope.lstCuenta = [];
        $scope.lstSucursal = [];
        $scope.lstDepartamento = [];
        $scope.lstCliente = [];
        //Depositos controles Habilitados
        $scope.ddlBancoDisabled = true;
        $scope.ddlCuentaDisabled = true;
        $scope.txtFechasDisabled = true;
        $scope.btnBuscarDisabled = true;

        //Depositos Filtros ID 
        $scope.selectedValueEmpresaID = 0;
        $scope.selectedValueBancoID = 0;
        $scope.selectedValueCuentaID = 0;
        $scope.selectedValueFechaInicio = '';
        $scope.selectedValueFechaFin = '';
        $scope.btnSwitchIsEnable = false;
        //Cartera Filtros ID    
        $scope.selectedValueSucursaID = 0;
        $scope.selectedValueDepartamentoID = null;
        $scope.selectedValueCarteraFechaInicio = null;
        $scope.showUserSearchPanel = false;
        //init grids
        $scope.gridDocumentos = controlDepositosRepository.gridDocumentosOptions();
        $scope.gridDocumentos.columnDefs = controlDepositosRepository.gridDocumentosColumns($scope.btnSwitchIsEnable);
        $scope.gridDocumentos.multiSelect = false;
        $scope.gridCartera = controlDepositosRepository.gridCarteraOptions();
        $scope.gridCartera.columnDefs = controlDepositosRepository.gridCarteraColumns();
        $scope.gridCartera.multiSelect = true;

        $scope.gridDepositoPuntosVentas = controlDepositosRepository.gridDepositosReferenciaHOptions();
        $scope.gridDepositoPuntosVentas.columnDefs = controlDepositosRepository.gridDepositosReferenciaHColumns($scope.btnSwitchIsEnable);
        $scope.gridDepositoPuntosVentas.multiSelect = false;

        $scope.gridDetallesDepositoPuntosVentas = controlDepositosRepository.gridDetallesReferenciaHOptions();
        $scope.gridDetallesDepositoPuntosVentas.columnDefs = controlDepositosRepository.gridDetallesReferenciaHColumns($scope.btnSwitchIsEnable);
        $scope.gridDetallesDepositoPuntosVentas.multiSelect = true;

        //busquedaCliente
        $scope.searchType = "ID cliente";
        $scope.searchTypeID = 1;
        $scope.searchValue = '';
        $scope.searchClienteID = 0;
        //sumas
        $scope.depositoTotal = 0;
        $scope.carteraTotal = 0;
        //

        $scope.selectedRowDocuments = {};
        $scope.selectedRowDPI = [];

        // $scope.selectedRowsDetallesReferencia = [];

        $scope.tipoDeposito = 1;
        $scope.tipoDepositoAux = 1;

        //depositos heraldo
        $scope.valorFechaInicioDH = '';
        $scope.valorFechaFinDH = '';

        $scope.initCalendarstyle = function() {
            $('#calendar .input-group.date').datepicker({
                todayBtn: "linked",
                keyboardNavigation: true,
                forceParse: false,
                calendarWeeks: true,
                autoclose: true,
                todayHighlight: true,
                format: "dd/mm/yyyy"
            });
        };

        $scope.gridDocumentos.onRegisterApi = function(gridApi) {

            gridApi.selection.on.rowSelectionChanged($scope, function(row) {

                if (row.isSelected === true) {
                    //console.log(row.entity.abono);
                    $scope.depositoTotal = row.entity.abono;
                    $scope.selectedRowDocuments = null;
                    $scope.selectedRowDocuments = row.entity;

                    // Arreglo de DPI seleccionado
                    $scope.selectedRowDPI.push(row.entity);
                } else if (row.isSelected === false) {
                    $scope.selectedRowDocuments = null;

                    // Arreglo de DPI seleccionado
                    // $scope.selectedRowDPI.push(row.entity);
                    console.log(row.entity);
                    console.log(row.entity.idBmer);
                    $scope.removeByAttr($scope.selectedRowDPI, 'idBmer', row.entity.idBmer);
                }
            });

            gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
                $scope.updateObservation(rowEntity.idDepositoBanco, rowEntity.observaciones);
                $scope.$apply();
            });


        };


        $scope.gridCartera.onRegisterApi = function(gridApi) {

            gridApi.selection.on.rowSelectionChanged($scope, function(row) {
                var msg = 'row selected ' + row.isSelected;
                if (row.isSelected === true) {
                    $scope.carteraTotal = $scope.carteraTotal + parseFloat(row.entity.importe);
                    $scope.selectedRowCartera.push(row.entity);

                    /*
                    if ($scope.carteraTotal > $scope.depositoTotal) {
                        swal("Aviso", "El saldo de la cartera es mayor que el saldo del deposito.", "warning");
                    }*/

                } else if (row.isSelected === false) {
                    $scope.carteraTotal = $scope.carteraTotal - parseFloat(row.entity.importe);
                    $scope.removeByAttr($scope.selectedRowCartera, 'IDB', row.entity.IDB);
                }

            });
        };

        $scope.removeByAttr = function(arr, attr, value) {
            var i = arr.length;
            while (i--) {
                if (arr[i] && arr[i].hasOwnProperty(attr) && (arguments.length > 2 && arr[i][attr] === value)) {
                    arr.splice(i, 1);
                }
            }
            return arr;
        };


        $scope.asignarAnticipoRadio = function(i) {
            console.log('Son el cambio');
            // $scope.selectedRowCartera.forEach( function( item, key ){            
            //     $scope.selectedRowCartera[key].checked = false;
            //     $scope.selectedRowCartera[key].importeFinal = $scope.selectedRowCartera[key].importe;
            // });

            // $scope.selectedRowCartera[ i ].checked = true;
            // $scope.selectedRowCartera[ i ].importeFinal = $scope.selectedRowCartera[key].importe + $scope.anticipo;
        }



        $scope.reloadGrids = function() {
            $scope.depositoTotal = 0;
            $scope.carteraTotal = 0;
            $scope.getDepositosBancosNoReferenciados();
            $scope.loadPendingDocs();
        };


        $scope.setReferenceParams = function(objCartera, idreferencia, depositoID) {

            var params = {};

            params.idEmpresa = objCartera.idEmpresa;
            params.idReferencia = idreferencia;
            params.idSucursal = objCartera.idSucursal;
            params.idDepartamento = objCartera.idDepartamento;
            params.idTipoDocumento = 1;
            params.serie = objCartera.serie;
            params.folio = objCartera.idDocumento;
            params.idCliente = objCartera.idCliente;
            params.idAlma = 0;
            params.importeDocumento = objCartera.importe;
            params.idTipoReferencia = 3;
            params.depositoID = depositoID;

            return params;

        };

        $scope.insertReferenceDetails = function(objData) {

            controlDepositosRepository.insertReferenceDetails(objData).then(function(result) {

                if (result.data.length > 0) {
                    console.log('ok');
                } else {
                    console.log('no trajo nada insertReferenceDetails');
                }
            }, function(error) {
                console.log('Error');
            });
        };

        $scope.loadDepositosPuntosVentasHeraldo = function(fechaInicio, fechaFin) {

            if (fechaInicio == '' || fechaFin == '') {
                alertFactory.error('Ingrese un rango de fechas');
                return false;
            }

            $('#tblCtrlDepositos').DataTable().destroy();

            $scope.tblDepositosPuntosVentas = [];
            $scope.gridDepositoPuntosVentas.data = [];
            $('#mdlLoading').modal('show');
            controlDepositosRepository.getDepositosPuntosVentasHeraldo(fechaInicio, fechaFin).then(function(result) {
                if (result.data.length > 0) {

                    var arrayDepositos = [];

                    $scope.tblDepositosPuntosVentas = result.data;

                    setTimeout(function() {
                        $scope.setTablePaging('tblCtrlDepositos');
                    }, 1000);
                    //$scope.gridDepositoPuntosVentas.data = result.data;

                    angular.forEach($scope.tblDepositosPuntosVentas.sort(function(a, b) {
                        return parseFloat(b.ImporteTotal) - parseFloat(a.ImporteTotal);
                    }), function(value, key) {

                      

                        var deposito = {
                            c: [
                                { v: value.Nombre },
                                { v: value.ImporteTotal, f: '$' + value.ImporteTotal.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") },
                                { v: value.Referencia },
                                { v: value.Id }
                            ]
                        }

                        arrayDepositos.push(deposito);
                    });

                    $scope.myChartObject = {};

                    $scope.myChartObject.type = "PieChart";

                    $scope.myChartObject.data = {
                        "cols": [
                            { id: "t", label: "Topping", type: "string" },
                            { id: "s", label: "Slices", type: "number" }
                        ],
                        "rows": arrayDepositos
                    };

                    $scope.myChartObject.options = {
                        'title': 'Grafica de porcentaje de depositos por punto de venta'
                    };


                    $('#mdlLoading').modal('hide');
                } else {
                    swal("No se encontraron resultados");
                    console.log('no trajo nada loadPendingDocs');
                    $('#mdlLoading').modal('hide');
                }
            }, function(error) {
                console.log('Error');
            });

        };

        $scope.selectHandler = function(chart, selectedItem) {

            if (selectedItem != undefined) {
                var filaSeleccionada = chart.data.rows[selectedItem.row];
                var referenciaSeleccionada = filaSeleccionada.c[2].v;
                var idPersonaSeleccionada = filaSeleccionada.c[3].v;
                var nombrePuntoVenta = filaSeleccionada.c[0].v;
                $scope.showDetallesDepositoPuntosVentasHeraldo(referenciaSeleccionada, idPersonaSeleccionada, nombrePuntoVenta);
            }

        };

        $scope.showDetallesDepositoPuntosVentasHeraldo = function(obj, idPersona, nombrePuntoVenta) {
            // console.log( 'test 1', obj.idReferencia );
            var referencia="";
            referencia = obj.referencia;
            if (obj.referencia === undefined) {
                referencia = obj;
            }

            $scope.tblDetallesDepositoPuntosVentas = [];
            $scope.gridDetallesDepositoPuntosVentas.data = [];
            $scope.selectedRowsDetallesReferencia = [];
            console.log(referencia);
            $scope.referenciaLabel = nombrePuntoVenta;
            $scope.selectedValueIdPersona = idPersona;
            $scope.loadDetallesDepositoPuntosVentas(referencia, $scope.valorFechaInicioDH, $scope.valorFechaFinDH);
            $('#mdlDetallesDepositoPuntosVentas').modal('show');
        };

        $scope.gridDetallesDepositoPuntosVentas.onRegisterApi = function(gridApi) {
            globalGridApiDPV = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function(row) {
                var msg = 'row selected ' + row.isSelected;
                if (row.isSelected === true) {

                    $scope.selectedRowsDetallesReferencia.push(row.entity);

                } else if (row.isSelected === false) {

                    $scope.removeByAttr($scope.selectedRowsDetallesReferencia, '$$hashKey', row.entity.$$hashKey);
                }

            });

            //selecciona automaticamente las filas donde ya se haya aplicado el cobro
            gridApi.grid.registerDataChangeCallback(function(data) {
                _.each($scope.gridDetallesDepositoPuntosVentas.data, function(item, index) {

                    if ($scope.gridDetallesDepositoPuntosVentas.data[index].Rap_Folio != null) {
                        gridApi.selection.selectRow($scope.gridDetallesDepositoPuntosVentas.data[index]);
                    }

                });
            }, [uiGridConstants.dataChange.ROW]);

            gridApi.grid.options.gridMenuCustomItems[0].action = (function($event, $scope) {

                exportUiGridService.exportToExcel('sheet 1', globalGridApiDPV, 'all', 'all');
            });

            gridApi.grid.options.gridMenuCustomItems[1].action = (function($event, $scope) {

                exportUiGridService.exportToExcel('sheet 1', globalGridApiDPV, 'visible', 'visible');
            });
        };

        /*
            deshabilita la seleccion de fila al cargar los datos de la grilla, segun la condicion
            $scope.gridDetallesDepositoPuntosVentas.isRowSelectable = function(row) {

                if(row.entity.Rap_Folio == null){
                    return row.entity.IsApplicable = true;
                }
                else{
                    return row.entity.IsApplicable = false;//deshabilita
                }       
              
            };*/

        $scope.aplicarCobro = function() {
            $scope.init();
            swal({
                    title: "¿Esta seguro?",
                    text: "Se aplicarán los anticipos a los elementos seleccionados",
                    type: "info",
                    showCancelButton: true,
                    closeOnConfirm: false
                },
                function() {

                    angular.forEach($scope.selectedRowsDetallesReferencia, function(value, key) {

                        if (value.Rap_Folio == null) { // no tiene aplicacion de cobro
                            var registroAInsertar = {
                                rap_idempresa: 0, //
                                //rap_idsucursal: 1, //
                               // rap_iddepartamento: 1, //
                                rap_idpersona: $scope.selectedValueIdPersona,
                                //rap_cobrador: 'MMK', //
                                //rap_moneda: 'PE',
                                rap_tipocambio: 1.00000, //
                                rap_referencia: $scope.selectedValueIdPersona,
                                rap_iddocto: '0', //
                                rap_cotped: 'COBRO REPARTO', //                
                                rap_consecutivo: 0, //
                                rap_importe: value.Importe,
                                rap_formapago: value.CODIGO_PAGO, //
                                rap_numctabanc: '000000000110307246',
                                rap_fecha: value.fechaOperacion,
                                rap_idusuario: $rootScope.userData.idUsuario,
                                rap_idstatus: 1, //
                                rap_banco: '01', //
                                rap_referenciabancaria: value.NUMREFERENCIA, //
                                rap_anno: value.ANNIO,
                                rapNumDeposito: value.IdBancomer

                            }

                            controlDepositosRepository.insertAplicacionCobro(registroAInsertar).then(function(result){
                                console.log(result); 
                            });
                        }

                    });

                    swal("Aplicacion de anticipos Realizado");

                });


        }

        $scope.loadDetallesDepositoPuntosVentas = function(referencia, fechaInicio, fechaFin) {

            controlDepositosRepository.getDetalleDepositoPuntosVentasHeraldo(referencia, fechaInicio, fechaFin).then(function(result) {

                if (result.data.length > 0) {

                    //$scope.tblDetallesDepositoPuntosVentas = result.data;
                    $scope.gridDetallesDepositoPuntosVentas.data = result.data;
                      console.log(result.data);

                } else {

                    console.log('loadDetallesDepositoPuntosVentas no result');
                }
            }, function(error) {

                console.log('Error');
            });

        };

        $scope.updateObservation = function(idDepositoBanco, observacion) {

            $scope.promise = controlDepositosRepository.updSetObservation(idDepositoBanco, observacion).then(function(result) {

                if (result.data.length > 0) {
                    console.log('OK');
                } else {
                    console.log('no trajo nada updateObservation');
                }
            }, function(error) {
                console.log('Error');
            });


        };

        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
        }


        $scope.setPrevSession = function() {
            controlDepositosRepository.prevSession.isFirstTime = false;
            controlDepositosRepository.prevSession.ddlBancoDisabled = $scope.ddlBancoDisabled;
            controlDepositosRepository.prevSession.ddlCuentaDisabled = $scope.ddlCuentaDisabled;
            controlDepositosRepository.prevSession.txtFechasDisabled = $scope.txtFechasDisabled;
            controlDepositosRepository.prevSession.btnBuscarDisabled = $scope.btnBuscarDisabled;
            controlDepositosRepository.prevSession.carteraControlsDisabled = $scope.carteraControlsDisabled;
            controlDepositosRepository.prevSession.selectedValueEmpresaID = $scope.selectedValueEmpresaID;
            controlDepositosRepository.prevSession.selectedValueBancoID = $scope.selectedValueBancoID;
            controlDepositosRepository.prevSession.selectedValueCuentaID = $scope.selectedValueCuentaID;
            controlDepositosRepository.prevSession.selectedValueFechaInicio = $scope.selectedValueFechaInicio;
            controlDepositosRepository.prevSession.selectedValueFechaFin = $scope.selectedValueFechaFin;
            controlDepositosRepository.prevSession.btnSwitchIsEnable = $scope.btnSwitchIsEnable;
            controlDepositosRepository.prevSession.selectedValueSucursaID = $scope.selectedValueSucursaID;
            controlDepositosRepository.prevSession.selectedValueDepartamentoID = $scope.selectedValueDepartamentoID;
            controlDepositosRepository.prevSession.selectedValueCarteraFechaInicio = $scope.selectedValueCarteraFechaInicio;
            controlDepositosRepository.prevSession.showUserSearchPanel = $scope.showUserSearchPanel;
            controlDepositosRepository.prevSession.searchType = $scope.searchType;
            controlDepositosRepository.prevSession.searchTypeID = $scope.searchTypeID;
            controlDepositosRepository.prevSession.searchValue = $scope.searchValue;
            controlDepositosRepository.prevSession.searchClienteID = $scope.searchClienteID;
        };


        if (controlDepositosRepository.prevSession.isFirstTime === false) {

            $scope.ddlBancoDisabled = controlDepositosRepository.prevSession.ddlBancoDisabled;
            $scope.ddlCuentaDisabled = controlDepositosRepository.prevSession.ddlCuentaDisabled;
            $scope.txtFechasDisabled = controlDepositosRepository.prevSession.txtFechasDisabled;
            $scope.btnBuscarDisabled = controlDepositosRepository.prevSession.btnBuscarDisabled;
            $scope.carteraControlsDisabled = controlDepositosRepository.prevSession.carteraControlsDisabled;
            $scope.selectedValueEmpresaID = controlDepositosRepository.prevSession.selectedValueEmpresaID;
            $scope.selectedValueBancoID = controlDepositosRepository.prevSession.selectedValueBancoID;
            $scope.selectedValueCuentaID = controlDepositosRepository.prevSession.selectedValueCuentaID;
            $scope.selectedValueFechaInicio = controlDepositosRepository.prevSession.selectedValueFechaInicio;
            $scope.selectedValueFechaFin = controlDepositosRepository.prevSession.selectedValueFechaFin;
            $scope.btnSwitchIsEnable = controlDepositosRepository.prevSession.btnSwitchIsEnable;
            $scope.selectedValueSucursaID = controlDepositosRepository.prevSession.selectedValueSucursaID;
            $scope.selectedValueDepartamentoID = controlDepositosRepository.prevSession.selectedValueDepartamentoID;
            $scope.selectedValueCarteraFechaInicio = controlDepositosRepository.prevSession.selectedValueCarteraFechaInicio;
            $scope.showUserSearchPanel = controlDepositosRepository.prevSession.showUserSearchPanel;
            $scope.searchType = controlDepositosRepository.prevSession.searchType;
            $scope.searchTypeID = controlDepositosRepository.prevSession.searchTypeID;
            $scope.searchValue = controlDepositosRepository.prevSession.searchValue;
            $scope.searchClienteID = controlDepositosRepository.prevSession.searchClienteID;

            $scope.getBancos();
            $scope.getCuentas();
            $scope.getSucursales();
            $scope.getDepartamentos();
        }

        $scope.BuscarDepositosHeraldo = function() {

            $scope.loadDepositosPuntosVentasHeraldo($scope.valorFechaInicioDH, $scope.valorFechaFinDH);
        };

        setTimeout(function() {
            $scope.initCalendarstyle(); //inicializa los calendarios de fechas despues de cargar los componentes visuales
        }, 1000);

        $scope.setTablePaging = function(idTable) {
            $('#' + idTable).DataTable({
                dom: '<"html5buttons"B>lTfgitp',
                buttons: [{
                    extend: 'excel',
                    title: 'Depositos de puntos de ventas'
                }, {
                    extend: 'print',
                    customize: function(win) {
                        $(win.document.body).addClass('white-bg');
                        $(win.document.body).css('font-size', '10px');
                        $(win.document.body).find('table')
                            .addClass('compact')
                            .css('font-size', 'inherit');
                    }
                }]
            });
        };

        //$scope.initCalendarstyle();
        //$scope.loadPendingDocs();

        $scope.porAplicar = function() {
            $(".pestania").removeClass('active');
            $(".por-aplicar").addClass('active');
            $scope.tipoDeposito = 1;
            $scope.tipoDepositoAux = 1;
            $scope.gridDocumentos.multiSelect = false;
            $scope.gridDocumentos.columnDefs = controlDepositosRepository.gridDocumentosColumns(true);
            // $scope.selectedRowDocuments = {};
            if (!$scope.carteraControlsDisabled)
                $scope.getDepositosBancosNoReferenciados();

        }

        $scope.dpi = function() {
            $(".pestania").removeClass('active');
            $(".dpi").addClass('active');
            $scope.tipoDeposito = 2;
            $scope.tipoDepositoAux = 2;
            $scope.gridDocumentos.multiSelect = true;
            $scope.gridDocumentos.columnDefs = controlDepositosRepository.gridDocumentosColumns(true);
            // $scope.selectedRowDocuments = [];
            if (!$scope.carteraControlsDisabled)
                $scope.getDepositosPorIdentificar();
        }

        $scope.aplicado = function() {
            $(".pestania").removeClass('active');
            $(".aplicado").addClass('active');
            $scope.tipoDeposito = 3;
            $scope.tipoDepositoAux = 3;
            $scope.gridDocumentos.columnDefs = controlDepositosRepository.gridDocumentosColumnsAplicados(true);
            $scope.gridDocumentos.multiSelect = false;
            // $scope.selectedRowDocuments = {};
            if (!$scope.carteraControlsDisabled)
                $scope.getDepositosAplicados();
        }

    $scope.generaInfoReport = function() {

    $('#mdlLoading').modal('show');

    setTimeout(function() {
         
         $('#mdlLoading').modal('hide');
         $('reproteModalPdf').modal('show');
            new Promise(function(resolve, reject) {
                var rptDetalleConciliacionBancaria = {
                    "titulo": "CONCILIACIÓN BANCARIA",
                    "titulo2": "BANCOS",
                    "titulo3": "FA04",
                    "empresa": $scope.busqueda.Empresa,
                    "fechaElaboracion": $scope.fechaReporte,
                    "conciliacionBancaria": $scope.busqueda.Banco  };
                var jsonData = {
                    "template": {
                        "name": "heleraldoReferencia_rpt"
                    },
                    "data": rptDetalleConciliacionBancaria
                }
                resolve(jsonData);
            }).then(function(jsonData) {
                controlDepositosRepository.getReporteReferencia(jsonData).then(function(result) {
                    var file = new Blob([result.data], { type: 'application/pdf' });
                    var fileURL = URL.createObjectURL(file);
                    $scope.rptResumenConciliacion = $sce.trustAsResourceUrl(fileURL);
                    $('#mdlLoading').modal('hide');
                    $('#reproteModalPdf').modal('show');
                });
            });
        
    }, 4000)
}



    }
]);

registrationModule.factory('exportUiGridService', exportUiGridService)
exportUiGridService.inject = ['uiGridExporterService'];

function exportUiGridService(uiGridExporterService) {
    var service = {
        exportToExcel: exportToExcel
    };

    return service;
    //return{

    function Workbook() {
        if (!(this instanceof Workbook)) return new Workbook();
        this.SheetNames = [];
        this.Sheets = {};
    }

    function exportToExcel(sheetName, gridApi, rowTypes, colTypes) {
        var columns = gridApi.grid.options.showHeader ? uiGridExporterService.getColumnHeaders(gridApi.grid, colTypes) : [];
        var data = uiGridExporterService.getData(gridApi.grid, rowTypes, colTypes);
        var fileName = gridApi.grid.options.exporterExcelFilename ? gridApi.grid.options.exporterExcelFilename : 'dokuman';
        fileName += '.xlsx';
        var wb = new Workbook(),
            ws = sheetFromArrayUiGrid(data, columns);
        wb.SheetNames.push(sheetName);
        wb.Sheets[sheetName] = ws;
        var wbout = XLSX.write(wb, {
            bookType: 'xlsx',
            bookSST: true,
            type: 'binary'
        });
        saveAs(new Blob([s2ab(wbout)], {
            type: 'application/octet-stream'
        }), fileName);
    }

    function sheetFromArrayUiGrid(data, columns) {
        var ws = {};
        var range = {
            s: {
                c: 10000000,
                r: 10000000
            },
            e: {
                c: 0,
                r: 0
            }
        };
        var C = 0;
        columns.forEach(function(c) {
            var v = c.displayName || c.name;
            addCell(range, v, 0, C, ws);
            C++;
        }, this);
        var R = 1;
        data.forEach(function(ds) {
            C = 0;
            ds.forEach(function(d) {
                var v = d.value;
                addCell(range, v, R, C, ws);
                C++;
            });
            R++;
        }, this);
        if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
        return ws;
    }

    function datenum(v, date1904) {
        if (date1904) v += 1462;
        var epoch = Date.parse(v);
        return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
    }

    function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }

    function addCell(range, value, row, col, ws) {
        if (range.s.r > row) range.s.r = row;
        if (range.s.c > col) range.s.c = col;
        if (range.e.r < row) range.e.r = row;
        if (range.e.c < col) range.e.c = col;
        var cell = {
            v: value
        };
        if (cell.v == null) cell.v = '-';
        var cell_ref = XLSX.utils.encode_cell({
            c: col,
            r: row
        });

        if (typeof cell.v === 'number') cell.t = 'n';
        else if (typeof cell.v === 'boolean') cell.t = 'b';
        else if (cell.v instanceof Date) {
            cell.t = 'n';
            cell.z = XLSX.SSF._table[14];
            cell.v = datenum(cell.v);
        } else cell.t = 's';

        ws[cell_ref] = cell;
    }

    //};


}

