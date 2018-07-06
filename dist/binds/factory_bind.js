'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FactoryBind = function () {
  function FactoryBind(container, name, provider, BindValidator) {
    _classCallCheck(this, FactoryBind);

    this._container = container;
    this._name = name;
    this._provider = provider;
    this._BindValidator = BindValidator;
  }

  _createClass(FactoryBind, [{
    key: 'get',
    value: function get() {
      this.validate();
      return this._provider;
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

  return FactoryBind;
}();

module.exports = FactoryBind;