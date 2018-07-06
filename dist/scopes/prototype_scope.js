'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Scope = require('../scope');

var PrototypeScope = function (_Scope) {
  _inherits(PrototypeScope, _Scope);

  function PrototypeScope(provider, options) {
    _classCallCheck(this, PrototypeScope);

    var _this = _possibleConstructorReturn(this, (PrototypeScope.__proto__ || Object.getPrototypeOf(PrototypeScope)).call(this, provider, options));

    _this._instances = [];
    return _this;
  }

  _createClass(PrototypeScope, [{
    key: 'get',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var instance;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.provider.create();

              case 2:
                instance = _context.sent;
                _context.next = 5;
                return this._setupInstance(instance);

              case 5:

                if (this.options.deinitialize) {
                  this._instances.push(instance);
                }

                return _context.abrupt('return', instance);

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
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
        var instances, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, instance;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                instances = this._instances;

                this._instances = [];

                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context2.prev = 5;
                _iterator = instances[Symbol.iterator]();

              case 7:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context2.next = 14;
                  break;
                }

                instance = _step.value;
                _context2.next = 11;
                return this.provider.deinitializeInstance(instance);

              case 11:
                _iteratorNormalCompletion = true;
                _context2.next = 7;
                break;

              case 14:
                _context2.next = 20;
                break;

              case 16:
                _context2.prev = 16;
                _context2.t0 = _context2['catch'](5);
                _didIteratorError = true;
                _iteratorError = _context2.t0;

              case 20:
                _context2.prev = 20;
                _context2.prev = 21;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 23:
                _context2.prev = 23;

                if (!_didIteratorError) {
                  _context2.next = 26;
                  break;
                }

                throw _iteratorError;

              case 26:
                return _context2.finish(23);

              case 27:
                return _context2.finish(20);

              case 28:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[5, 16, 20, 28], [21,, 23, 27]]);
      }));

      function deinitialize() {
        return _ref2.apply(this, arguments);
      }

      return deinitialize;
    }()
  }]);

  return PrototypeScope;
}(Scope);

module.exports = PrototypeScope;