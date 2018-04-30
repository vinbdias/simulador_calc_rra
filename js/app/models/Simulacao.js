/**
 * Classe responsável pelos dados e regras de negócio de uma simulação.
 */
class Simulacao {

    /**
     * Método construtor
     * @param int anoRecebimento => ano de recebimento.
     * @param float valorRecebido => valor recebido.
     * @param numeroDeMeses => número de meses.
     */
	constructor(anoRecebimento, valorRecebido, numeroDeMeses) {

        /**
         * Define os atributos da simulação a partir dos 3 parâmetros informados: anoRecebimento, valorRecebido e numeroDeMeses.
         */
		this._anoRecebimento = anoRecebimento;
		this._valorRecebido = valorRecebido;
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
    _setDataSource() {

        this._dataSource = new DataSource().data;
    }

    /**
     * Método que define, na simulação instanciada, a base de cálculo, o atributo baseDeCalculo.
     */
    _setBaseDeCalculo() {

        this._pssRetido = this._valorRecebido * 0.11;
        this._baseDeCalculo = this._valorRecebido - this._pssRetido;
    }

    /**
     * Método que define, na simulação instanciada, a taxa selic, o atributo taxaSelic.
     */
    _setTaxaSelic() {

       this._taxaSelic = this._dataSource[this._anoRecebimento].taxaSelic;
    }

    /**
     * Método que define as alíquotas, a partir do datasource, a serem utilizadas em cálculos da simulação.
     */
    _setAliquotas() {

        /**
         * Até para o ano 2009, temos um domínio de alíquotas. Após 2009, outro.
         */
        if(this._anoRecebimento < 2009) {

            this._aliquotaSegundoPisoSegundoTeto = this._dataSource.aliquotas.ate2009.aliquotaSegundoPisoSegundoTeto;
            this._aliquotaTerceiroPisoTerceiroTeto = this._dataSource.aliquotas.ate2009.aliquotaTerceiroPisoTerceiroTeto;
        }
        else {

            this._aliquotaSegundoPisoSegundoTeto = this._dataSource.aliquotas.aPartirDe2009.aliquotaSegundoPisoSegundoTeto;
            this._aliquotaTerceiroPisoTerceiroTeto = this._dataSource.aliquotas.aPartirDe2009.aliquotaTerceiroPisoTerceiroTeto;
            this._aliquotaQuartoPisoQuartoTeto = this._dataSource.aliquotas.aPartirDe2009.aliquotaQuartoPisoQuartoTeto;
            this._aliquotaQuintoPiso = this._dataSource.aliquotas.aPartirDe2009.aliquotaQuintoPiso;
        }
    }

    /**
     * Método que define os tetos, a partir do datasource, a serem utilizados em cálculos da simulação.
     */
    _setTetos() {

        this._primeiroTeto = this._dataSource[this._anoRecebimento].primeiroTeto;
        this._segundoTeto = this._dataSource[this._anoRecebimento].segundoTeto;

        /**
         * Do ano de 2009 para frente, há mais duas faixas, mais dois tetos.
         */
        if(this._anoRecebimento >= 2009) {

            this._quartoTeto = this._dataSource[this._anoRecebimento].quartoTeto;
            this._terceiroTeto = this._dataSource[this._anoRecebimento].terceiroTeto;
        }
    }

    /**
     * Método que define os valores a deduzir, a partir do datasource, de cada faixa.
     */
    _setValoresADeduzir () {

        this._valorADeduzirSegundoPisoSegundoTeto = this._dataSource[this._anoRecebimento].valorADeduzirSegundoPisoSegundoTeto;
        this._valorADeduzirTerceiroPisoTerceiroTeto = this._dataSource[this._anoRecebimento].valorADeduzirTerceiroPisoTerceiroTeto;

        /**
         * De 2009 para frente, há mais duas faixas, mais dois valores a deduzir.
         */
        if(this._anoRecebimento >= 2009) {

            this._valorADeduzirQuartoPisoQuartoTeto = this._dataSource[this._anoRecebimento].valorADeduzirQuartoPisoQuartoTeto;
            this._valorADeduzirQuintoPiso = this._dataSource[this._anoRecebimento].valorADeduzirQuintoPiso;
        }
    }

    /**
     * Método que calcula o IR cobrado e devido.
     */
    _setIrCobradoDevido() {

        /**
         * Até 2009 é um cálculo. A partir de 2009, outro.
         */
        if(this._anoRecebimento < 2009) {

            this._calculoAte2009();
        }
        else {

            this._calculoAPartirDe2009();
        }
    }

    /**
     * Método que define a nova base de cálculo da simulação.
     */
    _setNovaBaseDeCalculo() {

        this._novaBaseDeCalculo = this._baseDeCalculo / this._numeroDeMeses;
    }

    /**
     * Método que define o IR a ser restituido.
     */
    _setIrARestituir() {

        this._irARestituir = this._irCobrado - this._irDevido;
    }

    /**
     * Método que define o IR a reduzir atualizado.
     */
    _setIrARestituirAtualizado() {

        this._irARestituirAtualizado = this._irARestituir + (this._irARestituir * this._taxaSelic);
    }

    /**
     * Getters. Métodos pelos quais acessaremos no controlador, os atributos de uma simulação.
     */
    get anoRecebimento() {

        return this._anoRecebimento;
    }

    get valorRecebido() {

        return this._valorRecebido;
    }

    get numeroDeMeses() {

        return this._numeroDeMeses;
    }

    get primeiroTeto() {

        return this._primeiroTeto;
    }

    get segundoTeto() {

        return this._segundoTeto;
    }

    get terceiroTeto() {

        return this._terceiroTeto;
    }

    get quartoTeto() {

        return this._quartoTeto;
    }

	get pssRetido() {

		return this._pssRetido;
	}

	get baseDeCalculo() {

		return this._baseDeCalculo;
	}

	get taxaSelic() {

		return this._taxaSelic;
	}


	get valorADeduzirSegundoPisoSegundoTeto() {

		return this._valorADeduzirSegundoPisoSegundoTeto;
	}

	get valorADeduzirTerceiroPisoTerceiroTeto() {

		return this._valorADeduzirTerceiroPisoTerceiroTeto;
	}

    get valorADeduzirQuartoPisoQuartoTeto() {

        return this._valorADeduzirQuartoPisoQuartoTeto;
    }

    get aliquotaSegundoPisoSegundoTeto() {

        return this._aliquotaSegundoPisoSegundoTeto;
    }

    get aliquotaTerceiroPisoTerceiroTeto() {

        return this._aliquotaTerceiroPisoTerceiroTeto;
    }

    get aliquotaQuartoPisoQuartoTeto() {

        return this._aliquotaQuartoPisoQuartoTeto;
    }

    get aliquotaQuintoPiso() {

        return this._aliquotaQuintoPiso;
    }

    get irDevido() {

        return this._irDevido;
    }

    get irCobrado() {

        return this._irCobrado;
    }

    get novaBaseDeCalculo() {

        return this._novaBaseDeCalculo;
    }

    get irARestituir() {

        return this._irARestituir;
    }

    get irARestituirAtualizado() {

        return this._irARestituirAtualizado;
    }

    /**
     * Método que executa os cálculos de IR cobrado e devido de uma simulação até o ano de 2009.
     */
	_calculoAte2009()  {

		let irDevido = 0.00;
		let irCobrado = 0.00;

        if((this._primeiroTeto * this._numeroDeMeses) < this._baseDeCalculo && this._baseDeCalculo <= (this._segundoTeto * this._numeroDeMeses)) {

            irDevido = (this._baseDeCalculo * this._aliquotaSegundoPisoSegundoTeto) - (this._valorADeduzirSegundoPisoSegundoTeto * this._numeroDeMeses);
            irCobrado = (this._baseDeCalculo * this._aliquotaTerceiroPisoTerceiroTeto) - this._valorADeduzirTerceiroPisoTerceiroTeto;
        }
        else if((this._segundoTeto * this._numeroDeMeses) < this._baseDeCalculo) {

            irDevido = (this._baseDeCalculo * this._aliquotaTerceiroPisoTerceiroTeto) - (this._valorADeduzirTerceiroPisoTerceiroTeto * this._numeroDeMeses);
            irCobrado = (this._baseDeCalculo * this._aliquotaTerceiroPisoTerceiroTeto) - this._valorADeduzirTerceiroPisoTerceiroTeto;
        }

        this._irDevido = irDevido;
        this._irCobrado = irCobrado;
	}

    /**
     * Método que executa os cálculos de IR cobrado e devido de uma simulação a partir de 2009.
     */
    _calculoAPartirDe2009() {

        let irDevido = 0.00;
        let irCobrado = 0.00;        
        
        if((this._primeiroTeto * this._numeroDeMeses) < this._baseDeCalculo && this._baseDeCalculo <= (this._segundoTeto * this._numeroDeMeses)) {
            
            irDevido = (this._baseDeCalculo * this._aliquotaSegundoPisoSegundoTeto) - (this._valorADeduzirSegundoPisoSegundoTeto * this._numeroDeMeses);
            irCobrado = (this._baseDeCalculo * this._aliquotaQuintoPiso) - this._valorADeduzirQuintoPiso;
        }
        else if((this._segundoTeto * this._numeroDeMeses) < this._baseDeCalculo && this._baseDeCalculo <= (this._terceiroTeto * this._numeroDeMeses)) {
            
            irDevido = (this._baseDeCalculo * this._aliquotaTerceiroPisoTerceiroTeto) - (this._valorADeduzirTerceiroPisoTerceiroTeto * this._numeroDeMeses);
            irCobrado = (this._baseDeCalculo * this._aliquotaQuintoPiso) - this._valorADeduzirQuintoPiso;
        }
        else if((this._terceiroTeto * this._numeroDeMeses) < this._baseDeCalculo && this._baseDeCalculo <= (this._quartoTeto * this._numeroDeMeses)) {
            
            irDevido = (this._baseDeCalculo * this._aliquotaQuartoPisoQuartoTeto) - (this._valorADeduzirQuartoPisoQuartoTeto * this._numeroDeMeses);
            irCobrado = (this._baseDeCalculo * this._aliquotaQuintoPiso) - this._valorADeduzirQuintoPiso;
        }
        else if((this._quartoTeto * this._numeroDeMeses) < this._baseDeCalculo) {

            irDevido = (this._baseDeCalculo * this._aliquotaQuintoPiso) - (this._valorADeduzirQuintoPiso * this._numeroDeMeses);
            irCobrado = (this._baseDeCalculo * this._aliquotaQuintoPiso) - this._valorADeduzirQuintoPiso;
        }

        this._irDevido = irDevido;
        this._irCobrado = irCobrado;
    }

}
