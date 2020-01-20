// @ts-check

let numbers;

/**
 * this class converts figures to words
 */
class Converter {

  /**
   * 
   * @param { String } figure
   * @returns { String }
   */
  static unit(figure) {
    if (numbers[figure] !== undefined) return numbers[figure];

    return '';

  }

  /**
   * 
   * @param { String } figures
   * @returns { String }
   */
  static tens(figures) {
    if (numbers[figures] !== undefined) return numbers[figures];

    return '';
  }

  /**
   * 
   * @param { String } figures
   * @returns { String }
   */
  static hundreds(figures) {
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
  static thousands(figures) {
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
  static tenThousands(figures) {
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
  static hundredThousands(figures) {
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
  static million(figures) {
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
  static tenMillions(figures) {
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
   * @param { Object } config 
   */
  static _validate(amount, config) {
    if (typeof (amount) !== 'number') {
      throw new TypeError(`expected number got ${typeof(amount)}`);
    }

    if (isNaN(amount)) {
      throw new TypeError('Not a valid number');
    }

    if (config === undefined || typeof config !== 'object') {
      throw new TypeError(`Expected type of config to be an object, but got ${typeof config} instead`);
    }

    const { lang } = config;
   
    switch (lang) {
      case 'eng':
        numbers = require('./language/english.js');
        break;

      default:
        numbers = require('./language/english.js');
    }

  }

  /**
   * 
   * @param { String } amount
   * @param { object } config
   * @returns { String } 
   */
  static convert(amount = '', config= {}) {

    this._validate(amount, config);
    
    // convert amount type to string so we can make use of the length property
    const figures = String(amount);

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

module.exports = Converter;
