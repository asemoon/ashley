'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ = require('lodash');
var debug = require('debug')('Ashley::CachingTargetResolver');

/*
 * Target resolving is a fairly frequent operation as it's done for every
 * container, at least at the beginning. This becomes a problem once new
 * containers are created many times during the application's life time (e.g.
 * for every request). CachingTargetResolver solves the problem by resolving the
 * target only once by delegating the request to the passed-in resolver and
 * caching the result.
 *
 * Note that child containers share the cache with their parents unless
 * explicitly opted out.
 */

var CachingTargetResolver = function () {
  function CachingTargetResolver(resolver) {
    _classCallCheck(this, CachingTargetResolver);

    this._resolver = resolver;
    this._cache = {};
  }

  _createClass(CachingTargetResolver, [{
    key: 'resolve',
    value: function resolve(target) {
      if (this._cache[target]) {
        debug('Resolved "' + _.get(target, 'name', target) + '" from cache.');
        return this._cache[target];
      }

      return this._cache[target] = this._resolver.resolve(target);
    }
  }]);

  return CachingTargetResolver;
}();

module.exports = CachingTargetResolver;