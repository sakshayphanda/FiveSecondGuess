import {languages} from '../constants/languages';
import memoize from 'lodash.memoize'; // Use for caching/memoize for better performance
import i18n from 'i18n-js';
import {getWordList_ENG} from '../utils/wordlist/wordlist_ENG';
import {getWordList_GER} from '../utils/wordlist/wordlist_GER';
import {getWordList_DAN} from '../utils/wordlist/wordlist_DAN';
import {getWordList_FRE} from '../utils/wordlist/wordlist_FRE';
import {getWordList_ITL} from '../utils/wordlist/wordlist_ITL';
import {getWordList_DUT} from '../utils/wordlist/wordlist_DUT';
import {getWordList_POL} from '../utils/wordlist/wordlist_POL';
import {getWordList_POR} from '../utils/wordlist/wordlist_POR';
import {getWordList_SPA} from '../utils/wordlist/wordlist_SPA';
import {getWordList_ROM} from '../utils/wordlist/wordlist_ROM';

export const getWordListPerLanguage = (category, optionSelected, language) => {
  let words;
  console.log(optionSelected, 'option selected');
  switch (language) {
    case 'en':
      words = getWordList_ENG(category)[optionSelected];
      break;

    case 'ge':
      words = getWordList_GER(category)[optionSelected];
      break;

    case languages.DANISH:
      words = getWordList_DAN(category)[optionSelected];
      break;
    case languages.DUTCH:
      words = getWordList_DUT(category)[optionSelected];
      break;
    case 'fr':
      words = getWordList_FRE(category)[optionSelected];
      break;
    case languages.ITALIAN:
      words = getWordList_ITL(category)[optionSelected];
      break;
    case languages.POLISH:
      words = getWordList_POL(category)[optionSelected];
      break;
    case 'po':
      words = getWordList_POR(category)[optionSelected];
      break;
    case languages.TURKISH:
      words = getWordList_TUR(category)[optionSelected];
      break;

    case languages.ROMANIAN:
      words = getWordList_ROM(category)[optionSelected];
      break;

    case 'sp':
      words = getWordList_SPA(category)[optionSelected];
      break;

    default:
      break;
  }
  return words;
};

export const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key),
);

export const translationGetters = {
  // lazy requires (metro bundler does not support symlinks)
  en: () => require('../../src/translations/en.json'),
  fr: () => require('../../src/translations/fr.json'),
  ge: () => require('../../src/translations/ge.json'),
  sp: () => require('../../src/translations/sp.json'),
  po: () => require('../../src/translations/po.json'),
};
