var controlDepositosView = require('../views/reference'),
    controlDepositosModel = require('../models/dataAccess');
var path = require('path');
var webPage = require('webpage');
var request = require('request');
var http = require('http');

var controlDepositos = function(conf) {
    this.conf = conf || {};

    this.view = new controlDepositosView();
    this.model = new controlDepositosModel({
        parameters: this.conf.parameters
    });

    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
};

controlDepositos.prototype.get_createReference = function(req, res, next) {
    var self = this;
    console.log( 'importeDocumento',req.query.importeDocumento );
    var params = [
        { name: 'idEmpresa', value: req.query.idEmpresa, type: self.model.types.INT },
        { name: 'idSucursal', value: req.query.idSucursal, type: self.model.types.INT },
        { name: 'idDepartamento', value: req.query.idDepartamento, type: self.model.types.INT },
        { name: 'idTipoDocumento', value: req.query.idTipoDocumento, type: self.model.types.INT },
        { name: 'serie', value: req.query.serie, type: self.model.types.STRING },
        { name: 'folio', value: req.query.folio, type: self.model.types.STRING },
        { name: 'idCliente', value: req.query.idCliente, type: self.model.types.INT },
        { name: 'idAlma', value: req.query.idAlma, type: self.model.types.STRING },
        { name: 'importeDocumento', value: req.query.importeDocumento, type: self.model.types.DECIMAL },
        { name: 'idTipoReferencia', value: req.query.idTipoReferencia, type: self.model.types.STRING },
        { name: 'depositoID', value: req.query.depositoID, type: self.model.types.INT }
    ];

    console.log(params);

    this.model.query('SEL_REFERENCIA_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

controlDepositos.prototype.get_createTempReference = function(req, res, next) {
    var self = this;

    var params = [
        { name: 'bancoNumberID', value: req.query.bancoNumberID, type: self.model.types.INT },
        { name: 'bancoConsTableID', value: req.query.bancoConsTableID, type: self.model.types.INT },
        { name: 'referenciaID', value: req.query.referenciaID, type: self.model.types.INT },
        { name: 'carteraVencidaID', value: req.query.carteraVencidaID, type: self.model.types.INT },
        { name: 'referenciaTemporal', value: req.query.referenciaTemporal, type: self.model.types.STRING },
        { name: 'estatusID', value: req.query.estatusID, type: self.model.types.INT },
        { name: 'tipoReferenciaID', value: req.query.tipoReferenciaID, type: self.model.types.INT }

    ];

    this.model.query('INS_REFERENCIA_TEMP_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

controlDepositos.prototype.get_insertReferenceDetails = function(req, res, next) {
    var self = this;

    var params = [
        { name: 'idReferencia', value: req.query.idReferencia, type: self.model.types.INT },
        { name: 'idSucursal', value: req.query.idSucursal, type: self.model.types.INT },
        { name: 'idDepartamento', value: req.query.idDepartamento, type: self.model.types.INT },
        { name: 'idTipoDocumento', value: req.query.idTipoDocumento, type: self.model.types.INT },
        { name: 'serie', value: req.query.serie, type: self.model.types.STRING },
        { name: 'folio', value: req.query.folio, type: self.model.types.STRING },
        { name: 'idCliente', value: req.query.idCliente, type: self.model.types.INT },
        { name: 'idAlma', value: req.query.idAlma, type: self.model.types.STRING },
        { name: 'importeDocumento', value: req.query.importeDocumento, type: self.model.types.DECIMAL }
    ];

    this.model.query('INS_DETALLE_REFERENCIA_LOTE_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

controlDepositos.prototype.get_testApi = function(req, res, next) {
    //get utiliza params y lo recibe req.query ---> req.query.val1
    //post utiliza data y lo recibe req.body ---> req.body.val1    
    var self = this;

    var params = [
        { name: 'valorUno', value: req.query.val1, type: self.model.types.INT },
        { name: 'valorDos', value: req.query.val2, type: self.model.types.STRING }
    ];

    this.model.query('SEL_TEST_API', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

controlDepositos.prototype.get_depositosPuntosVentasHeraldo = function(req, res, next) {
    var self = this;

    var params = [
        { name: 'fechaInicio', value: req.query.fechaInicio, type: self.model.types.STRING },
        { name: 'fechaFin', value: req.query.fechaFin, type: self.model.types.STRING }
    ];

    this.model.query('Sel_Referencias_DepositosHeraldo_Sp', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

controlDepositos.prototype.get_detalleDepositoPuntosVentasHeraldo = function(req, res, next) {
    var self = this;

    var params = [
        { name: 'referencia', value: req.query.referencia, type: self.model.types.STRING},
        { name: 'fechaInicio', value: req.query.fechaInicio, type: self.model.types.STRING },
        { name: 'fechaFin', value: req.query.fechaFin, type: self.model.types.STRING }
    ];

    this.model.query('Sel_Detalle_DepositosHeraldo_Sp', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

controlDepositos.prototype.get_insertAplicacionCobro = function(req, res, next) {
    var self = this;

    var params = [
        { name: 'rap_idempresa', value: req.query.rap_idempresa, type: self.model.types.INT },
       // { name: 'rap_idsucursal', value: req.query.rap_idsucursal, type: self.model.types.INT },
       // { name: 'rap_iddepartamento', value: req.query.rap_iddepartamento, type: self.model.types.INT },
        { name: 'rap_idpersona', value: req.query.rap_idpersona, type: self.model.types.INT },
      //  { name: 'rap_cobrador', value: req.query.rap_cobrador, type: self.model.types.STRING },
       // { name: 'rap_moneda', value: req.query.rap_moneda, type: self.model.types.STRING },
        { name: 'rap_tipocambio', value: req.query.rap_tipocambio, type: self.model.types.DECIMAL },
        { name: 'rap_referencia', value: req.query.rap_referencia, type: self.model.types.STRING },
        { name: 'rap_iddocto', value: req.query.rap_iddocto, type: self.model.types.STRING },
        { name: 'rap_cotped', value: req.query.rap_cotped, type: self.model.types.STRING },
        { name: 'rap_consecutivo', value: req.query.rap_consecutivo, type: self.model.types.STRING },
        { name: 'rap_importe', value: req.query.rap_importe, type: self.model.types.DECIMAL },
        { name: 'rap_formapago', value: req.query.rap_formapago, type: self.model.types.STRING },
        { name: 'rap_numctabanc', value: req.query.rap_numctabanc, type: self.model.types.STRING },
        { name: 'rap_fecha', value: req.query.rap_fecha, type: self.model.types.STRING },
        { name: 'rap_idusuario', value: req.query.rap_idusuario, type: self.model.types.INT },
        { name: 'rap_idstatus', value: req.query.rap_idstatus, type: self.model.types.INT },
        { name: 'rap_banco', value: req.query.rap_banco, type: self.model.types.STRING },
        { name: 'rap_referenciabancaria', value: req.query.rap_referenciabancaria, type: self.model.types.STRING },
        { name: 'rap_anno', value: req.query.rap_anno, type: self.model.types.STRING },
        { name: 'rapNumDeposito', value: req.query.rapNumDeposito, type: self.model.types.INT }
    ];

    this.model.query('Ins_Aplicacion_Cobro_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });

    
};

controlDepositos.prototype.get_insertPuntoVenta = function(req, res, next) {
    var self = this;

    var params = [
        { name: 'Id', value: req.query.Id, type: self.model.types.INT },
        { name: 'Rfc', value: req.query.Rfc, type: self.model.types.STRING },
        { name: 'NombreRazon', value: req.query.NombreRazon, type: self.model.types.STRING }
    ];

    this.model.query('Ins_Punto_Venta_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });    
};

controlDepositos.prototype.get_personasParametrizadas = function(req, res, next) {
    var self = this;

    var params = [
        { name: 'Id', value: req.query.Id, type: self.model.types.INT },
        { name: 'Rfc', value: req.query.Rfc, type: self.model.types.STRING },
        { name: 'NombreRazon', value: req.query.NombreRazon, type: self.model.types.STRING }
    ];

    this.model.query('SEL_PERSONAS_PARAMETRIZADAS_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });    
};

controlDepositos.prototype.get_generaRefPuntoVenta = function(req, res, next) {
    var self = this;

    var params = [
        { name: 'IdPersona', value: req.query.IdPersona, type: self.model.types.INT },
        { name: 'ReferenciaDeposito', value: req.query.ReferenciaDeposito, type: self.model.types.STRING }
    ];

    this.model.query('Ins_ReferenciaPV_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });

    
};

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '_' + s4() + '_' + s4() + '_' +
        s4() + '_' + s4() + s4() + s4();
};

controlDepositos.prototype.post_reportePdf = function(req, res, next) {
    var filename = guid();
    var filePath = path.dirname(require.main.filename) + "\\pdf\\" + filename + ".pdf";
    console.log(path.dirname(require.main.filename) + "\\pdf\\" + filename + ".pdf");
    var options = {
        "method": "POST",
        "hostname": "192.168.20.89",
        "port": "5488",
        "path": "/api/report",
        "headers": {
            "content-type": "application/json"
        }
    };
    var request = http.request(options, function(response) {
        var chunks = [];

        response.on("data", function(chunk) {
            chunks.push(chunk);
        });

        response.on("end", function() {
            var body = Buffer.concat(chunks);

            fs.writeFile(filePath, body, function(err) {
                if (err) return console.log(err);
            });

        });
    });
    request.write(JSON.stringify(req.body.values));
    request.end();
    var self = this;
    self.view.expositor(res, {
        error: null,
        result: filename
    });
};

controlDepositos.prototype.post_sendMail = function(req, res, next) {
    var self = this;
    var params = [{ name: 'tipoParametro', value: 0, type: self.model.types.INT }];
    this.model.query('SEL_PARAMETROS_SP', params, function(error, result) {
        console.log(result[0].valor, 'result de ENVIOMAIL')
        console.log(error, 'error de ENVIOMAIL')

        // self.view.expositor(res, {
        //     error: error,
        //     result: result
        // });
        //req.body.nombreArchivo    
        var  nombreArchivo = req.body.nombreArchivo;
        var cuentaContable = req.body.cuentaContable;
        var nombreEmpresa = req.body.nombreEmpresa;
        var cuentaBancaria = req.body.cuentaBancaria;
        var nombreBanco = req.body.nombreBanco;
        var responsable = req.body.responsable;
        var object = {};   //Objeto que envía los parámetros
        var params = [];   //Referencia a la clase para callback    
        var files = [];
        var ruta = path.dirname(require.main.filename) + "\\pdf\\" + nombreArchivo + ".pdf";
        var extension = '.pdf';
        var carpeta = 'pdf'; 
        var nodemailer = require('nodemailer');
        var smtpTransport = require('nodemailer-smtp-transport');
        var transporter = nodemailer.createTransport(smtpTransport({
            host: '192.168.20.1',
            port: 25,
            secure: false,
            auth: {
                user: 'sistemas',
                pass: 's1st3m4s'
            },
            tls: { rejectUnauthorized: false }
        }));
        var mailOptions = {
            from: '<grupoandrade.reportes@grupoandrade.com.mx>', // sender address 
            to: result[2].valor, // list of receivers 
            subject: result[0].valor, // Subject line 
            text: result[1].valor, // plaintext body 
            html: '<b>' + result[1].valor + '</b><br/><br/><br/><b>Empresa: </b>' + nombreEmpresa + '<br/><b>Cuenta contable: </b>' + cuentaContable + '<br/><b>Banco: </b>'+ nombreBanco + '<br/><b>Cuenta bancaria: </b>'+ cuentaBancaria + '<br/><br/><b>Realizó: </b>' + responsable, // html body 
            attachments: [{ // file on disk as an attachment
                filename: req.body.nombreArchivo + '.pdf',
                path: ruta // stream this file
            }]
        };
        setTimeout(function() {
            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    res.send(500);
                    console.log(error);
                } else {
                    res.send(200);
                    fs.stat(ruta, function(err, stats) {
                        if (err) {
                            return console.error(err);
                        }
                    });
                }
            });
        }, 4000)


        transporter.close;
        object.error = null;            
        object.result = 1; 
        console.log(object.result)
        req.body = [];
    }); 
};

controlDepositos.prototype.get_personas = function(req, res, next) {
    var self = this;

    var params = [];

    this.model.query('SEL_PERSONAS_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};


controlDepositos.prototype.get_setObservation = function(req, res, next) {
    var self = this;

    var params = [
        { name: 'idDepositoBanco', value: req.query.idDepositoBanco, type: self.model.types.INT },
        { name: 'observacion', value: req.query.observacion, type: self.model.types.STRING }
    ];

    this.model.query('UPD_OBSEVACION_DEPOSITO_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};



controlDepositos.prototype.get_setReferencia = function(req, res, next) {
    var self = this;

    var params = [
        { name: 'idDepositoBanco', value: req.query.idDepositoBanco, type: self.model.types.INT },
        { name: 'idReferencia', value: req.query.idReferencia, type: self.model.types.INT }
    ];

    this.model.query('UPD_DEPOSITO_REFERENCIA', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};


controlDepositos.prototype.get_updCarteraVencidaReferencia = function(req, res, next) {
    var self = this;

    var params = [{ name: 'idReferencia', value: req.query.idReferencia, type: self.model.types.INT }];

    this.model.query('UPD_CARTERA_VENCIDA_REFERENCIA', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

controlDepositos.prototype.get_delReferenciaGenerada = function(req, res, next) {
    var self = this;

    var params = [{ name: 'idReferencia', value: req.query.idReferencia, type: self.model.types.INT }];

    this.model.query('DEL_REFERENCIA_GENERADA_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

controlDepositos.prototype.get_clientByName = function(req, res, next) {
    var self = this;
    //asignación de valores mediante parámetros del request
    var params = [{
        name: 'varBusqueda',
        value: req.query.clientName,
        type: self.model.types.STRING
    }];

    this.model.query('SEL_CLIENTE_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};


controlDepositos.prototype.get_comisiones = function(req, res, next) {
    var self = this;
    //asignación de valores mediante parámetros del request
    var params = [
        { name: 'idBanco', value: req.query.idBanco, type: self.model.types.INT },
        { name: 'noCuenta', value: req.query.noCuenta, type: self.model.types.STRING },
        { name: 'fechaIni', value: req.query.fechaIni, type: self.model.types.STRING },
        { name: 'fechaFin', value: req.query.fechaFin, type: self.model.types.STRING }
    ];

    this.model.query('SEL_COMISIONES', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};


controlDepositos.prototype.get_comisionesIva = function(req, res, next) {
    var self = this;
    //asignación de valores mediante parámetros del request
    var params = [{ name: 'idDepositoBanco', value: req.query.idDepositoBanco, type: self.model.types.STRING }];

    this.model.query('SEL_COMISIONES_IVA', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

controlDepositos.prototype.get_interesComision = function(req, res, next) {
    var self = this;

    var params = [
        { name: 'interesID', value: req.query.interesID, type: self.model.types.INT },
        { name: 'comisionID', value: req.query.comisionID, type: self.model.types.INT },
        { name: 'bancoID', value: req.query.bancoID, type: self.model.types.INT },
        { name: 'userID', value: req.query.userID, type: self.model.types.INT },
        { name: 'statusID', value: req.query.statusID, type: self.model.types.INT }
    ];

    this.model.query('[INS_INTERESCOMISION_SP]', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};


controlDepositos.prototype.get_updAplicaComisiones = function(req, res, next) {
    var self = this;

    var params = [{ name: 'interesComisionID', value: req.query.interesComisionID, type: self.model.types.INT }];

    this.model.query('UPD_APLICACOMISIONES_SP', params, function(error, result) {
        
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};



controlDepositos.prototype.get_delInteresComision = function(req, res, next) {
    var self = this;

    var params = [{ name: 'interesComisionID', value: req.query.interesComisionID, type: self.model.types.INT }];

    this.model.query('DEL_INTERESCOMISION_SP', params, function(error, result) {
        
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};



controlDepositos.prototype.get_selInteresComision = function(req, res, next) {
    var self = this;

    var params = [];

    this.model.query('SEL_INTERESCOMISION_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};




controlDepositos.prototype.get_selInteresComisionDetalle = function(req, res, next) {
    var self = this;

    var params = [{ name: 'idcomisionInteres', value: req.query.idcomisionInteres, type: self.model.types.STRING }];

    this.model.query('SEL_INTERESCOMISIONDETALLE_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

controlDepositos.prototype.get_insCxpComisionesInteres = function(req, res, next) {
    var self = this;

    var params = [{ name: 'interesComisionID', value: req.query.interesComisionID, type: self.model.types.STRING }];

    this.model.query('INS_CXPCOMISIONESINTERESES_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};


controlDepositos.prototype.get_insInteresComisionDetalle = function(req, res, next) {
    var self = this;

    var params = [
        { name: 'cuentacontable', value: req.query.cuentacontable, type: self.model.types.STRING },
        { name: 'concepto', value: req.query.concepto, type: self.model.types.STRING },
        { name: 'cargo', value: req.query.cargo, type: self.model.types.STRING },
        { name: 'abono', value: req.query.abono, type: self.model.types.STRING },
        { name: 'documento', value: req.query.documento, type: self.model.types.STRING },
        { name: 'idpersona', value: req.query.idpersona, type: self.model.types.STRING },
        { name: 'idcomisionesintereses', value: req.query.idcomisionesintereses, type: self.model.types.STRING },
        { name: 'tipodocumento', value: req.query.tipodocumento, type: self.model.types.STRING },
        { name: 'fechavencimiento', value: req.query.fechavencimiento, type: self.model.types.STRING },
        { name: 'poriva', value: req.query.poriva, type: self.model.types.STRING },
        { name: 'referencia', value: req.query.referencia, type: self.model.types.STRING },
        { name: 'banco', value: req.query.banco, type: self.model.types.STRING },
        { name: 'referenciabancaria', value: req.query.referenciabancaria, type: self.model.types.STRING },
        { name: 'conpoliza', value: req.query.conpoliza, type: self.model.types.STRING }
    ];

    this.model.query('INS_CXPCOMISIONESINTERESESDET_SP', params, function(error, result) {

        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

controlDepositos.prototype.get_departamentoBpro = function(req, res, next) {
    var self = this;

    var params = [
        { name: 'sucursalID', value: req.query.sucursalID, type: self.model.types.INT }
    ];

    this.model.query('SEL_DEPARTAMENTOBPRO_SP', params, function(error, result) {

        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};


controlDepositos.prototype.get_interes = function(req, res, next) {
    var self = this;
    //asignación de valores mediante parámetros del request
    var params = [
        { name: 'idBanco', value: req.query.idBanco, type: self.model.types.INT },
        { name: 'noCuenta', value: req.query.noCuenta, type: self.model.types.STRING },
        { name: 'fechaIni', value: req.query.fechaIni, type: self.model.types.STRING },
        { name: 'fechaFin', value: req.query.fechaFin, type: self.model.types.STRING }
    ];

    this.model.query('SEL_INTERESES', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};


controlDepositos.prototype.get_interesIva = function(req, res, next) {
    var self = this;
    //asignación de valores mediante parámetros del request
    var params = [{ name: 'idDepositoBanco', value: req.query.idDepositoBanco, type: self.model.types.STRING }];

    this.model.query('SEL_INTERESES_IVA', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

module.exports = controlDepositos;