'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CompleteBind = function () {
  function CompleteBind(container, name, scope, provider, BindValidator) {
    _classCallCheck(this, CompleteBind);

    this._container = container;
    this._name = name;
    this._scope = scope;
    this._provider = provider;
    this._BindValidator = BindValidator;

    this._validated = false;
  }

  _createClass(CompleteBind, [{
    key: 'get',
    value: async function get() {
      this.validate();
      return this._scope.get();
    }
  }, {
    key: 'validate',
    value: function validate(state) {
      if (!this._validated) {
        new this._BindValidator(this._container, this._name, this._provider.dependencies || []).validate(state);
        this._validated = true;
      }
    }
  }]);

  return CompleteBind;
}();

module.exports = CompleteBind;