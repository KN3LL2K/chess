import { Board, CellPosition } from './Board'
import { Player } from './Player'
import { ChessPiece } from './Pieces';
import * as _ from 'lodash'
import BoardUtils from './BoardUtils';

export class Chess {
  gameBoard: Board
  players: Player[]
  constructor() {
    this._init()
  }

  private _init = () => {
    this.gameBoard = new Board()
    this.gameBoard.initPieces()
    this.players = [ new Player('white'), new Player('black') ]
  }

  public movePiece = (piecePos: CellPosition | string, nextPos: CellPosition | string) => {
    const pieceToMove = this.gameBoard.getCell(piecePos).piece
    // check if move is valid for piece type

    // check for captures
      // if capture interrupts move
        // set new nextPos
        // remove captured piece

    // move piece
    pieceToMove.move(this.gameBoard, nextPos)
    // remove captures

    // (eventually) check for check | checkmate
  }

  private _validateOwner = (player: Player, piece: ChessPiece) : boolean => {
    return player.color === piece.color
  }

  // public selectPiece = (player: Player, piecePos: CellPosition | string) : string[] | boolean => {
  //   const selected = this.gameBoard.getCell(piecePos)
  //   if (this._validateOwner(player, selected)) {
  //     // calculate and return valid moves

  //   }
  // }

  public getMovesForPiece = (piecePos: CellPosition | string, player: Player) : string[] => {
    const moves: string[] = []
    const piece = this.gameBoard.getCell(piecePos).piece
    const { row, column } = piece.position
    if (piece.type === 'Pawn') {
      const possibleMoves = piece.color === 'white' ?
       [[1, -1], [1, 0], [2, 0], [1, 1]] : 
       [[-1, -1], [-1, 0], [-2, 0], [-1, 1]]
      _.forEach(possibleMoves, (each: number[]) => {
        const lookUpPos = { row: row + each[0], column: column + each[1] }
        if (BoardUtils.checkPositionInBounds(lookUpPos)) {
          const lookUpCell = this.gameBoard.getCell(lookUpPos)
          // if diagonal && has enemy piece
          if (each[1] !== 0 && lookUpCell.piece && lookUpCell.piece.color !== piece.color) {
            moves.push(lookUpCell.key)
          // if first move, can move 2 forward
          } else if (each[0] === 2 && !lookUpCell.piece && !piece.hasMoved) {
            moves.push(lookUpCell.key)
          // if there isn't anything ahead of you
          } else if (each[1] === 0 && !lookUpCell.piece) {
            moves.push(lookUpCell.key)
          }
        }
      })
    } else if (piece.type === 'King') {
      const possibleMoves = [
        [1, -1], [1, 0], [1, 1], [0, 1], [0, -1], [-1, -1], [-1, 0], [-1, 1]
      ]
     _.forEach(possibleMoves, (each) => {
       const lookUpPos = { row: row + each[0], column: column + each[1] }
       if (BoardUtils.checkPositionInBounds(lookUpPos)) {
         const lookUpCell = this.gameBoard.getCell(lookUpPos)
         // if diagonal && has enemy piece
         if (lookUpCell.piece && lookUpCell.piece.color !== piece.color) {
          moves.push(lookUpCell.key)
        } else if (!lookUpCell.piece) {
          moves.push(lookUpCell.key)
        }
        // TODO: needs an 'is in Check/CheckMate?' condition
       }
     })
    } else if (piece.type === 'Rook') {
      // crawl in every direction til you find empty, enemy, friendly, or out of bounds
      const directions = [
        [1, 0], [-1, 0], [0, 1], [0, -1]
      ]
      _.forEach(directions, (each) => {
        let lookUpPos = { row: row + each[0], column: column + each[1] }
        while (BoardUtils.checkPositionInBounds(lookUpPos)) {
          let lookUpCell = this.gameBoard.getCell(lookUpPos)
          if (lookUpCell.piece && lookUpCell.piece.color !== piece.color) {
            moves.push(lookUpCell.key)
            break;
          } else if (!lookUpCell.piece) {
            moves.push(lookUpCell.key)
          } else {
            break;
          }
          lookUpPos = { row: lookUpPos.row + each[0], column: lookUpPos.column + each[1] }
        } 
      })
    } else if (piece.type === 'Bishop') {
      // crawl in every direction til you find empty, enemy, friendly, or out of bounds
      const directions = [
        [1, 1], [-1, 1], [1, -1], [-1, -1]
      ]
      _.forEach(directions, (each) => {
        let lookUpPos = { row: row + each[0], column: column + each[1] }
        while (BoardUtils.checkPositionInBounds(lookUpPos)) {
          let lookUpCell = this.gameBoard.getCell(lookUpPos)
          if (lookUpCell.piece && lookUpCell.piece.color !== piece.color) {
            moves.push(lookUpCell.key)
            break;
          } else if (!lookUpCell.piece) {
            moves.push(lookUpCell.key)
          } else {
            break;
          }
          lookUpPos = { row: lookUpPos.row + each[0], column: lookUpPos.column + each[1] }
        } 
      })
    } else if (piece.type === 'Queen') {
      // crawl in every direction til you find empty, enemy, friendly, or out of bounds
      const directions = [
        [1, 0], [-1, 0], [0, 1], [0, -1],
        [1, 1], [-1, 1], [1, -1], [-1, -1]
      ]
      _.forEach(directions, (each) => {
        let lookUpPos = { row: row + each[0], column: column + each[1] }
        while (BoardUtils.checkPositionInBounds(lookUpPos)) {
          let lookUpCell = this.gameBoard.getCell(lookUpPos)
          if (lookUpCell.piece && lookUpCell.piece.color !== piece.color) {
            moves.push(lookUpCell.key)
            break;
          } else if (!lookUpCell.piece) {
            moves.push(lookUpCell.key)
          } else {
            break;
          }
          lookUpPos = { row: lookUpPos.row + each[0], column: lookUpPos.column + each[1] }
        } 
      })
    } else if (piece.type === 'Knight') {
      const possibleMoves = [
        [2, -1], [2, 1], [-2, -1], [-2, 1],
        [1, 2], [1, -2], [-1, 2], [-1, -2]
      ]
      _.forEach(possibleMoves, (each) => {
        const lookUpPos = { row: row + each[0], column: column + each[1] }
        if (BoardUtils.checkPositionInBounds(lookUpPos)) {
          const lookUpCell = this.gameBoard.getCell(lookUpPos)
          if (!lookUpCell.piece || lookUpCell.piece.color !== piece.color) {
            moves.push(lookUpCell.key)
          }
        }
      })
    }
    return moves
  }
}
