'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const _ = require('lodash');

const errors = require('../errors');

class InstanceProvider {
  constructor(bindName, container, target, dependencies, options) {
    this.bindName = bindName;
    this.container = container;
    this.target = target;
    this.dependencies = dependencies;

    this.options = _.defaults(options, {
      initialize: false
    });
  }

  create() {
    var _this = this;

    return _asyncToGenerator(function* () {
      const dependencies = yield _this.container.resolveAll(_this.dependencies);
      const instance = new _this.target(...dependencies);

      if (_this.options.initialize) {
        yield _this._initializeInstance(instance);
      }

      return instance;
    })();
  }

  deinitializeInstance(instance) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      if (!instance) {
        return;
      }

      const { deinitialize } = _this2.options;
      const methodName = _this2._lifeCycleMethodName(deinitialize, 'deinitialize');

      if (instance[methodName]) {
        return instance[methodName].call(instance);
      }

      throw new errors.Error(`Unable to find a method called "${methodName}" on an instance of "${_this2.bindName}".`);
    })();
  }

  _initializeInstance(instance) {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      const { initialize } = _this3.options;
      const methodName = _this3._lifeCycleMethodName(initialize, 'initialize');

      if (instance[methodName]) {
        return instance[methodName].call(instance);
      }

      throw new errors.Error(`Unable to find a method called "${methodName}" on an instance of "${_this3.bindName}".`);
    })();
  }

  _lifeCycleMethodName(value, defaultValue) {
    if (value === true) {
      return defaultValue;
    }
    return value;
  }
}

module.exports = InstanceProvider;