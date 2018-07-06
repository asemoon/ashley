'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ = require('lodash');

/*
 * A stack like data structure that's used as part of the cycle detection phase.
 * It holds the target plus its flattened chain of dependencies. It's queried to
 * see whether a particular dependency has been seen before.
 */

var State = function () {
  function State(chain) {
    _classCallCheck(this, State);

    if (_.isArray(chain)) {
      this._chain = chain;
    } else {
      this._chain = [chain];
    }
  }

  _createClass(State, [{
    key: 'has',
    value: function has(target) {
      return _.includes(this._chain, target);
    }
  }, {
    key: 'push',
    value: function push(target) {
      this._chain.push(target);
    }
  }, {
    key: 'fork',
    value: function fork() {
      return new State(_.clone(this._chain));
    }
  }, {
    key: 'path',
    value: function path(last) {
      var inCycle = false;
      return _.concat(this._chain, last).map(function (curr, idx, col) {
        // The last path
        if (idx === col.length - 1) {
          return curr;
        }

        // The start of the cycle
        if (curr === last) {
          inCycle = true;
        }

        if (inCycle) {
          return curr + ' \u21C4';
        } else {
          return curr + ' \u2192';
        }
      }).join(' ');
    }
  }, {
    key: 'target',
    get: function get() {
      return _.first(this._chain);
    }
  }, {
    key: 'top',
    get: function get() {
      return _.last(this._chain);
    }
  }]);

  return State;
}();

module.exports = State;