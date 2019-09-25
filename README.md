# digit2word.js

A Javascript library for converting digits to word.

## Description

Most times when trying to send money with mobile bank apps or web apps, 
we do make mistakes of sending more than we intended to.
For example sending 10000.00 instead of 1000.00.

So to address this issue i wrote this program to help convert digits to their word form.

## Installation

Installation uses the [npm](http://npmjs.org/) package manager.  Just type the following command after installing npm.

    npm install digit2word

## Example

```javascript
const digit2word = require('digit2word');

// Convert digit to word
const output = digit2word.convert('546789');
console.log(output);
