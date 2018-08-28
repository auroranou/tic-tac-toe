'use strict';

function isSuperSet(sup, sub) {
  for (let i = 0; i < sub.length; i++) {
    if (sup.indexOf(sub[i]) === -1) {
      return false;
    }
  }

  return true;
}

function formatBoardStr(arr) {
  return arr.map(el => {
    return el === 'empty' ? ' ' : el;
  }).join('');
}

module.exports = {
  formatBoardStr,
  isSuperSet,
};