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
  var rookieBoard = new Board({'n':5});
  console.log('rookieBoard is : ',rookieBoard);
  console.log('rookieBoard.rows() is : ',rookieBoard.rows());
  // console.log('rows method: ', rookieBoard.rows());
  //run the hasAnyRooksConflicts with .get, so as to generate two different results.  

  // rookieBoard.row(x) = returns xrowarray

  //if we did have an anonfunc, we could take in optional parameters and DO something with them, which we could then pass up to / return up to the countNRooksSolutions.  It could also be the thing delegated to increment the solution count

  //we want to increment the solution count only for the !conflicts cases!
      // to do that we HAVE to 'walk' through the rook implementation.   
  var recurse = function(row) {
    for(var i=0; i<this.rows.length; i++) {
      if(this.row[i] > 0) {
        this.togglePiece(this.row[i], i)
        
      }

      this.rows[i]
    }

  }
  var solutionCount = 0;
  if(!rookieBoard.hasAnyRooksConflicts()) {
    
    console.log('rookieBoard.hasAnyRooksConflicts() is resolving to true.');
    solutionCount++;
  };




  //console.log('GET IS:', rookieBoard.get);

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
