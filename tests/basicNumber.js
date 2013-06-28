var wtn = require("./../index.js"),
    should = require("should");

describe("Wtn", function(){
    it("should be ok with basic tests", function(){
        wtn.convert("three thousand and one hundred").should.equal(3100);
        wtn.convert("twenty five").should.equal(25);
    });

    describe("Token To Number", function(){
        it("Should tokenize number correctly", function(){
            wtn.tokenToNumber('one').should.equal('1');
            wtn.tokenToNumber('one two three').should.equal('1 2 3');
            wtn.tokenToNumber('fifteen hundred').should.equal('15 100');
        });

        it("Should not tokenize unkown", function(){
            wtn.tokenToNumber("this shall not pass").should.equal("this shall not pass");
        });

        it("Should tokenize string to number even in sentences", function(){
            wtn.tokenToNumber("i have one phone").should.equal("i have 1 phone");
            wtn.tokenToNumber("I have twenty five phone").should.equal("I have 20 5 phone");
        });

        it("Should tokenize correctly even when the words arent seperated", function(){
            // TODO ini memang seperti ini?
            wtn.tokenToNumber("I haveone phone").should.equal("I haveone phone");
        });
    });
});