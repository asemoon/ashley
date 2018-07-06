'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var dependencies, instance;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.container.resolveAll(this.dependencies);

              case 2:
                dependencies = _context.sent;
                instance = new (Function.prototype.bind.apply(this.target, [null].concat(_toConsumableArray(dependencies))))();

                if (!this.options.initialize) {
                  _context.next = 7;
                  break;
                }

                _context.next = 7;
                return this._initializeInstance(instance);

              case 7:
                return _context.abrupt('return', instance);

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function create() {
        return _ref.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: 'deinitializeInstance',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(instance) {
        var deinitialize, methodName;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (instance) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt('return');

              case 2:
                deinitialize = this.options.deinitialize;
                methodName = this._lifeCycleMethodName(deinitialize, 'deinitialize');

                if (!instance[methodName]) {
                  _context2.next = 6;
                  break;
                }

                return _context2.abrupt('return', instance[methodName].call(instance));

              case 6:
                throw new errors.Error('Unable to find a method called "' + methodName + '" on an instance of "' + this.bindName + '".');

              case 7:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function deinitializeInstance(_x) {
        return _ref2.apply(this, arguments);
      }

      return deinitializeInstance;
    }()
  }, {
    key: '_initializeInstance',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(instance) {
        var initialize, methodName;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                initialize = this.options.initialize;
                methodName = this._lifeCycleMethodName(initialize, 'initialize');

                if (!instance[methodName]) {
                  _context3.next = 4;
                  break;
                }

                return _context3.abrupt('return', instance[methodName].call(instance));

              case 4:
                throw new errors.Error('Unable to find a method called "' + methodName + '" on an instance of "' + this.bindName + '".');

              case 5:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _initializeInstance(_x2) {
        return _ref3.apply(this, arguments);
      }

      return _initializeInstance;
    }()
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