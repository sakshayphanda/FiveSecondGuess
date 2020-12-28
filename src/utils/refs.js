import firebase from './firebase';

export const mainRef = firebase.database().ref();

export const usersRef = firebase
  .database()
  .ref()
  .child('users');

export const gamesRef = firebase
  .database()
  .ref()
  .child('games');
