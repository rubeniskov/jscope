var expect = require("chai").expect;
var JScope = require("..");

describe('JScope', function() {
    var first, second, third;

    beforeEach(function() {
        first = new JScope();
        second = first.$new();
        third = second.$new();
    });

    it('should get the each right value from the parent to child scope', function() {
        first.foo = 'foo';
        second.bar = 'bar';
        third.wow = 'wow';

        expect(first.foo).to.be.equal('foo');
        expect(first.bar).not.to.be.equal('bar');
        expect(first.wow).not.to.be.equal('wow');
        expect(second.foo).to.be.equal('foo');
        expect(second.bar).to.be.equal('bar');
        expect(second.wow).not.to.be.equal('wow');
        expect(third.foo).to.be.equal('foo');
        expect(third.bar).to.be.equal('bar');
        expect(third.wow).to.be.equal('wow');
    });

    it('should ovewrite the value for each scope', function() {
        first.wow = 'foo';
        expect(first.wow).to.be.equal('foo');
        expect(second.wow).to.be.equal('foo');
        expect(third.wow).to.be.equal('foo');
        second.wow = 'bar';
        expect(first.wow).to.be.equal('foo');
        expect(second.wow).to.be.equal('bar');
        expect(third.wow).to.be.equal('bar');
        third.wow = 'wow';
        expect(first.wow).to.be.equal('foo');
        expect(second.wow).to.be.equal('bar');
        expect(third.wow).to.be.equal('wow');
    });
});
