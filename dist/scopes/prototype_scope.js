'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Scope = require('../scope');

class PrototypeScope extends Scope {
  constructor(provider, options) {
    super(provider, options);
    this._instances = [];
  }

  get() {
    var _this = this;

    return _asyncToGenerator(function* () {
      const instance = yield _this.provider.create();
      yield _this._setupInstance(instance);

      if (_this.options.deinitialize) {
        _this._instances.push(instance);
      }

      return instance;
    })();
  }

  deinitialize() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      const instances = _this2._instances;
      _this2._instances = [];

      for (const instance of instances) {
        yield _this2.provider.deinitializeInstance(instance);
      }
    })();
  }
}

module.exports = PrototypeScope;