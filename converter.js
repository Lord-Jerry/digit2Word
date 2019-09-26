// @ts-check

const numbers = require('./numbers.js');

/**
 * this class converts figures to words
 */
class Converter {

  /**
   * 
   * @param { String } figure
   * @returns { String }
   */
  unit(figure) {
    if (numbers[figure] !== undefined) return numbers[figure];

    return '';

  }

  /**
   * 
   * @param { String } figures
   * @returns { String }
   */
  tens(figures) {
    if (numbers[figures] !== undefined) return numbers[figures];

    return '';
  }

  /**
   * 
   * @param { String } figures
   * @returns { String }
   */
  hundreds(figures) {
    let numInWords = '';

    // get the word form of the first digit
    if (figures[0] !== '0') {
      numInWords += this.unit(figures[0]);
      numInWords += ' Hundred';
    }
    const temp = figures.slice(1);
    const numTemp = Number(temp);

    if (numTemp > 0) {
      numInWords += ', and ';
      numInWords += this.tens(String(numTemp));
    }

    return numInWords;
  }

  /**
   * @param { String } figures
   * @returns { String }
   */
  thousands(figures) {
    let numInWords = '';

    // get the word form of the first digit
    numInWords += this.tens(figures[0]);
    numInWords += ' Thousand, ';
    const temp = figures.slice(1);

    if (numbers[temp] === undefined && (Number(temp) > 1)) {
      numInWords += this.hundreds(temp);
    }

    return numInWords;
  }

  /**
   * 
   * @param { String } figures
   * @returns { String }
   */
  tenThousands(figures) {
    let numInWords = '';

    // get first two digit
    const twoDigit = figures.slice(0, 2);

    // get word form of first two digit 
    numInWords += this.tens(twoDigit);
    numInWords += ' Thousand, ';

    const temp = figures.slice(2);

    if (numbers[temp] === undefined && (Number(temp) > 1)) {
      numInWords += this.hundreds(temp);
    }

    return numInWords;
  }


  /**
   * 
   * @param { String } figures
   * @returns { String }
   */
  hundredThousands(figures) {
    let numInWords = '';

    // get first three digit
    const threeDigit = figures.slice(0, 3);

    // get word form of first three digit 
    const hundred = this.hundreds(threeDigit);
    numInWords += hundred;
    numInWords += ' Thousand, ';

    const temp = figures.slice(3);

    if (numbers[temp] === undefined && (Number(temp) > 1)) {
      numInWords += this.hundreds(temp);
    }

    return numInWords;
  }

  /**
   * 
   * @param { String } figures
   * @returns { String }
   */
  million(figures) {
    let numInWords = '';


    // get word form of first digit 
    numInWords = this.unit(figures[0]);
    numInWords += ' Million, ';

    const temp = figures.slice(1);

    if (numbers[temp] === undefined && (Number(temp) > 1)) {
      numInWords += this.hundredThousands(temp);
    }

    return numInWords;
  }

  /**
   * 
   * @param { String } figures
   * @returns { String }
   */
  tenMillions(figures) {
    let numInWords = '';

    // get first two digit
    const twoDigit = figures.slice(0, 2);

    // get word form of first two digit 
    numInWords += this.tens(twoDigit);
    numInWords += ' Million, ';

    const temp = figures.slice(2);

    if (numbers[temp] === undefined && (Number(temp) > 1)) {
      numInWords += this.hundredThousands(temp);
    }

    return numInWords;
  }


  /**
   * 
   * @param { String } amount
   * @returns { String } 
   */
  convert(amount = '') {

    if (typeof (amount) !== 'number') return `expected number got ${typeof(amount)}`; 
    // convert amount type to string so we can make use of the length property
    const figures = String(amount);

    if (isNaN(amount)) return 'Not a valid number';

    if (figures.length === 0) return '';
    if (figures.length === 1) return this.unit(figures);
    if (figures.length === 2) return this.tens(figures);
    if (figures.length === 3) return this.hundreds(figures);
    if (figures.length === 4) return this.thousands(figures);
    if (figures.length === 5) return this.tenThousands(figures);
    if (figures.length === 6) return this.hundredThousands(figures);
    if (figures.length === 7) return this.million(figures);
    if (figures.length === 8) return this.tenMillions(figures);

    return '';
  }
}

module.exports = new Converter();
