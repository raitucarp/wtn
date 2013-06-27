var wtn = require("./../index.js"),
    should = require("should");

describe("Wtn", function(){
    it("should be ok with basic tests", function(){
        wtn.convert("three thousand and one hundred").should.equal(3100);
        wtn.convert("twenty five").should.equal(25);
    });

    it("should tokenize number correctly", function(){
        wtn.tokenToNumber('one').should.equal('1');
    });
});