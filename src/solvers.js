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
    // set that point in the matrix equal to 1
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

 /* || (rowIndex === 0 && colIndex === 0)
                                          || (rowIndex === 0 && colIndex === n-1)
                                          || (rowIndex === n-1 && colIndex === 0)
                                          || (rowIndex === n-1 && colIndex === n-1)*/

  var solution = [];

  if (n === 0) { return []; };

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
  // for (var rowIndex = 0; rowIndex < n; rowIndex++) {
  //   var colIndex = Math.floor(Math.random() * (n-1));
  //   board.togglePiece(rowIndex, colIndex);
  //   while (board.hasAnyQueensConflicts()) {
  //     //resets piece back to 0 because there's a conflict
  //     board.togglePiece(rowIndex, colIndex);
  //     //keep generating a new colIndex until there is no conflict at (rowIndex, colIndex)
  //     colIndex = Math.floor(Math.random() * (n-1));
  //     if (board.rows()[rowIndex][colIndex] === 0) {
  //       board.togglePiece(rowIndex, colIndex);
  //     }
  //   }
  // }

  var firstColIndex;
  if (n > 1) {
    firstColIndex = Math.ceil(Math.random() * (n-2)) + 1;
  } else {
    firstColIndex = 0;
  }
  board.togglePiece(0, firstColIndex);
  for (var rowIndex = 1; rowIndex < n; rowIndex++) {
    for (var colIndex = 0; colIndex < n; colIndex++) {
      board.togglePiece(rowIndex, colIndex);
      if (board.hasAnyQueensConflicts()) {
        board.togglePiece(rowIndex, colIndex);
      } else {
        break;
      }
    }
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return board.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
