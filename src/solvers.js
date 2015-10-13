/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  // make array of length n where each element is an array of length n (all zeros)
  var solution = [];

  for (var i = 0; i < n; i++) {
    solution.push([]);
    for (var j = 0; j < n; j++) {
      solution[i].push(0);
    }
  }
  var columnsCalled = [];

  // iterate through each row
  for (var rowIndex = 0; rowIndex < n; rowIndex++) {
    // call Math.random (somewhere between 0 and n-1), set this to colIndex
    var colIndex = Math.floor(Math.random() * n);
    while (columnsCalled.indexOf(colIndex) !== -1) {
      colIndex = Math.floor(Math.random() * n);
    }
    columnsCalled.push(colIndex);
    // set that point in the arr equal to 1
    solution[rowIndex][colIndex] = 1;
  }


  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var factorial = function(n) {
    if (n === 1) {
      return 1;
    } else {
      return n * factorial(n - 1);
    }
  }
  var solutionCount = factorial(n);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = [];

    for (var i = 0; i < n; i++) {
      solution.push([]);
      for (var j = 0; j < n; j++) {
        solution[i].push(0);
      }
    }
  
  var board = new Board(solution);

  if (n === 2 || n === 3) {
    return board.rows();
  }

  var recursiveCheck = function(rowIndex) {
    // base case: no queens conflicts and rowIndex = n-1
    if (rowIndex === n && !board.hasAnyQueensConflicts()) {
      return board.rows();
    }
    // see if there's already an element toggled in the row
    var colIndex = board.rows()[rowIndex].indexOf(1);
    // if there was no prior element, set colIndex to zero and toggle there
    if (colIndex === -1) {
      colIndex = 0;
      board.togglePiece(rowIndex, colIndex);
    // else, toggle current colIndex off and turn on one colIndex to the right
    } else if (colIndex === (n - 1)) {
      board.togglePiece(rowIndex, colIndex);
      return recursiveCheck(rowIndex-1);
    } else {
      board.togglePiece(rowIndex, colIndex);
      colIndex++;
      board.togglePiece(rowIndex, colIndex);
    }
    // check if there's a conflict
    if (board.hasAnyQueensConflicts()) {
      while (board.hasAnyQueensConflicts() && colIndex < n) {
        board.togglePiece(rowIndex, colIndex);
        // if you get to the end, call recursiveCheck on rowIndex-1
        if (colIndex === n-1) {
          return recursiveCheck(rowIndex-1);
        }
        colIndex++;
        board.togglePiece(rowIndex, colIndex);
        // keep going until you either don't have any queens conflicts or reach the end of the row
      }

      // if you get to an element where you don't have any queens conflicts, call recursiveCheck on rowIndex+1
      if (!board.hasAnyQueensConflicts()) {
        return recursiveCheck(rowIndex+1);
      }
    } else {
      // if there isn't, toggle the first column index
      if (board.hasAnyQueensConflicts()) {
        return recursiveCheck(rowIndex);
      } else {
        // then call recursiveCheck on rowIndex+1
        return recursiveCheck(rowIndex+1);
      }
    }
  };

  return recursiveCheck(0);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;

  var recursiveCount = function(temporaryBoard) {
    if (temporaryBoard.length === n) {
      if (checkQueenSolution(temporaryBoard)) {
        solutionCount++;
      }
      return;
    }
    for (var i = 0; i < n; i++) {
      var boardCheck = temporaryBoard.concat(i);
      if (checkQueenSolution(boardCheck)) {
        recursiveCount(boardCheck);
      } else {
        continue;
      }
    }
  };

  recursiveCount([]);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

window.checkRookSolution = function(arr) {
  if (_.uniq(arr).length !== arr.length) {
    return false;
  } else {
    return true;
  }
};
 
window.checkQueenSolution = function(arr) {
  if (!checkRookSolution(arr)) {
    return false;
  }
  for (var rowIndex = 0; rowIndex < arr.length; rowIndex++) {
    for (var colIndex = rowIndex+1; colIndex < arr.length; colIndex++) {
      if (rowIndex - colIndex === arr[rowIndex] - arr[colIndex] || rowIndex - colIndex === -arr[rowIndex] + arr[colIndex]) {
        return false;
      }
    }
  }
  return true;
};

