const
    extend = require('nutol/extend'),
    objects = require('nutol/objects'),
    arrays = require('nutol/arrays'),
    noop = function() {},
    JScope = module.exports = function(scope) {
        if (!(this instanceof JScope))
            return new JScope(scope);
        this.$$root = extend(this, scope);
    },
    parseArgs = function(args, nargs, reverse) {
        var argv = Array.prototype.slice.call(args),
            argf = new Array(nargs | 0).fill(undefined),
            diff = argv.length - argf.length;
        return argf.map(function(value, index) {
            return argv[reverse === true ? (argv.length - 1 - (index + diff)) + diff : index + diff];
        });
    },
    prototype = JScope.prototype = {
        constructor: JScope,
        new: function(scope) {
            var $$child = extend(Object.create(this), scope);
            $$child.$$parent = this;
            return $$child;
        },
        set: function(name, value) {
            objects.property(this, name, value);
        },
        get: function(name) {
            return objects.property(this, name);
        },
        map: function(clone, deep, fn) {
            var args = parseArgs(arguments, 3),
                target = args[0] === false ? this : {},
                iter = args[2] || noop;
            this.each(args[1], function(value, key) {
                target[key] = iter.call(this, value, key);
            });
            return target;
        },
        each: function(deep, fn) {
            var args = parseArgs(arguments, 2),
                iter = args[1] || noop,
                idx = 0,
                keys = this.keys(args[0]);
            for (; idx < keys.length; idx++)
                iter.call(this, this[keys[idx]], keys[idx], this);
            return this;
        },
        serialize: function(deep, tab) {
            return JSON.stringify(this.toObject(deep), null, tab || 4);
        },
        toObject: function(deep) {
            var obj = {};
            this.each(deep, function(value, key) {
                obj[key] = value;
            });
            return obj;
        },
        toString: function(deep) {
            return this.serialize(deep);
        },
        keys: function(deep) {
            return allKeys(this, deep);
        },
        values: function(deep) {
            var self = this;
            return this.keys(deep).map(function(key) {
                return self[key];
            });
        }
    },
    protectedKeys = objects.keys(prototype),
    regProtectedKeys = new RegExp(['(^\\$+)'].concat(protectedKeys).join('|')),
    allKeys = function(target, deep) {
        var keys = [];
        do {
            keys = keys.concat(objects.keys(target));
        } while (deep && (target = target.$$parent));

        return arrays.unique(keys.filter(function(key) {
            return !regProtectedKeys.test(key);
        }));
    };
