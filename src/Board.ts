import BoardUtils from './BoardUtils'
import { ChessPiece, Pawn, Knight, Bishop, Rook, King, Queen } from './Pieces'
import Rules from './Rules'
import { CellRetrievalError } from './errors'

export type CellPosition = { row: number, column: number }
export interface Cell {
  key: string,
  position: CellPosition
  color: 'white' | 'black',
  piece?: any
}

export type Cells = Array<Array<Cell>>

export class Board {
  cells: Cells
  size: number
  constructor(size: number = 8) {
    this.size = size
    this.cells = this._build(size)
  }

  private _build = (size: number) : Cells => {
    const cells = []
    let counter = 0
    for (let r = 0; r < size; r++) {
      cells[r] = []
      for (let c = 0; c < size; c++) {
        let cell: Cell = {
          key: `${BoardUtils.columnName(c + 1)}${r + 1}`,
          position: {
            row: r,
            column: c
          },
          color: counter % 2 === 0 ? 'black' : 'white'
        }
        cells[r][c] = cell
        counter += 1
      }
    }
    return cells
  }

  public getCells = () : Cells =>  {
    return this.cells
  }

  public initPieces = () => {
    const { startingLayout } = Rules
    for (let r = 0; r < this.size ; r++) {
      for (let c = 0; c < this.size; c++) {
        const cell = startingLayout[r][c]
        const pos = { row: r, column: c }
        const color = r > 1 ? 'black' : 'white'
        let piece = null
        if (cell === 1) {
          piece = new Pawn(color, pos)
        } else if (cell === 2) {
          piece = new Knight(color, pos)
        } else if (cell === 3) {
          piece = new Bishop(color, pos)
        } else if (cell === 4) {
          piece = new Rook(color, pos)
        } else if (cell === 5) {
          piece = new King(color, pos)
        } else if (cell === 6) {
          piece = new Queen(color, pos)
        }
        this.setCell( pos, piece )
      }
    }
  }

  private _assertCellPos = (position: CellPosition) => {
    const { row, column } = position
    if (row >= this.size || column >= this.size || row < 0 || column < 0) {
      throw new CellRetrievalError('invalid_position', position)
    }
  }

  public setCell = (pos: CellPosition | string, piece: ChessPiece | null) => {
    const computedPos = BoardUtils.computePosition(pos)
    this._assertCellPos(computedPos)
    const { row, column } = computedPos
    this.cells[row][column].piece = piece
  }

  public getCell = (pos: CellPosition | string) : Cell => {
    const computedPos = BoardUtils.computePosition(pos)
    this._assertCellPos(computedPos)
    const { row, column } = computedPos
    return this.cells[row][column]
  }

}
