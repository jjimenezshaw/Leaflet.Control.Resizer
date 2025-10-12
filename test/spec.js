const chai = require('chai');
const L = require('leaflet');

require('../L.Control.Resizer');

chai.should();

describe('L.Control.Resizer', function() {
    describe('Functions in place', function() {
        it('L.Control.Resizer has correct func', function() {
            L.Control.Resizer.should.be.a('function');
        });
        it('L.control.Resizer object creation', function() {
            const c = new L.Control.Resizer();
            c.should.be.a('object');
        });
    });
});
