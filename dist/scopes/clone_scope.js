'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
    value: async function get() {
      var instance = await this.provider.create();

      if (this.options.clone) {
        return this._clone(instance);
      }

      return instance;
    }
  }, {
    key: '_clone',
    value: async function _clone(instance) {
      var clone = this.options.clone;


      if (_.isBoolean(clone)) {
        if (clone === true) {
          return _.cloneDeep(instance);
        }
      }

      if (_.isFunction(clone)) {
        return clone(instance);
      }

      throw new errors.Error('Expected "clone" be to a function or a boolean but got "' + clone + '".');
    }
  }]);

  return CloneScope;
}(Scope);

module.exports = CloneScope;