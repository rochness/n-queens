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
  var solutionCount = 0;
  recursiveSolutionFinder([], n, function(){
    solutionCount++;
  }, 'rook');

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

window.arrayToMatrix = function(array) {
  var result = [];
  var emptyRow = [];
  //create empty rows filled with 0's
  for(var i = 0; i < array.length; i++){
    emptyRow.push(0);
  }
  for(var row = 0; row < array.length; row++){
    result.push(emptyRow.slice());
   }
   for (var row = 0; row < array.length; row++) {
    result[row][array[row]] = 1;
   }

  return result;

};
// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  // create an empty board to return if n is 2 or 3 (no solutions)
  var board = new Board({n:n});
  if (n === 2 || n === 3) {
    return board.rows();
  }

  var arr = [];
  recursiveSolutionFinder(arr, n, function() {
    //manipulate arr to be a solution
    arr = arguments[0]; 
    return arr;
  }, 'queen');

  //convert arr into a matrix to return
  return arrayToMatrix(arr);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  recursiveSolutionFinder([], n, function(){
    solutionCount++;
  }, 'queen');

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

window.recursiveSolutionFinder = function(temporaryBoard, n, cb, validator) {
  if (temporaryBoard.length === n) {
    if (verifyNSolution(temporaryBoard, validator)) {
      return cb(temporaryBoard);
    }
  }
  for (var i = 0; i < n; i++) {
    var boardCheck = temporaryBoard.concat(i);
    if (verifyNSolution(boardCheck, validator)) {
      var result = recursiveSolutionFinder(boardCheck, n, cb, validator);
      if (result) {
        return result;  // eject out of function if we found solution
      }
    }
  }
};
 
window.verifyNSolution = function(arr, validator) {
  if (_.uniq(arr).length !== arr.length) {
    return false;
  }
  if (validator === 'queen') {
    for (var i = 0; i < arr.length; i++) {
      for (var j = i + 1; j < arr.length; j++) {
        if (i - j === arr[i] - arr[j] || i - j === -arr[i] + arr[j]) {
          return false;
        }
      }
    }
  }
  return true;
};

