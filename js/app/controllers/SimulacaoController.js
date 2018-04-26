class SimulacaoController {

        constructor() {

                let $ = document.querySelector.bind(document);

                this._inputAnoRecebimento = $('#anoRecebimento');  
                this._inputValorRecebido = $('#valorRecebido'); 
                this._inputNumeroDeMeses = $('#numeroDeMeses');  

                this._inputPssRetido = $('#pssRetido');   
                this._inputBaseDeCalculo = $('#baseDeCalculo');    
                this._inputNovaBaseDeCalculo = $('#novaBaseDeCalculo');
        }


        executarSimulacao(event) {

            event.preventDefault();

            this._simulacao = this._criarSimulacao();
            
            this._inputPssRetido.value = this._simulacao.pssRetido;
            this._inputBaseDeCalculo.value = this._simulacao.baseDeCalculo;
            this._inputNovaBaseDeCalculo.value = this._simulacao.novaBaseDeCalculo;
        }

        _criarSimulacao() {

            return new Simulacao(this._inputAnoRecebimento.value, this._inputValorRecebido.value, this._inputNumeroDeMeses.value);
        }
}