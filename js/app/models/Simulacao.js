"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Classe responsável pelos dados e regras de negócio de uma simulação.
 */
var Simulacao = function () {

    /**
     * Método construtor
     * @param int anoRecebimento => ano de recebimento.
     * @param float valorRecebido => valor recebido.
     * @param float pssRetido => pss retido.
     * @param numeroDeMeses => número de meses.
     */
    function Simulacao(anoRecebimento, valorRecebido, pssRetido, numeroDeMeses) {
        _classCallCheck(this, Simulacao);

        /**
         * Define os atributos da simulação a partir dos 3 parâmetros informados: anoRecebimento, valorRecebido e numeroDeMeses.
         */
        this._anoRecebimento = anoRecebimento;
        this._valorRecebido = valorRecebido;
        this._pssRetido = pssRetido;
        this._numeroDeMeses = numeroDeMeses;

        this._setDataSource();

        this._setAliquotas();

        this._setTetos();

        this._setValoresADeduzir();

        this._setBaseDeCalculo();

        this._setTaxaSelic();

        this._setIrCobradoDevido();

        this._setNovaBaseDeCalculo();

        this._setIrARestituir();

        this._setIrARestituirAtualizado();

        Object.freeze(this);
    }

    /**
     * Método que define o datasource, a fonte de dados, com a qual a simulação vai trabalhar para definir e calcular seus valores.
     */


    _createClass(Simulacao, [{
        key: "_setDataSource",
        value: function _setDataSource() {

            this._dataSource = new DataSource().data;
        }

        /**
         * Método que define, na simulação instanciada, a base de cálculo, o atributo baseDeCalculo.
         */

    }, {
        key: "_setBaseDeCalculo",
        value: function _setBaseDeCalculo() {

            //this._pssRetido = this._valorRecebido * 0.11;
            this._baseDeCalculo = this._valorRecebido - this._pssRetido;
        }

        /**
         * Método que define, na simulação instanciada, a taxa selic, o atributo taxaSelic.
         */

    }, {
        key: "_setTaxaSelic",
        value: function _setTaxaSelic() {

            this._taxaSelic = this._dataSource[this._anoRecebimento].taxaSelic;
        }

        /**
         * Método que define as alíquotas, a partir do datasource, a serem utilizadas em cálculos da simulação.
         */

    }, {
        key: "_setAliquotas",
        value: function _setAliquotas() {

            /**
             * Até para o ano 2009, temos um domínio de alíquotas. Após 2009, outro.
             */
            if (this._anoRecebimento < 2009) {

                this._aliquotaSegundoPisoSegundoTeto = this._dataSource.aliquotas.ate2009.aliquotaSegundoPisoSegundoTeto;
                this._aliquotaTerceiroPisoTerceiroTeto = this._dataSource.aliquotas.ate2009.aliquotaTerceiroPisoTerceiroTeto;
            } else {

                this._aliquotaSegundoPisoSegundoTeto = this._dataSource.aliquotas.aPartirDe2009.aliquotaSegundoPisoSegundoTeto;
                this._aliquotaTerceiroPisoTerceiroTeto = this._dataSource.aliquotas.aPartirDe2009.aliquotaTerceiroPisoTerceiroTeto;
                this._aliquotaQuartoPisoQuartoTeto = this._dataSource.aliquotas.aPartirDe2009.aliquotaQuartoPisoQuartoTeto;
                this._aliquotaQuintoPiso = this._dataSource.aliquotas.aPartirDe2009.aliquotaQuintoPiso;
            }
        }

        /**
         * Método que define os tetos, a partir do datasource, a serem utilizados em cálculos da simulação.
         */

    }, {
        key: "_setTetos",
        value: function _setTetos() {

            this._primeiroTeto = this._dataSource[this._anoRecebimento].primeiroTeto;
            this._segundoTeto = this._dataSource[this._anoRecebimento].segundoTeto;

            /**
             * Do ano de 2009 para frente, há mais duas faixas, mais dois tetos.
             */
            if (this._anoRecebimento >= 2009) {

                this._quartoTeto = this._dataSource[this._anoRecebimento].quartoTeto;
                this._terceiroTeto = this._dataSource[this._anoRecebimento].terceiroTeto;
            }
        }

        /**
         * Método que define os valores a deduzir, a partir do datasource, de cada faixa.
         */

    }, {
        key: "_setValoresADeduzir",
        value: function _setValoresADeduzir() {

            this._valorADeduzirSegundoPisoSegundoTeto = this._dataSource[this._anoRecebimento].valorADeduzirSegundoPisoSegundoTeto;
            this._valorADeduzirTerceiroPisoTerceiroTeto = this._dataSource[this._anoRecebimento].valorADeduzirTerceiroPisoTerceiroTeto;

            /**
             * De 2009 para frente, há mais duas faixas, mais dois valores a deduzir.
             */
            if (this._anoRecebimento >= 2009) {

                this._valorADeduzirQuartoPisoQuartoTeto = this._dataSource[this._anoRecebimento].valorADeduzirQuartoPisoQuartoTeto;
                this._valorADeduzirQuintoPiso = this._dataSource[this._anoRecebimento].valorADeduzirQuintoPiso;
            }
        }

        /**
         * Método que calcula o IR cobrado e devido.
         */

    }, {
        key: "_setIrCobradoDevido",
        value: function _setIrCobradoDevido() {

            /**
             * Até 2009 é um cálculo. A partir de 2009, outro.
             */
            if (this._anoRecebimento < 2009) {

                this._calculoAte2009();
            } else {

                this._calculoAPartirDe2009();
            }
        }

        /**
         * Método que define a nova base de cálculo da simulação.
         */

    }, {
        key: "_setNovaBaseDeCalculo",
        value: function _setNovaBaseDeCalculo() {

            this._novaBaseDeCalculo = this._baseDeCalculo / this._numeroDeMeses;
        }

        /**
         * Método que define o IR a ser restituido.
         */

    }, {
        key: "_setIrARestituir",
        value: function _setIrARestituir() {

            this._irARestituir = this._irCobrado - this._irDevido;
        }

        /**
         * Método que define o IR a reduzir atualizado.
         */

    }, {
        key: "_setIrARestituirAtualizado",
        value: function _setIrARestituirAtualizado() {

            this._irARestituirAtualizado = this._irARestituir + this._irARestituir * this._taxaSelic;
        }

        /**
         * Getters. Métodos pelos quais acessaremos no controlador, os atributos de uma simulação.
         */

    }, {
        key: "_calculoAte2009",


        /**
         * Método que executa os cálculos de IR cobrado e devido de uma simulação até o ano de 2009.
         */
        value: function _calculoAte2009() {

            var irDevido = 0.00;
            var irCobrado = 0.00;

            if (this._primeiroTeto * this._numeroDeMeses >= this._baseDeCalculo) {

                irCobrado = this._baseDeCalculo * this._aliquotaTerceiroPisoTerceiroTeto - this._valorADeduzirTerceiroPisoTerceiroTeto;
            } else if (this._primeiroTeto * this._numeroDeMeses < this._baseDeCalculo && this._baseDeCalculo <= this._segundoTeto * this._numeroDeMeses) {

                irDevido = this._baseDeCalculo * this._aliquotaSegundoPisoSegundoTeto - this._valorADeduzirSegundoPisoSegundoTeto * this._numeroDeMeses;
                irCobrado = this._baseDeCalculo * this._aliquotaTerceiroPisoTerceiroTeto - this._valorADeduzirTerceiroPisoTerceiroTeto;
            } else if (this._segundoTeto * this._numeroDeMeses < this._baseDeCalculo) {

                irDevido = this._baseDeCalculo * this._aliquotaTerceiroPisoTerceiroTeto - this._valorADeduzirTerceiroPisoTerceiroTeto * this._numeroDeMeses;
                irCobrado = this._baseDeCalculo * this._aliquotaTerceiroPisoTerceiroTeto - this._valorADeduzirTerceiroPisoTerceiroTeto;
            }

            this._irDevido = irDevido;
            this._irCobrado = irCobrado;
        }

        /**
         * Método que executa os cálculos de IR cobrado e devido de uma simulação a partir de 2009.
         */

    }, {
        key: "_calculoAPartirDe2009",
        value: function _calculoAPartirDe2009() {

            var irDevido = 0.00;
            var irCobrado = 0.00;

            if (this._primeiroTeto * this._numeroDeMeses >= this._baseDeCalculo) {

                irCobrado = this._baseDeCalculo * this._aliquotaQuintoPiso - this._valorADeduzirQuintoPiso;
            } else if (this._primeiroTeto * this._numeroDeMeses < this._baseDeCalculo && this._baseDeCalculo <= this._segundoTeto * this._numeroDeMeses) {

                irDevido = this._baseDeCalculo * this._aliquotaSegundoPisoSegundoTeto - this._valorADeduzirSegundoPisoSegundoTeto * this._numeroDeMeses;
                irCobrado = this._baseDeCalculo * this._aliquotaQuintoPiso - this._valorADeduzirQuintoPiso;
            } else if (this._segundoTeto * this._numeroDeMeses < this._baseDeCalculo && this._baseDeCalculo <= this._terceiroTeto * this._numeroDeMeses) {

                irDevido = this._baseDeCalculo * this._aliquotaTerceiroPisoTerceiroTeto - this._valorADeduzirTerceiroPisoTerceiroTeto * this._numeroDeMeses;
                irCobrado = this._baseDeCalculo * this._aliquotaQuintoPiso - this._valorADeduzirQuintoPiso;
            } else if (this._terceiroTeto * this._numeroDeMeses < this._baseDeCalculo && this._baseDeCalculo <= this._quartoTeto * this._numeroDeMeses) {

                irDevido = this._baseDeCalculo * this._aliquotaQuartoPisoQuartoTeto - this._valorADeduzirQuartoPisoQuartoTeto * this._numeroDeMeses;
                irCobrado = this._baseDeCalculo * this._aliquotaQuintoPiso - this._valorADeduzirQuintoPiso;
            } else if (this._quartoTeto * this._numeroDeMeses < this._baseDeCalculo) {

                irDevido = this._baseDeCalculo * this._aliquotaQuintoPiso - this._valorADeduzirQuintoPiso * this._numeroDeMeses;
                irCobrado = this._baseDeCalculo * this._aliquotaQuintoPiso - this._valorADeduzirQuintoPiso;
            }

            this._irDevido = irDevido;
            this._irCobrado = irCobrado;
        }
    }, {
        key: "anoRecebimento",
        get: function get() {

            return this._anoRecebimento;
        }
    }, {
        key: "valorRecebido",
        get: function get() {

            return this._valorRecebido;
        }
    }, {
        key: "numeroDeMeses",
        get: function get() {

            return this._numeroDeMeses;
        }
    }, {
        key: "primeiroTeto",
        get: function get() {

            return this._primeiroTeto;
        }
    }, {
        key: "segundoTeto",
        get: function get() {

            return this._segundoTeto;
        }
    }, {
        key: "terceiroTeto",
        get: function get() {

            return this._terceiroTeto;
        }
    }, {
        key: "quartoTeto",
        get: function get() {

            return this._quartoTeto;
        }
    }, {
        key: "pssRetido",
        get: function get() {

            return this._pssRetido;
        }
    }, {
        key: "baseDeCalculo",
        get: function get() {

            return this._baseDeCalculo;
        }
    }, {
        key: "taxaSelic",
        get: function get() {

            return this._taxaSelic;
        }
    }, {
        key: "valorADeduzirSegundoPisoSegundoTeto",
        get: function get() {

            return this._valorADeduzirSegundoPisoSegundoTeto;
        }
    }, {
        key: "valorADeduzirTerceiroPisoTerceiroTeto",
        get: function get() {

            return this._valorADeduzirTerceiroPisoTerceiroTeto;
        }
    }, {
        key: "valorADeduzirQuartoPisoQuartoTeto",
        get: function get() {

            return this._valorADeduzirQuartoPisoQuartoTeto;
        }
    }, {
        key: "aliquotaSegundoPisoSegundoTeto",
        get: function get() {

            return this._aliquotaSegundoPisoSegundoTeto;
        }
    }, {
        key: "aliquotaTerceiroPisoTerceiroTeto",
        get: function get() {

            return this._aliquotaTerceiroPisoTerceiroTeto;
        }
    }, {
        key: "aliquotaQuartoPisoQuartoTeto",
        get: function get() {

            return this._aliquotaQuartoPisoQuartoTeto;
        }
    }, {
        key: "aliquotaQuintoPiso",
        get: function get() {

            return this._aliquotaQuintoPiso;
        }
    }, {
        key: "irDevido",
        get: function get() {

            return this._irDevido;
        }
    }, {
        key: "irCobrado",
        get: function get() {

            return this._irCobrado;
        }
    }, {
        key: "novaBaseDeCalculo",
        get: function get() {

            return this._novaBaseDeCalculo;
        }
    }, {
        key: "irARestituir",
        get: function get() {

            return this._irARestituir;
        }
    }, {
        key: "irARestituirAtualizado",
        get: function get() {

            return this._irARestituirAtualizado;
        }
    }]);

    return Simulacao;
}();
//# sourceMappingURL=Simulacao.js.map