'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataSource = function () {
    function DataSource() {
        _classCallCheck(this, DataSource);

        this._data = {
            aliquotas: {
                ate2009: {
                    aliquotaSegundoPisoSegundoTeto: '0.15', //15%
                    aliquotaTerceiroPisoTerceiroTeto: '0.275' //27,5%
                },
                aPartirDe2009: {
                    aliquotaSegundoPisoSegundoTeto: '0.075', //7%
                    aliquotaTerceiroPisoTerceiroTeto: '0.15', //15%
                    aliquotaQuartoPisoQuartoTeto: '0.225', //22,5%
                    aliquotaQuintoPiso: '0.275' //27,5%
                }
            },
            2005: {
                taxaSelic: '1.2745', //127,45%
                primeiroTeto: '1164.00', //ISENTO
                segundoTeto: '2326.00',
                valorADeduzirSegundoPisoSegundoTeto: '174.60',
                valorADeduzirTerceiroPisoTerceiroTeto: '465.35'
            },
            2006: {
                taxaSelic: '1.1432', //114,32%
                primeiroTeto: '1257.12', //ISENTO
                segundoTeto: '2512.08',
                valorADeduzirSegundoPisoSegundoTeto: '188.57',
                valorADeduzirTerceiroPisoTerceiroTeto: '502.58'
            },
            2007: {
                taxaSelic: '1.0350', //103,50%
                primeiroTeto: '1313.69', //ISENTO
                segundoTeto: '2625.12',
                valorADeduzirSegundoPisoSegundoTeto: '197.05',
                valorADeduzirTerceiroPisoTerceiroTeto: '525.19'
            },
            2008: {
                taxaSelic: '0.9137', //91,37%
                primeiroTeto: '1372.81', //ISENTO
                segundoTeto: '2743.25',
                valorADeduzirSegundoPisoSegundoTeto: '205.92',
                valorADeduzirTerceiroPisoTerceiroTeto: '548.82'
            },
            2009: {
                taxaSelic: '0.8274', //82.74%
                primeiroTeto: '1434.59', //ISENTO
                segundoTeto: '2150.00', //7,5%
                terceiroTeto: '2866.70', //15%
                quartoTeto: '3582.00', //22,5%
                valorADeduzirSegundoPisoSegundoTeto: '107.59',
                valorADeduzirTerceiroPisoTerceiroTeto: '268.84',
                valorADeduzirQuartoPisoQuartoTeto: '483.84',
                valorADeduzirQuintoPiso: '662.94'
            },
            2010: {
                taxaSelic: '0.7276', //72,76%
                primeiroTeto: '1499.15', //ISENTO
                segundoTeto: '2246.75', //7,5%
                terceiroTeto: '2995.70', //15%
                quartoTeto: '3743.19', //22,5%
                valorADeduzirSegundoPisoSegundoTeto: '112.43',
                valorADeduzirTerceiroPisoTerceiroTeto: '280.94',
                valorADeduzirQuartoPisoQuartoTeto: '505.62',
                valorADeduzirQuintoPiso: '692.78'
            },
            2011: {
                taxaSelic: '0.6188', //61,68%
                primeiroTeto: '1566.61', //ISENTO
                segundoTeto: '2347.85', //7,5%
                terceiroTeto: '3130.51', //15%
                quartoTeto: '3911.63', //22,5%
                valorADeduzirSegundoPisoSegundoTeto: '117.49',
                valorADeduzirTerceiroPisoTerceiroTeto: '293.58',
                valorADeduzirQuartoPisoQuartoTeto: '528.37',
                valorADeduzirQuintoPiso: '723.95'
            }
        };

        Object.freeze(this);
    }

    _createClass(DataSource, [{
        key: 'data',
        get: function get() {

            return this._data;
        }
    }]);

    return DataSource;
}();
//# sourceMappingURL=DataSource.js.map