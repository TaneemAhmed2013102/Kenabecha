const moment = require('moment');
const dataset = require('./dataset');

// Token generator
const makeToken = (v) => {
    let token = stringRand(4) + numRand(2) + v + unixMS() + stringRand(2) + numRand(2);
    return token;
}

const makeSlug = (v) => v.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');

// random number generator
const numRand = (length) => {
    let result           = [];
    let characters       = '0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }
   return result.join('');
}

const makeOtp = () => {
    let otp = numRand(6);
    while(otp.charAt(0) == '0') {
        otp = numRand(6);
    }

    return otp;
}

// random string generator 
const stringRand = (length) => {
    let result           = [];
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }
   return result.join('');
}


// @return UNIX milliseconds requires moment js
const unixMS = () => {
    return moment().format('x');
 }

// @get phone operator
const phoneOperator = (v) => {
    let vCode = v.substring(0,3);
    for (let i = 0; i < dataset.bdPhoneOperators.length; i++) {
        let currentCarrier = dataset.bdPhoneOperators[i];
        if (vCode == currentCarrier.code) {
            return {
                'match' : 'Yes',
                'code' : currentCarrier.code,
                'operator' : currentCarrier.operator
            }
        }
    }
    // default return
    return {
            'match' : 'No',
            'code' : '',
            'operator' : ''
    }

}

exports.makeToken = makeToken;
exports.makeSlug = makeSlug;
exports.makeOtp = makeOtp;
exports.numRand = numRand;
exports.stringRand = stringRand;
exports.unixMS = unixMS;
exports.phoneOperator = phoneOperator;
