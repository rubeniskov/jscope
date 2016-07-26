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
        first = base.$new({
            'foo': 'oof'
        });
        second = first.$new({
            'bar': 'rab'
        });
        third = second.$new({
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
});
