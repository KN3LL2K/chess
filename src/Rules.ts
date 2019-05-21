
/*
Pawn: 1
Knight: 2
Bishop: 3
Rook: 4
King: 5
Queen: 6
*/

const initPiecesLayout = [
  [4, 2, 3, 5, 6, 3, 2, 4],
  [0, 0, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 5, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [4, 2, 3, 5, 6, 3, 2, 4]
]

const Rules = {
  startingLayout: initPiecesLayout,
  pieces: {
    'Pawn': {
      validate: () => {
        
      }
    },
    'Bishop': {
      validate: () => {

      }
    },
    'Knight': {
      validate: () => {

      }
    },
    'Rook': {
      validate: () => {

      }
    },
    'King': {
      validate: () => {

      }
    },
    'Queen': {
      validate: () => {

      }
    },

  }
}

export default Rules