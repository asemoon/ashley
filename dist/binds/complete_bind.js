'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

class CompleteBind {
  constructor(container, name, scope, provider, BindValidator) {
    this._container = container;
    this._name = name;
    this._scope = scope;
    this._provider = provider;
    this._BindValidator = BindValidator;

    this._validated = false;
  }

  get() {
    var _this = this;

    return _asyncToGenerator(function* () {
      _this.validate();
      return _this._scope.get();
    })();
  }

  validate(state) {
    if (!this._validated) {
      new this._BindValidator(this._container, this._name, this._provider.dependencies || []).validate(state);
      this._validated = true;
    }
  }
}

module.exports = CompleteBind;