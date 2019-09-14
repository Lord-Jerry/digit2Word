const Converter = require('./converter');
const process = require('process');
process.stdin.setEncoding('utf8');

console.log('Please Enter Amount');

process.stdin.on('readable', () => {
  let amount = process.stdin.read() || '';
  
  if (! isNaN(Number(amount))) {
    const test = new Converter();
    console.log(test.run(amount.trim()), '\n');
  } else {
    console.error('Please Enter A Valid Number \n');
    
  }

});
