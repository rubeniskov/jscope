var expect = require("chai").expect;
var JScope = require("..");

describe('JScope', function() {
    var base, first, second, third;

    beforeEach(function() {
        base = JScope({
            'foo': 'foo',
            'bar': 'bar',
            'wow': 'wow'
        });
        first = base.new({
            'foo': 'oof'
        });
        second = first.new({
            'bar': 'rab'
        });
        third = second.new({
            'wow': 'owo'
        });
    });

    it('should get the each value from the parent to child scope', function() {

        expect(first.foo).to.be.equal('oof');
        expect(first.bar).to.be.equal('bar');
        expect(first.wow).to.be.equal('wow');

        expect(second.foo).to.be.equal('oof');
        expect(second.bar).to.be.equal('rab');
        expect(second.wow).to.be.equal('wow');

        expect(third.foo).to.be.equal('oof');
        expect(third.bar).to.be.equal('rab');
        expect(third.wow).to.be.equal('owo');
    });

    it('should ovewrite the values for each scope', function() {
        first.wow = 'foo';
        expect(first.wow).to.be.equal('foo');
        expect(second.wow).to.be.equal('foo');
        expect(third.wow).to.be.equal('owo');

        second.wow = 'bar';
        expect(first.wow).to.be.equal('foo');
        expect(second.wow).to.be.equal('bar');
        expect(third.wow).to.be.equal('owo');
        third.wow = 'wow';
        expect(first.wow).to.be.equal('foo');
        expect(second.wow).to.be.equal('bar');
        expect(third.wow).to.be.equal('wow');
    });

    it('should define the values in order of heritance', function() {
        first.frog = 'croac';
        expect(first.frog).to.be.equal('croac');
        expect(second.frog).to.be.equal('croac');
        expect(third.frog).to.be.equal('croac');
        second.cow = 'muuu';
        expect(first.cow).to.not.exist;
        expect(second.cow).to.be.equal('muuu');
        expect(third.cow).to.be.equal('muuu');
        third.dog = 'guau';
        expect(first.dog).to.not.exist;
        expect(second.dog).to.not.exist;
        expect(third.dog).to.be.equal('guau');
    });

    it('should have the parent values accessible by $$root and $parent ', function() {

        expect(base.$$parent).to.not.exist;
        expect(base.$$root).to.be.equal(base);
        expect(base.foo).to.be.equal('foo');
        expect(base.bar).to.be.equal('bar');
        expect(base.wow).to.be.equal('wow');

        expect(first.$$root).to.be.equal(base);
        expect(first.$$root.foo).to.be.equal('foo');

        expect(first.$$parent).to.be.equal(base);
        expect(first.$$parent.foo).to.be.equal('foo');

        expect(first.foo).to.be.equal('oof');
        expect(first.bar).to.be.equal('bar');
        expect(first.wow).to.be.equal('wow');

        expect(second.$$root).to.be.equal(base);
        expect(second.$$root.foo).to.be.equal('foo');
        expect(second.$$root.bar).to.be.equal('bar');

        expect(second.$$parent).to.be.equal(first);
        expect(second.$$parent.foo).to.be.equal('oof');
        expect(second.$$parent.bar).to.be.equal('bar');

        expect(second.foo).to.be.equal('oof');
        expect(second.bar).to.be.equal('rab');

        expect(third.$$root).to.be.equal(base);
        expect(third.$$root.foo).to.be.equal('foo');
        expect(third.$$root.bar).to.be.equal('bar');
        expect(third.$$root.wow).to.be.equal('wow');

        expect(third.$$parent.$$parent).to.be.equal(first);
        expect(third.$$parent.$$parent.foo).to.be.equal('oof');
        expect(third.$$parent.$$parent.bar).to.be.equal('bar');
        expect(third.$$parent.$$parent.wow).to.be.equal('wow');

        expect(third.$$parent).to.be.equal(second);
        expect(third.$$parent.foo).to.be.equal('oof');
        expect(third.$$parent.bar).to.be.equal('rab');
        expect(third.$$parent.wow).to.be.equal('wow');

        expect(third.foo).to.be.equal('oof');
        expect(third.bar).to.be.equal('rab');
        expect(third.wow).to.be.equal('owo');
    });

    it('should get values', function() {

        first.dog = 'waaf'
        first.cat = 'meow'
        second.dog = 'woof'
        second.sheep = 'baa'
        third.bird = 'beep'
        third.frog = 'croak'
    });
});
