var FiltrosView = require('../views/reference'),
    FiltrosModel = require('../models/dataAccess');
var path = require('path');
var webPage = require('webpage');
var request = require('request');


var Filtros = function(conf) {
    this.conf = conf || {};

    this.view = new FiltrosView();
    this.model = new FiltrosModel({
        parameters: this.conf.parameters
    });

    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
};


Filtros.prototype.get_sucursales = function(req, res, next) {

    var self = this;

    var params = [{ name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT },
        { name: 'idEmpresa', value: req.query.idEmpresa, type: self.model.types.INT }
    ];

    this.model.query('SEL_SUCURSAL_BY_USUARIO_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};


Filtros.prototype.get_cuentacontable = function(req, res, next) {

    var self = this;

    var params = [{ name: 'idCuentacontable', value: req.query.idCuentacontable, type: self.model.types.INT }];

    this.model.query('SEL_CUENTA_CONTABLE_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Filtros.prototype.get_depositos = function(req, res, next) {

    var self = this;

    var params = [{ name: 'idBanco', value: req.query.idBanco, type: self.model.types.INT },
        { name: 'idEstatus', value: req.query.idEstatus, type: self.model.types.INT },
        { name: 'noCuenta', value: req.query.cuentaBancaria, type: self.model.types.STRING },
        { name: 'fechaElaboracion', value: req.query.fElaboracion, type: self.model.types.STRING },
        { name: 'fechaCorte', value: req.query.fCorte, type: self.model.types.STRING }
    ];

    this.model.query('SEL_DEPOSITOS_REFERENCIADOS_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

module.exports = Filtros;
