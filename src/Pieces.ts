import { Board, CellPosition, Cell } from './Board'
import uniqid from 'uniqid'
import BoardUtils from './BoardUtils'

export type PieceType = 'Pawn' | 'Knight' | 'Bishop' | 'Rook' | 'King' | 'Queen' 
export type PieceColor = 'white' | 'black'
export type ChessPiece = Pawn | Knight | Rook | King | Queen

export class Piece {
  id: string
  type: PieceType
  color: PieceColor
  position: CellPosition
  constructor(type: PieceType, color: PieceColor, position: CellPosition) {
    this.id = uniqid()
    this.type = type
    this.color = color
    this.position = position
  }

  public move = (board: Board, nextPos: CellPosition | string) => {
    board.setCell(nextPos, this)
    board.setCell(this.position, null)
    this.position = BoardUtils.computePosition(nextPos)
  }
}

export class Pawn extends Piece {
  hasMoved: boolean
  constructor(color: PieceColor, position: CellPosition) {
    super('Pawn', color, position)
    this.hasMoved = false
  }
  public setHasMoved = () => {
    this.hasMoved = true
  }
}

export class Knight extends Piece {
  constructor(color: PieceColor, position: CellPosition) {
    super('Knight', color, position)
  }
}

export class Bishop extends Piece {
  constructor(color: PieceColor, position: CellPosition) {
    super('Bishop', color, position)
  }
}

export class Rook extends Piece {
  constructor(color: PieceColor, position: CellPosition) {
    super('Rook', color, position)
  }
}

export class King extends Piece {
  constructor(color: PieceColor, position: CellPosition) {
    super('King', color, position)
  }
}

export class Queen extends Piece {
  constructor(color: PieceColor, position: CellPosition) {
    super('Queen', color, position)
  }
}
