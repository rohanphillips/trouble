class Chess  {
  constructor() {
    this.board = {}
    for (var i=0; i<8; i++) {
          for (var j=0; j<8; j++) {
               this.board[i,j] = new Square(i,j)
               }
          }

  };

};

class Square {
    constructor(row, col) {
      this.row = row;
      this.col = col;
      this.color = "black"
      if ((row+col)%2 == 1) this.color = "white"
  };
};