'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var debug = require('debug')('Ashley::Container');
var _ = require('lodash');

var errors = require('./errors');

var Ashley = function () {
  function Ashley(targetResolver, bindFactory, options) {
    _classCallCheck(this, Ashley);

    this._targetResolver = targetResolver;
    this._bindFactory = bindFactory;
    this._options = options;

    this._binds = {};
    this._scopesToDeinitialize = [];
  }

  _createClass(Ashley, [{
    key: 'shutdown',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var i, scope;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                i = this._scopesToDeinitialize.length - 1;

              case 1:
                if (!(i >= 0)) {
                  _context.next = 9;
                  break;
                }

                scope = this._scopesToDeinitialize[i];

                if (!scope.deinitialize) {
                  _context.next = 6;
                  break;
                }

                _context.next = 6;
                return scope.deinitialize();

              case 6:
                i--;
                _context.next = 1;
                break;

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function shutdown() {
        return _ref.apply(this, arguments);
      }

      return shutdown;
    }()
  }, {
    key: 'createChild',
    value: function createChild() {
      var options = _.merge({}, this._options, { parent: this });
      return new Ashley(this._targetResolver, this._bindFactory, options);
    }
  }, {
    key: 'instance',
    value: function instance(name, target, dependencies, options) {
      var resolvedTarget = this._targetResolver.resolve(target);

      var Provider = this._findBindOrThrow('@providers/Instance').get();
      var provider = new Provider(name, this, resolvedTarget, dependencies, options);
      var scope = this._createScope(provider, options);

      var bind = this._bind(name, this._bindFactory.create('Instance', this, name, scope, provider));

      this.factory(name, function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  return _context2.abrupt('return', provider.create());

                case 1:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function instanceFactory() {
          return _ref2.apply(this, arguments);
        }

        return instanceFactory;
      }());

      if (_.get(options, 'deinitialize')) {
        this._scopesToDeinitialize.push(scope);
      }

      return bind;
    }
  }, {
    key: 'object',
    value: function object(name, target, options) {
      var Provider = this._findBindOrThrow('@providers/Object').get();
      var provider = new Provider(name, this, target, options);
      var scope = this._createScope(provider, _.merge({}, options, { scope: 'Clone' }));

      return this._bind(name, this._bindFactory.create('Object', name, scope));
    }
  }, {
    key: 'function',
    value: function _function(name, target, dependencies, options) {
      var resolvedTarget = this._targetResolver.resolve(target);

      var Provider = this._findBindOrThrow('@providers/Function').get();
      var provider = new Provider(name, this, resolvedTarget, dependencies);
      var scope = this._createScope(provider, options);

      return this._bind(name, this._bindFactory.create('Function', this, name, scope, provider));
    }
  }, {
    key: 'factory',
    value: function factory(name, target, dependencies) {
      var resolvedTarget = this._targetResolver.resolve(target);

      var Provider = this._findBindOrThrow('@providers/Factory').get();
      var provider = new Provider(name, this, resolvedTarget, dependencies);

      return this._bind('@factories/' + name, this._bindFactory.create('Factory', this, name, provider));
    }
  }, {
    key: 'link',
    value: function link(name, factoryName, options) {
      var provider = this._findBindOrThrow('@factories/' + factoryName).get();
      var scope = this._createScope(provider, options);
      var bind = this._bind(name, this._bindFactory.create('Link', this, name, scope, provider));

      if (_.get(options, 'deinitialize')) {
        this._scopesToDeinitialize.push(scope);
      }

      return bind;
    }
  }, {
    key: 'provider',
    value: function provider(name, target) {
      var resolvedTarget = this._targetResolver.resolve(target);

      return this._bind('@providers/' + name, this._bindFactory.create('Provider', name, resolvedTarget));
    }
  }, {
    key: 'scope',
    value: function scope(name, target) {
      var resolvedTarget = this._targetResolver.resolve(target);

      return this._bind('@scopes/' + name, this._bindFactory.create('Scope', name, resolvedTarget));
    }
  }, {
    key: 'resolve',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(name) {
        var bind;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                debug('Resolving "' + name + '".');

                bind = this.findBind(name);

                if (!bind) {
                  _context3.next = 4;
                  break;
                }

                return _context3.abrupt('return', bind.get());

              case 4:
                throw new errors.Error('Unable to resolve unbound target "' + name + '".');

              case 5:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function resolve(_x) {
        return _ref3.apply(this, arguments);
      }

      return resolve;
    }()
  }, {
    key: 'resolveAll',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(names) {
        var results, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, name;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                results = [];
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context4.prev = 4;
                _iterator = (names || [])[Symbol.iterator]();

              case 6:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context4.next = 16;
                  break;
                }

                name = _step.value;
                _context4.t0 = results;
                _context4.next = 11;
                return this.resolve(name);

              case 11:
                _context4.t1 = _context4.sent;

                _context4.t0.push.call(_context4.t0, _context4.t1);

              case 13:
                _iteratorNormalCompletion = true;
                _context4.next = 6;
                break;

              case 16:
                _context4.next = 22;
                break;

              case 18:
                _context4.prev = 18;
                _context4.t2 = _context4['catch'](4);
                _didIteratorError = true;
                _iteratorError = _context4.t2;

              case 22:
                _context4.prev = 22;
                _context4.prev = 23;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 25:
                _context4.prev = 25;

                if (!_didIteratorError) {
                  _context4.next = 28;
                  break;
                }

                throw _iteratorError;

              case 28:
                return _context4.finish(25);

              case 29:
                return _context4.finish(22);

              case 30:
                return _context4.abrupt('return', results);

              case 31:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[4, 18, 22, 30], [23,, 25, 29]]);
      }));

      function resolveAll(_x2) {
        return _ref4.apply(this, arguments);
      }

      return resolveAll;
    }()
  }, {
    key: 'validate',
    value: function validate() {
      _.forEach(this._binds, function (bind) {
        if (bind.validate) {
          bind.validate();
        }
      });
    }
  }, {
    key: 'findBind',
    value: function findBind(bindName) {
      var bind = this._binds[bindName];

      if (!bind && this._options.parent) {
        bind = this._options.parent.findBind(bindName);
      }

      return bind;
    }
  }, {
    key: '_createScope',
    value: function _createScope(provider, options) {
      var scopeName = _.get(options, 'scope', 'Singleton');
      var Scope = this._findBindOrThrow('@scopes/' + scopeName).get();

      var scope = new Scope(provider, options);
      return scope;
    }
  }, {
    key: '_findBindOrThrow',
    value: function _findBindOrThrow(bindName) {
      var bind = this.findBind(bindName);

      if (!bind) {
        throw new errors.Error('Unable to find a bind called "' + bindName + '".');
      }

      return bind;
    }
  }, {
    key: '_bind',
    value: function _bind(name, bind) {
      if (this._binds[name]) {
        throw new errors.Error('There\'s already a bind called "' + name + '".');
      }

      this._binds[name] = bind;

      return this.resolve.bind(this, name);
    }
  }]);

  return Ashley;
}();

module.exports = Ashley;