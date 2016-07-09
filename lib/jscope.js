const JScope = module.exports = function() {
    this.$$root = this;
}

JScope.prototype = {
    constructor: JScope,
    $new: function(){
        this.$$child = Object.create(this);
        this.$$child.$$parent = this;
        return this.$$child;
    }
}
