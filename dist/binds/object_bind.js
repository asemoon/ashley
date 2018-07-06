'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ObjectBind = function () {
  function ObjectBind(name, scope) {
    _classCallCheck(this, ObjectBind);

    this._name = name;
    this._scope = scope;
  }

  _createClass(ObjectBind, [{
    key: 'get',
    value: async function get() {
      return this._scope.get();
    }
  }]);

  return ObjectBind;
}();

module.exports = ObjectBind;