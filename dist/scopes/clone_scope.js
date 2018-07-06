'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const _ = require('lodash');

const errors = require('../errors');
const Scope = require('../scope');

class CloneScope extends Scope {
  get() {
    var _this = this;

    return _asyncToGenerator(function* () {
      const instance = yield _this.provider.create();

      if (_this.options.clone) {
        return _this._clone(instance);
      }

      return instance;
    })();
  }

  _clone(instance) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      const { clone } = _this2.options;

      if (_.isBoolean(clone)) {
        if (clone === true) {
          return _.cloneDeep(instance);
        }
      }

      if (_.isFunction(clone)) {
        return clone(instance);
      }

      throw new errors.Error(`Expected "clone" be to a function or a boolean but got "${clone}".`);
    })();
  }
}

module.exports = CloneScope;