import couple from '../assets/images/couple.png';
import crazy from '../assets/images/crazy.png';
import flirty from '../assets/images/sexy.jpeg';
import funny from '../assets/images/funny.jpeg';
import hot from '../assets/images/adults.png';
import dirty from '../assets/images/kiss.png';
import entertainment from '../assets/images/partypopper.png';

import party from '../assets/images/party.jpeg';
import teens from '../assets/images/teens.jpeg';
import kids from '../assets/images/kids.png';
import drinking from '../assets/images/drinking.png';
import friends from '../assets/images/friends.png';
import family from '../assets/images/family.jpeg';
import embarrasing from '../assets/images/embarrassing.png';
import wtf from '../assets/images/wtf.png';
import hardcore from '../assets/images/hardcore.jpeg';

import {
  CATEGORY_COUPLES,
  CATEGORY_DIRTY,
  CATEGORY_ENTERTAINMENT,
  CATEGORY_FLIRTY,
  CATEGORY_FUNNY,
  CATEGORY_RANDOM,
  CATEGORY_SEXY,
  CATEGORY_TEENS,
  CATEGORY_EMBARRASING,
  CATEGORY_CLASSIC,
  CATEGORY_FAMILY,
  CATEGORY_PARTY,
  CATEGORY_KIDS,
  CATEGORY_FRIENDS,
  UNLOCK_ALL,
} from '../constants/strings';
import {translate} from './Helper';

const categories = [
  {
    title: 'unlockAll_title',
    subTitle: 'unlockAll_description',
    image: '',
    locked: '',
    price: '',
    category: UNLOCK_ALL,
    product_id: 'unlock_all_iap',
  },
  {
    title: 'entertainment',
    subTitle: 'entertainment_description',
    image: wtf,
    locked: '',
    price: '',
    category: CATEGORY_ENTERTAINMENT,
    product_id: 'wtf_iap',
  },
  {
    title: 'funny',
    subTitle: 'funny_description',
    image: funny,
    locked: '',
    price: '',
    category: CATEGORY_FUNNY,
    product_id: 'funny_category_iap',
  },
  {
    title: 'random',
    subTitle: 'random_description',
    image: crazy,
    locked: '',
    price: '',
    category: CATEGORY_RANDOM,
    product_id: 'random_category_iap',
  },

  {
    title: 'dirty',
    subTitle: 'dirty_description',
    image: dirty,
    locked: '',
    price: '',
    category: CATEGORY_DIRTY,
    product_id: 'dirty_category_iap',
  },
  {
    title: 'sexy',
    subTitle: 'sexy_description',
    image: hot,
    locked: '',
    price: '',
    category: CATEGORY_SEXY,
    product_id: 'sexy_product_iap',
  },
  {
    title: 'couples',
    subTitle: 'couples_description',
    image: couple,
    locked: '',
    price: '',
    category: CATEGORY_COUPLES,
    product_id: 'couples_product_iap',
  },
  {
    title: 'flirty',
    subTitle: 'flirty_description',
    image: flirty,
    locked: '',
    price: '',
    category: CATEGORY_FLIRTY,
    product_id: 'flirty_category_iap',
  },
  {
    title: 'teens',
    subTitle: 'teens_description',
    image: teens,
    locked: '',
    price: '',
    category: CATEGORY_TEENS,
    product_id: 'teens_category_iap',
  },
  {
    title: 'family',
    subTitle: 'family_description',
    image: family,
    locked: '',
    price: '',
    category: CATEGORY_FAMILY,
    product_id: 'family_iap',
  },
  {
    title: 'friends',
    subTitle: 'friends_description',
    image: friends,
    locked: '',
    price: '',
    category: CATEGORY_FRIENDS,
    product_id: 'friends_iap',
  },
  {
    title: 'kids',
    subTitle: 'kids_description',
    image: kids,
    locked: '',
    price: '',
    category: CATEGORY_KIDS,
    product_id: 'kids_iap',
  },
  {
    title: 'embarrassing',
    subTitle: 'embarrassing_description',
    image: entertainment,
    locked: '',
    price: '',
    category: CATEGORY_EMBARRASING,
    product_id: 'embarrassing_iap',
  },
  {
    title: 'drinking',
    subTitle: 'drinking_description',
    image: drinking,
    locked: '',
    price: '',
    category: CATEGORY_CLASSIC,
    product_id: 'drinking_iap',
  },
  {
    title: 'party',
    subTitle: 'party_description',
    image: hardcore,
    locked: '',
    price: '',
    category: CATEGORY_PARTY,
    product_id: 'party_iap',
  },
];
export default categories;
