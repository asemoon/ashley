'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var utils = require('../utils');

var FunctionProvider = function () {
  function FunctionProvider(bindName, container, fn, dependencies) {
    _classCallCheck(this, FunctionProvider);

    this.bindName = bindName;
    this.container = container;
    this.fn = fn;
    this.dependencies = dependencies || [];
  }

  _createClass(FunctionProvider, [{
    key: 'create',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _this = this;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt('return', function () {
                  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                    var _fn;

                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                      args[_key] = arguments[_key];
                    }

                    var dependencies, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, dependency;

                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            dependencies = [];
                            _iteratorNormalCompletion = true;
                            _didIteratorError = false;
                            _iteratorError = undefined;
                            _context.prev = 4;
                            _iterator = _this.dependencies[Symbol.iterator]();

                          case 6:
                            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                              _context.next = 20;
                              break;
                            }

                            dependency = _step.value;

                            if (!(dependency === utils._)) {
                              _context.next = 12;
                              break;
                            }

                            dependencies.push(args.shift());
                            _context.next = 17;
                            break;

                          case 12:
                            _context.t0 = dependencies;
                            _context.next = 15;
                            return _this.container.resolve(dependency);

                          case 15:
                            _context.t1 = _context.sent;

                            _context.t0.push.call(_context.t0, _context.t1);

                          case 17:
                            _iteratorNormalCompletion = true;
                            _context.next = 6;
                            break;

                          case 20:
                            _context.next = 26;
                            break;

                          case 22:
                            _context.prev = 22;
                            _context.t2 = _context['catch'](4);
                            _didIteratorError = true;
                            _iteratorError = _context.t2;

                          case 26:
                            _context.prev = 26;
                            _context.prev = 27;

                            if (!_iteratorNormalCompletion && _iterator.return) {
                              _iterator.return();
                            }

                          case 29:
                            _context.prev = 29;

                            if (!_didIteratorError) {
                              _context.next = 32;
                              break;
                            }

                            throw _iteratorError;

                          case 32:
                            return _context.finish(29);

                          case 33:
                            return _context.finish(26);

                          case 34:
                            return _context.abrupt('return', (_fn = _this.fn).call.apply(_fn, [null].concat(dependencies)));

                          case 35:
                          case 'end':
                            return _context.stop();
                        }
                      }
                    }, _callee, _this, [[4, 22, 26, 34], [27,, 29, 33]]);
                  }));

                  return function () {
                    return _ref2.apply(this, arguments);
                  };
                }());

              case 1:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function create() {
        return _ref.apply(this, arguments);
      }

      return create;
    }()
  }]);

  return FunctionProvider;
}();

module.exports = FunctionProvider;