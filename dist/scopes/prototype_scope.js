'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
    value: async function get() {
      var instance = await this.provider.create();
      await this._setupInstance(instance);

      if (this.options.deinitialize) {
        this._instances.push(instance);
      }

      return instance;
    }
  }, {
    key: 'deinitialize',
    value: async function deinitialize() {
      var instances = this._instances;
      this._instances = [];

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = instances[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var instance = _step.value;

          await this.provider.deinitializeInstance(instance);
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
    }
  }]);

  return PrototypeScope;
}(Scope);

module.exports = PrototypeScope;