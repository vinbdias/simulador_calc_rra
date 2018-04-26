class Simulacao {

	constructor(anoRecebimento, valorRecebido, numeroDeMeses) {

		this._anoRecebimento = anoRecebimento;
		this._valorRecebido = valorRecebido;
		this._numeroDeMeses = numeroDeMeses;

		this._iniciarDataSource();


		Object.freeze(this);
	}

	get anoRecebimento() {

		return this._anoRecebimento;
	}

	get valorRecebido() {

		return this._valorRecebido;
	}

	get numeroDeMeses() {

		return this._numeroDeMeses;
	}

	get pssRetido() {

		return this._valorRecebido * 0.11;
	}

	get baseDeCalculo() {

		return this._valorRecebido - this.pssRetido;
	}

	get novaBaseDeCalculo() {

		return this.irCobrado/this._numeroDeMeses;
	}

	get taxaSelic() {

		return this._dataSource[this._anoRecebimento].taxaSelic;
	}

	get primeiroTeto() {

		return this._dataSource[this._anoRecebimento].primeiroTeto;
	}

	get irCobradoDevido() {

		if(this._anoRecebimento < 2009) {

			return this._calculoAte2009();
		}
		else {

			return this._calculoAPartirDe2009();
		}
	}

	get irDevido() {

		return this.irCobradoDevido['irDevido'];
	}

	get irCobrado() {

		return this.irCobradoDevido['irCobrado'];
	}

	get primeiroTeto() {

		return this._dataSource[this.anoRecebimento].primeiroTeto;
	}

	get segundoTeto() {

		return this._dataSource[this.anoRecebimento].segundoTeto;
	}

	get terceiroTeto() {

		return this._dataSource[this.anoRecebimento].terceiroTeto;
	}


	get valorADeduzirSegundoPisoSegundoTeto() {

		return this._dataSource[this.anoRecebimento].valorADeduzirSegundoPisoSegundoTeto;
	}

	get valorADeduzirTerceiroPisoTerceiroTeto() {

		return this._dataSource[this.anoRecebimento].valorADeduzirTerceiroPisoTerceiroTeto;
	}

    get aliquotaSegundoPisoSegundoTeto() {

        return this.anoRecebimento < 2009 ? this._dataSource.ate2009.aliquotaSegundoPisoSegundoTeto : this._dataSource.aPartirDe2009.aliquotaSegundoPisoSegundoTeto;
    }

    get aliquotaTerceiroPisoTerceiroTeto() {
        return this.anoRecebimento < 2009 ? this._dataSource.aliquotas.ate2009.aliquotaTerceiroPisoTerceiroTeto : this._dataSource.aliquotas.aPartirDe2009.aliquotaTerceiroPisoTerceiroTeto;
    }

    get aliquotaQuartoPisoQuartoTeto() {

        return this.anoRecebimento < 2009 ? this._dataSource.aliquotas.ate2009.aliquotaQuartoPisoQuartoTeto : this._dataSource.aliquotas.aPartirDe2009.aliquotaQuartoPisoQuartoTeto;
    }

    get aliquotaQuintoPiso() {

        return this.anoRecebimento < 2009 ? this._dataSource.aliquotas.ate2009.aliquotaQuintoPisoQuintoTeto : this._dataSource.aliquotas.aPartirDe2009.aliquotaQuintoPisoQuintoTeto;
    }

	_calculoAte2009()  {

		let irDevido = 0.00;
		let irCobrado = 0.00;

		switch(true) {

			case(this.valorRecebido < (this.primeiroTeto * this.numeroDeMeses)):
				break;

			case((this.primeiroTeto * this.numeroDeMeses) < this.valorRecebido && this.valorRecebido <= (this.segundoTeto * this.numeroDeMeses)):
				irDevido = (this.baseDeCalculo * this.aliquotaSegundoPisoSegundoTeto) - (this.valorADeduzirSegundoPisoSegundoTeto * this.numeroDeMeses);
				irCobrado = (this.baseDeCalculo * this.aliquotaSegundoPisoSegundoTeto) - this.valorADeduzirSegundoPisoSegundoTeto;
				break;

			case((this.segundoTeto * this.numeroDeMeses) < this.valorRecebido):
				irDevido = (this.baseDeCalculo * this.aliquotaTerceiroPisoTerceiroTeto) - (this.valorADeduzirTerceiroPisoTerceiroTeto * this.numeroDeMeses);
				irCobrado = (this.baseDeCalculo * this.aliquotaTerceiroPisoTerceiroTeto) - this.valorADeduzirTerceiroPisoTerceiroTeto;
				break;

			default:
				break;
		}

		return {
			irDevido: irDevido,
			irCobrado: irCobrado
		};
	}

    _calculoAPartirDe2009() {

        let irDevido = 0.00;
        let irCobrado = 0.00;

        switch(true) {

            case(this.valorRecebido < (this.primeiroTeto * this.numeroDeMeses)):
                alert('1');
                break;

            case((this.primeiroTeto * this.numeroDeMeses) < this.valorRecebido && this.valorRecebido <= (this.segundoTeto * this.numeroDeMeses)):
                alert('2');
                irDevido = (this.baseDeCalculo * this.aliquotaSegundoPisoSegundoTeto) - (this.valorADeduzirSegundoPisoSegundoTeto * this.numeroDeMeses);
                irCobrado = (this.baseDeCalculo * this.aliquotaSegundoPisoSegundoTeto) - this.valorADeduzirSegundoPisoSegundoTeto;
                break;

            case((this.segundoTeto * this.numeroDeMeses) < this.valorRecebido && this.valorRecebido <= (this.terceiroTeto * this.numeroDeMeses)):
                alert('3');
                irDevido = (this.baseDeCalculo * this.aliquotaTerceiroPisoTerceiroTeto) - (this.valorADeduzirTerceiroPisoTerceiroTeto * this.numeroDeMeses);
                irCobrado = (this.baseDeCalculo * this.aliquotaTerceiroPisoTerceiroTeto) - this.valorADeduzirTerceiroPisoTerceiroTeto;
                break;

            case((this.terceiroTeto * this.numeroDeMeses) < this.valorRecebido && this.valorRecebido <= (this.quartoTeto * this.numeroDeMeses)):
                alert('4');
                irDevido = (this.baseDeCalculo * this.aliquotaQuartoPisoQuartoTeto) - (this.valorADeduzirQuartoPisoQuartoTeto * this.numeroDeMeses);
                irCobrado = (this.baseDeCalculo * this.aliquotaQuartoPisoQuartoTeto) - this.valorADeduzirQuartoPisoQuartoTeto;
                break;

            case((this.quartoTeto * this.numeroDeMeses) < this.valorRecebido):
                irDevido = (this.baseDeCalculo * this.aliquotaQuintoPiso) - (this.valorADeduzirQuintoPiso * this.numeroDeMeses);
                irCobrado = (this.baseDeCalculo * this.aliquotaQuintoPiso) - this.valorADeduzirQuintoPiso;
                break;

            default:
                break;
        }

        return {
            irDevido: irDevido,
            irCobrado: irCobrado
        };
    }

    _iniciarDataSource() {

        this._dataSource = {
            aliquotas: {
                ate2009: {
                    aliquotaSegundoPisoSegundoTeto: '0.15',
                    aliquotaTerceiroPisoTerceiroTeto: '0.275'
                },
                aPartirDe2009: {
                    aliquotaSegundoPisoSegundoTeto: '0.07',
                    aliquotaTerceiroPisoTerceiroTeto: '0.15',
                    aliquotaQuartoPisoQuartoTeto: '0.225',
                    aliquotaQuintoPiso: '0.275'
                }
            },
            //=SE($C$6<=(1164*$C$8)-0;($C$6*0)-0*$C$8;SE($C$6<=2326*$C$8;SE($C$6>=1164,01*$C$8;($C$6*0,15)-174,6*$C$8;0);SE($C$6>=2326,01*$C$8;($C$6*0,275)-465,35*$C$8;0)))
            2005: {
            	taxaSelic: '127.45',
            	primeiroTeto: '1164.00',//ISENTO
            	segundoTeto: '2326.00',
            	valorADeduzirSegundoPisoSegundoTeto: '174.60',
            	valorADeduzirTerceiroPisoTerceiroTeto: '465.35'
            },
            //  =SE($C$6<=(1257,12*$C$8)-0;($C$6*0)-0*$C$8;SE($C$6<=2512,08*$C$8;SE($C$6>=1257,13*$C$8;($C$6*0,15)-188,57*$C$8;0);SE($C$6>=2512,09*$C$8;($C$6*0,275)-502,58*$C$8;0)))
            2006: {
            	taxaSelic: '114.32',
            	primeiroTeto: '1257.12',//ISENTO
            	segundoTeto: '2512.08',
            	valorADeduzirSegundoPisoSegundoTeto: '188.57',
            	valorADeduzirTerceiroPisoTerceiroTeto: '502.58'
            },
            //=SE($C$6<=(1313,69*$C$8)-0;($C$6*0)-0*$C$8;SE($C$6<=2625,12*$C$8;SE($C$6>=1313,7*$C$8;($C$6*0,15)-197,05*$C$8;0);SE($C$6>=2652,13*$C$8;($C$6*0,275)-525,19*$C$8;0)))
            2007: {
            	taxaSelic: '103.50',
            	primeiroTeto: '1313.69',//ISENTO
            	segundoTeto: '2625.12',
            	valorADeduzirSegundoPisoSegundoTeto: '197.05',
            	valorADeduzirTerceiroPisoTerceiroTeto: '525.19'
            },
            //=SE($C$6<=(1372,81*$C$8)-0;($C$6*0)-0*$C$8;SE($C$6<=2743,25*$C$8;SE($C$6>=1372,82*$C$8;($C$6*0,15)-205,92*$C$8;0);SE($C$6>=2743,26*$C$8;($C$6*0,275)-548,82*$C$8;0)))
            2008: {
            	taxaSelic: '91.37',
            	primeiroTeto: '1372.81',//ISENTO
            	segundoTeto: '2743.25',
            	valorADeduzirSegundoPisoSegundoTeto: '205.92',
            	valorADeduzirTerceiroPisoTerceiroTeto: '548.82'
            },
            //=SE($C$6<=(1434,59*$C$8)-0;($C$6*0)-0*$C$8;SE($C$6<=2150*$C$8;SE($C$6>=1434,6*$C$8;($C$6*0,075)-107,59*$C$8;0);SE($C$6<=2866,7*$C$8;SE($C$6>=2150,01*$C$8;($C$6*0,15)-268,84*$C$8;0);SE($C$6>=2866,71*$C$8;SE($C$6<=3582*$C$8;($C$6*0,225)-483,84*$C$8;SE($C$6>=3582,01*$C$8;($C$6*0,275)-662,94*$C$8;0))))))
            2009: {
            	taxaSelic: '82.74',
            	primeiroTeto: '1434.59',//ISENTO
            	segundoTeto: '2150.00', //7,5%
            	terceiroTeto: '2866.70',//15%
            	quartoTeto: '3582.00',  //22,5%
            	valorADeduzirSegundoPisoSegundoTeto: '107.59',
            	valorADeduzirTerceiroPisoTerceiroTeto: '268.84',
            	valorADeduzirQuartoPisoQuartoTeto: '483.84',
            	valorADeduzirQuintoPiso: '662.94'
            },
            //SE($C$6<=(1499,15*$C$8)-0;($C$6*0)-0*$C$8;SE($C$6<=2246,75*$C$8;SE($C$6>=1499,16*$C$8;($C$6*0,075)-112,43*$C$8;0);SE($C$6<=2995,7*$C$8;SE($C$6>=2246,76*$C$8;($C$6*0,15)-280,94*$C$8;0);SE($C$6>=2995,71*$C$8;SE($C$6<=3743,19*$C$8;($C$6*0,225)-505,62*$C$8;SE($C$6>=3743,2*$C$8;($C$6*0,275)-692,78*$C$8;0))))))
            2010: {
            	taxaSelic: '72.76',
                primeiroTeto: '1434.59',//ISENTO
                segundoTeto: '2150.00', //7,5%
                terceiroTeto: '2866.70',//15%
                quartoTeto: '3582.00',  //22,5%
                valorADeduzirSegundoPisoSegundoTeto: '112.43',
                valorADeduzirTerceiroPisoTerceiroTeto: '280.94',
                valorADeduzirQuartoPisoQuartoTeto: '505.62',
                valorADeduzirQuintoPiso: '692.78'
            },
            //SE($C$6<=(1566,61*$C$8)-0;($C$6*0)-0*$C$8;SE($C$6<=2347,85*$C$8;SE($C$6>=1566,62*$C$8;($C$6*0,075)-117,49*$C$8;0);SE($C$6<=3130,51*$C$8;SE($C$6>=2347,86*$C$8;($C$6*0,15)-293,58*$C$8;0);SE($C$6>=3130,52*$C$8;SE($C$6<=3911,63*$C$8;($C$6*0,225)-528,37*$C$8;SE($C$6>=3911,64*$C$8;($C$6*0,275)-723,95*$C$8;0))))))
            2011: {
            	taxaSelic: '61.88',
                primeiroTeto: '1566.61',//ISENTO
                segundoTeto: '2347.85', //7,5%
                terceiroTeto: '3130.51',//15%
                quartoTeto: '3911.63',  //22,5%
                valorADeduzirSegundoPisoSegundoTeto: '117.49',
                valorADeduzirTerceiroPisoTerceiroTeto: '293.58',
                valorADeduzirQuartoPisoQuartoTeto: '528.37',
                valorADeduzirQuintoPiso: '723.95'
            }
        };
    }
}
