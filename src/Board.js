// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },
        // var board1 = Board({n:5});
        // console.log('hi', board1);

        // var board1 = Board(5);
        // console.log('hi', board1);


    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    /*
    createBoard: function(value) {
      var board1 = ne Board({n : value});
      console.log('hi I am the new board', board1);
      
    }
    */
    hasRowConflictAt: function(rowIndex) {
      var add = function(a,b){
        return a+b;
      };
      return _.reduce(this['attributes'][rowIndex], add);

    },

    arrayBoard: function() { //transforms the given object into a new array - baller function, use if necessary.
      var anonFunc = function(property, key, collection) {
        if(Array.isArray(property)) {
          return property;
        }
      };

      var arrayBoard = _.map(this['attributes'], anonFunc);
      arrayBoard.pop();
      console.log("array Board", arrayBoard);
      return arrayBoard;

    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var bool = false;
      var countRow = 0;

    //if a given row has more than one 1 then make bool true.
      var theBoard = this['attributes'];
        for (var i = 0; i < theBoard['n']; i++) { //theBoard['n'] is a number.
          if(this.hasRowConflictAt(i) > 1) {//we expect this to return whether the number of pieces in the row is greater than 1
            countRow++;
          }
        }

      if (countRow > 0) {
        bool = true;
        //this would give access to rows 0-3
      }
      // };
      return bool;
    },


    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var theBoard = this['attributes'];
      var sum = 0;
      for (var i = 0; i < theBoard['n']; i++) {
        //console.log("column elements", theBoard[i][colIndex]);
        sum += theBoard[i][colIndex];

      };
  
      // pass in the index of the object as the colIndex.
      
      return sum;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // debugger;
      var bool = false;
      var theBoard = this['attributes'];
      var countCol = 0;

      for(var i=0; i<theBoard['n']; i++) {
        if(this.hasColConflictAt(i) > 1) {
          countCol++;
        }
      }

      if(countCol>0) {
        bool=true;  
      }
      return bool;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var bool = false;
      //start at [0,0] and iterate down the diagonal
      //the goal is for each board position, assess whether Row+1N, Col+1N is greater than 0
      //if so, change the boolean to true 
      // var sum = 0;
      // var sum2 = 0; 
   
      return bool;
      // var bound = theBoard['n']-start; //move traverses the diagonal. For Row+1N, Col+1N, it is N) Affects both axes
     
      // for(var i = 0; i < bound; i++) {
      //   var x = i;
      //   var y = i;
      //   sum += theBoard[start+x+''][y]; //we are using string coersion to change from number to string for key
      //   sum2 += theBoard[y+''][x+start];
      // }
      // return sum+sum2;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // var theBoard = this['attributes'];
    
      var theBoard = this['attributes'];
      console.log('the board currently being tested is: ', this);
      //start at [0,0] and iterate down the diagonal
      //the goal is for each board position, assess whether Row+1N, Col+1N is greater than 0
      //if so, change the boolean to true 
      var sum = 0;
      var sum2 = 0; 
     
      for(var i = 0; i < theBoard['n']; i++) {
        var x = i;
        var y = i;
        sum += theBoard[x+''][0+y]; //we are using string coersion to change from number to string for key
        console.log('sum is: ', sum);
        sum2 += theBoard[0+y+''][x+2];
        console.log('sum2 is: ', sum2);
      }
      var bool = (sum > 1 || sum2 > 1); //
      console.log(bool);
      return bool;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };


}());
