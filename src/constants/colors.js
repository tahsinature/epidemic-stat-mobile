import hexToRgba from 'hex-to-rgba';
import color from 'color';

export default {
  primaryGrayish: 'rgba(53, 57, 67, 1.000)',
  countryList: {
    odd: hexToRgba('#f6fbff', 0.1),
    even: '#fff',
  },
  temp: {
    tabBookmark: color('rgba(53, 57, 67, 1.000)').whiten(0.5).hex(),
  },
};
