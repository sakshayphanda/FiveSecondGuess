import {
  CATEGORY_EMBARRASING,
  CATEGORY_ENTERTAINMENT,
  CATEGORY_FUNNY,
} from '../constants/strings';
import {languages} from '../constants/languages.js';

const initialState = {
  category: CATEGORY_FUNNY,
  isShowingPaidCategories: true,
  language: 'en',
  systemLanguage: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'update':
      const newState = {...state};
      newState.category = action.payload;
      return newState;

    case 'updateLanguage': {
      const newState = {...state};
      newState.language = action.payload;
      return newState;
    }
    case 'updateSystemLanguage': {
      const newState = {...state};
      newState.systemLanguage = action.payload;
      return newState;
    }
    default:
      return state;
  }
}
