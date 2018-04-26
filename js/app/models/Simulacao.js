class Simulacao {

	constructor(anoRecebimento, valorRecebido, numeroDeMeses) {

		this._anoRecebimento = anoRecebimento;
		this._valorRecebido = valorRecebido;
		this._numeroDeMeses = numeroDeMeses;

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

	get irCobrado() {

		return 6793.68;
	}

	get novaBaseDeCalculo() {
		
		console.log('IR Cobrado: ' + this._irCobrado );
		console.log('Número de meses: ' + this._numeroDeMeses);
		console.log('Nova Base de Calc.: ' + this._numeroDeMeses/this._numeroDeMeses);
		return this._irCobrado/this._numeroDeMeses;
	}
}