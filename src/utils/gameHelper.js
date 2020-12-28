import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from './colors';

export const hasSomeoneWon = (currentGameGridPlays, currentPlayer) => {
  const hasSomeoneWonByRow = row =>
    currentGameGridPlays[row].filter(play => play === currentPlayer).length ===
    3;

  const hasSomeoneWonByColumn = column =>
    currentGameGridPlays
      .map(rowPlay => rowPlay[column] === currentPlayer)
      .filter(winCondition => winCondition === true).length === 3;

  const hasSomeoneWonOnDiagonal = () => {
    const checkIfPlaysAreTheSame = (accumulator, currentValue) =>
      accumulator === currentValue ? currentValue : false;

    const firstRow = currentGameGridPlays[0];
    const secondRow = currentGameGridPlays[1];
    const thirdRow = currentGameGridPlays[2];

    const fromLeftDiagonalPlay = [firstRow[0], secondRow[1], thirdRow[2]];
    const fromRightDiagonalPlay = [firstRow[2], secondRow[1], thirdRow[0]];

    if (
      fromLeftDiagonalPlay.reduce(checkIfPlaysAreTheSame) ||
      fromRightDiagonalPlay.reduce(checkIfPlaysAreTheSame)
    )
      return true;

    return false;
  };

  for (const currentRowOrColumn of [0, 1, 2]) {
    if (
      hasSomeoneWonByRow(currentRowOrColumn) ||
      hasSomeoneWonByColumn(currentRowOrColumn) ||
      hasSomeoneWonOnDiagonal()
    )
      return true;
  }

  return false;
};

export const getWinningLine = gameGrid => {
  console.log(gameGrid);
  if (
    gameGrid[0][0] === gameGrid[0][1] &&
    gameGrid[0][1] === gameGrid[0][2] &&
    gameGrid[0][0] &&
    gameGrid[0][0] !== ''
  ) {
    return 'r1';
  } else if (
    gameGrid[1][0] === gameGrid[1][1] &&
    gameGrid[1][1] === gameGrid[1][2] &&
    gameGrid[1][0] &&
    gameGrid[1][0] !== ''
  ) {
    return 'r2';
  } else if (
    gameGrid[2][0] === gameGrid[2][1] &&
    gameGrid[2][1] === gameGrid[2][2] &&
    gameGrid[2][0] &&
    gameGrid[2][0] !== ''
  ) {
    return 'r3';
  } else if (
    gameGrid[0][0] === gameGrid[1][0] &&
    gameGrid[1][0] === gameGrid[2][0] &&
    gameGrid[0][0] &&
    gameGrid[0][0] !== ''
  ) {
    return 'c1';
  } else if (
    gameGrid[0][1] === gameGrid[1][1] &&
    gameGrid[1][1] === gameGrid[2][1] &&
    gameGrid[0][1] &&
    gameGrid[0][1] !== ''
  ) {
    return 'c2';
  } else if (
    gameGrid[0][2] === gameGrid[1][2] &&
    gameGrid[1][2] === gameGrid[2][2] &&
    gameGrid[0][2] &&
    gameGrid[0][2] !== ''
  ) {
    return 'c3';
  } else if (
    gameGrid[0][0] === gameGrid[1][1] &&
    gameGrid[1][1] === gameGrid[2][2] &&
    gameGrid[0][0] &&
    gameGrid[0][0] !== ''
  ) {
    return 'd1';
  } else {
    return 'd2';
  }
};

export const checkIfGameEnded = currentGameGridPlays => {
  const firstRow = currentGameGridPlays[0];
  const secondRow = currentGameGridPlays[1];
  const thirdRow = currentGameGridPlays[2];

  return (
    [...firstRow, ...secondRow, ...thirdRow].filter(play => !!play).length === 9
  );
};

export const renderPlayerIcon = player =>
  player === 'X' ? (
    <Icon name="close" size={40} color={colors.darkGrey} />
  ) : (
    <Icon name="circle-outline" size={40} color={colors.lightYellow} />
  );

// finds the next available spot
export const nextMove = gameGrid => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (!gameGrid[i][j]) {
        return [i, j];
      }
    }
  }

  return null;
};

//AI to make its turn
export const bestMove = (gameGrid, currentPlayer) => {
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (!gameGrid[i][j]) {
        gameGrid[i][j] = currentPlayer;
        let score = minimax(gameGrid, currentPlayer, 0, false);
        gameGrid[i][j] = null;
        if (score > bestScore) {
          bestScore = score;
          move = [i, j];
        }
      }
    }
  }
  return move;
};

const scores = {
  X: 1,
  O: -1,
  tie: 0,
};

function minimax(gameGrid, currentPlayer, depth, isMaximizing) {
  // Check if winning
  if (hasSomeoneWon(gameGrid, currentPlayer)) {
    return scores[currentPlayer];
  } else if (checkIfGameEnded(gameGrid)) {
    return 0;
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (!gameGrid[i][j]) {
          gameGrid[i][j] = 'X';
          let score = minimax(gameGrid, 'X', depth + 1, false);
          gameGrid[i][j] = null;
          if (score > bestScore) {
            bestScore = score;
          }
        }
      }
    }

    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (!gameGrid[i][j]) {
          gameGrid[i][j] = 'O';
          let score = minimax(gameGrid, 'O', depth + 1, true);

          gameGrid[i][j] = null;
          if (score < bestScore) {
            bestScore = score;
          }
        }
      }
    }
    return bestScore;
  }
}
