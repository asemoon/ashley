'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const utils = require('../utils');

class FunctionProvider {
  constructor(bindName, container, fn, dependencies) {
    this.bindName = bindName;
    this.container = container;
    this.fn = fn;
    this.dependencies = dependencies || [];
  }

  create() {
    var _this = this;

    return _asyncToGenerator(function* () {
      return (() => {
        var _ref = _asyncToGenerator(function* (...args) {
          const dependencies = [];

          for (const dependency of _this.dependencies) {
            if (dependency === utils._) {
              dependencies.push(args.shift());
            } else {
              dependencies.push((yield _this.container.resolve(dependency)));
            }
          }

          return _this.fn.call(null, ...dependencies);
        });

        return function () {
          return _ref.apply(this, arguments);
        };
      })();
    })();
  }
}

module.exports = FunctionProvider;