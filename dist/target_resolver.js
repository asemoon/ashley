'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ = require('lodash');
var path = require('path');
var debug = require('debug')('Ashley::TargetResolver');

var errors = require('./errors');

/*
 * Ashley allows to specify the target of a binding in two ways.
 *
 * ashley.instance('Service', Service);
 * ashley.instance('Service', 'src/service');
 *
 * In the first variant, the target is provided directly as a reference. In the
 * other, the target is specified using a string path. The path can be both
 * relative and absolute. If relative, the options need to include a key which
 * specifies the root. A result of TargetResolver is always a reference to an
 * object.
 *
 */

var TargetResolver = function () {
  function TargetResolver(options) {
    _classCallCheck(this, TargetResolver);

    this.options = options || {};
    this.cache = {};
  }

  _createClass(TargetResolver, [{
    key: 'resolve',
    value: function resolve(target) {
      if (_.isObject(target)) {
        debug('Resolved "' + _.get(target, 'name', target) + '" to a reference.');
        return target;
      }

      debug('Resolving "' + target + '".');

      if (!_.isString(target)) {
        throw new errors.Error('Invalid argument given as target: "' + target + '".');
      }

      if (path.isAbsolute(target)) {
        return this._resolveAbsolute(target);
      }

      return this._resolveRelative(target);
    }
  }, {
    key: '_resolveAbsolute',
    value: function _resolveAbsolute(target) {
      debug('Resolving "' + target + '" as an absolute path.');
      return this._loadTarget(target);
    }
  }, {
    key: '_resolveRelative',
    value: function _resolveRelative(target) {
      debug('Resolving "' + target + '" as a relative path.');

      var root = this.options.root;

      if (!root) {
        throw new errors.Error('A relative path "' + target + '" given but the root option is not specified.');
      }

      var filepath = path.resolve(root, target);
      debug('Resolved the relative path to "' + filepath + '".');

      return this._loadTarget(filepath);
    }
  }, {
    key: '_loadTarget',
    value: function _loadTarget(filepath) {
      try {
        var obj = require('' + filepath);
        debug('Succesfully loaded "' + filepath + '".');
        return obj;
      } catch (e) {
        throw new errors.Error('Unable to load "' + filepath + '": ' + e.stack);
      }
    }
  }]);

  return TargetResolver;
}();

module.exports = TargetResolver;