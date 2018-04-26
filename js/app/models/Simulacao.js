class Simulacao {

	constructor(anoRecebimento, valorRecebido, numeroDeMeses) {

		this._anoRecebimento = anoRecebimento;
		this._valorRecebido = valorRecebido;
		this._numeroDeMeses = numeroDeMeses;

		this._iniciarConfiguracoesAnos();


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

		return 0.00;
		//return this.irCobrado/this._numeroDeMeses;
	}

	get configuracoesAnos() {

		return this._configuracoesAnos;
	}

	get taxaSelic() {

		return this.configuracoesAnos[this._anoRecebimento].taxaSelic;
	}

	get primeiroPiso() {

		return this.configuracoesAnos[this._anoRecebimento].primeiroPiso;
	}

	get primeiroTeto() {

		return this.configuracoesAnos[this._anoRecebimento].primeiroTeto;
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

		return this.configuracoesAnos[this.anoRecebimento].primeiroTeto;
	}

	get segundoTeto() {

		return this.configuracoesAnos[this.anoRecebimento].segundoTeto;
	}

	get terceiroTeto() {

		return this.configuracoesAnos[this.anoRecebimento].terceiroTeto;
	}

	get aliquotaSegundoPisoSegundoTeto() {

		return this.configuracoesAnos[this.anoRecebimento].aliquotaSegundoPisoSegundoTeto;
	}

	get aliquotaTerceiroPisoTerceiroTeto() {

		return this.configuracoesAnos[this.anoRecebimento].aliquotaTerceiroPisoTerceiroTeto;
	}

	get valorADeduzirSegundoPisoSegundoTeto() {

		return this.configuracoesAnos[this.anoRecebimento].valorADeduzirSegundoPisoSegundoTeto;
	}

	get valorADeduzirTerceiroPisoTerceiroTeto() {

		return this.configuracoesAnos[this.anoRecebimento].valorADeduzirTerceiroPisoTerceiroTeto;
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

    _iniciarConfiguracoesAnos() {

        this._configuracoesAnos = {

            2005: {
            	taxaSelic: '127.45',            
            	primeiroTeto: '1164.00',//ISENTO
            	segundoTeto: '2326.00',
            	valorADeduzirSegundoPisoSegundoTeto: '174.60',
            	valorADeduzirTerceiroPisoTerceiroTeto: '465.35',
            	aliquotaSegundoPisoSegundoTeto: '0.15',
            	aliquotaTerceiroPisoTerceiroTeto: '0.275'                       
            },
            2006: {
            	taxaSelic: '114.32',
            	primeiroTeto: '1257.12',//ISENTO
            	segundoTeto: '2512.08',
            	valorADeduzirSegundoPisoSegundoTeto: '188.57',
            	valorADeduzirTerceiroPisoTerceiroTeto: '502.58',
            	aliquotaSegundoPisoSegundoTeto: '0.15',
            	aliquotaTerceiroPisoTerceiroTeto: '0.275'            	
            },
            2007: {
            	taxaSelic: '103.50',
            	primeiroTeto: '1313.69',//ISENTO
            	segundoTeto: '2625.12',
            	valorADeduzirSegundoPisoSegundoTeto: '197.05',
            	valorADeduzirTerceiroPisoTerceiroTeto: '525.19',
            	aliquotaSegundoPisoSegundoTeto: '0.15',
            	aliquotaTerceiroPisoTerceiroTeto: '0.275'            	
            },
            2008: {
            	taxaSelic: '91.37',
            	primeiroTeto: '1372.81',//ISENTO
            	segundoTeto: '2743.25',
            	valorADeduzirSegundoPisoSegundoTeto: '205.92',
            	valorADeduzirTerceiroPisoTerceiroTeto: '548.82',
            	aliquotaSegundoPisoSegundoTeto: '0.15',
            	aliquotaTerceiroPisoTerceiroTeto: '0.275'            	
            },
            2009: {
            	taxaSelic: '82.74',
            	primeiroTeto: '1434.59',//ISENTO
            	segundoTeto: '2150.00', //7,5%           	
            	terceiroTeto: '2866.70',//15%
            	quartoTeto: '3582.00',  //22,5%  
            	QuintoTeto: '3582.01',  //27,5%    
            	valorADeduzirSegundoTeto: '107.59',
            	valorADeduzirTerceiroTeto: '268.84',
            	valorADeduzirQuartoTeto: '483.84',
            	valorADeduzirQuintoTeto: '662.94'      	
            },
            2010: {
            	taxaSelic: '72.76'
            },
            2011: {
            	taxaSelic: '61.88'
            }
        };
    }

    /**
$rend_trib2 = $rend_trib - $valdepe;
$primeiroTeto = 1903.98;
$segundoPiso = $primeiroTeto + 0.1;
$segundoTeto = 2826.65;
$TerceiroPiso = $segundoTeto + 0.1;
$TerceiroTeto = 3751.05;
$QuartoPiso = $TerceiroTeto + 0.1;
$QuartoTeto = 4664.68;
$QuintoPiso = $QuartoPiso + 0.1;



if($rend_trib2 <= 1903.98){
	$valirpf = "0,00";
	$perifpf = "0%";
}
if($rend_trib2 > 1903.98 && $rend_trib2 <=  2826.65){
	$valirpf = (($rend_trib * 0.075) - 142.8);
	$perifpf = "7,50%"; //aliquota
}
if($rend_trib2 > 2826.65 && $rend_trib2 <=  3751.05){
	$valirpf = (($rend_trib * 0.15) - 354.8);
	$perifpf = "15,0%";
}

if($rend_trib2 > 3751.05 && $rend_trib2 <=  4664.68){
	$valirpf = (($rend_trib * 0.225) - 636.13);
	$perifpf = "22,50%";
}

if($rend_trib2 > 4664.68){
	$valirpf = (($rend_trib2 * 0.275) - 869.36);
	$perifpf = "27,50%";
}    
    */	
}