'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const _ = require('lodash');

const errors = require('./errors');

class Scope {
  constructor(provider, options) {
    this.provider = provider;
    this.options = _.defaults(options, {
      setup: false,
      clone: false
    });
  }

  _setupInstance(instance) {
    var _this = this;

    return _asyncToGenerator(function* () {
      const { setup } = _this.options;

      if (setup) {
        if (_.isFunction(setup)) {
          return setup(instance);
        } else {
          throw new errors.Error(`Expected "setup" be to a function but got "${setup}".`);
        }
      }
    })();
  }
}

module.exports = Scope;