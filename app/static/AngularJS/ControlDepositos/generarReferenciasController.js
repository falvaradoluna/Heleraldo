registrationModule.controller('generarReferenciasController',
    ['$scope', '$rootScope', '$location', 'localStorageService', 'filtrosRepository', 'alertFactory', '$http', 
    '$log', '$timeout', 'uiGridConstants', 'controlDepositosRepository', 'exportUiGridService','$sce',
    function($scope, $rootScope, $location, localStorageService, filtrosRepository, alertFactory, $http,
     $log, $timeout, uiGridConstants, controlDepositosRepository, exportUiGridService, $sce) {

    	$scope.tblReferenciasPuntosVentas = [];
    

    	$('#tblCtrlPV').DataTable().destroy();

    	controlDepositosRepository.getPersonas().then(function(result) {
            if (result.data.length > 0) {
                $scope.tblReferenciasPuntosVentas = result.data;

                setTimeout(function() {
                    $scope.setTablePaging('tblCtrlPV');
                }, 1000);


            } else {
                console.log('no trajo nada getPersonas');
            }
        }, function(error) {
            console.log('Error');
        });

        $scope.setTablePaging = function(idTable) {
        $('#' + idTable).DataTable({
                dom: '<"html5buttons"B>lTfgitp',
                buttons: [{
                    extend: 'excel',
                    title: 'puntos de ventas'
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

        $scope.filtroPersonas = {
                Id: null,
                Rfc: null,
                NombreRazon: null
            };

        $scope.mostrarFiltrosBusquedaPersonas = function(){

            $scope.filtroPersonas.Id = null;
            $scope.filtroPersonas.Rfc = null;
            $scope.filtroPersonas.NombreRazon = null;

            $('#mdlBuscarPersonas').modal('show');
        }

        $scope.mostrarBusquedaPuntoVenta = function(){

            $('#mdlPersonaEncontrada').modal('show');

            setTimeout(function() {
                $scope.setTablePaging('tblCtrlBusquedaPersona');
            }, 1000);
        }

        $scope.buscarPersona = function(){

            $scope.filtroPersonas.Id = $scope.filtroPersonas.Id != null ? parseInt($scope.filtroPersonas.Id) : null;

            $('#tblCtrlBusquedaPersona').DataTable().destroy();
            $scope.tblBusquedaPersonas = [];
        
            controlDepositosRepository.getPersonasParametrizadas($scope.filtroPersonas).then(function(result) {

                 if (result.data.length > 0) {

                    $scope.tblBusquedaPersonas = result.data;
                    $('#mdlBuscarPersonas').modal('hide');
                    
                    $scope.filtroPersonas.Id = null;
                    $scope.filtroPersonas.Rfc = null;
                    $scope.filtroPersonas.NombreRazon = null;

                    $scope.mostrarBusquedaPuntoVenta();

                } else {
                    swal ( "Oops" ,  "No se encontraron resultados!" ,  "error" )
                   // alertFactory.warning('No se encontraron resultados');
                    console.log('no trajo nada getPersonasParametrizadas');
                }
               
            }, function(error) {
                console.log('Error');                
            });

        }

    	$scope.agregarPuntoVenta = function(){

    		$scope.puntoVenta = {
    			Id: '',
    			Rfc: '',
    			NombreRazon:''
    		};

			$('#mdlAgregarPuntoVenta').modal('show');
    	}

        $scope.imprimirReferencia = function(idPersona, rfc, nombreRazon, referencia){
             $('#mdlLoading').modal('show');
            
             
        //Genero la promesa para enviar la estructura del reporte 
      //  $('#reporteModalPdf').modal('show');
      new Promise(function(resolve, reject) {
          var rptReferenciaDepositoHeraldo = 
                                                { 
                                                         "Id": idPersona,
                                                         "Rfc": rfc,  
                                                         "NombreRazon": nombreRazon, 
                                                         "Referencia": referencia
                                                    };
          var jsonData = {
                            "template": {
                                "name": "ReferenciaDepositoHeraldo_rpt"
                            },
                            "data": rptReferenciaDepositoHeraldo 
                        }
           resolve(jsonData);
                }).then(function(jsonData) {
                    controlDepositosRepository.getReportePdf(jsonData).then(function(result){
                        var file = new Blob([result.data], { type: 'application/pdf' });
                        var fileURL = URL.createObjectURL(file);
                        $scope.rptResumenConciliacion = $sce.trustAsResourceUrl(fileURL);
                         $('#mdlLoading').modal('hide');
                        $('#reporteModalPdf').modal('show'); 
                    });
                });


            // $scope.infoReporte = {

            //     "Id": idPersona,
            //     "Rfc": rfc,  
            //     "NombreRazon": nombreRazon, 
            //     "Referencia": referencia
            // };

            //  $scope.jsonData = {
            //     "template": {
            //         "name": "ReferenciaDepositoHeraldo"
            //     },
            //     "data": $scope.infoReporte
            // }

            // $('#mdlLoading').modal('show');
            // controlDepositosRepository.getReportePdf($scope.jsonData).then(function(fileName) {
            //     setTimeout(function() {
            //         $("#objReportePdf").remove();
            //         $scope.ruta = fileName.data;
            //         //$("<object id='objReportePdf' class='filesInvoce' data='http://192.168.20.9:5000/api/layout/viewpdf?fileName=" + $scope.ruta + "' width='100%' height='500px' >").appendTo('#reportePdf');
            //         //$("<object id='objReportePdf' class='filesInvoce' data='http://192.168.20.9:5200/api/conciliacionDetalleRegistro/viewpdf?fileName=" + $scope.ruta + "' width='100%' height='500px' >").appendTo('#reportePdf');
            //         $('#mdlLoading').modal('hide');
            //         $('#reporteModalPdf').modal('show');
            //     }, 5000);
    
            // });

        }

        $scope.envioMail = function(idPersona, rfc, nombreRazon, referencia) {

            $scope.infoReporte = {

                "Id": idPersona,
                "Rfc": rfc,  
                "NombreRazon": nombreRazon, 
                "Referencia": referencia
            };

             $scope.jsonData = {
                "template": {
                    "name": "ReferenciaDepositoHeraldo"
                },
                "data": $scope.infoReporte
            }
            
            controlDepositosRepository.getReportePdf($scope.jsonData).then(function(fileName) {
                conciliacionDetalleRegistroRepository.sendMail(fileName.data, $scope.cuenta, $scope.nombreEmpresa, $scope.cuentaBanco, $scope.nombreBanco, $rootScope.userData.nombreUsuario).then(function(result) {
                    alertFactory.success('Envio de correo con exito');
                    console.log(result, 'Estoy en el envio de mail')
                });
            });
        };

    	$scope.showModalGenerarReferencia = function(idPersona, rfc, nombreRazon){

    		$scope.datosGeneracionReferencia = {
    			IdPersona: idPersona,
    			Rfc: rfc
    		};

    		swal({
                title: "¿Esta seguro?",
                text: "Se creara la referencia al punto de venta:" + '\n' + 
                'Id: ' + idPersona + '\n' + 
                'Rfc: ' + rfc + '\n' + 
                'Nombre Razon: ' + nombreRazon,
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#21B9BB",
                confirmButtonText: "Aceptar",
                closeOnConfirm: true
            },
            function() {

				$scope.generaReferencia($scope.datosGeneracionReferencia);
               // controlDepositosRepository.generaReferenciaPuntoVenta($scope.nuevaReferencia);

             

                $('#tblCtrlPV').DataTable().destroy();
                $scope.tblReferenciasPuntosVentas = [];
		
    			controlDepositosRepository.getPersonas().then(function(result) {
        		    if (result.data.length > 0) {
        		        $scope.tblReferenciasPuntosVentas = result.data;
        		       $('#mdlPersonaEncontrada').modal('hide');
        		       swal("Operacion realizada correctamente");
		
        		        setTimeout(function() {
        		            $scope.setTablePaging('tblCtrlPV');
                               swal("Operacion realizada correctamente");
        		        }, 1000);
		
		
        		    } else {
        		        console.log('no trajo nada getPersonas');
                        swal("HM","Ha ocurrido un error en la peticion", "error");
        		    }
        		}, function(error) {
        		    console.log('Error');
                    swal("HM","Ha ocurrido un error en la peticion", "error");
        		});
                
            });


    	}

    	$scope.generaReferencia = function(datosGeneracionReferencia){

    		var referenciaDepositoTxt = datosGeneracionReferencia.Rfc.length < 13 ? "HM" : "H";
    		var numAleatorio = Math.floor((Math.random() * 99999) + 1);
    		referenciaDepositoTxt += datosGeneracionReferencia.Rfc + numAleatorio;
    		var digitoVerificador = modulo10(referenciaDepositoTxt);
    		referenciaDepositoTxt += digitoVerificador;

    		$scope.nuevaReferencia = {
                IdPersona: datosGeneracionReferencia.IdPersona,
                ReferenciaDeposito: referenciaDepositoTxt
            }
             controlDepositosRepository.generaReferenciaPuntoVenta($scope.nuevaReferencia).then(function(result){
                    console.log(result.data);
             });
    	}

    	function modulo10(str)
        {
            var digito = 0;
            var flag = 2;

            var strAux = "";

            var i = 0;
            for (i; i <= str.length - 1; i++)
            {
                var salida = 0;
                if (!isNaN(str[i].toString()))
                {
                    strAux += str[i].toString();
                }
                else
                {
                    var valor = AsignarValorNumerico(str[i].toString());
                    strAux += valor.toString();
                }
            }

            i = strAux.length - 1;
            for (i; i >= 0; i--)
            {
                var valor = parseInt(strAux[i].toString()) * flag;

                var soma = 0;
                if (valor.toString().length > 1)
                {
                    var svalor = valor.toString();
                    var j = 0;
                    for (j; j < svalor.length; j++)
                    {
                        soma += parseInt(svalor[j].toString());
                    }
                }
                else
                {
                    soma = valor;
                }
                digito += soma;
                flag = (flag == 2) ? 1 : 2;
            }

            digito = digito % 10;
            digito = 10 - digito;

            if (digito == 10)
            {
                digito = 0;
            }

            return digito.toString();
        }

        function AsignarValorNumerico(caracter)
        {
            var valor = 0;

            switch (caracter)
            {
                case "A":
                case "J":
                case "S":
                    valor = 1;
                    break;

                case "B":
                case "K":
                case "T":
                    valor = 2;
                    break;

                case "C":
                case "L":
                case "U":
                    valor = 3;
                    break;

                case "D":
                case "M":
                case "V":
                    valor = 4;
                    break;

                case "E":
                case "N":
                case "W":
                    valor = 5;
                    break;

                case "F":
                case "O":
                case "X":
                    valor = 6;
                    break;

                case "G":
                case "P":
                case "Y":
                    valor = 7;
                    break;

                case "H":
                case "Q":
                case "Z":
                    valor = 8;
                    break;

                case "I":
                case "R":
                    valor = 9;
                    break;

                default:
                    console.log("Default case");
                    break;
            }

            return valor;
        }



     	}]);

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

         function exportToExcel (sheetName, gridApi, rowTypes, colTypes) {
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
            columns.forEach(function (c) {
                var v = c.displayName || c.name;
                addCell(range, v, 0, C, ws);
                C++;
            }, this);
            var R = 1;
            data.forEach(function (ds) {
                C = 0;
                ds.forEach(function (d) {
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