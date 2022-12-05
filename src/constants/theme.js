import {scaleWidth} from '../utils/responsive';

const successIcon = require('../assets/icons/success.png');
const errorIcon = require('../assets/icons/error.png');
const oroLogo = require('../assets/icons/logo.png');

export const images = {
    welcome: oroLogo,
    vendingMachine: 'https://camelbackvending.com/wp-content/uploads/2017/06/Close-up-of-vending-machine-and-person-hitting-numbers.jpg',
};

export const icons = {
    success: successIcon,
    error: errorIcon,
};


export const fonts = {
    h1: {fontSize: scaleWidth(30), fontWeight: 'bold'},
    h2: {fontSize: scaleWidth(20), fontWeight: 'bold'},
    h3: {fontSize: scaleWidth(18), fontWeight: 'bold'},
    body1: {fontSize: scaleWidth(14)},
    body2: {fontSize: scaleWidth(13)},
    body3: {fontSize: scaleWidth(12)},
};
