const
    extend = require('nutol/extend'),
    objects = require('nutol/objects'),
    arrays = require('nutol/arrays'),
    JScope = module.exports = function(scope) {
        if (!(this instanceof JScope))
            return new JScope(scope);
        this.$$root = extend(this, scope);
    }

JScope.prototype = {
    constructor: JScope,
    $new: function(scope) {
        var $$child = extend(Object.create(this), scope);
        $$child.$$parent = this;
        return $$child;
    },
    $set: function(name, value) {
        this[name] = value;
    },
    $get: function(name) {
        return this[name];
    },
    $map: function(fn) {
        console.info('Not yet implemented $map');// TODO
    },
    $values: function() {
        var self = this;
        return this.$keys().map(function(key) {
            return self[key];
        });
    },
    $each: function() {
        console.info('Not yet implemented $each');// TODO

    },
    $keys: function(filter) {
        var keys = [],
            target = this;

        do {
            keys = keys.concat(objects.keys(target));
        } while ((target = target.$$parent))

        return arrays.unique(keys.filter(function(key) {
            return !/^\$+/.test(key);
        }));
    }
}
