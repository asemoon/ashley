'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

class ObjectProvider {
  constructor(bindName, container, target, options) {
    this.bindName = bindName;
    this._container = container;
    this._target = target;
    this._options = options;
  }

  create() {
    var _this = this;

    return _asyncToGenerator(function* () {
      return _this._target;
    })();
  }
}

module.exports = ObjectProvider;