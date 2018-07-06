'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Scope = require('../scope');

/*
 * Singleton scope makes sure that only one instance of the target object is
 * created within the associated container.
 *
 * Note that the creation process needs to be synchronized. While it's true that
 * Node.js runs user code on a single thread and thus it's not necessary to
 * worry about data races or race conditions in the traditional sense, it's
 * still possible to have synchronization issues when an asynchronous IO is
 * involved (applies to timers, callbacks and others as well).
 *
 * In this particular case, the call to "provider.create()" might be
 * asynchronous. For example, the instance might have an "initialize" method
 * which will attempt to establish a connection to a database. The runtime will
 * handle the case by asking the OS to be notified when the connection is ready
 * and process other items on the event loop in the meantime. However, the next
 * item on the event loop might be another request for the instance. This can
 * happen very easily when the application is starting up. One possible solution
 * (used here) is to create what's essentially a spin lock and wait for the
 * instance to become available. The contract here is that it's up to the
 * programmer to ensure that the "initialize" method succeeds or throws an
 * exception.
 *
 */

var SingletonScope = function (_Scope) {
  _inherits(SingletonScope, _Scope);

  function SingletonScope(provider, options) {
    _classCallCheck(this, SingletonScope);

    var _this = _possibleConstructorReturn(this, (SingletonScope.__proto__ || Object.getPrototypeOf(SingletonScope)).call(this, provider, options));

    _this._instance = null;
    _this._creating = false;
    return _this;
  }

  _createClass(SingletonScope, [{
    key: 'get',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var instance;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this._instance) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt('return', this._instance);

              case 2:
                if (!this._creating) {
                  _context.next = 7;
                  break;
                }

                _context.next = 5;
                return new Promise(function (resolve) {
                  return setTimeout(resolve, 50);
                });

              case 5:
                _context.next = 2;
                break;

              case 7:
                if (this._instance) {
                  _context.next = 23;
                  break;
                }

                this._creating = true;

                _context.prev = 9;
                _context.next = 12;
                return this.provider.create();

              case 12:
                instance = _context.sent;
                _context.next = 15;
                return this._setupInstance(instance);

              case 15:
                this._instance = instance;
                _context.next = 22;
                break;

              case 18:
                _context.prev = 18;
                _context.t0 = _context['catch'](9);

                this._creating = false;
                throw _context.t0;

              case 22:

                this._creating = false;

              case 23:
                return _context.abrupt('return', this._instance);

              case 24:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[9, 18]]);
      }));

      function get() {
        return _ref.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: 'deinitialize',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var instance;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                instance = this._instance;

                this._instance = null;
                return _context2.abrupt('return', this.provider.deinitializeInstance(instance));

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function deinitialize() {
        return _ref2.apply(this, arguments);
      }

      return deinitialize;
    }()
  }]);

  return SingletonScope;
}(Scope);

module.exports = SingletonScope;