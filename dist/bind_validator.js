'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var State = require('./state');
var utils = require('./utils');
var errors = require('./errors');

var BindValidator = function () {
  function BindValidator(container, bindName, dependencies) {
    _classCallCheck(this, BindValidator);

    this._container = container;
    this._bindName = bindName;
    this._dependencies = dependencies;
  }

  _createClass(BindValidator, [{
    key: 'validate',
    value: function validate(state) {
      var _this = this;

      state = state || new State(this._bindName);

      this._dependencies.forEach(function (dep) {
        if (dep !== utils._) {
          _this._validate(dep, state.fork());
        }
      });
    }
  }, {
    key: '_validate',
    value: function _validate(dependencyName, state) {
      var bind = this._container.findBind(dependencyName);

      if (!bind) {
        throw new errors.Error('Unable to resolve unbound dependency "' + dependencyName + '" as requested by "' + state.top + '".');
      }

      if (state.has(dependencyName)) {
        throw new errors.Error('Detected a cycle while trying to resolve dependencies for "' + state.target + '". The path was "' + state.path(dependencyName) + '".');
      }

      if (bind.validate) {
        state.push(dependencyName);
        bind.validate(state);
      }
    }
  }]);

  return BindValidator;
}();

module.exports = BindValidator;