/**
 * Classe do controlador da simulação. Responsável por "amarrar" todas as interações da tela.
 */
class SimulacaoController {

        /**
         * Método construtor
         */
        constructor() {
                /**
                 * Cria um apelido para seletor do DOM. Como o $ do jQuery.
                 */
                let $ = document.querySelector.bind(document);

                /**
                 * Captura os inputs da tela para futuros controles.
                 */
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

        /**
         * Método que formata o valor do campo '#valorRecebido', mediante um evento da página.
         */
        formataValorRecebido() {

            this._inputValorRecebido.value = NumeroHelper.formataMoeda(this._inputValorRecebido.value);
        }


        /**
         * Método que executa as simulações da página.
         * @param Event event => evento que acionou a execução das simulações.
         */
        executarSimulacoes(event) {

            /**
             * Evita a execução padrão do evento para que se tenha total controle da execução.
             */
            event.preventDefault();

            /**
             * Chama os métodos de exeução das simulações do ano informado e dos outros.
             */
            this._executarSimulacaoAnoInformado();
            this._executarSimulacaoDe2005A2011();

        }

        /**
         * Método que executa a simulação do ano informado na tela.
         */
        _executarSimulacaoAnoInformado() {

            /**
             * Cria uma simulação a partir do ano informado no input '#anoRecebimento', já obtendo todos os dados a serem exibidos nos campos vazios da tela.
             */
            this._simulacao = this._criarSimulacao(this._inputAnoRecebimento.value);

            /**
             * Imprime os dados nos respectivos inputs, formatando como valor moeda BRL (R$).
             */
            this._inputPssRetido.value = this._simulacao.pssRetido.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
            this._inputBaseDeCalculo.value = this._simulacao.baseDeCalculo.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
            this._inputNovaBaseDeCalculo.value = this._simulacao.novaBaseDeCalculo.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});

            this._inputIrDevido.value = this._simulacao.irDevido.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
            this._inputIrCobrado.value = this._simulacao.irCobrado.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});

            this._inputNovaBaseDeCalculo.value = this._simulacao.novaBaseDeCalculo.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
            this._inputIrARestituir.value = this._simulacao.irARestituir.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
            this._inputIrARestituirAtualizado.value = this._simulacao.irARestituirAtualizado.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});

        }

        /**
         * Método que executa as simulações restantes, de 2005 a 2009, pulando a do ano informado, pois esta já foi executada pelo método _executarSimulacaoAnoInformado.
         */
        _executarSimulacaoDe2005A2011() {

            /**
             * Cria um apelido para seletor do DOM. Como o $ do jQuery.
             */
            let $ = document.querySelector.bind(document);

            /**
             * Inicializa o loop para os anos restantes.
             */
            for(let i = 2005; i <= 2011; i++) {

                /**
                 * Inicializa a simulação do loop vazia.
                 */
                this._simulacaoLoop = null;

                /**
                 * Verifica se a iteração do laço se refere à simulação já criada.
                 */
                if(i == this._inputAnoRecebimento.value) {

                    /**
                     * Imprime os valores na tabela a partir da simulação já criada.
                     */
                    $('#RRADevido' + i).innerHTML = this._simulacao.irDevido.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
                    $('#RRACobrado' + i).innerHTML = this._simulacao.irCobrado.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});

                    continue;
                }
                else {

                    /**
                     * Cria a simulação a partir da iteração do laço, correspondente a um dos anos (2005 a 2009).
                     */
                    this._simulacaoLoop = this._criarSimulacao(i);

                    $('#RRADevido' + i).innerHTML = this._simulacaoLoop.irDevido.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
                    $('#RRACobrado' + i).innerHTML = this._simulacaoLoop.irCobrado.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
                }
            }
        }

        /**
         * Cria simulação a partir de um ano informado.
         * @param int anoInformado => ano informado. Necessário para parametrização da simulação no modelo.
         */
        _criarSimulacao(anoInformado) {

            let valorRecebido = this._inputValorRecebido.value.replace('.', '').replace(',', '.');

            return new Simulacao(anoInformado, valorRecebido, this._inputNumeroDeMeses.value);
        }

}
