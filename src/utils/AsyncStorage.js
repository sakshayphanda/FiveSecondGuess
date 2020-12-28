import AsyncStorage from "@react-native-community/async-storage";

const LANGUAGE = 'defaultLanguage';
const PLAYERS = 'players';
const APPOPENCOUNT = 'appopencount';
const DONOTSHOWRATING = 'donotshowrating';


export async function getGamesPlayed() {
  try {
    return (await AsyncStorage.getItem(GAMES_PLAYED_KEY)) || 0;
  } catch (error) {
    return error;
  }
}


export async function addNewGamePlayed() {
  try {
    const currentGamesPlayed = await AsyncStorage.getItem(GAMES_PLAYED_KEY);
    const newGamesPlayed = ((Number(currentGamesPlayed) || 0) + 1).toString();

    await AsyncStorage.setItem(GAMES_PLAYED_KEY, newGamesPlayed);
  } catch (error) {
    return error;
  }
}

export async function setLanguage(language) {
  try {
    await AsyncStorage.setItem(LANGUAGE, language);
  } catch (e) {
    return e;
  }
}

export async function getLanguage() {
  try {
    return (await AsyncStorage.getItem(LANGUAGE)) || null;
  } catch (error) {
    return null;
  }
}

export async function setPlayers(Players) {
  try {
    await AsyncStorage.setItem(PLAYERS, Players);
  } catch (e) {
    return e;
  }
}

export async function getDoNotShowRating() {
  try {
    return (await (AsyncStorage.getItem(DONOTSHOWRATING) || null));
  } catch (e) {
    return null;
  }
}

export async function setDoNotShowRating(state) {
  try {
    await AsyncStorage.setItem(DONOTSHOWRATING, state);
  } catch (e) {
    return e;
  }
}

export async function setAppOpenCount(count) {
  try {
    await AsyncStorage.setItem(APPOPENCOUNT, count);
  } catch (e) {
    return e;
  }
}

export async function getAppOpenCount() {
  try {
    return (await AsyncStorage.getItem(APPOPENCOUNT)) || null;
  } catch (e) {
    return null;
  }
}
export async function getPlayers() {
  try {
    return (await AsyncStorage.getItem(PLAYERS)) || null;
  } catch (error) {
    return null;
  }
}
