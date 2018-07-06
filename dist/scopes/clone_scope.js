'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ = require('lodash');

var errors = require('../errors');
var Scope = require('../scope');

var CloneScope = function (_Scope) {
  _inherits(CloneScope, _Scope);

  function CloneScope() {
    _classCallCheck(this, CloneScope);

    return _possibleConstructorReturn(this, (CloneScope.__proto__ || Object.getPrototypeOf(CloneScope)).apply(this, arguments));
  }

  _createClass(CloneScope, [{
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

                if (!this.options.clone) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt('return', this._clone(instance));

              case 5:
                return _context.abrupt('return', instance);

              case 6:
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
    key: '_clone',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(instance) {
        var clone;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                clone = this.options.clone;

                if (!_.isBoolean(clone)) {
                  _context2.next = 4;
                  break;
                }

                if (!(clone === true)) {
                  _context2.next = 4;
                  break;
                }

                return _context2.abrupt('return', _.cloneDeep(instance));

              case 4:
                if (!_.isFunction(clone)) {
                  _context2.next = 6;
                  break;
                }

                return _context2.abrupt('return', clone(instance));

              case 6:
                throw new errors.Error('Expected "clone" be to a function or a boolean but got "' + clone + '".');

              case 7:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _clone(_x) {
        return _ref2.apply(this, arguments);
      }

      return _clone;
    }()
  }]);

  return CloneScope;
}(Scope);

module.exports = CloneScope;