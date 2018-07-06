'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ = require('lodash');

var errors = require('../errors');

var InstanceProvider = function () {
  function InstanceProvider(bindName, container, target, dependencies, options) {
    _classCallCheck(this, InstanceProvider);

    this.bindName = bindName;
    this.container = container;
    this.target = target;
    this.dependencies = dependencies;

    this.options = _.defaults(options, {
      initialize: false
    });
  }

  _createClass(InstanceProvider, [{
    key: 'create',
    value: async function create() {
      var dependencies = await this.container.resolveAll(this.dependencies);
      var instance = new (Function.prototype.bind.apply(this.target, [null].concat(_toConsumableArray(dependencies))))();

      if (this.options.initialize) {
        await this._initializeInstance(instance);
      }

      return instance;
    }
  }, {
    key: 'deinitializeInstance',
    value: async function deinitializeInstance(instance) {
      if (!instance) {
        return;
      }

      var deinitialize = this.options.deinitialize;

      var methodName = this._lifeCycleMethodName(deinitialize, 'deinitialize');

      if (instance[methodName]) {
        return instance[methodName].call(instance);
      }

      throw new errors.Error('Unable to find a method called "' + methodName + '" on an instance of "' + this.bindName + '".');
    }
  }, {
    key: '_initializeInstance',
    value: async function _initializeInstance(instance) {
      var initialize = this.options.initialize;

      var methodName = this._lifeCycleMethodName(initialize, 'initialize');

      if (instance[methodName]) {
        return instance[methodName].call(instance);
      }

      throw new errors.Error('Unable to find a method called "' + methodName + '" on an instance of "' + this.bindName + '".');
    }
  }, {
    key: '_lifeCycleMethodName',
    value: function _lifeCycleMethodName(value, defaultValue) {
      if (value === true) {
        return defaultValue;
      }
      return value;
    }
  }]);

  return InstanceProvider;
}();

module.exports = InstanceProvider;