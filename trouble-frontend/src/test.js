let testPlayer = {
  "data": {
    "id": "15",
    "type": "player",
    "attributes": {
      "name": "adf",
      "color": "#2CAFFE",
      "pieces": [
        {
          "id": 57,
          "player_id": 15,
          "piece_number": 1,
          "board_location": 1
        },
        {
          "id": 58,
          "player_id": 15,
          "piece_number": 2,
          "board_location": 2
        },
        {
          "id": 59,
          "player_id": 15,
          "piece_number": 3,
          "board_location": 3
        },
        {
          "id": 60,
          "player_id": 15,
          "piece_number": 4,
          "board_location": 4
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