const
    extend = require('nutol').extend,
    JScope = module.exports = function(scope) {
        if (!(this instanceof JScope))
            return new JScope(scope);
        this.$$root = extend(this, scope);
    }

JScope.prototype = {
    constructor: JScope,
    $new: function(scope) {
        this.$$child = extend(Object.create(this), scope);
        this.$$child.$$parent = this;
        return this.$$child;
    }
}
