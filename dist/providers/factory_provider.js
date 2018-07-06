'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

class FactoryProvider {
  constructor(bindName, container, fn, dependencies) {
    this.bindName = bindName;
    this.container = container;
    this.fn = fn;
    this.dependencies = dependencies;
  }

  create() {
    var _this = this;

    return _asyncToGenerator(function* () {
      const dependencies = yield _this.container.resolveAll(_this.dependencies);
      return _this.fn(...dependencies);
    })();
  }
}

module.exports = FactoryProvider;