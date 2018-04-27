class SimulacaoController {

        constructor() {

                let $ = document.querySelector.bind(document);

                this._inputAnoRecebimento = $('#anoRecebimento');
                this._inputValorRecebido = $('#valorRecebido');
                this._inputNumeroDeMeses = $('#numeroDeMeses');

                this._inputPssRetido = $('#pssRetido');
                this._inputBaseDeCalculo = $('#baseDeCalculo');

                this._inputIrDevido = $('#irDevido');
                this._inputIrCobrado = $('#irCobrado');

                this._inputNovaBaseDeCalculo = $('#novaBaseDeCalculo');
                
                this._inputIrARestituir = $('#irARestituir');
                this._inputIrARestituirAtualizado = $('#irARestituirAtualizado');
        }


        executarSimulacoes(event) {

            event.preventDefault();

            this._executarSimulacaoAnoInformado();
            this._executarSimulacaoDe2005A2011();

        }

        _executarSimulacaoAnoInformado() {

            this._simulacao = this._criarSimulacao(this._inputAnoRecebimento.value);

            this._inputPssRetido.value = this._simulacao.pssRetido.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
            this._inputBaseDeCalculo.value = this._simulacao.baseDeCalculo.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
            this._inputNovaBaseDeCalculo.value = this._simulacao.novaBaseDeCalculo.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});

            this._inputIrDevido.value = this._simulacao.irDevido.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
            this._inputIrCobrado.value = this._simulacao.irCobrado.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});  

            this._inputNovaBaseDeCalculo.value = this._simulacao.novaBaseDeCalculo.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
            this._inputIrARestituir.value = this._simulacao.irARestituir.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
            this._inputIrARestituirAtualizado.value = this._simulacao.irARestituirAtualizado.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});

        }

        _executarSimulacaoDe2005A2011() {

            let $ = document.querySelector.bind(document);

            for(let i = 2005; i <= 2011; i++) {

                this._simulacaoLoop = null;

                if(i == this._inputAnoRecebimento.value) {

                    $('#RRADevido' + i).innerHTML = this._simulacao.irDevido.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
                    $('#RRACobrado' + i).innerHTML = this._simulacao.irCobrado.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});

                    continue;
                }
                else {

                    this._simulacaoLoop = this._criarSimulacao(i);

                    $('#RRADevido' + i).innerHTML = this._simulacaoLoop.irDevido.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
                    $('#RRACobrado' + i).innerHTML = this._simulacaoLoop.irCobrado.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});                    
                }                
            }            
        }

        formataValorRecebido(event) {

            this._inputValorRecebido.value = NumeroHelper.formataMoeda(this._inputValorRecebido.value);
        }

        _criarSimulacao(anoInformado) {

            let valorRecebido = this._inputValorRecebido.value.replace('.', '').replace(',', '.');
            
            return new Simulacao(anoInformado, valorRecebido, this._inputNumeroDeMeses.value);
        }
}
