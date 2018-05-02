"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Classe auxiliar de formatação numérica.
 */
var NumeroHelper = function () {
	function NumeroHelper() {
		_classCallCheck(this, NumeroHelper);
	}

	_createClass(NumeroHelper, null, [{
		key: "formataMoeda",
		value: function formataMoeda(valor) {

			var v = valor;
			v = v.replace(/\D/g, ""); //permite digitar apenas números
			v = v.replace(/[0-9]{12}/, "inválido"); //limita pra máximo 999.999.999,99
			v = v.replace(/(\d{1})(\d{8})$/, "$1.$2"); //coloca ponto antes dos últimos 8 digitos
			v = v.replace(/(\d{1})(\d{5})$/, "$1.$2"); //coloca ponto antes dos últimos 5 digitos
			v = v.replace(/(\d{1})(\d{1,2})$/, "$1,$2"); //coloca virgula antes dos últimos 2 digitos
			return v;
		}
	}]);

	return NumeroHelper;
}();