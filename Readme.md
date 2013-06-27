# Introduction
**WTN** is an abbreviation of Words to Numbers. It will convert english words to number. It's useful for script that use words as a parameter

# Install

> npm install wtn

# Example

    var wtn = require('wtn');
    console.log(wtn.convert('three thousand and one hundred')); // 3100
    console.log(wtn.convert('twenty five')); // 25
    console.log(wtn.convert('one hundred thousand and sixty five')); //100065

# TODO

 - Support International language & its grammar
 - Increase performance of code
 - Create Unit Testing