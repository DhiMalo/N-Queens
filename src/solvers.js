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
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  var myBoard = new Board({n:n});
  var myBoardArray = myBoard.rows();

  console.log('myBoard is : ', myBoard);
  console.log('myBoard.rows() is : ', myBoard.rows());
  console.log('myBoard.rows[0] is', myBoardArray[0]);
  // console.log('rows method: ', myBoard.rows());

  //if we did have an anonfunc, we could take in optional parameters and DO something with them, which we could then pass up to / return up to the countNRooksSolutions.  It could also be the thing delegated to increment the solution count

  //we want to increment the solution count only for the !conflicts cases!
      // to do that we HAVE to 'walk' through the rook implementation.  
  var solutionCount = 0;

  var recursiveSubRoutine = function(row) {
    for(var i = 0; i < myBoardArray.length; i++) {
      if(myBoardArray[i] > 0) {
        for (var i = 0; i < myBoardArray[i].length; i++) {
          myBoard.togglePiece(i, j);
        }
      }
    }
  
    var add = function(a,b){
        return a+b;
      };

    var goalNumberOfPiecesIsReached = (totalPiecesOnBoard === n); // When true, this boolean indicates it's time to stop - you've found one solution!

    var arrayOfPieces = _.flatten(myBoard.rows());
    var totalPiecesOnBoard = _.reduce(arrayOfPieces, add);

    if ( !myBoard.hasAnyRooksConflicts()  && goalNumberOfPiecesIsReached ) { //if there is NO conflict and the goal number of pieces is reached, then PAUSE & increase the solution count.
      solutionCount++;
      var newSolution = myBoard
      return;

    } else if (!myBoard.hasAnyRooksConflicts()) {
      //increment the row
      //execute the recursiveSubRoutine function on myBoard.  
    
    } else if (!!myBoard.hasAnyRooksConflicts()) { 
    } else return;
  }();

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
