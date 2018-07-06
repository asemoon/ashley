'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ObjectProvider = function () {
  function ObjectProvider(bindName, container, target, options) {
    _classCallCheck(this, ObjectProvider);

    this.bindName = bindName;
    this._container = container;
    this._target = target;
    this._options = options;
  }

  _createClass(ObjectProvider, [{
    key: 'create',
    value: async function create() {
      return this._target;
    }
  }]);

  return ObjectProvider;
}();

module.exports = ObjectProvider;