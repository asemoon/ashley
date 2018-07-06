'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
    value: async function create() {
      var _this = this;

      return async function () {
        var _fn;

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var dependencies = [];

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = _this.dependencies[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var dependency = _step.value;

            if (dependency === utils._) {
              dependencies.push(args.shift());
            } else {
              dependencies.push((await _this.container.resolve(dependency)));
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return (_fn = _this.fn).call.apply(_fn, [null].concat(dependencies));
      };
    }
  }]);

  return FunctionProvider;
}();

module.exports = FunctionProvider;