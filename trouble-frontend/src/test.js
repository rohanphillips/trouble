let testPlayer = {
  "data": {
    "id": "5",
    "type": "player",
    "attributes": {
      "name": "df",
      "color": "#2CAFFE",
      "pieces": [
        {
          "id": 6,
          "player_id": 5,
          "piece_number": 0,
          "board_location": "p0start0"
        },
        {
          "id": 7,
          "player_id": 5,
          "piece_number": 1,
          "board_location": "p0start1"
        },
        {
          "id": 8,
          "player_id": 5,
          "piece_number": 2,
          "board_location": "p0start2"
        },
        {
          "id": 9,
          "player_id": 5,
          "piece_number": 3,
          "board_location": "p0start3"
        }
      ]
    }
  }
}


class Chess  {
  constructor() {
    this.board = {}
    for (var i=0; i<8; i++) {
        console.log("I", i);  
        for (var j=0; j<8; j++) {
            console.log("J", j);
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