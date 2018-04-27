class Simulacao {

	constructor(anoRecebimento, valorRecebido, numeroDeMeses) {

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

    _setDataSource() {

        this._dataSource = {
            aliquotas: {
                ate2009: {
                    aliquotaSegundoPisoSegundoTeto: '0.15', //15%
                    aliquotaTerceiroPisoTerceiroTeto: '0.275' //27,5%
                },
                aPartirDe2009: {
                    aliquotaSegundoPisoSegundoTeto: '0.07', //7%
                    aliquotaTerceiroPisoTerceiroTeto: '0.15', //15%
                    aliquotaQuartoPisoQuartoTeto: '0.225', //22,5%
                    aliquotaQuintoPiso: '0.275' //27,5%
                }
            },
            //=SE($C$6<=(1164*$C$8)-0;($C$6*0)-0*$C$8;SE($C$6<=2326*$C$8;SE($C$6>=1164,01*$C$8;($C$6*0,15)-174,6*$C$8;0);SE($C$6>=2326,01*$C$8;($C$6*0,275)-465,35*$C$8;0)))
            2005: {
                taxaSelic: '1.2745', //127,45%
                primeiroTeto: '1164.00',//ISENTO
                segundoTeto: '2326.00',
                valorADeduzirSegundoPisoSegundoTeto: '174.60',
                valorADeduzirTerceiroPisoTerceiroTeto: '465.35'
            },
            // =SE($C$6<=(1257,12*$C$8)-0;($C$6*0)-0*$C$8;SE($C$6<=2512,08*$C$8;SE($C$6>=1257,13*$C$8;($C$6*0,15)-188,57*$C$8;0);SE($C$6>=2512,09*$C$8;($C$6*0,275)-502,58*$C$8;0)))
            2006: {
                taxaSelic: '1.1432', //114,32%
                primeiroTeto: '1257.12',//ISENTO
                segundoTeto: '2512.08',
                valorADeduzirSegundoPisoSegundoTeto: '188.57',
                valorADeduzirTerceiroPisoTerceiroTeto: '502.58'
            },
            //=SE($C$6<=(1313,69*$C$8)-0;($C$6*0)-0*$C$8;SE($C$6<=2625,12*$C$8;SE($C$6>=1313,7*$C$8;($C$6*0,15)-197,05*$C$8;0);SE($C$6>=2652,13*$C$8;($C$6*0,275)-525,19*$C$8;0)))
            2007: {
                taxaSelic: '1.0350', //103,50%
                primeiroTeto: '1313.69',//ISENTO
                segundoTeto: '2625.12',
                valorADeduzirSegundoPisoSegundoTeto: '197.05',
                valorADeduzirTerceiroPisoTerceiroTeto: '525.19'
            },
            //=SE($C$6<=(1372,81*$C$8)-0;($C$6*0)-0*$C$8;SE($C$6<=2743,25*$C$8;SE($C$6>=1372,82*$C$8;($C$6*0,15)-205,92*$C$8;0);SE($C$6>=2743,26*$C$8;($C$6*0,275)-548,82*$C$8;0)))
            2008: {
                taxaSelic: '0.9137', //91,37%
                primeiroTeto: '1372.81',//ISENTO
                segundoTeto: '2743.25',
                valorADeduzirSegundoPisoSegundoTeto: '205.92',
                valorADeduzirTerceiroPisoTerceiroTeto: '548.82'
            },
            //=SE($C$6<=(1434,59*$C$8)-0;($C$6*0)-0*$C$8;SE($C$6<=2150*$C$8;SE($C$6>=1434,6*$C$8;($C$6*0,075)-107,59*$C$8;0);SE($C$6<=2866,7*$C$8;SE($C$6>=2150,01*$C$8;($C$6*0,15)-268,84*$C$8;0);SE($C$6>=2866,71*$C$8;SE($C$6<=3582*$C$8;($C$6*0,225)-483,84*$C$8;SE($C$6>=3582,01*$C$8;($C$6*0,275)-662,94*$C$8;0))))))
            2009: {
                taxaSelic: '0.8274', //82.74%
                primeiroTeto: '1434.59',//ISENTO
                segundoTeto: '2150.00', //7,5%
                terceiroTeto: '2866.70',//15%
                quartoTeto: '3582.00',  //22,5%
                valorADeduzirSegundoPisoSegundoTeto: '107.59',
                valorADeduzirTerceiroPisoTerceiroTeto: '268.84',
                valorADeduzirQuartoPisoQuartoTeto: '483.84',
                valorADeduzirQuintoPiso: '662.94'
            },
            //=SE($C$6<=(1499,15*$C$8)-0;($C$6*0)-0*$C$8;SE($C$6<=2246,75*$C$8;SE($C$6>=1499,16*$C$8;($C$6*0,075)-112,43*$C$8;0);SE($C$6<=2995,7*$C$8;SE($C$6>=2246,76*$C$8;($C$6*0,15)-280,94*$C$8;0);SE($C$6>=2995,71*$C$8;SE($C$6<=3743,19*$C$8;($C$6*0,225)-505,62*$C$8;SE($C$6>=3743,2*$C$8;($C$6*0,275)-692,78*$C$8;0))))))
            2010: {
                taxaSelic: '0.7276', //72,76%
                primeiroTeto: '1499.15',//ISENTO
                segundoTeto: '2246.75', //7,5%
                terceiroTeto: '2995.70',//15%
                quartoTeto: '3743.19',  //22,5%
                valorADeduzirSegundoPisoSegundoTeto: '112.43',
                valorADeduzirTerceiroPisoTerceiroTeto: '280.94',
                valorADeduzirQuartoPisoQuartoTeto: '505.62',
                valorADeduzirQuintoPiso: '692.78'
            },
            //=SE($C$6<=(1566,61*$C$8)-0;($C$6*0)-0*$C$8;SE($C$6<=2347,85*$C$8;SE($C$6>=1566,62*$C$8;($C$6*0,075)-117,49*$C$8;0);SE($C$6<=3130,51*$C$8;SE($C$6>=2347,86*$C$8;($C$6*0,15)-293,58*$C$8;0);SE($C$6>=3130,52*$C$8;SE($C$6<=3911,63*$C$8;($C$6*0,225)-528,37*$C$8;SE($C$6>=3911,64*$C$8;($C$6*0,275)-723,95*$C$8;0))))))
            2011: {
                taxaSelic: '0.6188', //61,68%
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

    _setBaseDeCalculo() {

        this._pssRetido = this._valorRecebido * 0.11;
        this._baseDeCalculo = this._valorRecebido - this._pssRetido;
    }

    _setTaxaSelic() {

       this._taxaSelic = this._dataSource[this._anoRecebimento].taxaSelic;
    }

    _setAliquotas() {

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

    _setTetos() {

        this._primeiroTeto = this._dataSource[this._anoRecebimento].primeiroTeto;
        this._segundoTeto = this._dataSource[this._anoRecebimento].segundoTeto;        

        if(this._anoRecebimento >= 2009) {

            this._quartoTeto = this._dataSource[this._anoRecebimento].quartoTeto;
            this._terceiroTeto = this._dataSource[this._anoRecebimento].terceiroTeto;
        }        
    } 

    _setValoresADeduzir () {

        this._valorADeduzirSegundoPisoSegundoTeto = this._dataSource[this._anoRecebimento].valorADeduzirSegundoPisoSegundoTeto;        
        this._valorADeduzirTerceiroPisoTerceiroTeto = this._dataSource[this._anoRecebimento].valorADeduzirTerceiroPisoTerceiroTeto;

        if(this._anoRecebimento >= 2009) {

            this._valorADeduzirQuartoPisoQuartoTeto = this._dataSource[this._anoRecebimento].valorADeduzirQuartoPisoQuartoTeto;
            this._valorADeduzirQuintoPiso = this._dataSource[this._anoRecebimento].valorADeduzirQuintoPiso;
        }
    }

    _setIrCobradoDevido() {

        if(this._anoRecebimento < 2009) {

            this._calculoAte2009();
        }
        else {

            this._calculoAPartirDe2009();
        }      
    }

    _setNovaBaseDeCalculo() {

        this._novaBaseDeCalculo = this._baseDeCalculo / this._numeroDeMeses;
    }

    _setIrARestituir() {

        this._irARestituir = this._irCobrado - this._irDevido;
    }

    _setIrARestituirAtualizado() {

        this._irARestituirAtualizado = this._taxaSelic * (2 * this._irARestituir);
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

        return this._aliquotaQuintoPisoQuintoTeto;
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

	_calculoAte2009()  {

		let irDevido = 0.00;
		let irCobrado = 0.00;
                

        if((this._primeiroTeto * this._numeroDeMeses) < this._valorRecebido && this._valorRecebido <= (this._segundoTeto * this._numeroDeMeses)) {
            
            irDevido = (this._baseDeCalculo * this._aliquotaSegundoPisoSegundoTeto) - (this._valorADeduzirSegundoPisoSegundoTeto * this._numeroDeMeses);
            irCobrado = (this._baseDeCalculo * this._aliquotaSegundoPisoSegundoTeto) - this._valorADeduzirSegundoPisoSegundoTeto;            
        }
        else if((this._segundoTeto * this._numeroDeMeses) < this._valorRecebido) {
            
            irDevido = (this._baseDeCalculo * this._aliquotaTerceiroPisoTerceiroTeto) - (this._valorADeduzirTerceiroPisoTerceiroTeto * this._numeroDeMeses);
            irCobrado = (this._baseDeCalculo * this._aliquotaTerceiroPisoTerceiroTeto) - this._valorADeduzirTerceiroPisoTerceiroTeto;                        
        }

        this._irDevido = irDevido;
        this._irCobrado = irCobrado;
	}

    _depuraCalculoAte2009() {

        console.log(this._valorRecebido);

        console.log(this._valorRecebido + ' < ' + (this._primeiroTeto * this._numeroDeMeses));

        console.log((this._primeiroTeto * this._numeroDeMeses) + ' < ' + this._valorRecebido + ' || ' + this._valorRecebido + ' <= ' + (this._segundoTeto * this._numeroDeMeses));        

        console.log((this._segundoTeto * this._numeroDeMeses) + ' < ' + this._valorRecebido);         
    }

    _depuraCalculoAPartirDe2009() {

        console.log(this.valorRecebido);

        console.log(this.valorRecebido + ' < ' + (this.primeiroTeto * this.numeroDeMeses));

        console.log((this.primeiroTeto * this.numeroDeMeses) + ' < ' + this.valorRecebido + ' && ' + this.valorRecebido + ' <= ' + (this.segundoTeto * this.numeroDeMeses));        

        console.log((this.segundoTeto * this.numeroDeMeses) + ' < ' + this.valorRecebido + ' && ' + this.valorRecebido + ' <= ' + (this.terceiroTeto * this.numeroDeMeses));        

        console.log((this.terceiroTeto * this.numeroDeMeses) + ' < ' + this.valorRecebido + ' && ' + this.valorRecebido + ' <= ' + (this.quartoTeto * this.numeroDeMeses));        

        console.log((this.quartoTeto * this.numeroDeMeses) + ' < ' + this.valorRecebido);
    }

    _calculoAPartirDe2009() {

        let irDevido = 0.00;
        let irCobrado = 0.00;


        if((this._primeiroTeto * this._numeroDeMeses) < this._valorRecebido && this._valorRecebido <= (this._segundoTeto * this._numeroDeMeses)) {
            
            irDevido = (this._baseDeCalculo * this._aliquotaSegundoPisoSegundoTeto) - (this._valorADeduzirSegundoPisoSegundoTeto * this._numeroDeMeses);
            irCobrado = (this._baseDeCalculo * this._aliquotaSegundoPisoSegundoTeto) - this._valorADeduzirSegundoPisoSegundoTeto;            
        }
        else if((this._segundoTeto * this._numeroDeMeses) < this._valorRecebido && this._valorRecebido <= (this._terceiroTeto * this._numeroDeMeses)) {

            irDevido = (this._baseDeCalculo * this._aliquotaTerceiroPisoTerceiroTeto) - (this._valorADeduzirTerceiroPisoTerceiroTeto * this._numeroDeMeses);
            irCobrado = (this._baseDeCalculo * this._aliquotaTerceiroPisoTerceiroTeto) - this._valorADeduzirTerceiroPisoTerceiroTeto;            
        }
        else if((this._terceiroTeto * this._numeroDeMeses) < this._valorRecebido && this._valorRecebido <= (this._quartoTeto * this._numeroDeMeses)) {
            
            irDevido = (this._baseDeCalculo * this._aliquotaQuartoPisoQuartoTeto) - (this._valorADeduzirQuartoPisoQuartoTeto * this._numeroDeMeses);
            irCobrado = (this._baseDeCalculo * this._aliquotaQuartoPisoQuartoTeto) - _this.valorADeduzirQuartoPisoQuartoTeto;        
        }
        else if((this._quartoTeto * this._numeroDeMeses) < this._valorRecebido) {
            
            irDevido = (this._baseDeCalculo * this._aliquotaQuintoPiso) - (this._valorADeduzirQuintoPiso * this._numeroDeMeses);
            irCobrado = (this._baseDeCalculo * this._aliquotaQuintoPiso) - this._valorADeduzirQuintoPiso;            
        }

        this._irDevido = irDevido;
        this._irCobrado = irCobrado;
    }

}
